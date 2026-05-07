"use client";

import { Title, Text, Stack, Paper, Group, ThemeIcon, Button, Table, TextInput, ActionIcon, Badge } from "@mantine/core";
import { IconBuilding, IconChevronLeft, IconSearch, IconEye, IconEdit, IconTrash, IconPlus } from "@tabler/icons-react";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";

export default function CondoInfoPage() {
  const { lang, mounted } = useTranslation();

  

  const t = {
    en: {
      title: "Condo Info",
      subtitle: "Manage general information about the condominium property.",
      back: "Back to Settings",
      comingSoon: "Condo information management is coming soon.",
    },
    mm: {
      title: "ကွန်ဒိုအချက်အလက်",
      subtitle: "ကွန်ဒိုအိမ်ခြံမြေဆိုင်ရာ အထွေထွေအချက်အလက်များကို စီမံခန့်ခွဲပါ။",
      back: "ဆက်တင်များစာမျက်နှာသို့ ပြန်သွားရန်",
      comingSoon: "ကွန်ဒိုအချက်အလက်စီမံခန့်ခွဲမှုအား မကြာမီ ရရှိနိုင်တော့မည်ဖြစ်သည်။",
    },
  }[lang === "mm" ? "mm" : "en"];

  return (
    <Stack gap="xl" p="md">
      <Group justify="space-between">
        <Stack gap={4}>
          <Title order={2} c="#014F86">{t.title}</Title>
          <Text c="dimmed" size="sm">{t.subtitle}</Text>
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
              <Table.Th fw={700} fz="sm" c="white">Facility ID</Table.Th>
              <Table.Th fw={700} fz="sm" c="white">Facility Name</Table.Th>
              <Table.Th fw={700} fz="sm" c="white">Capacity</Table.Th>
              <Table.Th fw={700} fz="sm" c="white">Operating Hours</Table.Th>
              <Table.Th fw={700} fz="sm" c="white">Status</Table.Th>
              <Table.Th fw={700} fz="sm" c="white" ta="right">Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {[
              { id: "FAC-001", name: "Swimming Pool", capacity: "50 Persons", hours: "06:00 AM - 10:00 PM", status: "Open" },
              { id: "FAC-002", name: "Gymnasium", capacity: "30 Persons", hours: "24 Hours", status: "Open" },
              { id: "FAC-003", name: "Community Hall", capacity: "150 Persons", hours: "08:00 AM - 11:00 PM", status: "Maintenance" },
              { id: "FAC-004", name: "Tower A Parking", capacity: "200 Vehicles", hours: "24 Hours", status: "Open" },
              { id: "FAC-005", name: "BBQ Area", capacity: "20 Persons", hours: "10:00 AM - 10:00 PM", status: "Closed" }
            ].map((item) => (
              <Table.Tr key={item.id}>
                <Table.Td>
                  <Text size="sm" fw={700}>{item.id}</Text>
                </Table.Td>
                <Table.Td>
                  <Group gap="sm">
                    <ThemeIcon size="md" variant="light" color="teal" radius="md">
                      <IconBuilding size={18} />
                    </ThemeIcon>
                    <Text size="sm" fw={500}>{item.name}</Text>
                  </Group>
                </Table.Td>
                <Table.Td><Text size="sm">{item.capacity}</Text></Table.Td>
                <Table.Td><Text size="sm">{item.hours}</Text></Table.Td>
                <Table.Td>
                  <Badge variant="light" color={item.status === 'Open' ? 'green' : item.status === 'Maintenance' ? 'orange' : 'red'} fw={700}>
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
