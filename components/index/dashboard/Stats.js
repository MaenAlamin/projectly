import React from "react";
import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
  Flex,
} from "@chakra-ui/react";

export function Stats({ title, info, date, icon }) {
  return (
    <>
      <Stat>
        <StatLabel>{title}</StatLabel>
        <StatNumber>
          <Flex dir="row">
            {icon} {info}
          </Flex>
        </StatNumber>
        <StatHelpText>{date}</StatHelpText>
      </Stat>
    </>
  );
}
