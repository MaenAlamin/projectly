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
import { FaEdit } from "react-icons/fa";

export function EditEmployeeButton({ fetchData, employee }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const [employeeData, setEmployeeData] = useState({
    id: employee.id,
    name: employee.name,
    email: employee.email,
    password: "",
    role: employee.role,
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  function validateForm() {
    let isValid = true;
    let newErrors = { name: "", email: "", password: "", role: "" };

    // Validate name
    if (!employeeData.name.trim()) {
      isValid = false;
      newErrors.name = "Name is required.";
    }

    // Validate email
    if (!employeeData.email.trim()) {
      isValid = false;
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(employeeData.email)) {
      isValid = false;
      newErrors.email = "Email is not valid.";
    }

    // Validate password
    if (employeeData.password.trim() != "") {
      if (employeeData.password.length < 8) {
        isValid = false;
        newErrors.password = "Password must be at least 8 characters.";
      }
    }

    if (!employeeData.role) {
      isValid = false;
      newErrors.role = "Role is required.";
    }

    setErrors(newErrors);
    return isValid;
  }

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const clearFields = () => {
    setEmployeeData({
      id: "",
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

  const handleTaskUpdate = (id) => {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${id}`;
    if (!validateForm()) {
      return; // Form is not valid, do not submit
    }

    let requestBody = {
      id: employeeData.id,
      name: employeeData.name,
      email: employeeData.email,
      role: employeeData.role,
    };

    // Only include the password in the request body if it's not empty and valid
    if (employeeData.password.trim() !== "") {
      requestBody.password = employeeData.password;
    }
    fetch(apiUrl, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.json())
      .then(() => {
        fetchData();
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
    handleClose();
  };

  return (
    <>
      <Button onClick={onOpen}>
        <FaEdit />
      </Button>

      <Modal
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={handleClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Task</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl pb={6} isInvalid={errors.name}>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                name="name"
                onChange={handleFormChange}
                ref={initialRef}
                placeholder="Name"
                value={employeeData.name}
              />
              <FormErrorMessage>{errors.name}</FormErrorMessage>
            </FormControl>

            <FormControl pb={6} isInvalid={errors.email}>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                name="email"
                onChange={handleFormChange}
                placeholder="Email"
                value={employeeData.email}
              />
              <FormErrorMessage>{errors.email}</FormErrorMessage>
            </FormControl>
            <FormControl pb={6} isInvalid={errors.password}>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                name="password"
                onChange={handleFormChange}
                placeholder="Password"
                value={employeeData.password}
              />
              <FormErrorMessage>{errors.password}</FormErrorMessage>
            </FormControl>
            <FormControl pb={6} isInvalid={errors.role}>
              <FormLabel>Role</FormLabel>
              <Select
                placeholder="Role"
                onChange={handleFormChange}
                name="role"
                value={employeeData.role}
              >
                <option value={"Admin"}>Admin</option>
                <option value={"Manager"}>Manager</option>
                <option value={"Employee"}>Employee</option>
              </Select>
              <FormErrorMessage>{errors.role}</FormErrorMessage>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={() => handleTaskUpdate(employeeData.id)}
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
