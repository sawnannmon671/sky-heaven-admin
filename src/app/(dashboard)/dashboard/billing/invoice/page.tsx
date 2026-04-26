"use client";

import { Title, Text, Stack, Paper, Group, ThemeIcon, Button, Table, TextInput, ActionIcon, Badge } from "@mantine/core";
import { IconFileInvoice, IconChevronLeft, IconSearch, IconEye, IconEdit, IconTrash, IconPlus } from "@tabler/icons-react";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";

export default function InvoiceGenerationPage() {
  const { lang, mounted } = useTranslation();

  if (!mounted) return null;

  const t = {
    en: {
      title: "Invoice Generation",
      subtitle: "Generate and manage monthly invoices for residents.",
      back: "Back to Billing",
      comingSoon: "Invoice generation system is coming soon.",
    },
    mm: {
      title: "ငွေတောင်းခံလွှာထုတ်ခြင်း",
      subtitle: "နေထိုင်သူများအတွက် လစဉ်ငွေတောင်းခံလွှာများကို ထုတ်ပေးခြင်းနှင့် စီမံခန့်ခွဲခြင်း။",
      back: "ဘဏ္ဍာရေးစာမျက်နှာသို့ ပြန်သွားရန်",
      comingSoon: "ငွေတောင်းခံလွှာထုတ်ခြင်းစနစ်အား မကြာမီ ရရှိနိုင်တော့မည်ဖြစ်သည်။",
    },
  }[lang === "mm" ? "mm" : "en"];

  return (
    <Stack gap="xl" p="md">
      <Group justify="space-between">
        <Stack gap={4}>
          <Group gap="xs">
            <ThemeIcon variant="light" color="blue" size="lg" radius="md">
              <IconFileInvoice size={20} />
            </ThemeIcon>
            <Title order={1}>{t.title}</Title>
          </Group>
          <Text c="dimmed" size="md">{t.subtitle}</Text>
        </Stack>
        <Button 
          component={Link} 
          href="/dashboard/billing" 
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
              <Table.Th fw={700} fz="sm" c="dark">Name / Description</Table.Th>
              <Table.Th fw={700} fz="sm" c="dark">Status</Table.Th>
              <Table.Th fw={700} fz="sm" c="dark" ta="right">Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {[1, 2, 3].map((item) => (
              <Table.Tr key={item}>
                <Table.Td>
                  <Text size="sm" fw={700}>#00{item}</Text>
                </Table.Td>
                <Table.Td>
                  <Group gap="sm">
                    <ThemeIcon size="md" variant="light" color="blue" radius="md">
                      <IconFileInvoice size={18} />
                    </ThemeIcon>
                    <Text size="sm" fw={500}>Sample Record {item}</Text>
                  </Group>
                </Table.Td>
                <Table.Td>
                  <Badge variant="light" color={item === 1 ? 'green' : 'blue'} fw={700}>
                    {item === 1 ? 'Active' : 'Pending'}
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
