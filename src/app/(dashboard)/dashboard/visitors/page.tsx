"use client";

import { Title, Paper, Table, Group, Button, Badge, Stack, Text, Avatar, TextInput, ActionIcon } from "@mantine/core";
import { IconUserPlus, IconSearch, IconEye, IconTrash, IconClock, IconUserCheck, IconUserMinus } from "@tabler/icons-react";

const elements = [
  { id: "1", name: "David Miller", unit: "101", purpose: "Delivery", checkIn: "10:30 AM", status: "Checked In", color: "cyan" },
  { id: "2", name: "Sarah Connor", unit: "201", purpose: "Guest", checkIn: "09:15 AM", status: "Checked Out", color: "pink" },
  { id: "3", name: "Mike Tyson", unit: "305", purpose: "Maintenance", checkIn: "11:00 AM", status: "Checked In", color: "orange" },
];

export default function VisitorsPage() {
  const rows = elements.map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td>
        <Group gap="sm">
          <Avatar size="sm" radius="xl" color={element.color}>{element.name.charAt(0)}</Avatar>
          <Text size="sm" fw={500}>{element.name}</Text>
        </Group>
      </Table.Td>
      <Table.Td>Unit {element.unit}</Table.Td>
      <Table.Td>
        <Badge variant="light" color="gray">{element.purpose}</Badge>
      </Table.Td>
      <Table.Td>
        <Group gap={4}>
          <IconClock size={14} style={{ color: "var(--mantine-color-dimmed)" }} />
          <Text size="sm">{element.checkIn}</Text>
        </Group>
      </Table.Td>
      <Table.Td>
        <Badge variant="dot" color={element.status === "Checked In" ? "green" : "gray"}>
          {element.status}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Group gap={4} justify="flex-end">
          <ActionIcon variant="subtle" color="gray"><IconEye size={16} /></ActionIcon>
          {element.status === "Checked In" ? (
            <Button variant="subtle" size="xs" color="red" leftSection={<IconUserMinus size={14} />}>
              Check Out
            </Button>
          ) : (
            <Button variant="subtle" size="xs" color="blue" leftSection={<IconUserCheck size={14} />}>
              Re-entry
            </Button>
          )}
          <ActionIcon variant="subtle" color="red"><IconTrash size={16} /></ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Stack gap="xl">
      <Group justify="space-between">
        <Stack gap={0}>
          <Title order={2}>Visitor Log</Title>
          <Text c="dimmed" size="sm">Monitor and manage visitor access to the property.</Text>
        </Stack>
        <Button leftSection={<IconUserPlus size={16} />} color="#014F86">Register Visitor</Button>
      </Group>

      <Paper p="md" radius="md" withBorder shadow="sm">
        <TextInput
          placeholder="Search visitors by name, unit or purpose..."
          leftSection={<IconSearch size={16} />}
          mb="xl"
          size="md"
        />
        <Table verticalSpacing="sm" highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Visitor Name</Table.Th>
              <Table.Th>Unit</Table.Th>
              <Table.Th>Purpose</Table.Th>
              <Table.Th>Check In</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th ta="right">Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Paper>
    </Stack>
  );
}
