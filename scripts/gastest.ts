import { ethers } from "hardhat";

async function main() {

  const MatToHash = await ethers.getContractFactory("MatToHash");
  const mth = await MatToHash.deploy();

  await mth.deployed();

  console.log(`Deployed MatToHash to ${mth.address}`);

  for(let i = 0; i < 200; i++) {
    let a = await mth.getHash(i)
    let receipt = await a.wait()
    let gasUsed = receipt.gasUsed;
    console.log(`${gasUsed}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
