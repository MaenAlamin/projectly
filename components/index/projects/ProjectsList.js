import { Box, CloseButton, Flex, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { ProjectItem } from "./ProjectItem";

export function ProjectsList({ onClose, linkItems }) {
  return (
    <Box borderRight="1px" w={{ base: "full", md: 60 }} pos="fixed" h="full">
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="xl" fontFamily="monospace" fontWeight="bold">
          Projects
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {linkItems.map((link) => (
        <ProjectItem key={link.name} icon={link.icon}>
          {link.name}
        </ProjectItem>
      ))}
    </Box>
  );
}
