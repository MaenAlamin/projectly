import React from "react";
import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Flex,
} from "@chakra-ui/react";

export function Stats({ title, info, date, icon, tab, setSelectedOption }) {
  return (
    <>
      <Stat
        border={"1px"}
        borderColor={"gray.200"}
        boxShadow={"base"}
        rounded={"md"}
        padding={4}
        bg={"white"}
        onClick={() => setSelectedOption(tab)}
        _hover={{ cursor: "pointer", backgroundColor: "#efefef" }}
        transition={"all"}
      >
        <StatLabel>{title}</StatLabel>
        <StatNumber>
          <Flex alignItems={"center"} gap={3}>
            {icon} {info}
          </Flex>
        </StatNumber>
        <StatHelpText>{date}</StatHelpText>
      </Stat>
    </>
  );
}
