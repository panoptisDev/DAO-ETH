import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

(async () => {
  try {
    const editionDrop = await sdk.getContract(
      "0x69D7642Cd70DdA4aa2F28CF56B5fD3ca762c7428",
      "edition-drop"
    );
    await editionDrop.createBatch([
      {
        name: "Books Stack",
        description: "This NFT will give you access to BooksDAO!",
        image: readFileSync("scripts/assets/books.png"),
      },
    ]);
    console.log("✅ Successfully created a new NFT in the drop!");
  } catch (error) {
    console.error("failed to create the new NFT", error);
  }
})();
