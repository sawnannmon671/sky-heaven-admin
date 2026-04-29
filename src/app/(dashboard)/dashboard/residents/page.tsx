"use client";

import { useState } from "react";
import {   Title, Paper, Table, Group, Button, TextInput, Badge, Stack, Avatar, Text, ActionIcon , Pagination , UnstyledButton, Center } from "@mantine/core";
import {  IconPlus, IconSearch, IconEye, IconEdit, IconTrash, IconPhone, IconMail , IconSelector, IconChevronUp, IconChevronDown } from "@tabler/icons-react";
import { useTranslation } from "@/hooks/useTranslation";

const elements = [
  { id: "1", name: "John Doe", unit: "101", phone: "09-123456789", email: "john@example.com", type: "Owner", status: "Active", color: "blue" },
  { id: "2", name: "Jane Smith", unit: "201", phone: "09-987654321", email: "jane@example.com", type: "Tenant", status: "Active", color: "teal" },
  { id: "3", name: "Robert Wilson", unit: "305", phone: "09-555666777", email: "robert@example.com", type: "Owner", status: "Inactive", color: "gray" },
];

const translations = {
  en: {
    title: "Residents Directory",
    subtitle: "Manage resident profiles, contact information, and occupancy status.",
    addBtn: "Add Resident",
    searchPlaceholder: "Search residents by name, unit, phone or email...",
    table: {
      name: "Name & Contact",
      unit: "Unit",
      phone: "Phone",
      type: "Type",
      status: "Status",
      actions: "Actions",
    },
    types: {
      Owner: "Owner",
      Tenant: "Tenant",
    },
    statuses: {
      Active: "Active",
      Inactive: "Inactive",
    },
    unitLabel: "Unit",
  },
  mm: {
    title: "နေထိုင်သူများစာရင်း",
    subtitle: "နေထိုင်သူများ၏ ကိုယ်ရေးအချက်အလက်များ၊ ဆက်သွယ်ရန်နှင့် နေထိုင်မှုအခြေအနေများကို စီမံခန့်ခွဲပါ။",
    addBtn: "နေထိုင်သူအသစ်ထည့်ရန်",
    searchPlaceholder: "နေထိုင်သူအမည်၊ အခန်းနံပါတ်၊ ဖုန်း သို့မဟုတ် အီးမေးလ်ဖြင့် ရှာဖွေရန်...",
    table: {
      name: "အမည်နှင့် ဆက်သွယ်ရန်",
      unit: "အခန်းနံပါတ်",
      phone: "ဖုန်း",
      type: "အမျိုးအစား",
      status: "အခြေအနေ",
      actions: "လုပ်ဆောင်ချက်များ",
    },
    types: {
      Owner: "ပိုင်ရှင်",
      Tenant: "အိမ်ငှား",
    },
    statuses: {
      Active: "အသုံးပြုဆဲ",
      Inactive: "ရပ်နားထား",
    },
    unitLabel: "အခန်း",
  },
};

export default function ResidentsPage() {
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
          <Avatar color={element.color} radius="xl" size="sm">{element.name.charAt(0)}</Avatar>
          <div>
            <Text size="sm" fw={500}>{element.name}</Text>
            <Text size="xs" c="dimmed">{element.email}</Text>
          </div>
        </Group>
      </Table.Td>
      <Table.Td>
        <Text size="sm" fw={500}>{t.unitLabel} {element.unit}</Text>
      </Table.Td>
      <Table.Td>
        <Group gap={4}>
          <IconPhone size={14} style={{ color: "var(--mantine-color-dimmed)" }} />
          <Text size="sm">{element.phone}</Text>
        </Group>
      </Table.Td>
      <Table.Td>
        <Badge variant="light" color={element.type === "Owner" ? "violet" : "blue"}>
          {t.types[element.type as keyof typeof t.types]}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Badge variant="dot" color={element.status === "Active" ? "green" : "gray"}>
          {t.statuses[element.status as keyof typeof t.statuses]}
        </Badge>
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
          <Title order={2} c="#014F86">{t.title}</Title>
          <Text c="dimmed" size="sm">{t.subtitle}</Text>
        </Stack>
        <Button leftSection={<IconPlus size={16} />} color="#014F86">{t.addBtn}</Button>
      </Group>

      <Paper p="md" radius="md" withBorder shadow="sm">
        <TextInput
          placeholder={t.searchPlaceholder} w={250}
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
                    <span>{t.table.name}</span>
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
                <UnstyledButton onClick={() => handleSort('name')} style={{ width: '100%', color: 'inherit' }}>
                  <Group justify="space-between" wrap="nowrap">
                    <span>{t.table.unit}</span>
                    <Center>
                      {sortConfig?.key === 'name' ? (
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
                    <span>{t.table.phone}</span>
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
                <UnstyledButton onClick={() => handleSort('phone')} style={{ width: '100%', color: 'inherit' }}>
                  <Group justify="space-between" wrap="nowrap">
                    <span>{t.table.type}</span>
                    <Center>
                      {sortConfig?.key === 'phone' ? (
                        sortConfig.direction === 'asc' ? <IconChevronUp size={14} /> : <IconChevronDown size={14} />
                      ) : (
                        <IconSelector size={14} color="gray" />
                      )}
                    </Center>
                  </Group>
                </UnstyledButton>
              </Table.Th>
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
