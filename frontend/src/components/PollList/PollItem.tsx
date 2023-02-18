import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Text,
} from "@chakra-ui/react";
import { Poll } from "../../types/poll";

const PollItem = ({
  poll,
  myAddress,
}: {
  poll: Poll;
  myAddress: string;
}): JSX.Element => (
  <Card w="md">
    <CardBody>
      <Heading size="lg" mb="2" color="facebook.900">
        {poll.title}
      </Heading>
      <Text>{poll.description}</Text>
    </CardBody>
    <Divider />

    <CardFooter>
      {poll.authorized.includes(myAddress) ? (
        <ButtonGroup justifyContent="space-between">
          <Button size="sm" colorScheme="green">
            <CheckIcon mr="2" />
            Approve
          </Button>
          <Button size="sm" colorScheme="red">
            <CloseIcon mr="2" />
            Reject
          </Button>
        </ButtonGroup>
      ) : (
        <Text>You can't vote {":("}</Text>
      )}
    </CardFooter>
  </Card>
);

export default PollItem;
