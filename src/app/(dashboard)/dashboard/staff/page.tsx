"use client";

import { Title, Paper, Table, Group, Button, Badge, Stack, Text, Avatar, TextInput, ActionIcon } from "@mantine/core";
import { IconUserPlus, IconSearch, IconShieldLock, IconEdit, IconTrash, IconEye } from "@tabler/icons-react";
import { useTranslation } from "@/hooks/useTranslation";

const elements = [
  { id: "1", name: "Admin User", email: "admin@skyhaven.com", role: "Admin", status: "Active", color: "red" },
  { id: "2", name: "Staff Member", email: "staff@skyhaven.com", role: "Manager", status: "Active", color: "blue" },
  { id: "3", name: "Technician", email: "tech@skyhaven.com", role: "Staff", status: "Inactive", color: "gray" },
];

const translations = {
  en: {
    title: "Staff & User Management",
    subtitle: "Manage administrative access and property staff roles.",
    addBtn: "Add Staff",
    searchPlaceholder: "Search staff by name, email or role...",
    table: {
      user: "User",
      role: "Role",
      status: "Status",
      actions: "Actions",
    },
    roles: {
      Admin: "Admin",
      Manager: "Manager",
      Staff: "Staff",
    },
    statuses: {
      Active: "Active",
      Inactive: "Inactive",
    },
  },
  mm: {
    title: "ဝန်ထမ်းနှင့် အသုံးပြုသူ စီမံခန့်ခွဲမှု",
    subtitle: "စီမံခန့်ခွဲခွင့်နှင့် အိမ်ခြံမြေ ဝန်ထမ်းအဆင့်အတန်းများကို စီမံခန့်ခွဲပါ။",
    addBtn: "ဝန်ထမ်းအသစ်ထည့်ရန်",
    searchPlaceholder: "အမည်၊ အီးမေးလ် သို့မဟုတ် ရာထူးဖြင့် ရှာဖွေရန်...",
    table: {
      user: "အသုံးပြုသူ",
      role: "ရာထူး",
      status: "အခြေအနေ",
      actions: "လုပ်ဆောင်ချက်များ",
    },
    roles: {
      Admin: "စီမံခန့်ခွဲသူ",
      Manager: "မန်နေဂျာ",
      Staff: "ဝန်ထမ်း",
    },
    statuses: {
      Active: "အသုံးပြုဆဲ",
      Inactive: "ရပ်နားထား",
    },
  },
};

export default function StaffPage() {
  const { lang, mounted } = useTranslation();
  const t = translations[lang];

  if (!mounted) return null;

  const rows = elements.map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td>
        <Group gap="sm">
          <Avatar radius="xl" color={element.color} size="sm">{element.name.charAt(0)}</Avatar>
          <div>
            <Text size="sm" fw={500}>{element.name}</Text>
            <Text size="xs" c="dimmed">{element.email}</Text>
          </div>
        </Group>
      </Table.Td>
      <Table.Td>
        <Badge variant="light" color={element.role === "Admin" ? "red" : element.role === "Manager" ? "blue" : "gray"}>
          {t.roles[element.role as keyof typeof t.roles]}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Badge variant="dot" color={element.status === "Active" ? "green" : "gray"}>
          {t.statuses[element.status as keyof typeof t.statuses]}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Group gap={4} justify="flex-end">
          <ActionIcon variant="subtle" color="gray"><IconEye size={16} /></ActionIcon>
          <ActionIcon variant="subtle" color="blue"><IconShieldLock size={16} /></ActionIcon>
          <ActionIcon variant="subtle" color="blue"><IconEdit size={16} /></ActionIcon>
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
              <Table.Th>{t.table.user}</Table.Th>
              <Table.Th>{t.table.role}</Table.Th>
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
