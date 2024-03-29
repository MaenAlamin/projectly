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
import { DeleteConfirmation } from "./DeleteConfirmation";
import { EditEmployeeButton } from "./EditEmployeeButton";
import NotificationButton from "./NotificationButton";

export function EmployeesTable({ tableHead, tableBody, fetchData }) {
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
              <Td>{row?.tasks.length}</Td>
              <Td>{row?.email}</Td>
              <Td>{row?.role}</Td>
              <Td>
                <Flex dir="row">
                  <EditEmployeeButton employee={row} fetchData={fetchData} />
                  <DeleteConfirmation id={row.id} fetchData={fetchData} />
                  <NotificationButton user={row} />
                </Flex>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
