import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Box, Drawer, DrawerContent, useDisclosure } from "@chakra-ui/react";

import { Projects } from "@/components/index/Projects";
import { Employees } from "@/components/index/Employees";
import { Sidebar } from "@/components/index/sidebar/Sidebar";
import { MobileNav } from "@/components/index/sidebar/MobileNav";
import { Dashboard } from "@/components/index/Dashboard";
import { Tasks } from "@/components/index/Tasks";

async function fetchData() {
  try {
    const usersAPIUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/users`;
    const projectsAPIUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/projects`;
    const tasksAPIUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/tasks`;

    const usersRes = await fetch(usersAPIUrl);
    const tasksRes = await fetch(tasksAPIUrl);
    const projectsRes = await fetch(projectsAPIUrl);

    if (!usersRes.ok || !tasksRes.ok || !projectsRes.ok) {
      throw new Error("Failed To Fetch Data");
    }

    const usersData = await usersRes.json();
    const tasksData = await tasksRes.json();
    const projectsData = await projectsRes.json();

    return { usersData, tasksData, projectsData, error: null };
  } catch (error) {
    console.error(error);
    return {
      usersData: [],
      projectsData: [],
      tasksData: [],
      error: error.message,
    };
  }
}

export async function getServerSideProps() {
  const { usersData, tasksData, projectsData, error } = await fetchData();
  return { props: { usersData, projectsData, tasksData, error } };
}

export default function Home({ usersData, projectsData, tasksData, error }) {
  const { data: session } = useSession();
  const router = useRouter();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [selectedOption, setSelectedOption] = useState("dashboard");
  const [users, setUsers] = useState(usersData);
  const [projects, setProjects] = useState(projectsData);
  const [tasks, setTasks] = useState(tasksData);

  const fetchAndSetData = async () => {
    const { usersData, tasksData, projectsData } = await fetchData();
    setUsers(usersData);
    setProjects(projectsData);
    setTasks(tasksData);
  };

  useEffect(() => {
    fetchAndSetData();
  }, []);

  const renderComponent = () => {
    switch (selectedOption) {
      case "projects":
        return <Projects projects={projects} fetchData={fetchAndSetData} />;
      case "tasks":
        return <Tasks tasks={tasks} fetchData={fetchAndSetData} />;
      case "employees":
        return <Employees users={users} fetchData={fetchAndSetData} />;
      case "dashboard":
        return (
          <Dashboard
            users={users}
            tasks={tasks}
            projects={projects}
            setSelectedOption={setSelectedOption}
          />
        );
      default:
        return <Dashboard />;
    }
  };

  useEffect(() => {
    if (!session) {
      router.push("/login");
    }
  }, [session, router]);

  //for closing the mobile sidebar when changing the tab
  useEffect(() => {
    onClose();
  }, [selectedOption, onClose]);

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
          <Sidebar
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
              <Sidebar
                onClose={onClose}
                setSelectedOption={setSelectedOption}
              />
            </DrawerContent>
          </Drawer>
          <MobileNav onOpen={onOpen} />
          <Box ml={{ base: 0, md: 60 }}>{renderComponent()}</Box>
        </Box>
      </main>
    </>
  );
}
