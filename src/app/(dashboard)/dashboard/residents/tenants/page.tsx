"use client";

import { Title, Text, Stack, Paper, Group, ThemeIcon, Button, Table, TextInput, ActionIcon, Badge } from "@mantine/core";
import { IconUsersGroup, IconChevronLeft, IconSearch, IconEye, IconEdit, IconTrash, IconPlus } from "@tabler/icons-react";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";

export default function TenantsPage() {
  const { lang, mounted } = useTranslation();

  if (!mounted) return null;

  const t = {
    en: {
      title: "Tenants List",
      subtitle: "Manage tenants and their rental agreements.",
      back: "Back to Residents",
      comingSoon: "Tenant management details are coming soon.",
    },
    mm: {
      title: "အိမ်ငှားများစာရင်း",
      subtitle: "အိမ်ငှားများနှင့် ၎င်းတို့၏ အငှားစာချုပ်များကို စီမံခန့်ခွဲပါ။",
      back: "နေထိုင်သူများစာရင်းသို့ ပြန်သွားရန်",
      comingSoon: "အိမ်ငှားစီမံခန့်ခွဲမှုအသေးစိတ်အား မကြာမီ ရရှိနိုင်တော့မည်ဖြစ်သည်။",
    },
  }[lang === "mm" ? "mm" : "en"];

const mockData = [
    { id: "TEN-001", name: "U Tun Tun", phone: "+95 9 123 456 789", email: "tuntun@example.com", unit: "A-101", leaseEnd: "2024-12-31", status: "Active" },
    { id: "TEN-002", name: "Daw Mya Mya", phone: "+95 9 987 654 321", email: "myamya@example.com", unit: "B-205", leaseEnd: "2025-06-30", status: "Active" },
    { id: "TEN-003", name: "U Hlaing Bwar", phone: "+95 9 555 666 777", email: "hlaing@example.com", unit: "C-304", leaseEnd: "2023-11-15", status: "Expired" },
    { id: "TEN-004", name: "Daw Thandar", phone: "+95 9 111 222 333", email: "thandar@example.com", unit: "A-502", leaseEnd: "2024-08-20", status: "Active" },
    { id: "TEN-005", name: "U Nyan Lin", phone: "+95 9 444 888 999", email: "nyan@example.com", unit: "D-102", leaseEnd: "2024-01-10", status: "Pending" },
  ];

  return (
    <Stack gap="xl" p="md">
      <Group justify="space-between">
        <Stack gap={4}>
          <Group gap="xs">
            <ThemeIcon variant="light" color="blue" size="lg" radius="md">
              <IconUsersGroup size={20} />
            </ThemeIcon>
            <Title order={1}>{t.title}</Title>
          </Group>
          <Text c="dimmed" size="md">{t.subtitle}</Text>
        </Stack>
        <Button 
          component={Link} 
          href="/dashboard/residents" 
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
              <Table.Th fw={700} fz="sm" c="dark">ID</Table.Th>
              <Table.Th fw={700} fz="sm" c="dark">Tenant Name</Table.Th>
              <Table.Th fw={700} fz="sm" c="dark">Contact Info</Table.Th>
              <Table.Th fw={700} fz="sm" c="dark">Unit</Table.Th>
              <Table.Th fw={700} fz="sm" c="dark">Lease End</Table.Th>
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
                    <ThemeIcon size="md" variant="light" color="blue" radius="md">
                      <IconUsersGroup size={18} />
                    </ThemeIcon>
                    <Text size="sm" fw={500}>{item.name}</Text>
                  </Group>
                </Table.Td>
                <Table.Td>
                  <Stack gap={0}>
                    <Text size="sm">{item.phone}</Text>
                    <Text size="xs" c="dimmed">{item.email}</Text>
                  </Stack>
                </Table.Td>
                <Table.Td>
                  <Text size="sm" fw={500}>{item.unit}</Text>
                </Table.Td>
                <Table.Td>
                  <Text size="sm">{item.leaseEnd}</Text>
                </Table.Td>
                <Table.Td>
                  <Badge variant="light" color={item.status === 'Active' ? 'green' : item.status === 'Expired' ? 'red' : 'blue'} fw={700}>
                    {item.status}
                  </Badge>
                </Table.Td>
                <Table.Td>
                  <Group gap={4} justify="flex-end">
                    <ActionIcon component={Link} href={`/dashboard/residents/tenants/${item.id}`} variant="subtle" color="gray"><IconEye size={16} /></ActionIcon>
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
