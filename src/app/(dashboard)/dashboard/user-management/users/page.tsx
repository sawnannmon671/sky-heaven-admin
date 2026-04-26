"use client";

import { useState } from "react";
import {  Title, Text, Stack, Paper, Group, ThemeIcon, Button, Table, TextInput, ActionIcon, Badge , Pagination } from "@mantine/core";
import { IconUsers, IconChevronLeft, IconSearch, IconEye, IconEdit, IconTrash, IconPlus } from "@tabler/icons-react";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";

export default function UsersPage() {
  const [activePage, setPage] = useState(1);
  const itemsPerPage = 5;

  const { lang, mounted } = useTranslation();

  if (!mounted) return null;

  const t = {
    en: {
      title: "Users",
      subtitle: "Manage user accounts and their profiles.",
      back: "Back to User Management",
      comingSoon: "User management system is coming soon.",
    },
    mm: {
      title: "အသုံးပြုသူများ",
      subtitle: "အသုံးပြုသူအကောင့်များနှင့် ၎င်းတို့၏ ပရိုဖိုင်များကို စီမံခန့်ခွဲပါ။",
      back: "အသုံးပြုသူစီမံခန့်ခွဲမှုစာမျက်နှာသို့ ပြန်သွားရန်",
      comingSoon: "အသုံးပြုသူစီမံခန့်ခွဲမှုစနစ်အား မကြာမီ ရရှိနိုင်တော့မည်ဖြစ်သည်။",
    },
  }[lang === "mm" ? "mm" : "en"];

  const mockData = [
    { id: "USR-001", name: "John Doe", email: "john@skyheaven.com", role: "Super Admin", lastLogin: "2024-04-26 08:30:00", status: "Active" },
    { id: "USR-002", name: "Jane Smith", email: "jane.smith@skyheaven.com", role: "Manager", lastLogin: "2024-04-26 09:15:22", status: "Active" },
    { id: "USR-003", name: "Mike Johnson", email: "mike.guard@skyheaven.com", role: "Security Guard", lastLogin: "2024-04-26 10:05:10", status: "Active" },
    { id: "USR-004", name: "Sarah Connor", email: "sarah.acc@skyheaven.com", role: "Accountant", lastLogin: "2024-04-25 14:20:00", status: "Inactive" },
    { id: "USR-005", name: "Robert Bruce", email: "robert.b@skyheaven.com", role: "Temporary Staff", lastLogin: "2024-04-20 11:10:00", status: "Suspended" },
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
          href="/dashboard/user-management" 
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
            placeholder="Search users..."
            leftSection={<IconSearch size={16} />}
            size="md"
            radius="md"
            style={{ flex: 1, maxWidth: 400 }}
          />
          <Button leftSection={<IconPlus size={16} />} color="#014F86" radius="md">
            Add User
          </Button>
        </Group>

        <Table verticalSpacing="md" highlightOnHover>
          <Table.Thead bg="gray.0">
            <Table.Tr>
              <Table.Th fw={700} fz="sm" c="dark">User ID</Table.Th>
              <Table.Th fw={700} fz="sm" c="dark">User Info</Table.Th>
              <Table.Th fw={700} fz="sm" c="dark">Role</Table.Th>
              <Table.Th fw={700} fz="sm" c="dark">Last Login</Table.Th>
              <Table.Th fw={700} fz="sm" c="dark">Status</Table.Th>
              <Table.Th fw={700} fz="sm" c="dark" ta="right">Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {mockData.slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage).map((item) => (
              <Table.Tr key={item.id}>
                <Table.Td>
                  <Text size="sm" fw={700} c="dimmed">{item.id}</Text>
                </Table.Td>
                <Table.Td>
                  <Group gap="sm">
                    <ThemeIcon size="md" variant="light" color="blue" radius="md">
                      <IconUsers size={18} />
                    </ThemeIcon>
                    <Stack gap={0}>
                      <Text size="sm" fw={600} c="dark">{item.name}</Text>
                      <Text size="xs" c="dimmed">{item.email}</Text>
                    </Stack>
                  </Group>
                </Table.Td>
                <Table.Td>
                  <Badge variant="outline" color="indigo">{item.role}</Badge>
                </Table.Td>
                <Table.Td>
                  <Text size="sm" c="dimmed">{item.lastLogin}</Text>
                </Table.Td>
                <Table.Td>
                  <Badge 
                    variant="light" 
                    color={
                      item.status === 'Active' ? 'green' : 
                      item.status === 'Inactive' ? 'gray' : 'red'
                    } 
                    fw={700}
                  >
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
