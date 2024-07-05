const hre = require("hardhat");
const  { ethers } = require("hardhat");
const { saveContractAddress, getSavedContractAddresses} = require('../utils')

async function main() {
    // get c2m token address from contract address file
    const c2mTokenAddress = getSavedContractAddresses()[hre.network.name]["C2M-TOKEN"];
    console.log("c2mTokenAddress: ", c2mTokenAddress)

    const air = await hre.ethers.getContractFactory("Airdrop");
    const Air = await air.deploy(c2mTokenAddress);
    const airAddress = await Air.getAddress();
    console.log("Air deployed to: ", airAddress);

    saveContractAddress(hre.network.name, "Airdrop-C2M", airAddress);
    // send c2m token to airdrop contract
    const c2mToken = await hre.ethers.getContractAt("C2MToken", c2mTokenAddress);
    let tx = await c2mToken.transfer(airAddress, ethers.parseEther("10000"));
    // wait for transfer
    await tx.wait();
    // get airdrop balance of c2m token
    const balance = await c2mToken.balanceOf(airAddress);
    console.log("Airdrop balance of C2M token: ", ethers.formatEther(balance));
    // test airdrop
    tx = await Air.withdrawTokens();
    await tx.wait();
    // get airdrop balance of c2m token
    const balanceAfter = await c2mToken.balanceOf(airAddress);
    console.log("Airdrop balance of C2M token after withdrawTokens: ", ethers.formatEther(balanceAfter));

}


main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
