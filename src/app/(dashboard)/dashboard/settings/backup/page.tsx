"use client";

import { Title, Text, Stack, Paper, Group, ThemeIcon, Button, Table, TextInput, ActionIcon, Badge } from "@mantine/core";
import { IconDeviceFloppy, IconChevronLeft, IconSearch, IconEye, IconEdit, IconTrash, IconPlus } from "@tabler/icons-react";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";

export default function BackupPage() {
  const { lang, mounted } = useTranslation();

  

  const t = {
    en: {
      title: "Backup",
      subtitle: "Manage data backups and restoration points.",
      back: "Back to Settings",
      comingSoon: "Data backup and restoration system is coming soon.",
    },
    mm: {
      title: "ဒေတာသိမ်းဆည်းမှု",
      subtitle: "ဒေတာသိမ်းဆည်းမှုများနှင့် ပြန်လည်ရယူခြင်းအမှတ်များကို စီမံခန့်ခွဲပါ။",
      back: "ဆက်တင်များစာမျက်နှာသို့ ပြန်သွားရန်",
      comingSoon: "ဒေတာသိမ်းဆည်းမှုနှင့် ပြန်လည်ရယူခြင်းစနစ်အား မကြာမီ ရရှိနိုင်တော့မည်ဖြစ်သည်။",
    },
  }[lang === "mm" ? "mm" : "en"];

  return (
    <Stack gap="xl" p="md">
      <Group justify="space-between">
        <Stack gap={4}>
          <Group gap="xs">
            <ThemeIcon variant="light" color="violet" size="lg" radius="md">
              <IconDeviceFloppy size={20} />
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
              <Table.Th fw={700} fz="sm" c="dark">Backup ID</Table.Th>
              <Table.Th fw={700} fz="sm" c="dark">Backup Name</Table.Th>
              <Table.Th fw={700} fz="sm" c="dark">Frequency</Table.Th>
              <Table.Th fw={700} fz="sm" c="dark">Last Run</Table.Th>
              <Table.Th fw={700} fz="sm" c="dark">Status</Table.Th>
              <Table.Th fw={700} fz="sm" c="dark" ta="right">Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {[
              { id: "BAK-001", name: "Daily Database Backup", frequency: "Daily", lastRun: "2024-04-26 02:00", status: "Success" },
              { id: "BAK-002", name: "Weekly Full System", frequency: "Weekly", lastRun: "2024-04-21 03:00", status: "Success" },
              { id: "BAK-003", name: "Monthly Archive", frequency: "Monthly", lastRun: "2024-04-01 01:00", status: "Success" },
              { id: "BAK-004", name: "User Uploads Sync", frequency: "Daily", lastRun: "2024-04-26 04:00", status: "Failed" },
              { id: "BAK-005", name: "Config Snapshot", frequency: "On Demand", lastRun: "2024-04-25 15:30", status: "Success" }
            ].map((item) => (
              <Table.Tr key={item.id}>
                <Table.Td>
                  <Text size="sm" fw={700}>{item.id}</Text>
                </Table.Td>
                <Table.Td>
                  <Group gap="sm">
                    <ThemeIcon size="md" variant="light" color="violet" radius="md">
                      <IconDeviceFloppy size={18} />
                    </ThemeIcon>
                    <Text size="sm" fw={500}>{item.name}</Text>
                  </Group>
                </Table.Td>
                <Table.Td><Text size="sm">{item.frequency}</Text></Table.Td>
                <Table.Td><Text size="sm">{item.lastRun}</Text></Table.Td>
                <Table.Td>
                  <Badge variant="light" color={item.status === 'Success' ? 'green' : 'red'} fw={700}>
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
