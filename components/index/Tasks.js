import { Button, Flex, Spacer, Text } from "@chakra-ui/react";
import React from "react";
import { ProjectsTable } from "./projects/ProjectsTable";
import { FaPlus } from "react-icons/fa";
import { TasksTable } from "./tasks/TasksTable";
import { NewTaskButton } from "./tasks/NewTaskButton";

const tableHead = [
  { id: 1, title: "Title", isNumeric: false },
  { id: 2, title: "Employee", isNumeric: false },
  { id: 3, title: "Status", isNumeric: false },
  { id: 4, title: "Created On", isNumeric: false },
  { id: 5, title: "Finished on", isNumeric: false },
];

export function Tasks({ tasks, setTasks, fetchData }) {
  return (
    <Flex direction={"column"}>
      <Flex direction={"row"} marginY={3}>
        <Text alignSelf={"center"} fontSize={"xl"} fontWeight={"bold"}>
          Tasks
        </Text>
        <Spacer />
        <NewTaskButton fetchData={fetchData} />
      </Flex>
      <TasksTable tableHead={tableHead} tableBody={tasks} />
    </Flex>
  );
}
