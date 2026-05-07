"use client";

import { useState } from "react";
import {   Title, Text, Stack, Paper, Group, ThemeIcon, Button, Table, TextInput, ActionIcon, Badge , Pagination , UnstyledButton, Center, Box, SimpleGrid, Select } from "@mantine/core";
import {  IconUsers, IconEye, IconEdit, IconTrash, IconPlus , IconSelector, IconChevronUp, IconChevronDown } from "@tabler/icons-react";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";

export default function FamilyMembersPage() {
  const [sortConfig, setSortConfig] = useState<{ key: string, direction: 'asc' | 'desc' } | null>(null);
  const [memberNameFilter, setMemberNameFilter] = useState<string | null>(null);
  const [primaryResidentFilter, setPrimaryResidentFilter] = useState<string | null>(null);
  const [unitFilter, setUnitFilter] = useState<string | null>(null);

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const [activePage, setPage] = useState(1);
  const itemsPerPage = 5;

  const { lang, mounted } = useTranslation();

  const mockData = [
    { id: "FAM-001", name: "Mg Aung Myint", relation: "Son", primaryResident: "U Aung Aung", unit: "A-101", age: 18, status: "Active" },
    { id: "FAM-002", name: "Ma Su Mon", relation: "Daughter", primaryResident: "Daw Su Su", unit: "B-205", age: 22, status: "Active" },
    { id: "FAM-003", name: "Daw Mya Sein", relation: "Mother", primaryResident: "U Kyaw Min", unit: "C-304", age: 65, status: "Active" },
    { id: "FAM-004", name: "Mg Thura", relation: "Son", primaryResident: "Daw Hla Hla", unit: "A-502", age: 15, status: "Active" },
    { id: "FAM-005", name: "Ma Khin Myo", relation: "Spouse", primaryResident: "U Zaw Myo", unit: "D-102", age: 35, status: "Active" },
  ];

  const memberNames = Array.from(new Set(mockData.map(e => e.name)));
  const primaryResidents = Array.from(new Set(mockData.map(e => e.primaryResident)));
  const unitNumbers = Array.from(new Set(mockData.map(e => e.unit)));

  const filteredData = mockData.filter(item => {
    const matchesName = !memberNameFilter || item.name === memberNameFilter;
    const matchesPrimary = !primaryResidentFilter || item.primaryResident === primaryResidentFilter;
    const matchesUnit = !unitFilter || item.unit === unitFilter;
    return matchesName && matchesPrimary && matchesUnit;
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

  const t = {
    en: {
      title: "Family Members",
      subtitle: "Manage family members and additional residents for each unit.",
      comingSoon: "Family member management is coming soon.",
    },
    mm: {
      title: "မိသားစုဝင်များ",
      subtitle: "ယူနစ်တစ်ခုစီအတွက် မိသားစုဝင်များနှင့် ထပ်တိုးနေထိုင်သူများကို စီမံခန့်ခွဲပါ။",
      comingSoon: "မိသားစုဝင်စီမံခန့်ခွဲမှုအသေးစိတ်အား မကြာမီ ရရှိနိုင်တော့မည်ဖြစ်သည်။",
    },
  }[lang === "mm" ? "mm" : "en"];

  return (
    <Stack gap="xl" p="md">
      <Group justify="space-between">
        <Stack gap={4}>
          <Title order={2} c="#014F86">{t.title}</Title>
          <Text c="dimmed" size="sm">{t.subtitle}</Text>
        </Stack>
        <Button leftSection={<IconPlus size={16} />} color="#014F86" radius="md">
          Add New
        </Button>
      </Group>

      <Paper p="md" radius="md" withBorder shadow="sm">
        <Box mb="xl" p="md" style={{ backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="md">
            <Select
              label={<Text fw={700} size="xs" mb={5}>Member Name</Text>}
              placeholder="Select Member"
              data={memberNames}
              size="sm"
              radius="md"
              clearable
              searchable
              value={memberNameFilter}
              onChange={setMemberNameFilter}
              styles={{ input: { backgroundColor: '#fff' } }}
            />
            <Select
              label={<Text fw={700} size="xs" mb={5}>Primary Resident</Text>}
              placeholder="Select Resident"
              data={primaryResidents}
              size="sm"
              radius="md"
              clearable
              searchable
              value={primaryResidentFilter}
              onChange={setPrimaryResidentFilter}
              styles={{ input: { backgroundColor: '#fff' } }}
            />
            <Select
              label={<Text fw={700} size="xs" mb={5}>Unit</Text>}
              placeholder="Select Unit"
              data={unitNumbers}
              size="sm"
              radius="md"
              clearable
              searchable
              value={unitFilter}
              onChange={setUnitFilter}
              styles={{ input: { backgroundColor: '#fff' } }}
            />
          </SimpleGrid>
        </Box>

        <Table verticalSpacing="md" highlightOnHover>
          <Table.Thead bg="#014F86">
            <Table.Tr>
              <Table.Th fw={700} fz="sm" c="white">
                <UnstyledButton onClick={() => handleSort('id')} style={{ width: '100%', color: 'inherit' }}>
                  <Group justify="space-between" wrap="nowrap">
                    <span>ID</span>
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
                    <span>Member Name</span>
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
                <UnstyledButton onClick={() => handleSort('relation')} style={{ width: '100%', color: 'inherit' }}>
                  <Group justify="space-between" wrap="nowrap">
                    <span>Relation</span>
                    <Center>
                      {sortConfig?.key === 'relation' ? (
                        sortConfig.direction === 'asc' ? <IconChevronUp size={14} /> : <IconChevronDown size={14} />
                      ) : (
                        <IconSelector size={14} color="gray" />
                      )}
                    </Center>
                  </Group>
                </UnstyledButton>
              </Table.Th>
              <Table.Th fw={700} fz="sm" c="white">
                <UnstyledButton onClick={() => handleSort('primaryResident')} style={{ width: '100%', color: 'inherit' }}>
                  <Group justify="space-between" wrap="nowrap">
                    <span>Primary Resident</span>
                    <Center>
                      {sortConfig?.key === 'primaryResident' ? (
                        sortConfig.direction === 'asc' ? <IconChevronUp size={14} /> : <IconChevronDown size={14} />
                      ) : (
                        <IconSelector size={14} color="gray" />
                      )}
                    </Center>
                  </Group>
                </UnstyledButton>
              </Table.Th>
              <Table.Th fw={700} fz="sm" c="white">Unit</Table.Th>
              <Table.Th fw={700} fz="sm" c="white">Status</Table.Th>
              <Table.Th fw={700} fz="sm" c="white" ta="right">Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {sortedData.slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage).map((item) => (
              <Table.Tr key={item.id}>
                <Table.Td>
                  <Text size="sm" fw={700}>{item.id}</Text>
                </Table.Td>
                <Table.Td>
                  <Group gap="sm">
                    <ThemeIcon size="md" variant="light" color="cyan" radius="md">
                      <IconUsers size={18} />
                    </ThemeIcon>
                    <Stack gap={0}>
                      <Text size="sm" fw={500}>{item.name}</Text>
                      <Text size="xs" c="dimmed">Age: {item.age}</Text>
                    </Stack>
                  </Group>
                </Table.Td>
                <Table.Td>
                  <Text size="sm">{item.relation}</Text>
                </Table.Td>
                <Table.Td>
                  <Text size="sm" fw={500}>{item.primaryResident}</Text>
                </Table.Td>
                <Table.Td>
                  <Text size="sm" fw={500}>{item.unit}</Text>
                </Table.Td>
                <Table.Td>
                  <Badge variant="light" color={item.status === 'Active' ? 'green' : 'gray'} fw={700}>
                    {item.status}
                  </Badge>
                </Table.Td>
                <Table.Td>
                  <Group gap={4} justify="flex-end">
                    <ActionIcon component={Link} href={`/dashboard/residents/family/${item.id}`} variant="subtle" color="gray"><IconEye size={16} /></ActionIcon>
                    <ActionIcon variant="subtle" color="blue"><IconEdit size={16} /></ActionIcon>
                    <ActionIcon variant="subtle" color="red"><IconTrash size={16} /></ActionIcon>
                  </Group>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
        <Group justify="space-between" mt="md">
          <Text size="sm" c="dimmed">
            Showing {((activePage - 1) * itemsPerPage) + 1} to {Math.min(activePage * itemsPerPage, mockData.length)} of {mockData.length} entries
          </Text>
          <Pagination total={Math.ceil(mockData.length / itemsPerPage)} value={activePage} onChange={setPage} color="#014F86" />
        </Group>
      
      </Paper>
    </Stack>
  );
}
