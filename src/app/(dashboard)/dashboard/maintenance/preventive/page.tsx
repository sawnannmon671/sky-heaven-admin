"use client";

import { useState } from "react";
import {  Title, Text, Stack, Paper, Group, ThemeIcon, Button, Table, TextInput, ActionIcon, Badge , Pagination } from "@mantine/core";
import { IconCalendarStats, IconChevronLeft, IconSearch, IconEye, IconEdit, IconTrash, IconPlus } from "@tabler/icons-react";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";

export default function PreventiveMaintenancePage() {
  const [activePage, setPage] = useState(1);
  const itemsPerPage = 5;

  const { lang, mounted } = useTranslation();

  if (!mounted) return null;

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

  return (
    <Stack gap="xl" p="md">
      <Group justify="space-between">
        <Stack gap={4}>
          <Group gap="xs">
            <ThemeIcon variant="light" color="cyan" size="lg" radius="md">
              <IconCalendarStats size={20} />
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
              <Table.Th fw={700} fz="sm" c="dark">PM ID</Table.Th>
              <Table.Th fw={700} fz="sm" c="dark">Equipment & Location</Table.Th>
              <Table.Th fw={700} fz="sm" c="dark">Frequency</Table.Th>
              <Table.Th fw={700} fz="sm" c="dark">Next Due Date</Table.Th>
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
