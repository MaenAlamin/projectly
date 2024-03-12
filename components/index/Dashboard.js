import { Box, Stack } from "@chakra-ui/react";
import React from "react";
import { Stats } from "./dashboard/Stats";
import { FiBriefcase, FiUsers } from "react-icons/fi";
import { FaTasks } from "react-icons/fa";

export function Dashboard({ users, tasks, projects, setSelectedOption }) {
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
      <Stack gap={6} direction={["column", "row"]} width={["100%"]}>
        <Stats
          title={"Number of Projects"}
          info={projects?.length}
          icon={<FiBriefcase />}
          date={currentMonth}
          setSelectedOption={setSelectedOption}
          tab={"projects"}
        />
        <Stats
          title={"Number of Employees"}
          info={users?.length}
          icon={<FiUsers a />}
          date={currentMonth}
          setSelectedOption={setSelectedOption}
          tab={"employees"}
        />
        <Stats
          title={"Number of Tasks"}
          info={tasks?.length}
          icon={<FaTasks />}
          date={currentMonth}
          setSelectedOption={setSelectedOption}
          tab={"tasks"}
        />
      </Stack>
    </Box>
  );
}
