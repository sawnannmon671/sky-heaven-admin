"use client";

import { useState } from "react";
import {  Title, Text, Stack, Paper, Group, ThemeIcon, Button, Table, TextInput, ActionIcon, Badge , Pagination } from "@mantine/core";
import { IconRotate2, IconChevronLeft, IconSearch, IconEye, IconEdit, IconTrash, IconPlus } from "@tabler/icons-react";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";

export default function RefundsPage() {
  const [activePage, setPage] = useState(1);
  const itemsPerPage = 5;

  const { lang, mounted } = useTranslation();

  if (!mounted) return null;

  const t = {
    en: {
      title: "Refunds",
      subtitle: "Process and track resident refund requests.",
      back: "Back to Billing",
      comingSoon: "Refund management system is coming soon.",
    },
    mm: {
      title: "ငွေပြန်အမ်းမှုများ",
      subtitle: "နေထိုင်သူများ၏ ငွေပြန်အမ်းရန်တောင်းဆိုမှုများကို လုပ်ဆောင်ခြင်းနှင့် ခြေရာခံခြင်း။",
      back: "ဘဏ္ဍာရေးစာမျက်နှာသို့ ပြန်သွားရန်",
      comingSoon: "ငွေပြန်အမ်းမှုစီမံခန့်ခွဲမှုအား မကြာမီ ရရှိနိုင်တော့မည်ဖြစ်သည်။",
    },
  }[lang === "mm" ? "mm" : "en"];

const mockData = [
    { id: "REF-001", unit: "A-101", resident: "U Aung Aung", amount: "$50.00", reason: "Overpayment", date: "2024-10-08", status: "Completed" },
    { id: "REF-002", unit: "B-205", resident: "Daw Su Su", amount: "$25.00", reason: "Deposit Return", date: "2024-10-10", status: "Pending" },
    { id: "REF-003", unit: "C-304", resident: "U Kyaw Min", amount: "$15.00", reason: "Maintenance Error", date: "2024-10-12", status: "Processing" },
    { id: "REF-004", unit: "A-502", resident: "Daw Hla Hla", amount: "$30.00", reason: "Overpayment", date: "2024-10-15", status: "Completed" },
    { id: "REF-005", unit: "D-102", resident: "U Zaw Myo", amount: "$100.00", reason: "Move-out Deposit", date: "2024-10-20", status: "Pending" },
  ];

  return (
    <Stack gap="xl" p="md">
      <Group justify="space-between">
        <Stack gap={4}>
          <Group gap="xs">
            <ThemeIcon variant="light" color="orange" size="lg" radius="md">
              <IconRotate2 size={20} />
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
              <Table.Th fw={700} fz="sm" c="dark">Refund ID</Table.Th>
              <Table.Th fw={700} fz="sm" c="dark">Unit & Resident</Table.Th>
              <Table.Th fw={700} fz="sm" c="dark">Amount</Table.Th>
              <Table.Th fw={700} fz="sm" c="dark">Reason</Table.Th>
              <Table.Th fw={700} fz="sm" c="dark">Date</Table.Th>
              <Table.Th fw={700} fz="sm" c="dark">Status</Table.Th>
              <Table.Th fw={700} fz="sm" c="dark" ta="right">Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {mockData.slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage).map((item) => (
              <Table.Tr key={item.id}>
                <Table.Td>
                  <Text size="sm" fw={700}>{item.id}</Text>
                </Table.Td>
                <Table.Td>
                  <Group gap="sm">
                    <ThemeIcon size="md" variant="light" color="orange" radius="md">
                      <IconRotate2 size={18} />
                    </ThemeIcon>
                    <Stack gap={0}>
                      <Text size="sm" fw={500}>{item.unit}</Text>
                      <Text size="xs" c="dimmed">{item.resident}</Text>
                    </Stack>
                  </Group>
                </Table.Td>
                <Table.Td>
                  <Text size="sm" fw={700} c="orange.7">{item.amount}</Text>
                </Table.Td>
                <Table.Td>
                  <Text size="sm">{item.reason}</Text>
                </Table.Td>
                <Table.Td>
                  <Text size="sm">{item.date}</Text>
                </Table.Td>
                <Table.Td>
                  <Badge variant="light" color={item.status === 'Completed' ? 'green' : item.status === 'Processing' ? 'blue' : 'orange'} fw={700}>
                    {item.status}
                  </Badge>
                </Table.Td>
                <Table.Td>
                  <Group gap={4} justify="flex-end">
                    <ActionIcon component={Link} href={`/dashboard/billing/refunds/${item.id}`} variant="subtle" color="gray"><IconEye size={16} /></ActionIcon>
                    <ActionIcon variant="subtle" color="blue"><IconEdit size={16} /></ActionIcon>
                    <ActionIcon variant="subtle" color="red"><IconTrash size={16} /></ActionIcon>
                  </Group>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
        <Group justify="space-between" mt="md">
          <Text size="sm" c="dimmed">
            Showing {((activePage - 1) * itemsPerPage) + 1} to {Math.min(activePage * itemsPerPage, mockData.length)} of {mockData.length} entries
          </Text>
          <Pagination total={Math.ceil(mockData.length / itemsPerPage)} value={activePage} onChange={setPage} color="#014F86" />
        </Group>
      
      </Paper>
    </Stack>
  );
}
