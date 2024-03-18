import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { Signup } from "./Signup";

export function Login() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");

  function validateEmail() {
    let isValid = true;
    let newEmailError = "";

    // Validate email
    if (!email.trim()) {
      isValid = false;
      newEmailError = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      isValid = false;
      newEmailError = "Email is not valid.";
    }

    setEmailError(newEmailError);
    return isValid;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateEmail()) {
      return; // Email is not valid, do not attempt to sign in
    }

    signIn("credentials", { redirect: false, email, password });
  };
  return (
    <Box as="form" onSubmit={handleSubmit} w="full" maxW="md" p={4} mx="auto">
      <VStack spacing={4}>
        <FormControl id="email" isInvalid={emailError}>
          <FormLabel>Email Address</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormErrorMessage>{emailError}</FormErrorMessage>
        </FormControl>
        <FormControl id="password">
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>

        <Button type="submit" colorScheme="blue" w={"full"}>
          Sign in
        </Button>
        <Signup />
      </VStack>
    </Box>
  );
}
