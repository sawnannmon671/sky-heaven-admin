"use client";

import { useState } from "react";
import {  Title, Text, Stack, Paper, Group, ThemeIcon, Button, Table, TextInput, ActionIcon, Badge , Pagination } from "@mantine/core";
import { IconMessageExclamation, IconChevronLeft, IconSearch, IconEye, IconEdit, IconTrash, IconPlus } from "@tabler/icons-react";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";

export default function ComplaintManagementPage() {
  const [activePage, setPage] = useState(1);
  const itemsPerPage = 5;

  const { lang, mounted } = useTranslation();

  if (!mounted) return null;

  const t = {
    en: {
      title: "Complaint Management",
      subtitle: "Track and resolve resident complaints and feedback.",
      back: "Back to Maintenance",
      comingSoon: "Complaint management system is coming soon.",
    },
    mm: {
      title: "တိုင်ကြားချက်စီမံခန့်ခွဲမှု",
      subtitle: "နေထိုင်သူများ၏ တိုင်ကြားချက်များနှင့် တုံ့ပြန်ချက်များကို ခြေရာခံပြီး ဖြေရှင်းပါ။",
      back: "ပြုပြင်ထိန်းသိမ်းမှုစာမျက်နှာသို့ ပြန်သွားရန်",
      comingSoon: "တိုင်ကြားချက်စီမံခန့်ခွဲမှုစနစ်အား မကြာမီ ရရှိနိုင်တော့မည်ဖြစ်သည်။",
    },
  }[lang === "mm" ? "mm" : "en"];

const mockData = [
    { id: "CMP-001", resident: "U Aung Aung", unit: "A-101", subject: "Noisy Neighbors", date: "2024-10-12", status: "Resolved" },
    { id: "CMP-002", resident: "Daw Su Su", unit: "B-205", subject: "Garbage Collection Delay", date: "2024-10-15", status: "In Progress" },
    { id: "CMP-003", resident: "U Kyaw Min", unit: "C-304", subject: "Parking Spot Occupied", date: "2024-10-18", status: "Pending" },
    { id: "CMP-004", resident: "Daw Hla Hla", unit: "A-502", subject: "Elevator Malfunction", date: "2024-10-20", status: "Resolved" },
    { id: "CMP-005", resident: "U Zaw Myo", unit: "D-102", subject: "Corridor Light Broken", date: "2024-10-22", status: "In Progress" },
  ];

  return (
    <Stack gap="xl" p="md">
      <Group justify="space-between">
        <Stack gap={4}>
          <Group gap="xs">
            <ThemeIcon variant="light" color="red" size="lg" radius="md">
              <IconMessageExclamation size={20} />
            </ThemeIcon>
            <Title order={1}>{t.title}</Title>
          </Group>
          <Text c="dimmed" size="md">{t.subtitle}</Text>
        </Stack>
        <Button 
          component={Link} 
          href="/dashboard/maintenance" 
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
              <Table.Th fw={700} fz="sm" c="dark">Complaint ID</Table.Th>
              <Table.Th fw={700} fz="sm" c="dark">Resident & Unit</Table.Th>
              <Table.Th fw={700} fz="sm" c="dark">Subject</Table.Th>
              <Table.Th fw={700} fz="sm" c="dark">Date</Table.Th>
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
                    <ThemeIcon size="md" variant="light" color="red" radius="md">
                      <IconMessageExclamation size={18} />
                    </ThemeIcon>
                    <Stack gap={0}>
                      <Text size="sm" fw={500}>{item.resident}</Text>
                      <Text size="xs" c="dimmed">Unit: {item.unit}</Text>
                    </Stack>
                  </Group>
                </Table.Td>
                <Table.Td>
                  <Text size="sm">{item.subject}</Text>
                </Table.Td>
                <Table.Td>
                  <Text size="sm">{item.date}</Text>
                </Table.Td>
                <Table.Td>
                  <Badge variant="light" color={item.status === 'Resolved' ? 'green' : item.status === 'In Progress' ? 'blue' : 'orange'} fw={700}>
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
