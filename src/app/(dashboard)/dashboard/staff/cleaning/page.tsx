"use client";

import { Title, Text, Stack, Paper, Group, ThemeIcon, Button, Table, TextInput, ActionIcon, Badge } from "@mantine/core";
import { IconBrush, IconChevronLeft, IconSearch, IconEye, IconEdit, IconTrash, IconPlus } from "@tabler/icons-react";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";

export default function CleaningStaffPage() {
  const { lang, mounted } = useTranslation();

  if (!mounted) return null;

  const t = {
    en: {
      title: "Cleaning Staff",
      subtitle: "Manage cleaning personnel and their schedules.",
      back: "Back to Staff Management",
      comingSoon: "Cleaning staff management is coming soon.",
    },
    mm: {
      title: "သန့်ရှင်းရေးဝန်ထမ်းများ",
      subtitle: "သန့်ရှင်းရေးဝန်ထမ်းများနှင့် ၎င်းတို့၏ အချိန်ဇယားများကို စီမံခန့်ခွဲပါ။",
      back: "ဝန်ထမ်းစီမံခန့်ခွဲမှုစာမျက်နှာသို့ ပြန်သွားရန်",
      comingSoon: "သန့်ရှင်းရေးဝန်ထမ်းစီမံခန့်ခွဲမှုအား မကြာမီ ရရှိနိုင်တော့မည်ဖြစ်သည်။",
    },
  }[lang === "mm" ? "mm" : "en"];

  const mockData = [
    { id: "CS-001", name: "Daw Ni Ni", contact: "09-123456789", area: "Building A (Lobby)", shift: "Morning (08:00 - 16:00)", status: "Active" },
    { id: "CS-002", name: "Ma Hlaing", contact: "09-987654321", area: "Building B (Corridors)", shift: "Morning (08:00 - 16:00)", status: "Active" },
    { id: "CS-003", name: "Daw Aye", contact: "09-555666777", area: "Gym & Pool Area", shift: "Evening (14:00 - 22:00)", status: "On Leave" },
    { id: "CS-004", name: "Ma Phyu", contact: "09-444333222", area: "Building C (Lobby)", shift: "Morning (08:00 - 16:00)", status: "Active" },
    { id: "CS-005", name: "Daw Thuzar", contact: "09-111222333", area: "Event Hall & Bar", shift: "Evening (14:00 - 22:00)", status: "Active" },
  ];

  return (
    <Stack gap="xl" p="md">
      <Group justify="space-between">
        <Stack gap={4}>
          <Group gap="xs">
            <ThemeIcon variant="light" color="green" size="lg" radius="md">
              <IconBrush size={20} />
            </ThemeIcon>
            <Title order={1}>{t.title}</Title>
          </Group>
          <Text c="dimmed" size="md">{t.subtitle}</Text>
        </Stack>
        <Button 
          component={Link} 
          href="/dashboard/staff" 
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
              <Table.Th fw={700} fz="sm" c="dark">Staff ID</Table.Th>
              <Table.Th fw={700} fz="sm" c="dark">Name & Contact</Table.Th>
              <Table.Th fw={700} fz="sm" c="dark">Assigned Area</Table.Th>
              <Table.Th fw={700} fz="sm" c="dark">Shift</Table.Th>
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
                    <ThemeIcon size="md" variant="light" color="green" radius="md">
                      <IconBrush size={18} />
                    </ThemeIcon>
                    <Stack gap={0}>
                      <Text size="sm" fw={500}>{item.name}</Text>
                      <Text size="xs" c="dimmed">{item.contact}</Text>
                    </Stack>
                  </Group>
                </Table.Td>
                <Table.Td>
                  <Text size="sm">{item.area}</Text>
                </Table.Td>
                <Table.Td>
                  <Text size="sm">{item.shift}</Text>
                </Table.Td>
                <Table.Td>
                  <Badge variant="light" color={item.status === 'Active' ? 'green' : 'orange'} fw={700}>
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
