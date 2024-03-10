import {
  Box,
  CloseButton,
  Flex,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { NavItem } from "./NavItem";
import {
  FiBriefcase,
  FiLayout,
  // FiMessageSquare,
  FiSettings,
  FiUsers,
} from "react-icons/fi";
import { FaTasks } from "react-icons/fa";

const LinkItems = [
  { name: "Dashboard", icon: FiLayout },
  { name: "Projects", icon: FiBriefcase },
  { name: "Employees", icon: FiUsers },
  { name: "Tasks", icon: FaTasks },
  { name: "Settings", icon: FiSettings },
];

export const SidebarContent = ({ setSelectedOption, onClose, ...rest }) => {
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
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Logo
        </Text>
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
};
