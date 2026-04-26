"use client";

import { useState } from "react";
import {  Title, Text, Stack, Paper, Group, ThemeIcon, Button, Table, TextInput, ActionIcon, Badge , Pagination } from "@mantine/core";
import { IconUsers, IconChevronLeft, IconSearch, IconEye, IconEdit, IconTrash, IconPlus } from "@tabler/icons-react";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";

export default function FamilyMembersPage() {
  const [activePage, setPage] = useState(1);
  const itemsPerPage = 5;

  const { lang, mounted } = useTranslation();

  if (!mounted) return null;

  const t = {
    en: {
      title: "Family Members",
      subtitle: "Manage family members and additional residents for each unit.",
      back: "Back to Residents",
      comingSoon: "Family member management is coming soon.",
    },
    mm: {
      title: "မိသားစုဝင်များ",
      subtitle: "ယူနစ်တစ်ခုစီအတွက် မိသားစုဝင်များနှင့် ထပ်တိုးနေထိုင်သူများကို စီမံခန့်ခွဲပါ။",
      back: "နေထိုင်သူများစာရင်းသို့ ပြန်သွားရန်",
      comingSoon: "မိသားစုဝင်စီမံခန့်ခွဲမှုအသေးစိတ်အား မကြာမီ ရရှိနိုင်တော့မည်ဖြစ်သည်။",
    },
  }[lang === "mm" ? "mm" : "en"];

const mockData = [
    { id: "FAM-001", name: "Mg Aung Myint", relation: "Son", primaryResident: "U Aung Aung", unit: "A-101", age: 18, status: "Active" },
    { id: "FAM-002", name: "Ma Su Mon", relation: "Daughter", primaryResident: "Daw Su Su", unit: "B-205", age: 22, status: "Active" },
    { id: "FAM-003", name: "Daw Mya Sein", relation: "Mother", primaryResident: "U Kyaw Min", unit: "C-304", age: 65, status: "Active" },
    { id: "FAM-004", name: "Mg Thura", relation: "Son", primaryResident: "Daw Hla Hla", unit: "A-502", age: 15, status: "Active" },
    { id: "FAM-005", name: "Ma Khin Myo", relation: "Spouse", primaryResident: "U Zaw Myo", unit: "D-102", age: 35, status: "Active" },
  ];

  return (
    <Stack gap="xl" p="md">
      <Group justify="space-between">
        <Stack gap={4}>
          <Group gap="xs">
            <ThemeIcon variant="light" color="cyan" size="lg" radius="md">
              <IconUsers size={20} />
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
              <Table.Th fw={700} fz="sm" c="dark">Member Name</Table.Th>
              <Table.Th fw={700} fz="sm" c="dark">Relation</Table.Th>
              <Table.Th fw={700} fz="sm" c="dark">Primary Resident</Table.Th>
              <Table.Th fw={700} fz="sm" c="dark">Unit</Table.Th>
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
                    <ThemeIcon size="md" variant="light" color="cyan" radius="md">
                      <IconUsers size={18} />
                    </ThemeIcon>
                    <Stack gap={0}>
                      <Text size="sm" fw={500}>{item.name}</Text>
                      <Text size="xs" c="dimmed">Age: {item.age}</Text>
                    </Stack>
                  </Group>
                </Table.Td>
                <Table.Td>
                  <Text size="sm">{item.relation}</Text>
                </Table.Td>
                <Table.Td>
                  <Text size="sm" fw={500}>{item.primaryResident}</Text>
                </Table.Td>
                <Table.Td>
                  <Text size="sm" fw={500}>{item.unit}</Text>
                </Table.Td>
                <Table.Td>
                  <Badge variant="light" color={item.status === 'Active' ? 'green' : 'gray'} fw={700}>
                    {item.status}
                  </Badge>
                </Table.Td>
                <Table.Td>
                  <Group gap={4} justify="flex-end">
                    <ActionIcon component={Link} href={`/dashboard/residents/family/${item.id}`} variant="subtle" color="gray"><IconEye size={16} /></ActionIcon>
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
