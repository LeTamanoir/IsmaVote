import { DeleteIcon } from "@chakra-ui/icons";
import { Button, HStack, Text } from "@chakra-ui/react";

const PollItem = ({
  addr,
  onRemove,
}: {
  addr: string;
  onRemove: (_: string) => void;
}): JSX.Element => {
  return (
    <HStack
      bgColor="facebook.50"
      justifyContent="space-between"
      rounded="md"
      w="full"
      py="2"
      px="4"
    >
      <Text>{addr}</Text>
      <Button
        colorScheme="red"
        size="sm"
        variant="link"
        onClick={() => onRemove(addr)}
      >
        <DeleteIcon />
      </Button>
    </HStack>
  );
};

export default PollItem;
