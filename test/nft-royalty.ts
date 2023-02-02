import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { parseEther } from "ethers/lib/utils";
import { ethers } from "hardhat";
const tokenURI = "tokenURI";
describe("Testing ERC1155 Royalties", function () {
  async function deployContract() {
    const [deployer, wallet1, wallet2] = await ethers.getSigners();
    const NftRoyalties = await ethers.getContractFactory("NeokiNftRoyalty");
    const nft = await NftRoyalties.deploy();
    return {
      deployer,
      wallet1,
      wallet2,
      nft,
    };
  }
  it("Should have IERC2981 type", async function () {
    const { nft } = await loadFixture(deployContract);
    const type = await nft.supportsInterface("0x2a55205a");
    expect(type).to.be.true;
  });
  it("Should not let set Royalty of already minted tokens", async function () {
    const { nft, wallet1 } = await loadFixture(deployContract);
    const tokenId = await nft.mintWithRoyalties(
      wallet1.address,
      1,
      tokenURI,
      400,
      "0x"
    );
    await tokenId.wait();
    const royaltyInfo = await nft.royaltyInfo(1, parseEther("100"));
    expect(royaltyInfo[1]).to.equal(parseEther("4"));
  });
});
