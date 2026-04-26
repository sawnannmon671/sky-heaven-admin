"use client";

import { Title, Paper, Table, Group, Button, TextInput, Stack, Text, ThemeIcon, ActionIcon, Badge } from "@mantine/core";
import { IconPlus, IconSearch, IconEye, IconEdit, IconTrash, IconBuildingCommunity } from "@tabler/icons-react";
import { useTranslation } from "@/hooks/useTranslation";

const elements = [
  { id: "FAC-001", name: "Swimming Pool", location: "Level 1", status: "Open", color: "blue" },
  { id: "FAC-002", name: "Gym Center", location: "Level 3", status: "Open", color: "teal" },
  { id: "FAC-003", name: "Lounge Area", location: "Penthouse", status: "Cleaning", color: "orange" },
  { id: "FAC-004", name: "Children Playground", location: "Garden", status: "Open", color: "green" },
];

const translations = {
  en: {
    title: "Facilities / Common Areas",
    subtitle: "Manage and monitor all shared facilities and common areas.",
    addBtn: "Add Facility",
    searchPlaceholder: "Search facilities...",
    thFacility: "Facility Name",
    thLocation: "Location",
    thStatus: "Status",
    thActions: "Actions",
    status: {
      "Open": "Open",
      "Cleaning": "Cleaning",
      "Maintenance": "Maintenance"
    }
  },
  mm: {
    title: "အသုံးအဆောင်များ / ဘုံနေရာများ",
    subtitle: "ဘုံအသုံးပြုသည့် အသုံးအဆောင်များနှင့် နေရာအားလုံးကို စီမံခန့်ခွဲပြီး စောင့်ကြည့်ပါ။",
    addBtn: "အသုံးအဆောင်သစ်ထည့်ရန်",
    searchPlaceholder: "အသုံးအဆောင်များ ရှာဖွေရန်...",
    thFacility: "အသုံးအဆောင်အမည်",
    thLocation: "တည်နေရာ",
    thStatus: "အခြေအနေ",
    thActions: "လုပ်ဆောင်ချက်များ",
    status: {
      "Open": "ဖွင့်ထားသည်",
      "Cleaning": "သန့်ရှင်းရေးလုပ်ဆဲ",
      "Maintenance": "ပြုပြင်ထိန်းသိမ်းဆဲ"
    }
  }
};

export default function FacilitiesPage() {
  const { lang, mounted } = useTranslation();
  const t = translations[lang as keyof typeof translations] || translations.en;

  if (!mounted) return null;

  const rows = elements.map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td>
        <Group gap="sm">
          <ThemeIcon size="md" variant="light" color={element.color} radius="md">
            <IconBuildingCommunity size={18} />
          </ThemeIcon>
          <Stack gap={0}>
            <Text size="sm" fw={700}>{element.name}</Text>
            <Text size="xs" c="dimmed">{element.id}</Text>
          </Stack>
        </Group>
      </Table.Td>
      <Table.Td>
        <Text size="sm" fw={500}>{element.location}</Text>
      </Table.Td>
      <Table.Td>
        <Badge 
          variant="dot" 
          color={element.status === "Open" ? "green" : "orange"}
          fw={700}
        >
          {t.status[element.status as keyof typeof t.status] || element.status}
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
  ));

  return (
    <Stack gap="xl">
      <Group justify="space-between">
        <Stack gap={4}>
          <Title order={2}>{t.title}</Title>
          <Text c="dimmed" size="sm" fw={500}>{t.subtitle}</Text>
        </Stack>
        <Button leftSection={<IconPlus size={16} />} color="#014F86" radius="md">{t.addBtn}</Button>
      </Group>

      <Paper p="md" radius="lg" withBorder shadow="sm" style={{ border: '1px solid #e9ecef' }}>
        <TextInput
          placeholder={t.searchPlaceholder}
          leftSection={<IconSearch size={16} />}
          mb="xl"
          size="md"
          radius="md"
        />
        <Table verticalSpacing="md" highlightOnHover>
          <Table.Thead bg="gray.0">
            <Table.Tr>
              <Table.Th fw={700} fz="sm" c="dark">{t.thFacility}</Table.Th>
              <Table.Th fw={700} fz="sm" c="dark">{t.thLocation}</Table.Th>
              <Table.Th fw={700} fz="sm" c="dark">{t.thStatus}</Table.Th>
              <Table.Th fw={700} fz="sm" c="dark" ta="right">{t.thActions}</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Paper>
    </Stack>
  );
}
