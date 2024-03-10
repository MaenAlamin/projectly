import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Box, Drawer, DrawerContent, useDisclosure } from "@chakra-ui/react";

import { Settings } from "@/components/index/Settings";
import { Projects } from "@/components/index/Projects";
import { Employees } from "@/components/index/Employees";
import { SidebarContent } from "@/components/index/sidebar/SidebarContent";
import { MobileNav } from "@/components/index/sidebar/MobileNav";
import { Dashboard } from "@/components/index/Dashboard";
import { Tasks } from "@/components/index/Tasks";

export async function getServerSideProps() {
  try {
    const usersRes = await fetch(`https://api-projectly.techtitans.site/users`);
    if (!usersRes.ok) {
      throw new Error(usersRes.statusText);
    }
    const usersData = await usersRes.json();
    const tasksRes = await fetch(`https://api-projectly.techtitans.site/tasks`);
    if (!tasksRes.ok) throw new Error(tasksRes.statusText);
    const tasksData = await tasksRes.json();
    const projectsRes = await fetch(
      `https://api-projectly.techtitans.site/projects`
    );
    if (!projectsRes.ok) throw new Error(projectsRes.statusText);
    const projectsData = await projectsRes.json();

    return { props: { usersData, projectsData, tasksData } };
  } catch (error) {
    return { props: { error: error.message } };
  }
}

export default function Home({ usersData, projectsData, tasksData, error }) {
  const { data: session } = useSession();
  const router = useRouter();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [selectedOption, setSelectedOption] = useState("dashboard");
  const [users, setUsers] = useState(usersData);
  const [projects, setProjects] = useState(projectsData);
  const [tasks, setTasks] = useState(tasksData);

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  const renderComponent = () => {
    switch (selectedOption) {
      case "settings":
        return <Settings />;
      case "projects":
        return <Projects projects={projects} setProjects={setProjects} />;
      case "tasks":
        return <Tasks tasks={tasks} setTasks={setTasks} />;
      case "employees":
        return <Employees users={users} setUsers={setUsers} />;
      case "dashboard":
        return <Dashboard />;
      default:
        return <Dashboard />;
    }
  };

  useEffect(() => {
    if (!session) {
      router.push("/login");
    }
  }, [session, router]);

  if (error) {
    return (
      <div>
        <p>An error occurred while loading the data:</p>
        <pre>{error}</pre>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Projectly</title>
        <meta name="description" content="Project Managment App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Box minH="100vh" bg={"gray.100"}>
          <SidebarContent
            onClose={() => onClose}
            display={{ base: "none", md: "block" }}
            setSelectedOption={setSelectedOption}
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
              <SidebarContent onClose={onClose} />
            </DrawerContent>
          </Drawer>
          <MobileNav onOpen={onOpen} />
          <Box ml={{ base: 0, md: 60 }} p="4">
            {renderComponent()}
          </Box>
        </Box>
      </main>
    </>
  );
}
