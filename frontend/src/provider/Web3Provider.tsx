import { useEffect, useState } from "react";
import Web3 from "web3";
import abi from "../abi/VotingSystem.json";
import Web3Context from "../context/Web3Context";

const CONTRACT_ADDR = import.meta.env.VITE_CONTRACT_ADDR as string;
const NETWORK_ID = import.meta.env.VITE_APP_CHAIN_ID as string;

const Web3Provider = ({ children }: { children: JSX.Element }): JSX.Element => {
  const [myAddress, setMyAddress] = useState("");
  const [contract, setContract] = useState<any>(null);
  const ethereum = (window as any).ethereum;
  const web3 = new Web3(ethereum);

  const connectWallet = async () => {
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
    try {
      let contract = new web3.eth.Contract(abi as any, CONTRACT_ADDR);
      setContract(contract);
    } catch (error) {
      console.error(error);
    }
  };

  const switchNetwork = async () => {
    const chainId = await web3.eth.getChainId();
    const aimedChain = NETWORK_ID;

    if (chainId.toString() !== aimedChain) {
      await ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: `0x${parseInt(aimedChain, 10).toString(16)}` }],
      });
    }
  };

  const checkWallet = async () => {
    try {
      const accounts: string[] = await ethereum.request({
        method: "eth_accounts",
      });
      if (accounts.length > 0) setMyAddress(accounts[0]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    checkWallet();
    switchNetwork().then(() => loadContract());
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
