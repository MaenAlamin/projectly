import {
  Avatar,
  Box,
  Center,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";

export function TasksTable({ tableHead, tableBody }) {
  console.log("tasks: ", tableBody);
  return (
    <TableContainer>
      <Table border={"1px black"} variant={"striped"}>
        <Thead bgColor={"white"} textColor={"black"}>
          <Tr>
            {tableHead?.map((head) => (
              <Th key={head.id} isNumeric={head.isNumeric}>
                {head.title}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {tableBody?.map((row) => (
            <Tr key={row.id}>
              <Td>{row.name}</Td>
              <Td>{row.user.name}</Td>
              <Td>{row.status}</Td>
              <Td>{row.createdAt}</Td>
              <Td>{row.finishedAt ? row.finishedAt : "_"}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
