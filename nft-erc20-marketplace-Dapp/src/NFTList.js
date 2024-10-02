import { useEffect, useState } from 'react';
import marketplaceAbi from './NFTMarketplaceABI.json';
import ERCABI from "./ERCABI.json";
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import "./nft.css";



function NFTList(props){

	const {provider,account,signer,marketplaceaddress,brc20minmoney} = props;
	const [nfts, setNfts] = useState([]);
	/*
		副作用函数：在组件渲染后执行的函数，用于处理副作用。
		依赖数组（可选）：用来控制 useEffect 的执行时机。数组内的值发生变化时，useEffect 会重新执行。
	*/
	useEffect(() => {
		if (provider) {
			fetchListedNFTs();
		}
	}, [provider]);

	// 获取上架的 NFT 信息
	const fetchListedNFTs = async () => {
		try {
			const contract = new ethers.Contract(marketplaceaddress, marketplaceAbi, provider);
			const listedNFTs = await contract.getListedNFTs(); // 假设合约有这个方法
			// console.log(listedNFTs);
			let nftDicObj = {};
			let formattedNFTs = listedNFTs.map(nft => ({
				tokenId: nft.tokenId.toString(),     // Convert BigInt to string
				price: nft.price.toString(),         // Convert price (BigInt) to string
				seller: nft.seller                   // Seller is address, no need to convert
			})).filter(function(nft){
				//对数据进行去重，因为可以多次发布nft数据导致链上NFT数据重复
				if(!nftDicObj[nft.tokenId]) {
					nftDicObj[nft.tokenId] = true;
					return true;
				}else{
					return false;
				}
			});
			console.log(formattedNFTs)

			// debugger;
			setNfts(formattedNFTs);
		} catch (error) {
			console.error('Error fetching listed NFTs:', error);
		}
	};
	const approve = async(price) => {
		const contract = new ethers.Contract(brc20minmoney, ERCABI, signer);
		//9000000000000000000的16进制就是[1]:  0000000000000000000000000000000000000000000000007ce66c50e2840000
		const tx = await contract.approve(marketplaceaddress,price);
		console.log(await tx.wait());
	};
	const buyNFT = async (tokenId) => {
		const contract = new ethers.Contract(marketplaceaddress, marketplaceAbi, signer);
		const tx = await contract.buyNFT(tokenId);
		console.log(await tx.wait());
	};
	const cancelNFT = async (tokenId) => {
		const contract = new ethers.Contract(marketplaceaddress, marketplaceAbi, signer);
		const tx = await contract.cancelSellNFT(tokenId);
		console.log(await tx.wait());
	};
	const getNFTURL = (tokenId) => {
		return "http://www.idrwl.com/azuki/azuki"+tokenId%10+".png";
	}

	return (
		<div>
			<h1>NFT Marketplace</h1>
		      {nfts.length > 0 ? (
		        <div>
		          {nfts.map((nft, index) => (
		            <div key={index} className="nft-card">
			          <img src={getNFTURL(nft.tokenId)}/>
		              <p>Token ID: {nft.tokenId}</p>
		              <p>Price: {nft.price} token</p>
		              <p>Seller: {nft.seller}</p>
		              
		              {(nft.seller != account)?(<button onClick={()=>{approve(nft.price)}}>授权token给市场</button>):(<span></span>)}
		              {(nft.seller != account)?(<button onClick={()=>{buyNFT(nft.tokenId)}}>购买nft</button>):(<button onClick={()=>{cancelNFT(nft.tokenId)}}>取消出售nft</button>)}
		            </div>
		          ))}
		        </div>
		      ) : (
		        <p>No NFTs currently listed.</p>
		      )}
		</div>
	);
}

export default NFTList;