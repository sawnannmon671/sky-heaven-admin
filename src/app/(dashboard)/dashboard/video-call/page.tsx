"use client";

import { Title, Paper, Stack, Text, Button, Center, Group, Box, ActionIcon, SimpleGrid } from "@mantine/core";
import { IconVideo, IconPhone, IconMicrophone, IconVideoOff, IconPhoneOff } from "@tabler/icons-react";

export default function VideoCallPage() {
  return (
    <Stack gap="xl">
      <Stack gap={0}>
        <Title order={2}>Video Communication</Title>
        <Text c="dimmed" size="sm">Connect with residents or staff via secure video and audio calls.</Text>
      </Stack>

      <Paper p="xl" radius="md" withBorder shadow="lg" style={{ backgroundColor: "#141517", minHeight: "600px", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <Center>
          <Stack align="center" gap="xl">
            <div style={{ position: "relative" }}>
              <IconVideo size={100} color="#2c2e33" />
              <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                <IconVideoOff size={40} color="var(--mantine-color-red-6)" />
              </div>
            </div>
            <div style={{ textAlign: "center" }}>
              <Text fw={700} size="xl" c="white">Camera is currently disabled</Text>
              <Text c="dimmed" size="sm">Enable your camera to start the video stream</Text>
            </div>
          </Stack>
        </Center>

        <Box style={{ position: "absolute", bottom: "40px", left: "0", right: "0" }}>
          <Group justify="center" gap="lg">
            <ActionIcon variant="filled" color="dark.6" radius="xl" size={60} style={{ border: "1px solid #373a40" }}>
              <IconMicrophone size={28} />
            </ActionIcon>
            <ActionIcon variant="filled" color="dark.6" radius="xl" size={60} style={{ border: "1px solid #373a40" }}>
              <IconVideoOff size={28} />
            </ActionIcon>
            <ActionIcon variant="filled" color="red.8" radius="xl" size={64}>
              <IconPhoneOff size={32} />
            </ActionIcon>
          </Group>
        </Box>
      </Paper>

      <Paper p="lg" radius="md" withBorder shadow="sm">
        <Title order={4} mb="lg">Quick Connect Services</Title>
        <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="md">
          <Button variant="light" color="#014F86" size="lg" radius="md" leftSection={<IconPhone size={20} />}>Front Desk</Button>
          <Button variant="light" color="#014F86" size="lg" radius="md" leftSection={<IconPhone size={20} />}>Security HQ</Button>
          <Button variant="light" color="#014F86" size="lg" radius="md" leftSection={<IconPhone size={20} />}>Maintenance Dept</Button>
        </SimpleGrid>
      </Paper>
    </Stack>
  );
}
