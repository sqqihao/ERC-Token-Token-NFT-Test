require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task('accounts', 'Prints the list of accounts', async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

function mnemonic() {
  //can config 3 PRIVATE_KEY
  //return process.env.PRIVATE_KEY,process.env.PRIVATE_KEY1,process.env.PRIVATE_KEY2;
  return process.env.PRIVATE_KEY;
}

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: '0.8.20',
  networks: {
    localhost: {
      url: 'http://localhost:8545',
      //gasPrice: 125000000000,  // you can adjust gasPrice locally to see how much it will cost on production
      /*
        notice no mnemonic here? it will just use account 0 of the hardhat node to deploy
        (you can put in a mnemonic here to set the deployer locally)
      */
    },

    // 配置 alchemy 测试网络
    alchemy: {
      url: `https://eth-sepolia.g.alchemy.com/v2/1YybJp4OA3ZZDOrmhuzky8_MACPdghWu`, // Infura 项目 ID
      // accounts: [mnemonic()] // 你的私钥
    },
    mainnet: {
      url: 'https://mainnet.infura.io/v3/' + process.env.INFURA_ID, //<---- CONFIG YOUR INFURA ID IN .ENV! (or it won't work)
      // accounts: [mnemonic()],
    },
  },
  etherscan: {
    apiKey: {
      sepolia: process.env.APIKEY
    } ,
  },
  solidity: {
    version: "0.8.20", // 合约编译的版本，必填
    settings: { // 编译设置，选填
      optimizer: {  // 优化设置
        enabled: true,
        runs: 200
      }
    }
  },
  // 项目路径配置，可指定任意路径，但下列是常用的一种结构
  // sources, tests, scripts 下的目录文件会被自动逐一执行
  paths: {
    sources: "./contracts", // 合约目录
    tests: "./test",  // 测试文件目录
    cache: "./cache", // 缓存目录，由hardhat自动生成
    artifacts: "./artifacts" // 编译结果目录，由hardhat自动生成
  },
  // 测试框架设置
  mocha: {
    timeout: 20000  // 运行单元测试的最大等待时间
  },
  sourcify: {
    // Disabled by default
    // Doesn't need an API key
    enabled: true
  }
};