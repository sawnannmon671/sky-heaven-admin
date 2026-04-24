"use client";

import { Title, Paper, Table, Group, Button, Stack, Text, ActionIcon, ThemeIcon, TextInput } from "@mantine/core";
import { IconSearch, IconPlus, IconEdit, IconTrash, IconCreditCard } from "@tabler/icons-react";

const paymentTypes = [
  { id: 1, name: "Cash", description: "Direct cash payments", status: "Active" },
  { id: 2, name: "Bank Transfer", description: "Direct bank deposits", status: "Active" },
  { id: 3, name: "Credit Card", description: "Online credit card payments", status: "Inactive" },
  { id: 4, name: "Mobile Wallet", description: "AYAPay, WavePay, etc.", status: "Active" },
];

export default function PaymentTypePage() {
  const rows = paymentTypes.map((type) => (
    <Table.Tr key={type.id}>
      <Table.Td>
        <Group gap="sm">
          <ThemeIcon size="sm" variant="light" color="blue">
            <IconCreditCard size={16} />
          </ThemeIcon>
          <Text size="sm" fw={500}>{type.name}</Text>
        </Group>
      </Table.Td>
      <Table.Td>{type.description}</Table.Td>
      <Table.Td>
        <Text size="sm" c={type.status === "Active" ? "green" : "red"} fw={500}>
          {type.status}
        </Text>
      </Table.Td>
      <Table.Td>
        <Group gap={4} justify="flex-end">
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
          <Title order={2}>Payment Types</Title>
          <Text c="dimmed" size="sm">Manage different categories of payment accepted by the system.</Text>
        </Stack>
        <Button color="#014F86" leftSection={<IconPlus size={18} />}>Add Payment Type</Button>
      </Group>

      <Paper p="md" radius="md" withBorder shadow="sm">
        <TextInput
          placeholder="Search payment types..."
          leftSection={<IconSearch size={16} />}
          mb="xl"
          size="md"
        />
        <Table verticalSpacing="sm" highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Name</Table.Th>
              <Table.Th>Description</Table.Th>
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
