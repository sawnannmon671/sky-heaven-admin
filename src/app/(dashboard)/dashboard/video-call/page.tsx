"use client";

import { Title, Paper, Stack, Text, Button, Center, Group, Box } from "@mantine/core";
import { IconVideo, IconPhone, IconMicrophone, IconVideoOff, IconPhoneOff } from "@tabler/icons-react";

export default function VideoCallPage() {
  return (
    <Stack gap="xl">
      <Title order={2}>Video Call</Title>

      <Paper p="xl" radius="md" withBorder style={{ backgroundColor: "#1a1b1e", minHeight: "500px", position: "relative", overflow: "hidden" }}>
        <Center style={{ height: "400px" }}>
          <Stack align="center" gap="md">
            <IconVideo size={80} color="gray" />
            <Text c="dimmed">Camera is off</Text>
          </Stack>
        </Center>

        <Box style={{ position: "absolute", bottom: "30px", left: "0", right: "0" }}>
          <Group justify="center" gap="md">
            <Button variant="filled" color="dark" radius="xl" size="lg" style={{ backgroundColor: "#2c2e33" }}>
              <IconMicrophone size={24} />
            </Button>
            <Button variant="filled" color="dark" radius="xl" size="lg" style={{ backgroundColor: "#2c2e33" }}>
              <IconVideoOff size={24} />
            </Button>
            <Button variant="filled" color="red" radius="xl" size="lg">
              <IconPhoneOff size={24} />
            </Button>
          </Group>
        </Box>
      </Paper>

      <Paper p="md" radius="md" withBorder>
        <Title order={4} mb="sm">Quick Connect</Title>
        <Group>
          <Button variant="light" leftSection={<IconPhone size={16} />}>Front Desk</Button>
          <Button variant="light" leftSection={<IconPhone size={16} />}>Security</Button>
          <Button variant="light" leftSection={<IconPhone size={16} />}>Maintenance</Button>
        </Group>
      </Paper>
    </Stack>
  );
}
