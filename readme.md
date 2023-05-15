# Supply Chain on Hyperledger Fabric

### Idea

-> Farmer
	-> Generate Token for a product (Register a produce)
		-> Location is added
	-> Sends to a wholesaler

-> WholeSaler
	-> Does Packaging
		-> Adds packaging cost
	-> Sends to a Retailer

-> Retailer
	-> Cost of logistics is added
	-> Time when product reached to retailer is added


-> Consumer
	-> time he buys a product is added to ledger (final)
	-> consumer can query all the data on the ledger


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