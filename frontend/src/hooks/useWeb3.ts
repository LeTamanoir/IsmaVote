import { useContext } from "react";
import Web3Context from "../context/Web3Context";

const useWeb3 = () => {
  const {
    web3: { myAddress, contract, checkWallet, loadContract, connectWallet },
  } = useContext(Web3Context);

  return {
    myAddress,
    contract,
    checkWallet,
    loadContract,
    connectWallet,
  };
};

export default useWeb3;
