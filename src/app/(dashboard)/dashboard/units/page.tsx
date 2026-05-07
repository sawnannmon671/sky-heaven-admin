"use client";

import { useState } from "react";
import { Title, Paper, Table, Group, Button, TextInput, Badge, Stack, ActionIcon, Text, ThemeIcon, Pagination, UnstyledButton, Center, Tabs, Select, Collapse, Box, SimpleGrid } from "@mantine/core";
import {  IconPlus, IconSearch, IconEye, IconEdit, IconTrash, IconBuildingCommunity , IconSelector, IconChevronUp, IconChevronDown, IconFilter } from "@tabler/icons-react";
import Link from "next/link";
import { useTranslation } from "@/hooks/useTranslation";

const elements = [
  { id: "101", floor: 1, type: "Studio", status: "Occupied", resident: "John Doe", color: "blue" },
  { id: "102", floor: 1, type: "1 Bedroom", status: "Available", resident: "-", color: "green" },
  { id: "201", floor: 2, type: "2 Bedroom", status: "Occupied", resident: "Jane Smith", color: "blue" },
  { id: "305", floor: 3, type: "Penthouse", status: "Maintenance", resident: "-", color: "orange" },
];

const translations = {
  en: {
    title: "Units Management",
    subtitle: "Manage and monitor all property units and their status.",
    addBtn: "Add Unit",
    searchPlaceholder: "Search units by number, type or resident...",
    thUnitNumber: "Unit Number",
    thFloor: "Floor",
    thType: "Type",
    thStatus: "Status",
    thResident: "Resident",
    thActions: "Actions",
    status: {
      Occupied: "Occupied",
      Available: "Available",
      Maintenance: "Maintenance"
    },
    types: {
      "Studio": "Studio",
      "1 Bedroom": "1 Bedroom",
      "2 Bedroom": "2 Bedroom",
      "Penthouse": "Penthouse"
    }
  },
  mm: {
    title: "ယူနစ်စီမံခန့်ခွဲမှု",
    subtitle: "အိမ်ခြံမြေယူနစ်အားလုံးနှင့် ၎င်းတို့၏ အခြေအနေများကို စီမံခန့်ခွဲပြီး စောင့်ကြည့်ပါ။",
    addBtn: "ယူနစ်အသစ်ထည့်ရန်",
    searchPlaceholder: "ယူနစ်နံပါတ်၊ အမျိုးအစား သို့မဟုတ် နေထိုင်သူဖြင့် ရှာဖွေရန်...",
    thUnitNumber: "ယူနစ်နံပါတ်",
    thFloor: "အလွှာ",
    thType: "အမျိုးအစား",
    thStatus: "အခြေအနေ",
    thResident: "နေထိုင်သူ",
    thActions: "လုပ်ဆောင်ချက်များ",
    status: {
      Occupied: "နေထိုင်သူရှိသည်",
      Available: "အားသည်",
      Maintenance: "ပြုပြင်ထိန်းသိမ်းဆဲ"
    },
    types: {
      "Studio": "စတူဒီယို",
      "1 Bedroom": "အိပ်ခန်း ၁ ခန်း",
      "2 Bedroom": "အိပ်ခန်း ၂ ခန်း",
      "Penthouse": "ပင့်ဟောက်စ်"
    }
  }
};

export default function UnitsPage() {
  const [sortConfig, setSortConfig] = useState<{ key: string, direction: 'asc' | 'desc' } | null>(null);
  const [activeTab, setActiveTab] = useState<string | null>("All");
  const [unitNumberFilter, setUnitNumberFilter] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [floorFilter, setFloorFilter] = useState<string | null>(null);

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const unitNumbers = Array.from(new Set(elements.map(e => e.id)));
  const unitTypes = Array.from(new Set(elements.map(e => e.type)));
  const floors = Array.from(new Set(elements.map(e => e.floor.toString())));

  const filteredData = elements.filter(item => {
    const matchesTab = activeTab === "All" || item.status === activeTab;
    const matchesUnitNumber = !unitNumberFilter || item.id === unitNumberFilter;
    const matchesType = !typeFilter || item.type === typeFilter;
    const matchesFloor = !floorFilter || item.floor.toString() === floorFilter;
    return matchesTab && matchesUnitNumber && matchesType && matchesFloor;
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
  const t = translations[lang];

  const getCount = (status: string) => {
    if (status === "All") return elements.length;
    return elements.filter(item => item.status === status).length;
  };

  

  const rows = sortedData.map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td>
        <Group gap="sm">
          <ThemeIcon size="sm" variant="light" color={element.color}>
            <IconBuildingCommunity size={16} />
          </ThemeIcon>
          <Text size="sm" fw={500}>{element.id}</Text>
        </Group>
      </Table.Td>
      <Table.Td>{element.floor}</Table.Td>
      <Table.Td>{t.types[element.type as keyof typeof t.types] || element.type}</Table.Td>
      <Table.Td>
        <Badge 
          variant="dot" 
          color={element.status === "Occupied" ? "blue" : element.status === "Available" ? "green" : "orange"}
        >
          {t.status[element.status as keyof typeof t.status] || element.status}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Text size="sm" c={element.resident === "-" ? "dimmed" : "inherit"}>
          {element.resident}
        </Text>
      </Table.Td>
      <Table.Td>
        <Group gap={4} justify="flex-end">
          <ActionIcon component={Link} href={`/dashboard/units/${element.id}`} variant="subtle" color="gray">
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
    <Stack gap="xl" p="md">
      <Group justify="space-between">
        <Stack gap={0}>
          <Title order={2} c="#014F86">{t.title}</Title>
          <Text c="dimmed" size="sm">{t.subtitle}</Text>
        </Stack>
        <Button leftSection={<IconPlus size={16} />} color="#014F86">{t.addBtn}</Button>
      </Group>

      <Paper p="md" radius="md" withBorder shadow="sm">
        <Tabs value={activeTab} onChange={(val) => { setActiveTab(val); setPage(1); }} mb="xl" color="#014F86">
          <Tabs.List>
            <Tabs.Tab value="All">
              <Group gap="xs">
                <span>All Units</span>
                <Badge size="xs" variant="filled" color={activeTab === "All" ? "#014F86" : "gray"}>{getCount("All")}</Badge>
              </Group>
            </Tabs.Tab>
            <Tabs.Tab value="Occupied">
              <Group gap="xs">
                <span>{t.status.Occupied}</span>
                <Badge size="xs" variant="filled" color={activeTab === "Occupied" ? "#014F86" : "gray"}>{getCount("Occupied")}</Badge>
              </Group>
            </Tabs.Tab>
            <Tabs.Tab value="Available">
              <Group gap="xs">
                <span>{t.status.Available}</span>
                <Badge size="xs" variant="filled" color={activeTab === "Available" ? "#014F86" : "gray"}>{getCount("Available")}</Badge>
              </Group>
            </Tabs.Tab>
            <Tabs.Tab value="Maintenance">
              <Group gap="xs">
                <span>{t.status.Maintenance}</span>
                <Badge size="xs" variant="filled" color={activeTab === "Maintenance" ? "#014F86" : "gray"}>{getCount("Maintenance")}</Badge>
              </Group>
            </Tabs.Tab>
          </Tabs.List>
        </Tabs>

        <Box mb="xl" p="md" style={{ backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="md">
            <Select
              label={<Text fw={700} size="xs" mb={5}>{t.thUnitNumber}</Text>}
              placeholder="Select Unit"
              data={unitNumbers}
              size="sm"
              radius="md"
              clearable
              searchable
              value={unitNumberFilter}
              onChange={setUnitNumberFilter}
              styles={{ input: { backgroundColor: '#fff' } }}
            />
            <Select
              label={<Text fw={700} size="xs" mb={5}>{t.thFloor}</Text>}
              placeholder="Select Floor"
              data={floors}
              size="sm"
              radius="md"
              clearable
              searchable
              value={floorFilter}
              onChange={setFloorFilter}
              styles={{ input: { backgroundColor: '#fff' } }}
            />
            <Select
              label={<Text fw={700} size="xs" mb={5}>{t.thType}</Text>}
              placeholder="Select Type"
              data={unitTypes}
              size="sm"
              radius="md"
              clearable
              value={typeFilter}
              onChange={setTypeFilter}
              styles={{ input: { backgroundColor: '#fff' } }}
            />
          </SimpleGrid>
        </Box>

        <Table verticalSpacing="sm" highlightOnHover mt="sm">
          <Table.Thead bg="#014F86">
            <Table.Tr>
              <Table.Th c="white">
                <UnstyledButton onClick={() => handleSort('id')} style={{ width: '100%', color: 'inherit' }}>
                  <Group justify="space-between" wrap="nowrap">
                    <span>{t.thUnitNumber}</span>
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
                <UnstyledButton onClick={() => handleSort('floor')} style={{ width: '100%', color: 'inherit' }}>
                  <Group justify="space-between" wrap="nowrap">
                    <span>{t.thFloor}</span>
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
              <Table.Th c="white">
                <UnstyledButton onClick={() => handleSort('type')} style={{ width: '100%', color: 'inherit' }}>
                  <Group justify="space-between" wrap="nowrap">
                    <span>{t.thType}</span>
                    <Center>
                      {sortConfig?.key === 'type' ? (
                        sortConfig.direction === 'asc' ? <IconChevronUp size={14} /> : <IconChevronDown size={14} />
                      ) : (
                        <IconSelector size={14} color="gray" />
                      )}
                    </Center>
                  </Group>
                </UnstyledButton>
              </Table.Th>
              <Table.Th c="white">
                <UnstyledButton onClick={() => handleSort('status')} style={{ width: '100%', color: 'inherit' }}>
                  <Group justify="space-between" wrap="nowrap">
                    <span>{t.thStatus}</span>
                    <Center>
                      {sortConfig?.key === 'status' ? (
                        sortConfig.direction === 'asc' ? <IconChevronUp size={14} /> : <IconChevronDown size={14} />
                      ) : (
                        <IconSelector size={14} color="gray" />
                      )}
                    </Center>
                  </Group>
                </UnstyledButton>
              </Table.Th>
              <Table.Th c="white">{t.thResident}</Table.Th>
              <Table.Th c="white" ta="right">{t.thActions}</Table.Th>
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
