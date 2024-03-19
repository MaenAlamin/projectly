import {
  Badge,
  Box,
  Button,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FiBell } from "react-icons/fi";

export function Notifications({ notifications, fetchNotifications }) {
  const [hasUnread, setHasUnread] = useState(false);
  useEffect(() => {
    // Check if there are any unread notifications when notifications are fetched
    const unread = notifications.some((notification) => !notification.read);
    setHasUnread(unread);
  }, [notifications]);
  async function handleHover(notification) {
    if (notification.read) {
      return;
    }
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/notifications/${notification.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: notification?.id, read: true }),
        }
      ).then(fetchNotifications);
    } catch (error) {}
  }
  return (
    <Popover>
      <PopoverTrigger>
        <Box position={"relative"}>
          <IconButton
            size="lg"
            variant="ghost"
            aria-label="open menu"
            icon={<FiBell />}
          />
          {hasUnread && (
            <Badge
              borderRadius="full"
              boxSize="10px"
              bg="red.500"
              position="absolute"
              right="2"
              top="2"
            />
          )}
        </Box>
      </PopoverTrigger>
      <Portal>
        <PopoverContent>
          <PopoverArrow />
          <PopoverHeader>Notifications</PopoverHeader>
          <PopoverCloseButton />
          <PopoverBody>
            {notifications.length == 0 ? (
              <Text fontSize="sm" textAlign="center" p={2}>
                No notifications
              </Text>
            ) : (
              <Box maxHeight="200px" overflowY="auto">
                <VStack spacing={2} align="start">
                  {notifications.map((notification) => (
                    <Box
                      key={notification.id}
                      p={2}
                      borderRadius="md"
                      w={"100%"}
                      bg={notification.read ? "gray.100" : "blue.100"}
                      onMouseEnter={() => handleHover(notification)}
                    >
                      <Text
                        fontSize="sm"
                        color={notification.read ? "gray.700" : "blue.700"}
                      >
                        {new Date(notification.createdAt).toLocaleString()}
                      </Text>
                      <Text
                        fontSize="sm"
                        fontWeight={notification.read ? "normal" : "bold"}
                      >
                        {notification.message}
                      </Text>
                    </Box>
                  ))}
                </VStack>
              </Box>
            )}
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
}
