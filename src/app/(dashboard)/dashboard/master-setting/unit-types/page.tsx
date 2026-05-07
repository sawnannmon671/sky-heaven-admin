"use client";

import { useState } from "react";
import { Title, Paper, Table, Group, Button, TextInput, Stack, Text, ThemeIcon, ActionIcon, Badge, Pagination, UnstyledButton, Center, Box, SimpleGrid } from "@mantine/core";
import { IconPlus, IconSearch, IconEye, IconEdit, IconTrash, IconLayoutBoard, IconSelector, IconChevronUp, IconChevronDown } from "@tabler/icons-react";
import Link from "next/link";
import { useTranslation } from "@/hooks/useTranslation";

const elements = [
  { id: "TYP-STD", name: "Studio", size: "450 sqft", rooms: "1 Room", price: "$1,200", color: "blue" },
  { id: "TYP-1BR", name: "1 Bedroom", size: "750 sqft", rooms: "2 Rooms", price: "$1,800", color: "green" },
  { id: "TYP-2BR", name: "2 Bedroom", size: "1,100 sqft", rooms: "3 Rooms", price: "$2,500", color: "orange" },
  { id: "TYP-PNT", name: "Penthouse", size: "2,500 sqft", rooms: "5 Rooms", price: "$5,000", color: "violet" },
];

const translations = {
  en: {
    title: "Unit Types",
    subtitle: "Define and manage different unit configurations and pricing.",
    addBtn: "Add Unit Type",
    searchPlaceholder: "Search unit types...",
    thType: "Type Name",
    thSize: "Average Size",
    thRooms: "Room Count",
    thPrice: "Base Price",
    thActions: "Actions",
    types: {
      "Studio": "Studio",
      "1 Bedroom": "1 Bedroom",
      "2 Bedroom": "2 Bedroom",
      "Penthouse": "Penthouse"
    }
  },
  mm: {
    title: "ယူနစ်အမျိုးအစားများ",
    subtitle: "ယူနစ်ပုံစံအမျိုးမျိုးနှင့် ဈေးနှုန်းများကို သတ်မှတ်စီမံပါ။",
    addBtn: "အမျိုးအစားအသစ်ထည့်ရန်",
    searchPlaceholder: "ယူနစ်အမျိုးအစားများ ရှာဖွေရန်...",
    thType: "အမျိုးအစားအမည်",
    thSize: "ပျမ်းမျှအကျယ်",
    thRooms: "အခန်းအရေအတွက်",
    thPrice: "အခြေခံဈေးနှုန်း",
    thActions: "လုပ်ဆောင်ချက်များ",
    types: {
      "Studio": "စတူဒီယို",
      "1 Bedroom": "အိပ်ခန်း ၁ ခန်း",
      "2 Bedroom": "အိပ်ခန်း ၂ ခန်း",
      "Penthouse": "ပင့်ဟောက်စ်"
    }
  }
};

export default function UnitTypesPage() {
  const [sortConfig, setSortConfig] = useState<{ key: string, direction: 'asc' | 'desc' } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activePage, setPage] = useState(1);
  const itemsPerPage = 5;

const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const filteredData = elements.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortConfig) return 0;
    const { key, direction } = sortConfig;
    if (a[key as keyof typeof a] < b[key as keyof typeof b]) return direction === 'asc' ? -1 : 1;
    if (a[key as keyof typeof a] > b[key as keyof typeof b]) return direction === 'asc' ? 1 : -1;
    return 0;
  });

  const { lang, mounted } = useTranslation();
  const t = translations[lang as keyof typeof translations] || translations.en;

  

  const rows = sortedData.map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td>
        <Group gap="sm">
          <ThemeIcon size="md" variant="light" color={element.color} radius="md">
            <IconLayoutBoard size={18} />
          </ThemeIcon>
          <Stack gap={0}>
            <Text size="sm" fw={700}>{t.types[element.name as keyof typeof t.types] || element.name}</Text>
            <Text size="xs" c="dimmed">{element.id}</Text>
          </Stack>
        </Group>
      </Table.Td>
      <Table.Td>
        <Text size="sm" fw={500}>{element.size}</Text>
      </Table.Td>
      <Table.Td>
        <Text size="sm" fw={500}>{element.rooms}</Text>
      </Table.Td>
      <Table.Td>
        <Text size="sm" fw={700} c="blue">{element.price}</Text>
      </Table.Td>
      <Table.Td>
        <Group gap={4} justify="flex-end">
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
          <Title order={2} fz={28} fw={700} c="#014F86">{t.title}</Title>
          <Text c="dimmed" size="sm" fw={500}>{t.subtitle}</Text>
        </Stack>
        <Button leftSection={<IconPlus size={16} />} color="#014F86" radius="md">{t.addBtn}</Button>
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
          </SimpleGrid>
        </Box>
        <Table verticalSpacing="md" highlightOnHover>
          <Table.Thead bg="#014F86">
            <Table.Tr>
              <Table.Th fw={700} fz="sm" c="white">
                <UnstyledButton onClick={() => handleSort('id')} style={{ width: '100%', color: 'inherit' }}>
                  <Group justify="space-between" wrap="nowrap">
                    <span>{t.thType}</span>
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
                    <span>{t.thSize}</span>
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
                <UnstyledButton onClick={() => handleSort('size')} style={{ width: '100%', color: 'inherit' }}>
                  <Group justify="space-between" wrap="nowrap">
                    <span>{t.thRooms}</span>
                    <Center>
                      {sortConfig?.key === 'size' ? (
                        sortConfig.direction === 'asc' ? <IconChevronUp size={14} /> : <IconChevronDown size={14} />
                      ) : (
                        <IconSelector size={14} color="gray" />
                      )}
                    </Center>
                  </Group>
                </UnstyledButton>
              </Table.Th>
              <Table.Th fw={700} fz="sm" c="white">
                <UnstyledButton onClick={() => handleSort('rooms')} style={{ width: '100%', color: 'inherit' }}>
                  <Group justify="space-between" wrap="nowrap">
                    <span>{t.thPrice}</span>
                    <Center>
                      {sortConfig?.key === 'rooms' ? (
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
            Showing {filteredData.length > 0 ? ((activePage - 1) * itemsPerPage) + 1 : 0} to {Math.min(activePage * itemsPerPage, filteredData.length)} of {filteredData.length} entries
          </Text>
          <Pagination total={Math.ceil(filteredData.length / itemsPerPage)} value={activePage} onChange={setPage} color="#014F86" />
        </Group>
      
      </Paper>
    </Stack>
  );
}
