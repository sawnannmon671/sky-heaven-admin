"use client";

import { useState } from "react";
import { Title, Paper, Table, Group, Button, Badge, Stack, Text, Avatar, TextInput, ActionIcon, Pagination, UnstyledButton, Center, Select, Collapse, Box, SimpleGrid } from "@mantine/core";
import {  IconUserPlus, IconSearch, IconEye, IconTrash, IconClock, IconUserCheck, IconUserMinus , IconSelector, IconChevronUp, IconChevronDown, IconFilter } from "@tabler/icons-react";
import { useTranslation } from "@/hooks/useTranslation";

const elements = [
  { id: "1", name: "U Kyaw Swar", unit: "A-101", purpose: "Guest", checkIn: "10:30 AM", status: "Checked In", color: "cyan" },
  { id: "2", name: "Daw Ni Ni", unit: "B-205", purpose: "Delivery", checkIn: "09:15 AM", status: "Checked Out", color: "pink" },
  { id: "3", name: "Ko Htun", unit: "C-304", purpose: "Maintenance", checkIn: "11:00 AM", status: "Checked In", color: "orange" },
  { id: "4", name: "Ma Hlaing", unit: "A-502", purpose: "Guest", checkIn: "01:30 PM", status: "Checked In", color: "teal" },
  { id: "5", name: "U Zaw", unit: "D-102", purpose: "Delivery", checkIn: "03:45 PM", status: "Checked Out", color: "indigo" },
];

const translations = {
  en: {
    title: "Visitor Log",
    subtitle: "Monitor and manage visitor access to the property.",
    addBtn: "Register Visitor",
    searchPlaceholder: "Search visitors by name, unit or purpose...",
    unitPrefix: "Unit",
    table: {
      name: "Visitor Name",
      unit: "Unit",
      purpose: "Purpose",
      checkIn: "Check In",
      status: "Status",
      actions: "Actions",
    },
    purposes: {
      Delivery: "Delivery",
      Guest: "Guest",
      Maintenance: "Maintenance",
    },
    statuses: {
      "Checked In": "Checked In",
      "Checked Out": "Checked Out",
    },
    actions: {
      checkOut: "Check Out",
      reEntry: "Re-entry",
    },
  },
  mm: {
    title: "ဧည့်သည်မှတ်တမ်း",
    subtitle: "အိမ်ခြံမြေအတွင်း ဧည့်သည်များ ဝင်ထွက်သွားလာမှုကို စောင့်ကြည့်စီမံပါ။",
    addBtn: "ဧည့်သည်စာရင်းသွင်းရန်",
    searchPlaceholder: "အမည်၊ အခန်းနံပါတ် သို့မဟုတ် အကြောင်းအရာဖြင့် ရှာဖွေရန်...",
    unitPrefix: "အခန်း",
    table: {
      name: "ဧည့်သည်အမည်",
      unit: "အခန်း",
      purpose: "လာရောက်သည့်အကြောင်းအရာ",
      checkIn: "ဝင်ရောက်သည့်အချိန်",
      status: "အခြေအနေ",
      actions: "လုပ်ဆောင်ချက်များ",
    },
    purposes: {
      Delivery: "ပစ္စည်းပို့ဆောင်မှု",
      Guest: "ဧည့်သည်",
      Maintenance: "ပြုပြင်ထိန်းသိမ်းမှု",
    },
    statuses: {
      "Checked In": "ဝင်ရောက်ထား",
      "Checked Out": "ထွက်ခွာပြီး",
    },
    actions: {
      checkOut: "ထွက်ခွာရန်",
      reEntry: "ပြန်လည်ဝင်ရောက်ရန်",
    },
  },
};

export default function VisitorsPage() {
  const [sortConfig, setSortConfig] = useState<{ key: string, direction: 'asc' | 'desc' } | null>(null);
  const [purposeFilter, setPurposeFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const filteredData = elements.filter(item => {
    const matchesPurpose = !purposeFilter || item.purpose === purposeFilter;
    const matchesStatus = !statusFilter || item.status === statusFilter;
    return matchesPurpose && matchesStatus;
  });

  const sortedData = [...filteredData].sort((a, b) => {
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
          <Avatar size="sm" radius="xl" color={element.color}>{element.name.charAt(0)}</Avatar>
          <Text size="sm" fw={500}>{element.name}</Text>
        </Group>
      </Table.Td>
      <Table.Td>{t.unitPrefix} {element.unit}</Table.Td>
      <Table.Td>
        <Badge variant="light" color="gray">
          {t.purposes[element.purpose as keyof typeof t.purposes] || element.purpose}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Group gap={4}>
          <IconClock size={14} style={{ color: "var(--mantine-color-dimmed)" }} />
          <Text size="sm">{element.checkIn}</Text>
        </Group>
      </Table.Td>
      <Table.Td>
        <Badge variant="dot" color={element.status === "Checked In" ? "green" : "gray"}>
          {t.statuses[element.status as keyof typeof t.statuses] || element.status}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Group gap={4} justify="flex-end">
          <ActionIcon variant="subtle" color="gray"><IconEye size={16} /></ActionIcon>
          {element.status === "Checked In" ? (
            <Button variant="subtle" size="xs" color="red" leftSection={<IconUserMinus size={14} />}>
              {t.actions.checkOut}
            </Button>
          ) : (
            <Button variant="subtle" size="xs" color="blue" leftSection={<IconUserCheck size={14} />}>
              {t.actions.reEntry}
            </Button>
          )}
          <ActionIcon variant="subtle" color="red"><IconTrash size={16} /></ActionIcon>
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
        <Button leftSection={<IconUserPlus size={16} />} color="#014F86">{t.addBtn}</Button>
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
                label={<Text fw={600} size="sm" mb={5">Purpose</Text>}
                placeholder="Purpose"
                data={["Delivery", "Guest", "Maintenance"]}
                size="md"
                radius="md"
                clearable
                value={purposeFilter}
                onChange={setPurposeFilter}
              />
              <Select
                label={<Text fw={600} size="sm" mb={5">Status</Text>}
                placeholder="Status"
                data={["Checked In", "Checked Out"]}
                size="md"
                radius="md"
                clearable
                value={statusFilter}
                onChange={setStatusFilter}
              />
            </SimpleGrid>
          </Box>
        </Collapse>

        <Table verticalSpacing="sm" highlightOnHover mt="sm">
          <Table.Thead bg="#014F86">
            <Table.Tr>
              <Table.Th c="white">
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
              <Table.Th c="white">
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
              <Table.Th c="white">
                <UnstyledButton onClick={() => handleSort('unit')} style={{ width: '100%', color: 'inherit' }}>
                  <Group justify="space-between" wrap="nowrap">
                    <span>{t.table.purpose}</span>
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
              <Table.Th c="white">
                <UnstyledButton onClick={() => handleSort('purpose')} style={{ width: '100%', color: 'inherit' }}>
                  <Group justify="space-between" wrap="nowrap">
                    <span>{t.table.checkIn}</span>
                    <Center>
                      {sortConfig?.key === 'purpose' ? (
                        sortConfig.direction === 'asc' ? <IconChevronUp size={14} /> : <IconChevronDown size={14} />
                      ) : (
                        <IconSelector size={14} color="gray" />
                      )}
                    </Center>
                  </Group>
                </UnstyledButton>
              </Table.Th>
              <Table.Th c="white">{t.table.status}</Table.Th>
              <Table.Th c="white" ta="right">{t.table.actions}</Table.Th>
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
