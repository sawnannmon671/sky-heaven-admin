"use client";

import { Title, Paper, Table, Group, Button, TextInput, Badge, Stack, Avatar, Text, ActionIcon } from "@mantine/core";
import { IconPlus, IconSearch, IconEye, IconEdit, IconTrash, IconPhone, IconMail } from "@tabler/icons-react";

const elements = [
  { id: "1", name: "John Doe", unit: "101", phone: "09-123456789", email: "john@example.com", type: "Owner", status: "Active", color: "blue" },
  { id: "2", name: "Jane Smith", unit: "201", phone: "09-987654321", email: "jane@example.com", type: "Tenant", status: "Active", color: "teal" },
  { id: "3", name: "Robert Wilson", unit: "305", phone: "09-555666777", email: "robert@example.com", type: "Owner", status: "Inactive", color: "gray" },
];

export default function ResidentsPage() {
  const rows = elements.map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td>
        <Group gap="sm">
          <Avatar color={element.color} radius="xl" size="sm">{element.name.charAt(0)}</Avatar>
          <div>
            <Text size="sm" fw={500}>{element.name}</Text>
            <Text size="xs" c="dimmed">{element.email}</Text>
          </div>
        </Group>
      </Table.Td>
      <Table.Td>
        <Text size="sm" fw={500}>Unit {element.unit}</Text>
      </Table.Td>
      <Table.Td>
        <Group gap={4}>
          <IconPhone size={14} style={{ color: "var(--mantine-color-dimmed)" }} />
          <Text size="sm">{element.phone}</Text>
        </Group>
      </Table.Td>
      <Table.Td>
        <Badge variant="light" color={element.type === "Owner" ? "violet" : "blue"}>{element.type}</Badge>
      </Table.Td>
      <Table.Td>
        <Badge variant="dot" color={element.status === "Active" ? "green" : "gray"}>{element.status}</Badge>
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
          <Title order={2}>Residents Directory</Title>
          <Text c="dimmed" size="sm">Manage resident profiles, contact information, and occupancy status.</Text>
        </Stack>
        <Button leftSection={<IconPlus size={16} />} color="#014F86">Add Resident</Button>
      </Group>

      <Paper p="md" radius="md" withBorder shadow="sm">
        <TextInput
          placeholder="Search residents by name, unit, phone or email..."
          leftSection={<IconSearch size={16} />}
          mb="xl"
          size="md"
        />
        <Table verticalSpacing="sm" highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Name & Contact</Table.Th>
              <Table.Th>Unit</Table.Th>
              <Table.Th>Phone</Table.Th>
              <Table.Th>Type</Table.Th>
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
