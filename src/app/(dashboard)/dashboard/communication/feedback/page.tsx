"use client";

import { Title, Text, Stack, Paper, Group, ThemeIcon, Button, Table, TextInput, ActionIcon, Badge } from "@mantine/core";
import { IconMessageReport, IconChevronLeft, IconSearch, IconEye, IconEdit, IconTrash, IconPlus } from "@tabler/icons-react";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";

export default function FeedbackPage() {
  const { lang, mounted } = useTranslation();

  if (!mounted) return null;

  const t = {
    en: {
      title: "Complaint Feedback",
      subtitle: "Manage and respond to resident complaints and feedback.",
      back: "Back to Communication",
      comingSoon: "Complaint feedback system is coming soon.",
    },
    mm: {
      title: "တိုင်ကြားချက်တုံ့ပြန်မှု",
      subtitle: "နေထိုင်သူများ၏ တိုင်ကြားချက်များနှင့် တုံ့ပြန်မှုများကို စီမံခန့်ခွဲပြီး ပြန်လည်ဖြေကြားပါ။",
      back: "ဆက်သွယ်ရေးစာမျက်နှာသို့ ပြန်သွားရန်",
      comingSoon: "တိုင်ကြားချက်တုံ့ပြန်မှုစနစ်အား မကြာမီ ရရှိနိုင်တော့မည်ဖြစ်သည်။",
    },
  }[lang === "mm" ? "mm" : "en"];

  const mockData = [
    { id: "FB-001", resident: "U Kyaw Swar", unit: "A-101", subject: "Noise Complaint", date: "2024-10-26 09:00 AM", status: "Resolved" },
    { id: "FB-002", resident: "Daw Ni Ni", unit: "B-205", subject: "Garbage Collection Delay", date: "2024-10-25 04:30 PM", status: "In Progress" },
    { id: "FB-003", resident: "Ko Htun", unit: "C-304", subject: "Security Guard Behavior", date: "2024-10-24 11:00 AM", status: "Pending" },
    { id: "FB-004", resident: "Ma Hlaing", unit: "A-502", subject: "Gym Equipment Issue", date: "2024-10-23 02:15 PM", status: "Resolved" },
    { id: "FB-005", resident: "U Zaw", unit: "D-102", subject: "Pool Cleanliness", date: "2024-10-22 10:00 AM", status: "In Progress" },
  ];

  return (
    <Stack gap="xl" p="md">
      <Group justify="space-between">
        <Stack gap={4}>
          <Group gap="xs">
            <ThemeIcon variant="light" color="red" size="lg" radius="md">
              <IconMessageReport size={20} />
            </ThemeIcon>
            <Title order={1}>{t.title}</Title>
          </Group>
          <Text c="dimmed" size="md">{t.subtitle}</Text>
        </Stack>
        <Button 
          component={Link} 
          href="/dashboard/announcements" 
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
              <Table.Th fw={700} fz="sm" c="dark">Feedback ID</Table.Th>
              <Table.Th fw={700} fz="sm" c="dark">Resident & Unit</Table.Th>
              <Table.Th fw={700} fz="sm" c="dark">Subject</Table.Th>
              <Table.Th fw={700} fz="sm" c="dark">Date</Table.Th>
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
                    <ThemeIcon size="md" variant="light" color="red" radius="md">
                      <IconMessageReport size={18} />
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
      </Paper>
    </Stack>
  );
}
