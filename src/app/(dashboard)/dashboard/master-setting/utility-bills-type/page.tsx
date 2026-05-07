"use client";

import { useState } from "react";
import { Title, Text, Stack, Paper, Group, ThemeIcon, Button, Table, TextInput, ActionIcon, Badge, Pagination, UnstyledButton, Collapse, Box, SimpleGrid, Select, Center } from "@mantine/core";
import { IconDroplet, IconSearch, IconEye, IconEdit, IconTrash, IconPlus, IconSelector, IconChevronUp, IconChevronDown, IconFilter } from "@tabler/icons-react";
import { useTranslation } from "@/hooks/useTranslation";

export default function UtilityBillsTypePage() {
  const [sortConfig, setSortConfig] = useState<{ key: string, direction: 'asc' | 'desc' } | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [activePage, setPage] = useState(1);
  const itemsPerPage = 5;

  const { lang } = useTranslation();

  const t = {
    en: {
      title: "Utility Bills Types",
      subtitle: "Manage property utility bill classifications",
      searchPlaceholder: "Search utility types...",
      addNew: "Add New Type",
      columns: {
        id: "ID",
        name: "Type Name",
        description: "Description",
        unit: "Measurement Unit",
        status: "Status",
        actions: "Actions"
      },
      types: {
        "Electricity": "Electricity",
        "Water": "Water",
        "Internet": "Internet",
        "Gas": "Gas",
        "Trash Collection": "Trash Collection"
      }
    },
    mm: {
      title: "ယူတီလီတီဘေလ်အမျိုးအစားများ",
      subtitle: "အိမ်ခြံမြေ ယူတီလီတီဘေလ်အမျိုးအစားများကို စီမံခန့်ခွဲပါ",
      searchPlaceholder: "အမျိုးအစားများကို ရှာဖွေရန်...",
      addNew: "အသစ်ထည့်ရန်",
      columns: {
        id: "အမှတ်စဉ်",
        name: "အမျိုးအစားအမည်",
        description: "ဖော်ပြချက်",
        unit: "တိုင်းတာမှုယူနစ်",
        status: "အခြေအနေ",
        actions: "လုပ်ဆောင်ချက်များ"
      },
      types: {
        "Electricity": "လျှပ်စစ်မီး",
        "Water": "ရေ",
        "Internet": "အင်တာနက်",
        "Gas": "ဂက်စ်",
        "Trash Collection": "အမှိုက်သိမ်းခ"
      }
    }
  }[lang === "mm" ? "mm" : "en"];

  const mockData = [
    { id: "UBT-001", name: "Electricity", description: "Monthly electricity consumption", unit: "kWh", status: "Active" },
    { id: "UBT-002", name: "Water", description: "Monthly water consumption", unit: "Gallons", status: "Active" },
    { id: "UBT-003", name: "Internet", description: "Broadband internet service", unit: "Flat Rate", status: "Active" },
    { id: "UBT-004", name: "Gas", description: "Cooking gas consumption", unit: "Cubic Meters", status: "Active" },
    { id: "UBT-005", name: "Trash Collection", description: "Monthly waste management", unit: "Flat Rate", status: "Active" },
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
          <ThemeIcon size="md" variant="light" color="cyan" radius="md">
            <IconDroplet size={18} />
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
        <Badge color="blue" variant="light">
          {element.unit}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Badge color={element.status === 'Active' ? 'green' : 'gray'} variant="light">
          {element.status}
        </Badge>
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
          <Title order={2} c="#014F86">{t.title}</Title>
          <Text c="dimmed" size="sm">{t.subtitle}</Text>
        </Stack>
        <Button leftSection={<IconPlus size={16} />} color="#014F86" radius="md">
          {t.addNew}
        </Button>
      </Group>

      <Paper p="md" radius="md" withBorder shadow="sm">
        <Group justify="space-between" mb="xs">
          <TextInput
            placeholder={t.searchPlaceholder}
            leftSection={<IconSearch size={16} />}
            size="md"
            radius="md"
            w={300}
          />
          <ActionIcon 
            variant={showFilters ? "filled" : "outline"} 
            color={showFilters ? "#014F86" : "gray"} 
            size="lg" 
            radius="md"
            style={{ border: '1px solid #dee2e6' }}
            onClick={() => setShowFilters(!showFilters)}
          >
            <IconFilter size={18} stroke={1.5} />
          </ActionIcon>
        </Group>

        <Collapse in={showFilters}>
          <Box mt="md" mb="md" p="md" style={{ backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
            <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="md">
              <Select
                label={<Text fw={600} size="sm" mb={5}>Status</Text>}
                placeholder="Status"
                data={["Active", "Inactive"]}
                size="md"
                radius="md"
                clearable
              />
            </SimpleGrid>
          </Box>
        </Collapse>

        <Table verticalSpacing="md" highlightOnHover mt="sm">
          <Table.Thead bg="#014F86">
            <Table.Tr>
              <Th sorted={sortConfig?.key === 'name'} reversed={sortConfig?.direction === 'desc'} onSort={() => handleSort('name')}>{t.columns.name}</Th>
              <Th sorted={sortConfig?.key === 'description'} reversed={sortConfig?.direction === 'desc'} onSort={() => handleSort('description')}>{t.columns.description}</Th>
              <Th sorted={sortConfig?.key === 'unit'} reversed={sortConfig?.direction === 'desc'} onSort={() => handleSort('unit')}>{t.columns.unit}</Th>
              <Th sorted={sortConfig?.key === 'status'} reversed={sortConfig?.direction === 'desc'} onSort={() => handleSort('status')}>{t.columns.status}</Th>
              <Table.Th c="white" style={{ padding: '8px' }}><Text fw={600} size="sm">{t.columns.actions}</Text></Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {rows}
          </Table.Tbody>
        </Table>

        <Group justify="space-between" mt="md">
          <Text size="sm" c="dimmed">Showing 1 to 5 of 5 entries</Text>
          <Pagination value={activePage} onChange={setPage} total={1} color="#014F86" radius="md" />
        </Group>
      </Paper>
    </Stack>
  );
}
