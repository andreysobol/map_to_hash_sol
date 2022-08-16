import { ethers } from "hardhat";
import { randomBytes } from 'crypto';

async function main() {

  const MatToHash = await ethers.getContractFactory("MatToHash");
  const mth = await MatToHash.deploy();

  await mth.deployed();

  let ir = await mth.initResult()
  await ir.wait()

  for(let j = 0; j < 1000; j++) {
    const buf = randomBytes(32)
    let a = await mth.set(j, buf)
    await a.wait()
  }

  for(let i = 0; i < 200; i++) {
    let a = await mth.getHash(i)
    let receipt = await a.wait()
    let gasUsed = receipt.gasUsed;
    console.log(`For ${i} elements ${gasUsed}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
