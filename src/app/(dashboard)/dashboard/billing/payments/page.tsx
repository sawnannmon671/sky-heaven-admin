"use client";

import { Title, Text, Stack, Paper, Group, ThemeIcon, Button, Table, TextInput, ActionIcon, Badge } from "@mantine/core";
import { IconHistory, IconChevronLeft, IconSearch, IconEye, IconEdit, IconTrash, IconPlus } from "@tabler/icons-react";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";

export default function PaymentRecordsPage() {
  const { lang, mounted } = useTranslation();

  if (!mounted) return null;

  const t = {
    en: {
      title: "Payment Records",
      subtitle: "View and manage all resident payment history.",
      back: "Back to Billing",
      comingSoon: "Payment records management is coming soon.",
    },
    mm: {
      title: "ငွေပေးချေမှုမှတ်တမ်းများ",
      subtitle: "နေထိုင်သူများ၏ ငွေပေးချေမှုမှတ်တမ်းအားလုံးကို ကြည့်ရှုခြင်းနှင့် စီမံခန့်ခွဲခြင်း။",
      back: "ဘဏ္ဍာရေးစာမျက်နှာသို့ ပြန်သွားရန်",
      comingSoon: "ငွေပေးချေမှုမှတ်တမ်းစီမံခန့်ခွဲမှုအား မကြာမီ ရရှိနိုင်တော့မည်ဖြစ်သည်။",
    },
  }[lang === "mm" ? "mm" : "en"];

const mockData = [
    { id: "PAY-001", invoiceId: "INV-2024-001", resident: "U Aung Aung", amount: "$150.00", method: "Bank Transfer", date: "2024-10-05", status: "Completed" },
    { id: "PAY-002", invoiceId: "INV-2024-003", resident: "U Kyaw Min", amount: "$200.00", method: "Cash", date: "2024-10-10", status: "Completed" },
    { id: "PAY-003", invoiceId: "INV-2024-005", resident: "U Zaw Myo", amount: "$180.00", method: "Credit Card", date: "2024-10-12", status: "Completed" },
    { id: "PAY-004", invoiceId: "INV-2024-002", resident: "Daw Su Su", amount: "$120.00", method: "Mobile Wallet", date: "2024-10-15", status: "Processing" },
    { id: "PAY-005", invoiceId: "INV-2024-004", resident: "Daw Hla Hla", amount: "$150.00", method: "Bank Transfer", date: "2024-10-16", status: "Failed" },
  ];

  return (
    <Stack gap="xl" p="md">
      <Group justify="space-between">
        <Stack gap={4}>
          <Group gap="xs">
            <ThemeIcon variant="light" color="green" size="lg" radius="md">
              <IconHistory size={20} />
            </ThemeIcon>
            <Title order={1}>{t.title}</Title>
          </Group>
          <Text c="dimmed" size="md">{t.subtitle}</Text>
        </Stack>
        <Button 
          component={Link} 
          href="/dashboard/billing" 
          variant="subtle" 
          leftSection={<IconChevronLeft size={16} />}
          color="gray"
        >
          {t.back}
        </Button>
      </Group>

      
      <Paper p="md" radius="lg" withBorder shadow="sm" style={{ border: '1px solid #e9ecef' }}>
        <Group justify="space-between" mb="md">
          <TextInput
            placeholder="Search..."
            leftSection={<IconSearch size={16} />}
            size="md"
            radius="md"
            style={{ flex: 1, maxWidth: 400 }}
          />
          <Button leftSection={<IconPlus size={16} />} color="#014F86" radius="md">
            Add New
          </Button>
        </Group>

        <Table verticalSpacing="md" highlightOnHover>
          <Table.Thead bg="gray.0">
            <Table.Tr>
              <Table.Th fw={700} fz="sm" c="dark">Payment ID</Table.Th>
              <Table.Th fw={700} fz="sm" c="dark">Invoice & Resident</Table.Th>
              <Table.Th fw={700} fz="sm" c="dark">Amount</Table.Th>
              <Table.Th fw={700} fz="sm" c="dark">Method / Date</Table.Th>
              <Table.Th fw={700} fz="sm" c="dark">Status</Table.Th>
              <Table.Th fw={700} fz="sm" c="dark" ta="right">Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {mockData.map((item) => (
              <Table.Tr key={item.id}>
                <Table.Td>
                  <Text size="sm" fw={700}>{item.id}</Text>
                </Table.Td>
                <Table.Td>
                  <Group gap="sm">
                    <ThemeIcon size="md" variant="light" color="green" radius="md">
                      <IconHistory size={18} />
                    </ThemeIcon>
                    <Stack gap={0}>
                      <Text size="sm" fw={500}>{item.invoiceId}</Text>
                      <Text size="xs" c="dimmed">{item.resident}</Text>
                    </Stack>
                  </Group>
                </Table.Td>
                <Table.Td>
                  <Text size="sm" fw={700} c="green.7">{item.amount}</Text>
                </Table.Td>
                <Table.Td>
                  <Stack gap={0}>
                    <Text size="sm">{item.method}</Text>
                    <Text size="xs" c="dimmed">{item.date}</Text>
                  </Stack>
                </Table.Td>
                <Table.Td>
                  <Badge variant="light" color={item.status === 'Completed' ? 'green' : item.status === 'Processing' ? 'blue' : 'red'} fw={700}>
                    {item.status}
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
            ))}
          </Table.Tbody>
        </Table>
      </Paper>
    </Stack>
  );
}
