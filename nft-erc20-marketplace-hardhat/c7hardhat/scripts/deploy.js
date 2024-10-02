// scripts/deploy.js



// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const { ethers } = require('hardhat');

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log('Deploying contracts with the account:', deployer.address);

  console.log('Account balance:', (await ethers.provider.getBalance(deployer.address)).toString());

  const MyNFT = await ethers.getContractFactory('MyNFT'); 
  const myMyNFT = await MyNFT.deploy();
  await myMyNFT.waitForDeployment()
  console.log('MyNFT deploy address:', myMyNFT.target);


  const Token = await ethers.getContractFactory('ERC20');
  const token = await Token.deploy();
  await token.waitForDeployment()
  console.log('ERC20 deploy address:', token.target);

// sepolia链
// MyNFT deploy address: 0x1A6E68ef56cC19B67c1ec033cAc518f43589e424
// ERC20 deploy address: 0x2956a0A96eEe8BA811551E4Ed4Cf5A58F46C0249
// NFTMarketplace deploy address: 0x23F0cbDD44969Bd1ca95C6B4eCcD7144B7131E08


//localhost本地链
// MyNFT deploy address: 0x5FbDB2315678afecb367f032d93F642f64180aa3
// ERC20 deploy address: 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
// NFTMarketplace deploy address: 0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0

  const NFTMarketplace = await ethers.getContractFactory('NFTMarketplace');
  const myNFTMarketplace = await NFTMarketplace.deploy(token.target, myMyNFT.target);
  await myNFTMarketplace.waitForDeployment();
  console.log('NFTMarketplace deploy address:', myNFTMarketplace.target);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });