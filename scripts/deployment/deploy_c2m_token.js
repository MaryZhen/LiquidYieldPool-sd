const hre = require("hardhat");
const { saveContractAddress } = require('../utils')
async function main() {
    const tokenName = "C2M";
    const symbol = "C2M";
    const totalSupply = "1000000000000000000000000000";


    const MCK = await hre.ethers.getContractFactory("C2MToken");
    const token = await MCK.deploy(tokenName, symbol, totalSupply);
    const deployedAddress = await token.getAddress()
    // await token.deployed();
    console.log("C2M deployed to: ", deployedAddress);
    saveContractAddress(hre.network.name, "C2M-TOKEN", deployedAddress);
}
main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
