"use client";
import { Title, Paper, Table, Group, Button, TextInput, Badge, Stack } from "@mantine/core";
import { IconPlus, IconSearch, IconCar } from "@tabler/icons-react";

const elements = [
  { id: "P-001", unit: "A-101", resident: "John Doe", type: "Resident", status: "Occupied" },
  { id: "P-002", unit: "A-102", resident: "Jane Smith", type: "Resident", status: "Occupied" },
  { id: "P-003", unit: "-", resident: "-", type: "Visitor", status: "Available" },
];

export default function ParkingPage() {
  const rows = elements.map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td>{element.id}</Table.Td>
      <Table.Td>{element.unit}</Table.Td>
      <Table.Td>{element.resident}</Table.Td>
      <Table.Td>{element.type}</Table.Td>
      <Table.Td>
        <Badge color={element.status === "Occupied" ? "blue" : "green"}>{element.status}</Badge>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Stack gap="md">
      <Group justify="space-between">
        <Title order={2}>Parking Management</Title>
        <Button leftSection={<IconPlus size={16} />}>Assign Slot</Button>
      </Group>
      <Paper p="md" radius="md" withBorder>
        <TextInput placeholder="Search slots..." leftSection={<IconSearch size={16} />} mb="md" />
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Slot ID</Table.Th>
              <Table.Th>Unit</Table.Th>
              <Table.Th>Resident</Table.Th>
              <Table.Th>Type</Table.Th>
              <Table.Th>Status</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Paper>
    </Stack>
  );
}
