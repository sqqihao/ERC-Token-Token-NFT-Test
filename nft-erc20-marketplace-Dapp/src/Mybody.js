import { useEffect, useState } from 'react';
import NFTABI from './NFTABI.json';
import { ethers } from 'ethers';
import marketplaceAbi from './NFTMarketplaceABI.json';


function Mybody(props) {
	const {provider,account,signer,mynftcontractaddress,marketplaceaddress} = props;
	const [mynfts, setMyNfts] = useState([]);
	
	useEffect(() => {
		if (provider) {
			fetchListedMyNFTs();
		}
	}, [provider]);



	const fetchListedMyNFTs = async () => {
		// try {
		const contract = new ethers.Contract(mynftcontractaddress, NFTABI, provider);
		const listedNFTs = await contract.tokensOfOwner(account); //获取我所有的NFT
		
		let formattedNFTs = listedNFTs.map(nft => ({
			tokenId: parseInt(nft)   // Seller is address, no need to convert
		}));

		setMyNfts(formattedNFTs);

		// } catch (error) {
		// 	console.error('Error fetching listed NFTs:', error);
		// }
	};
	const getNFTURL = (tokenId) => {
		return "http://www.idrwl.com/azuki/azuki"+tokenId%10+".png";
	}

	const appovenft = async(tokenId)=>{
		const contract = new ethers.Contract(mynftcontractaddress, NFTABI, signer);
		var tx = await contract.approve(marketplaceaddress,tokenId);
		console.log(await tx.wait());
	}


	const sellnft = async(tokenId,index)=>{
		var value = document.querySelectorAll(".mynft-cards input")[index].value;
		const contract = new ethers.Contract(marketplaceaddress, marketplaceAbi, signer);
		// debugger;
		var tx = await contract.sellNFT(parseInt(tokenId),parseInt(value));
		// debugger;
		console.log(await tx.wait());
	}
	return (
		<div>
			<div>
			      {mynfts.length > 0 ? (
			      	<div class="mynft-cards">
			          {mynfts.map((nft, index) => (
			            <div key={index} className="nft-card">
			              <img src={getNFTURL(nft.tokenId)}/>
			              <p>Token ID: {nft.tokenId}</p>
			              <p><input sellid={nft.tokenId}></input>token</p>
			              <button onClick={()=>appovenft(nft.tokenId)}>授权市场管理NFT</button>
			              <button onClick={()=>sellnft(nft.tokenId,index)}>出售NFT</button>
			            </div>
			          ))}
			        </div>
			      ) : (
			        <p>ALL my  NFTs currently listed.</p>
			      )}
			</div>
		</div>
	);
	return(<div></div>);
}

export default Mybody;
