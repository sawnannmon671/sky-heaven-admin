"use client";

import { Title, Text, Stack, Paper, Group, ThemeIcon, Button, Table, TextInput, ActionIcon, Badge } from "@mantine/core";
import { IconAddressBook, IconChevronLeft, IconSearch, IconEye, IconEdit, IconTrash, IconPlus } from "@tabler/icons-react";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";

export default function ResidentDirectoryPage() {
  const { lang, mounted } = useTranslation();

  if (!mounted) return null;

  const t = {
    en: {
      title: "Resident Directory",
      subtitle: "Comprehensive list of all residents across the property.",
      back: "Back to Residents",
      comingSoon: "Resident directory is coming soon.",
    },
    mm: {
      title: "နေထိုင်သူများစာရင်း",
      subtitle: "အိမ်ခြံမြေတစ်ခုလုံးရှိ နေထိုင်သူအားလုံး၏ ပြည့်စုံသောစာရင်း။",
      back: "နေထိုင်သူများစာရင်းသို့ ပြန်သွားရန်",
      comingSoon: "နေထိုင်သူများစာရင်းအသေးစိတ်အား မကြာမီ ရရှိနိုင်တော့မည်ဖြစ်သည်။",
    },
  }[lang === "mm" ? "mm" : "en"];

const mockData = [
    { id: "RES-001", name: "U Aung Aung", role: "Owner", unit: "A-101", phone: "+95 9 123 456 789", moveInDate: "2020-01-15", status: "Resident" },
    { id: "RES-002", name: "Daw Mya Mya", role: "Tenant", unit: "B-205", phone: "+95 9 987 654 321", moveInDate: "2023-07-01", status: "Resident" },
    { id: "RES-003", name: "Mg Thura", role: "Family Member", unit: "A-502", phone: "+95 9 111 222 333", moveInDate: "2021-03-10", status: "Resident" },
    { id: "RES-004", name: "U Zaw Myo", role: "Owner", unit: "D-102", phone: "+95 9 444 888 999", moveInDate: "2019-11-20", status: "Resident" },
    { id: "RES-005", name: "Daw Thandar", role: "Tenant", unit: "A-502", phone: "+95 9 555 666 777", moveInDate: "2022-08-15", status: "Past Resident" },
  ];

  return (
    <Stack gap="xl" p="md">
      <Group justify="space-between">
        <Stack gap={4}>
          <Group gap="xs">
            <ThemeIcon variant="light" color="indigo" size="lg" radius="md">
              <IconAddressBook size={20} />
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
              <Table.Th fw={700} fz="sm" c="dark">Resident Details</Table.Th>
              <Table.Th fw={700} fz="sm" c="dark">Role</Table.Th>
              <Table.Th fw={700} fz="sm" c="dark">Unit</Table.Th>
              <Table.Th fw={700} fz="sm" c="dark">Move In Date</Table.Th>
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
                    <ThemeIcon size="md" variant="light" color="indigo" radius="md">
                      <IconAddressBook size={18} />
                    </ThemeIcon>
                    <Stack gap={0}>
                      <Text size="sm" fw={500}>{item.name}</Text>
                      <Text size="xs" c="dimmed">{item.phone}</Text>
                    </Stack>
                  </Group>
                </Table.Td>
                <Table.Td>
                  <Badge variant="outline" color={item.role === 'Owner' ? 'violet' : item.role === 'Tenant' ? 'blue' : 'cyan'}>
                    {item.role}
                  </Badge>
                </Table.Td>
                <Table.Td>
                  <Text size="sm" fw={500}>{item.unit}</Text>
                </Table.Td>
                <Table.Td>
                  <Text size="sm">{item.moveInDate}</Text>
                </Table.Td>
                <Table.Td>
                  <Badge variant="light" color={item.status === 'Resident' ? 'green' : 'gray'} fw={700}>
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
