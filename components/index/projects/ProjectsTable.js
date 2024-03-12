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
import { EditProjectButton } from "./EditProjectButton";
import { DeleteConfirmation } from "./DeleteConfirmation";

export function ProjectsTable({ tableHead, tableBody, fetchData }) {
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
              <Flex dir="row">
                <EditProjectButton project={row} fetchData={fetchData} />
                <DeleteConfirmation id={row.id} fetchData={fetchData} />
              </Flex>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
