require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    sepolia_infura: {
        url: `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`,
        accounts: [process.env.PRIVATE_KEY]
    }
  },
  solidity: "0.8.24",
};
