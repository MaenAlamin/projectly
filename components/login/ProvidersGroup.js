import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { Signup } from "./Signup";

export function ProvidersGroup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    signIn("credentials", { redirect: false, email, password });
  };
  return (
    <Box as="form" onSubmit={handleSubmit} w="full" maxW="md" p={4} mx="auto">
      <VStack spacing={4}>
        <FormControl id="email">
          <FormLabel>Email Address</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
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
