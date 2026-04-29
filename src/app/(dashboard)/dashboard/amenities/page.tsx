"use client";

import { useState } from "react";
import {  Title, Paper, Table, Group, Button, Badge, Stack, Text, ActionIcon, ThemeIcon, Avatar, Box, TextInput , Pagination } from "@mantine/core";
import { 
  IconPlus, 
  IconSearch, 
  IconEdit, 
  IconTrash, 
  IconExternalLink, 
  IconMicrophone, 
  IconGlassFull, 
  IconMoodKid, 
  IconBallFootball, 
  IconBooks, 
  IconDeviceTv, 
  IconPool,
  IconBarbell,
  IconMeat
} from "@tabler/icons-react";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";

const amenities = [
  { title: "Swimming Pool", status: "Open", capacity: "20 people", schedule: "06:00 - 22:00", icon: <IconPool size={20} />, color: "blue" },
  { title: "Gym Center", status: "Open", capacity: "15 people", schedule: "24/7", icon: <IconBarbell size={20} />, color: "teal" },
  { title: "BBQ Area", status: "Reserved", capacity: "10 people", schedule: "17:00 - 23:00", icon: <IconMeat size={20} />, color: "orange" },
  { title: "Function Hall", status: "Maintenance", capacity: "100 people", schedule: "Closed", icon: <IconPlus size={20} />, color: "red" },
  { title: "Karaoke Room", status: "Open", capacity: "8 people", schedule: "10:00 - 00:00", icon: <IconMicrophone size={20} />, color: "pink" },
  { title: "Sky Bar", status: "Open", capacity: "50 people", schedule: "16:00 - 02:00", icon: <IconGlassFull size={20} />, color: "indigo" },
  { title: "Children Playground", status: "Open", capacity: "30 people", schedule: "08:00 - 20:00", icon: <IconMoodKid size={20} />, color: "yellow" },
  { title: "Futsal Court", status: "Open", capacity: "12 people", schedule: "06:00 - 22:00", icon: <IconBallFootball size={20} />, color: "green" },
  { title: "Reading Lounge", status: "Open", capacity: "20 people", schedule: "08:00 - 21:00", icon: <IconBooks size={20} />, color: "cyan" },
  { title: "Cinema Room", status: "Reserved", capacity: "12 people", schedule: "10:00 - 22:00", icon: <IconDeviceTv size={20} />, color: "grape" },
];

const translations = {
  en: {
    title: "Amenities & Facilities",
    subtitle: "Manage property amenities and track usage status.",
    addBtn: "Add Amenity",
    searchPlaceholder: "Search amenities...",
    tableHeaders: {
      amenity: "Amenity Name",
      status: "Status",
      capacity: "Capacity",
      schedule: "Schedule",
      actions: "Actions",
    },
    statuses: {
      Open: "Open",
      Reserved: "Reserved",
      Maintenance: "Maintenance",
    },
    amenityTitles: {
      "Swimming Pool": "Swimming Pool",
      "Gym Center": "Gym Center",
      "BBQ Area": "BBQ Area",
      "Function Hall": "Function Hall",
      "Karaoke Room": "Karaoke Room",
      "Sky Bar": "Sky Bar",
      "Children Playground": "Children Playground",
      "Futsal Court": "Futsal Court",
      "Reading Lounge": "Reading Lounge",
      "Cinema Room": "Cinema Room",
    },
  },
  mm: {
    title: "သာယာအဆင်ပြေမှုများနှင့် အဆောက်အအုံများ",
    subtitle: "အိမ်ခြံမြေ၏ ဝန်ဆောင်မှုများနှင့် အခြေအနေများကို စီမံခန့်ခွဲပါ။",
    addBtn: "ဝန်ဆောင်မှုအသစ်ထည့်ရန်",
    searchPlaceholder: "ရှာဖွေရန်...",
    tableHeaders: {
      amenity: "ဝန်ဆောင်မှုအမည်",
      status: "အခြေအနေ",
      capacity: "ဆံ့ဝင်ဦးရေ",
      schedule: "အချိန်ဇယား",
      actions: "လုပ်ဆောင်ချက်များ",
    },
    statuses: {
      Open: "ဖွင့်လှစ်ထား",
      Reserved: "ကြိုတင်မှာယူထား",
      Maintenance: "ပြုပြင်ထိန်းသိမ်းဆဲ",
    },
    amenityTitles: {
      "Swimming Pool": "ရေကူးကန်",
      "Gym Center": "အားကစားခန်းမ",
      "BBQ Area": "အကင်စားသောက်ရန်နေရာ",
      "Function Hall": "အခမ်းအနားခန်းမ",
      "Karaoke Room": "ကာရာအိုကေခန်း",
      "Sky Bar": "Sky Bar",
      "Children Playground": "ကလေးကစားကွင်း",
      "Futsal Court": "ဖူဆယ်ကွင်း",
      "Reading Lounge": "စာဖတ်ခန်း",
      "Cinema Room": "ရုပ်ရှင်ခန်း",
    },
  },
};

export default function AmenitiesPage() {
  const [activePage, setPage] = useState(1);
  const itemsPerPage = 5;

  const { lang, mounted } = useTranslation();
  
  
  
  const t = translations[lang as keyof typeof translations] || translations.en;

  const rows = amenities.map((item) => {
    const id = `AMN-${(amenities.indexOf(item) + 1).toString().padStart(3, '0')}`;
    return (
      <Table.Tr key={item.title} style={{ transition: 'all 0.2s ease' }}>
        <Table.Td>
          <Group gap="md">
            <ThemeIcon 
              variant="light" 
              color={item.color} 
              size={42} 
              radius="lg"
              style={{ boxShadow: `0 4px 10px var(--mantine-color-${item.color}-1)` }}
            >
              {item.icon}
            </ThemeIcon>
            <Stack gap={0}>
              <Text fw={700} size="sm">
                {t.amenityTitles[item.title as keyof typeof t.amenityTitles] || item.title}
              </Text>
              <Text size="xs" c="dimmed" fw={600} lts={0.5}>{id}</Text>
            </Stack>
          </Group>
        </Table.Td>
        <Table.Td>
          <Badge 
            variant="light" 
            color={item.status === "Open" ? "teal" : item.status === "Reserved" ? "blue" : "red"}
            size="md"
            radius="sm"
            style={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}
          >
            {t.statuses[item.status as keyof typeof t.statuses]}
          </Badge>
        </Table.Td>
        <Table.Td>
          <Text size="sm" fw={600} c="gray.7">{item.capacity}</Text>
        </Table.Td>
        <Table.Td>
          <Group gap={6}>
            <Text size="sm" fw={600} c="gray.7">{item.schedule}</Text>
          </Group>
        </Table.Td>
        <Table.Td>
          <Group gap={4} justify="flex-end">
            <ActionIcon 
              variant="light" 
              color="blue" 
              radius="md"
              size="lg"
              title="Details"
              component={Link}
              href={`/dashboard/amenities/${id}`}
            >
              <IconExternalLink size={18} />
            </ActionIcon>
            <ActionIcon variant="light" color="blue" radius="md" size="lg" title="Edit">
              <IconEdit size={18} />
            </ActionIcon>
            <ActionIcon variant="light" color="red" radius="md" size="lg" title="Delete">
              <IconTrash size={18} />
            </ActionIcon>
          </Group>
        </Table.Td>
      </Table.Tr>
    );
  });

  return (
    <Stack gap="xl" p="md">
      <Group justify="space-between" align="flex-end">
        <Stack gap={4}>
          <Title order={1} c="#014F86" style={{ fontSize: '2rem', fontWeight: 900, letterSpacing: '-1px' }}>{t.title}</Title>
          <Text c="dimmed" size="md" fw={500}>{t.subtitle}</Text>
        </Stack>
        <Button 
          leftSection={<IconPlus size={18} />} 
          color="#014F86" 
          radius="md" 
          size="md"
          style={{ boxShadow: '0 4px 15px rgba(1, 79, 134, 0.25)' }}
        >
          {t.addBtn}
        </Button>
      </Group>

      <Paper radius="md" style={{ border: '1px solid #e9ecef', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)' }}>
        <Box p="lg" style={{ borderBottom: '1px solid #e9ecef', backgroundColor: '#fafafa' }}>
          <Group justify="space-between">
            <TextInput
              placeholder={t.searchPlaceholder} w={250}
              leftSection={<IconSearch size={18} color="var(--mantine-color-blue-6)" />}
              style={{ width: 350 }}
              radius="md"
              size="sm"
            />
          </Group>
        </Box>

        <Table.ScrollContainer minWidth={800}>
          <Table verticalSpacing="md" horizontalSpacing="lg" highlightOnHover>
            <Table.Thead bg="gray.0">
              <Table.Tr>
                <Table.Th fw={700} fz="sm" c="dark">{t.tableHeaders.amenity}</Table.Th>
                <Table.Th fw={700} fz="sm" c="dark">{t.tableHeaders.status}</Table.Th>
                <Table.Th fw={700} fz="sm" c="dark">{t.tableHeaders.capacity}</Table.Th>
                <Table.Th fw={700} fz="sm" c="dark">{t.tableHeaders.schedule}</Table.Th>
                <Table.Th fw={700} fz="sm" c="dark" ta="right">{t.tableHeaders.actions}</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows.slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage)}</Table.Tbody>
          </Table>
        <Group justify="space-between" mt="md">
          <Text size="sm" c="dimmed">
            Showing {((activePage - 1) * itemsPerPage) + 1} to {Math.min(activePage * itemsPerPage, rows.length)} of {rows.length} entries
          </Text>
          <Pagination total={Math.ceil(rows.length / itemsPerPage)} value={activePage} onChange={setPage} color="#014F86" />
        </Group>
      
        </Table.ScrollContainer>
      </Paper>
    </Stack>
  );
}
