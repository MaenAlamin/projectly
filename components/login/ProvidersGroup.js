import { Button, ButtonGroup, VisuallyHidden } from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import React from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const providers = [
  { slug: "google", name: "Google", icon: <FcGoogle /> },
  { slug: "github", name: "Github", icon: <FaGithub /> },
];

export function ProvidersGroup() {
  return (
    <ButtonGroup variant="secondary" orientation="vertical" spacing="4">
      {providers.map(({ slug, name, icon }) => (
        <Button
          variant={"outline"}
          key={slug}
          flexGrow={1}
          onClick={() => signIn(slug)}
          leftIcon={icon}
        >
          <VisuallyHidden>Sign in with {name}</VisuallyHidden>
          Continue with {name}
        </Button>
      ))}
    </ButtonGroup>
  );
}
