import { useEffect, useState } from "react";
import Web3 from "web3";
import abi from "../abi/VotingSystem.json";
import Web3Context from "../context/Web3Context";

const CONTRACT_ADDR = import.meta.env.VITE_CONTRACT_ADDR as string;

const Web3Provider = ({ children }: { children: JSX.Element }): JSX.Element => {
  const [myAddress, setMyAddress] = useState("");
  const [contract, setContract] = useState<any>(null);

  const connectWallet = async () => {
    const ethereum = (window as any).ethereum;

    try {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setMyAddress(accounts[0]);
    } catch (error) {
      console.error(error);
    }
  };

  const loadContract = () => {
    const ethereum = (window as any).ethereum;
    const web3Provider = new Web3(ethereum);

    try {
      let contract = new web3Provider.eth.Contract(abi as any, CONTRACT_ADDR);
      setContract(contract);
    } catch (error) {
      console.error(error);
    }
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
      console.error(error);
    }
  };

  useEffect(() => {
    checkWallet();
    loadContract();
  }, []);

  return (
    <Web3Context.Provider
      value={{
        web3: {
          contract,
          myAddress,
          connectWallet,
          loadContract,
          checkWallet,
        },
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export default Web3Provider;
