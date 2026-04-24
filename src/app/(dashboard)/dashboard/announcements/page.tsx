"use client";
import { Title, Paper, Group, Button, TextInput, Stack, Card, Text, Badge, ThemeIcon, ActionIcon } from "@mantine/core";
import { IconPlus, IconSearch, IconSpeakerphone, IconCalendar, IconEdit, IconTrash } from "@tabler/icons-react";

const announcements = [
  { id: 1, title: "Elevator Maintenance", content: "Main elevator will be under maintenance on Sunday from 9:00 AM to 5:00 PM. Please use the service elevator during this period.", date: "2024-04-24", priority: "High" },
  { id: 2, title: "Pool Cleaning", content: "The swimming pool will be closed for cleaning tomorrow morning. It will reopen at 1:00 PM.", date: "2024-04-23", priority: "Medium" },
  { id: 3, title: "Monthly Resident Meeting", content: "Join us for the monthly meeting in the function hall to discuss community updates.", date: "2024-04-20", priority: "Low" },
];

export default function AnnouncementsPage() {
  return (
    <Stack gap="xl">
      <Group justify="space-between">
        <Stack gap={0}>
          <Title order={2}>Announcements</Title>
          <Text c="dimmed" size="sm">Broadcast important news and updates to all residents.</Text>
        </Stack>
        <Button leftSection={<IconPlus size={16} />} color="#014F86">Create Announcement</Button>
      </Group>

      <Paper p="md" radius="md" withBorder shadow="sm">
        <TextInput
          placeholder="Search announcements..."
          leftSection={<IconSearch size={16} />}
          mb="xl"
          size="md"
        />
        <Stack gap="md">
          {announcements.map((item) => (
            <Card key={item.id} withBorder padding="lg" radius="md">
              <Group justify="space-between" align="flex-start" mb="xs">
                <Group gap="sm">
                  <ThemeIcon 
                    size="lg" 
                    variant="light" 
                    color={item.priority === "High" ? "red" : item.priority === "Medium" ? "orange" : "blue"}
                  >
                    <IconSpeakerphone size={20} />
                  </ThemeIcon>
                  <div>
                    <Text fw={700} size="lg">{item.title}</Text>
                    <Group gap={4} mt={2}>
                      <IconCalendar size={12} style={{ color: "var(--mantine-color-dimmed)" }} />
                      <Text size="xs" c="dimmed">{item.date}</Text>
                    </Group>
                  </div>
                </Group>
                <Group gap="xs">
                  <Badge variant="light" color={item.priority === "High" ? "red" : item.priority === "Medium" ? "orange" : "blue"}>
                    {item.priority} Priority
                  </Badge>
                  <ActionIcon variant="subtle" color="gray"><IconEdit size={16} /></ActionIcon>
                  <ActionIcon variant="subtle" color="red"><IconTrash size={16} /></ActionIcon>
                </Group>
              </Group>
              <Text size="sm" mt="sm" style={{ lineHeight: 1.6 }}>{item.content}</Text>
            </Card>
          ))}
        </Stack>
      </Paper>
    </Stack>
  );
}
