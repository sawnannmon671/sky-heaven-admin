"use client";

import { useState } from "react";
import {  Title, Paper, Table, Group, Button, Badge, Stack, Text, Select, ActionIcon, ThemeIcon, TextInput , Pagination } from "@mantine/core";
import { IconPlus, IconFilter, IconEye, IconEdit, IconTrash, IconTool, IconSearch } from "@tabler/icons-react";
import { useTranslation } from "@/hooks/useTranslation";

const elements = [
  { id: "REQ-101", unit: "101", category: "Plumbing", priority: "High", status: "In Progress", date: "2024-04-20", color: "red" },
  { id: "REQ-102", unit: "205", category: "Electrical", priority: "Medium", status: "Pending", date: "2024-04-22", color: "orange" },
  { id: "REQ-103", unit: "303", category: "Cleaning", priority: "Low", status: "Completed", date: "2024-04-18", color: "blue" },
  { id: "REQ-104", unit: "402", category: "Plumbing", priority: "Medium", status: "Pending", date: "2024-04-25", color: "orange" },
  { id: "REQ-105", unit: "108", category: "Electrical", priority: "High", status: "In Progress", date: "2024-04-26", color: "red" },
];

const translations = {
  en: {
    title: "Maintenance Requests",
    subtitle: "Track and manage property maintenance and repair tickets.",
    addBtn: "New Request",
    searchPlaceholder: "Search requests...",
    filterStatus: "Filter by Status",
    table: {
      requestId: "Request ID",
      unit: "Unit",
      category: "Category",
      priority: "Priority",
      status: "Status",
      date: "Date",
      actions: "Actions",
    },
    categories: {
      Plumbing: "Plumbing",
      Electrical: "Electrical",
      Cleaning: "Cleaning",
    },
    priorities: {
      High: "High",
      Medium: "Medium",
      Low: "Low",
    },
    statuses: {
      Pending: "Pending",
      "In Progress": "In Progress",
      Completed: "Completed",
    },
    unitLabel: "Unit",
  },
  mm: {
    title: "ပြုပြင်ထိန်းသိမ်းမှု တောင်းဆိုချက်များ",
    subtitle: "အိမ်ခြံမြေ ပြုပြင်ထိန်းသိမ်းမှုနှင့် ပြင်ဆင်ရေးလက်မှတ်များကို ခြေရာခံပြီး စီမံခန့်ခွဲပါ။",
    addBtn: "တောင်းဆိုချက်အသစ်",
    searchPlaceholder: "တောင်းဆိုချက်များကို ရှာဖွေရန်...",
    filterStatus: "အခြေအနေဖြင့် စစ်ထုတ်ရန်",
    table: {
      requestId: "တောင်းဆိုမှုနံပါတ်",
      unit: "အခန်း",
      category: "အမျိုးအစား",
      priority: "ဦးစားပေး",
      status: "အခြေအနေ",
      date: "ရက်စွဲ",
      actions: "လုပ်ဆောင်ချက်များ",
    },
    categories: {
      Plumbing: "ပိုက်ပြင်ခြင်း",
      Electrical: "လျှပ်စစ်",
      Cleaning: "သန့်ရှင်းရေး",
    },
    priorities: {
      High: "အရေးကြီး",
      Medium: "အလယ်အလတ်",
      Low: "သာမန်",
    },
    statuses: {
      Pending: "စောင့်ဆိုင်းဆဲ",
      "In Progress": "ဆောင်ရွက်ဆဲ",
      Completed: "ပြီးစီး",
    },
    unitLabel: "အခန်း",
  },
};

export default function MaintenancePage() {
  const [activePage, setPage] = useState(1);
  const itemsPerPage = 5;

  const { lang, mounted } = useTranslation();
  const t = translations[lang];

  if (!mounted) return null;

  const rows = elements.map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td>
        <Group gap="sm">
          <ThemeIcon size="sm" variant="light" color={element.priority === "High" ? "red" : "blue"}>
            <IconTool size={16} />
          </ThemeIcon>
          <Text size="sm" fw={500}>{element.id}</Text>
        </Group>
      </Table.Td>
      <Table.Td>{t.unitLabel} {element.unit}</Table.Td>
      <Table.Td>{t.categories[element.category as keyof typeof t.categories]}</Table.Td>
      <Table.Td>
        <Badge variant="light" color={element.priority === "High" ? "red" : element.priority === "Medium" ? "orange" : "blue"}>
          {t.priorities[element.priority as keyof typeof t.priorities]}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Badge variant="dot" color={element.status === "Completed" ? "green" : element.status === "In Progress" ? "blue" : "yellow"}>
          {t.statuses[element.status as keyof typeof t.statuses]}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Text size="sm" c="dimmed">{element.date}</Text>
      </Table.Td>
      <Table.Td>
        <Group gap={4} justify="flex-end">
          <ActionIcon variant="subtle" color="gray">
            <IconEye size={16} />
          </ActionIcon>
          <ActionIcon variant="subtle" color="blue">
            <IconEdit size={16} />
          </ActionIcon>
          <ActionIcon variant="subtle" color="red">
            <IconTrash size={16} />
          </ActionIcon>
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
        <Button leftSection={<IconPlus size={16} />} color="#014F86">{t.addBtn}</Button>
      </Group>

      <Paper p="md" radius="md" withBorder shadow="sm">
        <Group mb="xl" justify="space-between">
          <TextInput
            placeholder={t.searchPlaceholder}
            leftSection={<IconSearch size={16} />}
            style={{ flex: 1 }}
          />
          <Select
            placeholder={t.filterStatus}
            data={[
              { value: "Pending", label: t.statuses.Pending },
              { value: "In Progress", label: t.statuses["In Progress"] },
              { value: "Completed", label: t.statuses.Completed },
            ]}
            leftSection={<IconFilter size={16} />}
            style={{ width: 200 }}
          />
        </Group>
        <Table verticalSpacing="sm" highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>{t.table.requestId}</Table.Th>
              <Table.Th>{t.table.unit}</Table.Th>
              <Table.Th>{t.table.category}</Table.Th>
              <Table.Th>{t.table.priority}</Table.Th>
              <Table.Th>{t.table.status}</Table.Th>
              <Table.Th>{t.table.date}</Table.Th>
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
