"use client";

import { Title, Text, Stack, Paper, Group, ThemeIcon, Button, Table, TextInput, ActionIcon, Badge } from "@mantine/core";
import { IconLock, IconChevronLeft, IconSearch, IconEye, IconEdit, IconTrash, IconPlus } from "@tabler/icons-react";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";

export default function AccessLogsPage() {
  const { lang, mounted } = useTranslation();

  if (!mounted) return null;

  const t = {
    en: {
      title: "Access Logs",
      subtitle: "Review user access logs and activity history.",
      back: "Back to User Management",
      comingSoon: "Access log tracking system is coming soon.",
    },
    mm: {
      title: "ဝင်ရောက်မှုမှတ်တမ်းများ",
      subtitle: "အသုံးပြုသူဝင်ရောက်မှုမှတ်တမ်းများနှင့် လုပ်ဆောင်ချက်မှတ်တမ်းများကို ပြန်လည်သုံးသပ်ပါ။",
      back: "အသုံးပြုသူစီမံခန့်ခွဲမှုစာမျက်နှာသို့ ပြန်သွားရန်",
      comingSoon: "ဝင်ရောက်မှုမှတ်တမ်းခြေရာခံစနစ်အား မကြာမီ ရရှိနိုင်တော့မည်ဖြစ်သည်။",
    },
  }[lang === "mm" ? "mm" : "en"];

  const mockData = [
    { id: "LOG-001", user: "Admin John", action: "Logged In", ipAddress: "192.168.1.10", timestamp: "2024-04-26 08:30:00", status: "Success" },
    { id: "LOG-002", user: "Manager Jane", action: "Updated Settings", ipAddress: "192.168.1.15", timestamp: "2024-04-26 09:15:22", status: "Success" },
    { id: "LOG-003", user: "Guard Mike", action: "Failed Login", ipAddress: "10.0.0.5", timestamp: "2024-04-26 10:05:10", status: "Failed" },
    { id: "LOG-004", user: "Admin John", action: "Deleted Record", ipAddress: "192.168.1.10", timestamp: "2024-04-26 11:20:45", status: "Warning" },
    { id: "LOG-005", user: "Staff Sarah", action: "Logged Out", ipAddress: "192.168.1.20", timestamp: "2024-04-26 12:00:00", status: "Success" },
  ];

  return (
    <Stack gap="xl" p="md">
      <Group justify="space-between">
        <Stack gap={4}>
          <Group gap="xs">
            <ThemeIcon variant="light" color="indigo" size="lg" radius="md">
              <IconLock size={20} />
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
            placeholder="Search logs..."
            leftSection={<IconSearch size={16} />}
            size="md"
            radius="md"
            style={{ flex: 1, maxWidth: 400 }}
          />
          <Button variant="outline" color="#014F86" radius="md">
            Export Logs
          </Button>
        </Group>

        <Table verticalSpacing="md" highlightOnHover>
          <Table.Thead bg="gray.0">
            <Table.Tr>
              <Table.Th fw={700} fz="sm" c="dark">Log ID</Table.Th>
              <Table.Th fw={700} fz="sm" c="dark">User & Action</Table.Th>
              <Table.Th fw={700} fz="sm" c="dark">IP Address</Table.Th>
              <Table.Th fw={700} fz="sm" c="dark">Timestamp</Table.Th>
              <Table.Th fw={700} fz="sm" c="dark">Status</Table.Th>
              <Table.Th fw={700} fz="sm" c="dark" ta="right">Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {mockData.map((item) => (
              <Table.Tr key={item.id}>
                <Table.Td>
                  <Text size="sm" fw={700} c="dimmed">{item.id}</Text>
                </Table.Td>
                <Table.Td>
                  <Group gap="sm">
                    <ThemeIcon size="md" variant="light" color="indigo" radius="md">
                      <IconLock size={18} />
                    </ThemeIcon>
                    <Stack gap={0}>
                      <Text size="sm" fw={600} c="dark">{item.user}</Text>
                      <Text size="xs" c="dimmed">{item.action}</Text>
                    </Stack>
                  </Group>
                </Table.Td>
                <Table.Td>
                  <Text size="sm" c="dimmed">{item.ipAddress}</Text>
                </Table.Td>
                <Table.Td>
                  <Text size="sm" c="dimmed">{item.timestamp}</Text>
                </Table.Td>
                <Table.Td>
                  <Badge 
                    variant="light" 
                    color={
                      item.status === 'Success' ? 'green' : 
                      item.status === 'Warning' ? 'orange' : 'red'
                    } 
                    fw={700}
                  >
                    {item.status}
                  </Badge>
                </Table.Td>
                <Table.Td>
                  <Group gap={4} justify="flex-end">
                    <ActionIcon variant="subtle" color="gray"><IconEye size={16} /></ActionIcon>
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
