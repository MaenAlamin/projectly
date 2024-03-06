import {
  Avatar,
  Box,
  Center,
  Flex,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";

export function Employees() {
  const tableHead = [
    { id: 1, title: "Name", isNumeric: false },
    { id: 2, title: "Status", isNumeric: false },
    { id: 3, title: "Email", isNumeric: false },
    { id: 4, title: "Role", isNumeric: false },
    { id: 5, title: "Options", isNumeric: false },
  ];

  const tableData = [
    {
      id: 1,
      name: "John Doe",
      image: "https://placehold.co/100",
      taskStatus: "WORKING",
      email: "john@gmail.com",
      role: "employee",
      isNumeric: false,
    },
    {
      id: 10,
      name: "Emily Davis",
      image: "https://placehold.co/100",
      taskStatus: "WORKING",
      email: "emily@gmail.com",
      role: "employee",
      isNumeric: false,
    },
    {
      id: 11,
      name: "Robert Jones",
      image: "https://placehold.co/100",
      taskStatus: "NOT WORKING",
      email: "robert@gmail.com",
      role: "employee",
      isNumeric: false,
    },
    {
      id: 12,
      name: "Patricia Miller",
      image: "https://placehold.co/100",
      taskStatus: "WORKING",
      email: "patricia@gmail.com",
      role: "employee",
      isNumeric: false,
    },
    {
      id: 13,
      name: "William Wilson",
      image: "https://placehold.co/100",
      taskStatus: "WORKING",
      email: "william@gmail.com",
      role: "employee",
      isNumeric: false,
    },
    {
      id: 14,
      name: "James Brown",
      image: "https://placehold.co/100",
      taskStatus: "WORKING",
      email: "james@gmail.com",
      role: "employee",
      isNumeric: false,
    },
    {
      id: 15,
      name: "Sarah Williams",
      image: "https://placehold.co/100",
      taskStatus: "NOT WORKING",
      email: "sarah@gmail.com",
      role: "employee",
      isNumeric: false,
    },
    {
      id: 16,
      name: "Michael Johnson",
      image: "https://placehold.co/100",
      taskStatus: "NOT WORKING",
      email: "michael@gmail.com",
      role: "employee",
      isNumeric: false,
    },
    {
      id: 17,
      name: "Jane Smith",
      image: "https://placehold.co/100",
      taskStatus: "WORKING",
      email: "jane@gmail.com",
      role: "employee",
      isNumeric: false,
    },
    {
      id: 18,
      name: "John Doe",
      image: "https://placehold.co/100",
      taskStatus: "NOT WORKING",
      email: "john@gmail.com",
      role: "employee",
      isNumeric: false,
    },
  ];

  return (
    <TableContainer>
      <Table border={"1px black"} variant={"striped"}>
        <TableCaption>Imperial to metric conversion factors</TableCaption>
        <Thead bgColor={"white"} textColor={"black"}>
          <Tr>
            {tableHead.map((head) => (
              <Th key={head.id} isNumeric={head.isNumeric}>
                {head.title}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {tableData.map((row) => (
            <Tr key={row.id}>
              <Td>
                <Flex direction={"row"}>
                  <Center>
                    <Avatar
                      src={row.image}
                      name={row.name}
                      size={"md"}
                      alt={row.name}
                    />
                    <Box paddingLeft={"8px"}>{row.name}</Box>
                  </Center>
                </Flex>
              </Td>
              <Td>{row.taskStatus}</Td>
              <Td>{row.email}</Td>
              <Td>{row.role}</Td>
            </Tr>
          ))}
        </Tbody>
        <Tfoot>
          <Tr>
            {tableHead.map((head) => (
              <Th key={head.id} isNumeric={head.isNumeric}>
                {head.title}
              </Th>
            ))}
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
}
