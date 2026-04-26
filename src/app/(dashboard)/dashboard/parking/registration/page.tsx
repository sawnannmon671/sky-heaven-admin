"use client";

import { Title, Text, Stack, Paper, Group, ThemeIcon, Button, Table, TextInput, ActionIcon, Badge } from "@mantine/core";
import { IconId, IconChevronLeft, IconSearch, IconEye, IconEdit, IconTrash, IconPlus } from "@tabler/icons-react";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";

export default function VehicleRegistrationPage() {
  const { lang, mounted } = useTranslation();

  if (!mounted) return null;

  const t = {
    en: {
      title: "Vehicle Registration",
      subtitle: "Register and manage resident and staff vehicles.",
      back: "Back to Parking",
      comingSoon: "Vehicle registration system is coming soon.",
    },
    mm: {
      title: "ယာဉ်မှတ်ပုံတင်ခြင်း",
      subtitle: "နေထိုင်သူများနှင့် ဝန်ထမ်းများ၏ ယာဉ်များကို မှတ်ပုံတင်ခြင်းနှင့် စီမံခန့်ခွဲခြင်း။",
      back: "ကားပါကင်စာမျက်နှာသို့ ပြန်သွားရန်",
      comingSoon: "ယာဉ်မှတ်ပုံတင်ခြင်းစနစ်အား မကြာမီ ရရှိနိုင်တော့မည်ဖြစ်သည်။",
    },
  }[lang === "mm" ? "mm" : "en"];

  const mockData = [
    { id: "VR-001", owner: "U Aung Aung", role: "Resident", unit: "A-101", vehicle: "YGN 1A-1234", model: "Toyota Harrier", status: "Active" },
    { id: "VR-002", owner: "Daw Su Su", role: "Resident", unit: "B-205", vehicle: "MDY 2B-5678", model: "Honda Fit", status: "Active" },
    { id: "VR-003", owner: "Ko Min", role: "Staff", unit: "N/A", vehicle: "YGN 3C-9012", model: "Toyota Vitz", status: "Inactive" },
    { id: "VR-004", owner: "Daw Hla Hla", role: "Resident", unit: "A-502", vehicle: "YGN 4D-3456", model: "Honda Civic", status: "Active" },
    { id: "VR-005", owner: "U Zaw Myo", role: "Resident", unit: "D-102", vehicle: "NPT 5E-7890", model: "Toyota Crown", status: "Pending" },
  ];

  return (
    <Stack gap="xl" p="md">
      <Group justify="space-between">
        <Stack gap={4}>
          <Group gap="xs">
            <ThemeIcon variant="light" color="teal" size="lg" radius="md">
              <IconId size={20} />
            </ThemeIcon>
            <Title order={1}>{t.title}</Title>
          </Group>
          <Text c="dimmed" size="md">{t.subtitle}</Text>
        </Stack>
        <Button 
          component={Link} 
          href="/dashboard/parking" 
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
              <Table.Th fw={700} fz="sm" c="dark">Owner Info</Table.Th>
              <Table.Th fw={700} fz="sm" c="dark">Vehicle Info</Table.Th>
              <Table.Th fw={700} fz="sm" c="dark">Role & Unit</Table.Th>
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
                      <IconId size={18} />
                    </ThemeIcon>
                    <Text size="sm" fw={500}>{item.owner}</Text>
                  </Group>
                </Table.Td>
                <Table.Td>
                  <Stack gap={0}>
                    <Text size="sm" fw={500}>{item.vehicle}</Text>
                    <Text size="xs" c="dimmed">{item.model}</Text>
                  </Stack>
                </Table.Td>
                <Table.Td>
                  <Stack gap={0}>
                    <Badge variant="light" color={item.role === 'Resident' ? 'blue' : 'orange'} size="sm" mb={4}>
                      {item.role}
                    </Badge>
                    <Text size="xs" c="dimmed">Unit: {item.unit}</Text>
                  </Stack>
                </Table.Td>
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
