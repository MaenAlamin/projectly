import {
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
import { EditTaskButton } from "./EditTaskButton";
import { DeleteConfirmation } from "./DeleteConfirmation";

export function TasksTable({ tableHead, tableBody, fetchData }) {
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
            <Th></Th>
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
              <Td>
                <Flex dir="row">
                  <EditTaskButton task={row} fetchData={fetchData} />
                  <DeleteConfirmation id={row.id} fetchData={fetchData} />
                </Flex>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
