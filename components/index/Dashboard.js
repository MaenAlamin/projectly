import { Box, Center, Flex, Stack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Stats } from "./dashboard/Stats";
import { FiBriefcase, FiUsers } from "react-icons/fi";
import { FaTasks } from "react-icons/fa";

export function Dashboard({ users, tasks, projects }) {
  const [usersStats, setUsersStats] = useState(users);
  const [projectsStats, setProejctsStats] = useState(projects);
  const [tasksStats, setTasksStats] = useState(tasks);

  const currentDate = new Date();
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  const lastDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );
  const options = { month: "long", day: "numeric" };
  const formattedFirstDay = firstDayOfMonth.toLocaleString("en-US", options);
  const formattedLastDay = lastDayOfMonth.toLocaleString("en-US", options);
  const currentMonth = `${formattedFirstDay} - ${formattedLastDay}`;

  return (
    <Box>
      {/* <Flex> */}
      <Stack gap={6} direction={["column", "row"]} width={["100%"]}>
        <Stats
          title={"Number of Projects"}
          info={projectsStats?.length}
          icon={<FiBriefcase />}
          date={currentMonth}
        />
        <Stats
          title={"Number of Employees"}
          info={usersStats?.length}
          icon={<FiUsers a />}
          date={currentMonth}
        />
        <Stats
          title={"Number of Tasks"}
          info={tasksStats?.length}
          icon={<FaTasks />}
          date={currentMonth}
        />
      </Stack>
      {/* </Flex> */}
    </Box>
  );
}
