"use client";

import { useState } from "react";
import {  Title, Text, Stack, Paper, Group, ThemeIcon, Button, Table, TextInput, ActionIcon, Badge , Pagination } from "@mantine/core";
import { IconUsers, IconChevronLeft, IconSearch, IconEye, IconEdit, IconTrash, IconPlus } from "@tabler/icons-react";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";

export default function StaffListPage() {
  const [activePage, setPage] = useState(1);
  const itemsPerPage = 5;

  const { lang, mounted } = useTranslation();

  if (!mounted) return null;

  const t = {
    en: {
      title: "Staff List",
      subtitle: "Manage all property staff members and their roles.",
      back: "Back to Staff Management",
      comingSoon: "Staff list management is coming soon.",
    },
    mm: {
      title: "ဝန်ထမ်းစာရင်း",
      subtitle: "အိမ်ခြံမြေဝန်ထမ်းအားလုံးနှင့် ၎င်းတို့၏ အခန်းကဏ္ဍများကို စီမံခန့်ခွဲပါ။",
      back: "ဝန်ထမ်းစီမံခန့်ခွဲမှုစာမျက်နှာသို့ ပြန်သွားရန်",
      comingSoon: "ဝန်ထမ်းစာရင်းစီမံခန့်ခွဲမှုအား မကြာမီ ရရှိနိုင်တော့မည်ဖြစ်သည်။",
    },
  }[lang === "mm" ? "mm" : "en"];

  const mockData = [
    { id: "EMP-001", name: "U Kyaw Swar", email: "kyaw@skyheaven.com", role: "Head of Security", dept: "Security", joinDate: "2023-01-15", status: "Active" },
    { id: "EMP-002", name: "Daw Ni Ni", email: "nini@skyheaven.com", role: "Cleaning Supervisor", dept: "Maintenance", joinDate: "2023-02-01", status: "Active" },
    { id: "EMP-003", name: "Ko Htun", email: "htun@skyheaven.com", role: "Senior Technician", dept: "Engineering", joinDate: "2023-03-10", status: "On Leave" },
    { id: "EMP-004", name: "Ma Hlaing", email: "hlaing@skyheaven.com", role: "Receptionist", dept: "Admin", joinDate: "2023-05-20", status: "Active" },
    { id: "EMP-005", name: "U Zaw", email: "zaw@skyheaven.com", role: "Security Guard", dept: "Security", joinDate: "2023-06-05", status: "Active" },
  ];

  return (
    <Stack gap="xl" p="md">
      <Group justify="space-between">
        <Stack gap={4}>
          <Group gap="xs">
            <ThemeIcon variant="light" color="blue" size="lg" radius="md">
              <IconUsers size={20} />
            </ThemeIcon>
            <Title order={1}>{t.title}</Title>
          </Group>
          <Text c="dimmed" size="md">{t.subtitle}</Text>
        </Stack>
        <Button 
          component={Link} 
          href="/dashboard/staff" 
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
              <Table.Th fw={700} fz="sm" c="dark">Employee ID</Table.Th>
              <Table.Th fw={700} fz="sm" c="dark">Employee Details</Table.Th>
              <Table.Th fw={700} fz="sm" c="dark">Role & Dept</Table.Th>
              <Table.Th fw={700} fz="sm" c="dark">Join Date</Table.Th>
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
                    <ThemeIcon size="md" variant="light" color="blue" radius="md">
                      <IconUsers size={18} />
                    </ThemeIcon>
                    <Stack gap={0}>
                      <Text size="sm" fw={500}>{item.name}</Text>
                      <Text size="xs" c="dimmed">{item.email}</Text>
                    </Stack>
                  </Group>
                </Table.Td>
                <Table.Td>
                  <Stack gap={0}>
                    <Text size="sm" fw={500}>{item.role}</Text>
                    <Text size="xs" c="dimmed">{item.dept}</Text>
                  </Stack>
                </Table.Td>
                <Table.Td>
                  <Text size="sm">{item.joinDate}</Text>
                </Table.Td>
                <Table.Td>
                  <Badge variant="light" color={item.status === 'Active' ? 'green' : 'orange'} fw={700}>
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
