'use strict';

var { Gateway, Wallets } = require('fabric-network');
const path = require('path');
const FabricCAServices = require('fabric-ca-client');
const fs = require('fs');

const util = require('util');

const getCCP = async (org) => {
    let ccpPath;
    if(org == 'farmer')
        ccpPath = path.resolve(__dirname, '..', 'config', 'connection-profile-farmer.json');
    else if(org == 'seller')
        ccpPath = path.resolve(__dirname, '..', 'config', 'connection-profile-seller.json');
    else if(org == 'consumer')
        ccpPath = path.resolve(__dirname, '..', 'config', 'connection-profile-consumer.json');
    else
        return null;
    // console.log("ccp path :", ccpPath);
    const ccpJSON = fs.readFileSync(ccpPath, 'utf8');
    const ccp = JSON.parse(ccpJSON);
    return ccp;
}

const getCaUrl = async (org, ccp) => {
    let caURL;
    if(org == 'farmer')
        caURL = ccp.certificateAuthorities['ca.farmer.supplychain.com'].url;
    else if(org == 'seller')
        caURL = ccp.certificateAuthorities['ca.seller.supplychain.com'].url;
    else if(org == 'consumer')
        caURL = ccp.certificateAuthorities['ca.consumer.supplychain.com'].url;
    else
        return null;
    return caURL

}

const getWalletPath = async (org) => {
    let walletPath;
    if(org == 'farmer')
        walletPath = path.join(process.cwd(), 'farmer-wallet');
    else if(org == 'seller')
        walletPath = path.join(process.cwd(), 'seller-wallet');
    else if(org == 'consumer')
        walletPath = path.join(process.cwd(), 'consumer-wallet');
    else
        return null;
    // console.log("wallet path :", walletPath);
    return walletPath;
}

const getAffiliation = async (org) => {
    // console.log("inside getAffiliation method, org: ", org);
    
    if(org == "farmer")
        return 'farmer.department1'

    else if(org == "seller")
        return 'seller.department1'

    else if(org == "consumer")
        return 'consumer.department1'

    else
        return null
}

const getRegisteredUser = async (username, userOrg, isJson) => {
    let ccp = await getCCP(userOrg);

    const caURL = await getCaUrl(userOrg, ccp);
    // console.log("ca url is ", caURL);
    const ca = new FabricCAServices(caURL);

    const walletPath = await getWalletPath(userOrg)
    const wallet = await Wallets.newFileSystemWallet(walletPath);
    console.log(`Wallet path: ${walletPath}`);

    const userIdentity = await wallet.get(username);
    if (userIdentity) {
        console.log(`An identity for the user ${username} already exists in the wallet`);
        var response = {
            success: true,
            message: username + ' enrolled Successfully',
        };
        return response
    }

    // Check to see if we've already enrolled the admin user.
    let adminIdentity = await wallet.get('admin');
    if (!adminIdentity) {
        console.log('An identity for the admin user "admin" does not exist in the wallet');
        await enrollAdmin(userOrg, ccp);
        adminIdentity = await wallet.get('admin');
        console.log("Admin Enrolled Successfully")
    }

    // build a user object for authenticating with the CA
    const provider = wallet.getProviderRegistry().getProvider(adminIdentity.type);
    const adminUser = await provider.getUserContext(adminIdentity, 'admin');
    let secret;
    try {
        // Register the user, enroll the user, and import the new identity into the wallet.
        // secret = await ca.register({ affiliation: await getAffiliation(userOrg), enrollmentID: username, role: 'client' }, adminUser);
        secret = await ca.register({ org: userOrg, enrollmentID: username, role: 'client' }, adminUser);
        // const secret = await ca.register({ affiliation: 'org1.department1', enrollmentID: username, role: 'client', attrs: [{ name: 'role', value: 'approver', ecert: true }] }, adminUser);

        console.log(`Secret for the user with username: ${username} -------> ${secret}`)

    } catch (error) {
        return error.message
    }

    const enrollment = await ca.enroll({ enrollmentID: username, enrollmentSecret: secret });
    // const enrollment = await ca.enroll({ enrollmentID: username, enrollmentSecret: secret, attr_reqs: [{ name: 'role', optional: false }] });

    let x509Identity;
    if (userOrg == "farmer") {
        x509Identity = {
            credentials: {
                certificate: enrollment.certificate,
                privateKey: enrollment.key.toBytes(),
            },
            mspId: 'farmerMSP',
            type: 'X.509',
        };
    } else if (userOrg == "seller") {
        x509Identity = {
            credentials: {
                certificate: enrollment.certificate,
                privateKey: enrollment.key.toBytes(),
            },
            mspId: 'sellerMSP',
            type: 'X.509',
        };
    } else if (userOrg == "consumer") {
        x509Identity = {
            credentials: {
                certificate: enrollment.certificate,
                privateKey: enrollment.key.toBytes(),
            },
            mspId: 'consumerMSP',
            type: 'X.509',
        };
    }

    await wallet.put(username, x509Identity);
    console.log(`Successfully registered and enrolled admin user ${username} and imported it into the wallet`);

    var response = {
        success: true,
        message: username + ' enrolled Successfully',
    };
    return response
}

const isUserRegistered = async (username, userOrg, secret, privateKey) => {
    const walletPath = await getWalletPath(userOrg)
    const wallet = await Wallets.newFileSystemWallet(walletPath);
    console.log(`Wallet path: ${walletPath}`);

    const userIdentity = await wallet.get(username);
    console.log("user identity: ", userIdentity);

    userIdentity.credentials.privateKey = privateKey;
    console.log("user identity: ", userIdentity);

    if (userIdentity) {

        let ccp = await getCCP(userOrg);

        const caURL = await getCaUrl(userOrg, ccp);
        const ca = new FabricCAServices(caURL);

        console.log(`An identity for the user ${username} exists in the wallet`);

        console.log('secret: ', secret);
        console.log('username: ', username);

        const enrollment = await ca.enroll({ enrollmentID: username, enrollmentSecret: secret });
        
        console.log('enrollment: ', enrollment);

        return true
    }
    return false
}

const getCaInfo = async (org, ccp) => {
    let caInfo;
    if (org == "farmer") {
        caInfo = ccp.certificateAuthorities['ca.farmer.supplychain.com'];
    } else if (org == "seller") {
        caInfo = ccp.certificateAuthorities['ca.seller.supplychain.com'];
    } else if (org == "consumer") {
        caInfo = ccp.certificateAuthorities['ca.consumer.supplychain.com'];
    } else {
        return null
    }
    return caInfo
}

const getOrgMSP = (org) => {
    let orgMSP = null
    org == 'farmer' ? orgMSP = 'farmerMSP' : null
    org == 'seller' ? orgMSP = 'sellerMSP' : null
    org == 'consumer' ? orgMSP = 'consumerMSP' : null
    return orgMSP

}

const enrollAdmin = async (org, ccp) => {
    console.log('calling enroll Admin method')
    try {
        const caInfo = await getCaInfo(org, ccp) //ccp.certificateAuthorities['ca.org1.example.com'];
        const caTLSCACerts = caInfo.tlsCACerts.pem;
        const ca = new FabricCAServices(caInfo.url, { trustedRoots: caTLSCACerts, verify: false }, caInfo.caName);

        // Create a new file system based wallet for managing identities.
        const walletPath = await getWalletPath(org) //path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the admin user.
        const identity = await wallet.get('admin');
        console.log('identity : ', identity);
        if (identity) {
            console.log('An identity for the admin user "admin" already exists in the wallet');
            return;
        }

        // Enroll the admin user, and import the new identity into the wallet.
        const enrollment = await ca.enroll({ enrollmentID: 'admin', enrollmentSecret: 'adminpw' });
        // console.log("Enrollment object is : ", enrollment)
        let x509Identity;
        if (org == "farmer") {
            x509Identity = {
                credentials: {
                    certificate: enrollment.certificate,
                    privateKey: enrollment.key.toBytes(),
                },
                mspId: 'farmerMSP',
                type: 'X.509',
            };
        } else if (org == "seller") {
            x509Identity = {
                credentials: {
                    certificate: enrollment.certificate,
                    privateKey: enrollment.key.toBytes(),
                },
                mspId: 'sellerMSP',
                type: 'X.509',
            };
        } else if (org == "consumer") {
            x509Identity = {
                credentials: {
                    certificate: enrollment.certificate,
                    privateKey: enrollment.key.toBytes(),
                },
                mspId: 'consumerMSP',
                type: 'X.509',
            };
        }

        await wallet.put('admin', x509Identity);
        console.log('Successfully enrolled admin user "admin" and imported it into the wallet');
        return;
    } catch (error) {
        console.error(`Failed to enroll admin user "admin": ${error}`);
    }
}

const registerAndGerSecret = async (username, userOrg) => {
    let ccp = await getCCP(userOrg)

    // console.log("ccp : ", ccp)

    const caURL = await getCaUrl(userOrg, ccp)
    const ca = new FabricCAServices(caURL);

    const walletPath = await getWalletPath(userOrg)
    const wallet = await Wallets.newFileSystemWallet(walletPath);
    console.log(`Wallet path: ${walletPath}`);

    const userIdentity = await wallet.get(username);
    console.log("userIdentity : ", userIdentity);

    if (userIdentity) {
        console.log(`An identity for the user ${username} already exists in the wallet`);
        var response = {
            success: true,
            message: username + ' enrolled Successfully',
        };
        return response
    }

    // Check to see if we've already enrolled the admin user.
    let adminIdentity = await wallet.get('admin');
    // console.log("adminIdentity : ", adminIdentity);po
    if (!adminIdentity) {
        console.log('An identity for the admin user "admin" does not exist in the wallet');
        await enrollAdmin(userOrg, ccp);
        adminIdentity = await wallet.get('admin');
    }


    // build a user object for authenticating with the CA
    const provider = wallet.getProviderRegistry().getProvider(adminIdentity.type);
    const adminUser = await provider.getUserContext(adminIdentity, 'admin');
    let secret;
    let privateKey;
    try {
        // Register the user, enroll the user, and import the new identity into the wallet.
        secret = await ca.register({ affiliation: await getAffiliation(userOrg), enrollmentID: username, role: 'client', maxEnrollments: -1 }, adminUser);
        console.log("secret : ", secret);
        // const secret = await ca.register({ affiliation: `${userOrg}.department1`, enrollmentID: username, role: 'client', attrs: [{ name: 'role', value: 'approver', ecert: true }] }, adminUser);
        const enrollment = await ca.enroll({
            enrollmentID: username,
            enrollmentSecret: secret
        });
        let orgMSPId = getOrgMSP(userOrg);
        privateKey = enrollment.key.toBytes();
        const x509Identity = {
            credentials: {
                certificate: enrollment.certificate,
                // privateKey: privateKey,
            },
            mspId: orgMSPId,
            type: 'X.509',
        };
        console.log("log 1");
        await wallet.put(username, x509Identity);
    } catch (error) {
        console.log("error msg");
        return error.message
    }

    console.log("log 2");

    var response = {
        success: true,
        message: username + ' enrolled Successfully',
        secret: secret,
        privateKey: privateKey
    };
    return response

}

exports.getRegisteredUser = getRegisteredUser

module.exports = {
    getCCP: getCCP,
    getWalletPath: getWalletPath,
    getRegisteredUser: getRegisteredUser,
    isUserRegistered: isUserRegistered,
    registerAndGerSecret: registerAndGerSecret

}
