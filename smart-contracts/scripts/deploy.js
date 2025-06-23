const main = async () => {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contract with account:", deployer.address);

  const ProductNFT = await ethers.getContractFactory("ProductNFT");
  const productNFT = await ProductNFT.deploy();

  await productNFT.waitForDeployment();  // <-- fix here for ethers v6

  console.log("Contract deployed at:", productNFT.target);  // ethers v6 uses `.target`
}

main();
