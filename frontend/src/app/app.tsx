import { VStack } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import ConnectWallet from "../components/ConnectWallet";
import CreatePoll from "../components/CreatePollModal";
import Navbar from "../components/Navbar";
import PollList from "../components/PollList";
import useWeb3 from "../hooks/useWeb3";

const App = (): JSX.Element => {
  const { myAddress, checkWallet, loadContract } = useWeb3();
  const contract = useRef<any>(null);

  useEffect(() => {
    if (myAddress.length === 0) return;
    if (contract.current !== null) return;

    contract.current = loadContract();
  }, [myAddress]);

  useEffect(() => {
    checkWallet();
  }, []);

  return (
    <VStack spacing="10">
      <Navbar myAddress={myAddress} />

      {myAddress.length > 0 ? (
        <>
          <CreatePoll myAddress={myAddress} contract={contract} />
          <PollList myAddress={myAddress} contract={contract} />
        </>
      ) : (
        <ConnectWallet />
      )}
    </VStack>
  );
};

export default App;
