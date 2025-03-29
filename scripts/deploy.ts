import { ethers } from "hardhat";

async function main() {
    // Get the contract factory
    const ContractFactory = await ethers.getContractFactory("Voting");

    // Deploy contract
    const contract = await ContractFactory.deploy();  

    await contract.waitForDeployment();  

    console.log("Contract deployed to:", await contract.getAddress());
}

main().catch((error: unknown) => {
    console.error("Error deploying contract:", error);
    process.exitCode = 1;
});
