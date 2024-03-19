import { Box, CloseButton, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { ProjectItem } from "./ProjectItem";
import { NewProjectButton } from "./NewProjectButton";

export function ProjectsList({
  fetchData,
  projects,
  setSelectedProject,
  ...rest
}) {
  return (
    <Box
      borderRight="1px"
      borderColor={"gray.300"}
      w={96}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="xl" fontFamily="monospace" fontWeight="bold">
          Projects
        </Text>
        <NewProjectButton fetchData={fetchData} />
      </Flex>
      <Box mx={4}>
        {projects.map((link) => (
          <ProjectItem
            key={link.name}
            onClick={() => setSelectedProject(link.id)}
            set
            icon={link.icon}
          >
            {link.name}
          </ProjectItem>
        ))}
      </Box>
    </Box>
  );
}
