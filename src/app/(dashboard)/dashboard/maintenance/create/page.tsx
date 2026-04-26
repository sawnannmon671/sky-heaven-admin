"use client";

import { Title, Text, Stack, Paper, Group, ThemeIcon, Button, Table, TextInput, ActionIcon, Badge } from "@mantine/core";
import { IconTicket, IconChevronLeft, IconSearch, IconEye, IconEdit, IconTrash, IconPlus } from "@tabler/icons-react";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";

export default function CreateTicketPage() {
  const { lang, mounted } = useTranslation();

  if (!mounted) return null;

  const t = {
    en: {
      title: "Create Maintenance Ticket",
      subtitle: "Submit a new maintenance request for property or unit issues.",
      back: "Back to Maintenance",
      comingSoon: "Ticket creation system is coming soon.",
    },
    mm: {
      title: "တိုင်ကြားချက်အသစ်ဖွင့်ရန်",
      subtitle: "အဆောက်အဦး သို့မဟုတ် ယူနစ်ဆိုင်ရာ ပြဿနာများအတွက် ပြုပြင်ထိန်းသိမ်းမှုတောင်းဆိုချက်အသစ် တင်သွင်းပါ။",
      back: "ပြုပြင်ထိန်းသိမ်းမှုစာမျက်နှာသို့ ပြန်သွားရန်",
      comingSoon: "တိုင်ကြားချက်ဖွင့်ခြင်းစနစ်အား မကြာမီ ရရှိနိုင်တော့မည်ဖြစ်သည်။",
    },
  }[lang === "mm" ? "mm" : "en"];

  const mockData = [
    { id: "TKT-001", description: "Leaking faucet in bathroom", unit: "A-101", priority: "High", date: "2024-10-15", status: "Open" },
    { id: "TKT-002", description: "AC not cooling properly", unit: "B-205", priority: "Medium", date: "2024-10-16", status: "In Progress" },
    { id: "TKT-003", description: "Broken door handle", unit: "C-304", priority: "Low", date: "2024-10-18", status: "Resolved" },
    { id: "TKT-004", description: "Kitchen sink clogged", unit: "A-502", priority: "High", date: "2024-10-20", status: "Open" },
    { id: "TKT-005", description: "Light bulb replacement", unit: "D-102", priority: "Low", date: "2024-10-22", status: "Resolved" },
  ];

  return (
    <Stack gap="xl" p="md">
      <Group justify="space-between">
        <Stack gap={4}>
          <Group gap="xs">
            <ThemeIcon variant="light" color="blue" size="lg" radius="md">
              <IconTicket size={20} />
            </ThemeIcon>
            <Title order={1}>{t.title}</Title>
          </Group>
          <Text c="dimmed" size="md">{t.subtitle}</Text>
        </Stack>
        <Button 
          component={Link} 
          href="/dashboard/maintenance" 
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
              <Table.Th fw={700} fz="sm" c="dark">Ticket ID</Table.Th>
              <Table.Th fw={700} fz="sm" c="dark">Issue Description & Unit</Table.Th>
              <Table.Th fw={700} fz="sm" c="dark">Priority</Table.Th>
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
                    <ThemeIcon size="md" variant="light" color="blue" radius="md">
                      <IconTicket size={18} />
                    </ThemeIcon>
                    <Stack gap={0}>
                      <Text size="sm" fw={500}>{item.description}</Text>
                      <Text size="xs" c="dimmed">Unit: {item.unit}</Text>
                    </Stack>
                  </Group>
                </Table.Td>
                <Table.Td>
                  <Badge variant="light" color={item.priority === 'High' ? 'red' : item.priority === 'Medium' ? 'orange' : 'blue'} fw={700}>
                    {item.priority}
                  </Badge>
                </Table.Td>
                <Table.Td>
                  <Text size="sm">{item.date}</Text>
                </Table.Td>
                <Table.Td>
                  <Badge variant="light" color={item.status === 'Resolved' ? 'green' : item.status === 'In Progress' ? 'blue' : 'orange'} fw={700}>
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
