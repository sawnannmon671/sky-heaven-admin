"use client";

import { useState } from "react";
import {  Title, Text, Stack, Paper, Group, ThemeIcon, Button, Table, TextInput, ActionIcon, Badge , Pagination } from "@mantine/core";
import { IconKey, IconChevronLeft, IconSearch, IconEye, IconEdit, IconTrash, IconPlus } from "@tabler/icons-react";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";

export default function RolesPage() {
  const [activePage, setPage] = useState(1);
  const itemsPerPage = 5;

  const { lang, mounted } = useTranslation();

  if (!mounted) return null;

  const t = {
    en: {
      title: "Roles & Permissions",
      subtitle: "Define and manage user roles and their access permissions.",
      back: "Back to User Management",
      comingSoon: "Role and permission management is coming soon.",
    },
    mm: {
      title: "အခန်းကဏ္ဍနှင့် ခွင့်ပြုချက်များ",
      subtitle: "အသုံးပြုသူအခန်းကဏ္ဍများနှင့် ၎င်းတို့၏ ဝင်ရောက်ခွင့်များကို သတ်မှတ်ပြီး စီမံခန့်ခွဲပါ။",
      back: "အသုံးပြုသူစီမံခန့်ခွဲမှုစာမျက်နှာသို့ ပြန်သွားရန်",
      comingSoon: "အခန်းကဏ္ဍနှင့် ခွင့်ပြုချက်စီမံခန့်ခွဲမှုအား မကြာမီ ရရှိနိုင်တော့မည်ဖြစ်သည်။",
    },
  }[lang === "mm" ? "mm" : "en"];

  const mockData = [
    { id: "ROL-001", name: "Super Admin", description: "Full system access including settings", users: 2, status: "Active" },
    { id: "ROL-002", name: "Manager", description: "Can manage operations but no settings access", users: 5, status: "Active" },
    { id: "ROL-003", name: "Security Guard", description: "Access to visitor and parking systems only", users: 12, status: "Active" },
    { id: "ROL-004", name: "Accountant", description: "Access to billing and payment reports", users: 3, status: "Active" },
    { id: "ROL-005", name: "Temporary Staff", description: "Limited access for short-term hires", users: 0, status: "Inactive" },
  ];

  return (
    <Stack gap="xl" p="md">
      <Group justify="space-between">
        <Stack gap={4}>
          <Group gap="xs">
            <ThemeIcon variant="light" color="teal" size="lg" radius="md">
              <IconKey size={20} />
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
            placeholder="Search roles..."
            leftSection={<IconSearch size={16} />}
            size="md"
            radius="md"
            style={{ flex: 1, maxWidth: 400 }}
          />
          <Button leftSection={<IconPlus size={16} />} color="#014F86" radius="md">
            Create Role
          </Button>
        </Group>

        <Table verticalSpacing="md" highlightOnHover>
          <Table.Thead bg="gray.0">
            <Table.Tr>
              <Table.Th fw={700} fz="sm" c="dark">Role ID</Table.Th>
              <Table.Th fw={700} fz="sm" c="dark">Role Name & Description</Table.Th>
              <Table.Th fw={700} fz="sm" c="dark">Active Users</Table.Th>
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
                    <ThemeIcon size="md" variant="light" color="teal" radius="md">
                      <IconKey size={18} />
                    </ThemeIcon>
                    <Stack gap={0}>
                      <Text size="sm" fw={600} c="dark">{item.name}</Text>
                      <Text size="xs" c="dimmed">{item.description}</Text>
                    </Stack>
                  </Group>
                </Table.Td>
                <Table.Td>
                  <Badge variant="dot" color="blue" size="lg">{item.users} Users</Badge>
                </Table.Td>
                <Table.Td>
                  <Badge 
                    variant="light" 
                    color={item.status === 'Active' ? 'green' : 'gray'} 
                    fw={700}
                  >
                    {item.status}
                  </Badge>
                </Table.Td>
                <Table.Td>
                  <Group gap={4} justify="flex-end">
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
