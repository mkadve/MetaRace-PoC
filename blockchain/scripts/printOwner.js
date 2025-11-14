const hre = require("hardhat");

async function main() {
  const [account] = await hre.ethers.getSigners();
  const address = await account.getAddress();
  let privateKey = account.privateKey;

  if (!privateKey && account._signingKey) {
    privateKey = account._signingKey().privateKey;
  }

  console.log(
    JSON.stringify(
      {
        address,
        privateKey,
      },
      null,
      2
    )
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

