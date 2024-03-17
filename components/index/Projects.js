import {
  Box,
  Drawer,
  DrawerContent,
  Flex,
  Spacer,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { ProjectsSidebar } from "./projects/ProjectsSidebar";
import { NewProjectButton } from "./projects/NewProjectButton";
import { useDisclosure } from "@chakra-ui/react";
import { ProjectsList } from "./projects/ProjectsList";
import { ProjectMobileNav } from "./projects/ProjectMobileNav";

const tableHead = [{ id: 1, title: "Name", isNumeric: false }];

const LinkItems = [
  { name: "Home" },
  { name: "Trending" },
  { name: "Explore" },
  { name: "Favourites" },
  { name: "Settings" },
];
export function Projects({ projects, fetchData }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      <ProjectsList
        linkItems={LinkItems}
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <ProjectsList linkItems={LinkItems} onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <ProjectMobileNav
        display={{ base: "flex", md: "none" }}
        onOpen={onOpen}
      />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {/* Content */}
      </Box>
    </Box>
    // <Flex direction={"column"}>
    //   <Flex direction={"row"} marginY={3}>
    //     <Text alignSelf={"center"} fontSize={"xl"} fontWeight={"bold"}>
    //       Projects
    //     </Text>
    //     <Spacer />
    //     <NewProjectButton fetchData={fetchData} />
    //   </Flex>
    //   <ProjectsSidebar
    //     tableHead={tableHead}
    //     tableBody={projects}
    //     fetchData={fetchData}
    //   />
    // </Flex>
  );
}
