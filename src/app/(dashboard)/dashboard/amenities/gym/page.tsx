"use client";

import { Title, Text, Stack, Paper, Group, ThemeIcon, Button, Table, TextInput, ActionIcon, Badge } from "@mantine/core";
import { IconBarbell, IconChevronLeft, IconSearch, IconEye, IconEdit, IconTrash, IconPlus } from "@tabler/icons-react";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";

export default function GymBookingPage() {
  const { lang, mounted } = useTranslation();

  if (!mounted) return null;

  const t = {
    en: {
      title: "Gym Booking",
      subtitle: "Book your gym session and view equipment availability.",
      back: "Back to Amenities",
      comingSoon: "Gym booking system is coming soon.",
    },
    mm: {
      title: "ဂျင်မ်ဘွတ်ကင်",
      subtitle: "ဂျင်မ်အသုံးပြုရန် ဘွတ်ကင်လုပ်ခြင်းနှင့် စက်ပစ္စည်းများ၏ အခြေအနေကို ကြည့်ရှုပါ။",
      back: "ဝန်ဆောင်မှုများသို့ ပြန်သွားရန်",
      comingSoon: "ဂျင်မ်ဘွတ်ကင်စနစ်အား မကြာမီ ရရှိနိုင်တော့မည်ဖြစ်သည်။",
    },
  }[lang === "mm" ? "mm" : "en"];

  const mockData = [
    { id: "GB-001", resident: "U Aung Aung", unit: "A-101", session: "07:00 AM - 08:30 AM", trainer: "Yes", status: "Confirmed" },
    { id: "GB-002", resident: "Daw Su Su", unit: "B-205", session: "05:00 PM - 06:30 PM", trainer: "No", status: "Confirmed" },
    { id: "GB-003", resident: "Ko Min", unit: "C-304", session: "06:00 AM - 07:00 AM", trainer: "Yes", status: "Cancelled" },
    { id: "GB-004", resident: "Daw Hla Hla", unit: "A-502", session: "08:00 AM - 09:00 AM", trainer: "No", status: "Confirmed" },
    { id: "GB-005", resident: "U Zaw Myo", unit: "D-102", session: "04:00 PM - 05:30 PM", trainer: "No", status: "Pending" },
  ];

  return (
    <Stack gap="xl" p="md">
      <Group justify="space-between">
        <Stack gap={4}>
          <Group gap="xs">
            <ThemeIcon variant="light" color="teal" size="lg" radius="md">
              <IconBarbell size={20} />
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
              <Table.Th fw={700} fz="sm" c="dark">Booking ID</Table.Th>
              <Table.Th fw={700} fz="sm" c="dark">Resident & Unit</Table.Th>
              <Table.Th fw={700} fz="sm" c="dark">Session Time</Table.Th>
              <Table.Th fw={700} fz="sm" c="dark">Trainer</Table.Th>
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
                    <ThemeIcon size="md" variant="light" color="teal" radius="md">
                      <IconBarbell size={18} />
                    </ThemeIcon>
                    <Stack gap={0}>
                      <Text size="sm" fw={500}>{item.resident}</Text>
                      <Text size="xs" c="dimmed">Unit: {item.unit}</Text>
                    </Stack>
                  </Group>
                </Table.Td>
                <Table.Td>
                  <Text size="sm">{item.session}</Text>
                </Table.Td>
                <Table.Td>
                  <Badge variant="outline" color={item.trainer === 'Yes' ? 'blue' : 'gray'}>
                    {item.trainer === 'Yes' ? 'Requested' : 'None'}
                  </Badge>
                </Table.Td>
                <Table.Td>
                  <Badge variant="light" color={item.status === 'Confirmed' ? 'green' : item.status === 'Cancelled' ? 'red' : 'orange'} fw={700}>
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
