"use client";

import { useState } from "react";
import { Title, Paper, Table, Group, Button, TextInput, Stack, Text, ThemeIcon, ActionIcon, Badge, Pagination, UnstyledButton, Center } from "@mantine/core";
import { IconPlus, IconSearch, IconEye, IconEdit, IconTrash, IconFileText, IconSelector, IconChevronUp, IconChevronDown } from "@tabler/icons-react";
import { useTranslation } from "@/hooks/useTranslation";

const elements = [
  { id: "DTYP-001", name: "Contract", description: "Legal agreements and vendor contracts", status: "Active", count: 12 },
  { id: "DTYP-002", name: "Resident Form", description: "Forms submitted by residents", status: "Active", count: 45 },
  { id: "DTYP-003", name: "Rules & Regulations", description: "Building rules and policies", status: "Active", count: 8 },
  { id: "DTYP-004", name: "Financial Report", description: "Monthly and annual financial statements", status: "Active", count: 24 },
];

const translations = {
  en: {
    title: "Document Types",
    subtitle: "Manage document classifications and categories.",
    addBtn: "Add Document Type",
    searchPlaceholder: "Search document types...",
    thName: "Type Name",
    thDesc: "Description",
    thStatus: "Status",
    thCount: "Document Count",
    thActions: "Actions",
    types: {
      "Contract": "Contract",
      "Resident Form": "Resident Form",
      "Rules & Regulations": "Rules & Regulations",
      "Financial Report": "Financial Report"
    }
  },
  mm: {
    title: "စာရွက်စာတမ်းအမျိုးအစားများ",
    subtitle: "စာရွက်စာတမ်းအမျိုးအစားခွဲခြားမှုများကို စီမံခန့်ခွဲပါ။",
    addBtn: "အမျိုးအစားအသစ်ထည့်ရန်",
    searchPlaceholder: "ရှာဖွေရန်...",
    thName: "အမျိုးအစားအမည်",
    thDesc: "အကြောင်းအရာဖော်ပြချက်",
    thStatus: "အခြေအနေ",
    thCount: "စာရွက်စာတမ်းအရေအတွက်",
    thActions: "လုပ်ဆောင်ချက်များ",
    types: {
      "Contract": "စာချုပ်",
      "Resident Form": "နေထိုင်သူဖောင်",
      "Rules & Regulations": "စည်းမျဉ်းစည်းကမ်းများ",
      "Financial Report": "ဘဏ္ဍာရေးအစီရင်ခံစာ"
    }
  }
};

export default function DocumentTypePage() {
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

  const { lang } = useTranslation();
  const t = translations[lang as keyof typeof translations] || translations.en;

  const rows = sortedData.map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td>
        <Group gap="sm">
          <ThemeIcon size="md" variant="light" color="blue" radius="md">
            <IconFileText size={18} />
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
        <Badge size="lg" circle color="blue" variant="filled">{element.count}</Badge>
      </Table.Td>
      <Table.Td>
        <Group gap={8}>
          <ActionIcon variant="light" color="orange" size="sm"><IconEdit size={16} /></ActionIcon>
          <ActionIcon variant="light" color="red" size="sm"><IconTrash size={16} /></ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

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

  return (
    <Stack gap="xl" p="md">
      <Group justify="space-between">
        <Stack gap={4}>
          <Group gap="xs">
            <ThemeIcon variant="light" color="blue" size="lg" radius="md">
              <IconFileText size={20} />
            </ThemeIcon>
            <Title order={1} c="#014F86">{t.title}</Title>
          </Group>
          <Text c="dimmed" size="md">{t.subtitle}</Text>
        </Stack>
      </Group>

      <Paper p="md" radius="md" withBorder shadow="sm">
        <Group justify="space-between" mb="md">
          <TextInput
            placeholder={t.searchPlaceholder} w={250}
            leftSection={<IconSearch size={16} />}
            size="md"
            radius="md"
            w={250}
          />
          <Button leftSection={<IconPlus size={16} />} color="#014F86" radius="md">
            {t.addBtn}
          </Button>
        </Group>

        <Table verticalSpacing="md" highlightOnHover>
          <Table.Thead bg="gray.0">
            <Table.Tr>
              <Th sorted={sortConfig?.key === 'name'} reversed={sortConfig?.direction === 'desc'} onSort={() => handleSort('name')}>{t.thName}</Th>
              <Th sorted={sortConfig?.key === 'description'} reversed={sortConfig?.direction === 'desc'} onSort={() => handleSort('description')}>{t.thDesc}</Th>
              <Th sorted={sortConfig?.key === 'status'} reversed={sortConfig?.direction === 'desc'} onSort={() => handleSort('status')}>{t.thStatus}</Th>
              <Th sorted={sortConfig?.key === 'count'} reversed={sortConfig?.direction === 'desc'} onSort={() => handleSort('count')}>{t.thCount}</Th>
              <Table.Th style={{ padding: '8px' }}><Text fw={600} size="sm">{t.thActions}</Text></Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>

        <Group justify="space-between" mt="md">
          <Text size="sm" c="dimmed">Showing 1 to 4 of 4 entries</Text>
          <Pagination value={activePage} onChange={setPage} total={1} color="#014F86" radius="md" />
        </Group>
      </Paper>
    </Stack>
  );
}
