"use client";

import { useState } from "react";
import {   Title, Text, Stack, Paper, Group, ThemeIcon, Button, Table, TextInput, ActionIcon, Badge , Pagination , UnstyledButton, Center, Box, SimpleGrid, Select } from "@mantine/core";
import {  IconCalendarStats, IconChevronLeft, IconSearch, IconEye, IconEdit, IconTrash, IconPlus , IconSelector, IconChevronUp, IconChevronDown } from "@tabler/icons-react";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";

export default function PreventiveMaintenancePage() {
  const [sortConfig, setSortConfig] = useState<{ key: string, direction: 'asc' | 'desc' } | null>(null);
  const [locationFilter, setLocationFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

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

  

  const t = {
    en: {
      title: "Schedule Preventive Maintenance",
      subtitle: "Plan and schedule regular maintenance for property facilities.",
      back: "Back to Maintenance",
      comingSoon: "Preventive maintenance scheduling is coming soon.",
    },
    mm: {
      title: "ကြိုတင်ထိန်းသိမ်းမှုအချိန်ဇယား",
      subtitle: "အဆောက်အဦးအသုံးအဆောင်များအတွက် ပုံမှန်ပြုပြင်ထိန်းသိမ်းမှုများကို စီစဉ်ပြီး အချိန်ဇယားဆွဲပါ။",
      back: "ပြုပြင်ထိန်းသိမ်းမှုစာမျက်နှာသို့ ပြန်သွားရန်",
      comingSoon: "ကြိုတင်ထိန်းသိမ်းမှုစီစဉ်ခြင်းစနစ်အား မကြာမီ ရရှိနိုင်တော့မည်ဖြစ်သည်။",
    },
  }[lang === "mm" ? "mm" : "en"];

const mockData = [
    { id: "PM-001", equipment: "Main Elevator", location: "Block A", frequency: "Monthly", nextDue: "2024-11-01", status: "Scheduled" },
    { id: "PM-002", equipment: "Water Pump", location: "Basement", frequency: "Quarterly", nextDue: "2024-10-25", status: "Upcoming" },
    { id: "PM-003", equipment: "Fire Extinguishers", location: "All Floors", frequency: "Annually", nextDue: "2024-12-15", status: "Scheduled" },
    { id: "PM-004", equipment: "HVAC System", location: "Roof", frequency: "Bi-annually", nextDue: "2024-10-10", status: "Overdue" },
    { id: "PM-005", equipment: "Generator", location: "Basement", frequency: "Monthly", nextDue: "2024-11-05", status: "Scheduled" },
  ];

  const locations = Array.from(new Set(mockData.map(e => e.location)));

  const filteredData = mockData.filter(item => {
    const matchesLocation = !locationFilter || item.location === locationFilter;
    const matchesStatus = !statusFilter || item.status === statusFilter;
    const matchesSearch = !searchQuery || 
      item.equipment.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLocation && matchesStatus && matchesSearch;
  });

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortConfig) return 0;
    const { key, direction } = sortConfig;
    if (a[key as keyof typeof a] < b[key as keyof typeof b]) return direction === 'asc' ? -1 : 1;
    if (a[key as keyof typeof a] > b[key as keyof typeof b]) return direction === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <Stack gap="xl" p="md">
      <Group justify="space-between">
        <Stack gap={4}>
          <Title order={2} c="#014F86">{t.title}</Title>
          <Text c="dimmed" size="sm">{t.subtitle}</Text>
        </Stack>
        <Group gap="sm">
          <Button 
            component={Link} 
            href="/dashboard/maintenance" 
            variant="subtle" 
            leftSection={<IconChevronLeft size={16} />}
            color="gray"
          >
            {t.back}
          </Button>
          <Button leftSection={<IconPlus size={16} />} color="#014F86" radius="md">
            Add New
          </Button>
        </Group>
      </Group>

      <Paper p="md" radius="md" withBorder shadow="sm">
        <Box mb="xl" p="md" style={{ backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="md">
            <TextInput
              label={<Text fw={700} size="xs" mb={5}>Search Equipment</Text>}
              placeholder="Search by ID or Equipment"
              leftSection={<IconSearch size={16} />}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.currentTarget.value)}
              styles={{ input: { backgroundColor: 'white' } }}
            />
            <Select
              label={<Text fw={700} size="xs" mb={5}>Location</Text>}
              placeholder="Select Location"
              data={locations}
              value={locationFilter}
              onChange={setLocationFilter}
              clearable
              searchable
              styles={{ input: { backgroundColor: 'white' } }}
            />
            <Select
              label={<Text fw={700} size="xs" mb={5}>Status</Text>}
              placeholder="Select Status"
              data={['Scheduled', 'Upcoming', 'Overdue']}
              value={statusFilter}
              onChange={setStatusFilter}
              clearable
              styles={{ input: { backgroundColor: 'white' } }}
            />
          </SimpleGrid>
        </Box>

        <Table verticalSpacing="md" highlightOnHover>
          <Table.Thead bg="#014F86">
            <Table.Tr>
              <Table.Th fw={700} fz="sm" c="white">
                <UnstyledButton onClick={() => handleSort('id')} style={{ width: '100%', color: 'inherit' }}>
                  <Group justify="space-between" wrap="nowrap">
                    <span>PM ID</span>
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
                <UnstyledButton onClick={() => handleSort('equipment')} style={{ width: '100%', color: 'inherit' }}>
                  <Group justify="space-between" wrap="nowrap">
                    <span>Equipment & Location</span>
                    <Center>
                      {sortConfig?.key === 'equipment' ? (
                        sortConfig.direction === 'asc' ? <IconChevronUp size={14} /> : <IconChevronDown size={14} />
                      ) : (
                        <IconSelector size={14} color="gray" />
                      )}
                    </Center>
                  </Group>
                </UnstyledButton>
              </Table.Th>
              <Table.Th fw={700} fz="sm" c="white">
                <UnstyledButton onClick={() => handleSort('location')} style={{ width: '100%', color: 'inherit' }}>
                  <Group justify="space-between" wrap="nowrap">
                    <span>Frequency</span>
                    <Center>
                      {sortConfig?.key === 'location' ? (
                        sortConfig.direction === 'asc' ? <IconChevronUp size={14} /> : <IconChevronDown size={14} />
                      ) : (
                        <IconSelector size={14} color="gray" />
                      )}
                    </Center>
                  </Group>
                </UnstyledButton>
              </Table.Th>
              <Table.Th fw={700} fz="sm" c="white">
                <UnstyledButton onClick={() => handleSort('frequency')} style={{ width: '100%', color: 'inherit' }}>
                  <Group justify="space-between" wrap="nowrap">
                    <span>Next Due Date</span>
                    <Center>
                      {sortConfig?.key === 'frequency' ? (
                        sortConfig.direction === 'asc' ? <IconChevronUp size={14} /> : <IconChevronDown size={14} />
                      ) : (
                        <IconSelector size={14} color="gray" />
                      )}
                    </Center>
                  </Group>
                </UnstyledButton>
              </Table.Th>
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
                      <IconCalendarStats size={18} />
                    </ThemeIcon>
                    <Stack gap={0}>
                      <Text size="sm" fw={500}>{item.equipment}</Text>
                      <Text size="xs" c="dimmed">{item.location}</Text>
                    </Stack>
                  </Group>
                </Table.Td>
                <Table.Td>
                  <Text size="sm">{item.frequency}</Text>
                </Table.Td>
                <Table.Td>
                  <Text size="sm" fw={item.status === 'Overdue' ? 700 : 400} c={item.status === 'Overdue' ? 'red' : 'dark'}>{item.nextDue}</Text>
                </Table.Td>
                <Table.Td>
                  <Badge variant="light" color={item.status === 'Scheduled' ? 'blue' : item.status === 'Upcoming' ? 'cyan' : 'red'} fw={700}>
                    {item.status}
                  </Badge>
                </Table.Td>
                <Table.Td>
                  <Group gap={4} justify="flex-end">
                    <ActionIcon 
                      variant="subtle" 
                      color="gray" 
                      component={Link} 
                      href={`/dashboard/maintenance/preventive/${item.id}`}
                    >
                      <IconEye size={16} />
                    </ActionIcon>
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
