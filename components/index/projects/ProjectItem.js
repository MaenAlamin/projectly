import { Box, Flex } from "@chakra-ui/react";
import React from "react";

export function ProjectItem({ children, ...rest }) {
  return (
    <Box style={{ textDecoration: "none" }} _focus={{ boxShadow: "none" }}>
      <Flex
        align="center"
        p="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "blue.400",
          color: "white",
        }}
        {...rest}
      >
        {children}
      </Flex>
    </Box>
  );
}
