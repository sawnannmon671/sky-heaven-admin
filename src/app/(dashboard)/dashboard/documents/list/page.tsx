"use client";

import { useState } from "react";
import { Title, Text, Stack, Paper, Group, ThemeIcon, Button, Table, TextInput, ActionIcon, Badge, Pagination, UnstyledButton, Center, Box, SimpleGrid, Select } from "@mantine/core";
import { IconClipboardList, IconSearch, IconEye, IconEdit, IconTrash, IconPlus, IconSelector, IconChevronUp, IconChevronDown, IconFilter } from "@tabler/icons-react";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";

export default function DocumentListPage() {
  const [sortConfig, setSortConfig] = useState<{ key: string, direction: 'asc' | 'desc' } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string | null>("All");
  const [statusFilter, setStatusFilter] = useState<string | null>("All");
  const [activePage, setPage] = useState(1);
  const itemsPerPage = 5;

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const { lang } = useTranslation();

  const t = {
    en: {
      title: "Document List",
      subtitle: "Manage all documents, contracts, forms, and rules.",
      searchPlaceholder: "Search documents...",
      addNew: "Add New",
      columns: {
        id: "ID",
        name: "Document Name",
        documentType: "Document Type",
        date: "Date",
        status: "Status",
        remark: "Remark",
        actions: "Actions",
      }
    },
    mm: {
      title: "စာရွက်စာတမ်းစာရင်း",
      subtitle: "စာရွက်စာတမ်းများ၊ စာချုပ်များ၊ ဖောင်များနှင့် စည်းမျဉ်းများအားလုံးကို စီမံခန့်ခွဲပါ။",
      searchPlaceholder: "ရှာဖွေရန်...",
      addNew: "အသစ်ထည့်ရန်",
      columns: {
        id: "အမှတ်စဉ်",
        name: "အမည်",
        documentType: "အမျိုးအစား",
        date: "ရက်စွဲ",
        status: "အခြေအနေ",
        remark: "မှတ်ချက်",
        actions: "လုပ်ဆောင်ချက်များ",
      }
    },
  }[lang === "mm" ? "mm" : "en"];

  const mockData = [
    { id: "DOC-001", name: "Building Maintenance Contract", documentType: "Contract", date: "2024-01-10", status: "Active", remark: "Yearly renewal" },
    { id: "DOC-002", name: "Resident Registration Form", documentType: "Resident Form", date: "2023-11-05", status: "Active", remark: "Unit 101" },
    { id: "DOC-003", name: "Swimming Pool Rules", documentType: "Rules & Regulations", date: "2024-03-15", status: "Active", remark: "Updated 2024" },
    { id: "DOC-004", name: "Move-out Inspection Form", documentType: "Resident Form", date: "2022-05-20", status: "Archived", remark: "Unit 305" },
    { id: "DOC-005", name: "Pest Control Agreement", documentType: "Contract", date: "2024-02-28", status: "Active", remark: "Monthly service" },
  ];

  const documentTypes = ["All", ...Array.from(new Set(mockData.map(item => item.documentType)))];

  const filteredData = mockData.filter(item => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.documentType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "All" || item.documentType === typeFilter;
    const matchesStatus = statusFilter === "All" || item.status === statusFilter;

    return matchesSearch && matchesType && matchesStatus;
  });

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
      <Table.Th c="white">
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
          <Title order={2} fz={28} fw={700} c="#014F86">{t.title}</Title>
          <Text c="dimmed" size="sm">{t.subtitle}</Text>
        </Stack>
        <Button leftSection={<IconPlus size={16} />} color="#014F86" radius="md">
          {t.addNew}
        </Button>
      </Group>

      <Paper p="md" radius="md" withBorder shadow="sm">
        <Box bg="#f8f9fa" p="md" mb="md" style={{ borderRadius: '8px' }}>
          <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="md">
            <TextInput
              label="Search"
              placeholder={t.searchPlaceholder}
              leftSection={<IconSearch size={16} />}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.currentTarget.value)}
              styles={{ input: { backgroundColor: 'white' } }}
            />
            <Select
              label="Document Type"
              placeholder="Filter by type"
              leftSection={<IconFilter size={16} />}
              data={documentTypes}
              value={typeFilter}
              onChange={setTypeFilter}
              styles={{ input: { backgroundColor: 'white' } }}
            />
            <Select
              label="Status"
              placeholder="Filter by status"
              leftSection={<IconFilter size={16} />}
              data={["All", "Active", "Archived"]}
              value={statusFilter}
              onChange={setStatusFilter}
              styles={{ input: { backgroundColor: 'white' } }}
            />
          </SimpleGrid>
        </Box>

        <Table verticalSpacing="md" highlightOnHover>
          <Table.Thead bg="#014F86">
            <Table.Tr>
              <Th sorted={sortConfig?.key === 'id'} reversed={sortConfig?.direction === 'desc'} onSort={() => handleSort('id')}>{t.columns.id}</Th>
              <Th sorted={sortConfig?.key === 'name'} reversed={sortConfig?.direction === 'desc'} onSort={() => handleSort('name')}>{t.columns.name}</Th>
              <Th sorted={sortConfig?.key === 'documentType'} reversed={sortConfig?.direction === 'desc'} onSort={() => handleSort('documentType')}>{t.columns.documentType}</Th>
              <Th sorted={sortConfig?.key === 'date'} reversed={sortConfig?.direction === 'desc'} onSort={() => handleSort('date')}>{t.columns.date}</Th>
              <Th sorted={sortConfig?.key === 'status'} reversed={sortConfig?.direction === 'desc'} onSort={() => handleSort('status')}>{t.columns.status}</Th>
              <Th sorted={sortConfig?.key === 'remark'} reversed={sortConfig?.direction === 'desc'} onSort={() => handleSort('remark')}>{t.columns.remark}</Th>
              <Table.Th c="white" style={{ padding: '8px' }}><Text fw={600} size="sm">{t.columns.actions}</Text></Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {sortedData.map((item) => (
              <Table.Tr key={item.id}>
                <Table.Td><Text fw={500} size="sm">{item.id}</Text></Table.Td>
                <Table.Td><Text size="sm">{item.name}</Text></Table.Td>
                <Table.Td>
                  <Badge color={item.documentType === 'Contract' ? 'blue' : item.documentType === 'Resident Form' ? 'teal' : 'grape'} variant="light">
                    {item.documentType}
                  </Badge>
                </Table.Td>
                <Table.Td><Text size="sm" c="dimmed">{item.date}</Text></Table.Td>
                <Table.Td>
                  <Badge color={item.status === 'Active' ? 'green' : 'gray'} variant="light">
                    {item.status}
                  </Badge>
                </Table.Td>
                <Table.Td><Text size="sm" c="dimmed">{item.remark}</Text></Table.Td>
                <Table.Td>
                  <Group gap={8}>
                    <ActionIcon variant="light" color="blue" size="sm"><IconEye size={16} /></ActionIcon>
                    <ActionIcon variant="light" color="orange" size="sm"><IconEdit size={16} /></ActionIcon>
                    <ActionIcon variant="light" color="red" size="sm"><IconTrash size={16} /></ActionIcon>
                  </Group>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>

        <Group justify="space-between" mt="md">
          <Text size="sm" c="dimmed">
            Showing {filteredData.length > 0 ? ((activePage - 1) * itemsPerPage) + 1 : 0} to {Math.min(activePage * itemsPerPage, filteredData.length)} of {filteredData.length} entries
          </Text>
          <Pagination total={Math.ceil(filteredData.length / itemsPerPage)} value={activePage} onChange={setPage} color="#014F86" />
        </Group>
      </Paper>
    </Stack>
  );
}
