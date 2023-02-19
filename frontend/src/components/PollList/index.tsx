import { Flex } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import useWeb3 from "../../hooks/useWeb3";
import { Poll } from "../../types/poll";
import PollItem from "./PollItem";

const PollList = (): JSX.Element => {
  const { myAddress, contract } = useWeb3();
  const [polls, setPolls] = useState<Poll[]>([]);

  const getPolls = async () => {
    const polls = await contract.methods.getPolls().call({ from: myAddress });

    const polls_ = polls.map((poll: any, _idx: number) => ({
      title: poll.title,
      description: poll.description,
      nb_against: poll.nb_against,
      nb_for: poll.nb_for,
      startTimestamp: poll.startTimestamp,
      endTimestamp: poll.endTimestamp,
      isActive: poll.isActive,
      canVote: false,
      alreadyVoted: false,
      owner: poll.owner,
      id: _idx,
    })) as Poll[];

    for (let poll of polls_) {
      poll.canVote = await contract.methods
        .canVote(poll.id)
        .call({ from: myAddress });
      poll.alreadyVoted = await contract.methods
        .alreadyVoted(poll.id)
        .call({ from: myAddress });
    }

    setPolls(polls_);
  };

  useEffect(() => {
    getPolls();
    window.addEventListener("polls-updated", getPolls);

    return () => {
      window.removeEventListener("polls-updated", getPolls);
    };
  }, []);

  return (
    <Flex gap="10" flexWrap="wrap" px="10" pb="10" justifyContent="center">
      {polls.map((poll) => (
        <PollItem key={poll.id} poll={poll} onReload={() => getPolls()} />
      ))}
    </Flex>
  );
};

export default PollList;
