88    d8P  888       888 d8b               888 
888   d8P   888   o   888 Y8P               888 
888  d8P    888  d8b  888                   888 
888d88K     888 d888b 888 888 88888b.   .d88888 
8888888b    888d88888b888 888 888 "88b d88" 888 
888  Y88b   88888P Y88888 888 888  888 888  888 
888   Y88b  8888P   Y8888 888 888  888 Y88b 888 
888    Y88b 888P     Y888 888 888  888  "Y88888 


# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/Lock.js
```
To deploy your smart contract on BSC Mainnet (normal Binance Smart Chain, not testnet), you need to make several safe but important changes to your project.

✅ 1. Update Hardhat Network Config
In hardhat.config.js, add the BSC mainnet settings:

js
Copy
Edit
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config(); // Make sure you load .env variables

module.exports = {
  solidity: "0.8.24",
  networks: {
    bsc: {
      url: "https://bsc-dataseed.binance.org/", // ✅ BSC mainnet RPC
      chainId: 56,
      accounts: [process.env.PRIVATE_KEY] // Load wallet key from .env
    },
    // optional: keep testnet config if needed
    bsctestnet: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545",
      chainId: 97,
      accounts: [process.env.PRIVATE_KEY]
    }
  }
};
✅ 2. Set Your .env File
Create a .env file (if not already there) in the root folder and add:

bash
Copy
Edit
PRIVATE_KEY=your_private_key_here  # DO NOT QUOTE IT
⚠️ Use a wallet that has BNB for gas and is safe to use for mainnet!
⚠️ NEVER commit this .env file to GitHub.

✅ 3. Deploy Script Update
In scripts/deploy.js, make sure it uses the correct network:

bash
Copy
Edit


npx hardhat run scripts/deploy.js --network bsc



If deploy.js is correct, no changes are needed — it should look like this:

js
Copy
Edit
async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contract with account:", deployer.address);

  const ProductNFT = await ethers.getContractFactory("ProductNFT");
  const productNFT = await ProductNFT.deploy();
  await productNFT.waitForDeployment();

  console.log("Contract deployed at:", await productNFT.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
✅ 4. Fund Wallet with BNB
Your deployer wallet (used in PRIVATE_KEY) must have BNB on BSC mainnet for gas.
You can buy BNB on Binance or transfer from another wallet.

✅ 5. Verify Contract (Optional but recommended)
After deploying, you can verify the contract using:

bash
Copy
Edit
npx hardhat verify --network bsc <DEPLOYED_CONTRACT_ADDRESS>
✅ 6. Frontend Code
Update the contract address in your frontend:

js
Copy
Edit
const contractAddress = "0xYOUR_MAINNET_DEPLOYED_ADDRESS"