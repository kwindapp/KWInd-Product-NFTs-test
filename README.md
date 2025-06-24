This is the NFT Minter starter template.
<img width="834" alt="Screenshot 2025-06-23 at 19 17 34" src="https://github.com/user-attachments/assets/ef6d86f0-fc1a-4446-b5c5-4dee63a83423" />

## Getting Started

Clone or download the repo.
Navigate into the donwloaded/cloned folder and install the dependencies typing the command

```bash
npm install
```
<img width="1512" alt="Screenshot 2025-06-21 at 04 47 09" src="https://github.com/user-attachments/assets/603d6900-1211-4450-8311-dbadc2bda093" />

Step 2: Replace await productNFT.deployed() with await productNFT.waitForDeployment()
Here’s the corrected code:

jStep 2: Replace await productNFT.deployed() with await productNFT.waitForDeployment()
Here’s the corrected code:

js
Copy
Edit
const main = async () => {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contract with account:", deployer.address);

  const ProductNFT = await ethers.getContractFactory("ProductNFT");
  const productNFT = await ProductNFT.deploy();

  await productNFT.waitForDeployment();  // <-- fix here for ethers v6

  console.log("Contract deployed at:", productNFT.target);  // ethers v6 uses `.target`
}

main();
Step 3: Run the script again
bash
Copy
Edit


npx hardhat run scripts/deploy.js --network bsctestnet



Deploying contract with account: 0x0DaDd3f160C764d6bD29795891319Dec55d71903
Contract deployed at: 0x07B49297b82Dd7F72140D1b5fBBeD0f428452513


ChatGPT said:
Nice! 🎉 Your contract deployed successfully at:

0x07B49297b82Dd7F72140D1b5fBBeD0f428452513



**********************************************************************************************************************************************


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