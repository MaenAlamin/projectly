import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Box, Drawer, DrawerContent, useDisclosure } from "@chakra-ui/react";

import { Settings } from "@/components/index/Settings";
import { Projects } from "@/components/index/Projects";
import { Messages } from "@/components/index/Messages";
import { Emplyees } from "@/components/index/Emplyees";
import { SidebarContent } from "@/components/index/sidebar/SidebarContent";
import { MobileNav } from "@/components/index/sidebar/MobileNav";
import { Dashboard } from "@/components/index/Dashboard";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [selectedOption, setSelectedOption] = useState("dashboard");

  const renderComponent = () => {
    switch (selectedOption) {
      case "settings":
        return <Settings />;
      case "projects":
        return <Projects />;
      case "messages":
        return <Messages />;
      case "employees":
        return <Emplyees />;
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
