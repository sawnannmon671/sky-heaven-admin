"use client";

import { Title, Paper, Table, Group, Button, Badge, Stack, Text, ActionIcon, ThemeIcon, TextInput } from "@mantine/core";
import { IconDownload, IconPrinter, IconFileInvoice, IconSearch, IconEye } from "@tabler/icons-react";

const elements = [
  { id: "INV-001", unit: "101", amount: "$150.00", type: "Monthly Fee", status: "Paid", date: "2024-04-01" },
  { id: "INV-002", unit: "201", amount: "$200.00", type: "Monthly Fee", status: "Pending", date: "2024-04-01" },
  { id: "INV-003", unit: "305", amount: "$45.00", type: "Utility", status: "Overdue", date: "2024-03-15" },
];

export default function BillingPage() {
  const rows = elements.map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td>
        <Group gap="sm">
          <ThemeIcon size="sm" variant="light" color="blue">
            <IconFileInvoice size={16} />
          </ThemeIcon>
          <Text size="sm" fw={500}>{element.id}</Text>
        </Group>
      </Table.Td>
      <Table.Td>Unit {element.unit}</Table.Td>
      <Table.Td>{element.type}</Table.Td>
      <Table.Td>
        <Text fw={700} size="sm">{element.amount}</Text>
      </Table.Td>
      <Table.Td>
        <Text size="sm" c="dimmed">{element.date}</Text>
      </Table.Td>
      <Table.Td>
        <Badge variant="dot" color={element.status === "Paid" ? "green" : element.status === "Pending" ? "yellow" : "red"}>
          {element.status}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Group gap={4} justify="flex-end">
          <ActionIcon variant="subtle" color="gray"><IconEye size={16} /></ActionIcon>
          <ActionIcon variant="subtle" color="blue"><IconDownload size={16} /></ActionIcon>
          <ActionIcon variant="subtle" color="gray"><IconPrinter size={16} /></ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Stack gap="xl">
      <Group justify="space-between">
        <Stack gap={0}>
          <Title order={2}>Billing & Invoices</Title>
          <Text c="dimmed" size="sm">Manage property fees, utilities, and resident invoicing.</Text>
        </Stack>
        <Button color="#014F86">Generate Invoices</Button>
      </Group>

      <Paper p="md" radius="md" withBorder shadow="sm">
        <TextInput
          placeholder="Search invoices by ID, unit or type..."
          leftSection={<IconSearch size={16} />}
          mb="xl"
          size="md"
        />
        <Table verticalSpacing="sm" highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Invoice ID</Table.Th>
              <Table.Th>Unit</Table.Th>
              <Table.Th>Type</Table.Th>
              <Table.Th>Amount</Table.Th>
              <Table.Th>Due Date</Table.Th>
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
