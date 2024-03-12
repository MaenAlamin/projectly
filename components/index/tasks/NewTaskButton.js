import React, { useEffect, useRef, useState } from "react";
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
  Select,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";

export function NewTaskButton({ fetchData }) {
  const [newTaskData, setNewTaskData] = useState({
    name: "",
    status: "Todo",
    projectId: "",
    userId: "",
    description: "",
  });
  const [isTaskNameTouched, setIsTaskNameTouched] = useState(false);
  const [isProjectIdTouched, setIsProjectIdTouched] = useState(false);
  const [isUserIdTouched, setIsUserIdTouched] = useState(false);
  const [currentUsers, setCurrentUsers] = useState([]);
  const [currentProjects, setCurrentProjects] = useState([]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const fetchUsers = async () => {
    try {
      const response = await fetch(
        "https://api-projectly.techtitans.site/users"
      );
      const data = await response.json();
      setCurrentUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await fetch(
        "https://api-projectly.techtitans.site/projects"
      );
      const data = await response.json();
      setCurrentProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchProjects();
  }, []);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setNewTaskData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    if (name === "name") {
      setIsTaskNameTouched(true);
    } else if (name === "projectId") {
      setIsProjectIdTouched(true);
    } else if (name === "userId") {
      setIsUserIdTouched(true);
    }
  };

  const clearFields = () => {
    setNewTaskData({
      name: "",
      status: "Todo",
      projectId: "",
      userId: "",
      description: "",
    });
    setIsTaskNameTouched(false);
    setIsProjectIdTouched(false);
    setIsUserIdTouched(false);
  };

  const handleClose = () => {
    onClose();
    clearFields(); // This will reset the form fields and isProjectNameTouched
  };

  const isTaskNameError = newTaskData.name.length < 3;
  const isProjectIdError = newTaskData.projectId === "";
  const isUserIdError = newTaskData.userId === "";

  const handleTaskCreation = () => {
    try {
      // Validate task name
      if (isTaskNameError) {
        setIsTaskNameTouched(true); // Mark as touched to show error
        return; // Prevent form submission
      }

      // Validate project selection
      if (isProjectIdError) {
        setIsProjectIdTouched(true); // Mark as touched to show error
        return; // Prevent form submission
      }

      // Validate user selection
      if (isUserIdError) {
        setIsUserIdTouched(true); // Mark as touched to show error
        return; // Prevent form submission
      }
      if (!isTaskNameError && !isProjectIdError && !isUserIdError) {
        fetch("https://api-projectly.techtitans.site/tasks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newTaskData),
        })
          .then((response) => response.json())
          .then(() => {
            fetchData();
          })
          .catch((error) => {
            console.error("Error: ", error);
          });
        handleClose();
      }
    } catch (error) {}
  };

  return (
    <>
      <Button leftIcon={<FaPlus />} colorScheme="blue" onClick={onOpen}>
        Add New Task
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
          <ModalHeader>Add New Task</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl
              isRequired
              isInvalid={isTaskNameError && isTaskNameTouched}
              pb={6}
            >
              <FormLabel>Task's Title</FormLabel>
              <Input
                name="name"
                onChange={handleFormChange}
                ref={initialRef}
                onBlur={handleBlur}
                placeholder="Task's Title"
                required
              />
              <FormErrorMessage>
                Please Write the Title with at least 3 letters
              </FormErrorMessage>
            </FormControl>

            <FormControl
              isInvalid={isProjectIdError && isProjectIdTouched}
              isRequired
              pb={6}
            >
              <FormLabel>Project</FormLabel>
              <Select
                required
                onChange={handleFormChange}
                name="projectId"
                placeholder="Select the Project"
                onBlur={handleBlur}
              >
                {currentProjects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </Select>
              <FormErrorMessage>Please Select a Project</FormErrorMessage>
            </FormControl>
            <FormControl
              isInvalid={isUserIdError && isUserIdTouched}
              isRequired
              pb={6}
            >
              <FormLabel>User</FormLabel>
              <Select
                required
                onChange={handleFormChange}
                name="userId"
                placeholder="Select the User"
                onBlur={handleBlur}
              >
                {currentUsers.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </Select>
              <FormErrorMessage>Please Select a User</FormErrorMessage>
            </FormControl>
            <FormControl pb={6}>
              <FormLabel>Description</FormLabel>

              <Textarea
                name="description"
                onChange={handleFormChange}
                placeholder="Describe the Task to the employee"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={handleTaskCreation} colorScheme="blue" mr={3}>
              Add
            </Button>
            <Button onClick={handleClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
