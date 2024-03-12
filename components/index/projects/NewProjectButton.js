import React, { useRef, useState } from "react";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";

export function NewProjectButton({ fetchData }) {
  const [newProjectData, setNewProjectData] = useState({
    name: "",
    description: "",
  });
  const [isProjectNameTouched, setIsProjectNameTouched] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setNewProjectData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleBlur = () => {
    setIsProjectNameTouched(true);
  };

  const clearFields = () => {
    setNewProjectData({
      name: "",
      description: "",
    });
    setIsProjectNameTouched(false);
  };

  const handleClose = () => {
    onClose();
    clearFields();
  };

  const isProjectNameError =
    newProjectData.name.length < 3 && isProjectNameTouched;

  const handleProjectCreation = () => {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/projects`;

    try {
      if (!isProjectNameError) {
        fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newProjectData),
        })
          .then((response) => response.json())
          .then(() => {
            fetchData;
          })
          .catch((error) => {
            console.error("Error: ", error);
          });
        onClose();
        clearFields();
      }
    } catch (error) {}
  };

  return (
    <>
      <Button leftIcon={<FaPlus />} colorScheme="blue" onClick={onOpen}>
        Add New Project
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={handleClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Project</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isRequired isInvalid={isProjectNameError}>
              <FormLabel>Project's Title</FormLabel>
              <Input
                name="name"
                onChange={handleFormChange}
                ref={initialRef}
                onBlur={handleBlur}
                placeholder="Project's Title"
                required
              />
              <FormErrorMessage>
                Please Write a Name with at least 3 letters
              </FormErrorMessage>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Project's Description</FormLabel>
              <Input
                name="description"
                onChange={handleFormChange}
                placeholder="Project's Description"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={handleProjectCreation} colorScheme="blue" mr={3}>
              Add
            </Button>
            <Button onClick={handleClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
