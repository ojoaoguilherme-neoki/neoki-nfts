import { ethers } from "hardhat";

async function main() {
  const NFTs = await ethers.getContractFactory("NeokiNFTs");
  const nfts = await NFTs.deploy();

  await nfts.deployed();

  console.log(`Neoki NFTs contract deployed to ${nfts.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
