"use client";

import { Title, Paper, Table, Group, Button, TextInput, Stack, Text, ThemeIcon, ActionIcon, Badge } from "@mantine/core";
import { IconPlus, IconSearch, IconEye, IconEdit, IconTrash, IconLayoutBoard } from "@tabler/icons-react";
import Link from "next/link";
import { useTranslation } from "@/hooks/useTranslation";

const elements = [
  { id: "TYP-STD", name: "Studio", size: "450 sqft", rooms: "1 Room", price: "$1,200", color: "blue" },
  { id: "TYP-1BR", name: "1 Bedroom", size: "750 sqft", rooms: "2 Rooms", price: "$1,800", color: "green" },
  { id: "TYP-2BR", name: "2 Bedroom", size: "1,100 sqft", rooms: "3 Rooms", price: "$2,500", color: "orange" },
  { id: "TYP-PNT", name: "Penthouse", size: "2,500 sqft", rooms: "5 Rooms", price: "$5,000", color: "violet" },
];

const translations = {
  en: {
    title: "Unit Types",
    subtitle: "Define and manage different unit configurations and pricing.",
    addBtn: "Add Unit Type",
    searchPlaceholder: "Search unit types...",
    thType: "Type Name",
    thSize: "Average Size",
    thRooms: "Room Count",
    thPrice: "Base Price",
    thActions: "Actions",
    types: {
      "Studio": "Studio",
      "1 Bedroom": "1 Bedroom",
      "2 Bedroom": "2 Bedroom",
      "Penthouse": "Penthouse"
    }
  },
  mm: {
    title: "ယူနစ်အမျိုးအစားများ",
    subtitle: "ယူနစ်ပုံစံအမျိုးမျိုးနှင့် ဈေးနှုန်းများကို သတ်မှတ်စီမံပါ။",
    addBtn: "အမျိုးအစားအသစ်ထည့်ရန်",
    searchPlaceholder: "ယူနစ်အမျိုးအစားများ ရှာဖွေရန်...",
    thType: "အမျိုးအစားအမည်",
    thSize: "ပျမ်းမျှအကျယ်",
    thRooms: "အခန်းအရေအတွက်",
    thPrice: "အခြေခံဈေးနှုန်း",
    thActions: "လုပ်ဆောင်ချက်များ",
    types: {
      "Studio": "စတူဒီယို",
      "1 Bedroom": "အိပ်ခန်း ၁ ခန်း",
      "2 Bedroom": "အိပ်ခန်း ၂ ခန်း",
      "Penthouse": "ပင့်ဟောက်စ်"
    }
  }
};

export default function UnitTypesPage() {
  const { lang, mounted } = useTranslation();
  const t = translations[lang as keyof typeof translations] || translations.en;

  if (!mounted) return null;

  const rows = elements.map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td>
        <Group gap="sm">
          <ThemeIcon size="md" variant="light" color={element.color} radius="md">
            <IconLayoutBoard size={18} />
          </ThemeIcon>
          <Stack gap={0}>
            <Text size="sm" fw={700}>{t.types[element.name as keyof typeof t.types] || element.name}</Text>
            <Text size="xs" c="dimmed">{element.id}</Text>
          </Stack>
        </Group>
      </Table.Td>
      <Table.Td>
        <Text size="sm" fw={500}>{element.size}</Text>
      </Table.Td>
      <Table.Td>
        <Text size="sm" fw={500}>{element.rooms}</Text>
      </Table.Td>
      <Table.Td>
        <Text size="sm" fw={700} c="blue">{element.price}</Text>
      </Table.Td>
      <Table.Td>
        <Group gap={4} justify="flex-end">
          <ActionIcon component={Link} href={`/dashboard/unit-types/${element.id}`} variant="subtle" color="gray"><IconEye size={16} /></ActionIcon>
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
              <Table.Th fw={700} fz="sm" c="dark">{t.thType}</Table.Th>
              <Table.Th fw={700} fz="sm" c="dark">{t.thSize}</Table.Th>
              <Table.Th fw={700} fz="sm" c="dark">{t.thRooms}</Table.Th>
              <Table.Th fw={700} fz="sm" c="dark">{t.thPrice}</Table.Th>
              <Table.Th fw={700} fz="sm" c="dark" ta="right">{t.thActions}</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Paper>
    </Stack>
  );
}
