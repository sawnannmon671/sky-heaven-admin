"use client";

import { Title, Text, Stack, Paper, Group, ThemeIcon, Button, Table, TextInput, ActionIcon, Badge } from "@mantine/core";
import { IconParkingCircle, IconChevronLeft, IconSearch, IconEye, IconEdit, IconTrash, IconPlus } from "@tabler/icons-react";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";

export default function ParkingSlotsPage() {
  const { lang, mounted } = useTranslation();

  if (!mounted) return null;

  const t = {
    en: {
      title: "Parking Slots",
      subtitle: "Manage and monitor all available and occupied parking slots.",
      back: "Back to Parking",
      comingSoon: "Parking slot management is coming soon.",
    },
    mm: {
      title: "ကားပါကင်နေရာများ",
      subtitle: "ရရှိနိုင်သောနှင့် အသုံးပြုနေသော ကားပါကင်နေရာအားလုံးကို စီမံခန့်ခွဲခြင်းနှင့် စောင့်ကြည့်ခြင်း။",
      back: "ကားပါကင်စာမျက်နှာသို့ ပြန်သွားရန်",
      comingSoon: "ကားပါကင်နေရာစီမံခန့်ခွဲမှုအား မကြာမီ ရရှိနိုင်တော့မည်ဖြစ်သည်။",
    },
  }[lang === "mm" ? "mm" : "en"];

  const mockData = [
    { id: "P-101", zone: "Zone A", type: "Resident", occupant: "U Aung Aung", vehicle: "YGN 1A-1234", status: "Occupied" },
    { id: "P-102", zone: "Zone A", type: "Resident", occupant: "-", vehicle: "-", status: "Available" },
    { id: "P-103", zone: "Zone B", type: "Resident", occupant: "Daw Su Su", vehicle: "MDY 2B-5678", status: "Occupied" },
    { id: "G-01", zone: "Guest Zone", type: "Guest", occupant: "U Kyaw", vehicle: "YGN 1A-1234", status: "Occupied" },
    { id: "G-02", zone: "Guest Zone", type: "Guest", occupant: "-", vehicle: "-", status: "Available" },
  ];

  return (
    <Stack gap="xl" p="md">
      <Group justify="space-between">
        <Stack gap={4}>
          <Group gap="xs">
            <ThemeIcon variant="light" color="blue" size="lg" radius="md">
              <IconParkingCircle size={20} />
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
              <Table.Th fw={700} fz="sm" c="dark">Slot ID</Table.Th>
              <Table.Th fw={700} fz="sm" c="dark">Zone & Type</Table.Th>
              <Table.Th fw={700} fz="sm" c="dark">Occupant</Table.Th>
              <Table.Th fw={700} fz="sm" c="dark">Vehicle</Table.Th>
              <Table.Th fw={700} fz="sm" c="dark">Status</Table.Th>
              <Table.Th fw={700} fz="sm" c="dark" ta="right">Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {mockData.map((item) => (
              <Table.Tr key={item.id}>
                <Table.Td>
                  <Text size="sm" fw={700}>{item.id}</Text>
                </Table.Td>
                <Table.Td>
                  <Group gap="sm">
                    <ThemeIcon size="md" variant="light" color="blue" radius="md">
                      <IconParkingCircle size={18} />
                    </ThemeIcon>
                    <Stack gap={0}>
                      <Text size="sm" fw={500}>{item.zone}</Text>
                      <Text size="xs" c="dimmed">Type: {item.type}</Text>
                    </Stack>
                  </Group>
                </Table.Td>
                <Table.Td>
                  <Text size="sm" c={item.occupant === '-' ? 'dimmed' : 'dark'}>{item.occupant}</Text>
                </Table.Td>
                <Table.Td>
                  <Text size="sm" c={item.vehicle === '-' ? 'dimmed' : 'dark'}>{item.vehicle}</Text>
                </Table.Td>
                <Table.Td>
                  <Badge variant="light" color={item.status === 'Available' ? 'green' : 'red'} fw={700}>
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
      </Paper>
    </Stack>
  );
}
