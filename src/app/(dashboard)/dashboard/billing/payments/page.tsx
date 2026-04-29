"use client";

import { useState } from "react";
import {   Title, Text, Stack, Paper, Group, ThemeIcon, Button, Table, TextInput, ActionIcon, Badge , Pagination , UnstyledButton, Center, Tabs } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import {  IconHistory, IconChevronLeft, IconSearch, IconEye, IconEdit, IconTrash, IconPlus , IconSelector, IconChevronUp, IconChevronDown, IconCalendar } from "@tabler/icons-react";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";

export default function PaymentRecordsPage() {
  const [sortConfig, setSortConfig] = useState<{ key: string, direction: 'asc' | 'desc' } | null>(null);
  const [activeTab, setActiveTab] = useState<string | null>("All");
  const [activePage, setPage] = useState(1);
  const itemsPerPage = 5;

  const { lang } = useTranslation();

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const t = {
    en: {
      title: "Payment Records",
      subtitle: "View and manage all resident payment history.",
      back: "Back to Billing",
      comingSoon: "Payment records management is coming soon.",
      status: {
        Completed: "Completed",
        Processing: "Processing",
        Failed: "Failed"
      }
    },
    mm: {
      title: "ငွေပေးချေမှုမှတ်တမ်းများ",
      subtitle: "နေထိုင်သူများ၏ ငွေပေးချေမှုမှတ်တမ်းအားလုံးကို ကြည့်ရှုခြင်းနှင့် စီမံခန့်ခွဲခြင်း။",
      back: "ဘဏ္ဍာရေးစာမျက်နှာသို့ ပြန်သွားရန်",
      comingSoon: "ငွေပေးချေမှုမှတ်တမ်းစီမံခန့်ခွဲမှုအား မကြာမီ ရရှိနိုင်တော့မည်ဖြစ်သည်။",
      status: {
        Completed: "ပေးချေပြီး",
        Processing: "လုပ်ဆောင်ဆဲ",
        Failed: "မအောင်မြင်ပါ"
      }
    },
  }[lang === "mm" ? "mm" : "en"];

  const mockData = [
    { id: "PAY-001", invoiceId: "INV-2024-001", resident: "U Aung Aung", amount: "$150.00", method: "Bank Transfer", date: "2024-10-05", status: "Completed" },
    { id: "PAY-002", invoiceId: "INV-2024-003", resident: "U Kyaw Min", amount: "$200.00", method: "Cash", date: "2024-10-10", status: "Completed" },
    { id: "PAY-003", invoiceId: "INV-2024-005", resident: "U Zaw Myo", amount: "$180.00", method: "Credit Card", date: "2024-10-12", status: "Completed" },
    { id: "PAY-004", invoiceId: "INV-2024-002", resident: "Daw Su Su", amount: "$120.00", method: "Mobile Wallet", date: "2024-10-15", status: "Processing" },
    { id: "PAY-005", invoiceId: "INV-2024-004", resident: "Daw Hla Hla", amount: "$150.00", method: "Bank Transfer", date: "2024-10-16", status: "Failed" },
  ];

  const filteredData = mockData.filter(item => activeTab === "All" || item.status === activeTab);

  const sortedData = [...filteredData].sort((a, b) => {
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
          <Group gap="xs">
            <ThemeIcon variant="light" color="green" size="lg" radius="md">
              <IconHistory size={20} />
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
        <Tabs value={activeTab} onChange={(val) => { setActiveTab(val); setPage(1); }} mb="xl" color="#014F86">
          <Tabs.List>
            <Tabs.Tab value="All">
              <Group gap="xs">
                <span>All Payments</span>
                <Badge size="xs" variant="filled" color={activeTab === "All" ? "#014F86" : "gray"}>{getCount("All")}</Badge>
              </Group>
            </Tabs.Tab>
            <Tabs.Tab value="Completed">
              <Group gap="xs">
                <span>{t.status.Completed}</span>
                <Badge size="xs" variant="filled" color={activeTab === "Completed" ? "#014F86" : "gray"}>{getCount("Completed")}</Badge>
              </Group>
            </Tabs.Tab>
            <Tabs.Tab value="Processing">
              <Group gap="xs">
                <span>{t.status.Processing}</span>
                <Badge size="xs" variant="filled" color={activeTab === "Processing" ? "#014F86" : "gray"}>{getCount("Processing")}</Badge>
              </Group>
            </Tabs.Tab>
            <Tabs.Tab value="Failed">
              <Group gap="xs">
                <span>{t.status.Failed}</span>
                <Badge size="xs" variant="filled" color={activeTab === "Failed" ? "#014F86" : "gray"}>{getCount("Failed")}</Badge>
              </Group>
            </Tabs.Tab>
          </Tabs.List>
        </Tabs>

        <Group justify="space-between" mb="md">
          <Group style={{ flex: 1 }}>
            <TextInput
              placeholder="Search..." w={250}
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
                    <span>Payment ID</span>
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
                <UnstyledButton onClick={() => handleSort('invoiceId')} style={{ width: '100%', color: 'inherit' }}>
                  <Group justify="space-between" wrap="nowrap">
                    <span>Invoice & Resident</span>
                    <Center>
                      {sortConfig?.key === 'invoiceId' ? (
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
                    <span>Method / Date</span>
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
                    <ThemeIcon size="md" variant="light" color="green" radius="md">
                      <IconHistory size={18} />
                    </ThemeIcon>
                    <Stack gap={0}>
                      <Text size="sm" fw={500}>{item.invoiceId}</Text>
                      <Text size="xs" c="dimmed">{item.resident}</Text>
                    </Stack>
                  </Group>
                </Table.Td>
                <Table.Td>
                  <Text size="sm" fw={700} c="green.7">{item.amount}</Text>
                </Table.Td>
                <Table.Td>
                  <Stack gap={0}>
                    <Text size="sm">{item.method}</Text>
                    <Text size="xs" c="dimmed">{item.date}</Text>
                  </Stack>
                </Table.Td>
                <Table.Td>
                  <Badge variant="light" color={item.status === 'Completed' ? 'green' : item.status === 'Processing' ? 'blue' : 'red'} fw={700}>
                    {item.status}
                  </Badge>
                </Table.Td>
                <Table.Td>
                  <Group gap={4} justify="flex-end">
                    <ActionIcon component={Link} href={`/dashboard/billing/payments/${item.id}`} variant="subtle" color="gray"><IconEye size={16} /></ActionIcon>
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
            Showing {((activePage - 1) * itemsPerPage) + 1} to {Math.min(activePage * itemsPerPage, filteredData.length)} of {filteredData.length} entries
          </Text>
          <Pagination total={Math.ceil(filteredData.length / itemsPerPage)} value={activePage} onChange={setPage} color="#014F86" />
        </Group>
      
      </Paper>
    </Stack>
  );
}
