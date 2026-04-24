"use client";
import { Title, Paper, Table, Group, Button, TextInput, Badge, Stack, ActionIcon, Text, ThemeIcon } from "@mantine/core";
import { IconPlus, IconSearch, IconEye, IconReceipt, IconCreditCard, IconBuildingBank, IconCash } from "@tabler/icons-react";

const elements = [
  { id: "PAY-001", resident: "John Doe", amount: "$1,200.00", method: "Credit Card", date: "2024-04-20", status: "Completed" },
  { id: "PAY-002", resident: "Jane Smith", amount: "$850.00", method: "Bank Transfer", date: "2024-04-21", status: "Pending" },
  { id: "PAY-003", resident: "Robert Wilson", amount: "$150.00", method: "Cash", date: "2024-04-22", status: "Completed" },
];

const getMethodIcon = (method: string) => {
  switch (method) {
    case "Credit Card": return <IconCreditCard size={14} />;
    case "Bank Transfer": return <IconBuildingBank size={14} />;
    case "Cash": return <IconCash size={14} />;
    default: return <IconReceipt size={14} />;
  }
};

export default function PaymentsPage() {
  const rows = elements.map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td>
        <Group gap="sm">
          <ThemeIcon size="sm" variant="light" color="green">
            <IconReceipt size={16} />
          </ThemeIcon>
          <Text size="sm" fw={500}>{element.id}</Text>
        </Group>
      </Table.Td>
      <Table.Td>{element.resident}</Table.Td>
      <Table.Td>
        <Text fw={700} size="sm" color="green.7">{element.amount}</Text>
      </Table.Td>
      <Table.Td>
        <Group gap={4}>
          {getMethodIcon(element.method)}
          <Text size="sm">{element.method}</Text>
        </Group>
      </Table.Td>
      <Table.Td>
        <Text size="sm" c="dimmed">{element.date}</Text>
      </Table.Td>
      <Table.Td>
        <Badge variant="dot" color={element.status === "Completed" ? "green" : "yellow"}>{element.status}</Badge>
      </Table.Td>
      <Table.Td>
        <Group gap={4} justify="flex-end">
          <ActionIcon variant="subtle" color="gray">
            <IconEye size={16} />
          </ActionIcon>
          <ActionIcon variant="subtle" color="blue">
            <IconReceipt size={16} />
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Stack gap="xl">
      <Group justify="space-between">
        <Stack gap={0}>
          <Title order={2}>Payment Transactions</Title>
          <Text c="dimmed" size="sm">View and track all incoming payments and transaction history.</Text>
        </Stack>
        <Button leftSection={<IconPlus size={16} />} color="#014F86">Record Payment</Button>
      </Group>

      <Paper p="md" radius="md" withBorder shadow="sm">
        <TextInput
          placeholder="Search payments by ID, resident or method..."
          leftSection={<IconSearch size={16} />}
          mb="xl"
          size="md"
        />
        <Table verticalSpacing="sm" highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Payment ID</Table.Th>
              <Table.Th>Resident</Table.Th>
              <Table.Th>Amount</Table.Th>
              <Table.Th>Method</Table.Th>
              <Table.Th>Date</Table.Th>
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
