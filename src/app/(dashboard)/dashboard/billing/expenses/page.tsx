"use client";

import { Title, Text, Stack, Paper, Group, ThemeIcon, Button, Table, TextInput, ActionIcon, Badge } from "@mantine/core";
import { IconReportMoney, IconChevronLeft, IconSearch, IconEye, IconEdit, IconTrash, IconPlus } from "@tabler/icons-react";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";

export default function ExpenseTrackingPage() {
  const { lang, mounted } = useTranslation();

  if (!mounted) return null;

  const t = {
    en: {
      title: "Expense Tracking",
      subtitle: "Track and manage property maintenance and operational expenses.",
      back: "Back to Billing",
      comingSoon: "Expense tracking system is coming soon.",
    },
    mm: {
      title: "အသုံးစရိတ်ခြေရာခံခြင်း",
      subtitle: "အိမ်ခြံမြေထိန်းသိမ်းမှုနှင့် လုပ်ငန်းလည်ပတ်မှုအသုံးစရိတ်များကို ခြေရာခံခြင်းနှင့် စီမံခန့်ခွဲခြင်း။",
      back: "ဘဏ္ဍာရေးစာမျက်နှာသို့ ပြန်သွားရန်",
      comingSoon: "အသုံးစရိတ်ခြေရာခံခြင်းစနစ်အား မကြာမီ ရရှိနိုင်တော့မည်ဖြစ်သည်။",
    },
  }[lang === "mm" ? "mm" : "en"];

const mockData = [
    { id: "EXP-001", category: "Maintenance", description: "Elevator Repair", amount: "$450.00", date: "2024-10-02", status: "Paid" },
    { id: "EXP-002", category: "Cleaning", description: "Monthly Cleaning Service", amount: "$200.00", date: "2024-10-05", status: "Paid" },
    { id: "EXP-003", category: "Utilities", description: "Common Area Electricity", amount: "$350.00", date: "2024-10-10", status: "Pending" },
    { id: "EXP-004", category: "Security", description: "Security Guard Salary", amount: "$800.00", date: "2024-10-15", status: "Approved" },
    { id: "EXP-005", category: "Landscaping", description: "Garden Maintenance", amount: "$150.00", date: "2024-10-18", status: "Pending" },
  ];

  return (
    <Stack gap="xl" p="md">
      <Group justify="space-between">
        <Stack gap={4}>
          <Group gap="xs">
            <ThemeIcon variant="light" color="grape" size="lg" radius="md">
              <IconReportMoney size={20} />
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
              <Table.Th fw={700} fz="sm" c="dark">Expense ID</Table.Th>
              <Table.Th fw={700} fz="sm" c="dark">Category & Description</Table.Th>
              <Table.Th fw={700} fz="sm" c="dark">Amount</Table.Th>
              <Table.Th fw={700} fz="sm" c="dark">Date</Table.Th>
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
                    <ThemeIcon size="md" variant="light" color="grape" radius="md">
                      <IconReportMoney size={18} />
                    </ThemeIcon>
                    <Stack gap={0}>
                      <Text size="sm" fw={500}>{item.category}</Text>
                      <Text size="xs" c="dimmed">{item.description}</Text>
                    </Stack>
                  </Group>
                </Table.Td>
                <Table.Td>
                  <Text size="sm" fw={700} c="grape.7">{item.amount}</Text>
                </Table.Td>
                <Table.Td>
                  <Text size="sm">{item.date}</Text>
                </Table.Td>
                <Table.Td>
                  <Badge variant="light" color={item.status === 'Paid' ? 'green' : item.status === 'Approved' ? 'blue' : 'orange'} fw={700}>
                    {item.status}
                  </Badge>
                </Table.Td>
                <Table.Td>
                  <Group gap={4} justify="flex-end">
                    <ActionIcon component={Link} href={`/dashboard/billing/expenses/${item.id}`} variant="subtle" color="gray"><IconEye size={16} /></ActionIcon>
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
