"use client";

import { useState } from "react";
import {  Title, Text, Stack, Paper, Group, ThemeIcon, Button, Table, TextInput, ActionIcon, Badge , Pagination } from "@mantine/core";
import { IconUserShield, IconChevronLeft, IconSearch, IconEye, IconEdit, IconTrash, IconPlus } from "@tabler/icons-react";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";

export default function SecurityGuardsPage() {
  const [activePage, setPage] = useState(1);
  const itemsPerPage = 5;

  const { lang, mounted } = useTranslation();

  if (!mounted) return null;

  const t = {
    en: {
      title: "Security Guards",
      subtitle: "Manage security personnel and their shifts.",
      back: "Back to Staff Management",
      comingSoon: "Security guard management is coming soon.",
    },
    mm: {
      title: "လုံခြုံရေးဝန်ထမ်းများ",
      subtitle: "လုံခြုံရေးဝန်ထမ်းများနှင့် ၎င်းတို့၏ အလှည့်ကျတာဝန်များကို စီမံခန့်ခွဲပါ။",
      back: "ဝန်ထမ်းစီမံခန့်ခွဲမှုစာမျက်နှာသို့ ပြန်သွားရန်",
      comingSoon: "လုံခြုံရေးဝန်ထမ်းစီမံခန့်ခွဲမှုအား မကြာမီ ရရှိနိုင်တော့မည်ဖြစ်သည်။",
    },
  }[lang === "mm" ? "mm" : "en"];

  const mockData = [
    { id: "SG-001", name: "U Kyaw Swar", contact: "09-123456789", post: "Main Gate", shift: "Day (08:00 - 20:00)", status: "On Duty" },
    { id: "SG-002", name: "Ko Htun", contact: "09-987654321", post: "Building A Lobby", shift: "Day (08:00 - 20:00)", status: "On Duty" },
    { id: "SG-003", name: "U Zaw", contact: "09-555666777", post: "Basement Parking", shift: "Night (20:00 - 08:00)", status: "Off Duty" },
    { id: "SG-004", name: "Ko Min", contact: "09-444333222", post: "Building B Lobby", shift: "Night (20:00 - 08:00)", status: "Off Duty" },
    { id: "SG-005", name: "U Aung", contact: "09-111222333", post: "Patrol", shift: "Day (08:00 - 20:00)", status: "On Leave" },
  ];

  return (
    <Stack gap="xl" p="md">
      <Group justify="space-between">
        <Stack gap={4}>
          <Group gap="xs">
            <ThemeIcon variant="light" color="teal" size="lg" radius="md">
              <IconUserShield size={20} />
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
              <Table.Th fw={700} fz="sm" c="dark">Guard ID</Table.Th>
              <Table.Th fw={700} fz="sm" c="dark">Name & Contact</Table.Th>
              <Table.Th fw={700} fz="sm" c="dark">Assigned Post</Table.Th>
              <Table.Th fw={700} fz="sm" c="dark">Shift</Table.Th>
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
                    <ThemeIcon size="md" variant="light" color="teal" radius="md">
                      <IconUserShield size={18} />
                    </ThemeIcon>
                    <Stack gap={0}>
                      <Text size="sm" fw={500}>{item.name}</Text>
                      <Text size="xs" c="dimmed">{item.contact}</Text>
                    </Stack>
                  </Group>
                </Table.Td>
                <Table.Td>
                  <Text size="sm">{item.post}</Text>
                </Table.Td>
                <Table.Td>
                  <Text size="sm">{item.shift}</Text>
                </Table.Td>
                <Table.Td>
                  <Badge variant="light" color={item.status === 'On Duty' ? 'green' : item.status === 'Off Duty' ? 'gray' : 'orange'} fw={700}>
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
