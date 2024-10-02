	import { ethers } from "ethers";

	// Connect to the Ethereum network
	// const provider = new JsonRpcProvider();
	const ALCHEMY_SEPOLIA_URL = "https://eth-sepolia.g.alchemy.com/v2/1YybJp4OA3ZZDOrmhuzky8_MACPdghWu";

	const provider = new ethers.JsonRpcProvider(ALCHEMY_SEPOLIA_URL)

	const ERC20ContractAddr = "0x33be362fb4f513223cf7fcb25f4d986979e9f0ac";

	// 利用私钥和provider创建wallet对象 chrome浏览器sepolia钱包
	const privateKey = 'dce5d37738aa89a435f1d0dfec8e8ba1df29da67f0fa68d3abed24a436829483';
	const wallet = new ethers.Wallet(privateKey, provider)
	
	//ERC20 的abi;
	const abi = '[{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"value","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimal","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"value","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}]';

	const ERC20ContractAddrWithWallet = new ethers.Contract(ERC20ContractAddr, abi, wallet)

	const main = async () => {
		
		console.log("获取授权金额");
		
		//当前购买的钱包要给NFTmarket市场授权
		let appove = await ERC20ContractAddrWithWallet.approve("0x1fb0867ab9cc4bab5943a99c15db302d51c6be10","9000000000000000000");
		// console.log(tx)
		await appove.wait();	

		//查询当前钱包对市场的授权情况，允许后面从nft市场购买nft后， 合约从钱包扣钱
		let getApproveValue = await	ERC20ContractAddrWithWallet.allowance("0xDd7d4861D1bC128A04037FCD223Ee09F15dB4d67","0x1fb0867ab9cc4bab5943a99c15db302d51c6be10");
		console.log("授权金额为:"+getApproveValue)

		let balanceMindBefore = await ERC20ContractAddrWithWallet.balanceOf(wallet);
		console.log(balanceMindBefore)

		console.log("mint - before");
		let tx = await ERC20ContractAddrWithWallet.mint("9000000");
		// console.log(tx)
		await tx.wait();
		console.log("mint - done");

		 let balance = await ERC20ContractAddrWithWallet.balanceOf(wallet);
		 console.log(balance)

	}
	main()