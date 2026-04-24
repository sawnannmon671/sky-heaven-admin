"use client";

import { Title, Paper, Table, Group, Button, Stack, Text, ActionIcon, ThemeIcon, TextInput } from "@mantine/core";
import { IconSearch, IconPlus, IconEdit, IconTrash, IconCreditCard } from "@tabler/icons-react";
import { useTranslation } from "@/hooks/useTranslation";

const paymentTypes = [
  { id: 1, name: "Cash", description: "Direct cash payments", status: "Active" },
  { id: 2, name: "Bank Transfer", description: "Direct bank deposits", status: "Active" },
  { id: 3, name: "Credit Card", description: "Online credit card payments", status: "Inactive" },
  { id: 4, name: "Mobile Wallet", description: "AYAPay, WavePay, etc.", status: "Active" },
];

const translations = {
  en: {
    title: "Payment Types",
    subtitle: "Manage different categories of payment accepted by the system.",
    addBtn: "Add Payment Type",
    searchPlaceholder: "Search payment types...",
    thName: "Name",
    thDescription: "Description",
    thStatus: "Status",
    thActions: "Actions",
    active: "Active",
    inactive: "Inactive",
    types: {
      "Cash": "Cash",
      "Bank Transfer": "Bank Transfer",
      "Credit Card": "Credit Card",
      "Mobile Wallet": "Mobile Wallet",
      "Direct cash payments": "Direct cash payments",
      "Direct bank deposits": "Direct bank deposits",
      "Online credit card payments": "Online credit card payments",
      "AYAPay, WavePay, etc.": "AYAPay, WavePay, etc."
    }
  },
  mm: {
    title: "ငွေပေးချေမှုအမျိုးအစားများ",
    subtitle: "စနစ်မှ လက်ခံသော ငွေပေးချေမှု အမျိုးအစားများကို စီမံခန့်ခွဲပါ။",
    addBtn: "ငွေပေးချေမှုအမျိုးအစားအသစ်ထည့်ရန်",
    searchPlaceholder: "ရှာဖွေရန်...",
    thName: "အမည်",
    thDescription: "ဖော်ပြချက်",
    thStatus: "အခြေအနေ",
    thActions: "လုပ်ဆောင်ချက်များ",
    active: "အသုံးပြုဆဲ",
    inactive: "ရပ်နားထား",
    types: {
      "Cash": "လက်ငင်းငွေ",
      "Bank Transfer": "ဘဏ်မှတဆင့်ပေးချေမှု",
      "Credit Card": "ခရက်ဒစ်ကတ်",
      "Mobile Wallet": "မိုဘိုင်းပိုက်ဆံအိတ်",
      "Direct cash payments": "လက်ငင်းငွေဖြင့် တိုက်ရိုက်ပေးချေမှုများ",
      "Direct bank deposits": "ဘဏ်မှတဆင့် တိုက်ရိုက်ငွေသွင်းမှုများ",
      "Online credit card payments": "အွန်လိုင်းခရက်ဒစ်ကတ်ဖြင့် ပေးချေမှုများ",
      "AYAPay, WavePay, etc.": "AYAPay, WavePay, စသည်တို့"
    }
  }
};

export default function PaymentTypePage() {
  const { lang, mounted } = useTranslation();
  const t = translations[lang];

  if (!mounted) return null;

  const rows = paymentTypes.map((type) => (
    <Table.Tr key={type.id}>
      <Table.Td>
        <Group gap="sm">
          <ThemeIcon size="sm" variant="light" color="blue">
            <IconCreditCard size={16} />
          </ThemeIcon>
          <Text size="sm" fw={500}>{t.types[type.name as keyof typeof t.types] || type.name}</Text>
        </Group>
      </Table.Td>
      <Table.Td>{t.types[type.description as keyof typeof t.types] || type.description}</Table.Td>
      <Table.Td>
        <Text size="sm" c={type.status === "Active" ? "green" : "red"} fw={500}>
          {type.status === "Active" ? t.active : t.inactive}
        </Text>
      </Table.Td>
      <Table.Td>
        <Group gap={4} justify="flex-end">
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
        <Button color="#014F86" leftSection={<IconPlus size={18} />}>{t.addBtn}</Button>
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
              <Table.Th>{t.thName}</Table.Th>
              <Table.Th>{t.thDescription}</Table.Th>
              <Table.Th>{t.thStatus}</Table.Th>
              <Table.Th ta="right">{t.thActions}</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Paper>
    </Stack>
  );
}
