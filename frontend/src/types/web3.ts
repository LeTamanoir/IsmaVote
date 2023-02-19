type Web3Utils = {
  myAddress: string;
  connectWallet: () => Promise<void>;
  loadContract: () => void;
  contract: any;
  checkWallet: () => void;
};

export default Web3Utils;
