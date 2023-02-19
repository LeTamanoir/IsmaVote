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
import { useReducer, useRef, useState } from "react";
import PollForm from "./PollForm";
import type { CreatePoll, CreatePollError } from "../../types/poll";
import useWeb3 from "../../hooks/useWeb3";

const CreatePoll = (): JSX.Element => {
  const { contract, myAddress } = useWeb3();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
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

    setIsLoading(true);
    contract.methods
      .createPoll(
        data.title,
        data.description,
        data.authorized,
        data.enddate.getTime()
      )
      .send({ from: myAddress })
      .then(() => {
        setIsLoading(false);
        window.dispatchEvent(new Event("polls-updated"));
        close();
      });
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
          <ModalBody>
            <PollForm
              setData={setData}
              errors={errors}
              data={data}
              focusRef={focusRef}
            />
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blackAlpha"
              mr={3}
              onClick={close}
              isDisabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              colorScheme="facebook"
              onClick={submit}
              isLoading={isLoading}
            >
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreatePoll;
