"use client";
import { Title, Paper, Table, Group, Button, TextInput, Badge, Stack, ActionIcon, Text, ThemeIcon } from "@mantine/core";
import { IconPlus, IconSearch, IconEye, IconEdit, IconTrash, IconCar } from "@tabler/icons-react";
import { useTranslation } from "@/hooks/useTranslation";

const elements = [
  { id: "P-101", unit: "A-101", resident: "U Aung Aung", type: "Resident", status: "Occupied", color: "blue" },
  { id: "P-102", unit: "-", resident: "-", type: "Resident", status: "Available", color: "green" },
  { id: "P-103", unit: "B-205", resident: "Daw Su Su", type: "Resident", status: "Occupied", color: "blue" },
  { id: "G-01", unit: "-", resident: "U Kyaw", type: "Visitor", status: "Occupied", color: "teal" },
  { id: "G-02", unit: "-", resident: "-", type: "Visitor", status: "Available", color: "green" },
];

const translations = {
  en: {
    title: "Parking Management",
    subtitle: "Manage and assign parking slots for residents and visitors.",
    addBtn: "Assign Slot",
    searchPlaceholder: "Search slots by ID, unit or resident...",
    table: {
      slotId: "Slot ID",
      unit: "Unit",
      resident: "Resident",
      type: "Type",
      status: "Status",
      actions: "Actions",
    },
    types: {
      Resident: "Resident",
      Visitor: "Visitor",
    },
    statuses: {
      Occupied: "Occupied",
      Available: "Available",
    },
  },
  mm: {
    title: "ယာဉ်ရပ်နားမှုစီမံခန့်ခွဲမှု",
    subtitle: "နေထိုင်သူများနှင့် ဧည့်သည်များအတွက် ယာဉ်ရပ်နားရန်နေရာများကို စီမံခန့်ခွဲပြီး သတ်မှတ်ပေးပါ။",
    addBtn: "နေရာသတ်မှတ်ရန်",
    searchPlaceholder: "နေရာနံပါတ်၊ အခန်း သို့မဟုတ် နေထိုင်သူဖြင့် ရှာဖွေရန်...",
    table: {
      slotId: "နေရာနံပါတ်",
      unit: "အခန်း",
      resident: "နေထိုင်သူ",
      type: "အမျိုးအစား",
      status: "အခြေအနေ",
      actions: "လုပ်ဆောင်ချက်များ",
    },
    types: {
      Resident: "နေထိုင်သူ",
      Visitor: "ဧည့်သည်",
    },
    statuses: {
      Occupied: "အသုံးပြုဆဲ",
      Available: "အားလပ်နေ",
    },
  },
};

export default function ParkingPage() {
  const { lang, mounted } = useTranslation();
  const t = translations[lang];

  if (!mounted) return null;

  const rows = elements.map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td>
        <Group gap="sm">
          <ThemeIcon size="sm" variant="light" color={element.color}>
            <IconCar size={16} />
          </ThemeIcon>
          <Text size="sm" fw={500}>{element.id}</Text>
        </Group>
      </Table.Td>
      <Table.Td>{element.unit}</Table.Td>
      <Table.Td>
        <Text size="sm" c={element.resident === "-" ? "dimmed" : "inherit"}>
          {element.resident}
        </Text>
      </Table.Td>
      <Table.Td>
        <Badge variant="light" color={element.type === "Resident" ? "blue" : "teal"}>
          {t.types[element.type as keyof typeof t.types]}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Badge variant="dot" color={element.status === "Occupied" ? "blue" : "green"}>
          {t.statuses[element.status as keyof typeof t.statuses]}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Group gap={4} justify="flex-end">
          <ActionIcon variant="subtle" color="gray">
            <IconEye size={16} />
          </ActionIcon>
          <ActionIcon variant="subtle" color="blue">
            <IconEdit size={16} />
          </ActionIcon>
          <ActionIcon variant="subtle" color="red">
            <IconTrash size={16} />
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Stack gap="xl">
      <Group justify="space-between">
        <Stack gap={0}>
          <Title order={2}>{t.title}</Title>
          <Text c="dimmed" size="sm">{t.subtitle}</Text>
        </Stack>
        <Button leftSection={<IconPlus size={16} />} color="#014F86">{t.addBtn}</Button>
      </Group>

      <Paper p="md" radius="md" withBorder shadow="sm">
        <TextInput
          placeholder={t.searchPlaceholder}
          leftSection={<IconSearch size={16} />}
          mb="xl"
          size="md"
        />
        <Table verticalSpacing="sm" highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>{t.table.slotId}</Table.Th>
              <Table.Th>{t.table.unit}</Table.Th>
              <Table.Th>{t.table.resident}</Table.Th>
              <Table.Th>{t.table.type}</Table.Th>
              <Table.Th>{t.table.status}</Table.Th>
              <Table.Th ta="right">{t.table.actions}</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Paper>
    </Stack>
  );
}
