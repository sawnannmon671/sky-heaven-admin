"use client";

import { Title, Paper, Table, Group, Button, Badge, Stack, Text, ActionIcon, ThemeIcon, Avatar, Box, TextInput } from "@mantine/core";
import { 
  IconPlus, 
  IconSearch, 
  IconEdit, 
  IconTrash, 
  IconExternalLink, 
  IconMicrophone, 
  IconGlass, 
  IconMoodBoy, 
  IconBallFootball, 
  IconBooks, 
  IconDeviceTv, 
  IconSwimming,
  IconBarbell,
  IconMeat
} from "@tabler/icons-react";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";

const amenities = [
  { title: "Swimming Pool", status: "Open", capacity: "20 people", schedule: "06:00 - 22:00", icon: <IconSwimming size={20} />, color: "blue" },
  { title: "Gym Center", status: "Open", capacity: "15 people", schedule: "24/7", icon: <IconBarbell size={20} />, color: "teal" },
  { title: "BBQ Area", status: "Reserved", capacity: "10 people", schedule: "17:00 - 23:00", icon: <IconMeat size={20} />, color: "orange" },
  { title: "Function Hall", status: "Maintenance", capacity: "100 people", schedule: "Closed", icon: <IconPlus size={20} />, color: "red" },
  { title: "Karaoke Room", status: "Open", capacity: "8 people", schedule: "10:00 - 00:00", icon: <IconMicrophone size={20} />, color: "pink" },
  { title: "Sky Bar", status: "Open", capacity: "50 people", schedule: "16:00 - 02:00", icon: <IconGlass size={20} />, color: "indigo" },
  { title: "Children Playground", status: "Open", capacity: "30 people", schedule: "08:00 - 20:00", icon: <IconMoodBoy size={20} />, color: "yellow" },
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
  const { lang, mounted } = useTranslation();
  
  if (!mounted) return null;
  
  const t = translations[lang as keyof typeof translations] || translations.en;

  const rows = amenities.map((item) => (
    <Table.Tr key={item.title}>
      <Table.Td>
        <Group gap="sm">
          <ThemeIcon variant="light" color={item.color} size="lg" radius="md">
            {item.icon}
          </ThemeIcon>
          <Stack gap={0}>
            <Text fw={600} size="sm">
              {t.amenityTitles[item.title as keyof typeof t.amenityTitles] || item.title}
            </Text>
            <Text size="xs" c="dimmed">ID: AMN-{(amenities.indexOf(item) + 1).toString().padStart(3, '0')}</Text>
          </Stack>
        </Group>
      </Table.Td>
      <Table.Td>
        <Badge 
          variant="dot" 
          color={item.status === "Open" ? "green" : item.status === "Reserved" ? "blue" : "red"}
          size="md"
        >
          {t.statuses[item.status as keyof typeof t.statuses]}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Text size="sm">{item.capacity}</Text>
      </Table.Td>
      <Table.Td>
        <Text size="sm">{item.schedule}</Text>
      </Table.Td>
      <Table.Td>
        <Group gap={8}>
          <ActionIcon 
            variant="subtle" 
            color="gray" 
            title="Details"
            component={Link}
            href={`/dashboard/amenities/AMN-${(amenities.indexOf(item) + 1).toString().padStart(3, '0')}`}
          >
            <IconExternalLink size={16} />
          </ActionIcon>
          <ActionIcon variant="subtle" color="blue" title="Edit">
            <IconEdit size={16} />
          </ActionIcon>
          <ActionIcon variant="subtle" color="red" title="Delete">
            <IconTrash size={16} />
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Stack gap="xl">
      <Group justify="space-between">
        <Stack gap={0}>
          <Title order={2}>{t.title}</Title>
          <Text c="dimmed" size="sm">{t.subtitle}</Text>
        </Stack>
        <Button leftSection={<IconPlus size={16} />} color="#014F86" radius="md">
          {t.addBtn}
        </Button>
      </Group>

      <Paper shadow="xs" p="md" radius="md" withBorder>
        <Stack gap="md">
          <Group justify="space-between">
            <TextInput
              placeholder={t.searchPlaceholder}
              leftSection={<IconSearch size={16} />}
              style={{ width: 300 }}
              radius="md"
            />
          </Group>

          <Table.ScrollContainer minWidth={800}>
            <Table verticalSpacing="sm" highlightOnHover>
              <Table.Thead bg="gray.0">
                <Table.Tr>
                  <Table.Th>{t.tableHeaders.amenity}</Table.Th>
                  <Table.Th>{t.tableHeaders.status}</Table.Th>
                  <Table.Th>{t.tableHeaders.capacity}</Table.Th>
                  <Table.Th>{t.tableHeaders.schedule}</Table.Th>
                  <Table.Th>{t.tableHeaders.actions}</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>{rows}</Table.Tbody>
            </Table>
          </Table.ScrollContainer>
        </Stack>
      </Paper>
    </Stack>
  );
}
