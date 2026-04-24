"use client";

import { Title, Paper, Table, Group, Button, Badge, Stack, Text, Avatar } from "@mantine/core";
import { IconUserPlus, IconSearch } from "@tabler/icons-react";

const elements = [
  { id: "1", name: "David Miller", unit: "101", purpose: "Delivery", checkIn: "10:30 AM", status: "Checked In" },
  { id: "2", name: "Sarah Connor", unit: "201", purpose: "Guest", checkIn: "09:15 AM", status: "Checked Out" },
  { id: "3", name: "Mike Tyson", unit: "305", purpose: "Maintenance", checkIn: "11:00 AM", status: "Checked In" },
];

export default function VisitorsPage() {
  const rows = elements.map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td>
        <Group gap="sm">
          <Avatar size="sm" radius="xl" color="cyan">{element.name.charAt(0)}</Avatar>
          <Text size="sm" fw={500}>{element.name}</Text>
        </Group>
      </Table.Td>
      <Table.Td>{element.unit}</Table.Td>
      <Table.Td>{element.purpose}</Table.Td>
      <Table.Td>{element.checkIn}</Table.Td>
      <Table.Td>
        <Badge color={element.status === "Checked In" ? "green" : "gray"}>
          {element.status}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Button variant="subtle" size="xs" color={element.status === "Checked In" ? "red" : "blue"}>
          {element.status === "Checked In" ? "Check Out" : "View"}
        </Button>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Stack gap="md">
      <Group justify="space-between">
        <Title order={2}>Visitor Log</Title>
        <Button leftSection={<IconUserPlus size={16} />} color="cyan">Register Visitor</Button>
      </Group>

      <Paper p="md" radius="md" withBorder>
        <Table verticalSpacing="sm">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Visitor Name</Table.Th>
              <Table.Th>Unit</Table.Th>
              <Table.Th>Purpose</Table.Th>
              <Table.Th>Check In</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Paper>
    </Stack>
  );
}
