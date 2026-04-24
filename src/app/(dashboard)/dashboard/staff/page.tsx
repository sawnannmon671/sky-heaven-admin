"use client";

import { Title, Paper, Table, Group, Button, Badge, Stack, Text, Avatar, TextInput, ActionIcon } from "@mantine/core";
import { IconUserPlus, IconSearch, IconShieldLock, IconEdit, IconTrash, IconEye } from "@tabler/icons-react";

const elements = [
  { id: "1", name: "Admin User", email: "admin@skyhaven.com", role: "Admin", status: "Active", color: "red" },
  { id: "2", name: "Staff Member", email: "staff@skyhaven.com", role: "Manager", status: "Active", color: "blue" },
  { id: "3", name: "Technician", email: "tech@skyhaven.com", role: "Staff", status: "Inactive", color: "gray" },
];

export default function StaffPage() {
  const rows = elements.map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td>
        <Group gap="sm">
          <Avatar radius="xl" color={element.color} size="sm">{element.name.charAt(0)}</Avatar>
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
        <Badge variant="dot" color={element.status === "Active" ? "green" : "gray"}>
          {element.status}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Group gap={4} justify="flex-end">
          <ActionIcon variant="subtle" color="gray"><IconEye size={16} /></ActionIcon>
          <ActionIcon variant="subtle" color="blue"><IconShieldLock size={16} /></ActionIcon>
          <ActionIcon variant="subtle" color="blue"><IconEdit size={16} /></ActionIcon>
          <ActionIcon variant="subtle" color="red"><IconTrash size={16} /></ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Stack gap="xl">
      <Group justify="space-between">
        <Stack gap={0}>
          <Title order={2}>Staff & User Management</Title>
          <Text c="dimmed" size="sm">Manage administrative access and property staff roles.</Text>
        </Stack>
        <Button leftSection={<IconUserPlus size={16} />} color="#014F86">Add Staff</Button>
      </Group>

      <Paper p="md" radius="md" withBorder shadow="sm">
        <TextInput
          placeholder="Search staff by name, email or role..."
          leftSection={<IconSearch size={16} />}
          mb="xl"
          size="md"
        />
        <Table verticalSpacing="sm" highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>User</Table.Th>
              <Table.Th>Role</Table.Th>
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
