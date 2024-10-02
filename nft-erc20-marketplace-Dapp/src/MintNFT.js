import { useEffect, useState ,useRef} from 'react';
import NFTABI from './NFTABI.json';
import { ethers } from 'ethers';

function MintNFT(props){
	const {mynftcontractaddress,provider,signer,account} = props;
	const [valTokenId,setValTokenId] = useState(0);

	const handleInputChange = (event) => {
		setValTokenId(event.target.value);  // 更新状态为输入框的当前值
	};

	const mintNFT = async () => {
		const contract = new ethers.Contract(mynftcontractaddress, NFTABI, signer);
		const tx = await contract.mint(account,valTokenId);
		console.log(await tx.wait());
	};
	return (
		<div>
			<div> mint NFT </div>
			<input value={valTokenId} onChange={handleInputChange}></input>
			<button onClick={mintNFT}>mint</button>
		</div>
	)
}
export default MintNFT;