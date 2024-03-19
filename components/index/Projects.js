import { Box } from "@chakra-ui/react";
import React, { useState } from "react";
import { ProjectsList } from "./projects/ProjectsList";
import { MobileProjectList } from "./projects/MoblieProjectList";
import { Comments } from "./projects/Comments";

export function Projects({ projects, fetchData }) {
  const [selectedProject, setSelectedProject] = useState("");
  return (
    <Box>
      <ProjectsList
        projects={projects}
        display={{ base: "none", md: "block" }}
        fetchData={fetchData}
        setSelectedProject={setSelectedProject}
      />
      <MobileProjectList
        display={{ md: "none" }}
        projects={projects}
        fetchData={fetchData}
        setSelectedProject={setSelectedProject}
        zIndex={10}
      />
      <Box ml={{ base: 0, md: 96 }} p="4" position={"relative"}>
        <Comments projectId={selectedProject} />
      </Box>
    </Box>
  );
}
