"use client";

import { useState } from "react";
import {   Title, Paper, Table, Group, Button, TextInput, Stack, Text, ThemeIcon, ActionIcon, Badge , Pagination , UnstyledButton, Center, Collapse, Box, SimpleGrid, Select } from "@mantine/core";
import {  IconPlus, IconSearch, IconEye, IconEdit, IconTrash, IconBuilding , IconSelector, IconChevronUp, IconChevronDown, IconFilter } from "@tabler/icons-react";
import Link from "next/link";
import { useTranslation } from "@/hooks/useTranslation";

const elements = [
  { id: "BLD-001", name: "Tower A", floors: 24, units: 96, status: "Active", color: "blue" },
  { id: "BLD-002", name: "Tower B", floors: 24, units: 96, status: "Active", color: "blue" },
  { id: "BLD-003", name: "Tower C", floors: 12, units: 48, status: "Under Maintenance", color: "orange" },
];

const translations = {
  en: {
    title: "Buildings / Towers",
    subtitle: "Manage and monitor all building structures within the property.",
    addBtn: "Add Building",
    searchPlaceholder: "Search buildings by name or ID...",
    thBuilding: "Building Name",
    thFloors: "Total Floors",
    thUnits: "Total Units",
    thStatus: "Status",
    thActions: "Actions",
    status: {
      "Active": "Active",
      "Under Maintenance": "Under Maintenance"
    }
  },
  mm: {
    title: "အဆောက်အဦးများ / မျှော်စင်များ",
    subtitle: "အိမ်ခြံမြေအတွင်းရှိ အဆောက်အဦးတည်ဆောက်ပုံအားလုံးကို စီမံခန့်ခွဲပြီး စောင့်ကြည့်ပါ။",
    addBtn: "အဆောက်အဦးအသစ်ထည့်ရန်",
    searchPlaceholder: "အဆောက်အဦးအမည် သို့မဟုတ် ID ဖြင့် ရှာဖွေရန်...",
    thBuilding: "အဆောက်အဦးအမည်",
    thFloors: "စုစုပေါင်းအလွှာ",
    thUnits: "စုစုပေါင်းယူနစ်",
    thStatus: "အခြေအနေ",
    thActions: "လုပ်ဆောင်ချက်များ",
    status: {
      "Active": "အသုံးပြုဆဲ",
      "Under Maintenance": "ပြုပြင်ထိန်းသိမ်းဆဲ"
    }
  }
};

export default function BuildingsPage() {
  const [sortConfig, setSortConfig] = useState<{ key: string, direction: 'asc' | 'desc' } | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

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
  const t = translations[lang as keyof typeof translations] || translations.en;

  

  const rows = sortedData.map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td>
        <Group gap="sm">
          <ThemeIcon size="md" variant="light" color={element.color} radius="md">
            <IconBuilding size={18} />
          </ThemeIcon>
          <Stack gap={0}>
            <Text size="sm" fw={700}>{element.name}</Text>
            <Text size="xs" c="dimmed">{element.id}</Text>
          </Stack>
        </Group>
      </Table.Td>
      <Table.Td>
        <Text size="sm" fw={500}>{element.floors}</Text>
      </Table.Td>
      <Table.Td>
        <Text size="sm" fw={500}>{element.units}</Text>
      </Table.Td>
      <Table.Td>
        <Badge 
          variant="dot" 
          color={element.status === "Active" ? "green" : "orange"}
          fw={700}
        >
          {t.status[element.status as keyof typeof t.status] || element.status}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Group gap={4} justify="flex-end">
          <ActionIcon component={Link} href={`/dashboard/buildings/${element.id}`} variant="subtle" color="gray"><IconEye size={16} /></ActionIcon>
          <ActionIcon variant="subtle" color="blue"><IconEdit size={16} /></ActionIcon>
          <ActionIcon variant="subtle" color="red"><IconTrash size={16} /></ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Stack gap="xl" p="md">
      <Group justify="space-between">
        <Stack gap={4}>
          <Title order={2} c="#014F86">{t.title}</Title>
          <Text c="dimmed" size="sm" fw={500}>{t.subtitle}</Text>
        </Stack>
        <Button leftSection={<IconPlus size={16} />} color="#014F86" radius="md">{t.addBtn}</Button>
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
                label={<Text fw={600} size="sm" mb={5}>{t.thStatus}</Text>}
                placeholder={t.thStatus}
                data={["Active", "Under Maintenance"]}
                size="md"
                radius="md"
                clearable
                value={statusFilter}
                onChange={setStatusFilter}
              />
            </SimpleGrid>
          </Box>
        </Collapse>

        <Table verticalSpacing="md" highlightOnHover mt="sm">
          <Table.Thead bg="#014F86">
            <Table.Tr>
              <Table.Th fw={700} fz="sm" c="white">
                <UnstyledButton onClick={() => handleSort('id')} style={{ width: '100%', color: 'inherit' }}>
                  <Group justify="space-between" wrap="nowrap">
                    <span>{t.thBuilding}</span>
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
              <Table.Th fw={700} fz="sm" c="white">
                <UnstyledButton onClick={() => handleSort('name')} style={{ width: '100%', color: 'inherit' }}>
                  <Group justify="space-between" wrap="nowrap">
                    <span>{t.thFloors}</span>
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
              <Table.Th fw={700} fz="sm" c="white">
                <UnstyledButton onClick={() => handleSort('floors')} style={{ width: '100%', color: 'inherit' }}>
                  <Group justify="space-between" wrap="nowrap">
                    <span>{t.thUnits}</span>
                    <Center>
                      {sortConfig?.key === 'floors' ? (
                        sortConfig.direction === 'asc' ? <IconChevronUp size={14} /> : <IconChevronDown size={14} />
                      ) : (
                        <IconSelector size={14} color="gray" />
                      )}
                    </Center>
                  </Group>
                </UnstyledButton>
              </Table.Th>
              <Table.Th fw={700} fz="sm" c="white">
                <UnstyledButton onClick={() => handleSort('units')} style={{ width: '100%', color: 'inherit' }}>
                  <Group justify="space-between" wrap="nowrap">
                    <span>{t.thStatus}</span>
                    <Center>
                      {sortConfig?.key === 'units' ? (
                        sortConfig.direction === 'asc' ? <IconChevronUp size={14} /> : <IconChevronDown size={14} />
                      ) : (
                        <IconSelector size={14} color="gray" />
                      )}
                    </Center>
                  </Group>
                </UnstyledButton>
              </Table.Th>
              <Table.Th fw={700} fz="sm" c="white" ta="right">{t.thActions}</Table.Th>
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
