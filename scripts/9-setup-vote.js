import sdk from "./1-initialize-sdk.js";

(async () => {
  try {
    // This is our governance contract.
    const vote = await sdk.getContract(
      "0xFB2E00a6fe803149b4EFEaD9cFbC25f9f48217aF",
      "vote"
    );
    // This is our ERC-20 contract.
    const token = await sdk.getContract(
      "0xcc0A01571dD1A32075F72D84DE6c32997b64bC0b",
      "token"
    );
    // Give our treasury the power to mint additional token if needed.
    await token.roles.grant("minter", vote.getAddress());

    console.log(
      "Successfully gave vote contract permissions to act on token contract"
    );
  } catch (error) {
    console.error(
      "failed to grant vote contract permissions on token contract",
      error
    );
    process.exit(1);
  }

  try {
    // This is our governance contract.
    const vote = await sdk.getContract(
      "0xFB2E00a6fe803149b4EFEaD9cFbC25f9f48217aF",
      "vote"
    );
    // This is our ERC-20 contract.
    const token = await sdk.getContract(
      "0xcc0A01571dD1A32075F72D84DE6c32997b64bC0b",
      "token"
    );
    // Grab our wallet's token balance, remember -- we hold basically the entire supply right now!
    const ownedTokenBalance = await token.balanceOf(process.env.WALLET_ADDRESS);

    // Grab 90% of the supply that we hold.
    const ownedAmount = ownedTokenBalance.displayValue;
    const percent90 = (Number(ownedAmount) / 100) * 90;

    // Transfer 90% of the supply to our voting contract.
    await token.transfer(vote.getAddress(), percent90);

    console.log(
      "✅ Successfully transferred " + percent90 + " tokens to vote contract"
    );
  } catch (err) {
    console.error("failed to transfer tokens to vote contract", err);
  }
})();
