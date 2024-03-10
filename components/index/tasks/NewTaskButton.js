import { Button } from "@chakra-ui/react";
import React from "react";
import { FaPlus } from "react-icons/fa";

export function NewTaskButton() {
  const handleProjectCreation = () => {
    fetch("https://api-projectly.techtitans.site/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Task 1",
        priority: 1,
        status: "Todo",
        projectId: "cltlbukyn000013r72ja2m0mh",
        userId: "clsp4jmxg0001lx8fo9ayc124",
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
