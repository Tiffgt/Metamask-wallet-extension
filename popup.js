// Building the logic and functionality for the extension

// Listen to the DOMContentLoaded event.
document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("form").addEventListener("click", handler);
});

function handler() {
  // Show the loader.
  document.getElementById("center").style.display = "flex";

  // Get the private key.
  const private_key = document.getElementById("private_key").value;
  // Get the amount.
  const amount = document.getElementById("amount").value;
  // Get the transfer address.
  const address = document.getElementById("address").value;

  // Private keys and public address.
  const test_a = "f2211d726b37710b750fa80da41f73172853fa2ac8218aca2ff4233e3c6ce9f";
  const test_p = "0xf39Fd6e51aad88F6F4ce6aB8827279cFb92266";

  // Build the provider to interact with the blockchain and transfer funds.
  const provider = new ethers.providers.JsonRpcProvider(
    "https://dashboard.alchemy.com/apps/08iswfm0botvfl2z"
  );

  // Must pass the private key and provider to the wallet for blockchain interaction.
  let wallet = new ethers.Wallet(private_key, provider);

  // Utilize a variable called transaction to carry the funds data needed for the transaction.
  const tx = {
    to: address, // Where we want to transfer the funds.
    value: ethers.utils.parseEther(amount), // Define the value and convert the price to Ether.
  };

  // Get the link element and set the href attribute for verifying the transaction.
  const link = document.getElementById("link");
  link.href = "someLinkUrl";

  // Call the sendTransaction method and handle the promise with the transaction hash.
  wallet.sendTransaction(tx).then((txObj) => {
    console.log("txHash", txObj.hash);

    // Hide the loader.
    document.getElementById("center").style.display = "none";

    // Update the link href with the transaction hash.
    link.href = `https://polygonzkevm-testnet.g.alchemy.com/tx/${txObj.hash}`;

    // Display the link for the user to click and verify.
    link.style.display = "block";
  });
}

// Listen to the DOMContentLoaded event for building another function to display the loader.
document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("check_balance").addEventListener("click", checkBalance);
});

function checkBalance() {
  // Show the loader.
  document.getElementById("center").style.display = "flex";

  // Get the provider.
  const provider = new ethers.providers.JsonRpcProvider(
    "https://polygonzkevm-testnet.g.alchemy.com/v2/u7e1OBqmMOHDxp53eFwIC4wQchrJXHI3"
  );

  // Get the signer.
  const signer = provider.getSigner();
  console.log(signer);

  // Get the address from user input to fetch the account balance.
  const address = document.getElementById("address").value;

  // Fetch the balance and resolve the promise.
  provider.getBalance(address).then((balance) => {
    const balanceInEth = ethers.utils.formatEther(balance);
    document.getElementById("check_balance").innerText = `Your Balance: ${balanceInEth} MATIC`;
    console.log(`balance: ${balanceInEth} ETH`);

    // Hide the loader.
    document.getElementById("center").style.display = "none";
  });
}
