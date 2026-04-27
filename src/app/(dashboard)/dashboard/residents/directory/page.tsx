"use client";

import { useState } from "react";
import { Title, Text, Stack, Paper, Group, ThemeIcon, Button, Table, TextInput, ActionIcon, Badge, Pagination, UnstyledButton, Center, Tabs } from "@mantine/core";
import { IconAddressBook, IconChevronLeft, IconSearch, IconEye, IconEdit, IconTrash, IconPlus, IconSelector, IconChevronUp, IconChevronDown } from "@tabler/icons-react";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";

export default function ResidentDirectoryPage() {
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

  const { lang } = useTranslation();

  const t = {
    en: {
      title: "Resident List",
      subtitle: "Comprehensive list of all owners and tenants across the property.",
      searchPlaceholder: "Search residents...",
      addNew: "Add New",
      columns: {
        id: "ID",
        name: "Name",
        residentType: "Resident Type",
        unit: "Unit",
        phone: "Phone",
        moveInDate: "Move In Date",
        status: "Status",
        actions: "Actions",
      }
    },
    mm: {
      title: "နေထိုင်သူများစာရင်း",
      subtitle: "အိမ်ခြံမြေတစ်ခုလုံးရှိ အိမ်ရှင်များနှင့် အိမ်ငှားများအားလုံး၏ ပြည့်စုံသောစာရင်း။",
      searchPlaceholder: "ရှာဖွေရန်...",
      addNew: "အသစ်ထည့်ရန်",
      columns: {
        id: "အမှတ်စဉ်",
        name: "အမည်",
        residentType: "နေထိုင်သူအမျိုးအစား",
        unit: "အခန်း",
        phone: "ဖုန်းနံပါတ်",
        moveInDate: "စတင်နေထိုင်သည့်နေ့",
        status: "အခြေအနေ",
        actions: "လုပ်ဆောင်ချက်များ",
      }
    },
  }[lang === "mm" ? "mm" : "en"];

  const mockData = [
    { id: "RES-001", name: "U Aung Aung", residentType: "Owner", unit: "A-101", phone: "+95 9 123 456 789", moveInDate: "2020-01-15", status: "Active" },
    { id: "RES-002", name: "Daw Mya Mya", residentType: "Tenant", unit: "B-205", phone: "+95 9 987 654 321", moveInDate: "2023-07-01", status: "Active" },
    { id: "RES-003", name: "Mg Thura", residentType: "Owner", unit: "A-502", phone: "+95 9 111 222 333", moveInDate: "2021-03-10", status: "Active" },
    { id: "RES-004", name: "U Zaw Myo", residentType: "Owner", unit: "D-102", phone: "+95 9 444 888 999", moveInDate: "2019-11-20", status: "Active" },
    { id: "RES-005", name: "Daw Thandar", residentType: "Tenant", unit: "A-502", phone: "+95 9 555 666 777", moveInDate: "2022-08-15", status: "Inactive" },
  ];

  const residentTypes = ["All", ...Array.from(new Set(mockData.map(item => item.residentType)))];

  const filteredData = mockData.filter(item => activeTab === "All" || item.residentType === activeTab);

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortConfig) return 0;
    const { key, direction } = sortConfig;
    if (a[key as keyof typeof a] < b[key as keyof typeof b]) return direction === 'asc' ? -1 : 1;
    if (a[key as keyof typeof a] > b[key as keyof typeof b]) return direction === 'asc' ? 1 : -1;
    return 0;
  });

  const Th = ({ children, reversed, sorted, onSort }: { children: React.ReactNode; reversed: boolean; sorted: boolean; onSort(): void }) => {
    const Icon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;
    return (
      <Table.Th>
        <UnstyledButton onClick={onSort} style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%', padding: '8px' }}>
          <Text fw={600} size="sm">{children}</Text>
          <Icon size={14} stroke={1.5} style={{ color: sorted ? '#014F86' : 'gray' }} />
        </UnstyledButton>
      </Table.Th>
    );
  };

  const getResidentTypeColor = (type: string) => {
    switch (type) {
      case 'Owner': return 'blue';
      case 'Tenant': return 'teal';
      default: return 'gray';
    }
  };

  return (
    <Stack gap="xl" p="md">
      <Group justify="space-between">
        <Stack gap={4}>
          <Group gap="xs">
            <ThemeIcon variant="light" color="indigo" size="lg" radius="md">
              <IconAddressBook size={20} />
            </ThemeIcon>
            <Title order={1}>{t.title}</Title>
          </Group>
          <Text c="dimmed" size="md">{t.subtitle}</Text>
        </Stack>
      </Group>

      <Paper p="md" radius="md" withBorder shadow="sm">
        <Tabs value={activeTab} onChange={(val) => { setActiveTab(val); setPage(1); }} mb="md" color="#014F86">
          <Tabs.List>
            {residentTypes.map(type => {
              const count = type === "All" ? mockData.length : mockData.filter(i => i.residentType === type).length;
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
            placeholder={t.searchPlaceholder}
            leftSection={<IconSearch size={16} />}
            size="md"
            radius="md"
            style={{ flex: 1, maxWidth: 400 }}
          />
          <Button leftSection={<IconPlus size={16} />} color="#014F86" radius="md">
            {t.addNew}
          </Button>
        </Group>

        <Table verticalSpacing="md" highlightOnHover>
          <Table.Thead bg="gray.0">
            <Table.Tr>
              <Th sorted={sortConfig?.key === 'id'} reversed={sortConfig?.direction === 'desc'} onSort={() => handleSort('id')}>{t.columns.id}</Th>
              <Th sorted={sortConfig?.key === 'name'} reversed={sortConfig?.direction === 'desc'} onSort={() => handleSort('name')}>{t.columns.name}</Th>
              <Th sorted={sortConfig?.key === 'residentType'} reversed={sortConfig?.direction === 'desc'} onSort={() => handleSort('residentType')}>{t.columns.residentType}</Th>
              <Th sorted={sortConfig?.key === 'unit'} reversed={sortConfig?.direction === 'desc'} onSort={() => handleSort('unit')}>{t.columns.unit}</Th>
              <Th sorted={sortConfig?.key === 'phone'} reversed={sortConfig?.direction === 'desc'} onSort={() => handleSort('phone')}>{t.columns.phone}</Th>
              <Th sorted={sortConfig?.key === 'moveInDate'} reversed={sortConfig?.direction === 'desc'} onSort={() => handleSort('moveInDate')}>{t.columns.moveInDate}</Th>
              <Th sorted={sortConfig?.key === 'status'} reversed={sortConfig?.direction === 'desc'} onSort={() => handleSort('status')}>{t.columns.status}</Th>
              <Table.Th style={{ padding: '8px' }}><Text fw={600} size="sm">{t.columns.actions}</Text></Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {sortedData.slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage).map((item) => (
              <Table.Tr key={item.id}>
                <Table.Td><Text fw={500} size="sm">{item.id}</Text></Table.Td>
                <Table.Td><Text size="sm" fw={500}>{item.name}</Text></Table.Td>
                <Table.Td>
                  <Badge color={getResidentTypeColor(item.residentType)} variant="light">
                    {item.residentType}
                  </Badge>
                </Table.Td>
                <Table.Td><Text size="sm" fw={500}>{item.unit}</Text></Table.Td>
                <Table.Td><Text size="sm">{item.phone}</Text></Table.Td>
                <Table.Td><Text size="sm" c="dimmed">{item.moveInDate}</Text></Table.Td>
                <Table.Td>
                  <Badge color={item.status === 'Active' ? 'green' : 'gray'} variant="light">
                    {item.status}
                  </Badge>
                </Table.Td>
                <Table.Td>
                  <Group gap={8}>
                    <ActionIcon component={Link} href={`/dashboard/residents/directory/${item.id}`} variant="light" color="blue" size="sm"><IconEye size={16} /></ActionIcon>
                    <ActionIcon variant="light" color="orange" size="sm"><IconEdit size={16} /></ActionIcon>
                    <ActionIcon variant="light" color="red" size="sm"><IconTrash size={16} /></ActionIcon>
                  </Group>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>

        <Group justify="space-between" mt="md">
          <Text size="sm" c="dimmed">Showing {Math.min((activePage - 1) * itemsPerPage + 1, sortedData.length)} to {Math.min(activePage * itemsPerPage, sortedData.length)} of {sortedData.length} entries</Text>
          <Pagination value={activePage} onChange={setPage} total={Math.ceil(sortedData.length / itemsPerPage)} color="#014F86" radius="md" />
        </Group>
      </Paper>
    </Stack>
  );
}
