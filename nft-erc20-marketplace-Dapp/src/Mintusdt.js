import ERCABI from "./ERCABI.json";
import { useEffect, useState ,useRef} from 'react';
import { ethers } from 'ethers';
function Mintusdt(props){
	const {brc20minmoney,provider,signer,account} = props;
	const [bal,setbal] = useState(0);
	const [addr,setAddr] = useState("");
	const [tokennum,setTokennum] = useState(1000000);

	useEffect(() => {
		if (provider) {
			// fetchListedMyNFTs();
			getBalance();
		}
	}, [provider]);


	const mintU = async () => {
		const contract = new ethers.Contract(brc20minmoney, ERCABI, signer);
		const tx = await contract.mint("1000000000000"); 
		console.log(await tx.wait());
	};
	const getBalance = async () => {
		const contract = new ethers.Contract(brc20minmoney, ERCABI, provider);
		// debugger;
		const tx = await contract.balanceOf(account); 
		console.log(tx);
		setbal(parseInt(tx));
	}

	const tokennumchange = (event) => {
		setTokennum(event.target.value);  // 更新状态为输入框的当前值
	};


	const addrchange = (event) => {
		setAddr(event.target.value);  // 更新状态为输入框的当前值
	};

	const transferBalance = async () => {
		console.log(addr,tokennum)

		const contract = new ethers.Contract(brc20minmoney, ERCABI, signer);
		const tx = await contract.transfer(addr,tokennum); 
		console.log(await tx.wait());
	}

	return (
		<div>
			<div>{bal}token</div>
			<div>mint token</div>
			<button onClick={mintU}>mintU</button>
			<button onClick={getBalance}>getBalance</button>
			<div class="clear"></div>
			<div>transfer token</div>
			<input value={addr} placeholder="address" onChange={addrchange}></input>
			<input value={tokennum} placeholder="tokennum" onChange={tokennumchange}></input>
			<button onClick={transferBalance}>transferBalance</button>
		</div>
	);
}
export default Mintusdt;