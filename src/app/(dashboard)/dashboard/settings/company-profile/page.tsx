"use client";

import { Title, Text, Stack, Paper, Group, ThemeIcon, Button, Table, TextInput, ActionIcon, Badge } from "@mantine/core";
import { IconBuildingSkyscraper, IconChevronLeft, IconSearch, IconEye, IconEdit, IconTrash, IconPlus } from "@tabler/icons-react";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";

export default function CompanyProfilePage() {
  const { lang, mounted } = useTranslation();

  

  const t = {
    en: {
      title: "Company Profile",
      subtitle: "Manage company information and branding.",
      back: "Back to Settings",
      comingSoon: "Company profile management is coming soon.",
    },
    mm: {
      title: "ကုမ္ပဏီအချက်အလက်",
      subtitle: "ကုမ္ပဏီအချက်အလက်နှင့် အမှတ်တံဆိပ်များကို စီမံခန့်ခွဲပါ။",
      back: "ဆက်တင်များစာမျက်နှာသို့ ပြန်သွားရန်",
      comingSoon: "ကုမ္ပဏီအချက်အလက်စီမံခန့်ခွဲမှုအား မကြာမီ ရရှိနိုင်တော့မည်ဖြစ်သည်။",
    },
  }[lang === "mm" ? "mm" : "en"];

  return (
    <Stack gap="xl" p="md">
      <Group justify="space-between">
        <Stack gap={4}>
          <Group gap="xs">
            <ThemeIcon variant="light" color="blue" size="lg" radius="md">
              <IconBuildingSkyscraper size={20} />
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
            w={250}
          />
          <Button leftSection={<IconPlus size={16} />} color="#014F86" radius="md">
            Add New
          </Button>
        </Group>

        <Table verticalSpacing="md" highlightOnHover>
          <Table.Thead bg="#014F86">
            <Table.Tr>
              <Table.Th fw={700} fz="sm" c="white">Branch ID</Table.Th>
              <Table.Th fw={700} fz="sm" c="white">Branch Name</Table.Th>
              <Table.Th fw={700} fz="sm" c="white">Location</Table.Th>
              <Table.Th fw={700} fz="sm" c="white">Contact</Table.Th>
              <Table.Th fw={700} fz="sm" c="white">Status</Table.Th>
              <Table.Th fw={700} fz="sm" c="white" ta="right">Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {[
              { id: "BR-001", name: "Headquarters", location: "Yangon, Myanmar", contact: "+95 9 123 456 789", status: "Active" },
              { id: "BR-002", name: "Mandalay Office", location: "Mandalay, Myanmar", contact: "+95 9 987 654 321", status: "Active" },
              { id: "BR-003", name: "Naypyidaw Branch", location: "Naypyidaw, Myanmar", contact: "+95 9 555 444 333", status: "Active" },
              { id: "BR-004", name: "Taunggyi Support Center", location: "Taunggyi, Shan State", contact: "+95 9 111 222 333", status: "Inactive" },
              { id: "BR-005", name: "Bago Regional Office", location: "Bago, Myanmar", contact: "+95 9 444 555 666", status: "Active" }
            ].map((item) => (
              <Table.Tr key={item.id}>
                <Table.Td>
                  <Text size="sm" fw={700}>{item.id}</Text>
                </Table.Td>
                <Table.Td>
                  <Group gap="sm">
                    <ThemeIcon size="md" variant="light" color="blue" radius="md">
                      <IconBuildingSkyscraper size={18} />
                    </ThemeIcon>
                    <Text size="sm" fw={500}>{item.name}</Text>
                  </Group>
                </Table.Td>
                <Table.Td><Text size="sm">{item.location}</Text></Table.Td>
                <Table.Td><Text size="sm">{item.contact}</Text></Table.Td>
                <Table.Td>
                  <Badge variant="light" color={item.status === 'Active' ? 'green' : 'gray'} fw={700}>
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
