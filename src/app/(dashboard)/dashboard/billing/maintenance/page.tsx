"use client";

import { useState } from "react";
import {   Title, Text, Stack, Paper, Group, ThemeIcon, Button, Table, TextInput, ActionIcon, Badge , Pagination , UnstyledButton, Center, Box, SimpleGrid, Select } from "@mantine/core";
import {  IconTools, IconEye, IconEdit, IconTrash, IconPlus , IconSelector, IconChevronUp, IconChevronDown } from "@tabler/icons-react";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";

export default function MaintenanceFeesPage() {
  const [sortConfig, setSortConfig] = useState<{ key: string, direction: 'asc' | 'desc' } | null>(null);
  const [unitFilter, setUnitFilter] = useState<string | null>(null);
  const [monthFilter, setMonthFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const [activePage, setPage] = useState(1);
  const itemsPerPage = 5;

  const { lang, mounted } = useTranslation();

  const mockData = [
    { id: "MF-2024-001", unit: "A-101", amount: "$50.00", month: "October 2024", dueDate: "2024-10-05", status: "Paid" },
    { id: "MF-2024-002", unit: "B-205", amount: "$60.00", month: "October 2024", dueDate: "2024-10-05", status: "Unpaid" },
    { id: "MF-2024-003", unit: "C-304", amount: "$55.00", month: "October 2024", dueDate: "2024-10-05", status: "Paid" },
    { id: "MF-2024-004", unit: "A-502", amount: "$50.00", month: "October 2024", dueDate: "2024-10-05", status: "Overdue" },
    { id: "MF-2024-005", unit: "D-102", amount: "$70.00", month: "October 2024", dueDate: "2024-10-05", status: "Paid" },
  ];

  const unitNumbers = Array.from(new Set(mockData.map(e => e.unit)));
  const months = Array.from(new Set(mockData.map(e => e.month)));

  const filteredData = mockData.filter(item => {
    const matchesUnit = !unitFilter || item.unit === unitFilter;
    const matchesMonth = !monthFilter || item.month === monthFilter;
    const matchesStatus = !statusFilter || item.status === statusFilter;
    return matchesUnit && matchesMonth && matchesStatus;
  });

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortConfig) return 0;
    const { key, direction } = sortConfig;
    const aValue = a[key as keyof typeof a];
    const bValue = b[key as keyof typeof b];
    if (aValue < bValue) return direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return direction === 'asc' ? 1 : -1;
    return 0;
  });

  const t = {
    en: {
      title: "Monthly Maintenance Fees",
      subtitle: "Track and manage monthly maintenance fee payments.",
      comingSoon: "Maintenance fee management is coming soon.",
    },
    mm: {
      title: "လစဉ်ထိန်းသိမ်းခများ",
      subtitle: "လစဉ်ထိန်းသိမ်းခပေးချေမှုများကို ခြေရာခံခြင်းနှင့် စီမံခန့်ခွဲခြင်း။",
      comingSoon: "လစဉ်ထိန်းသိမ်းခစီမံခန့်ခွဲမှုအား မကြာမီ ရရှိနိုင်တော့မည်ဖြစ်သည်။",
    },
  }[lang === "mm" ? "mm" : "en"];

  return (
    <Stack gap="xl" p="md">
      <Group justify="space-between">
        <Stack gap={4}>
          <Title order={2} c="#014F86">{t.title}</Title>
          <Text c="dimmed" size="sm">{t.subtitle}</Text>
        </Stack>
        <Button leftSection={<IconPlus size={16} />} color="#014F86" radius="md">
          Add New
        </Button>
      </Group>

      
      <Paper p="md" radius="md" withBorder shadow="sm">
        <Box mb="xl" p="md" style={{ backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="md">
            <Select
              label={<Text fw={700} size="xs" mb={5}>Unit</Text>}
              placeholder="Select Unit"
              data={unitNumbers}
              size="sm"
              radius="md"
              clearable
              searchable
              value={unitFilter}
              onChange={setUnitFilter}
              styles={{ input: { backgroundColor: '#fff' } }}
            />
            <Select
              label={<Text fw={700} size="xs" mb={5}>Month</Text>}
              placeholder="Select Month"
              data={months}
              size="sm"
              radius="md"
              clearable
              searchable
              value={monthFilter}
              onChange={setMonthFilter}
              styles={{ input: { backgroundColor: '#fff' } }}
            />
            <Select
              label={<Text fw={700} size="xs" mb={5}>Status</Text>}
              placeholder="Select Status"
              data={["Paid", "Unpaid", "Overdue"]}
              size="sm"
              radius="md"
              clearable
              value={statusFilter}
              onChange={setStatusFilter}
              styles={{ input: { backgroundColor: '#fff' } }}
            />
          </SimpleGrid>
        </Box>

        <Table verticalSpacing="md" highlightOnHover>
          <Table.Thead bg="#014F86">
            <Table.Tr>
              <Table.Th fw={700} fz="sm" c="white">
                <UnstyledButton onClick={() => handleSort('id')} style={{ width: '100%', color: 'inherit' }}>
                  <Group justify="space-between" wrap="nowrap">
                    <span>Fee ID</span>
                    <Center>
                      {sortConfig?.key === 'id' ? (
                        sortConfig.direction === 'asc' ? <IconChevronUp size={14} /> : <IconChevronDown size={14} />
                      ) : (
                        <IconSelector size={14} color="gray" />
                      )}
                    </Center>
                  </Group>
                </UnstyledButton>
              </Table.Th>
              <Table.Th fw={700} fz="sm" c="white">
                <UnstyledButton onClick={() => handleSort('unit')} style={{ width: '100%', color: 'inherit' }}>
                  <Group justify="space-between" wrap="nowrap">
                    <span>Unit</span>
                    <Center>
                      {sortConfig?.key === 'unit' ? (
                        sortConfig.direction === 'asc' ? <IconChevronUp size={14} /> : <IconChevronDown size={14} />
                      ) : (
                        <IconSelector size={14} color="gray" />
                      )}
                    </Center>
                  </Group>
                </UnstyledButton>
              </Table.Th>
              <Table.Th fw={700} fz="sm" c="white">
                <UnstyledButton onClick={() => handleSort('amount')} style={{ width: '100%', color: 'inherit' }}>
                  <Group justify="space-between" wrap="nowrap">
                    <span>Amount</span>
                    <Center>
                      {sortConfig?.key === 'amount' ? (
                        sortConfig.direction === 'asc' ? <IconChevronUp size={14} /> : <IconChevronDown size={14} />
                      ) : (
                        <IconSelector size={14} color="gray" />
                      )}
                    </Center>
                  </Group>
                </UnstyledButton>
              </Table.Th>
              <Table.Th fw={700} fz="sm" c="white">
                <UnstyledButton onClick={() => handleSort('month')} style={{ width: '100%', color: 'inherit' }}>
                  <Group justify="space-between" wrap="nowrap">
                    <span>Month / Due Date</span>
                    <Center>
                      {sortConfig?.key === 'month' ? (
                        sortConfig.direction === 'asc' ? <IconChevronUp size={14} /> : <IconChevronDown size={14} />
                      ) : (
                        <IconSelector size={14} color="gray" />
                      )}
                    </Center>
                  </Group>
                </UnstyledButton>
              </Table.Th>
              <Table.Th fw={700} fz="sm" c="white">Status</Table.Th>
              <Table.Th fw={700} fz="sm" c="white" ta="right">Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {sortedData.slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage).map((item) => (
              <Table.Tr key={item.id}>
                <Table.Td>
                  <Text size="sm" fw={700}>{item.id}</Text>
                </Table.Td>
                <Table.Td>
                  <Group gap="sm">
                    <ThemeIcon size="md" variant="light" color="teal" radius="md">
                      <IconTools size={18} />
                    </ThemeIcon>
                    <Text size="sm" fw={500}>{item.unit}</Text>
                  </Group>
                </Table.Td>
                <Table.Td>
                  <Text size="sm" fw={700} c="teal.7">{item.amount}</Text>
                </Table.Td>
                <Table.Td>
                  <Stack gap={0}>
                    <Text size="sm">{item.month}</Text>
                    <Text size="xs" c="dimmed">Due: {item.dueDate}</Text>
                  </Stack>
                </Table.Td>
                <Table.Td>
                  <Badge variant="light" color={item.status === 'Paid' ? 'green' : item.status === 'Overdue' ? 'red' : 'orange'} fw={700}>
                    {item.status}
                  </Badge>
                </Table.Td>
                <Table.Td>
                  <Group gap={4} justify="flex-end">
                    <ActionIcon component={Link} href={`/dashboard/billing/maintenance/${item.id}`} variant="subtle" color="gray"><IconEye size={16} /></ActionIcon>
                    <ActionIcon variant="subtle" color="blue"><IconEdit size={16} /></ActionIcon>
                    <ActionIcon variant="subtle" color="red"><IconTrash size={16} /></ActionIcon>
                  </Group>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
        <Group justify="space-between" mt="md">
          <Text size="sm" c="dimmed">
            Showing {((activePage - 1) * itemsPerPage) + 1} to {Math.min(activePage * itemsPerPage, mockData.length)} of {mockData.length} entries
          </Text>
          <Pagination total={Math.ceil(mockData.length / itemsPerPage)} value={activePage} onChange={setPage} color="#014F86" />
        </Group>
      
      </Paper>
    </Stack>
  );
}
