import React from "react";
import { EmployeesTable } from "./employees/EmployeesTable";
import { Flex, Spacer, Text } from "@chakra-ui/react";
import { NewEmployeeButton } from "./employees/NewEmployeeButton";

export function Employees({ users, fetchData }) {
  const tableHead = [
    { id: 1, title: "Name", isNumeric: false },
    { id: 2, title: "Status", isNumeric: false },
    { id: 3, title: "Email", isNumeric: false },
    { id: 4, title: "Role", isNumeric: false },
    { id: 5, title: "Options", isNumeric: false },
  ];

  return (
    <Flex direction={"column"} p={4}>
      <Flex direction={"row"} marginY={3}>
        <Text alignSelf={"center"} fontSize={"xl"} fontWeight={"bold"}>
          Employees
        </Text>
        <Spacer />
        <NewEmployeeButton fetchData={fetchData} />
      </Flex>
      <EmployeesTable
        tableHead={tableHead}
        tableBody={users}
        fetchData={fetchData}
      />
    </Flex>
  );
}
