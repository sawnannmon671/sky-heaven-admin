"use client";

import { useState } from "react";
import {   Title, Paper, Table, Group, Button, TextInput, Stack, Text, ThemeIcon, ActionIcon, Badge, Select , Pagination , UnstyledButton, Center, Collapse, Box, SimpleGrid } from "@mantine/core";
import {  IconPlus, IconSearch, IconEye, IconEdit, IconTrash, IconLayersIntersect , IconSelector, IconChevronUp, IconChevronDown, IconFilter } from "@tabler/icons-react";
import Link from "next/link";
import { useTranslation } from "@/hooks/useTranslation";

const elements = [
  { id: "FL-A-01", building: "Tower A", floor: "Floor 1", units: 4, type: "Residential", color: "blue" },
  { id: "FL-A-02", building: "Tower A", floor: "Floor 2", units: 4, type: "Residential", color: "blue" },
  { id: "FL-B-PH", building: "Tower B", floor: "Penthouse", units: 2, type: "Premium", color: "violet" },
];

const translations = {
  en: {
    title: "Floors",
    subtitle: "Manage and monitor individual floors across all buildings.",
    addBtn: "Add Floor",
    searchPlaceholder: "Search floors...",
    filterBuilding: "All Buildings",
    thFloor: "Floor Name",
    thBuilding: "Building",
    thUnits: "Total Units",
    thType: "Floor Type",
    thActions: "Actions",
    types: {
      "Residential": "Residential",
      "Premium": "Premium",
      "Commercial": "Commercial"
    }
  },
  mm: {
    title: "အလွှာများ",
    subtitle: "အဆောက်အဦးအားလုံးရှိ တစ်ခုချင်းစီသောအလွှာများကို စီမံခန့်ခွဲပြီး စောင့်ကြည့်ပါ။",
    addBtn: "အလွှာအသစ်ထည့်ရန်",
    searchPlaceholder: "အလွှာများ ရှာဖွေရန်...",
    filterBuilding: "အဆောက်အဦးအားလုံး",
    thFloor: "အလွှာအမည်",
    thBuilding: "အဆောက်အဦး",
    thUnits: "စုစုပေါင်းယူနစ်",
    thType: "အလွှာအမျိုးအစား",
    thActions: "လုပ်ဆောင်ချက်များ",
    types: {
      "Residential": "နေထိုင်ရန်",
      "Premium": "ပရီမီယံ",
      "Commercial": "စီးပွားရေး"
    }
  }
};

export default function FloorsPage() {
  const [sortConfig, setSortConfig] = useState<{ key: string, direction: 'asc' | 'desc' } | null>(null);
  const [buildingFilter, setBuildingFilter] = useState<string | null>(null);
  const [floorNameFilter, setFloorNameFilter] = useState<string | null>(null);
  const [floorTypeFilter, setFloorTypeFilter] = useState<string | null>(null);

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const buildingNames = Array.from(new Set(elements.map(e => e.building)));
  const floorNames = Array.from(new Set(elements.map(e => e.floor)));
  const floorTypes = Array.from(new Set(elements.map(e => e.type)));

  const filteredData = elements.filter(item => {
    const matchesBuilding = !buildingFilter || item.building === buildingFilter;
    const matchesName = !floorNameFilter || item.floor === floorNameFilter;
    const matchesType = !floorTypeFilter || item.type === floorTypeFilter;
    return matchesBuilding && matchesName && matchesType;
  });

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortConfig) return 0;
    const { key, direction } = sortConfig;
    const aValue = a[key as keyof typeof a];
    const bValue = b[key as keyof typeof b];
    if (aValue < bValue) return direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return direction === 'asc' ? 1 : -1;
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
            <IconLayersIntersect size={18} />
          </ThemeIcon>
          <Stack gap={0}>
            <Text size="sm" fw={700}>{element.floor}</Text>
            <Text size="xs" c="dimmed">{element.id}</Text>
          </Stack>
        </Group>
      </Table.Td>
      <Table.Td>
        <Text size="sm" fw={500}>{element.building}</Text>
      </Table.Td>
      <Table.Td>
        <Text size="sm" fw={500}>{element.units}</Text>
      </Table.Td>
      <Table.Td>
        <Badge variant="light" color={element.color} fw={700}>
          {t.types[element.type as keyof typeof t.types] || element.type}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Group gap={4} justify="flex-end">
          <ActionIcon component={Link} href={`/dashboard/floors/${element.id}`} variant="subtle" color="gray"><IconEye size={16} /></ActionIcon>
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
        <Box mb="xl" p="md" style={{ backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="md">
            <Select
              label={<Text fw={700} size="xs" mb={5}>{t.thBuilding}</Text>}
              placeholder="Select Building"
              data={buildingNames}
              size="sm"
              radius="md"
              clearable
              searchable
              value={buildingFilter}
              onChange={setBuildingFilter}
              styles={{ input: { backgroundColor: '#fff' } }}
            />
            <Select
              label={<Text fw={700} size="xs" mb={5}>{t.thFloor}</Text>}
              placeholder="Select Floor"
              data={floorNames}
              size="sm"
              radius="md"
              clearable
              searchable
              value={floorNameFilter}
              onChange={setFloorNameFilter}
              styles={{ input: { backgroundColor: '#fff' } }}
            />
            <Select
              label={<Text fw={700} size="xs" mb={5}>{t.thType}</Text>}
              placeholder="Select Type"
              data={floorTypes}
              size="sm"
              radius="md"
              clearable
              value={floorTypeFilter}
              onChange={setFloorTypeFilter}
              styles={{ input: { backgroundColor: '#fff' } }}
            />
          </SimpleGrid>
        </Box>

        <Table verticalSpacing="md" highlightOnHover mt="sm">
          <Table.Thead bg="#014F86">
            <Table.Tr>
              <Table.Th fw={700} fz="sm" c="white">
                <UnstyledButton onClick={() => handleSort('id')} style={{ width: '100%', color: 'inherit' }}>
                  <Group justify="space-between" wrap="nowrap">
                    <span>{t.thFloor}</span>
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
                <UnstyledButton onClick={() => handleSort('building')} style={{ width: '100%', color: 'inherit' }}>
                  <Group justify="space-between" wrap="nowrap">
                    <span>{t.thBuilding}</span>
                    <Center>
                      {sortConfig?.key === 'building' ? (
                        sortConfig.direction === 'asc' ? <IconChevronUp size={14} /> : <IconChevronDown size={14} />
                      ) : (
                        <IconSelector size={14} color="gray" />
                      )}
                    </Center>
                  </Group>
                </UnstyledButton>
              </Table.Th>
              <Table.Th fw={700} fz="sm" c="white">
                <UnstyledButton onClick={() => handleSort('floor')} style={{ width: '100%', color: 'inherit' }}>
                  <Group justify="space-between" wrap="nowrap">
                    <span>{t.thUnits}</span>
                    <Center>
                      {sortConfig?.key === 'floor' ? (
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
                    <span>{t.thType}</span>
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
