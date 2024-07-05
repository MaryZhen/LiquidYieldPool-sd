// scripts/deployLock.js
const hre = require("hardhat")
const {ethers} = require('hardhat')
async function deployLock() {
    // 定义合约的Solidity源文件路径
    const contractName = 'Lock';
    const contractFactory = await hre.ethers.getContractFactory(contractName);
    // 构造函数参数，例如解锁时间为当前时间加上一天
    const unlockTime = (await hre.ethers.provider.getBlock('latest')).timestamp + 86400;
    // 部署合约
    const lockContract = await contractFactory.deploy(unlockTime, {
        value: ethers.parseEther('0.0000001') // 发送0.0000001 ETH作为合约的初始资金
    });
    console.info('deployedInfo============', lockContract)
    console.log(`Contract ${contractName} deployed at: ${lockContract.runner.address}`);
}
// 如果是直接运行脚本，请调用deployLock函数
deployLock()