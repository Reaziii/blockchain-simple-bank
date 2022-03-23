let abi;
let contractAddress;

let provider = window.ethereum;
let web3;
web3 = new Web3(provider);
let account;
let upay;
window.onload = async () => {
  abi = await fetch("../build/contracts/UPAY.json");
  abi = await abi.json();
  abi = abi.abi;
  contractAddress = await fetch("../build/contracts/UPAY.json");
  contractAddress = await contractAddress.json();
  contractAddress = contractAddress.networks[3].address;
  web3.eth.requestAccounts();
  web3.eth.defaultAccount = web3.eth.accounts[0];
  account = await web3.eth.requestAccounts();
  account = account[0];
  if (account.length === 0) {
    return;
  }
  web3.eth.Contract.defaultAccount = account;
  upay = new web3.eth.Contract(abi, contractAddress, {
    from: account,
    gasPrice: 21000,
  });
  document.getElementById("address").innerText = account;
  let doIHaveAccount = await upay.methods.doIHaveAccount().call();
  if (doIHaveAccount) {
    document.getElementById("create-account").style.display = "none";
    document.getElementById("upay-app").style.display = "block";
    showMyTransaction();
    let details = await upay.methods.getMyDetails().call();
    document.getElementById("my-name").innerText = " " + details.Name;
    document.getElementById("my-balance").innerText = details.balance;
    document.getElementById("my-transaction").style.display = "block";
  }
  console.log(await upay.methods.getMyAddress().call());
};

const createAccount = async () => {
  let name = document.getElementById("name").value;
  let address = await upay.methods
    .createAccount(name)
    .send({
      from: account,
      gasPrice: "20000000000",
    })
    .on("recipt", (e) => {
      console.log(e);
    });
};

const connectWallet = async () => {
  await web3.eth.requestAccounts();
  web3.eth.defaultAccount = web3.eth.accounts[0];
  account = await web3.eth.requestAccounts();
  account = account[0];
  if (account.length === 0) {
    return;
  }
  document.getElementById("address").innerText = account;
  let doIHaveAccount = await upay.methods.doIHaveAccount().call();
  if (doIHaveAccount) {
    document.getElementById("create-account").style.display = "none";
    document.getElementById("upay-app").style.display = "block";

    let details = await upay.methods.getMyDetails().call();
    document.getElementById("my-name").innerText = " " + details.Name;
    document.getElementById("my-balance").innerText = details.balance;
  }
  console.log(await upay.methods.getMyAddress().call());
};

const sendBalance = () => {
  let address = ethers.utils.getAddress(
    document.getElementById("account-no").value
  );
  upay.methods
    .sendBalance(
      address,
      document.getElementById("send-balance").value,
      new Date().getTime()
    )
    .send({
      from: account,
      gasPrice: "20000000000",
    })
    .on("receipt", (e) => {
      console.log(e);
    });
};

const showMyTransaction = async () => {
  let root = document.getElementById("table-body");
  let template = (id, from, to, balance) =>
    `<tr class=${to === account ? "table-success" : "table-danger"}>
      <th scope="row">${id}</th>
      <td>
        <input type="text" readonly value=${from} />
      </td>
      <td>
        <input type="text" readonly value=${to} />
      </td>
      <td>${balance}</td>
    </tr>`;
  let mytransactions = await upay.methods.getMyTransactionHistory().call();
  for (let i = 0; i < mytransactions.length; i++) {
    root.innerHTML += template(
      i,
      mytransactions[i].from,
      mytransactions[i].to,
      mytransactions[i].balance
    );
  }
};
