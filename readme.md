# Supply Chain on Hyperledger Fabric

## Installation and Usage

### Pre-requisites

Verify that you have the following installed:

```bash
$ node -v
v16.20.0
```

```bash
$ npm -v
8.19.4
```

```bash
$ docker -v
Docker version 23.0.1, build a5ee5b1
```

```bash
$ docker-compose -v
Docker Compose version v2.15.1
```

```bash
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

### Idea

- Farmer
	- Generate Token for a product (Register a produce)
		- Location is added
	- Sends to a wholesaler

- WholeSaler
	- Does Packaging
		- Adds packaging cost
	- Sends to a Retailer

- Retailer
	- Cost of logistics is added
	- Time when product reached to retailer is added

- Consumer
	- time he buys a product is added to ledger (final)
	- consumer can query all the data on the ledger


### Chaincode Functions

1.  `registerProduce` - to generate a token for a produce(asset)
    inputs - farmerId, location, produceType, price, quantity
    outputs - tokenId

2.  `shipsTo` - when someone ships a produce to someone else
    inputs - tokenId, toId
    outputs - ack

3. `acknowledgeReceived` - when someone receives a produce
    inputs - tokenId, receivedAtLocation, logisticsCost, logisticsTime
    outputs - ack

4. `addPackagingDetails` - when wholesaler adds packaging details
    inputs - tokenId, packagingCost, packagingTime, storageCost, storageTime, expirationDate
    outputs - tokenId

5. `addRetailerDetails` - when retailer adds logistics cost
    inputs - tokenId, timeOfSale, timeOfArrival
    outputs - tokenId

6. `queryAll` - to query all the data on the ledger
    inputs - tokenId
    outputs - all the data of the asset on ledger