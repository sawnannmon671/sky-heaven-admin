"use client";

import { Title, Text, Stack, Paper, Group, ThemeIcon, Button, Table, TextInput, ActionIcon, Badge } from "@mantine/core";
import { IconGlassFull, IconChevronLeft, IconSearch, IconEye, IconEdit, IconTrash, IconPlus } from "@tabler/icons-react";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";

export default function EventHallPage() {
  const { lang, mounted } = useTranslation();

  if (!mounted) return null;

  const t = {
    en: {
      title: "Event Hall Reservation",
      subtitle: "Book the event hall for parties, meetings, and celebrations.",
      back: "Back to Amenities",
      comingSoon: "Event hall reservation system is coming soon.",
    },
    mm: {
      title: "ပွဲခန်းမဘွတ်ကင်",
      subtitle: "ပါတီများ၊ အစည်းအဝေးများနှင့် ပွဲလမ်းသဘင်များအတွက် ပွဲခန်းမကို ကြိုတင်မှာယူပါ။",
      back: "ဝန်ဆောင်မှုများသို့ ပြန်သွားရန်",
      comingSoon: "ပွဲခန်းမဘွတ်ကင်စနစ်အား မကြာမီ ရရှိနိုင်တော့မည်ဖြစ်သည်။",
    },
  }[lang === "mm" ? "mm" : "en"];

  return (
    <Stack gap="xl" p="md">
      <Group justify="space-between">
        <Stack gap={4}>
          <Group gap="xs">
            <ThemeIcon variant="light" color="grape" size="lg" radius="md">
              <IconGlassFull size={20} />
            </ThemeIcon>
            <Title order={1}>{t.title}</Title>
          </Group>
          <Text c="dimmed" size="md">{t.subtitle}</Text>
        </Stack>
        <Button 
          component={Link} 
          href="/dashboard/amenities" 
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
                      <IconGlassFull size={18} />
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
