import sdk from "./1-initialize-sdk.js";

(async () => {
  try {
    // This is the address to our ERC-1155 membership NFT contract.
    const editionDrop = await sdk.getContract(
      "0x69D7642Cd70DdA4aa2F28CF56B5fD3ca762c7428",
      "edition-drop"
    );
    // This is the address to our ERC-20 token contract.
    const token = await sdk.getContract(
      "0xcc0A01571dD1A32075F72D84DE6c32997b64bC0b",
      "token"
    );
    // Grab all the addresses of people who own our membership NFT, which has
    // a tokenId of 0.
    const walletAddresses = [
      "0x042b13939dc5789de524e44bebd0fc18b672bf35",
      "0xb4f359ce5e71e789aa4084ce34212684adf612e2",
      "0x9acf9cc48f2f820777055a5d248f14a76af0fb3e",
    ];

    console.log(walletAddresses);
    if (walletAddresses.length === 0) {
      console.log(
        "No NFTs have been claimed yet, maybe get some friends to claim your free NFTs!"
      );
      process.exit(0);
    }

    // Loop through the array of addresses.
    const airdropTargets = walletAddresses.map((address) => {
      // Pick a random # between 1000 and 10000.
      const randomAmount = Math.floor(
        Math.random() * (10000 - 1000 + 1) + 1000
      );
      console.log("✅ Going to airdrop", randomAmount, "tokens to", address);

      // Set up the target.
      const airdropTarget = {
        toAddress: address,
        amount: randomAmount,
      };

      return airdropTarget;
    });

    // Call transferBatch on all our airdrop targets.
    console.log("🌈 Starting airdrop...");
    await token.transferBatch(airdropTargets);
    console.log(
      "✅ Successfully airdropped tokens to all the holders of the NFT!"
    );
  } catch (err) {
    console.error("Failed to airdrop tokens", err);
  }
})();
