"use client";
import { Title, Paper, Table, Group, Button, TextInput, Badge, Stack } from "@mantine/core";
import { IconPlus, IconSearch, IconCash } from "@tabler/icons-react";

const elements = [
  { id: "PAY-001", resident: "John Doe", amount: "$1,200", method: "Credit Card", date: "2024-04-20", status: "Completed" },
  { id: "PAY-002", resident: "Jane Smith", amount: "$850", method: "Bank Transfer", date: "2024-04-21", status: "Pending" },
];

export default function PaymentsPage() {
  const rows = elements.map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td>{element.id}</Table.Td>
      <Table.Td>{element.resident}</Table.Td>
      <Table.Td>{element.amount}</Table.Td>
      <Table.Td>{element.method}</Table.Td>
      <Table.Td>{element.date}</Table.Td>
      <Table.Td>
        <Badge color={element.status === "Completed" ? "green" : "yellow"}>{element.status}</Badge>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Stack gap="md">
      <Group justify="space-between">
        <Title order={2}>Payments</Title>
        <Button leftSection={<IconPlus size={16} />}>Record Payment</Button>
      </Group>
      <Paper p="md" radius="md" withBorder>
        <TextInput placeholder="Search payments..." leftSection={<IconSearch size={16} />} mb="md" />
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Payment ID</Table.Th>
              <Table.Th>Resident</Table.Th>
              <Table.Th>Amount</Table.Th>
              <Table.Th>Method</Table.Th>
              <Table.Th>Date</Table.Th>
              <Table.Th>Status</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Paper>
    </Stack>
  );
}
