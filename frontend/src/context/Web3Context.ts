import { createContext } from "react";
import Web3Utils from "../types/web3";

const Web3Context = createContext({
  web3: {} as Web3Utils,
});

export default Web3Context;