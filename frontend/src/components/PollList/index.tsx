import { VStack } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Poll } from "../../types/poll";
import PollItem from "./PollItem";

const TEMP: Poll[] = [
  {
    authorized: [],
    enddate: new Date("2021-10-10"),
    title: "Is isma a goat ?",
    description: "Is isma a goat ?",
    address: "0x000000",
  },
  {
    authorized: [],
    enddate: new Date("2021-10-10"),
    title: "Is isma a goat ?",
    description: "Is isma a goat ?",
    address: "0x000001",
  },
];

const PollList = ({ myAddress }: { myAddress: string }): JSX.Element => {
  const [polls, setPolls] = useState<Poll[]>([]);

  useEffect(() => {
    setPolls(TEMP);
  }, []);

  return (
    <VStack spacing="10">
      {polls.map((poll) => (
        <PollItem myAddress={myAddress} key={poll.address} poll={poll} />
      ))}
    </VStack>
  );
};

export default PollList;
