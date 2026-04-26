"use client";

import { Title, Paper, Table, Group, Button, Badge, Stack, Text, Avatar, TextInput, ActionIcon } from "@mantine/core";
import { IconUserPlus, IconSearch, IconEye, IconTrash, IconClock, IconUserCheck, IconUserMinus } from "@tabler/icons-react";
import { useTranslation } from "@/hooks/useTranslation";

const elements = [
  { id: "1", name: "U Kyaw Swar", unit: "A-101", purpose: "Guest", checkIn: "10:30 AM", status: "Checked In", color: "cyan" },
  { id: "2", name: "Daw Ni Ni", unit: "B-205", purpose: "Delivery", checkIn: "09:15 AM", status: "Checked Out", color: "pink" },
  { id: "3", name: "Ko Htun", unit: "C-304", purpose: "Maintenance", checkIn: "11:00 AM", status: "Checked In", color: "orange" },
  { id: "4", name: "Ma Hlaing", unit: "A-502", purpose: "Guest", checkIn: "01:30 PM", status: "Checked In", color: "teal" },
  { id: "5", name: "U Zaw", unit: "D-102", purpose: "Delivery", checkIn: "03:45 PM", status: "Checked Out", color: "indigo" },
];

const translations = {
  en: {
    title: "Visitor Log",
    subtitle: "Monitor and manage visitor access to the property.",
    addBtn: "Register Visitor",
    searchPlaceholder: "Search visitors by name, unit or purpose...",
    unitPrefix: "Unit",
    table: {
      name: "Visitor Name",
      unit: "Unit",
      purpose: "Purpose",
      checkIn: "Check In",
      status: "Status",
      actions: "Actions",
    },
    purposes: {
      Delivery: "Delivery",
      Guest: "Guest",
      Maintenance: "Maintenance",
    },
    statuses: {
      "Checked In": "Checked In",
      "Checked Out": "Checked Out",
    },
    actions: {
      checkOut: "Check Out",
      reEntry: "Re-entry",
    },
  },
  mm: {
    title: "ဧည့်သည်မှတ်တမ်း",
    subtitle: "အိမ်ခြံမြေအတွင်း ဧည့်သည်များ ဝင်ထွက်သွားလာမှုကို စောင့်ကြည့်စီမံပါ။",
    addBtn: "ဧည့်သည်စာရင်းသွင်းရန်",
    searchPlaceholder: "အမည်၊ အခန်းနံပါတ် သို့မဟုတ် အကြောင်းအရာဖြင့် ရှာဖွေရန်...",
    unitPrefix: "အခန်း",
    table: {
      name: "ဧည့်သည်အမည်",
      unit: "အခန်း",
      purpose: "လာရောက်သည့်အကြောင်းအရာ",
      checkIn: "ဝင်ရောက်သည့်အချိန်",
      status: "အခြေအနေ",
      actions: "လုပ်ဆောင်ချက်များ",
    },
    purposes: {
      Delivery: "ပစ္စည်းပို့ဆောင်မှု",
      Guest: "ဧည့်သည်",
      Maintenance: "ပြုပြင်ထိန်းသိမ်းမှု",
    },
    statuses: {
      "Checked In": "ဝင်ရောက်ထား",
      "Checked Out": "ထွက်ခွာပြီး",
    },
    actions: {
      checkOut: "ထွက်ခွာရန်",
      reEntry: "ပြန်လည်ဝင်ရောက်ရန်",
    },
  },
};

export default function VisitorsPage() {
  const { lang, mounted } = useTranslation();
  const t = translations[lang];

  if (!mounted) return null;

  const rows = elements.map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td>
        <Group gap="sm">
          <Avatar size="sm" radius="xl" color={element.color}>{element.name.charAt(0)}</Avatar>
          <Text size="sm" fw={500}>{element.name}</Text>
        </Group>
      </Table.Td>
      <Table.Td>{t.unitPrefix} {element.unit}</Table.Td>
      <Table.Td>
        <Badge variant="light" color="gray">
          {t.purposes[element.purpose as keyof typeof t.purposes] || element.purpose}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Group gap={4}>
          <IconClock size={14} style={{ color: "var(--mantine-color-dimmed)" }} />
          <Text size="sm">{element.checkIn}</Text>
        </Group>
      </Table.Td>
      <Table.Td>
        <Badge variant="dot" color={element.status === "Checked In" ? "green" : "gray"}>
          {t.statuses[element.status as keyof typeof t.statuses] || element.status}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Group gap={4} justify="flex-end">
          <ActionIcon variant="subtle" color="gray"><IconEye size={16} /></ActionIcon>
          {element.status === "Checked In" ? (
            <Button variant="subtle" size="xs" color="red" leftSection={<IconUserMinus size={14} />}>
              {t.actions.checkOut}
            </Button>
          ) : (
            <Button variant="subtle" size="xs" color="blue" leftSection={<IconUserCheck size={14} />}>
              {t.actions.reEntry}
            </Button>
          )}
          <ActionIcon variant="subtle" color="red"><IconTrash size={16} /></ActionIcon>
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
        <Button leftSection={<IconUserPlus size={16} />} color="#014F86">{t.addBtn}</Button>
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
              <Table.Th>{t.table.name}</Table.Th>
              <Table.Th>{t.table.unit}</Table.Th>
              <Table.Th>{t.table.purpose}</Table.Th>
              <Table.Th>{t.table.checkIn}</Table.Th>
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
