"use client";

import { Title, Paper, Table, Group, Button, Badge, Stack, Text, ActionIcon } from "@mantine/core";
import { IconDownload, IconPrinter } from "@tabler/icons-react";

const elements = [
  { id: "INV-001", unit: "101", amount: "$150.00", type: "Monthly Fee", status: "Paid", date: "2024-04-01" },
  { id: "INV-002", unit: "201", amount: "$200.00", type: "Monthly Fee", status: "Pending", date: "2024-04-01" },
  { id: "INV-003", unit: "305", amount: "$45.00", type: "Utility", status: "Overdue", date: "2024-03-15" },
];

export default function BillingPage() {
  const rows = elements.map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td fw={500}>{element.id}</Table.Td>
      <Table.Td>{element.unit}</Table.Td>
      <Table.Td>{element.type}</Table.Td>
      <Table.Td>{element.amount}</Table.Td>
      <Table.Td>{element.date}</Table.Td>
      <Table.Td>
        <Badge color={element.status === "Paid" ? "green" : element.status === "Pending" ? "yellow" : "red"}>
          {element.status}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Group gap="xs">
          <ActionIcon variant="subtle" color="blue"><IconDownload size={16} /></ActionIcon>
          <ActionIcon variant="subtle" color="gray"><IconPrinter size={16} /></ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Stack gap="md">
      <Group justify="space-between">
        <Title order={2}>Billing & Invoices</Title>
        <Button color="blue">Generate Invoices</Button>
      </Group>

      <Paper p="md" radius="md" withBorder>
        <Table verticalSpacing="sm">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Invoice ID</Table.Th>
              <Table.Th>Unit</Table.Th>
              <Table.Th>Type</Table.Th>
              <Table.Th>Amount</Table.Th>
              <Table.Th>Due Date</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Paper>
    </Stack>
  );
}
