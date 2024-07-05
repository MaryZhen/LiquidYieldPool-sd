const hre = require("hardhat");
const {saveContractAddress, getSavedContractAddresses} = require('../utils')
const {ethers} = require("hardhat");

async function main() {
    const RPS = "1";
    const now = new Date();
    const timestampInSeconds = Math.floor(now.getTime() / 1000);
    const startTS = timestampInSeconds + 300
    // get c2m token address from contract address file
    const c2mTokenAddress = getSavedContractAddresses()[hre.network.name]["C2M-TOKEN"];
    console.log("c2mTokenAddress: ", c2mTokenAddress)

    const farm = await hre.ethers.getContractFactory("FarmingC2M");
    const Farm = await farm.deploy(c2mTokenAddress, ethers.parseEther(RPS), startTS);
    const farmC2MAddress = await Farm.getAddress()
    console.log("Farm deployed to: ", farmC2MAddress);

    saveContractAddress(hre.network.name, "FarmingC2M", farmC2MAddress);

    // fund the farm
    // approve the farm to spend the token
    const C2M = await hre.ethers.getContractAt("C2MToken", c2mTokenAddress);
    const approveTx = await C2M.approve(farmC2MAddress, ethers.parseEther('1000000'));
    await approveTx.wait();
    let tx = await Farm.fund(ethers.parseEther('1000000'));
    await tx.wait();
    // add lp token
    const lpTokenAddress = getSavedContractAddresses()[hre.network.name]["C2M-TOKEN"];
    console.log("lpTokenAddress====: ", lpTokenAddress);
    await Farm.add(100, lpTokenAddress, true);
    console.log("Farm funded and LP token added", 'totalRewards====', await Farm.totalRewards());
}


main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
