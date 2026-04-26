"use client";

import { Title, Text, Stack, Paper, Group, ThemeIcon, Button, Table, TextInput, ActionIcon, Badge } from "@mantine/core";
import { IconDoorEnter, IconChevronLeft, IconSearch, IconEye, IconEdit, IconTrash, IconPlus } from "@tabler/icons-react";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";

export default function VisitorEntryPage() {
  const { lang, mounted } = useTranslation();

  if (!mounted) return null;

  const t = {
    en: {
      title: "Visitor Entry",
      subtitle: "Register and track visitor arrivals and departures.",
      back: "Back to Visitors",
      comingSoon: "Visitor entry registration is coming soon.",
    },
    mm: {
      title: "ဧည့်သည်အဝင်",
      subtitle: "ဧည့်သည်များ အဝင်အထွက်ကို မှတ်ပုံတင်ခြင်းနှင့် ခြေရာခံခြင်း။",
      back: "ဧည့်သည်စီမံခန့်ခွဲမှုသို့ ပြန်သွားရန်",
      comingSoon: "ဧည့်သည်အဝင်မှတ်ပုံတင်ခြင်းစနစ်အား မကြာမီ ရရှိနိုင်တော့မည်ဖြစ်သည်။",
    },
  }[lang === "mm" ? "mm" : "en"];

  const mockData = [
    { id: "VE-001", visitor: "U Kyaw Swar", hostUnit: "A-101", purpose: "Personal", entryTime: "2024-10-26 09:00 AM", exitTime: "2024-10-26 11:30 AM", status: "Checked Out" },
    { id: "VE-002", visitor: "Daw Ni Ni", hostUnit: "B-205", purpose: "Service", entryTime: "2024-10-26 10:15 AM", exitTime: "-", status: "Inside" },
    { id: "VE-003", visitor: "Ko Htun", hostUnit: "C-304", purpose: "Personal", entryTime: "2024-10-26 11:00 AM", exitTime: "2024-10-26 01:00 PM", status: "Checked Out" },
    { id: "VE-004", visitor: "Ma Hlaing", hostUnit: "A-502", purpose: "Meeting", entryTime: "2024-10-26 02:30 PM", exitTime: "-", status: "Inside" },
    { id: "VE-005", visitor: "U Zaw", hostUnit: "D-102", purpose: "Delivery", entryTime: "2024-10-26 04:00 PM", exitTime: "2024-10-26 04:15 PM", status: "Checked Out" },
  ];

  return (
    <Stack gap="xl" p="md">
      <Group justify="space-between">
        <Stack gap={4}>
          <Group gap="xs">
            <ThemeIcon variant="light" color="blue" size="lg" radius="md">
              <IconDoorEnter size={20} />
            </ThemeIcon>
            <Title order={1}>{t.title}</Title>
          </Group>
          <Text c="dimmed" size="md">{t.subtitle}</Text>
        </Stack>
        <Button 
          component={Link} 
          href="/dashboard/visitors" 
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
              <Table.Th fw={700} fz="sm" c="dark">Entry ID</Table.Th>
              <Table.Th fw={700} fz="sm" c="dark">Visitor & Host</Table.Th>
              <Table.Th fw={700} fz="sm" c="dark">Purpose</Table.Th>
              <Table.Th fw={700} fz="sm" c="dark">Timings</Table.Th>
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
                      <IconDoorEnter size={18} />
                    </ThemeIcon>
                    <Stack gap={0}>
                      <Text size="sm" fw={500}>{item.visitor}</Text>
                      <Text size="xs" c="dimmed">Host: {item.hostUnit}</Text>
                    </Stack>
                  </Group>
                </Table.Td>
                <Table.Td>
                  <Text size="sm">{item.purpose}</Text>
                </Table.Td>
                <Table.Td>
                  <Stack gap={0}>
                    <Text size="sm" c="green.7">In: {item.entryTime}</Text>
                    <Text size="xs" c={item.exitTime === '-' ? 'dimmed' : 'red.7'}>Out: {item.exitTime}</Text>
                  </Stack>
                </Table.Td>
                <Table.Td>
                  <Badge variant="light" color={item.status === 'Inside' ? 'blue' : 'gray'} fw={700}>
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
