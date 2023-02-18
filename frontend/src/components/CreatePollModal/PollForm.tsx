import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  InputGroup,
  InputRightElement,
  Button,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import Web3 from "web3";
import type { CreatePoll, CreatePollError } from "../../types/poll";
import PollItem from "./PollItem";

const PollForm = ({
  data,
  errors,
  setData,
  focusRef,
}: {
  data: CreatePoll;
  errors: CreatePollError;
  setData: React.Dispatch<Partial<CreatePoll>>;
  focusRef: React.RefObject<HTMLInputElement>;
}): JSX.Element => {
  const [address, setAddress] = useState("");
  const [invalidAddr, setInvalidAddr] = useState("");

  const addAdress = () => {
    setData({ authorized: [...data.authorized, address] });
    setAddress("");
  };

  const removeAddress = (addr: string) => {
    setData({ authorized: data.authorized.filter((ad_) => ad_ !== addr) });
  };

  useEffect(() => {
    if (address === "") {
      return setInvalidAddr("");
    }
    if (data.authorized.includes(address)) {
      return setInvalidAddr("Address already added");
    }
    if (!Web3.utils.isAddress(address)) {
      return setInvalidAddr("Invalid address");
    }
    setInvalidAddr("");
  }, [address, data.authorized]);

  return (
    <VStack spacing="8">
      <FormControl isInvalid={errors.title.length > 0}>
        <FormLabel>Title</FormLabel>
        <Input
          ref={focusRef}
          placeholder="Is isma a goat ?..."
          type="text"
          onChange={(e) => setData({ title: e.target.value })}
          value={data.title}
        />
        {errors.title.length > 0 && (
          <FormErrorMessage>{errors.title}</FormErrorMessage>
        )}
      </FormControl>

      <FormControl isInvalid={errors.description.length > 0}>
        <FormLabel>Description</FormLabel>
        <Textarea
          placeholder="This poll is about..."
          value={data.description}
          onChange={(e) => setData({ description: e.target.value })}
        />
        {errors.description.length > 0 && (
          <FormErrorMessage>{errors.description}</FormErrorMessage>
        )}
      </FormControl>

      <FormControl isInvalid={errors.enddate.length > 0}>
        <FormLabel>End date</FormLabel>
        <Input
          placeholder="This poll will last ..."
          type="datetime-local"
          onChange={(e) =>
            setData({ enddate: e.target.valueAsDate ?? new Date() })
          }
        />
        {errors.enddate.length > 0 && (
          <FormErrorMessage>{errors.enddate}</FormErrorMessage>
        )}
      </FormControl>

      <FormControl
        isInvalid={invalidAddr.length > 0 || errors.authorized.length > 0}
      >
        <FormLabel>Authorized voters</FormLabel>

        <InputGroup size="md">
          <Input
            pr="4.5rem"
            type="text"
            placeholder="Voter address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button
              size="sm"
              colorScheme="facebook"
              isDisabled={invalidAddr.length > 0}
              variant="ghost"
              onClick={addAdress}
            >
              Add
            </Button>
          </InputRightElement>
        </InputGroup>

        {invalidAddr.length > 0 && (
          <FormErrorMessage>{invalidAddr}</FormErrorMessage>
        )}

        <VStack alignItems="start" mt="5" w="auto" maxH="40" overflow="scroll">
          {data.authorized.map((addr) => (
            <PollItem key={addr} addr={addr} onRemove={removeAddress} />
          ))}
        </VStack>

        {errors.authorized.length > 0 && (
          <FormErrorMessage>{errors.authorized}</FormErrorMessage>
        )}
      </FormControl>
    </VStack>
  );
};

export default PollForm;
