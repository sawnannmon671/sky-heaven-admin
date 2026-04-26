"use client";

import { useState } from "react";
import {  Title, Text, Stack, Paper, Group, ThemeIcon, Button, Table, TextInput, ActionIcon, Badge , Pagination } from "@mantine/core";
import { IconTools, IconChevronLeft, IconSearch, IconEye, IconEdit, IconTrash, IconPlus } from "@tabler/icons-react";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";

export default function MaintenanceReportPage() {
  const [activePage, setPage] = useState(1);
  const itemsPerPage = 5;

  const { lang, mounted } = useTranslation();

  if (!mounted) return null;

  const t = {
    en: {
      title: "Maintenance Report",
      subtitle: "Generate reports on maintenance activities and costs.",
      back: "Back to Reports",
      comingSoon: "Maintenance reporting system is coming soon.",
    },
    mm: {
      title: "ပြုပြင်ထိန်းသိမ်းမှုအစီရင်ခံစာ",
      subtitle: "ပြုပြင်ထိန်းသိမ်းမှုလုပ်ငန်းများနှင့် ကုန်ကျစရိတ်များအတွက် အစီရင်ခံစာများထုတ်လုပ်ပါ။",
      back: "အစီရင်ခံစာများစာမျက်နှာသို့ ပြန်သွားရန်",
      comingSoon: "ပြုပြင်ထိန်းသိမ်းမှုအစီရင်ခံစာစနစ်အား မကြာမီ ရရှိနိုင်တော့မည်ဖြစ်သည်။",
    },
  }[lang === "mm" ? "mm" : "en"];

  const mockData = [
    { id: "REP-M01", title: "Monthly HVAC Maintenance", period: "Jan 2024", cost: "$4,200", status: "Completed" },
    { id: "REP-M02", title: "Elevator Inspection Report", period: "Q1 2024", cost: "$1,500", status: "Completed" },
    { id: "REP-M03", title: "Plumbing Repairs Overview", period: "Feb 2024", cost: "$850", status: "Pending" },
    { id: "REP-M04", title: "Pool Cleaning Log", period: "Mar 2024", cost: "$600", status: "Completed" },
    { id: "REP-M05", title: "Gym Equipment Service", period: "Q1 2024", cost: "$1,200", status: "Scheduled" },
  ];

  return (
    <Stack gap="xl" p="md">
      <Group justify="space-between">
        <Stack gap={4}>
          <Group gap="xs">
            <ThemeIcon variant="light" color="indigo" size="lg" radius="md">
              <IconTools size={20} />
            </ThemeIcon>
            <Title order={1}>{t.title}</Title>
          </Group>
          <Text c="dimmed" size="md">{t.subtitle}</Text>
        </Stack>
        <Button 
          component={Link} 
          href="/dashboard/reports" 
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
            Generate Report
          </Button>
        </Group>

        <Table verticalSpacing="md" highlightOnHover>
          <Table.Thead bg="gray.0">
            <Table.Tr>
              <Table.Th fw={700} fz="sm" c="dark">Report ID</Table.Th>
              <Table.Th fw={700} fz="sm" c="dark">Report Title</Table.Th>
              <Table.Th fw={700} fz="sm" c="dark">Period</Table.Th>
              <Table.Th fw={700} fz="sm" c="dark">Total Cost</Table.Th>
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
                    <ThemeIcon size="md" variant="light" color="indigo" radius="md">
                      <IconTools size={18} />
                    </ThemeIcon>
                    <Text size="sm" fw={600} c="dark">{item.title}</Text>
                  </Group>
                </Table.Td>
                <Table.Td>
                  <Text size="sm" c="dimmed">{item.period}</Text>
                </Table.Td>
                <Table.Td>
                  <Text size="sm" fw={500} c="dark">{item.cost}</Text>
                </Table.Td>
                <Table.Td>
                  <Badge 
                    variant="light" 
                    color={
                      item.status === 'Completed' ? 'green' : 
                      item.status === 'Pending' ? 'orange' : 'blue'
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
