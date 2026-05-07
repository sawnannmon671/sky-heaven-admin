"use client";

import { useState } from "react";
import {   Title, Text, Stack, Paper, Group, ThemeIcon, Button, Table, TextInput, ActionIcon, Badge , Pagination , UnstyledButton, Center, Tabs } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import {  IconFileInvoice, IconSearch, IconEye, IconEdit, IconTrash, IconPlus , IconSelector, IconChevronUp, IconChevronDown, IconCalendar } from "@tabler/icons-react";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";

export default function InvoiceGenerationPage() {
  const [sortConfig, setSortConfig] = useState<{ key: string, direction: 'asc' | 'desc' } | null>(null);
  const [activeTab, setActiveTab] = useState<string | null>("All");
  const [activePage, setPage] = useState(1);
  const itemsPerPage = 5;

  const { lang, mounted } = useTranslation();

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  

  const t = {
    en: {
      title: "Invoice Generation",
      subtitle: "Generate and manage monthly invoices for residents.",
      comingSoon: "Invoice generation system is coming soon.",
    },
    mm: {
      title: "ငွေတောင်းခံလွှာထုတ်ခြင်း",
      subtitle: "နေထိုင်သူများအတွက် လစဉ်ငွေတောင်းခံလွှာများကို ထုတ်ပေးခြင်းနှင့် စီမံခန့်ခွဲခြင်း။",
      comingSoon: "ငွေတောင်းခံလွှာထုတ်ခြင်းစနစ်အား မကြာမီ ရရှိနိုင်တော့မည်ဖြစ်သည်။",
    },
  }[lang === "mm" ? "mm" : "en"];

const mockData = [
    { id: "INV-2024-001", unit: "A-101", resident: "U Aung Aung", amount: "$150.00", date: "2024-10-01", dueDate: "2024-10-15", status: "Paid" },
    { id: "INV-2024-002", unit: "B-205", resident: "Daw Su Su", amount: "$120.00", date: "2024-10-01", dueDate: "2024-10-15", status: "Unpaid" },
    { id: "INV-2024-003", unit: "C-304", resident: "U Kyaw Min", amount: "$200.00", date: "2024-10-01", dueDate: "2024-10-15", status: "Paid" },
    { id: "INV-2024-004", unit: "A-502", resident: "Daw Hla Hla", amount: "$150.00", date: "2024-10-01", dueDate: "2024-10-15", status: "Overdue" },
    { id: "INV-2024-005", unit: "D-102", resident: "U Zaw Myo", amount: "$180.00", date: "2024-10-01", dueDate: "2024-10-15", status: "Paid" },
  ];

  const sortedData = [...mockData]
    .filter(item => activeTab === "All" || item.status === activeTab)
    .sort((a, b) => {
      if (!sortConfig) return 0;
      const { key, direction } = sortConfig;
      if (a[key as keyof typeof a] < b[key as keyof typeof b]) return direction === 'asc' ? -1 : 1;
      if (a[key as keyof typeof a] > b[key as keyof typeof b]) return direction === 'asc' ? 1 : -1;
      return 0;
    });

  const getCount = (status: string) => {
    if (status === "All") return mockData.length;
    return mockData.filter(item => item.status === status).length;
  };

  return (
    <Stack gap="xl" p="md">
      <Group justify="space-between">
        <Stack gap={4}>
          <Title order={2} c="#014F86">{t.title}</Title>
          <Text c="dimmed" size="sm">{t.subtitle}</Text>
        </Stack>
      </Group>

      
      <Paper p="md" radius="md" withBorder shadow="sm">
        <Tabs value={activeTab} onChange={(val) => { setActiveTab(val); setPage(1); }} mb="xl" color="#014F86">
          <Tabs.List>
            <Tabs.Tab value="All">
              <Group gap="xs">
                <span>All Invoices</span>
                <Badge size="xs" variant="filled" color={activeTab === "All" ? "#014F86" : "gray"}>{getCount("All")}</Badge>
              </Group>
            </Tabs.Tab>
            <Tabs.Tab value="Paid">
              <Group gap="xs">
                <span>Paid</span>
                <Badge size="xs" variant="filled" color={activeTab === "Paid" ? "#014F86" : "gray"}>{getCount("Paid")}</Badge>
              </Group>
            </Tabs.Tab>
            <Tabs.Tab value="Unpaid">
              <Group gap="xs">
                <span>Unpaid</span>
                <Badge size="xs" variant="filled" color={activeTab === "Unpaid" ? "#014F86" : "gray"}>{getCount("Unpaid")}</Badge>
              </Group>
            </Tabs.Tab>
            <Tabs.Tab value="Overdue">
              <Group gap="xs">
                <span>Overdue</span>
                <Badge size="xs" variant="filled" color={activeTab === "Overdue" ? "#014F86" : "gray"}>{getCount("Overdue")}</Badge>
              </Group>
            </Tabs.Tab>
          </Tabs.List>
        </Tabs>

        <Group justify="space-between" mb="md">
          <Group style={{ flex: 1 }}>
            <TextInput
              placeholder="Search..."
              leftSection={<IconSearch size={16} />}
              size="md"
              radius="md"
              w={250}
            />
            <DatePickerInput
              placeholder="Filter by date"
              leftSection={<IconCalendar size={16} />}
              clearable
              size="md"
              radius="md"
              style={{ width: 200 }}
            />
          </Group>
          <Button leftSection={<IconPlus size={16} />} color="#014F86" radius="md">
            Add New
          </Button>
        </Group>

        <Table verticalSpacing="md" highlightOnHover>
          <Table.Thead bg="#014F86">
            <Table.Tr>
              <Table.Th fw={700} fz="sm" c="white">
                <UnstyledButton onClick={() => handleSort('id')} style={{ width: '100%', color: 'inherit' }}>
                  <Group justify="space-between" wrap="nowrap">
                    <span>Invoice ID</span>
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
                    <span>Unit & Resident</span>
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
                <UnstyledButton onClick={() => handleSort('resident')} style={{ width: '100%', color: 'inherit' }}>
                  <Group justify="space-between" wrap="nowrap">
                    <span>Amount</span>
                    <Center>
                      {sortConfig?.key === 'resident' ? (
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
                    <span>Date / Due Date</span>
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
                    <ThemeIcon size="md" variant="light" color="blue" radius="md">
                      <IconFileInvoice size={18} />
                    </ThemeIcon>
                    <Stack gap={0}>
                      <Text size="sm" fw={500}>{item.unit}</Text>
                      <Text size="xs" c="dimmed">{item.resident}</Text>
                    </Stack>
                  </Group>
                </Table.Td>
                <Table.Td>
                  <Text size="sm" fw={700} c="blue.7">{item.amount}</Text>
                </Table.Td>
                <Table.Td>
                  <Stack gap={0}>
                    <Text size="sm">{item.date}</Text>
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
                    <ActionIcon component={Link} href={`/dashboard/billing/invoice/${item.id}`} variant="subtle" color="gray"><IconEye size={16} /></ActionIcon>
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
