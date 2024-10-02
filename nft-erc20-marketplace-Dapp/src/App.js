import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

//react组件的函数名字要大写
import Header from './Header';
import Mybody from './Mybody';
import NFTList from "./NFTList";
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import {brc20minmoney,mynftcontractaddress,marketplaceaddress} from "./config";

function App() {
	const [provider, setProvider] = useState(null);
	const [account, setAccount] = useState(null);
	const [signer, setSigner] = useState(null);
	const [balance, setBalance] = useState('');       // 用于存储用户的余额

	const web3Modal = new Web3Modal({
		cacheProvider: true, // optional
	});

	useEffect(() => {
		if (web3Modal.cachedProvider) {
		  connectWallet();
		}
	}, []);

	const connectWallet = async () => {

		// 显示钱包选择
		const connection = await web3Modal.connect();
		const web3Provider = new ethers.BrowserProvider(connection);
		//provider只能获取，signer可以发送eth交易等操作;
		const signer = await web3Provider.getSigner();

		const userAccount = await signer.getAddress();
		setAccount(userAccount);

		// 获取用户账户余额（以 ETH 为单位）
		const balance = await web3Provider.getBalance(userAccount);
		setBalance(ethers.formatEther(balance)); // 将余额格式化为 ETH 并存储

		setProvider(web3Provider);
		setSigner(signer);

	};

	return (
		<div>
			<div class="clear"></div>
			<button onClick={connectWallet}>连接NFT钱包</button>
				{account && <p>NFT钱包用户: {account}</p>}
				{balance && <p>钱包余额: {balance}ETH</p>}
			<Mybody provider={provider} account={account} signer={signer} mynftcontractaddress={mynftcontractaddress} marketplaceaddress={marketplaceaddress}></Mybody>
			<div class="clear"></div>
			<NFTList provider={provider} account={account} signer={signer} marketplaceaddress={marketplaceaddress} brc20minmoney={brc20minmoney}></NFTList>
		</div>
	);
}

export default App;

