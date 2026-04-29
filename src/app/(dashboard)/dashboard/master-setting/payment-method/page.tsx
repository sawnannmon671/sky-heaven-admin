"use client";

import { useState } from "react";
import {  Title, Paper, Table, Group, Button, Stack, Text, ActionIcon, ThemeIcon, TextInput, Avatar , Pagination } from "@mantine/core";
import { IconSearch, IconPlus, IconEdit, IconTrash, IconWallet } from "@tabler/icons-react";
import { useTranslation } from "@/hooks/useTranslation";

const paymentMethods = [
  { id: 1, name: "AYA Bank", type: "Bank Transfer", account: "123-456-789", status: "Active", logo: "https://ui-avatars.com/api/?name=AYA+Bank&background=ED1C24&color=fff" },
  { id: 2, name: "AYA Pay", type: "Mobile Wallet", account: "09123456789", status: "Active", logo: "https://ui-avatars.com/api/?name=AYA+Pay&background=ED1C24&color=fff" },
  { id: 3, name: "AYA Bank (Corporate)", type: "Bank Transfer", account: "111-222-333", status: "Active", logo: "https://ui-avatars.com/api/?name=AYA+Corp&background=ED1C24&color=fff" },
  { id: 4, name: "Cash", type: "Cash", account: "N/A", status: "Active", logo: "https://ui-avatars.com/api/?name=Cash&background=008000&color=fff" },
  { id: 5, name: "Credit Card (AYA)", type: "Card Payment", account: "xxxx-xxxx-xxxx-1234", status: "Inactive", logo: "https://ui-avatars.com/api/?name=AYA+Card&background=ED1C24&color=fff" },
];

const translations = {
  en: {
    title: "Payment Methods",
    subtitle: "Manage specific payment accounts and methods for receiving payments.",
    addBtn: "Add Payment Method",
    searchPlaceholder: "Search payment methods...",
    thLogo: "Logo",
    thName: "Name",
    thType: "Type",
    thAccount: "Account Info",
    thStatus: "Status",
    thActions: "Actions",
    active: "Active",
    inactive: "Inactive",
    types: {
      "Bank Transfer": "Bank Transfer",
      "Mobile Wallet": "Mobile Wallet",
      "Cash": "Cash",
      "Card Payment": "Card Payment"
    }
  },
  mm: {
    title: "ငွေပေးချေမှုနည်းလမ်းများ",
    subtitle: "ငွေလက်ခံရန်အတွက် သီးခြားငွေပေးချေမှုအကောင့်များနှင့် နည်းလမ်းများကို စီမံခန့်ခွဲပါ။",
    addBtn: "ငွေပေးချေမှုနည်းလမ်းအသစ်ထည့်ရန်",
    searchPlaceholder: "ရှာဖွေရန်...",
    thLogo: "လိုဂို",
    thName: "အမည်",
    thType: "အမျိုးအစား",
    thAccount: "အကောင့်အချက်အလက်",
    thStatus: "အခြေအနေ",
    thActions: "လုပ်ဆောင်ချက်များ",
    active: "အသုံးပြုဆဲ",
    inactive: "ရပ်နားထား",
    types: {
      "Bank Transfer": "ဘဏ်မှတဆင့်ပေးချေမှု",
      "Mobile Wallet": "မိုဘိုင်းပိုက်ဆံအိတ်",
      "Cash": "ငွေသား",
      "Card Payment": "ကတ်ဖြင့်ပေးချေမှု"
    }
  }
};

export default function PaymentMethodPage() {
  const [activePage, setPage] = useState(1);
  const itemsPerPage = 5;

  const { lang, mounted } = useTranslation();
  const t = translations[lang];

  

  const rows = paymentMethods.map((method) => (
    <Table.Tr key={method.id}>
      <Table.Td>
        <Avatar src={method.logo} alt={method.name} radius="xl" size="sm" />
      </Table.Td>
      <Table.Td>
        <Group gap="sm">
          <ThemeIcon size="sm" variant="light" color="cyan">
            <IconWallet size={16} />
          </ThemeIcon>
          <Text size="sm" fw={500}>{method.name}</Text>
        </Group>
      </Table.Td>
      <Table.Td>{t.types[method.type as keyof typeof t.types] || method.type}</Table.Td>
      <Table.Td>{method.account}</Table.Td>
      <Table.Td>
        <Text size="sm" c={method.status === "Active" ? "green" : "red"} fw={500}>
          {method.status === "Active" ? t.active : t.inactive}
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
          <Title order={2} c="#014F86">{t.title}</Title>
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
              <Table.Th w={60}>{t.thLogo}</Table.Th>
              <Table.Th>{t.thName}</Table.Th>
              <Table.Th>{t.thType}</Table.Th>
              <Table.Th>{t.thAccount}</Table.Th>
              <Table.Th>{t.thStatus}</Table.Th>
              <Table.Th ta="right">{t.thActions}</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows.slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage)}</Table.Tbody>
        </Table>
        <Group justify="space-between" mt="md">
          <Text size="sm" c="dimmed">
            Showing {((activePage - 1) * itemsPerPage) + 1} to {Math.min(activePage * itemsPerPage, rows.length)} of {rows.length} entries
          </Text>
          <Pagination total={Math.ceil(rows.length / itemsPerPage)} value={activePage} onChange={setPage} color="#014F86" />
        </Group>
      
      </Paper>
    </Stack>
  );
}
