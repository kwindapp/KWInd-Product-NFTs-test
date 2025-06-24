KKKKKKKKK    KKKKKKKWWWWWWWW                           WWWWWWWW iiii                               d::::::d
K:::::::K    K:::::KW::::::W                           W::::::Wi::::i                              d::::::d
K:::::::K    K:::::KW::::::W                           W::::::W iiii                               d::::::d
K:::::::K   K::::::KW::::::W                           W::::::W                                    d:::::d 
KK::::::K  K:::::KKK W:::::W           WWWWW           W:::::Wiiiiiiinnnn  nnnnnnnn        ddddddddd:::::d 
  K:::::K K:::::K     W:::::W         W:::::W         W:::::W i:::::in:::nn::::::::nn    dd::::::::::::::d 
  K::::::K:::::K       W:::::W       W:::::::W       W:::::W   i::::in::::::::::::::nn  d::::::::::::::::d 
  K:::::::::::K         W:::::W     W:::::::::W     W:::::W    i::::inn:::::::::::::::nd:::::::ddddd:::::d 
  K:::::::::::K          W:::::W   W:::::W:::::W   W:::::W     i::::i  n:::::nnnn:::::nd::::::d    d:::::d 
  K::::::K:::::K          W:::::W W:::::W W:::::W W:::::W      i::::i  n::::n    n::::nd:::::d     d:::::d 
  K:::::K K:::::K          W:::::W:::::W   W:::::W:::::W       i::::i  n::::n    n::::nd:::::d     d:::::d 
KK::::::K  K:::::KKK        W:::::::::W     W:::::::::W        i::::i  n::::n    n::::nd:::::d     d:::::d 
K:::::::K   K::::::K         W:::::::W       W:::::::W        i::::::i n::::n    n::::nd::::::ddddd::::::dd
K:::::::K    K:::::K          W:::::W         W:::::W         i::::::i n::::n    n::::n d:::::::::::::::::d
K:::::::K    K:::::K           W:::W           W:::W          i::::::i n::::n    n::::n  d:::::::::ddd::::d
KKKKKKKKK    KKKKKKK            WWW             WWW           iiiiiiii nnnnnn    nnnnnn   ddddddddd   ddddd
                                               

METAMASK BSC TEST

✅ Step-by-Step: Add BSC Testnet to MetaMask
Open MetaMask

Click your profile icon → "Settings"

Go to "Networks" → then click "Add Network"

Click "Add a network manually"

Fill in the following BSC Testnet settings:

🔧 BSC Testnet Configuration:
Field	Value
Network Name	BSC Testnet
New RPC URL	https://data-seed-prebsc-1-s1.binance.org:8545/
Chain ID	97
Currency Symbol	tBNB
Block Explorer	https://testnet.bscscan.com


IPFS Storage https://www.lighthouse.storage/



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