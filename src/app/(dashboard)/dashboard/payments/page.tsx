"use client";

import { useState } from "react";
import {   Title, Paper, Table, Group, Button, TextInput, Badge, Stack, ActionIcon, Text, ThemeIcon , Pagination , UnstyledButton, Center } from "@mantine/core";
import {  IconPlus, IconSearch, IconEye, IconReceipt, IconCreditCard, IconBuildingBank, IconCash , IconSelector, IconChevronUp, IconChevronDown } from "@tabler/icons-react";
import { useTranslation } from "@/hooks/useTranslation";

const elements = [
  { id: "PAY-001", resident: "John Doe", amount: "$1,200.00", method: "Credit Card", date: "2024-04-20", status: "Completed" },
  { id: "PAY-002", resident: "Jane Smith", amount: "$850.00", method: "Bank Transfer", date: "2024-04-21", status: "Pending" },
  { id: "PAY-003", resident: "Robert Wilson", amount: "$150.00", method: "Cash", date: "2024-04-22", status: "Completed" },
];

const translations = {
  en: {
    title: "Payment Transactions",
    subtitle: "View and track all incoming payments and transaction history.",
    addBtn: "Record Payment",
    searchPlaceholder: "Search payments by ID, resident or method...",
    table: {
      paymentId: "Payment ID",
      resident: "Resident",
      amount: "Amount",
      method: "Method",
      date: "Date",
      status: "Status",
      actions: "Actions",
    },
    methods: {
      "Credit Card": "Credit Card",
      "Bank Transfer": "Bank Transfer",
      Cash: "Cash",
    },
    statuses: {
      Completed: "Completed",
      Pending: "Pending",
    },
  },
  mm: {
    title: "ငွေပေးချေမှုမှတ်တမ်းများ",
    subtitle: "ဝင်လာသော ငွေပေးချေမှုအားလုံးနှင့် မှတ်တမ်းရာဇဝင်ကို ကြည့်ရှုခြေရာခံပါ။",
    addBtn: "ငွေပေးချေမှုမှတ်တမ်းတင်ရန်",
    searchPlaceholder: "နံပါတ်၊ နေထိုင်သူ သို့မဟုတ် နည်းလမ်းဖြင့် ရှာဖွေရန်...",
    table: {
      paymentId: "ငွေပေးချေမှုနံပါတ်",
      resident: "နေထိုင်သူ",
      amount: "ပမာဏ",
      method: "နည်းလမ်း",
      date: "ရက်စွဲ",
      status: "အခြေအနေ",
      actions: "လုပ်ဆောင်ချက်များ",
    },
    methods: {
      "Credit Card": "ကတ်ဖြင့်ပေးချေမှု",
      "Bank Transfer": "ဘဏ်မှတစ်ဆင့်လွှဲပြောင်းမှု",
      Cash: "လက်ငင်းငွေသား",
    },
    statuses: {
      Completed: "ပြီးစီး",
      Pending: "စောင့်ဆိုင်းဆဲ",
    },
  },
};

const getMethodIcon = (method: string) => {
  switch (method) {
    case "Credit Card": return <IconCreditCard size={14} />;
    case "Bank Transfer": return <IconBuildingBank size={14} />;
    case "Cash": return <IconCash size={14} />;
    default: return <IconReceipt size={14} />;
  }
};

export default function PaymentsPage() {
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
          <Text size="sm">{t.methods[element.method as keyof typeof t.methods]}</Text>
        </Group>
      </Table.Td>
      <Table.Td>
        <Text size="sm" c="dimmed">{element.date}</Text>
      </Table.Td>
      <Table.Td>
        <Badge variant="dot" color={element.status === "Completed" ? "green" : "yellow"}>
          {t.statuses[element.status as keyof typeof t.statuses]}
        </Badge>
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
          <Title order={2} c="#014F86">{t.title}</Title>
          <Text c="dimmed" size="sm">{t.subtitle}</Text>
        </Stack>
        <Button leftSection={<IconPlus size={16} />} color="#014F86">{t.addBtn}</Button>
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
                    <span>{t.table.paymentId}</span>
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
                <UnstyledButton onClick={() => handleSort('resident')} style={{ width: '100%', color: 'inherit' }}>
                  <Group justify="space-between" wrap="nowrap">
                    <span>{t.table.resident}</span>
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
              <Table.Th>
                <UnstyledButton onClick={() => handleSort('amount')} style={{ width: '100%', color: 'inherit' }}>
                  <Group justify="space-between" wrap="nowrap">
                    <span>{t.table.amount}</span>
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
                <UnstyledButton onClick={() => handleSort('method')} style={{ width: '100%', color: 'inherit' }}>
                  <Group justify="space-between" wrap="nowrap">
                    <span>{t.table.method}</span>
                    <Center>
                      {sortConfig?.key === 'method' ? (
                        sortConfig.direction === 'asc' ? <IconChevronUp size={14} /> : <IconChevronDown size={14} />
                      ) : (
                        <IconSelector size={14} color="gray" />
                      )}
                    </Center>
                  </Group>
                </UnstyledButton>
              </Table.Th>
              <Table.Th>{t.table.date}</Table.Th>
              <Table.Th>{t.table.status}</Table.Th>
              <Table.Th ta="right">{t.table.actions}</Table.Th>
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
