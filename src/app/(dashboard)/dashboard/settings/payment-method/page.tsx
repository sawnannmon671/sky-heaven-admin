"use client";

import { Title, Paper, Table, Group, Button, Stack, Text, ActionIcon, ThemeIcon, TextInput } from "@mantine/core";
import { IconSearch, IconPlus, IconEdit, IconTrash, IconWallet } from "@tabler/icons-react";

const paymentMethods = [
  { id: 1, name: "AYA Bank", type: "Bank Transfer", account: "123-456-789", status: "Active" },
  { id: 3, name: "AYAPay", type: "Mobile Wallet", account: "09123456789", status: "Active" },
  { id: 4, name: "WavePay", type: "Mobile Wallet", account: "09987654321", status: "Active" },
];

export default function PaymentMethodPage() {
  const rows = paymentMethods.map((method) => (
    <Table.Tr key={method.id}>
      <Table.Td>
        <Group gap="sm">
          <ThemeIcon size="sm" variant="light" color="cyan">
            <IconWallet size={16} />
          </ThemeIcon>
          <Text size="sm" fw={500}>{method.name}</Text>
        </Group>
      </Table.Td>
      <Table.Td>{method.type}</Table.Td>
      <Table.Td>{method.account}</Table.Td>
      <Table.Td>
        <Text size="sm" c={method.status === "Active" ? "green" : "red"} fw={500}>
          {method.status}
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
          <Title order={2}>Payment Methods</Title>
          <Text c="dimmed" size="sm">Manage specific payment accounts and methods for receiving payments.</Text>
        </Stack>
        <Button color="#014F86" leftSection={<IconPlus size={18} />}>Add Payment Method</Button>
      </Group>

      <Paper p="md" radius="md" withBorder shadow="sm">
        <TextInput
          placeholder="Search payment methods..."
          leftSection={<IconSearch size={16} />}
          mb="xl"
          size="md"
        />
        <Table verticalSpacing="sm" highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Name</Table.Th>
              <Table.Th>Type</Table.Th>
              <Table.Th>Account Info</Table.Th>
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
