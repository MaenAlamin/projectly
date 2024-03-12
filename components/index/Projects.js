import { Button, Flex, Spacer, Text } from "@chakra-ui/react";
import React from "react";
import { ProjectsTable } from "./projects/ProjectsTable";
import { FaPlus } from "react-icons/fa";
import { NewProjectButton } from "./projects/NewProjectButton";

const tableHead = [{ id: 1, title: "Name", isNumeric: false }];

export function Projects({ projects, setProjects, fetchData }) {
  return (
    <Flex direction={"column"}>
      <Flex direction={"row"} marginY={3}>
        <Text alignSelf={"center"} fontSize={"xl"} fontWeight={"bold"}>
          Projects
        </Text>
        <Spacer />
        <NewProjectButton fetchData={fetchData} />
      </Flex>
      <ProjectsTable
        tableHead={tableHead}
        tableBody={projects}
        fetchData={fetchData}
      />
    </Flex>
  );
}
