import { Heading, HStack, Image, Text } from "@chakra-ui/react";
import useWeb3 from "../hooks/useWeb3";

const Navbar = (): JSX.Element => {
  const { myAddress } = useWeb3();

  return (
    <HStack
      w="full"
      h="20"
      bgColor="facebook.50"
      justifyContent="space-between"
      p="4"
    >
      <HStack>
        <Image p="3" src="/isma.jpg" w="20" h="20" rounded="full" />
        <Heading color="facebook.900">IsmaVote</Heading>
      </HStack>

      {myAddress.length > 0 && (
        <HStack ms="auto">
          <Text color="facebook.900">My address: </Text>

          <Text
            w="28"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            overflow="hidden"
          >
            {myAddress}
          </Text>
        </HStack>
      )}
    </HStack>
  );
};

export default Navbar;
