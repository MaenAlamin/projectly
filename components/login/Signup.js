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
import React, { useEffect, useRef, useState } from "react";

export function Signup() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  function validateForm() {
    let isValid = true;
    let newErrors = { name: "", email: "", password: "" };

    // Validate name
    if (!baseUser.name.trim()) {
      isValid = false;
      newErrors.name = "Name is required.";
    }

    // Validate email
    if (!baseUser.email.trim()) {
      isValid = false;
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(baseUser.email)) {
      isValid = false;
      newErrors.email = "Email is not valid.";
    }

    // Validate password
    if (!baseUser.password.trim()) {
      isValid = false;
      newErrors.password = "Password is required.";
    } else if (baseUser.password.length < 8) {
      isValid = false;
      newErrors.password = "Password must be at least 8 characters.";
    }

    setErrors(newErrors);
    return isValid;
  }

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/users`
        );
        const users = await res.json();
        if (users.length === 0) {
          onOpen();
        } else if (users.length === -1) {
          console.log("something went wrong");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  const [baseUser, setBaseUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "Admin",
  });

  function handleFormChange(e) {
    const { name, value } = e.target;
    setBaseUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function clearForm() {
    setBaseUser({
      name: "",
      email: "",
      password: "",
      role: "Admin",
    });
  }

  function handleClose() {
    onClose();
    clearForm();
  }

  async function handleSubmit() {
    if (!validateForm()) {
      return; // Form is not valid, do not submit
    }
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(baseUser),
      });
      handleClose();
    } catch (error) {
      console.error("can't create a user, there's an error: ", error);
    }
  }
  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create The First Account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isInvalid={errors.name}>
              <FormLabel>Name</FormLabel>
              <Input
                ref={initialRef}
                name="name"
                type="text"
                placeholder="Name"
                onChange={handleFormChange}
              />
              <FormErrorMessage>{errors.name}</FormErrorMessage>
            </FormControl>

            <FormControl mt={4} isInvalid={errors.email}>
              <FormLabel>Email</FormLabel>
              <Input
                name="email"
                type="email"
                placeholder="Email"
                onChange={handleFormChange}
              />
              <FormErrorMessage>{errors.email}</FormErrorMessage>
            </FormControl>
            <FormControl mt={4} isInvalid={errors.password}>
              <FormLabel>Password</FormLabel>
              <Input
                name="password"
                type="password"
                placeholder="Password"
                onChange={handleFormChange}
              />
              <FormErrorMessage>{errors.password}</FormErrorMessage>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Save
            </Button>
            <Button onClick={handleClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
