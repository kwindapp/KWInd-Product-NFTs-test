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