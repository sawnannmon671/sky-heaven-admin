"use client";
import { Title, Paper, Table, Group, Button, TextInput, Badge, Stack, ActionIcon, Text, ThemeIcon } from "@mantine/core";
import { IconPlus, IconSearch, IconEye, IconEdit, IconTrash, IconCar } from "@tabler/icons-react";

const elements = [
  { id: "P-001", unit: "A-101", resident: "John Doe", type: "Resident", status: "Occupied", color: "blue" },
  { id: "P-002", unit: "A-102", resident: "Jane Smith", type: "Resident", status: "Occupied", color: "blue" },
  { id: "P-003", unit: "-", resident: "-", type: "Visitor", status: "Available", color: "green" },
];

export default function ParkingPage() {
  const rows = elements.map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td>
        <Group gap="sm">
          <ThemeIcon size="sm" variant="light" color={element.color}>
            <IconCar size={16} />
          </ThemeIcon>
          <Text size="sm" fw={500}>{element.id}</Text>
        </Group>
      </Table.Td>
      <Table.Td>{element.unit}</Table.Td>
      <Table.Td>
        <Text size="sm" c={element.resident === "-" ? "dimmed" : "inherit"}>
          {element.resident}
        </Text>
      </Table.Td>
      <Table.Td>
        <Badge variant="light" color={element.type === "Resident" ? "blue" : "teal"}>{element.type}</Badge>
      </Table.Td>
      <Table.Td>
        <Badge variant="dot" color={element.status === "Occupied" ? "blue" : "green"}>{element.status}</Badge>
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
          <Title order={2}>Parking Management</Title>
          <Text c="dimmed" size="sm">Manage and assign parking slots for residents and visitors.</Text>
        </Stack>
        <Button leftSection={<IconPlus size={16} />} color="#014F86">Assign Slot</Button>
      </Group>

      <Paper p="md" radius="md" withBorder shadow="sm">
        <TextInput
          placeholder="Search slots by ID, unit or resident..."
          leftSection={<IconSearch size={16} />}
          mb="xl"
          size="md"
        />
        <Table verticalSpacing="sm" highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Slot ID</Table.Th>
              <Table.Th>Unit</Table.Th>
              <Table.Th>Resident</Table.Th>
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
