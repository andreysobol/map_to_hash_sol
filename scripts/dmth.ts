import { ethers } from "hardhat";

async function main() {

  const MatToHash = await ethers.getContractFactory("MatToHash");
  const mth = await MatToHash.deploy();

  await mth.deployed();

  console.log(`Deployed MatToHash to ${mth.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
