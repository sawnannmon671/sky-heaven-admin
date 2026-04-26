"use client";

import { Title, Paper, Table, Group, Button, TextInput, Stack, Text, ThemeIcon, ActionIcon, Badge, Select } from "@mantine/core";
import { IconPlus, IconSearch, IconEye, IconEdit, IconTrash, IconLayersIntersect } from "@tabler/icons-react";
import { useTranslation } from "@/hooks/useTranslation";

const elements = [
  { id: "FL-A-01", building: "Tower A", floor: "Floor 1", units: 4, type: "Residential", color: "blue" },
  { id: "FL-A-02", building: "Tower A", floor: "Floor 2", units: 4, type: "Residential", color: "blue" },
  { id: "FL-B-PH", building: "Tower B", floor: "Penthouse", units: 2, type: "Premium", color: "violet" },
];

const translations = {
  en: {
    title: "Floors",
    subtitle: "Manage and monitor individual floors across all buildings.",
    addBtn: "Add Floor",
    searchPlaceholder: "Search floors...",
    filterBuilding: "All Buildings",
    thFloor: "Floor Name",
    thBuilding: "Building",
    thUnits: "Total Units",
    thType: "Floor Type",
    thActions: "Actions",
    types: {
      "Residential": "Residential",
      "Premium": "Premium",
      "Commercial": "Commercial"
    }
  },
  mm: {
    title: "အလွှာများ",
    subtitle: "အဆောက်အဦးအားလုံးရှိ တစ်ခုချင်းစီသောအလွှာများကို စီမံခန့်ခွဲပြီး စောင့်ကြည့်ပါ။",
    addBtn: "အလွှာအသစ်ထည့်ရန်",
    searchPlaceholder: "အလွှာများ ရှာဖွေရန်...",
    filterBuilding: "အဆောက်အဦးအားလုံး",
    thFloor: "အလွှာအမည်",
    thBuilding: "အဆောက်အဦး",
    thUnits: "စုစုပေါင်းယူနစ်",
    thType: "အလွှာအမျိုးအစား",
    thActions: "လုပ်ဆောင်ချက်များ",
    types: {
      "Residential": "နေထိုင်ရန်",
      "Premium": "ပရီမီယံ",
      "Commercial": "စီးပွားရေး"
    }
  }
};

export default function FloorsPage() {
  const { lang, mounted } = useTranslation();
  const t = translations[lang as keyof typeof translations] || translations.en;

  if (!mounted) return null;

  const rows = elements.map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td>
        <Group gap="sm">
          <ThemeIcon size="md" variant="light" color={element.color} radius="md">
            <IconLayersIntersect size={18} />
          </ThemeIcon>
          <Stack gap={0}>
            <Text size="sm" fw={700}>{element.floor}</Text>
            <Text size="xs" c="dimmed">{element.id}</Text>
          </Stack>
        </Group>
      </Table.Td>
      <Table.Td>
        <Text size="sm" fw={500}>{element.building}</Text>
      </Table.Td>
      <Table.Td>
        <Text size="sm" fw={500}>{element.units}</Text>
      </Table.Td>
      <Table.Td>
        <Badge variant="light" color={element.color} fw={700}>
          {t.types[element.type as keyof typeof t.types] || element.type}
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
        <Group mb="xl">
          <TextInput
            placeholder={t.searchPlaceholder}
            leftSection={<IconSearch size={16} />}
            size="md"
            radius="md"
            style={{ flex: 1 }}
          />
          <Select
            placeholder={t.filterBuilding}
            data={["Tower A", "Tower B", "Tower C"]}
            size="md"
            radius="md"
            w={200}
          />
        </Group>
        <Table verticalSpacing="md" highlightOnHover>
          <Table.Thead bg="gray.0">
            <Table.Tr>
              <Table.Th fw={700} fz="sm" c="dark">{t.thFloor}</Table.Th>
              <Table.Th fw={700} fz="sm" c="dark">{t.thBuilding}</Table.Th>
              <Table.Th fw={700} fz="sm" c="dark">{t.thUnits}</Table.Th>
              <Table.Th fw={700} fz="sm" c="dark">{t.thType}</Table.Th>
              <Table.Th fw={700} fz="sm" c="dark" ta="right">{t.thActions}</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Paper>
    </Stack>
  );
}
