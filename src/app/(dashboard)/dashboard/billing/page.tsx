"use client";

import { Title, Paper, Table, Group, Button, Badge, Stack, Text, ActionIcon, ThemeIcon, TextInput } from "@mantine/core";
import { IconDownload, IconPrinter, IconFileInvoice, IconSearch, IconEye } from "@tabler/icons-react";
import { useLanguageStore } from "@/store/useLanguageStore";

const elements = [
  { id: "INV-001", unit: "101", amount: "$150.00", type: "Monthly Fee", status: "Paid", date: "2024-04-01" },
  { id: "INV-002", unit: "201", amount: "$200.00", type: "Monthly Fee", status: "Pending", date: "2024-04-01" },
  { id: "INV-003", unit: "305", amount: "$45.00", type: "Utility", status: "Overdue", date: "2024-03-15" },
];

const translations = {
  en: {
    title: "Billing & Invoices",
    subtitle: "Manage property fees, utilities, and resident invoicing.",
    generateBtn: "Generate Invoices",
    searchPlaceholder: "Search invoices by ID, unit or type...",
    thInvoiceId: "Invoice ID",
    thUnit: "Unit",
    thType: "Type",
    thAmount: "Amount",
    thDueDate: "Due Date",
    thStatus: "Status",
    thActions: "Actions",
    unit: "Unit",
    status: {
      Paid: "Paid",
      Pending: "Pending",
      Overdue: "Overdue"
    },
    types: {
      "Monthly Fee": "Monthly Fee",
      "Utility": "Utility"
    }
  },
  mm: {
    title: "ငွေတောင်းခံလွှာများနှင့် အင်ဗွိုင်းများ",
    subtitle: "အိမ်ခြံမြေခငွေများ၊ အသုံးအဆောင်စရိတ်များနှင့် နေထိုင်သူများ၏ ငွေတောင်းခံလွှာများကို စီမံခန့်ခွဲပါ။",
    generateBtn: "အင်ဗွိုင်းများထုတ်ရန်",
    searchPlaceholder: "ID၊ ယူနစ် သို့မဟုတ် အမျိုးအစားဖြင့် ရှာဖွေရန်...",
    thInvoiceId: "အင်ဗွိုင်းနံပါတ်",
    thUnit: "ယူနစ်",
    thType: "အမျိုးအစား",
    thAmount: "ပမာဏ",
    thDueDate: "ပေးချေရမည့်ရက်",
    thStatus: "အခြေအနေ",
    thActions: "လုပ်ဆောင်ချက်များ",
    unit: "ယူနစ်",
    status: {
      Paid: "ပေးချေပြီး",
      Pending: "စောင့်ဆိုင်းဆဲ",
      Overdue: "ရက်လွန်"
    },
    types: {
      "Monthly Fee": "လစဉ်ကြေး",
      "Utility": "အသုံးအဆောင်စရိတ်"
    }
  }
};

export default function BillingPage() {
  const { lang } = useLanguageStore();
  const t = translations[lang];

  const rows = elements.map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td>
        <Group gap="sm">
          <ThemeIcon size="sm" variant="light" color="blue">
            <IconFileInvoice size={16} />
          </ThemeIcon>
          <Text size="sm" fw={500}>{element.id}</Text>
        </Group>
      </Table.Td>
      <Table.Td>{t.unit} {element.unit}</Table.Td>
      <Table.Td>{t.types[element.type as keyof typeof t.types] || element.type}</Table.Td>
      <Table.Td>
        <Text fw={700} size="sm">{element.amount}</Text>
      </Table.Td>
      <Table.Td>
        <Text size="sm" c="dimmed">{element.date}</Text>
      </Table.Td>
      <Table.Td>
        <Badge variant="dot" color={element.status === "Paid" ? "green" : element.status === "Pending" ? "yellow" : "red"}>
          {t.status[element.status as keyof typeof t.status] || element.status}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Group gap={4} justify="flex-end">
          <ActionIcon variant="subtle" color="gray"><IconEye size={16} /></ActionIcon>
          <ActionIcon variant="subtle" color="blue"><IconDownload size={16} /></ActionIcon>
          <ActionIcon variant="subtle" color="gray"><IconPrinter size={16} /></ActionIcon>
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
        <Button color="#014F86">{t.generateBtn}</Button>
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
              <Table.Th>{t.thInvoiceId}</Table.Th>
              <Table.Th>{t.thUnit}</Table.Th>
              <Table.Th>{t.thType}</Table.Th>
              <Table.Th>{t.thAmount}</Table.Th>
              <Table.Th>{t.thDueDate}</Table.Th>
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
