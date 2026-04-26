"use client";

import { useState } from "react";
import {  Title, Text, Stack, Paper, Group, ThemeIcon, Button, Table, TextInput, ActionIcon, Badge , Pagination } from "@mantine/core";
import { IconArmchair, IconChevronLeft, IconSearch, IconEye, IconEdit, IconTrash, IconPlus } from "@tabler/icons-react";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";

export default function MeetingRoomPage() {
  const [activePage, setPage] = useState(1);
  const itemsPerPage = 5;

  const { lang, mounted } = useTranslation();

  if (!mounted) return null;

  const t = {
    en: {
      title: "Meeting Room Booking",
      subtitle: "Reserve meeting rooms for your business or personal use.",
      back: "Back to Amenities",
      comingSoon: "Meeting room booking system is coming soon.",
    },
    mm: {
      title: "အစည်းအဝေးခန်းဘွတ်ကင်",
      subtitle: "စီးပွားရေး သို့မဟုတ် ကိုယ်ရေးကိုယ်တာအတွက် အစည်းအဝေးခန်းများ ကြိုတင်မှာယူပါ။",
      back: "ဝန်ဆောင်မှုများသို့ ပြန်သွားရန်",
      comingSoon: "အစည်းအဝေးခန်းဘွတ်ကင်စနစ်အား မကြာမီ ရရှိနိုင်တော့မည်ဖြစ်သည်။",
    },
  }[lang === "mm" ? "mm" : "en"];

  const mockData = [
    { id: "MR-001", organizer: "U Kyaw Swar", unit: "A-101", datetime: "2024-11-02 10:00 AM - 12:00 PM", room: "Room A", status: "Approved" },
    { id: "MR-002", organizer: "Daw Ni Ni", unit: "B-205", datetime: "2024-11-03 02:00 PM - 04:00 PM", room: "Room B", status: "Pending" },
    { id: "MR-003", organizer: "Ko Htun", unit: "C-304", datetime: "2024-11-04 09:00 AM - 11:00 AM", room: "Room A", status: "Approved" },
    { id: "MR-004", organizer: "Ma Hlaing", unit: "A-502", datetime: "2024-11-05 01:00 PM - 03:00 PM", room: "Room C", status: "Rejected" },
    { id: "MR-005", organizer: "U Zaw", unit: "D-102", datetime: "2024-11-06 03:00 PM - 05:00 PM", room: "Room B", status: "Approved" },
  ];

  return (
    <Stack gap="xl" p="md">
      <Group justify="space-between">
        <Stack gap={4}>
          <Group gap="xs">
            <ThemeIcon variant="light" color="indigo" size="lg" radius="md">
              <IconArmchair size={20} />
            </ThemeIcon>
            <Title order={1}>{t.title}</Title>
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
              <Table.Th fw={700} fz="sm" c="dark">Booking ID</Table.Th>
              <Table.Th fw={700} fz="sm" c="dark">Organizer & Unit</Table.Th>
              <Table.Th fw={700} fz="sm" c="dark">Meeting Date & Time</Table.Th>
              <Table.Th fw={700} fz="sm" c="dark">Room</Table.Th>
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
                      <IconArmchair size={18} />
                    </ThemeIcon>
                    <Stack gap={0}>
                      <Text size="sm" fw={500}>{item.organizer}</Text>
                      <Text size="xs" c="dimmed">Unit: {item.unit}</Text>
                    </Stack>
                  </Group>
                </Table.Td>
                <Table.Td>
                  <Text size="sm">{item.datetime}</Text>
                </Table.Td>
                <Table.Td>
                  <Text size="sm">{item.room}</Text>
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
