import { useEffect, useState } from 'react';
import React from 'react';
import Mintusdt from "./Mintusdt"
import MintNFT from "./MintNFT";
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import {brc20minmoney,mynftcontractaddress,marketplaceaddress} from "./config";

function Admin(){

	const [provider, setProvider] = useState(null);
	const [account, setAccount] = useState(null);
	const [signer, setSigner] = useState(null);

	const loadWeb3Modal = async () => {

		const web3Modal = new Web3Modal({
			cacheProvider: true, // optional
		});

		// 显示钱包选择
		const connection = await web3Modal.connect();
		const web3Provider = new ethers.BrowserProvider(connection);
		//provider只能获取，signer可以发送eth交易等操作;
		const signer = await web3Provider.getSigner();

		const userAccount = await signer.getAddress();
		setAccount(userAccount);

		setProvider(web3Provider);
		setSigner(signer);

	};

	return (
		<div>
			<div class="clear"></div>
			<button onClick={loadWeb3Modal}>连接NFT钱包</button>
			<Mintusdt brc20minmoney={brc20minmoney} provider={provider} signer={signer} account={account}></Mintusdt>

			<div class="clear"></div>
			<MintNFT mynftcontractaddress={mynftcontractaddress} provider={provider} signer={signer} account={account}></MintNFT>

		</div>);
}
export default Admin;