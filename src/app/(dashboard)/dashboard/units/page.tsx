"use client";

import { Title, Paper, Table, Group, Button, TextInput, Badge, Stack, ActionIcon, Text, ThemeIcon } from "@mantine/core";
import { IconPlus, IconSearch, IconEye, IconEdit, IconTrash, IconBuildingCommunity } from "@tabler/icons-react";

const elements = [
  { id: "101", floor: 1, type: "Studio", status: "Occupied", resident: "John Doe", color: "blue" },
  { id: "102", floor: 1, type: "1 Bedroom", status: "Available", resident: "-", color: "green" },
  { id: "201", floor: 2, type: "2 Bedroom", status: "Occupied", resident: "Jane Smith", color: "blue" },
  { id: "305", floor: 3, type: "Penthouse", status: "Maintenance", resident: "-", color: "orange" },
];

export default function UnitsPage() {
  const rows = elements.map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td>
        <Group gap="sm">
          <ThemeIcon size="sm" variant="light" color={element.color}>
            <IconBuildingCommunity size={16} />
          </ThemeIcon>
          <Text size="sm" fw={500}>{element.id}</Text>
        </Group>
      </Table.Td>
      <Table.Td>{element.floor}</Table.Td>
      <Table.Td>{element.type}</Table.Td>
      <Table.Td>
        <Badge 
          variant="dot" 
          color={element.status === "Occupied" ? "blue" : element.status === "Available" ? "green" : "orange"}
        >
          {element.status}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Text size="sm" c={element.resident === "-" ? "dimmed" : "inherit"}>
          {element.resident}
        </Text>
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
          <Title order={2}>Units Management</Title>
          <Text c="dimmed" size="sm">Manage and monitor all property units and their status.</Text>
        </Stack>
        <Button leftSection={<IconPlus size={16} />} color="#014F86">Add Unit</Button>
      </Group>

      <Paper p="md" radius="md" withBorder shadow="sm">
        <TextInput
          placeholder="Search units by number, type or resident..."
          leftSection={<IconSearch size={16} />}
          mb="xl"
          size="md"
        />
        <Table verticalSpacing="sm" highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Unit Number</Table.Th>
              <Table.Th>Floor</Table.Th>
              <Table.Th>Type</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Resident</Table.Th>
              <Table.Th ta="right">Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Paper>
    </Stack>
  );
}
