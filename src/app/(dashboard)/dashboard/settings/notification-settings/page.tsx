"use client";

import { Title, Text, Stack, Paper, Group, ThemeIcon, Button, Table, TextInput, ActionIcon, Badge } from "@mantine/core";
import { IconBellRinging, IconChevronLeft, IconSearch, IconEye, IconEdit, IconTrash, IconPlus } from "@tabler/icons-react";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";

export default function NotificationSettingsPage() {
  const { lang, mounted } = useTranslation();

  

  const t = {
    en: {
      title: "Notification Settings",
      subtitle: "Configure notification preferences for various events.",
      back: "Back to Settings",
      comingSoon: "Notification settings management is coming soon.",
    },
    mm: {
      title: "အကြောင်းကြားချက်ဆက်တင်များ",
      subtitle: "အဖြစ်အပျက်အမျိုးမျိုးအတွက် အကြောင်းကြားချက်များကို ပြင်ဆင်သတ်မှတ်ပါ။",
      back: "ဆက်တင်များစာမျက်နှာသို့ ပြန်သွားရန်",
      comingSoon: "အကြောင်းကြားချက်ဆက်တင်စီမံခန့်ခွဲမှုအား မကြာမီ ရရှိနိုင်တော့မည်ဖြစ်သည်။",
    },
  }[lang === "mm" ? "mm" : "en"];

  return (
    <Stack gap="xl" p="md">
      <Group justify="space-between">
        <Stack gap={4}>
          <Group gap="xs">
            <ThemeIcon variant="light" color="orange" size="lg" radius="md">
              <IconBellRinging size={20} />
            </ThemeIcon>
            <Title order={1} c="#014F86">{t.title}</Title>
          </Group>
          <Text c="dimmed" size="md">{t.subtitle}</Text>
        </Stack>
        <Button 
          component={Link} 
          href="/dashboard/settings" 
          variant="subtle" 
          leftSection={<IconChevronLeft size={16} />}
          color="gray"
        >
          {t.back}
        </Button>
      </Group>

      
      <Paper p="md" radius="md" withBorder shadow="sm">
        <Group justify="space-between" mb="md">
          <TextInput
            placeholder="Search..." w={250}
            leftSection={<IconSearch size={16} />}
            size="md"
            radius="md"
            w={250}
          />
          <Button leftSection={<IconPlus size={16} />} color="#014F86" radius="md">
            Add New
          </Button>
        </Group>

        <Table verticalSpacing="md" highlightOnHover>
          <Table.Thead bg="#014F86">
            <Table.Tr>
              <Table.Th fw={700} fz="sm" c="white">Setting ID</Table.Th>
              <Table.Th fw={700} fz="sm" c="white">Notification Type</Table.Th>
              <Table.Th fw={700} fz="sm" c="white">Target Audience</Table.Th>
              <Table.Th fw={700} fz="sm" c="white">Delivery Method</Table.Th>
              <Table.Th fw={700} fz="sm" c="white">Status</Table.Th>
              <Table.Th fw={700} fz="sm" c="white" ta="right">Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {[
              { id: "NOT-001", type: "Payment Reminders", target: "All Residents", method: "Email & SMS", status: "Enabled" },
              { id: "NOT-002", type: "Maintenance Alerts", target: "Specific Blocks", method: "Push Notification", status: "Enabled" },
              { id: "NOT-003", type: "Monthly Newsletter", target: "Subscribed Users", method: "Email", status: "Disabled" },
              { id: "NOT-004", type: "Security Announcements", target: "All Residents", method: "SMS & Push", status: "Enabled" },
              { id: "NOT-005", type: "Visitor Arrival", target: "Specific Host", method: "Push Notification", status: "Enabled" }
            ].map((item) => (
              <Table.Tr key={item.id}>
                <Table.Td>
                  <Text size="sm" fw={700}>{item.id}</Text>
                </Table.Td>
                <Table.Td>
                  <Group gap="sm">
                    <ThemeIcon size="md" variant="light" color="orange" radius="md">
                      <IconBellRinging size={18} />
                    </ThemeIcon>
                    <Text size="sm" fw={500}>{item.type}</Text>
                  </Group>
                </Table.Td>
                <Table.Td><Text size="sm">{item.target}</Text></Table.Td>
                <Table.Td><Text size="sm">{item.method}</Text></Table.Td>
                <Table.Td>
                  <Badge variant="light" color={item.status === 'Enabled' ? 'green' : 'gray'} fw={700}>
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
