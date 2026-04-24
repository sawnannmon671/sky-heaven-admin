"use client";

import { Title, Paper, Table, Group, Button, Badge, Stack, Text, Select, ActionIcon, ThemeIcon, TextInput } from "@mantine/core";
import { IconPlus, IconFilter, IconEye, IconEdit, IconTrash, IconTool, IconSearch } from "@tabler/icons-react";

const elements = [
  { id: "REQ-101", unit: "101", category: "Plumbing", priority: "High", status: "In Progress", date: "2024-04-20", color: "red" },
  { id: "REQ-102", unit: "205", category: "Electrical", priority: "Medium", status: "Pending", date: "2024-04-22", color: "orange" },
  { id: "REQ-103", unit: "303", category: "Cleaning", priority: "Low", status: "Completed", date: "2024-04-18", color: "blue" },
];

export default function MaintenancePage() {
  const rows = elements.map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td>
        <Group gap="sm">
          <ThemeIcon size="sm" variant="light" color={element.priority === "High" ? "red" : "blue"}>
            <IconTool size={16} />
          </ThemeIcon>
          <Text size="sm" fw={500}>{element.id}</Text>
        </Group>
      </Table.Td>
      <Table.Td>Unit {element.unit}</Table.Td>
      <Table.Td>{element.category}</Table.Td>
      <Table.Td>
        <Badge variant="light" color={element.priority === "High" ? "red" : element.priority === "Medium" ? "orange" : "blue"}>
          {element.priority}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Badge variant="dot" color={element.status === "Completed" ? "green" : element.status === "In Progress" ? "blue" : "yellow"}>
          {element.status}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Text size="sm" c="dimmed">{element.date}</Text>
      </Table.Td>
      <Table.Td>
        <Group gap={4} justify="flex-end">
          <ActionIcon variant="subtle" color="gray">
            <IconEye size={16} />
          </ActionIcon>
          <ActionIcon variant="subtle" color="blue">
            <IconEdit size={16} />
          </ActionIcon>
          <ActionIcon variant="subtle" color="red">
            <IconTrash size={16} />
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Stack gap="xl">
      <Group justify="space-between">
        <Stack gap={0}>
          <Title order={2}>Maintenance Requests</Title>
          <Text c="dimmed" size="sm">Track and manage property maintenance and repair tickets.</Text>
        </Stack>
        <Button leftSection={<IconPlus size={16} />} color="#014F86">New Request</Button>
      </Group>

      <Paper p="md" radius="md" withBorder shadow="sm">
        <Group mb="xl" justify="space-between">
          <TextInput
            placeholder="Search requests..."
            leftSection={<IconSearch size={16} />}
            style={{ flex: 1 }}
          />
          <Select
            placeholder="Filter by Status"
            data={["Pending", "In Progress", "Completed"]}
            leftSection={<IconFilter size={16} />}
            style={{ width: 200 }}
          />
        </Group>
        <Table verticalSpacing="sm" highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Request ID</Table.Th>
              <Table.Th>Unit</Table.Th>
              <Table.Th>Category</Table.Th>
              <Table.Th>Priority</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Date</Table.Th>
              <Table.Th ta="right">Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Paper>
    </Stack>
  );
}
