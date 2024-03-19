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
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";

export function NewProjectButton({ fetchData, ...rest }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);

  const [newProjectData, setNewProjectData] = useState({
    name: "",
    description: "",
  });
  const [nameError, setNameError] = useState("");

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setNewProjectData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const clearFields = () => {
    setNewProjectData({
      name: "",
      description: "",
    });
    setNameError("");
  };

  const handleClose = () => {
    onClose();
    clearFields();
  };

  function validateForm() {
    let isValid = true;
    if (newProjectData.name.length < 3) {
      isValid = false;
      setNameError("Please Write a Name with at least 3 letters");
    }
    return isValid;
  }

  const handleProjectCreation = () => {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/projects`;

    try {
      if (!validateForm()) return;
      else {
        fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newProjectData),
        })
          .then((response) => response.json())
          .then(fetchData)
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
      <Button
        leftIcon={<FaPlus />}
        colorScheme="blue"
        size={"sm"}
        onClick={onOpen}
        {...rest}
      >
        Add New Project
      </Button>

      <Modal
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={handleClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Project</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isRequired isInvalid={nameError}>
              <FormLabel>Project's Title</FormLabel>
              <Input
                name="name"
                onChange={handleFormChange}
                ref={initialRef}
                placeholder="Project's Title"
                required
              />
              <FormErrorMessage>{nameError}</FormErrorMessage>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Project's Description</FormLabel>
              <Textarea
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
