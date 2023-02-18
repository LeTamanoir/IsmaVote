import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { useReducer, useRef } from "react";
import PollForm from "./PollForm";
import type { CreatePoll, CreatePollError } from "../../types/poll";

const CreatePoll = ({
  contract,
  myAddress,
}: {
  contract: any;
  myAddress: string;
}): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useReducer(
    (p: CreatePoll, n: Partial<CreatePoll>) => ({ ...p, ...n }),
    {
      title: "",
      description: "",
      enddate: new Date(),
      authorized: [],
    }
  );
  const [errors, setErrors] = useReducer(
    (p: CreatePollError, n: Partial<CreatePollError>) => ({ ...p, ...n }),
    {
      title: "",
      description: "",
      enddate: "",
      authorized: "",
    }
  );
  const focusRef = useRef(null);

  const cleanErrors = () =>
    setErrors({
      title: "",
      description: "",
      enddate: "",
      authorized: "",
    });

  const cleanData = () =>
    setData({
      title: "",
      description: "",
      enddate: new Date(),
      authorized: [],
    });

  const submit = () => {
    cleanErrors();
    let hasError =
      data.title.length === 0 ||
      data.description.length === 0 ||
      data.authorized.length === 0 ||
      data.enddate.getTime() < new Date().getTime();

    if (data.title.length === 0) {
      setErrors({ title: "Title is required" });
    }
    if (data.description.length === 0) {
      setErrors({ description: "Description is required" });
    }
    if (data.authorized.length === 0) {
      setErrors({ authorized: "At least one address is required" });
    }
    if (data.enddate.getTime() < new Date().getTime()) {
      setErrors({ enddate: "End date must be in the future" });
    }

    if (hasError) {
      return;
    }

    contract.current.methods
      .createPoll(
        data.title,
        data.description,
        data.authorized,
        data.enddate.getTime()
      )
      .send({ from: myAddress })
      .then((e: any) => {

      });
    onClose();
  };

  const close = () => {
    cleanData();
    cleanErrors();
    onClose();
  };

  return (
    <>
      <Button onClick={onOpen} colorScheme="facebook">
        Create poll
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="xl"
        initialFocusRef={focusRef}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create poll</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <PollForm
              setData={setData}
              errors={errors}
              data={data}
              focusRef={focusRef}
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blackAlpha" mr={3} onClick={close}>
              Cancel
            </Button>
            <Button colorScheme="facebook" onClick={submit}>
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreatePoll;
