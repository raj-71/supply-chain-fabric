# TrustChain

![supply-chain](https://github.com/raj-71/supply-chain-fabric/assets/40698372/0c45c650-afdc-4fc3-b56f-2f5a1274b143)


TrustChain is a blockchain-based solution that aims to create consumer trust in products by tracking their raw materials throughout the supply chain. It allows consumers to verify the origin, authenticity, and journey of a product by leveraging blockchain technology.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Configuration](#configuration)
- [Chaincode Functions](#chaincode-functions)
- [Troubleshooting](#troubleshooting)



## Introduction
TrustChain is a platform that enhances transparency and builds trust between consumers and manufacturers. By tracking the entire supply chain on Hyperledger Fabric Blockchain, TrustChain provides consumers with access to valuable information about the product's raw materials, sourcing, and production processes.



## Features

1. **Secure Account Creation:** Each member of the supply chain, excluding consumers, can create a dedicated account with a private key(for blockchain transaction) and secret code(for user authentication) for data security.
2. **Token Creation:** Only Farmers can create tokens for their raw materials, establishing a verifiable and unique identity for each item.
3. **Ownership Transfer:** Raw material ownership can be securely transferred from farmers to wholesalers, ensuring a transparent and auditable supply chain.
4. **Product Manufacturing:** Wholesalers can create new tokens based on existing ones, representing the products manufactured using the raw materials.
5. **Transfer to Retailer:** Manufacturers can transfer the newly created product tokens to retailers, streamlining the distribution process.
6. **Consumer Purchase:** Retailers sell products to consumers, and the corresponding token is locked to maintain the integrity of the product's metadata.
7. **Product Tracking:** Consumers can track the entire supply chain journey of a product by using its unique token ID.




## Getting Started

### Prerequisites

Verify that you have the following installed:

```bash
$ node -v
v16.20.0

$ npm -v
8.19.4

$ docker -v
Docker version 23.0.1, build a5ee5b1

$ docker-compose -v
Docker Compose version v2.15.1

$ git --version
git version 2.39.2
```

### Installation

- Clone the repository
    
    ```bash
    $ git clone https://github.com/raj-71/supply-chain-fabric.git
    $ cd supply-chain-fabric
    ```
- Start the hyperledger fabric network

    ```bash
    $ ./fablo up fablo-config.json
    $ cd backend/config
    $ ./generate-ccp
    ```

- Start the backend server
  
    ```bash
    $ cd backend
    $ npm install
    $ node app.js
    ```

### Configuration

- Organizations
    - Farmer
    - Wholesaler
    - Retailer
- 1 Peer per Organization
- 1 Orderer of channel
- `CouchDB` as Database


### Chaincode Functions

1.  `createToken` - to generate a token for a produce only by farmer

2.  `transferFrom` - when someone sells a token to other user

3. `createTokenOverToken` - when someone create a product from raw material, new tokens are created over those tokens

4. `lockToken` - when retailer sells product to consumer, no new metadata can be added to that token

5. `readNFT` - read data of a token from the ledger only if the user owns it

6. `readAllNFT` - read all the tokens that the user owns

7. `getHistory` - get all the transactions related to that token

## Troubleshooting

Incase if any of the commands fail due to configurations or the network was not brought down properly use the following commands to clear the corrupted docker images and fix the issue.

1. Stop the network

    ```bash
    $ ./fablo down
    ```

2. Again Up the network

    ```bash
    $ ./fablo up fablo-config.json
    ```

3. Stop the containers

    ```bash
    $ docker stop $(docker ps -a -q)
    ```

4. Remove the containers

    ```bash
    $ docker rm $(docker ps -a -q)
    ```

5. Remove all local volumns

    ```bash
    $ docker volume prune
    ```

6. Remove all wallets

    ```bash
    $ cd backend
    $ rm -rf /backend/*-wallet
    ```

7. Authorization error code 71 -> Regenerate all connection profies in backend

    ```bash
    $ cd backend/config
    $ ./generate-ccp
    ```

8. Incase of affiliation error -> authorization error code 20
    
    
    Copy paste these lines in all the fabric-ca-server-config.yaml (total 4 such files)
    files in the network. File locations: 

    /fablo-target/fablo-config/fabric-ca-server-config/*.supplychain.com/fabric-ca-server-config.yaml
    ```
    affiliations:
        farmer:
            - department1
        seller:
            - department1
        consumer:
            - department1
    ```
