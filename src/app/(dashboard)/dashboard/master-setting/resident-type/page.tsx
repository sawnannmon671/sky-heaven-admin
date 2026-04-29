"use client";

import { useState } from "react";
import { Title, Text, Stack, Paper, Group, ThemeIcon, Button, Table, TextInput, ActionIcon, Badge, Pagination, UnstyledButton } from "@mantine/core";
import { IconUser, IconSearch, IconEye, IconEdit, IconTrash, IconPlus, IconSelector, IconChevronUp, IconChevronDown } from "@tabler/icons-react";
import { useTranslation } from "@/hooks/useTranslation";

export default function ResidentTypePage() {
  const [sortConfig, setSortConfig] = useState<{ key: string, direction: 'asc' | 'desc' } | null>(null);
  const [activePage, setPage] = useState(1);
  const itemsPerPage = 5;

  const { lang } = useTranslation();

  const t = {
    en: {
      title: "Resident Types",
      subtitle: "Manage property resident classifications",
      searchPlaceholder: "Search resident types...",
      addNew: "Add New Type",
      columns: {
        id: "ID",
        name: "Type Name",
        description: "Description",
        status: "Status",
        count: "Total Residents",
        actions: "Actions"
      },
      types: {
        "Owner": "Owner",
        "Tenant": "Tenant",
        "Family Member": "Family Member"
      }
    },
    mm: {
      title: "နေထိုင်သူအမျိုးအစားများ",
      subtitle: "အိမ်ခြံမြေနေထိုင်သူအမျိုးအစားများကို စီမံခန့်ခွဲပါ",
      searchPlaceholder: "အမျိုးအစားများကို ရှာဖွေရန်...",
      addNew: "အသစ်ထည့်ရန်",
      columns: {
        id: "အမှတ်စဉ်",
        name: "အမျိုးအစားအမည်",
        description: "ဖော်ပြချက်",
        status: "အခြေအနေ",
        count: "နေထိုင်သူစုစုပေါင်း",
        actions: "လုပ်ဆောင်ချက်များ"
      },
      types: {
        "Owner": "အိမ်ရှင်",
        "Tenant": "အိမ်ငှား",
        "Family Member": "မိသားစုဝင်"
      }
    }
  }[lang === "mm" ? "mm" : "en"];

  const mockData = [
    { id: "RT-001", name: "Owner", description: "Property owner", status: "Active", count: 120 },
    { id: "RT-002", name: "Tenant", description: "Property renter", status: "Active", count: 85 },
    { id: "RT-003", name: "Family Member", description: "Resident's family member", status: "Active", count: 45 },
  ];

  const sortedData = [...mockData].sort((a, b) => {
    if (!sortConfig) return 0;
    const { key, direction } = sortConfig;
    if (a[key as keyof typeof a] < b[key as keyof typeof b]) return direction === 'asc' ? -1 : 1;
    if (a[key as keyof typeof a] > b[key as keyof typeof b]) return direction === 'asc' ? 1 : -1;
    return 0;
  });

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const Th = ({ children, reversed, sorted, onSort }: { children: React.ReactNode; reversed: boolean; sorted: boolean; onSort(): void }) => {
    const Icon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;
    return (
      <Table.Th c="white">
        <UnstyledButton onClick={onSort} style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%', padding: '8px' }}>
          <Text fw={600} size="sm">{children}</Text>
          <Icon size={14} stroke={1.5} style={{ color: sorted ? '#014F86' : 'gray' }} />
        </UnstyledButton>
      </Table.Th>
    );
  };

  const rows = sortedData.map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td>
        <Group gap="sm">
          <ThemeIcon size="md" variant="light" color="indigo" radius="md">
            <IconUser size={18} />
          </ThemeIcon>
          <Stack gap={0}>
            <Text size="sm" fw={700}>{t.types[element.name as keyof typeof t.types] || element.name}</Text>
            <Text size="xs" c="dimmed">{element.id}</Text>
          </Stack>
        </Group>
      </Table.Td>
      <Table.Td>
        <Text size="sm" c="dimmed">{element.description}</Text>
      </Table.Td>
      <Table.Td>
        <Badge color={element.status === 'Active' ? 'green' : 'gray'} variant="light">
          {element.status}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Badge size="lg" circle color="indigo" variant="filled">{element.count}</Badge>
      </Table.Td>
      <Table.Td>
        <Group gap={8}>
          <ActionIcon variant="light" color="orange" size="sm"><IconEdit size={16} /></ActionIcon>
          <ActionIcon variant="light" color="red" size="sm"><IconTrash size={16} /></ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Stack gap="xl" p="md">
      <Group justify="space-between">
        <Stack gap={4}>
          <Group gap="xs">
            <ThemeIcon variant="light" color="indigo" size="lg" radius="md">
              <IconUser size={20} />
            </ThemeIcon>
            <Title order={1} c="#014F86">{t.title}</Title>
          </Group>
          <Text c="dimmed" size="md">{t.subtitle}</Text>
        </Stack>
      </Group>

      <Paper p="md" radius="md" withBorder shadow="sm">
        <Group justify="space-between" mb="md">
          <TextInput
            placeholder={t.searchPlaceholder}
            leftSection={<IconSearch size={16} />}
            size="md"
            radius="md"
            w={250}
          />
          <Button leftSection={<IconPlus size={16} />} color="#014F86" radius="md">
            {t.addNew}
          </Button>
        </Group>

        <Table verticalSpacing="md" highlightOnHover>
          <Table.Thead bg="#014F86">
            <Table.Tr>
              <Th sorted={sortConfig?.key === 'name'} reversed={sortConfig?.direction === 'desc'} onSort={() => handleSort('name')}>{t.columns.name}</Th>
              <Th sorted={sortConfig?.key === 'description'} reversed={sortConfig?.direction === 'desc'} onSort={() => handleSort('description')}>{t.columns.description}</Th>
              <Th sorted={sortConfig?.key === 'status'} reversed={sortConfig?.direction === 'desc'} onSort={() => handleSort('status')}>{t.columns.status}</Th>
              <Th sorted={sortConfig?.key === 'count'} reversed={sortConfig?.direction === 'desc'} onSort={() => handleSort('count')}>{t.columns.count}</Th>
              <Table.Th c="white" style={{ padding: '8px' }}><Text fw={600} size="sm">{t.columns.actions}</Text></Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {rows}
          </Table.Tbody>
        </Table>

        <Group justify="space-between" mt="md">
          <Text size="sm" c="dimmed">Showing 1 to 3 of 3 entries</Text>
          <Pagination value={activePage} onChange={setPage} total={1} color="#014F86" radius="md" />
        </Group>
      </Paper>
    </Stack>
  );
}
