import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
  useStatStyles,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";

export function DeleteConfirmation({ id, fetchData }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  async function handleDelete(id) {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${id}`;

    try {
      await fetch(apiUrl, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(fetchData())
        .then(onClose());
      console.log(id);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Button onClick={onOpen}>
        <FaTrashAlt />
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Employee
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={() => handleDelete(id)} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
