import { Button, Center, Text, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import useWeb3 from "../../hooks/useWeb3";

const ConnectWallet = (): JSX.Element => {
  const { connectWallet, checkWallet } = useWeb3();

  useEffect(() => {
    checkWallet();
  }, []);

  return (
    <Center pt="10">
      <VStack spacing="6">
        <Button colorScheme="orange" onClick={connectWallet}>
          Connect Wallet
        </Button>

        <Text>You need to connect your wallet to use this app</Text>
      </VStack>
    </Center>
  );
};

export default ConnectWallet;
