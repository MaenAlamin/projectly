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
  Select,
  useDisclosure,
} from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";

export function NewEmployeeButton({ fetchData }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);

  const [newEmployeeData, setNewEmployeeData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  function validateForm() {
    let isValid = true;
    let newErrors = { name: "", email: "", password: "" };

    // Validate name
    if (!newEmployeeData.name.trim()) {
      isValid = false;
      newErrors.name = "Name is required.";
    }

    // Validate email
    if (!newEmployeeData.email.trim()) {
      isValid = false;
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(newEmployeeData.email)) {
      isValid = false;
      newErrors.email = "Email is not valid.";
    }

    // Validate password
    if (!newEmployeeData.password.trim()) {
      isValid = false;
      newErrors.password = "Password is required.";
    } else if (newEmployeeData.password.length < 8) {
      isValid = false;
      newErrors.password = "Password must be at least 8 characters.";
    }

    if (!newEmployeeData.role) {
      isValid = false;
      newErrors.role = "Role is required.";
    }

    setErrors(newErrors);
    return isValid;
  }

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setNewEmployeeData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const clearFields = () => {
    setNewEmployeeData({
      name: "",
      email: "",
      password: "",
      role: "",
    });
  };

  const handleClose = () => {
    onClose();
    clearFields();
  };

  const handleProjectCreation = () => {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/users`;
    if (!validateForm()) {
      return; // Form is not valid, do not submit
    }
    try {
      fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEmployeeData),
      })
        .then((response) => response.json())
        .then(fetchData)
        .catch((error) => {
          console.error("Error: ", error);
        });
      onClose();
      clearFields();
    } catch (error) {}
  };

  return (
    <>
      <Button leftIcon={<FaPlus />} colorScheme="blue" onClick={onOpen}>
        Add New Employee
      </Button>

      <Modal
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={handleClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Employee</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isInvalid={errors.name}>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                name="name"
                onChange={handleFormChange}
                ref={initialRef}
                placeholder="Name"
                required
              />
              <FormErrorMessage>{errors.name}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.email}>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                name="email"
                onChange={handleFormChange}
                placeholder="Email"
                required
              />
              <FormErrorMessage>{errors.email}</FormErrorMessage>
            </FormControl>

            <FormControl mt={4} isInvalid={errors.password}>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                name="password"
                onChange={handleFormChange}
                placeholder="Password"
              />
              <FormErrorMessage>{errors.password}</FormErrorMessage>
            </FormControl>
            <FormControl mt={4} isInvalid={errors.role}>
              <FormLabel>Role</FormLabel>
              <Select
                placeholder="Role"
                onChange={handleFormChange}
                name="role"
              >
                <option value={"Admin"}>Admin</option>
                <option value={"Manager"}>Manager</option>
                <option value={"Employee"}>Employee</option>
              </Select>
              <FormErrorMessage>{errors.role}</FormErrorMessage>
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
