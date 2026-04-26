"use client";

import { Title, Text, Stack, Paper, Group, ThemeIcon, Button, Table, TextInput, ActionIcon, Badge } from "@mantine/core";
import { IconFileText, IconChevronLeft, IconSearch, IconEye, IconEdit, IconTrash, IconPlus } from "@tabler/icons-react";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";

export default function NoticesPage() {
  const { lang, mounted } = useTranslation();

  if (!mounted) return null;

  const t = {
    en: {
      title: "Notices",
      subtitle: "Publish and manage official notices for all residents.",
      back: "Back to Communication",
      comingSoon: "Notice management system is coming soon.",
    },
    mm: {
      title: "အသိပေးချက်များ",
      subtitle: "နေထိုင်သူအားလုံးအတွက် တရားဝင်အသိပေးချက်များကို ထုတ်ပြန်ခြင်းနှင့် စီမံခန့်ခွဲခြင်း။",
      back: "ဆက်သွယ်ရေးစာမျက်နှာသို့ ပြန်သွားရန်",
      comingSoon: "အသိပေးချက်စီမံခန့်ခွဲမှုစနစ်အား မကြာမီ ရရှိနိုင်တော့မည်ဖြစ်သည်။",
    },
  }[lang === "mm" ? "mm" : "en"];

  const mockData = [
    { id: "NT-001", title: "Annual General Meeting", audience: "All Residents", date: "2024-10-25", status: "Active" },
    { id: "NT-002", title: "Swimming Pool Closure", audience: "All Residents", date: "2024-10-20", status: "Expired" },
    { id: "NT-003", title: "New Parking Regulations", audience: "Vehicle Owners", date: "2024-10-22", status: "Active" },
    { id: "NT-004", title: "Holiday Decorations", audience: "All Residents", date: "2024-11-01", status: "Draft" },
    { id: "NT-005", title: "Gym Equipment Update", audience: "Gym Members", date: "2024-10-18", status: "Active" },
  ];

  return (
    <Stack gap="xl" p="md">
      <Group justify="space-between">
        <Stack gap={4}>
          <Group gap="xs">
            <ThemeIcon variant="light" color="blue" size="lg" radius="md">
              <IconFileText size={20} />
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
              <Table.Th fw={700} fz="sm" c="dark">Notice ID</Table.Th>
              <Table.Th fw={700} fz="sm" c="dark">Title</Table.Th>
              <Table.Th fw={700} fz="sm" c="dark">Target Audience</Table.Th>
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
                    <ThemeIcon size="md" variant="light" color="blue" radius="md">
                      <IconFileText size={18} />
                    </ThemeIcon>
                    <Text size="sm" fw={500}>{item.title}</Text>
                  </Group>
                </Table.Td>
                <Table.Td>
                  <Text size="sm">{item.audience}</Text>
                </Table.Td>
                <Table.Td>
                  <Text size="sm">{item.date}</Text>
                </Table.Td>
                <Table.Td>
                  <Badge variant="light" color={item.status === 'Active' ? 'green' : item.status === 'Draft' ? 'gray' : 'red'} fw={700}>
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
