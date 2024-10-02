	import { ethers } from "ethers";

	// Connect to the Ethereum network
	// const provider = new JsonRpcProvider();
	const ALCHEMY_SEPOLIA_URL = "https://eth-sepolia.g.alchemy.com/v2/1YybJp4OA3ZZDOrmhuzky8_MACPdghWu";

	const provider = new ethers.JsonRpcProvider(ALCHEMY_SEPOLIA_URL)

	const NFTMarketAddr = "0x1fb0867ab9cc4bab5943a99c15db302d51c6be10";

	// 利用私钥和provider创建wallet对象 ,chrome浏览器sepolia钱包
	const privateKey = 'dce5d37738aa89a435f1d0dfec8e8ba1df29da67f0fa68d3abed24a436829483';
	const wallet = new ethers.Wallet(privateKey, provider)
	
	//NFTMarket 的abi;
	const abi = '[{"inputs":[{"internalType":"address","name":"_erc20TokenAddress","type":"address"},{"internalType":"address","name":"_nftContractAddress","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"OwnableInvalidOwner","type":"error"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"OwnableUnauthorizedAccount","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"price","type":"uint256"},{"indexed":true,"internalType":"address","name":"seller","type":"address"}],"name":"NFTListedForSale","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"price","type":"uint256"},{"indexed":true,"internalType":"address","name":"seller","type":"address"},{"indexed":true,"internalType":"address","name":"buyer","type":"address"}],"name":"NFTSold","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"buyNFT","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"cancelSellNFT","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"erc20Token","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"nftContract","outputs":[{"internalType":"contract IERC721","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"nftListings","outputs":[{"internalType":"uint256","name":"price","type":"uint256"},{"internalType":"address","name":"seller","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"price","type":"uint256"}],"name":"sellNFT","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}]';

	const contractMarketWithWallet = new ethers.Contract(NFTMarketAddr, abi, wallet)


	const main = async () => {

		
		let tx = await contractMarketWithWallet.buyNFT("9");
		// console.log(tx)
		await tx.wait();



	}
	// main()

	// const checkBalance = async() => {

	// }
	// checkBalance();