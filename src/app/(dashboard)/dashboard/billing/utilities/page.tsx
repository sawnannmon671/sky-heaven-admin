"use client";

import { useState } from "react";
import {   Title, Text, Stack, Paper, Group, ThemeIcon, Button, Table, TextInput, ActionIcon, Badge , Pagination , UnstyledButton, Center, Tabs } from "@mantine/core";
import {  IconDroplet, IconChevronLeft, IconSearch, IconEye, IconEdit, IconTrash, IconPlus , IconSelector, IconChevronUp, IconChevronDown } from "@tabler/icons-react";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";

export default function UtilityBillsPage() {
  const [sortConfig, setSortConfig] = useState<{ key: string, direction: 'asc' | 'desc' } | null>(null);

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  

  const [activePage, setPage] = useState(1);
  const [activeTab, setActiveTab] = useState<string | null>("All");
  const itemsPerPage = 5;

  const { lang, mounted } = useTranslation();

  

  const t = {
    en: {
      title: "Utility Bills",
      subtitle: "Manage water, electricity, and other utility billings.",
      back: "Back to Billing",
      comingSoon: "Utility billing management is coming soon.",
    },
    mm: {
      title: "ယူတီလီတီဘေလ်များ",
      subtitle: "ရေ၊ မီးနှင့် အခြားယူတီလီတီဘေလ်များကို စီမံခန့်ခွဲပါ။",
      back: "ဘဏ္ဍာရေးစာမျက်နှာသို့ ပြန်သွားရန်",
      comingSoon: "ယူတီလီတီဘေလ်စီမံခန့်ခွဲမှုအား မကြာမီ ရရှိနိုင်တော့မည်ဖြစ်သည်။",
    },
  }[lang === "mm" ? "mm" : "en"];

const mockData = [
    { id: "UTL-001", type: "Water", unit: "A-101", amount: "$25.00", month: "Sep 2024", dueDate: "2024-10-15", status: "Paid" },
    { id: "UTL-002", type: "Electricity", unit: "B-205", amount: "$85.00", month: "Sep 2024", dueDate: "2024-10-15", status: "Unpaid" },
    { id: "UTL-003", type: "Water", unit: "C-304", amount: "$30.00", month: "Sep 2024", dueDate: "2024-10-15", status: "Paid" },
    { id: "UTL-004", type: "Internet", unit: "A-502", amount: "$40.00", month: "Sep 2024", dueDate: "2024-10-15", status: "Overdue" },
    { id: "UTL-005", type: "Electricity", unit: "D-102", amount: "$90.00", month: "Sep 2024", dueDate: "2024-10-15", status: "Paid" },
  ];

  const utilityTypes = ["All", ...Array.from(new Set(mockData.map(item => item.type)))];

  const filteredData = mockData.filter(item => activeTab === "All" || item.type === activeTab);

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortConfig) return 0;
    const { key, direction } = sortConfig;
    if (a[key as keyof typeof a] < b[key as keyof typeof b]) return direction === 'asc' ? -1 : 1;
    if (a[key as keyof typeof a] > b[key as keyof typeof b]) return direction === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <Stack gap="xl" p="md">
      <Group justify="space-between">
        <Stack gap={4}>
          <Group gap="xs">
            <ThemeIcon variant="light" color="cyan" size="lg" radius="md">
              <IconDroplet size={20} />
            </ThemeIcon>
            <Title order={1} c="#014F86">{t.title}</Title>
          </Group>
          <Text c="dimmed" size="md">{t.subtitle}</Text>
        </Stack>
        <Button 
          component={Link} 
          href="/dashboard/billing" 
          variant="subtle" 
          leftSection={<IconChevronLeft size={16} />}
          color="gray"
        >
          {t.back}
        </Button>
      </Group>

      
      <Paper p="md" radius="md" withBorder shadow="sm">
        <Tabs value={activeTab} onChange={(val) => { setActiveTab(val); setPage(1); }} mb="md" color="#014F86">
          <Tabs.List>
            {utilityTypes.map(type => {
              const count = type === "All" ? mockData.length : mockData.filter(i => i.type === type).length;
              return (
                <Tabs.Tab key={type} value={type}>
                  <Group gap="xs">
                    <span>{type}</span>
                    <Badge size="xs" variant="filled" color={activeTab === type ? "#014F86" : "gray"}>{count}</Badge>
                  </Group>
                </Tabs.Tab>
              );
            })}
          </Tabs.List>
        </Tabs>

        <Group justify="space-between" mb="md">
          <TextInput
            placeholder="Search..."
            leftSection={<IconSearch size={16} />}
            size="md"
            radius="md"
            w={250}
          />
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
                    <span>Utility ID</span>
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
                <UnstyledButton onClick={() => handleSort('type')} style={{ width: '100%', color: 'inherit' }}>
                  <Group justify="space-between" wrap="nowrap">
                    <span>Type / Unit</span>
                    <Center>
                      {sortConfig?.key === 'type' ? (
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
                    <span>Amount</span>
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
                    <span>Month / Due Date</span>
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
                    <ThemeIcon size="md" variant="light" color="cyan" radius="md">
                      <IconDroplet size={18} />
                    </ThemeIcon>
                    <Stack gap={0}>
                      <Text size="sm" fw={500}>{item.type}</Text>
                      <Text size="xs" c="dimmed">Unit: {item.unit}</Text>
                    </Stack>
                  </Group>
                </Table.Td>
                <Table.Td>
                  <Text size="sm" fw={700} c="cyan.7">{item.amount}</Text>
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
                    <ActionIcon component={Link} href={`/dashboard/billing/utilities/${item.id}`} variant="subtle" color="gray"><IconEye size={16} /></ActionIcon>
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
            Showing {Math.min((activePage - 1) * itemsPerPage + 1, sortedData.length)} to {Math.min(activePage * itemsPerPage, sortedData.length)} of {sortedData.length} entries
          </Text>
          <Pagination total={Math.ceil(sortedData.length / itemsPerPage)} value={activePage} onChange={setPage} color="#014F86" />
        </Group>
      
      </Paper>
    </Stack>
  );
}
