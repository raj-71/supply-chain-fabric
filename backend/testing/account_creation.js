const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const baseUrl = "http://localhost:4000";

chai.use(chaiHttp);

var token;
let nft;
let secret = [];

let startId = 1;
let endId = 1;

describe("First test", () => {

    for (let i = startId; i <= endId; i++) {
        it("register farmer -> farmer0" + i, (done) => {
            const user = {
                username: "farmer0" + i,
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
                    }
                    else {
                        expect(res.body).to.have.property("success").equal(true);
                        expect(res.body).to.have.property("token");
                        expect(res.body).to.have.property("secret");
                        console.log("Response: ", res.body);
                        secret.push(res.body.secret);
                        done();
                    }
                });
        });
    }

    // it("register farmer -> farmer01", (done) => {
    //     const user = {
    //         username: "farmer01",
    //         orgName: "farmer",
    //     };

    //     chai
    //         .request(baseUrl)
    //         .post("/register")
    //         .set("Content-Type", "application/json")
    //         .send(user)
    //         .end((err, res) => {
    //             if (err) {
    //                 console.log("#################");
    //                 console.log("ERROR: ", err);
    //                 console.log("#################");
    //                 done();
    //             } else {
    //                 expect(res.body).to.have.property("success").equal(true);
    //                 expect(res.body).to.have.property("token");
    //                 expect(res.body).to.have.property("secret");
    //                 secret.push(res.body.secret);
    //                 done();
    //             }
    //         });
    // });

    // it("register farmer -> farmer02", (done) => {
    //     const user = {
    //         username: "farmer02",
    //         orgName: "farmer",
    //     };

    //     chai
    //         .request(baseUrl)
    //         .post("/register")
    //         .set("Content-Type", "application/json")
    //         .send(user)
    //         .end((err, res) => {
    //             if (err) {
    //                 console.log("#################");
    //                 console.log("ERROR: ", err);
    //                 console.log("#################");
    //                 done();
    //             } else {
    //                 expect(res.body).to.have.property("success").equal(true);
    //                 expect(res.body).to.have.property("token");
    //                 expect(res.body).to.have.property("secret");
    //                 secret.push(res.body.secret);
    //                 done();
    //             }
    //         });
    // });
});