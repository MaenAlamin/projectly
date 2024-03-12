import React from "react";
import { EmployeesTable } from "./employees/EmployeesTable";
import { Flex, Text } from "@chakra-ui/react";

export function Employees({ users }) {
  const tableHead = [
    { id: 1, title: "Name", isNumeric: false },
    { id: 2, title: "Status", isNumeric: false },
    { id: 3, title: "Email", isNumeric: false },
    { id: 4, title: "Role", isNumeric: false },
    { id: 5, title: "Options", isNumeric: false },
  ];

  return (
    <Flex direction={"column"}>
      <Flex direction={"row"} marginY={3}>
        <Text alignSelf={"center"} fontSize={"xl"} fontWeight={"bold"}>
          Employees
        </Text>
      </Flex>
      <EmployeesTable tableHead={tableHead} tableBody={users} />
    </Flex>
  );
}
