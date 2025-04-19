require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-ethers");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    hardhat: {}, // Mạng Hardhat mặc định

    development: {
      url: "http://127.0.0.1:7545", // Địa chỉ IP của Ganache CLI
      accounts: [`0x7cac5f292f27ce539e0d845a9efc077249f4b1f36e6720de586fbf3d5e6cded8`], // Thêm khóa riêng tư của bạn ở đây
    }
  }
};
