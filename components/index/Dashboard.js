import { Center, Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Stats } from "./dashboard/Stats";
import { FiBriefcase, FiUsers } from "react-icons/fi";
import { FaTasks } from "react-icons/fa";

export function Dashboard() {
  const [usersStats, setUsersStats] = useState();
  const [projectsStats, setProejctsStats] = useState();
  const [tasksStats, setTasksStats] = useState();

  async function getData() {
    const usersRes = await fetch(`https://api-projectly.techtitans.site/users`);
    const projectsRes = await fetch(
      `https://api-projectly.techtitans.site/projects`
    );
    const tasksRes = await fetch(
      `https://api-projectly.techtitans.site/projects`
    );

    if (!usersRes.ok || !tasksRes.ok || !projectsRes.ok) {
      throw new Error("Failed To Fetch Data");
    }

    const usersData = await usersRes.json();
    const tasksData = await tasksRes.json();
    const projectsData = await projectsRes.json();

    setUsersStats(usersData);
    setTasksStats(tasksData);
    setProejctsStats(projectsData);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Flex dir="row" align={"center"}>
        <Stats
          title={"Number of Projects"}
          info={projectsStats?.length}
          icon={<FiBriefcase />}
          date={16}
        />
        <Stats
          title={"Number of Employees"}
          info={usersStats?.length}
          icon={<FiUsers />}
          date={16}
        />
        <Stats
          title={"Number of Tasks"}
          info={tasksStats?.length}
          icon={<FaTasks />}
          date={16}
        />
      </Flex>
    </div>
  );
}
