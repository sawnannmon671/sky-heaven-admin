"use client";

import { Title, Paper, Table, Group, Button, TextInput, Badge, Stack, ActionIcon, Text, ThemeIcon } from "@mantine/core";
import { IconPlus, IconSearch, IconEye, IconEdit, IconTrash, IconBuildingCommunity } from "@tabler/icons-react";
import { useLanguageStore } from "@/store/useLanguageStore";

const elements = [
  { id: "101", floor: 1, type: "Studio", status: "Occupied", resident: "John Doe", color: "blue" },
  { id: "102", floor: 1, type: "1 Bedroom", status: "Available", resident: "-", color: "green" },
  { id: "201", floor: 2, type: "2 Bedroom", status: "Occupied", resident: "Jane Smith", color: "blue" },
  { id: "305", floor: 3, type: "Penthouse", status: "Maintenance", resident: "-", color: "orange" },
];

const translations = {
  en: {
    title: "Units Management",
    subtitle: "Manage and monitor all property units and their status.",
    addBtn: "Add Unit",
    searchPlaceholder: "Search units by number, type or resident...",
    thUnitNumber: "Unit Number",
    thFloor: "Floor",
    thType: "Type",
    thStatus: "Status",
    thResident: "Resident",
    thActions: "Actions",
    status: {
      Occupied: "Occupied",
      Available: "Available",
      Maintenance: "Maintenance"
    },
    types: {
      "Studio": "Studio",
      "1 Bedroom": "1 Bedroom",
      "2 Bedroom": "2 Bedroom",
      "Penthouse": "Penthouse"
    }
  },
  mm: {
    title: "ယူနစ်စီမံခန့်ခွဲမှု",
    subtitle: "အိမ်ခြံမြေယူနစ်အားလုံးနှင့် ၎င်းတို့၏ အခြေအနေများကို စီမံခန့်ခွဲပြီး စောင့်ကြည့်ပါ။",
    addBtn: "ယူနစ်အသစ်ထည့်ရန်",
    searchPlaceholder: "ယူနစ်နံပါတ်၊ အမျိုးအစား သို့မဟုတ် နေထိုင်သူဖြင့် ရှာဖွေရန်...",
    thUnitNumber: "ယူနစ်နံပါတ်",
    thFloor: "အလွှာ",
    thType: "အမျိုးအစား",
    thStatus: "အခြေအနေ",
    thResident: "နေထိုင်သူ",
    thActions: "လုပ်ဆောင်ချက်များ",
    status: {
      Occupied: "နေထိုင်သူရှိသည်",
      Available: "အားသည်",
      Maintenance: "ပြုပြင်ထိန်းသိမ်းဆဲ"
    },
    types: {
      "Studio": "စတူဒီယို",
      "1 Bedroom": "အိပ်ခန်း ၁ ခန်း",
      "2 Bedroom": "အိပ်ခန်း ၂ ခန်း",
      "Penthouse": "ပင့်ဟောက်စ်"
    }
  }
};

export default function UnitsPage() {
  const { lang } = useLanguageStore();
  const t = translations[lang];

  const rows = elements.map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td>
        <Group gap="sm">
          <ThemeIcon size="sm" variant="light" color={element.color}>
            <IconBuildingCommunity size={16} />
          </ThemeIcon>
          <Text size="sm" fw={500}>{element.id}</Text>
        </Group>
      </Table.Td>
      <Table.Td>{element.floor}</Table.Td>
      <Table.Td>{t.types[element.type as keyof typeof t.types] || element.type}</Table.Td>
      <Table.Td>
        <Badge 
          variant="dot" 
          color={element.status === "Occupied" ? "blue" : element.status === "Available" ? "green" : "orange"}
        >
          {t.status[element.status as keyof typeof t.status] || element.status}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Text size="sm" c={element.resident === "-" ? "dimmed" : "inherit"}>
          {element.resident}
        </Text>
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
              <Table.Th>{t.thUnitNumber}</Table.Th>
              <Table.Th>{t.thFloor}</Table.Th>
              <Table.Th>{t.thType}</Table.Th>
              <Table.Th>{t.thStatus}</Table.Th>
              <Table.Th>{t.thResident}</Table.Th>
              <Table.Th ta="right">{t.thActions}</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Paper>
    </Stack>
  );
}
