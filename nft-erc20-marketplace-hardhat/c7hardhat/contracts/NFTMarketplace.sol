// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTMarketplace is Ownable {
    IERC20 public erc20Token; // ERC20 代币合约
    IERC721 public nftContract; // NFT 合约

    struct NFTData {
        uint256 price; // NFT 价格
        address seller; // 卖家地址
    }

    struct ListedNFT {
        uint256 tokenId; // NFT 的 tokenId
        uint256 price;   // NFT 价格
        address seller;  // 卖家地址
    }

    // 存储每个 NFT 的销售信息（通过 tokenId 关联）
    mapping(uint256 => NFTData) public nftListings;

    // 存储已上架 NFT 的 tokenId 列表
    uint256[] public listedNFTs;

    // 声明事件，用于记录 NFT 的上架和购买行为
    event NFTListedForSale(uint256 indexed tokenId, uint256 price, address indexed seller);
    event NFTSold(uint256 indexed tokenId, uint256 price, address indexed seller, address indexed buyer);

    constructor(address _erc20TokenAddress, address _nftContractAddress) Ownable(msg.sender) {
        erc20Token = IERC20(_erc20TokenAddress); // 初始化 ERC20 代币地址
        nftContract = IERC721(_nftContractAddress); // 初始化 NFT 合约地址
    }

    function sellNFT(uint256 tokenId, uint256 price) public {
        require(nftContract.ownerOf(tokenId) == msg.sender, "You are not the owner of this NFT");
        // 确保市场合约被授权管理 NFT
        require(nftContract.getApproved(tokenId) == address(this), "Marketplace is not approved to manage this NFT");

        nftListings[tokenId] = NFTData({
            price: price,
            seller: msg.sender
        });

        listedNFTs.push(tokenId); // 添加到已上架列表

        emit NFTListedForSale(tokenId, price, msg.sender);
    }

    function cancelSellNFT(uint256 tokenId) public {
        require(nftContract.ownerOf(tokenId) == msg.sender, "You are not the owner of this NFT");
        delete nftListings[tokenId];

        // 从已上架列表中移除 tokenId
        for (uint256 i = 0; i < listedNFTs.length; i++) {
            if (listedNFTs[i] == tokenId) {
                listedNFTs[i] = listedNFTs[listedNFTs.length - 1];
                listedNFTs.pop();
                break;
            }
        }
    }

    function buyNFT(uint256 tokenId) public {
        NFTData memory nftData = nftListings[tokenId];
        require(nftData.price > 0, "This NFT is not for sale");
        require(erc20Token.balanceOf(msg.sender) >= nftData.price, "Insufficient ERC20 balance");
        require(erc20Token.allowance(msg.sender, address(this)) >= nftData.price, "Allowance too low");

        erc20Token.transferFrom(msg.sender, address(this), nftData.price);
        nftContract.safeTransferFrom(nftData.seller, msg.sender, tokenId);

        emit NFTSold(tokenId, nftData.price, nftData.seller, msg.sender);
        delete nftListings[tokenId];

        // 从已上架列表中移除 tokenId
        for (uint256 i = 0; i < listedNFTs.length; i++) {
            if (listedNFTs[i] == tokenId) {
                listedNFTs[i] = listedNFTs[listedNFTs.length - 1];
                listedNFTs.pop();
                break;
            }
        }
    }

    // 获取当前所有上架的 NFT 列表（包含 tokenId、价格和卖家地址）
    function getListedNFTs() public view returns (ListedNFT[] memory) {
        ListedNFT[] memory listedNFTDetails = new ListedNFT[](listedNFTs.length);

        for (uint256 i = 0; i < listedNFTs.length; i++) {
            uint256 tokenId = listedNFTs[i];
            NFTData memory nftData = nftListings[tokenId];

            listedNFTDetails[i] = ListedNFT({
                tokenId: tokenId,
                price: nftData.price,
                seller: nftData.seller
            });
        }

        return listedNFTDetails;
    }
}
