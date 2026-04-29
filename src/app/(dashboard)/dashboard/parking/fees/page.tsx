"use client";

import { useState } from "react";
import {   Title, Text, Stack, Paper, Group, ThemeIcon, Button, Table, TextInput, ActionIcon, Badge , Pagination , UnstyledButton, Center } from "@mantine/core";
import {  IconCash, IconChevronLeft, IconSearch, IconEye, IconEdit, IconTrash, IconPlus , IconSelector, IconChevronUp, IconChevronDown } from "@tabler/icons-react";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";

export default function ParkingFeesPage() {
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
      title: "Parking Fees",
      subtitle: "Manage and track monthly and visitor parking fees.",
      back: "Back to Parking",
      comingSoon: "Parking fee management is coming soon.",
    },
    mm: {
      title: "ကားပါကင်ခများ",
      subtitle: "လစဉ်နှင့် ဧည့်သည်ကားပါကင်ခများကို စီမံခန့်ခွဲခြင်းနှင့် ခြေရာခံခြင်း။",
      back: "ကားပါကင်စာမျက်နှာသို့ ပြန်သွားရန်",
      comingSoon: "ကားပါကင်ခစီမံခန့်ခွဲမှုအား မကြာမီ ရရှိနိုင်တော့မည်ဖြစ်သည်။",
    },
  }[lang === "mm" ? "mm" : "en"];

  const mockData = [
    { id: "FEE-001", vehicle: "YGN 1A-1234", slot: "P-101", type: "Monthly", amount: "50,000 MMK", date: "2024-10-01", status: "Paid" },
    { id: "FEE-002", vehicle: "MDY 2B-5678", slot: "P-105", type: "Guest", amount: "5,000 MMK", date: "2024-10-15", status: "Paid" },
    { id: "FEE-003", vehicle: "YGN 3C-9012", slot: "P-202", type: "Monthly", amount: "50,000 MMK", date: "2024-10-01", status: "Unpaid" },
    { id: "FEE-004", vehicle: "YGN 4D-3456", slot: "P-305", type: "Monthly", amount: "50,000 MMK", date: "2024-10-01", status: "Pending" },
    { id: "FEE-005", vehicle: "NPT 5E-7890", slot: "G-10", type: "Guest", amount: "2,000 MMK", date: "2024-10-16", status: "Paid" },
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
            <ThemeIcon variant="light" color="green" size="lg" radius="md">
              <IconCash size={20} />
            </ThemeIcon>
            <Title order={1} c="#014F86">{t.title}</Title>
          </Group>
          <Text c="dimmed" size="md">{t.subtitle}</Text>
        </Stack>
        <Button 
          component={Link} 
          href="/dashboard/parking" 
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
            placeholder="Search..."
            leftSection={<IconSearch size={16} />}
            size="md"
            radius="md"
            style={{ flex: 1, maxWidth: 400 }}
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
                    <span>Fee ID</span>
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
                <UnstyledButton onClick={() => handleSort('vehicle')} style={{ width: '100%', color: 'inherit' }}>
                  <Group justify="space-between" wrap="nowrap">
                    <span>Vehicle & Slot</span>
                    <Center>
                      {sortConfig?.key === 'vehicle' ? (
                        sortConfig.direction === 'asc' ? <IconChevronUp size={14} /> : <IconChevronDown size={14} />
                      ) : (
                        <IconSelector size={14} color="gray" />
                      )}
                    </Center>
                  </Group>
                </UnstyledButton>
              </Table.Th>
              <Table.Th fw={700} fz="sm" c="dark">
                <UnstyledButton onClick={() => handleSort('slot')} style={{ width: '100%', color: 'inherit' }}>
                  <Group justify="space-between" wrap="nowrap">
                    <span>Type</span>
                    <Center>
                      {sortConfig?.key === 'slot' ? (
                        sortConfig.direction === 'asc' ? <IconChevronUp size={14} /> : <IconChevronDown size={14} />
                      ) : (
                        <IconSelector size={14} color="gray" />
                      )}
                    </Center>
                  </Group>
                </UnstyledButton>
              </Table.Th>
              <Table.Th fw={700} fz="sm" c="dark">
                <UnstyledButton onClick={() => handleSort('type')} style={{ width: '100%', color: 'inherit' }}>
                  <Group justify="space-between" wrap="nowrap">
                    <span>Amount & Date</span>
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
                    <ThemeIcon size="md" variant="light" color="green" radius="md">
                      <IconCash size={18} />
                    </ThemeIcon>
                    <Stack gap={0}>
                      <Text size="sm" fw={500}>{item.vehicle}</Text>
                      <Text size="xs" c="dimmed">Slot: {item.slot}</Text>
                    </Stack>
                  </Group>
                </Table.Td>
                <Table.Td>
                  <Badge variant="light" color={item.type === 'Monthly' ? 'blue' : 'cyan'} fw={700}>
                    {item.type}
                  </Badge>
                </Table.Td>
                <Table.Td>
                  <Stack gap={0}>
                    <Text size="sm" fw={500}>{item.amount}</Text>
                    <Text size="xs" c="dimmed">{item.date}</Text>
                  </Stack>
                </Table.Td>
                <Table.Td>
                  <Badge variant="light" color={item.status === 'Paid' ? 'green' : item.status === 'Pending' ? 'orange' : 'red'} fw={700}>
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
