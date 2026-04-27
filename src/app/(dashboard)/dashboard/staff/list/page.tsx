"use client";

import { useState } from "react";
import { Title, Text, Stack, Paper, Group, ThemeIcon, Button, Table, TextInput, ActionIcon, Badge, Pagination, UnstyledButton, Center } from "@mantine/core";
import { IconUsers, IconChevronLeft, IconSearch, IconEye, IconEdit, IconTrash, IconPlus, IconSelector, IconChevronUp, IconChevronDown } from "@tabler/icons-react";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";

export default function StaffListPage() {
  const [sortConfig, setSortConfig] = useState<{ key: string, direction: 'asc' | 'desc' } | null>(null);

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const [activePage, setPage] = useState(1);
  const itemsPerPage = 5;

  const { lang } = useTranslation();

  const t = {
    en: {
      title: "Staff List",
      subtitle: "Manage all property staff members, security guards, cleaning staff, and their roles.",
      searchPlaceholder: "Search staff...",
      addNew: "Add New",
      columns: {
        id: "ID",
        name: "Name",
        email: "Email",
        staffType: "Staff Type",
        role: "Role",
        dept: "Department",
        joinDate: "Join Date",
        status: "Status",
        actions: "Actions",
      }
    },
    mm: {
      title: "ဝန်ထမ်းစာရင်း",
      subtitle: "အိမ်ခြံမြေဝန်ထမ်းအားလုံး၊ လုံခြုံရေး၊ သန့်ရှင်းရေးနှင့် ၎င်းတို့၏ အခန်းကဏ္ဍများကို စီမံခန့်ခွဲပါ။",
      searchPlaceholder: "ရှာဖွေရန်...",
      addNew: "အသစ်ထည့်ရန်",
      columns: {
        id: "အမှတ်စဉ်",
        name: "အမည်",
        email: "အီးမေးလ်",
        staffType: "ဝန်ထမ်းအမျိုးအစား",
        role: "ရာထူး",
        dept: "ဌာန",
        joinDate: "စတင်ဝင်ရောက်သည့်နေ့",
        status: "အခြေအနေ",
        actions: "လုပ်ဆောင်ချက်များ",
      }
    },
  }[lang === "mm" ? "mm" : "en"];

  const mockData = [
    { id: "EMP-001", name: "U Kyaw Swar", email: "kyaw@skyheaven.com", staffType: "Manager", role: "Head of Security", dept: "Security", joinDate: "2023-01-15", status: "Active" },
    { id: "EMP-002", name: "Daw Ni Ni", email: "nini@skyheaven.com", staffType: "Cleaning Staff", role: "Cleaning Supervisor", dept: "Maintenance", joinDate: "2023-02-01", status: "Active" },
    { id: "EMP-003", name: "Ko Htun", email: "htun@skyheaven.com", staffType: "Technician", role: "Senior Technician", dept: "Engineering", joinDate: "2023-03-10", status: "On Leave" },
    { id: "EMP-004", name: "Ma Hlaing", email: "hlaing@skyheaven.com", staffType: "Admin", role: "Receptionist", dept: "Admin", joinDate: "2023-05-20", status: "Active" },
    { id: "EMP-005", name: "U Zaw", email: "zaw@skyheaven.com", staffType: "Security Guard", role: "Security Guard", dept: "Security", joinDate: "2023-06-05", status: "Active" },
    { id: "EMP-006", name: "Ko Aung", email: "aung@skyheaven.com", staffType: "Security Guard", role: "Night Shift Guard", dept: "Security", joinDate: "2023-07-12", status: "Active" },
    { id: "EMP-007", name: "Daw Aye", email: "aye@skyheaven.com", staffType: "Cleaning Staff", role: "Cleaner", dept: "Maintenance", joinDate: "2023-08-20", status: "Active" },
  ];

  const sortedData = [...mockData].sort((a, b) => {
    if (!sortConfig) return 0;
    const { key, direction } = sortConfig;
    if (a[key as keyof typeof a] < b[key as keyof typeof b]) return direction === 'asc' ? -1 : 1;
    if (a[key as keyof typeof a] > b[key as keyof typeof b]) return direction === 'asc' ? 1 : -1;
    return 0;
  });

  const Th = ({ children, reversed, sorted, onSort }: { children: React.ReactNode; reversed: boolean; sorted: boolean; onSort(): void }) => {
    const Icon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;
    return (
      <Table.Th>
        <UnstyledButton onClick={onSort} style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%', padding: '8px' }}>
          <Text fw={600} size="sm">{children}</Text>
          <Icon size={14} stroke={1.5} style={{ color: sorted ? '#014F86' : 'gray' }} />
        </UnstyledButton>
      </Table.Th>
    );
  };

  const getStaffTypeColor = (type: string) => {
    switch (type) {
      case 'Security Guard': return 'red';
      case 'Cleaning Staff': return 'teal';
      case 'Technician': return 'orange';
      case 'Manager': return 'grape';
      default: return 'blue';
    }
  };

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
      </Group>

      <Paper p="md" radius="lg" withBorder shadow="sm" style={{ border: '1px solid #e9ecef' }}>
        <Group justify="space-between" mb="md">
          <TextInput
            placeholder={t.searchPlaceholder}
            leftSection={<IconSearch size={16} />}
            size="md"
            radius="md"
            style={{ flex: 1, maxWidth: 400 }}
          />
          <Button leftSection={<IconPlus size={16} />} color="#014F86" radius="md">
            {t.addNew}
          </Button>
        </Group>

        <Table verticalSpacing="md" highlightOnHover>
          <Table.Thead bg="gray.0">
            <Table.Tr>
              <Th sorted={sortConfig?.key === 'id'} reversed={sortConfig?.direction === 'desc'} onSort={() => handleSort('id')}>{t.columns.id}</Th>
              <Th sorted={sortConfig?.key === 'name'} reversed={sortConfig?.direction === 'desc'} onSort={() => handleSort('name')}>{t.columns.name}</Th>
              <Th sorted={sortConfig?.key === 'staffType'} reversed={sortConfig?.direction === 'desc'} onSort={() => handleSort('staffType')}>{t.columns.staffType}</Th>
              <Th sorted={sortConfig?.key === 'role'} reversed={sortConfig?.direction === 'desc'} onSort={() => handleSort('role')}>{t.columns.role}</Th>
              <Th sorted={sortConfig?.key === 'dept'} reversed={sortConfig?.direction === 'desc'} onSort={() => handleSort('dept')}>{t.columns.dept}</Th>
              <Th sorted={sortConfig?.key === 'joinDate'} reversed={sortConfig?.direction === 'desc'} onSort={() => handleSort('joinDate')}>{t.columns.joinDate}</Th>
              <Th sorted={sortConfig?.key === 'status'} reversed={sortConfig?.direction === 'desc'} onSort={() => handleSort('status')}>{t.columns.status}</Th>
              <Table.Th style={{ padding: '8px' }}><Text fw={600} size="sm">{t.columns.actions}</Text></Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {sortedData.map((item) => (
              <Table.Tr key={item.id}>
                <Table.Td><Text fw={500} size="sm">{item.id}</Text></Table.Td>
                <Table.Td>
                  <Stack gap={0}>
                    <Text size="sm" fw={500}>{item.name}</Text>
                    <Text size="xs" c="dimmed">{item.email}</Text>
                  </Stack>
                </Table.Td>
                <Table.Td>
                  <Badge color={getStaffTypeColor(item.staffType)} variant="light">
                    {item.staffType}
                  </Badge>
                </Table.Td>
                <Table.Td><Text size="sm">{item.role}</Text></Table.Td>
                <Table.Td><Text size="sm">{item.dept}</Text></Table.Td>
                <Table.Td><Text size="sm" c="dimmed">{item.joinDate}</Text></Table.Td>
                <Table.Td>
                  <Badge color={item.status === 'Active' ? 'green' : 'gray'} variant="light">
                    {item.status}
                  </Badge>
                </Table.Td>
                <Table.Td>
                  <Group gap={8}>
                    <ActionIcon variant="light" color="blue" size="sm"><IconEye size={16} /></ActionIcon>
                    <ActionIcon variant="light" color="orange" size="sm"><IconEdit size={16} /></ActionIcon>
                    <ActionIcon variant="light" color="red" size="sm"><IconTrash size={16} /></ActionIcon>
                  </Group>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>

        <Group justify="space-between" mt="md">
          <Text size="sm" c="dimmed">Showing 1 to 7 of 7 entries</Text>
          <Pagination value={activePage} onChange={setPage} total={1} color="#014F86" radius="md" />
        </Group>
      </Paper>
    </Stack>
  );
}
