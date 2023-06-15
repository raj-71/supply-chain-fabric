'use strict';
const log4js = require('log4js');
const logger = log4js.getLogger('BasicNetwork');
const bodyParser = require('body-parser');
const http = require('http')
const util = require('util');
const express = require('express')
const app = express();
const expressJWT = require('express-jwt');
const jwt = require('jsonwebtoken');
const bearerToken = require('express-bearer-token');
const cors = require('cors');
const constants = require('./config/constants.json')

const host = process.env.HOST || constants.host;
const port = process.env.PORT || constants.port;


const helper = require('./app/helper')
const invoke = require('./app/invoke')
const query = require('./app/query')

// app.options('*', cors());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.set('secret', 'thisismysecret');
app.use(expressJWT({
    secret: 'thisismysecret'
}).unless({
    path: ['/users', '/users/login', '/register', '/consumer']
}));
app.use(bearerToken());

logger.level = 'debug';

app.use((req, res, next) => {
    logger.debug('New req for %s', req.originalUrl);
    if (req.originalUrl.indexOf('/users') >= 0 || req.originalUrl.indexOf('/users/login') >= 0 || req.originalUrl.indexOf('/register') >= 0 || req.originalUrl.indexOf('/consumer') >= 0) {
        return next();
    }
    var token = req.token;
    jwt.verify(token, app.get('secret'), (err, decoded) => {
        if (err) {
            console.log(`Error ================:${err}`)
            res.send({
                success: false,
                message: 'Failed to authenticate token. Make sure to include the ' +
                    'token returned from /users call in the authorization header ' +
                    ' as a Bearer token'
            });
            return;
        } else {
            req.username = decoded.username;
            req.orgname = decoded.orgName;
            logger.debug(util.format('Decoded from JWT token: username - %s, orgname - %s', decoded.username, decoded.orgName));
            return next();
        }
    });
});

var server = http.createServer(app).listen(port, function () { console.log(`Server started on ${port}`) });
logger.info('****************** SERVER STARTED ************************');
logger.info('***************  http://%s:%s  ******************', host, port);
server.timeout = 240000;

function getErrorMessage(field) {
    var response = {
        success: false,
        error: {
            message: field + ' field is missing or Invalid in the request'
        }
    };
    return response;
}

// Register user
app.post('/register', async function (req, res) {
    var username = req.body.username;
    var orgName = req.body.orgName;
    logger.debug('End point : /users');
    logger.debug('User name : ' + username);
    logger.debug('Org name  : ' + orgName);
    if (!username) {
        res.json({
            success: false,
            error: {
                message: "username is missing!"
            }
        });
        return;
    }
    if (!orgName) {
        res.json({
            success: false,
            error: {
                message: "orgName is missing!"
            }
        });
        return;
    }

    var token = jwt.sign({
        exp: Math.floor(Date.now() / 1000) + parseInt(constants.jwt_expiretime),
        username: username,
        orgName: orgName
    }, app.get('secret'));

    let response = await helper.registerAndGerSecret(username, orgName);

    if(!response.success) {
        logger.debug('Failed to register the username %s for organization %s with::%s', username, orgName, response);
        return res.json({
            success: false,
            error: {
                message: response.message
            }
        });
    }

    if (response.success) {
        logger.debug('Successfully registered the username %s for organization %s', username, orgName);
        res.json({
            success: true,
            message: {
                secret: response.secret,
                privateKey: response.privateKey,
            }
        });
    } else {
        logger.debug('Failed to register the username %s for organization %s with::%s', username, orgName, response);
        res.json({
            success: false,
            error: {
                message: "Failed to register!"
            }
        });
    }

});

// Login and get jwt
app.post('/users/login', async function (req, res) {
    var username = req.body.username;
    var orgName = req.body.orgName;
    var secret = req.body.secret;
    logger.debug('End point : /users');
    logger.debug('User name : ' + username);
    logger.debug('Org name  : ' + orgName);
    logger.debug('secret  : ' + secret);
    if (!username) {
        res.json({
            success: false,
            error: {
                message: "username is missing"
            }
        });
        return;
    }
    if (!orgName) {
        res.json({
            success: false,
            error: {
                message: "orgName is missing"
            }
        });
        return;
    }


    let isUserRegistered = await helper.isUserRegistered(username, orgName, secret);

    console.log("isUserRegistered: ", isUserRegistered);

    if (isUserRegistered.success) {
        var token = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + parseInt(constants.jwt_expiretime),
            username: username,
            orgName: orgName
        }, app.get('secret'));
        res.json({
            success: true,
            message: {
                token: token
            }
        });
    } else {
        res.json({ 
            success: false, 
            error: {
                message: isUserRegistered.message
            }
        });
    }
});

app.get('/consumer', async function (req, res) {
    try {
        var tokenId = req.query.tokenId;
        logger.debug('End point : /consumer');
        logger.debug('tokenId : ' + tokenId);

        if (!tokenId) {
            return res.json({
                success: false,
                error: {
                    message: "tokenId is missing"
                }
            });
        }

        let result = await query.queryByConsumer("readByConsumer", tokenId);
        let parentResult = null;

        if ("parentTokenId" in JSON.parse(result.txid)) {
            let parentTokenId = JSON.parse(result.txid).parentTokenId;
            parentResult = await query.queryByConsumer("getHistory", parentTokenId);
        }

        res.send({
            success: true,
            message: {
                result: result,
                parentResult
            }
        })

    } catch (error) {
        res.send({
            success: false,
            error: {
                message: error.message
            }
        })
    }
});

// Invoke transaction on chaincode on target peers
app.post('/channels/:channelName/chaincodes/:chaincodeName', async function (req, res) {
    try {
        logger.debug('==================== INVOKE ON CHAINCODE ==================');
        var chaincodeName = req.params.chaincodeName;
        var channelName = req.params.channelName;
        var fcn = req.body.fcn;
        var args = req.body.args;
        var transient = "";
        console.log("private data is : ", req.body.privateKey)
        logger.debug('channelName  : ' + channelName);
        logger.debug('chaincodeName : ' + chaincodeName);
        logger.debug('fcn  : ' + fcn);
        logger.debug('args  : ', req.body.args);
        if (!chaincodeName) {
            res.json({
                success: false,
                error: {
                    message: "chaincodeName is missing"
                }
            });
            return;
        }
        if (!channelName) {
            res.json({
                success: false,
                error: {
                    message: "channelName is missing"
                }
            });
            return;
        }
        if (!fcn) {
            res.json({
                success: false,
                error: {
                    message: "fcn is missing"
                }
            });
            return;
        }
        if (!args) {
            res.json({
                success: false,
                error: {
                    message: "args is missing"
                }
            });
            return;
        }

        let result = await invoke.invokeTransaction(channelName, chaincodeName, fcn, args, req.username, req.orgname, transient, req.body.privateKey);
        console.log('result is : ', result);

        if(result.success) {
            res.send({
                success: true,
                message : {
                    result: result.txn
                }
            });
        } else {
            res.send({
                success: false,
                error: {
                    message: result.message
                }
            })
        }


    } catch (error) {
        res.send({
            success: false,
            error: {
                message: error.message
            }
        })
    }
});

app.get('/channels/:channelName/chaincodes/:chaincodeName', async function (req, res) {
    try {
        logger.debug('==================== QUERY BY CHAINCODE ==================');

        var channelName = req.params.channelName;
        var chaincodeName = req.params.chaincodeName;
        console.log(`chaincode name is :${chaincodeName}`)
        let args = req.query.args;
        let fcn = req.query.fcn;

        logger.debug('channelName : ' + channelName);
        logger.debug('chaincodeName : ' + chaincodeName);
        logger.debug('fcn : ' + fcn);
        logger.debug('args : ' + args);
        logger.debug('privateKey: ' + req.params.privateKey);

        if (!chaincodeName) {
            return res.json({
                success: false,
                error: {
                    message: "chaincodeName is missing"
                }
            });
        }
        if (!channelName) {
            return res.json({
                success: false,
                error: {
                    message: "channelName is missing"
                }
            });
        }
        if (!fcn) {
            return res.json({
                success: false,
                error: {
                    message: "fcn is missing"
                }
            });
        }
        if (!args) {
            return res.json({
                success: false,
                error: {
                    message: "args is missing"
                }
            });
        }
        
        args = args.replace(/'/g, '"');
        args = JSON.parse(args);
        logger.debug(args);

        let message = await query.query(channelName, chaincodeName, args, fcn, req.username, req.orgname, req.params.privateKey);

        res.send({
            success: true,
            message: {
                result: message
            }
        });
    } catch (error) {
        res.send({
            success: false,
            error: {
                message: error.message
            }
        })
    }
});