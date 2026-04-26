"use client";

import { useState } from "react";
import {  Title, Text, Stack, Paper, Group, ThemeIcon, Button, Table, TextInput, ActionIcon, Badge , Pagination } from "@mantine/core";
import { IconUser, IconChevronLeft, IconSearch, IconEye, IconEdit, IconTrash, IconPlus } from "@tabler/icons-react";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";

const mockData = [
  { id: "OWN-001", name: "U Aung Aung", phone: "+95 9 123 456 789", email: "aung@example.com", units: "A-101", status: "Active" },
  { id: "OWN-002", name: "Daw Su Su", phone: "+95 9 987 654 321", email: "susu@example.com", units: "B-205, B-206", status: "Active" },
  { id: "OWN-003", name: "U Kyaw Min", phone: "+95 9 555 666 777", email: "kyawmin@example.com", units: "C-304", status: "Inactive" },
  { id: "OWN-004", name: "Daw Hla Hla", phone: "+95 9 111 222 333", email: "hlahla@example.com", units: "A-502", status: "Active" },
  { id: "OWN-005", name: "U Zaw Myo", phone: "+95 9 444 888 999", email: "zawmyo@example.com", units: "D-102", status: "Active" },
];

export default function OwnersPage() {
  const [activePage, setPage] = useState(1);
  const itemsPerPage = 5;

  const { lang, mounted } = useTranslation();

  if (!mounted) return null;

  const t = {
    en: {
      title: "Property Owners",
      subtitle: "Manage property owners and their ownership details.",
      back: "Back to Residents",
      comingSoon: "Owner management details are coming soon.",
    },
    mm: {
      title: "အိမ်ပိုင်ရှင်များ",
      subtitle: "အိမ်ပိုင်ရှင်များနှင့် ၎င်းတို့၏ ပိုင်ဆိုင်မှုအချက်အလက်များကို စီမံခန့်ခွဲပါ။",
      back: "နေထိုင်သူများစာရင်းသို့ ပြန်သွားရန်",
      comingSoon: "အိမ်ပိုင်ရှင်စီမံခန့်ခွဲမှုအသေးစိတ်အား မကြာမီ ရရှိနိုင်တော့မည်ဖြစ်သည်။",
    },
  }[lang === "mm" ? "mm" : "en"];

  return (
    <Stack gap="xl" p="md">
      <Group justify="space-between">
        <Stack gap={4}>
          <Group gap="xs">
            <ThemeIcon variant="light" color="violet" size="lg" radius="md">
              <IconUser size={20} />
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
              <Table.Th fw={700} fz="sm" c="dark">Owner Name</Table.Th>
              <Table.Th fw={700} fz="sm" c="dark">Contact Info</Table.Th>
              <Table.Th fw={700} fz="sm" c="dark">Units Owned</Table.Th>
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
                    <ThemeIcon size="md" variant="light" color="violet" radius="md">
                      <IconUser size={18} />
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
                  <Text size="sm" fw={500}>{item.units}</Text>
                </Table.Td>
                <Table.Td>
                  <Badge variant="light" color={item.status === 'Active' ? 'green' : 'gray'} fw={700}>
                    {item.status}
                  </Badge>
                </Table.Td>
                <Table.Td>
                  <Group gap={4} justify="flex-end">
                    <ActionIcon component={Link} href={`/dashboard/residents/owners/${item.id}`} variant="subtle" color="gray"><IconEye size={16} /></ActionIcon>
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
