"use client";

import { useState } from "react";
import {   Title, Paper, Table, Group, Button, Badge, Stack, Text, ActionIcon, ThemeIcon, TextInput , Pagination , UnstyledButton, Center } from "@mantine/core";
import {  IconDownload, IconPrinter, IconFileInvoice, IconSearch, IconEye , IconSelector, IconChevronUp, IconChevronDown } from "@tabler/icons-react";
import { useTranslation } from "@/hooks/useTranslation";

const elements = [
  { id: "INV-001", unit: "101", amount: "$150.00", type: "Monthly Fee", status: "Paid", date: "2024-04-01" },
  { id: "INV-002", unit: "201", amount: "$200.00", type: "Monthly Fee", status: "Pending", date: "2024-04-01" },
  { id: "INV-003", unit: "305", amount: "$45.00", type: "Utility", status: "Overdue", date: "2024-03-15" },
];

const translations = {
  en: {
    title: "Billing & Invoices",
    subtitle: "Manage property fees, utilities, and resident invoicing.",
    generateBtn: "Generate Invoices",
    searchPlaceholder: "Search invoices by ID, unit or type...",
    thInvoiceId: "Invoice ID",
    thUnit: "Unit",
    thType: "Type",
    thAmount: "Amount",
    thDueDate: "Due Date",
    thStatus: "Status",
    thActions: "Actions",
    unit: "Unit",
    status: {
      Paid: "Paid",
      Pending: "Pending",
      Overdue: "Overdue"
    },
    types: {
      "Monthly Fee": "Monthly Fee",
      "Utility": "Utility"
    }
  },
  mm: {
    title: "ငွေတောင်းခံလွှာများနှင့် အင်ဗွိုင်းများ",
    subtitle: "အိမ်ခြံမြေခငွေများ၊ အသုံးအဆောင်စရိတ်များနှင့် နေထိုင်သူများ၏ ငွေတောင်းခံလွှာများကို စီမံခန့်ခွဲပါ။",
    generateBtn: "အင်ဗွိုင်းများထုတ်ရန်",
    searchPlaceholder: "ID၊ ယူနစ် သို့မဟုတ် အမျိုးအစားဖြင့် ရှာဖွေရန်...",
    thInvoiceId: "အင်ဗွိုင်းနံပါတ်",
    thUnit: "ယူနစ်",
    thType: "အမျိုးအစား",
    thAmount: "ပမာဏ",
    thDueDate: "ပေးချေရမည့်ရက်",
    thStatus: "အခြေအနေ",
    thActions: "လုပ်ဆောင်ချက်များ",
    unit: "ယူနစ်",
    status: {
      Paid: "ပေးချေပြီး",
      Pending: "စောင့်ဆိုင်းဆဲ",
      Overdue: "ရက်လွန်"
    },
    types: {
      "Monthly Fee": "လစဉ်ကြေး",
      "Utility": "အသုံးအဆောင်စရိတ်"
    }
  }
};

export default function BillingPage() {
  const [sortConfig, setSortConfig] = useState<{ key: string, direction: 'asc' | 'desc' } | null>(null);

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = [...elements].sort((a, b) => {
    if (!sortConfig) return 0;
    const { key, direction } = sortConfig;
    if (a[key as keyof typeof a] < b[key as keyof typeof b]) return direction === 'asc' ? -1 : 1;
    if (a[key as keyof typeof a] > b[key as keyof typeof b]) return direction === 'asc' ? 1 : -1;
    return 0;
  });

  const [activePage, setPage] = useState(1);
  const itemsPerPage = 5;

  const { lang, mounted } = useTranslation();
  const t = translations[lang];

  

  const rows = sortedData.map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td>
        <Group gap="sm">
          <ThemeIcon size="sm" variant="light" color="blue">
            <IconFileInvoice size={16} />
          </ThemeIcon>
          <Text size="sm" fw={500}>{element.id}</Text>
        </Group>
      </Table.Td>
      <Table.Td>{t.unit} {element.unit}</Table.Td>
      <Table.Td>{t.types[element.type as keyof typeof t.types] || element.type}</Table.Td>
      <Table.Td>
        <Text fw={700} size="sm">{element.amount}</Text>
      </Table.Td>
      <Table.Td>
        <Text size="sm" c="dimmed">{element.date}</Text>
      </Table.Td>
      <Table.Td>
        <Badge variant="dot" color={element.status === "Paid" ? "green" : element.status === "Pending" ? "yellow" : "red"}>
          {t.status[element.status as keyof typeof t.status] || element.status}
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
          <Title order={2}>{t.title}</Title>
          <Text c="dimmed" size="sm">{t.subtitle}</Text>
        </Stack>
        <Button color="#014F86">{t.generateBtn}</Button>
      </Group>

      <Paper p="md" radius="md" withBorder shadow="sm">
        <TextInput
          placeholder={t.searchPlaceholder}
          leftSection={<IconSearch size={16} />}
          mb="xl"
          size="md"
        />
        <Table verticalSpacing="sm" highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>
                <UnstyledButton onClick={() => handleSort('id')} style={{ width: '100%', color: 'inherit' }}>
                  <Group justify="space-between" wrap="nowrap">
                    <span>{t.thInvoiceId}</span>
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
              <Table.Th>
                <UnstyledButton onClick={() => handleSort('unit')} style={{ width: '100%', color: 'inherit' }}>
                  <Group justify="space-between" wrap="nowrap">
                    <span>{t.thUnit}</span>
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
              <Table.Th>
                <UnstyledButton onClick={() => handleSort('amount')} style={{ width: '100%', color: 'inherit' }}>
                  <Group justify="space-between" wrap="nowrap">
                    <span>{t.thType}</span>
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
              <Table.Th>
                <UnstyledButton onClick={() => handleSort('type')} style={{ width: '100%', color: 'inherit' }}>
                  <Group justify="space-between" wrap="nowrap">
                    <span>{t.thAmount}</span>
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
              <Table.Th>{t.thDueDate}</Table.Th>
              <Table.Th>{t.thStatus}</Table.Th>
              <Table.Th ta="right">{t.thActions}</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows.slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage)}</Table.Tbody>
        </Table>
        <Group justify="space-between" mt="md">
          <Text size="sm" c="dimmed">
            Showing {((activePage - 1) * itemsPerPage) + 1} to {Math.min(activePage * itemsPerPage, rows.length)} of {rows.length} entries
          </Text>
          <Pagination total={Math.ceil(rows.length / itemsPerPage)} value={activePage} onChange={setPage} color="#014F86" />
        </Group>
      
      </Paper>
    </Stack>
  );
}
