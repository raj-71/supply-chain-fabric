const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const baseUrl = "http://localhost:4000";

chai.use(chaiHttp);

var token;
let nft;
let secret = [];

describe("First test", () => {
	it("register farmer -> farmer01", (done) => {
		const user = {
			username: "farmer01",
			orgName: "farmer",
		};

		chai
			.request(baseUrl)
			.post("/register")
			.set("Content-Type", "application/json")
			.send(user)
			.end((err, res) => {
				if (err) {
					console.log("#################");
					console.log("ERROR: ", err);
					console.log("#################");
					done();
				} else {
					expect(res.body).to.have.property("success").equal(true);
					expect(res.body).to.have.property("token");
					expect(res.body).to.have.property("secret");
					secret.push(res.body.secret);
					done();
				}
			});
	});

	it("register farmer -> farmer02", (done) => {
		const user = {
			username: "farmer02",
			orgName: "farmer",
		};

		chai
			.request(baseUrl)
			.post("/register")
			.set("Content-Type", "application/json")
			.send(user)
			.end((err, res) => {
				if (err) {
					console.log("#################");
					console.log("ERROR: ", err);
					console.log("#################");
					done();
				} else {
					expect(res.body).to.have.property("success").equal(true);
					expect(res.body).to.have.property("token");
					expect(res.body).to.have.property("secret");
					secret.push(res.body.secret);
					done();
				}
			});
	});

	it("enroll farmer01", (done) => {
		const user = {
			username: "farmer01",
			orgName: "farmer",
			secret: secret[0]
		};

		chai
			.request(baseUrl)
			.post("/users/login")
			.set("Content-Type", "application/json")
			.send(user)
			.end((err, res) => {
				expect(res.body).to.have.property("success").equal(true);
				expect(res.body).to.have.property("message").to.have.property("token");
				token = res.body.message.token;
				done();
			});
	});


	it("create token", (done) => {
		var requestData = {
			peers: ["peer0.farmer.supplychain.com"],
			fcn: "createToken",
			chaincodeName: "token",
			channelName: "mychannel",
			args: [{ name: "onion", quantity: "10kg" }],
		}

		chai.request(baseUrl)
			.post("/channels/my-channel1/chaincodes/chaincode1")
			.set("Content-Type", "application/json")
			.set("Authorization", "Bearer " + token)
			.send(requestData)
			.end((err, res) => {
				expect(res.body).to.have.property("result").to.have.property("result").to.have.property("txid");
				nft = res.body.result.result.txid;
				console.log("tokenId -> ", token);
				done();
			});

	});


	it("transfer token", (done) => {
		var requestData = {
			peers: ["peer0.farmer.supplychain.com"],
			fcn: "transferFrom",
			chaincodeName: "token",
			channelName: "mychannel",
			args: ["x509::/OU=client/OU=farmer/OU=department1/CN=farmer02::/C=US/ST=California/L=San Francisco/O=farmer.supplychain.com/CN=ca.farmer.supplychain.com", nft]
		}

		chai.request(baseUrl)
			.post("/channels/my-channel1/chaincodes/chaincode1")
			.set("Content-Type", "application/json")
			.set("Authorization", "Bearer " + token)
			.send(requestData)
			.end((err, res) => {
				expect(res.body).to.have.property("result").to.have.property("result").to.have.property("txid");
				done();
			});
	});


	it("enroll farmer02", (done) => {
		const user = {
			username: "farmer02",
			orgName: "farmer",
			secret: secret[1]
		};

		chai
			.request(baseUrl)
			.post("/users/login")
			.set("Content-Type", "application/json")
			.send(user)
			.end((err, res) => {
				expect(res.body).to.have.property("success").equal(true);
				expect(res.body).to.have.property("message").to.have.property("token");
				token = res.body.message.token;
				done();
			});
	});



	it("adding metadata", (done) => {
		var requestData = {
			peers: ["peer0.farmer.supplychain.com"],
			fcn: "addMetadata",
			chaincodeName: "addMetadata",
			channelName: "mychannel",
			args: [nft, {data: "some data", moreData: "more data"}]
		}

		chai.request(baseUrl)
			.post("/channels/my-channel1/chaincodes/chaincode1")
			.set("Content-Type", "application/json")
			.set("Authorization", "Bearer " + token)
			.send(requestData)
			.end((err, res) => {
				expect(res.body).to.have.property("result").to.have.property("result").to.have.property("txid");
				done();
			});
	})

});