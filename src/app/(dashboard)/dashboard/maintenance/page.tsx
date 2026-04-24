"use client";

import { Title, Paper, Table, Group, Button, Badge, Stack, Text, Select } from "@mantine/core";
import { IconPlus, IconFilter } from "@tabler/icons-react";

const elements = [
  { id: "REQ-101", unit: "101", category: "Plumbing", priority: "High", status: "In Progress", date: "2024-04-20" },
  { id: "REQ-102", unit: "205", category: "Electrical", priority: "Medium", status: "Pending", date: "2024-04-22" },
  { id: "REQ-103", unit: "303", category: "Cleaning", priority: "Low", status: "Completed", date: "2024-04-18" },
];

export default function MaintenancePage() {
  const rows = elements.map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td fw={500}>{element.id}</Table.Td>
      <Table.Td>{element.unit}</Table.Td>
      <Table.Td>{element.category}</Table.Td>
      <Table.Td>
        <Badge variant="dot" color={element.priority === "High" ? "red" : element.priority === "Medium" ? "orange" : "blue"}>
          {element.priority}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Badge color={element.status === "Completed" ? "green" : element.status === "In Progress" ? "blue" : "yellow"}>
          {element.status}
        </Badge>
      </Table.Td>
      <Table.Td>{element.date}</Table.Td>
      <Table.Td>
        <Button variant="subtle" size="xs">Update</Button>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Stack gap="md">
      <Group justify="space-between">
        <Title order={2}>Maintenance Requests</Title>
        <Button leftSection={<IconPlus size={16} />} color="orange">New Request</Button>
      </Group>

      <Paper p="md" radius="md" withBorder>
        <Group mb="md">
          <Select
            placeholder="Filter by Status"
            data={["Pending", "In Progress", "Completed"]}
            leftSection={<IconFilter size={16} />}
            style={{ width: 200 }}
          />
        </Group>
        <Table verticalSpacing="sm">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Request ID</Table.Th>
              <Table.Th>Unit</Table.Th>
              <Table.Th>Category</Table.Th>
              <Table.Th>Priority</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Date</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Paper>
    </Stack>
  );
}
