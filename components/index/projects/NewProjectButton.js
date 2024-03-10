import { Button } from "@chakra-ui/react";
import React from "react";
import { FaPlus } from "react-icons/fa";

export function NewProjectButton() {
  const handleProjectCreation = () => {
    fetch("https://api-projectly.techtitans.site/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Project 1",
        description: "This is a sample project",
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => {
        console.error("Error: ", error);
      });
  };
  return (
    <Button
      onClick={handleProjectCreation}
      leftIcon={<FaPlus />}
      colorScheme="blue"
      variant="solid"
    >
      Add New
    </Button>
  );
}
