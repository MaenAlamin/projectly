import {
  Button,
  FormControl,
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
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";

export function NewProjectButton() {
  const [newProjectData, setNewProjectData] = useState({
    name: "",
    description: "",
  });

  const handleProjectCreation = () => {
    fetch("https://api-projectly.techtitans.site/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProjectData),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => {
        console.error("Error: ", error);
      });
    onClose();
    emptyFields();
  };
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setNewProjectData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const emptyFields = () => {
    setNewProjectData({
      name: "",
      description: "",
    });
  };

  useEffect(() => {
    emptyFields();
  }, [onClose, onOpen]);

  return (
    <>
      <Button leftIcon={<FaPlus />} colorScheme="blue" onClick={onOpen}>
        Add New Project
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Project</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Project&apos;s Title</FormLabel>
              <Input
                name="name"
                onChange={handleFormChange}
                ref={initialRef}
                placeholder="Project's Title"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Project&apos;s Description</FormLabel>
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
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
