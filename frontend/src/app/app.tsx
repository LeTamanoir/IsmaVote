import { VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import ConnectWallet from "../components/ConnectWallet";
import CreatePoll from "../components/CreatePollModal";
import Navbar from "../components/Navbar";
import PollList from "../components/PollList";
import useWeb3 from "../hooks/useWeb3";

const App = (): JSX.Element => {
  const { myAddress, checkWallet } = useWeb3();

  useEffect(() => {
    checkWallet();
  }, []);

  return (
    <VStack spacing="10">
      <Navbar myAddress={myAddress} />

      {myAddress.length > 0 ? (
        <>
          <CreatePoll />
          <PollList myAddress={myAddress} />
        </>
      ) : (
        <ConnectWallet />
      )}
    </VStack>
  );
};

export default App;
