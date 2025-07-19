// scripts/deploy.ts

import { ethers } from "hardhat";

async function main() {
  const Voting = await ethers.getContractFactory("PrivateVoting");
  const voting = await Voting.deploy();
  await voting.waitForDeployment();

  console.log(`✅ Contract deployed to: ${voting.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
