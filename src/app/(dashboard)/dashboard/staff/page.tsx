"use client";

import { Title, Paper, Table, Group, Button, Badge, Stack, Text, Avatar, TextInput } from "@mantine/core";
import { IconUserPlus, IconSearch } from "@tabler/icons-react";

const elements = [
  { id: "1", name: "Admin User", email: "admin@skyhaven.com", role: "Admin", status: "Active" },
  { id: "2", name: "Staff Member", email: "staff@skyhaven.com", role: "Manager", status: "Active" },
  { id: "3", name: "Technician", email: "tech@skyhaven.com", role: "Staff", status: "Inactive" },
];

export default function StaffPage() {
  const rows = elements.map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td>
        <Group gap="sm">
          <Avatar radius="xl" color="blue">{element.name.charAt(0)}</Avatar>
          <div>
            <Text size="sm" fw={500}>{element.name}</Text>
            <Text size="xs" c="dimmed">{element.email}</Text>
          </div>
        </Group>
      </Table.Td>
      <Table.Td>
        <Badge variant="light" color={element.role === "Admin" ? "red" : element.role === "Manager" ? "blue" : "gray"}>
          {element.role}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Badge color={element.status === "Active" ? "green" : "gray"}>
          {element.status}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Button variant="subtle" size="xs">Manage Permissions</Button>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Stack gap="md">
      <Group justify="space-between">
        <Title order={2}>User Management</Title>
        <Button leftSection={<IconUserPlus size={16} />} color="blue">Add User</Button>
      </Group>

      <Paper p="md" radius="md" withBorder>
        <TextInput
          placeholder="Search users..."
          leftSection={<IconSearch size={16} />}
          mb="md"
        />
        <Table verticalSpacing="sm">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>User</Table.Th>
              <Table.Th>Role</Table.Th>
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
