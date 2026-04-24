"use client";
import { Title, Paper, Group, Button, TextInput, Stack, Card, Text, Badge } from "@mantine/core";
import { IconPlus, IconSearch, IconSpeakerphone } from "@tabler/icons-react";

const announcements = [
  { id: 1, title: "Elevator Maintenance", content: "Main elevator will be under maintenance on Sunday.", date: "2024-04-24", priority: "High" },
  { id: 2, title: "Pool Cleaning", content: "The swimming pool will be closed for cleaning tomorrow morning.", date: "2024-04-23", priority: "Medium" },
];

export default function AnnouncementsPage() {
  return (
    <Stack gap="md">
      <Group justify="space-between">
        <Title order={2}>Announcements</Title>
        <Button leftSection={<IconPlus size={16} />}>Create Announcement</Button>
      </Group>
      <Paper p="md" radius="md" withBorder>
        <TextInput placeholder="Search announcements..." leftSection={<IconSearch size={16} />} mb="md" />
        <Stack gap="sm">
          {announcements.map((item) => (
            <Card key={item.id} withBorder padding="md" radius="md">
              <Group justify="space-between" mb="xs">
                <Text fw={600}>{item.title}</Text>
                <Badge color={item.priority === "High" ? "red" : "yellow"}>{item.priority}</Badge>
              </Group>
              <Text size="sm" c="dimmed" mb="sm">{item.content}</Text>
              <Text size="xs" c="dimmed">{item.date}</Text>
            </Card>
          ))}
        </Stack>
      </Paper>
    </Stack>
  );
}
