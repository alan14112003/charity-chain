// scripts/deploy.js
async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    const BankTransferRegistry = await ethers.getContractFactory("BankTransferRegistry");
    const contract = await BankTransferRegistry.deploy();

    console.log("BankTransferRegistry deployed to:", contract);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
