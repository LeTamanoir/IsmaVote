import { VStack } from "@chakra-ui/react";
import ConnectWallet from "../components/ConnectWallet";
import CreatePoll from "../components/CreatePollModal";
import Navbar from "../components/Navbar";
import PollList from "../components/PollList";
import useWeb3 from "../hooks/useWeb3";

const App = (): JSX.Element => {
  const { myAddress, contract } = useWeb3();

  return (
    <VStack spacing="10">
      <Navbar />

      {myAddress.length > 0 && contract != null ? (
        <>
          <CreatePoll />
          <PollList />
        </>
      ) : (
        <ConnectWallet />
      )}
    </VStack>
  );
};

export default App;
