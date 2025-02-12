const hre = require("hardhat");

async function main() {
    const chatapp = await hre.ethers.getContractFactory("ChatApp");
    const chatappContract = await chatapp.deploy();

    await chatappContract.deployed();

    console.log(`ChatApp deployed to: ${chatappContract.address}`);
}