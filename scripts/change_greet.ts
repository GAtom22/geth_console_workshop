import { ethers } from "hardhat";
import Web3 from "web3";

// change the contract address to the one printed 
// when running the deploy.ts script
const CONTRACT_ADDRESS = "0x6b2FcF61948bb081487538063dad8d62e2D39d38"

async function main() {
    const web3 = new Web3(Web3.givenProvider);

    const Greeter = await ethers.getContractFactory("Greeter");
    const greeter = Greeter.attach(CONTRACT_ADDRESS);

    const tx = await greeter.setGreeting("aloha")
    await tx.wait();

    console.log(`Greeting changed! tx hash: ${tx.hash}`);
    
    const changeGreetingTopic = web3.utils.keccak256("ChangeGreeting(address,string)")
    console.log(`Emitted event with topic ${changeGreetingTopic}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
