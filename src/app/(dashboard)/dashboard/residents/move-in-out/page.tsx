"use client";

import { Title, Text, Stack, Paper, Group, ThemeIcon, Button, Table, TextInput, ActionIcon, Badge } from "@mantine/core";
import { IconUserPlus, IconChevronLeft, IconSearch, IconEye, IconEdit, IconTrash, IconPlus } from "@tabler/icons-react";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";

export default function MoveInOutPage() {
  const { lang, mounted } = useTranslation();

  if (!mounted) return null;

  const t = {
    en: {
      title: "Move In / Move Out",
      subtitle: "Track resident move-in and move-out requests and history.",
      back: "Back to Residents",
      comingSoon: "Move-in and move-out tracking is coming soon.",
    },
    mm: {
      title: "အဝင် / အထွက်",
      subtitle: "နေထိုင်သူများ အဝင်အထွက် တောင်းဆိုမှုများနှင့် မှတ်တမ်းများကို ခြေရာခံပါ။",
      back: "နေထိုင်သူများစာရင်းသို့ ပြန်သွားရန်",
      comingSoon: "အဝင်အထွက် ခြေရာခံမှုအသေးစိတ်အား မကြာမီ ရရှိနိုင်တော့မည်ဖြစ်သည်။",
    },
  }[lang === "mm" ? "mm" : "en"];

const mockData = [
    { id: "REQ-001", type: "Move In", residentName: "U Tun Tun", unit: "A-101", date: "2024-05-01", status: "Approved" },
    { id: "REQ-002", type: "Move Out", residentName: "Daw Mya Mya", unit: "B-205", date: "2024-04-15", status: "Pending" },
    { id: "REQ-003", type: "Move In", residentName: "U Hlaing Bwar", unit: "C-304", date: "2024-06-01", status: "Approved" },
    { id: "REQ-004", type: "Move Out", residentName: "Daw Thandar", unit: "A-502", date: "2024-03-20", status: "Completed" },
    { id: "REQ-005", type: "Move In", residentName: "U Nyan Lin", unit: "D-102", date: "2024-05-10", status: "Rejected" },
  ];

  return (
    <Stack gap="xl" p="md">
      <Group justify="space-between">
        <Stack gap={4}>
          <Group gap="xs">
            <ThemeIcon variant="light" color="orange" size="lg" radius="md">
              <IconUserPlus size={20} />
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
              <Table.Th fw={700} fz="sm" c="dark">Request ID</Table.Th>
              <Table.Th fw={700} fz="sm" c="dark">Type</Table.Th>
              <Table.Th fw={700} fz="sm" c="dark">Resident Name</Table.Th>
              <Table.Th fw={700} fz="sm" c="dark">Unit</Table.Th>
              <Table.Th fw={700} fz="sm" c="dark">Date</Table.Th>
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
                    <ThemeIcon size="md" variant="light" color={item.type === 'Move In' ? 'green' : 'orange'} radius="md">
                      <IconUserPlus size={18} />
                    </ThemeIcon>
                    <Text size="sm" fw={500}>{item.type}</Text>
                  </Group>
                </Table.Td>
                <Table.Td>
                  <Text size="sm" fw={500}>{item.residentName}</Text>
                </Table.Td>
                <Table.Td>
                  <Text size="sm">{item.unit}</Text>
                </Table.Td>
                <Table.Td>
                  <Text size="sm">{item.date}</Text>
                </Table.Td>
                <Table.Td>
                  <Badge variant="light" color={item.status === 'Approved' ? 'blue' : item.status === 'Completed' ? 'green' : item.status === 'Rejected' ? 'red' : 'yellow'} fw={700}>
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
