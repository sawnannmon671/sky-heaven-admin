"use client";

import { Title, Paper, Table, Group, Button, TextInput, Badge, Stack, Avatar, Text } from "@mantine/core";
import { IconPlus, IconSearch } from "@tabler/icons-react";

const elements = [
  { id: "1", name: "John Doe", unit: "101", phone: "09-123456789", type: "Owner", status: "Active" },
  { id: "2", name: "Jane Smith", unit: "201", phone: "09-987654321", type: "Tenant", status: "Active" },
  { id: "3", name: "Robert Wilson", unit: "305", phone: "09-555666777", type: "Owner", status: "Inactive" },
];

export default function ResidentsPage() {
  const rows = elements.map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td>
        <Group gap="sm">
          <Avatar color="blue" radius="xl">{element.name.charAt(0)}</Avatar>
          <Text size="sm" fw={500}>{element.name}</Text>
        </Group>
      </Table.Td>
      <Table.Td>{element.unit}</Table.Td>
      <Table.Td>{element.phone}</Table.Td>
      <Table.Td>
        <Badge variant="light" color={element.type === "Owner" ? "violet" : "blue"}>{element.type}</Badge>
      </Table.Td>
      <Table.Td>
        <Badge color={element.status === "Active" ? "green" : "gray"}>{element.status}</Badge>
      </Table.Td>
      <Table.Td>
        <Button variant="subtle" size="xs">Edit</Button>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Stack gap="md">
      <Group justify="space-between">
        <Title order={2}>Residents</Title>
        <Button leftSection={<IconPlus size={16} />}>Add Resident</Button>
      </Group>

      <Paper p="md" radius="md" withBorder>
        <TextInput
          placeholder="Search residents..."
          leftSection={<IconSearch size={16} />}
          mb="md"
        />
        <Table verticalSpacing="sm">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Name</Table.Th>
              <Table.Th>Unit</Table.Th>
              <Table.Th>Phone</Table.Th>
              <Table.Th>Type</Table.Th>
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
