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
import { FaEdit } from "react-icons/fa";

export function EditProjectButton({ project, fetchData }) {
  const [projectData, setProjectData] = useState({
    id: project?.id,
    name: project?.name,
    description: project?.description,
  });
  const [isProjectNameTouched, setIsProjectNameTouched] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setProjectData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleBlur = () => {
    setIsProjectNameTouched(true);
  };

  const clearFields = () => {
    setProjectData({
      id: "",
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
    projectData?.name?.length < 3 && isProjectNameTouched;

  const handleProjectUpdate = (id) => {
    if (!isProjectNameError) {
      fetch(`https://api-projectly.techtitans.site/projects/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData),
      })
        .then((response) => response.json())
        .then(fetchData())
        .catch((error) => {
          console.error("Error: ", error);
        });
      handleClose();
    }
  };

  return (
    <>
      <Button onClick={onOpen}>
        <FaEdit />
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
          <ModalHeader>Edit Project</ModalHeader>
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
                value={projectData.name}
              />
              <FormErrorMessage>
                Please Write a Name with at least 3 letters
              </FormErrorMessage>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Project's Description</FormLabel>
              <Textarea
                name="description"
                onChange={handleFormChange}
                placeholder="Project's Description"
                value={projectData.description}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={() => handleProjectUpdate(projectData.id)}
              colorScheme="blue"
              mr={3}
            >
              Save
            </Button>
            <Button onClick={handleClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
