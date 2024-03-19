import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { ProjectItem } from "./ProjectItem";
import { NewProjectButton } from "./NewProjectButton";

export function MobileProjectList({
  projects,
  setSelectedProject,
  fetchData,
  ...rest
}) {
  return (
    <Accordion allowToggle {...rest} bg={"white"} w={"100%"}>
      <AccordionItem position={"relative"}>
        <AccordionButton>
          <Text
            fontSize="lg"
            fontWeight="bold"
            textAlign={"left"}
            flex={1}
            px={4}
            py={2}
          >
            Projects
          </Text>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel
          position={"absolute"}
          bg={"white"}
          zIndex={10}
          w={"100%"}
        >
          <NewProjectButton fetchData={fetchData} mb={4} />
          {projects.map((link) => (
            <ProjectItem
              key={link.name}
              onClick={() => setSelectedProject(link.id)}
              icon={link.icon}
            >
              {link.name}
            </ProjectItem>
          ))}
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}
