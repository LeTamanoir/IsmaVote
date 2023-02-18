import { useState } from "react";

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
    connectWallet,
  };
};

export default useWeb3;
