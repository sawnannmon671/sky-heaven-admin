"use client";

import { useState } from "react";
import { Title, Text, Stack, Paper, Group, ThemeIcon, Button, Table, TextInput, ActionIcon, Badge, Pagination, UnstyledButton, Collapse, Box, SimpleGrid, Select, Center } from "@mantine/core";
import { IconUsers, IconSearch, IconEye, IconEdit, IconTrash, IconPlus, IconSelector, IconChevronUp, IconChevronDown, IconFilter } from "@tabler/icons-react";
import { useTranslation } from "@/hooks/useTranslation";

export default function StaffTypePage() {
  const [sortConfig, setSortConfig] = useState<{ key: string, direction: 'asc' | 'desc' } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>("All");
  const [activePage, setPage] = useState(1);
  const itemsPerPage = 5;

  const { lang } = useTranslation();

  const t = {
    en: {
      title: "Staff Types",
      subtitle: "Manage property staff classifications and roles",
      searchPlaceholder: "Search staff types...",
      addNew: "Add New Type",
      columns: {
        id: "ID",
        name: "Type Name",
        description: "Description",
        status: "Status",
        count: "Total Staff",
        actions: "Actions"
      },
      types: {
        "Security Guard": "Security Guard",
        "Cleaning Staff": "Cleaning Staff",
        "Technician": "Technician",
        "Manager": "Manager",
        "Admin": "Admin"
      }
    },
    mm: {
      title: "ဝန်ထမ်းအမျိုးအစားများ",
      subtitle: "အိမ်ခြံမြေဝန်ထမ်းအမျိုးအစားများနှင့် အခန်းကဏ္ဍများကို စီမံခန့်ခွဲပါ",
      searchPlaceholder: "အမျိုးအစားများကို ရှာဖွေရန်...",
      addNew: "အသစ်ထည့်ရန်",
      columns: {
        id: "အမှတ်စဉ်",
        name: "အမျိုးအစားအမည်",
        description: "ဖော်ပြချက်",
        status: "အခြေအနေ",
        count: "ဝန်ထမ်းစုစုပေါင်း",
        actions: "လုပ်ဆောင်ချက်များ"
      },
      types: {
        "Security Guard": "လုံခြုံရေးဝန်ထမ်း",
        "Cleaning Staff": "သန့်ရှင်းရေးဝန်ထမ်း",
        "Technician": "နည်းပညာကျွမ်းကျင်သူ",
        "Manager": "မန်နေဂျာ",
        "Admin": "အက်ဒမင်"
      }
    }
  }[lang === "mm" ? "mm" : "en"];

  const mockData = [
    { id: "ST-001", name: "Manager", description: "Department heads and managers", status: "Active", count: 3 },
    { id: "ST-002", name: "Security Guard", description: "Security personnel and guards", status: "Active", count: 12 },
    { id: "ST-003", name: "Cleaning Staff", description: "Janitors and cleaners", status: "Active", count: 8 },
    { id: "ST-004", name: "Technician", description: "Maintenance and engineering staff", status: "Active", count: 5 },
    { id: "ST-005", name: "Admin", description: "Administrative and office staff", status: "Active", count: 4 },
  ];

  const filteredData = mockData.filter(item => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || item.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const sortedData = [...filteredData].sort((a, b) => {
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
          <ThemeIcon size="md" variant="light" color="blue" radius="md">
            <IconUsers size={18} />
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

  return (
    <Stack gap="xl" p="md">
      <Group justify="space-between">
        <Stack gap={4}>
          <Title order={2} fz={28} fw={700} c="#014F86">{t.title}</Title>
          <Text c="dimmed" size="sm" fw={500}>{t.subtitle}</Text>
        </Stack>
        <Button leftSection={<IconPlus size={16} />} color="#014F86" radius="md">
          {t.addNew}
        </Button>
      </Group>

      <Paper p="md" radius="md" withBorder shadow="sm">
        <Box bg="#f8f9fa" p="md" mb="md" radius="md">
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
              label="Status"
              placeholder="Filter by status"
              leftSection={<IconFilter size={16} />}
              data={["All", "Active", "Inactive"]}
              value={statusFilter}
              onChange={setStatusFilter}
              styles={{ input: { backgroundColor: 'white' } }}
            />
          </SimpleGrid>
        </Box>

        <Table verticalSpacing="md" highlightOnHover mt="sm">
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
            {rows.slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage)}
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
