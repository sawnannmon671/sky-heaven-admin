"use client";

import { Title, Paper, Table, Group, Button, TextInput, Badge, Stack } from "@mantine/core";
import { IconPlus, IconSearch } from "@tabler/icons-react";

const elements = [
  { id: "101", floor: 1, type: "Studio", status: "Occupied", resident: "John Doe" },
  { id: "102", floor: 1, type: "1 Bedroom", status: "Available", resident: "-" },
  { id: "201", floor: 2, type: "2 Bedroom", status: "Occupied", resident: "Jane Smith" },
  { id: "305", floor: 3, type: "Penthouse", status: "Maintenance", resident: "-" },
];

export default function UnitsPage() {
  const rows = elements.map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td>{element.id}</Table.Td>
      <Table.Td>{element.floor}</Table.Td>
      <Table.Td>{element.type}</Table.Td>
      <Table.Td>
        <Badge color={element.status === "Occupied" ? "green" : element.status === "Available" ? "blue" : "orange"}>
          {element.status}
        </Badge>
      </Table.Td>
      <Table.Td>{element.resident}</Table.Td>
      <Table.Td>
        <Button variant="subtle" size="xs">View</Button>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Stack gap="md">
      <Group justify="space-between">
        <Title order={2}>Units Management</Title>
        <Button leftSection={<IconPlus size={16} />}>Add Unit</Button>
      </Group>

      <Paper p="md" radius="md" withBorder>
        <TextInput
          placeholder="Search units..."
          leftSection={<IconSearch size={16} />}
          mb="md"
        />
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Unit Number</Table.Th>
              <Table.Th>Floor</Table.Th>
              <Table.Th>Type</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Resident</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Paper>
    </Stack>
  );
}
