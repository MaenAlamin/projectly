import React, { useEffect, useState } from "react";
import { EmployeesTable } from "./employees/EmployeesTable";
// import useSWR from "swr";
import { Button, Flex, Spacer, Text } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";

// const fetcher = (url) => fetch(url).then((r) => r.json());
export function Employees({ users, setUsers }) {
  // const { data, error } = useSWR(
  //   `https://api-projectly.techtitans.site/users`,
  //   fetcher
  // );
  // const [employees, setEmployees] = useState([]);
  // useEffect(() => {
  //   if (error) setEmployees([]);
  //   else if (data) setEmployees(data);
  // }, [data, error]);

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
        <Spacer />
        {/* <Button leftIcon={<FaPlus />} colorScheme="blue" variant="solid">
          Add New
        </Button> */}
      </Flex>
      <EmployeesTable tableHead={tableHead} tableBody={users} />
    </Flex>
  );
}
