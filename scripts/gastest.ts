import { ethers } from "hardhat";
import { randomBytes } from 'crypto';

async function main() {

  const MatToHash = await ethers.getContractFactory("MatToHash");
  const mth = await MatToHash.deploy();

  await mth.deployed();

  let ir = await mth.initResult()
  await ir.wait()

  for(let j = 0; j < 1024; j++) {
    const buf = randomBytes(32)
    let a = await mth.set(j, buf)
    await a.wait()
  }

  for(let exp = 0; exp < 11; exp++) {
    let exp2 = 2 ** exp;
    let a = await mth.getHash(exp2)
    let receipt = await a.wait()
    let gasUsed = receipt.gasUsed;
    console.log(`For ${exp2} elements ${gasUsed}`);
  }

  console.log(` `);
  console.log(` - - - - - `);
  console.log(` `);

  for(let i = 0; i < 1024; i++) {
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
