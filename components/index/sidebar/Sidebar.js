import {
  Box,
  CloseButton,
  Flex,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";
import { NavItem } from "./NavItem";
import { FiBriefcase, FiLayout, FiUsers } from "react-icons/fi";
import { FaTasks } from "react-icons/fa";

const LinkItems = [
  { name: "Dashboard", icon: FiLayout },
  { name: "Projects", icon: FiBriefcase },
  { name: "Employees", icon: FiUsers },
  { name: "Tasks", icon: FaTasks },
];

export function Sidebar({ setSelectedOption, onClose, ...rest }) {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Image
          width={["50%", "auto"]}
          src="/images/logo/logo.png"
          alt="Projectly"
        />
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem
          setSelectedOption={setSelectedOption}
          selected={link.name.toLowerCase()}
          key={link.name}
          icon={link.icon}
        >
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
}
