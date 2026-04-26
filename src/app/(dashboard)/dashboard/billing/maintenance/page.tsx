"use client";

import { Title, Text, Stack, Paper, Group, ThemeIcon, Button, Table, TextInput, ActionIcon, Badge } from "@mantine/core";
import { IconTools, IconChevronLeft, IconSearch, IconEye, IconEdit, IconTrash, IconPlus } from "@tabler/icons-react";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";

export default function MaintenanceFeesPage() {
  const { lang, mounted } = useTranslation();

  if (!mounted) return null;

  const t = {
    en: {
      title: "Monthly Maintenance Fees",
      subtitle: "Track and manage monthly maintenance fee payments.",
      back: "Back to Billing",
      comingSoon: "Maintenance fee management is coming soon.",
    },
    mm: {
      title: "လစဉ်ထိန်းသိမ်းခများ",
      subtitle: "လစဉ်ထိန်းသိမ်းခပေးချေမှုများကို ခြေရာခံခြင်းနှင့် စီမံခန့်ခွဲခြင်း။",
      back: "ဘဏ္ဍာရေးစာမျက်နှာသို့ ပြန်သွားရန်",
      comingSoon: "လစဉ်ထိန်းသိမ်းခစီမံခန့်ခွဲမှုအား မကြာမီ ရရှိနိုင်တော့မည်ဖြစ်သည်။",
    },
  }[lang === "mm" ? "mm" : "en"];

const mockData = [
    { id: "MF-2024-001", unit: "A-101", amount: "$50.00", month: "October 2024", dueDate: "2024-10-05", status: "Paid" },
    { id: "MF-2024-002", unit: "B-205", amount: "$60.00", month: "October 2024", dueDate: "2024-10-05", status: "Unpaid" },
    { id: "MF-2024-003", unit: "C-304", amount: "$55.00", month: "October 2024", dueDate: "2024-10-05", status: "Paid" },
    { id: "MF-2024-004", unit: "A-502", amount: "$50.00", month: "October 2024", dueDate: "2024-10-05", status: "Overdue" },
    { id: "MF-2024-005", unit: "D-102", amount: "$70.00", month: "October 2024", dueDate: "2024-10-05", status: "Paid" },
  ];

  return (
    <Stack gap="xl" p="md">
      <Group justify="space-between">
        <Stack gap={4}>
          <Group gap="xs">
            <ThemeIcon variant="light" color="teal" size="lg" radius="md">
              <IconTools size={20} />
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
              <Table.Th fw={700} fz="sm" c="dark">Fee ID</Table.Th>
              <Table.Th fw={700} fz="sm" c="dark">Unit</Table.Th>
              <Table.Th fw={700} fz="sm" c="dark">Amount</Table.Th>
              <Table.Th fw={700} fz="sm" c="dark">Month / Due Date</Table.Th>
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
                    <ThemeIcon size="md" variant="light" color="teal" radius="md">
                      <IconTools size={18} />
                    </ThemeIcon>
                    <Text size="sm" fw={500}>{item.unit}</Text>
                  </Group>
                </Table.Td>
                <Table.Td>
                  <Text size="sm" fw={700} c="teal.7">{item.amount}</Text>
                </Table.Td>
                <Table.Td>
                  <Stack gap={0}>
                    <Text size="sm">{item.month}</Text>
                    <Text size="xs" c="dimmed">Due: {item.dueDate}</Text>
                  </Stack>
                </Table.Td>
                <Table.Td>
                  <Badge variant="light" color={item.status === 'Paid' ? 'green' : item.status === 'Overdue' ? 'red' : 'orange'} fw={700}>
                    {item.status}
                  </Badge>
                </Table.Td>
                <Table.Td>
                  <Group gap={4} justify="flex-end">
                    <ActionIcon component={Link} href={`/dashboard/billing/maintenance/${item.id}`} variant="subtle" color="gray"><IconEye size={16} /></ActionIcon>
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
