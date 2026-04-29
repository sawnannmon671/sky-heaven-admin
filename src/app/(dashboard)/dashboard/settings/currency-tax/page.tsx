"use client";

import { Title, Text, Stack, Paper, Group, ThemeIcon, Button, Table, TextInput, ActionIcon, Badge } from "@mantine/core";
import { IconCoin, IconChevronLeft, IconSearch, IconEye, IconEdit, IconTrash, IconPlus } from "@tabler/icons-react";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";

export default function CurrencyTaxPage() {
  const { lang, mounted } = useTranslation();

  

  const t = {
    en: {
      title: "Currency / Tax",
      subtitle: "Configure currency settings and tax rates.",
      back: "Back to Settings",
      comingSoon: "Currency and tax configuration is coming soon.",
    },
    mm: {
      title: "ငွေကြေးနှင့် အခွန်",
      subtitle: "ငွေကြေးဆက်တင်များနှင့် အခွန်နှုန်းထားများကို ပြင်ဆင်သတ်မှတ်ပါ။",
      back: "ဆက်တင်များစာမျက်နှာသို့ ပြန်သွားရန်",
      comingSoon: "ငွေကြေးနှင့် အခွန်ပြင်ဆင်သတ်မှတ်မှုအား မကြာမီ ရရှိနိုင်တော့မည်ဖြစ်သည်။",
    },
  }[lang === "mm" ? "mm" : "en"];

  return (
    <Stack gap="xl" p="md">
      <Group justify="space-between">
        <Stack gap={4}>
          <Group gap="xs">
            <ThemeIcon variant="light" color="indigo" size="lg" radius="md">
              <IconCoin size={20} />
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
          <Table.Thead bg="gray.0">
            <Table.Tr>
              <Table.Th fw={700} fz="sm" c="dark">ID</Table.Th>
              <Table.Th fw={700} fz="sm" c="dark">Type</Table.Th>
              <Table.Th fw={700} fz="sm" c="dark">Rate / Value</Table.Th>
              <Table.Th fw={700} fz="sm" c="dark">Description</Table.Th>
              <Table.Th fw={700} fz="sm" c="dark">Status</Table.Th>
              <Table.Th fw={700} fz="sm" c="dark" ta="right">Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {[
              { id: "TAX-001", type: "Commercial Tax", rate: "5%", desc: "Standard commercial tax applied to services", status: "Active" },
              { id: "TAX-002", type: "Income Tax", rate: "2%", desc: "Withholding tax for specific transactions", status: "Active" },
              { id: "CUR-001", type: "Exchange Rate (USD to MMK)", rate: "2,100 MMK", desc: "Official Central Bank exchange rate", status: "Active" },
              { id: "CUR-002", type: "Exchange Rate (SGD to MMK)", rate: "1,550 MMK", desc: "Singapore Dollar conversion", status: "Inactive" },
              { id: "TAX-003", type: "Maintenance Fee Tax", rate: "3%", desc: "Special tax for maintenance services", status: "Pending" }
            ].map((item) => (
              <Table.Tr key={item.id}>
                <Table.Td>
                  <Text size="sm" fw={700}>{item.id}</Text>
                </Table.Td>
                <Table.Td>
                  <Group gap="sm">
                    <ThemeIcon size="md" variant="light" color="indigo" radius="md">
                      <IconCoin size={18} />
                    </ThemeIcon>
                    <Text size="sm" fw={500}>{item.type}</Text>
                  </Group>
                </Table.Td>
                <Table.Td><Text size="sm" fw={600}>{item.rate}</Text></Table.Td>
                <Table.Td><Text size="sm">{item.desc}</Text></Table.Td>
                <Table.Td>
                  <Badge variant="light" color={item.status === 'Active' ? 'green' : item.status === 'Inactive' ? 'gray' : 'orange'} fw={700}>
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
