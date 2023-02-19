import { CheckIcon, CloseIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Badge,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import useWeb3 from "../../hooks/useWeb3";
import { Poll, VoteChoie } from "../../types/poll";

const PollItem = ({
  poll,
  onReload,
}: {
  poll: Poll;
  onReload: () => void;
}): JSX.Element => {
  const { myAddress, contract } = useWeb3();
  const [loading, setLoading] = useState({
    approve: false,
    reject: false,
    delete: false,
  });

  const onVote = async (pollId: number, vote: VoteChoie) => {
    setLoading({
      approve: vote === VoteChoie.For,
      reject: vote === VoteChoie.Against,
      delete: false,
    });

    try {
      await contract.methods.votePoll(pollId, vote).send({ from: myAddress });
    } catch (e) {
      console.log(e);
    }

    setLoading({ approve: false, reject: false, delete: false });
    onReload();
  };

  const onDelete = async (pollId: number) => {
    setLoading({ approve: false, reject: false, delete: true });

    try {
      await contract.methods.deletePoll(pollId).send({ from: myAddress });
    } catch (e) {
      console.log(e);
    }

    setLoading({ approve: false, reject: false, delete: false });
    onReload();
  };

  return (
    <Card w="md">
      <CardBody>
        <Flex justifyContent="space-between">
          <Heading size="lg" mb="2" color="facebook.900">
            {poll.title}
          </Heading>
          {poll.owner.toLowerCase() == myAddress && (
            <Button
              size="sm"
              isLoading={loading.delete}
              variant="ghost"
              colorScheme="red"
              onClick={() => onDelete(poll.id)}
            >
              <DeleteIcon />
            </Button>
          )}
        </Flex>
        <Text whiteSpace="pre">{poll.description}</Text>

        <Flex direction="column" mt="2">
          <Text>
            <Badge colorScheme="green" mr="2">
              {poll.nb_for}
            </Badge>{" "}
            Approved
          </Text>
          <Text>
            <Badge colorScheme="red" mr="2">
              {poll.nb_against}
            </Badge>{" "}
            Rejected
          </Text>
        </Flex>
      </CardBody>

      <CardFooter pt="0">
        {poll.isFinished ? (
          <Text>Finished {":)"}</Text>
        ) : poll.alreadyVoted ? (
          <Text>You already voted</Text>
        ) : poll.canVote ? (
          <ButtonGroup w="full" justifyContent="space-between">
            <Button
              size="sm"
              colorScheme="red"
              isLoading={loading.reject}
              onClick={() => onVote(poll.id, VoteChoie.Against)}
            >
              <CloseIcon mr="2" />
              Reject
            </Button>
            <Button
              size="sm"
              isLoading={loading.approve}
              colorScheme="green"
              onClick={() => onVote(poll.id, VoteChoie.For)}
            >
              <CheckIcon mr="2" />
              Approve
            </Button>
          </ButtonGroup>
        ) : (
          <Text>You can't vote</Text>
        )}
      </CardFooter>
    </Card>
  );
};

export default PollItem;
