import {
  Button,
  FormControl,
  FormErrorMessage,
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
import React, { useState } from "react";
import { AiFillNotification } from "react-icons/ai";

export default function NotificationButton({ user }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [formData, setFormData] = useState({ userId: user.id, message: "" });
  const [errors, setErrors] = useState({ message: "" });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  function clearForm() {
    setFormData({ userId: "", message: "" });
  }

  function validateForm() {
    let isValid = true;
    let newErrors = { message: "" };

    if (!formData.message.trim()) {
      isValid = false;
      newErrors.message = "Please Write a Message.";
    }
    setErrors(newErrors);
    return isValid;
  }

  function handleCancel() {
    onClose();
    clearForm();
  }

  async function handleSend() {
    if (!validateForm()) {
      return;
    }
    await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/notifications`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData), // Corrected to use formData
    })
      .then(() => {
        clearForm();
        onClose();
      })
      .catch((error) => {
        console.error("Error sending notification:", error);
        // Optionally, set an error state here to inform the user
      });
  }

  return (
    <>
      <Button onClick={onOpen}>
        <AiFillNotification />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Send Notification to {user.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl mt={4} isInvalid={errors.message}>
              <Textarea
                onChange={handleFormChange}
                name="message"
                placeholder="Message"
              />
              <FormErrorMessage>{errors.message}</FormErrorMessage>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSend}>
              Send
            </Button>
            <Button variant="ghost" onClick={handleCancel}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
