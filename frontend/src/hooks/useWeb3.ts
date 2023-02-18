import { useState } from "react";
import { abi } from "../abi/VotingSystem.json";
import Web3 from "web3";

const CONTRACT_ADDR = "0x248D775F6F4885e44FBC068470617c239b1E31F0";

const useWeb3 = () => {
  const [myAddress, setMyAddress] = useState("");

  const connectWallet = async () => {
    const ethereum = (window as any).ethereum;

    try {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setMyAddress(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const loadContract = () => {
    const ethereum = (window as any).ethereum;
    const web3Provider = new Web3(ethereum);

    try {
      let contract = new web3Provider.eth.Contract(abi as any, CONTRACT_ADDR);
      return contract;
    } catch (error) {
      console.log(error);
    }
    return null;
  };

  const checkWallet = async () => {
    const ethereum = (window as any).ethereum;

    try {
      const accounts = await ethereum.request({
        method: "eth_accounts",
      });
      if (accounts.length > 0) {
        setMyAddress(accounts[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    myAddress,
    checkWallet,
    loadContract,
    connectWallet,
  };
};

export default useWeb3;
