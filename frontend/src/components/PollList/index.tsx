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

const PollList = ({
  myAddress,
  contract,
}: {
  myAddress: string;
  contract: any;
}): JSX.Element => {
  const [polls, setPolls] = useState<Poll[]>([]);

  useEffect(() => {
    // setPolls(TEMP);

    if (contract.current == null) return;

    console.log(contract.current.methods.getPolls());


    // contract.current.methods
    //   .getPoll(0)
    //   .send({ from: myAddress })
    //   .then((poll: Poll) => {
    //     console.log(poll);
    //   });

    // .call()
    // .then((polls: Poll[]) => {
    //   // setPolls(polls);
    //   console.log(polls);
    // });
  }, []);

  return (
    <VStack spacing="10">
      {polls.map((poll) => (
        <PollItem myAddress={myAddress} key={poll.address} poll={poll} />
      ))}

      <button onClick={() => {
        contract.current.methods.getPolls().call();
      }}>
        test
      </button>
    </VStack>
  );
};

export default PollList;
