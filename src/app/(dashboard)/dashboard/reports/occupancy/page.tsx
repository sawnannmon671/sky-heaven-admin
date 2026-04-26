"use client";

import { useState } from "react";
import {  Title, Text, Stack, Paper, Group, ThemeIcon, Button, Table, TextInput, ActionIcon, Badge , Pagination } from "@mantine/core";
import { IconHome, IconChevronLeft, IconSearch, IconEye, IconEdit, IconTrash, IconPlus } from "@tabler/icons-react";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";

export default function OccupancyReportPage() {
  const [activePage, setPage] = useState(1);
  const itemsPerPage = 5;

  const { lang, mounted } = useTranslation();

  if (!mounted) return null;

  const t = {
    en: {
      title: "Occupancy Report",
      subtitle: "Generate reports on property occupancy rates and vacancies.",
      back: "Back to Reports",
      comingSoon: "Occupancy reporting system is coming soon.",
    },
    mm: {
      title: "နေထိုင်မှုအစီရင်ခံစာ",
      subtitle: "အိမ်ခြံမြေနေထိုင်မှုနှုန်းထားများနှင့် လစ်လပ်မှုများအတွက် အစီရင်ခံစာများထုတ်လုပ်ပါ။",
      back: "အစီရင်ခံစာများစာမျက်နှာသို့ ပြန်သွားရန်",
      comingSoon: "နေထိုင်မှုအစီရင်ခံစာစနစ်အား မကြာမီ ရရှိနိုင်တော့မည်ဖြစ်သည်။",
    },
  }[lang === "mm" ? "mm" : "en"];

  const mockData = [
    { id: "REP-O01", title: "Tower A Occupancy Status", totalUnits: 120, occupied: 110, rate: "91.6%", status: "High" },
    { id: "REP-O02", title: "Tower B Occupancy Status", totalUnits: 120, occupied: 105, rate: "87.5%", status: "Normal" },
    { id: "REP-O03", title: "Tower C Occupancy Status", totalUnits: 150, occupied: 142, rate: "94.6%", status: "High" },
    { id: "REP-O04", title: "Penthouse Suites Status", totalUnits: 10, occupied: 8, rate: "80.0%", status: "Normal" },
    { id: "REP-O05", title: "Commercial Spaces Status", totalUnits: 20, occupied: 12, rate: "60.0%", status: "Low" },
  ];

  return (
    <Stack gap="xl" p="md">
      <Group justify="space-between">
        <Stack gap={4}>
          <Group gap="xs">
            <ThemeIcon variant="light" color="teal" size="lg" radius="md">
              <IconHome size={20} />
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
              <Table.Th fw={700} fz="sm" c="dark">Total Units</Table.Th>
              <Table.Th fw={700} fz="sm" c="dark">Occupied</Table.Th>
              <Table.Th fw={700} fz="sm" c="dark">Occupancy Rate</Table.Th>
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
                      <IconHome size={18} />
                    </ThemeIcon>
                    <Text size="sm" fw={600} c="dark">{item.title}</Text>
                  </Group>
                </Table.Td>
                <Table.Td>
                  <Text size="sm" c="dimmed">{item.totalUnits}</Text>
                </Table.Td>
                <Table.Td>
                  <Text size="sm" fw={500} c="dark">{item.occupied}</Text>
                </Table.Td>
                <Table.Td>
                  <Text size="sm" fw={500} c="dark">{item.rate}</Text>
                </Table.Td>
                <Table.Td>
                  <Badge 
                    variant="light" 
                    color={
                      item.status === 'High' ? 'green' : 
                      item.status === 'Normal' ? 'blue' : 'orange'
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
