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
import React, { useEffect, useRef, useState } from "react";

export function Signup() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);

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
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(baseUser),
      });
      handleClose();
      //   console.log(baseUser);
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
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>First name</FormLabel>
              <Input
                ref={initialRef}
                name="name"
                type="text"
                placeholder="Name"
                onChange={handleFormChange}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Last name</FormLabel>
              <Input
                name="email"
                type="email"
                placeholder="Email"
                onChange={handleFormChange}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Password</FormLabel>
              <Input
                name="password"
                type="password"
                placeholder="Password"
                onChange={handleFormChange}
              />
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
