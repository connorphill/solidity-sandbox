const chai = require("chai");
let expect = chai.expect;
const { ethers } = require("hardhat");
const { solidity } = require("ethereum-waffle");
chai.use(solidity);

// WIP

describe("ERC20Token", async function () {

    let ERC20Token;
    let token;
    let deployedToken;
    let tokenSupply;
    
    // `beforeEach` will run before each test, re-deploying the contract every
    // time. It receives a callback, which can be async.
    beforeEach(async function () {
        [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
        ERC20Token = await ethers.getContractFactory("ERC20Token");
        token = await ERC20Token.deploy(100000000);
        deployedToken = await token.deployed();
    });

    describe("Deployment", function() {
        // it("Should assign the right owner", async function(){
        //     expect(await deployedToken.owner()).to.equal(owner.address);
        // })

        it("Should return 100000000 for the total token supply after initial deployment", async function () {
            tokenSupply = await deployedToken.totalSupply();
            expect(tokenSupply).to.equal(100000000);
        });

        it("Should assign the total token supply to equal the contract owner balance", async function(){
            const ownerBalance = await deployedToken.balanceOf(owner.address);
            tokenSupply = await deployedToken.totalSupply();
            expect(tokenSupply).to.equal(ownerBalance);
        });
    });

    describe("Transactions", function() {
        it("Should transfer tokens to receiver as long as sender balance is less than amount sent and should emit message"), async function(){
            
        }
    });

    // describe("Calls", function() {
    //     it("Should return the token balance of the owner", async function() {
    //         assert
    //     });
    // });
});
