"use client";

import { useState } from "react";
import {   Title, Text, Stack, Paper, Group, ThemeIcon, Button, Table, TextInput, ActionIcon, Badge , Pagination , UnstyledButton, Center } from "@mantine/core";
import {  IconGlassFull, IconChevronLeft, IconSearch, IconEye, IconEdit, IconTrash, IconPlus , IconSelector, IconChevronUp, IconChevronDown } from "@tabler/icons-react";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";

export default function EventHallPage() {
  const [sortConfig, setSortConfig] = useState<{ key: string, direction: 'asc' | 'desc' } | null>(null);

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
      title: "Event Hall Reservation",
      subtitle: "Book the event hall for parties, meetings, and celebrations.",
      back: "Back to Amenities",
      comingSoon: "Event hall reservation system is coming soon.",
    },
    mm: {
      title: "ပွဲခန်းမဘွတ်ကင်",
      subtitle: "ပါတီများ၊ အစည်းအဝေးများနှင့် ပွဲလမ်းသဘင်များအတွက် ပွဲခန်းမကို ကြိုတင်မှာယူပါ။",
      back: "ဝန်ဆောင်မှုများသို့ ပြန်သွားရန်",
      comingSoon: "ပွဲခန်းမဘွတ်ကင်စနစ်အား မကြာမီ ရရှိနိုင်တော့မည်ဖြစ်သည်။",
    },
  }[lang === "mm" ? "mm" : "en"];

  const mockData = [
    { id: "EH-001", resident: "U Kyaw Swar", unit: "A-101", eventDate: "2024-11-01 10:00 AM", guests: 50, status: "Approved" },
    { id: "EH-002", resident: "Daw Ni Ni", unit: "B-205", eventDate: "2024-11-05 06:00 PM", guests: 100, status: "Pending" },
    { id: "EH-003", resident: "Ko Htun", unit: "C-304", eventDate: "2024-11-10 09:00 AM", guests: 30, status: "Approved" },
    { id: "EH-004", resident: "Ma Hlaing", unit: "A-502", eventDate: "2024-11-15 05:00 PM", guests: 80, status: "Rejected" },
    { id: "EH-005", resident: "U Zaw", unit: "D-102", eventDate: "2024-11-20 11:00 AM", guests: 40, status: "Approved" },
  ];

  const sortedData = [...mockData].sort((a, b) => {
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
          <Group gap="xs">
            <ThemeIcon variant="light" color="grape" size="lg" radius="md">
              <IconGlassFull size={20} />
            </ThemeIcon>
            <Title order={1} c="#014F86">{t.title}</Title>
          </Group>
          <Text c="dimmed" size="md">{t.subtitle}</Text>
        </Stack>
        <Button 
          component={Link} 
          href="/dashboard/amenities" 
          variant="subtle" 
          leftSection={<IconChevronLeft size={16} />}
          color="gray"
        >
          {t.back}
        </Button>
      </Group>

      
      <Paper p="md" radius="md" withBorder shadow="sm">
        <Group justify="space-between" mb="md">
          <TextInput
            placeholder="Search..." w={250}
            leftSection={<IconSearch size={16} />}
            size="md"
            radius="md"
            w={250}
          />
          <Button leftSection={<IconPlus size={16} />} color="#014F86" radius="md">
            Add New
          </Button>
        </Group>

        <Table verticalSpacing="md" highlightOnHover>
          <Table.Thead bg="gray.0">
            <Table.Tr>
              <Table.Th fw={700} fz="sm" c="dark">
                <UnstyledButton onClick={() => handleSort('id')} style={{ width: '100%', color: 'inherit' }}>
                  <Group justify="space-between" wrap="nowrap">
                    <span>Reservation ID</span>
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
              <Table.Th fw={700} fz="sm" c="dark">
                <UnstyledButton onClick={() => handleSort('resident')} style={{ width: '100%', color: 'inherit' }}>
                  <Group justify="space-between" wrap="nowrap">
                    <span>Resident & Unit</span>
                    <Center>
                      {sortConfig?.key === 'resident' ? (
                        sortConfig.direction === 'asc' ? <IconChevronUp size={14} /> : <IconChevronDown size={14} />
                      ) : (
                        <IconSelector size={14} color="gray" />
                      )}
                    </Center>
                  </Group>
                </UnstyledButton>
              </Table.Th>
              <Table.Th fw={700} fz="sm" c="dark">
                <UnstyledButton onClick={() => handleSort('unit')} style={{ width: '100%', color: 'inherit' }}>
                  <Group justify="space-between" wrap="nowrap">
                    <span>Event Date</span>
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
              <Table.Th fw={700} fz="sm" c="dark">
                <UnstyledButton onClick={() => handleSort('eventDate')} style={{ width: '100%', color: 'inherit' }}>
                  <Group justify="space-between" wrap="nowrap">
                    <span>Guests</span>
                    <Center>
                      {sortConfig?.key === 'eventDate' ? (
                        sortConfig.direction === 'asc' ? <IconChevronUp size={14} /> : <IconChevronDown size={14} />
                      ) : (
                        <IconSelector size={14} color="gray" />
                      )}
                    </Center>
                  </Group>
                </UnstyledButton>
              </Table.Th>
              <Table.Th fw={700} fz="sm" c="dark">Status</Table.Th>
              <Table.Th fw={700} fz="sm" c="dark" ta="right">Actions</Table.Th>
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
                    <ThemeIcon size="md" variant="light" color="grape" radius="md">
                      <IconGlassFull size={18} />
                    </ThemeIcon>
                    <Stack gap={0}>
                      <Text size="sm" fw={500}>{item.resident}</Text>
                      <Text size="xs" c="dimmed">Unit: {item.unit}</Text>
                    </Stack>
                  </Group>
                </Table.Td>
                <Table.Td>
                  <Text size="sm">{item.eventDate}</Text>
                </Table.Td>
                <Table.Td>
                  <Text size="sm">{item.guests}</Text>
                </Table.Td>
                <Table.Td>
                  <Badge variant="light" color={item.status === 'Approved' ? 'green' : item.status === 'Rejected' ? 'red' : 'blue'} fw={700}>
                    {item.status}
                  </Badge>
                </Table.Td>
                <Table.Td>
                  <Group gap={4} justify="flex-end">
                    <ActionIcon variant="subtle" color="gray"><IconEye size={16} /></ActionIcon>
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
