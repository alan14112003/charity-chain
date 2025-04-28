require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-ethers");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    hardhat: {}, // Mạng Hardhat mặc định

    development: {
      url: "http://127.0.0.1:7545", // Địa chỉ IP của Ganache CLI
      accounts: [`0x1db0746fb641753a963168681122dd3c420c32f43e52e90e3055a1cb441d55b4`], // Thêm khóa riêng tư của bạn ở đây
    }
  }
};
