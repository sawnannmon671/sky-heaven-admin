"use client";

import { Title, Text, Stack, Paper, Group, ThemeIcon, Button, Divider, SimpleGrid, Badge, Box, Avatar } from "@mantine/core";
import { IconChevronLeft, IconUser, IconPhone, IconHome, IconCalendarEvent, IconAddressBook } from "@tabler/icons-react";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";
import { useParams } from "next/navigation";

const mockData = [
  { id: "RES-001", name: "U Aung Aung", residentType: "Owner", unit: "A-101", phone: "+95 9 123 456 789", moveInDate: "2020-01-15", status: "Active" },
  { id: "RES-002", name: "Daw Mya Mya", residentType: "Tenant", unit: "B-205", phone: "+95 9 987 654 321", moveInDate: "2023-07-01", status: "Active" },
  { id: "RES-003", name: "Mg Thura", residentType: "Owner", unit: "A-502", phone: "+95 9 111 222 333", moveInDate: "2021-03-10", status: "Active" },
  { id: "RES-004", name: "U Zaw Myo", residentType: "Owner", unit: "D-102", phone: "+95 9 444 888 999", moveInDate: "2019-11-20", status: "Active" },
  { id: "RES-005", name: "Daw Thandar", residentType: "Tenant", unit: "A-502", phone: "+95 9 555 666 777", moveInDate: "2022-08-15", status: "Inactive" },
];

export default function ResidentDetailPage() {
  const { lang, mounted } = useTranslation();
  const params = useParams();
  const id = params.id as string;

  const item = mockData.find((d) => d.id === id);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'green';
      case 'inactive': return 'gray';
      default: return 'blue';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'owner': return 'blue';
      case 'tenant': return 'teal';
      default: return 'gray';
    }
  };

  if (!mounted) return null;

  return (
    <Stack gap="xl" p="md">
      <Group justify="space-between">
        <Stack gap={4}>
          <Group gap="xs">
            <ThemeIcon variant="light" color="indigo" size="lg" radius="md">
              <IconAddressBook size={20} />
            </ThemeIcon>
            <Title order={2} c="#014F86">Resident Details</Title>
          </Group>
          <Text c="dimmed" size="sm">Detailed information for {item?.name || id}</Text>
        </Stack>
        <Button 
          component={Link} 
          href="/dashboard/residents/directory" 
          variant="subtle" 
          leftSection={<IconChevronLeft size={16} />}
          color="gray"
        >
          Back to Directory
        </Button>
      </Group>

      {item ? (
        <Paper p="xl" radius="md" shadow="sm" withBorder style={{ border: '1px solid #e9ecef', maxWidth: 800 }}>
          <Group align="flex-start" mb="xl">
            <Avatar size="xl" radius="md" color="indigo">{item.name.charAt(0)}</Avatar>
            <Stack gap="xs" style={{ flex: 1 }}>
              <Group justify="space-between">
                <Title order={3}>{item.name}</Title>
                <Badge color={getStatusColor(item.status)} variant="light" size="lg">
                  {item.status}
                </Badge>
              </Group>
              <Text c="dimmed" size="sm">ID: {item.id}</Text>
              <Group gap="sm" mt={4}>
                <Badge color={getTypeColor(item.residentType)} variant="dot">{item.residentType}</Badge>
                <Badge color="gray" variant="outline" leftSection={<IconHome size={12} />}>{item.unit}</Badge>
              </Group>
            </Stack>
          </Group>

          <Divider my="lg" />

          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="xl">
            <Box>
              <Group gap="sm" mb={4}>
                <ThemeIcon variant="light" color="blue" size="sm"><IconPhone size={14} /></ThemeIcon>
                <Text size="xs" fw={700} c="dimmed" tt="uppercase" lts={1}>Contact Phone</Text>
              </Group>
              <Text size="md" fw={500} ml={34}>{item.phone}</Text>
            </Box>

            <Box>
              <Group gap="sm" mb={4}>
                <ThemeIcon variant="light" color="cyan" size="sm"><IconCalendarEvent size={14} /></ThemeIcon>
                <Text size="xs" fw={700} c="dimmed" tt="uppercase" lts={1}>Move In Date</Text>
              </Group>
              <Text size="md" fw={500} ml={34}>{item.moveInDate}</Text>
            </Box>

            <Box>
              <Group gap="sm" mb={4}>
                <ThemeIcon variant="light" color="indigo" size="sm"><IconUser size={14} /></ThemeIcon>
                <Text size="xs" fw={700} c="dimmed" tt="uppercase" lts={1}>Resident Type</Text>
              </Group>
              <Text size="md" fw={500} ml={34}>{item.residentType}</Text>
            </Box>

            <Box>
              <Group gap="sm" mb={4}>
                <ThemeIcon variant="light" color="grape" size="sm"><IconHome size={14} /></ThemeIcon>
                <Text size="xs" fw={700} c="dimmed" tt="uppercase" lts={1}>Assigned Unit</Text>
              </Group>
              <Text size="md" fw={500} ml={34}>{item.unit}</Text>
            </Box>
          </SimpleGrid>

          <Divider my="lg" />

          <Group justify="flex-end">
            <Button variant="light" color="blue">Edit Resident</Button>
            <Button variant="light" color="red">Remove Resident</Button>
          </Group>
        </Paper>
      ) : (
        <Paper p="xl" radius="md" shadow="sm" withBorder style={{ border: '1px solid #e9ecef', maxWidth: 800 }}>
          <Text c="dimmed" ta="center" py="xl">Resident record not found.</Text>
        </Paper>
      )}
    </Stack>
  );
}
