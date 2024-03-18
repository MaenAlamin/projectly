import { Box, Container, Heading, Image, Stack } from "@chakra-ui/react";
import React from "react";
import { Login } from "./Login";

export function Form() {
  return (
    <Container maxW="lg" px={{ base: "0", sm: "8" }}>
      <Stack>
        <Stack spacing="6">
          <Image
            src="/images/logo/logo.png"
            alt="Projectly"
            w={"50%"}
            marginX={"auto"}
            marginY={5}
          />
        </Stack>
        <Box
          py={{ base: "0", sm: "8" }}
          px={{ base: "4", sm: "10" }}
          bg={{ base: "transparent", sm: "bg.surface" }}
          boxShadow={{ base: "none", sm: "md" }}
          borderRadius={{ base: "none", sm: "xl" }}
          borderTop={"1px"}
          borderTopColor={"blackAlpha.50"}
        >
          <Stack
            spacing={{ base: "2", md: "3" }}
            marginBottom={6}
            textAlign="center"
          >
            <Heading size={{ base: "sm", md: "md" }}>
              Log in to your account
            </Heading>
          </Stack>
          <Login />
        </Box>
      </Stack>
    </Container>
  );
}
