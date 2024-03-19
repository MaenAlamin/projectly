import {
  Badge,
  Box,
  Button,
  Flex,
  Input,
  Scro,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

export function Comments({ projectId }) {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const { data: session } = useSession();

  const fetchComments = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/comments/${projectId}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const projectComments = await response.json();
      setMessages(projectComments);
    } catch (error) {
      console.error("There was a problem with your fetch operation:", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [projectId]);

  const handleSend = async () => {
    if (inputValue.trim()) {
      await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: session?.user?.id,
          message: inputValue,
          projectId: projectId,
        }),
      });
      fetchComments();

      setInputValue("");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSend();
    }
  };
  return (
    <Box p={4} bg="gray.100">
      <Box
        maxH={{ base: "60vh", md: "70vh" }}
        minH={{ base: "60vh", md: "70vh" }}
        overflowY={"scroll"}
        display="flex"
        flexDirection="column"
        justifyContent="flex-end"
      >
        {messages.map((message, index) => (
          <Box
            key={index}
            mb={2}
            p={4}
            bg={"white"}
            rounded={"md"}
            boxShadow={"sm"}
          >
            <Flex justifyContent="space-between" alignItems="center">
              <Text fontSize="sm" color="gray.600">
                {message?.sender?.name}
              </Text>
              <Badge
                borderRadius="full"
                px="2"
                colorScheme="blue"
                variant="outline"
              >
                {message?.sender?.role}
              </Badge>
            </Flex>
            <Text>{message?.message}</Text>
          </Box>
        ))}
      </Box>
      <Flex mt={4} p={4} bg="white" borderRadius="md" boxShadow="md">
        <Textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type your message..."
          flex="1"
          borderRadius="md"
          mr={2}
          onKeyDown={handleKeyPress}
        />
        <Button onClick={handleSend} colorScheme="blue">
          Send
        </Button>
      </Flex>
    </Box>
  );
}
