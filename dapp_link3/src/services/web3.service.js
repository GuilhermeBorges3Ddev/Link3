import Web3 from "web3";
import ABI from "./ABI.json";

const CONTRACT_ADDRESS = "0x961AB0e675024f34525FB5634064B3633939094f";

export async function connectContract() {
  if (!window.ethereum) throw new Error("No Metamask installed");
  const WEB_3 = new Web3(window.ethereum);
  const ACCOUNTS = await WEB_3.eth.requestAccounts();
  if (!ACCOUNTS || !ACCOUNTS.length)
    throw new Error("Wallet connection not allowed");
  return new WEB_3.eth.Contract(ABI, CONTRACT_ADDRESS, { from: ACCOUNTS[0] });
}

export async function addLink({ url, linkId, feeInWei }) {
  const CONTRACT = await connectContract();
  return CONTRACT.methods.addLink(url, linkId, feeInWei).send();
}

export async function getLink(linkId) {
  const CONTRACT = await connectContract();
  return CONTRACT.methods.getLink(linkId).call();
}

export async function payLink(linkId, valueInWei) {
  const CONTRACT = await connectContract();
  return CONTRACT.methods.payLink(linkId).send({
    value: valueInWei,
  });
}
