"use client";

import { Title, Text, Stack, Paper, Group, ThemeIcon, Button, Table, TextInput, ActionIcon, Badge } from "@mantine/core";
import { IconClipboardList, IconChevronLeft, IconSearch, IconEye, IconEdit, IconTrash, IconPlus } from "@tabler/icons-react";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";

export default function WorkOrdersPage() {
  const { lang, mounted } = useTranslation();

  if (!mounted) return null;

  const t = {
    en: {
      title: "Work Orders",
      subtitle: "Manage and track all maintenance work orders and their status.",
      back: "Back to Maintenance",
      comingSoon: "Work order management is coming soon.",
    },
    mm: {
      title: "လုပ်ငန်းအမိန့်များ",
      subtitle: "ပြုပြင်ထိန်းသိမ်းမှု လုပ်ငန်းအမိန့်အားလုံးနှင့် ၎င်းတို့၏ အခြေအနေများကို စီမံခန့်ခွဲခြင်းနှင့် ခြေရာခံခြင်း။",
      back: "ပြုပြင်ထိန်းသိမ်းမှုစာမျက်နှာသို့ ပြန်သွားရန်",
      comingSoon: "လုပ်ငန်းအမိန့်စီမံခန့်ခွဲမှုအား မကြာမီ ရရှိနိုင်တော့မည်ဖြစ်သည်။",
    },
  }[lang === "mm" ? "mm" : "en"];

const mockData = [
    { id: "WO-001", task: "Fix Plumbing Leak", location: "Unit A-101", priority: "High", date: "2024-10-10", status: "Completed" },
    { id: "WO-002", task: "Replace Corridor Lights", location: "2nd Floor", priority: "Medium", date: "2024-10-12", status: "In Progress" },
    { id: "WO-003", task: "Elevator Inspection", location: "Main Elevator", priority: "High", date: "2024-10-15", status: "Pending" },
    { id: "WO-004", task: "Garden Landscaping", location: "Courtyard", priority: "Low", date: "2024-10-18", status: "Scheduled" },
    { id: "WO-005", task: "Paint Stairwell", location: "Block C", priority: "Medium", date: "2024-10-20", status: "Pending" },
  ];

  return (
    <Stack gap="xl" p="md">
      <Group justify="space-between">
        <Stack gap={4}>
          <Group gap="xs">
            <ThemeIcon variant="light" color="teal" size="lg" radius="md">
              <IconClipboardList size={20} />
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
              <Table.Th fw={700} fz="sm" c="dark">Order ID</Table.Th>
              <Table.Th fw={700} fz="sm" c="dark">Task & Location</Table.Th>
              <Table.Th fw={700} fz="sm" c="dark">Priority</Table.Th>
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
                    <ThemeIcon size="md" variant="light" color="teal" radius="md">
                      <IconClipboardList size={18} />
                    </ThemeIcon>
                    <Stack gap={0}>
                      <Text size="sm" fw={500}>{item.task}</Text>
                      <Text size="xs" c="dimmed">{item.location}</Text>
                    </Stack>
                  </Group>
                </Table.Td>
                <Table.Td>
                  <Badge variant="light" color={item.priority === 'High' ? 'red' : item.priority === 'Medium' ? 'orange' : 'blue'} fw={700}>
                    {item.priority}
                  </Badge>
                </Table.Td>
                <Table.Td>
                  <Text size="sm">{item.date}</Text>
                </Table.Td>
                <Table.Td>
                  <Badge variant="light" color={item.status === 'Completed' ? 'green' : item.status === 'In Progress' ? 'blue' : item.status === 'Scheduled' ? 'cyan' : 'orange'} fw={700}>
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
