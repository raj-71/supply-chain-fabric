'use strict';

var { Wallets } = require('fabric-network');
const path = require('path');
const FabricCAServices = require('fabric-ca-client');
const fs = require('fs');

const getCCP = async (org) => {
    let ccpPath;
    if(org == 'farmer')
        ccpPath = path.resolve(__dirname, '..', 'config', 'connection-profile-farmer.json');
    else if(org == 'wholesaler')
        ccpPath = path.resolve(__dirname, '..', 'config', 'connection-profile-wholesaler.json');
    else if(org == 'retailer')
        ccpPath = path.resolve(__dirname, '..', 'config', 'connection-profile-retailer.json');
    else
        return null;

    const ccpJSON = fs.readFileSync(ccpPath, 'utf8');
    const ccp = JSON.parse(ccpJSON);
    return ccp;
}

const getCaUrl = async (org, ccp) => {
    let caURL;
    if(org == 'farmer')
        caURL = ccp.certificateAuthorities['ca.farmer.supplychain.com'].url;
    else if(org == 'wholesaler')
        caURL = ccp.certificateAuthorities['ca.wholesaler.supplychain.com'].url;
    else if(org == 'retailer')
        caURL = ccp.certificateAuthorities['ca.retailer.supplychain.com'].url;
    else
        return null;
    return caURL

}

const getWalletPath = async (org) => {
    let walletPath;
    if(org == 'farmer')
        walletPath = path.join(process.cwd(), 'farmer-wallet');
    else if(org == 'wholesaler')
        walletPath = path.join(process.cwd(), 'wholesaler-wallet');
    else if(org == 'retailer')
        walletPath = path.join(process.cwd(), 'retailer-wallet');
    else
        return null;

    return walletPath;
}

const getAffiliation = async (org) => {
    
    if(org == "farmer")
        return 'farmer.department1'

    else if(org == "wholesaler")
        return 'wholesaler.department1'

    else if(org == "retailer")
        return 'retailer.department1'

    else
        return null
}

const isUserRegistered = async (username, userOrg, secret) => {
    const walletPath = await getWalletPath(userOrg)
    const wallet = await Wallets.newFileSystemWallet(walletPath);
    console.log(`Wallet path: ${walletPath}`);

    const userIdentity = await wallet.get(username);

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
    } else if (org == "wholesaler") {
        caInfo = ccp.certificateAuthorities['ca.wholesaler.supplychain.com'];
    } else if (org == "retailer") {
        caInfo = ccp.certificateAuthorities['ca.retailer.supplychain.com'];
    } else {
        return null
    }
    return caInfo
}

const getOrgMSP = (org) => {
    let orgMSP = null
    org == 'farmer' ? orgMSP = 'farmerMSP' : null
    org == 'wholesaler' ? orgMSP = 'wholesalerMSP' : null
    org == 'retailer' ? orgMSP = 'retailerMSP' : null
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
        } else if (org == "wholesaler") {
            x509Identity = {
                credentials: {
                    certificate: enrollment.certificate,
                    privateKey: enrollment.key.toBytes(),
                },
                mspId: 'wholesalerMSP',
                type: 'X.509',
            };
        } else if (org == "retailer") {
            x509Identity = {
                credentials: {
                    certificate: enrollment.certificate,
                    privateKey: enrollment.key.toBytes(),
                },
                mspId: 'retailerMSP',
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
        const enrollment = await ca.enroll({
            enrollmentID: username,
            enrollmentSecret: secret
        });
        let orgMSPId = getOrgMSP(userOrg);
        privateKey = enrollment.key.toBytes();
        const x509Identity = {
            credentials: {
                certificate: enrollment.certificate,
                privateKey: privateKey,
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

module.exports = {
    getCCP: getCCP,
    getWalletPath: getWalletPath,
    isUserRegistered: isUserRegistered,
    registerAndGerSecret: registerAndGerSecret

}
