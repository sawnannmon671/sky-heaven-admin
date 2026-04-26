"use client";

import { useState } from "react";
import {  Title, Text, Stack, Paper, Group, ThemeIcon, Button, Table, TextInput, ActionIcon, Badge , Pagination } from "@mantine/core";
import { IconUserCheck, IconChevronLeft, IconSearch, IconEye, IconEdit, IconTrash, IconPlus } from "@tabler/icons-react";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";

export default function GuestParkingPage() {
  const [activePage, setPage] = useState(1);
  const itemsPerPage = 5;

  const { lang, mounted } = useTranslation();

  if (!mounted) return null;

  const t = {
    en: {
      title: "Guest Parking",
      subtitle: "Manage and assign temporary parking for visitors.",
      back: "Back to Parking",
      comingSoon: "Guest parking management is coming soon.",
    },
    mm: {
      title: "ဧည့်သည်ကားပါကင်",
      subtitle: "ဧည့်သည်များအတွက် ယာယီကားပါကင်နေရာများကို စီမံခန့်ခွဲခြင်းနှင့် တာဝန်ပေးခြင်း။",
      back: "ကားပါကင်စာမျက်နှာသို့ ပြန်သွားရန်",
      comingSoon: "ဧည့်သည်ကားပါကင်စီမံခန့်ခွဲမှုအား မကြာမီ ရရှိနိုင်တော့မည်ဖြစ်သည်။",
    },
  }[lang === "mm" ? "mm" : "en"];

  const mockData = [
    { id: "GP-001", guestName: "U Kyaw", hostUnit: "A-101", vehicle: "YGN 1A-1234", slot: "G-01", arrival: "2024-10-26 10:00 AM", status: "Active" },
    { id: "GP-002", guestName: "Daw Nu", hostUnit: "B-205", vehicle: "MDY 2B-5678", slot: "G-02", arrival: "2024-10-26 11:30 AM", status: "Active" },
    { id: "GP-003", guestName: "Ko Tun", hostUnit: "C-304", vehicle: "YGN 3C-9012", slot: "G-03", arrival: "2024-10-25 02:00 PM", status: "Completed" },
    { id: "GP-004", guestName: "Ma Hla", hostUnit: "A-502", vehicle: "YGN 4D-3456", slot: "G-04", arrival: "2024-10-26 09:15 AM", status: "Active" },
    { id: "GP-005", guestName: "U Zaw", hostUnit: "D-102", vehicle: "NPT 5E-7890", slot: "G-05", arrival: "2024-10-25 04:45 PM", status: "Completed" },
  ];

  return (
    <Stack gap="xl" p="md">
      <Group justify="space-between">
        <Stack gap={4}>
          <Group gap="xs">
            <ThemeIcon variant="light" color="indigo" size="lg" radius="md">
              <IconUserCheck size={20} />
            </ThemeIcon>
            <Title order={1}>{t.title}</Title>
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

      
      <Paper p="md" radius="lg" withBorder shadow="sm" style={{ border: '1px solid #e9ecef' }}>
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
              <Table.Th fw={700} fz="sm" c="dark">ID</Table.Th>
              <Table.Th fw={700} fz="sm" c="dark">Guest & Unit</Table.Th>
              <Table.Th fw={700} fz="sm" c="dark">Vehicle & Slot</Table.Th>
              <Table.Th fw={700} fz="sm" c="dark">Arrival</Table.Th>
              <Table.Th fw={700} fz="sm" c="dark">Status</Table.Th>
              <Table.Th fw={700} fz="sm" c="dark" ta="right">Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {mockData.slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage).map((item) => (
              <Table.Tr key={item.id}>
                <Table.Td>
                  <Text size="sm" fw={700}>{item.id}</Text>
                </Table.Td>
                <Table.Td>
                  <Group gap="sm">
                    <ThemeIcon size="md" variant="light" color="indigo" radius="md">
                      <IconUserCheck size={18} />
                    </ThemeIcon>
                    <Stack gap={0}>
                      <Text size="sm" fw={500}>{item.guestName}</Text>
                      <Text size="xs" c="dimmed">Host: {item.hostUnit}</Text>
                    </Stack>
                  </Group>
                </Table.Td>
                <Table.Td>
                  <Stack gap={0}>
                    <Text size="sm" fw={500}>{item.vehicle}</Text>
                    <Text size="xs" c="dimmed">Slot: {item.slot}</Text>
                  </Stack>
                </Table.Td>
                <Table.Td>
                  <Text size="sm">{item.arrival}</Text>
                </Table.Td>
                <Table.Td>
                  <Badge variant="light" color={item.status === 'Active' ? 'green' : 'gray'} fw={700}>
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
