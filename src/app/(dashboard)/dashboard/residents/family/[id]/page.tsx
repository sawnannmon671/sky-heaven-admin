"use client";

import { Title, Text, Stack, Paper, Group, ThemeIcon, Button, Divider, SimpleGrid, Badge, Box, Avatar } from "@mantine/core";
import { IconChevronLeft, IconUsers, IconUser, IconHome, IconCalendarEvent, IconId } from "@tabler/icons-react";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";
import { useParams } from "next/navigation";

const mockData = [
  { id: "FAM-001", name: "Mg Aung Myint", relation: "Son", primaryResident: "U Aung Aung", unit: "A-101", age: 18, status: "Active" },
  { id: "FAM-002", name: "Ma Su Mon", relation: "Daughter", primaryResident: "Daw Su Su", unit: "B-205", age: 22, status: "Active" },
  { id: "FAM-003", name: "Daw Mya Sein", relation: "Mother", primaryResident: "U Kyaw Min", unit: "C-304", age: 65, status: "Active" },
  { id: "FAM-004", name: "Mg Thura", relation: "Son", primaryResident: "Daw Hla Hla", unit: "A-502", age: 15, status: "Active" },
  { id: "FAM-005", name: "Ma Khin Myo", relation: "Spouse", primaryResident: "U Zaw Myo", unit: "D-102", age: 35, status: "Active" },
];

export default function FamilyMemberDetailPage() {
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

  if (!mounted) return null;

  return (
    <Stack gap="xl" p="md">
      <Group justify="space-between">
        <Stack gap={4}>
          <Group gap="xs">
            <ThemeIcon variant="light" color="cyan" size="lg" radius="md">
              <IconUsers size={20} />
            </ThemeIcon>
            <Title order={2} c="#014F86">Family Member Details</Title>
          </Group>
          <Text c="dimmed" size="sm">Detailed information for {item?.name || id}</Text>
        </Stack>
        <Button 
          component={Link} 
          href="/dashboard/residents/family" 
          variant="subtle" 
          leftSection={<IconChevronLeft size={16} />}
          color="gray"
        >
          Back to Family Members
        </Button>
      </Group>

      {item ? (
        <Paper p="xl" radius="md" shadow="sm" withBorder style={{ border: '1px solid #e9ecef', maxWidth: 800 }}>
          <Group align="flex-start" mb="xl">
            <Avatar size="xl" radius="md" color="cyan">{item.name.charAt(0)}</Avatar>
            <Stack gap="xs" style={{ flex: 1 }}>
              <Group justify="space-between">
                <Title order={3}>{item.name}</Title>
                <Badge color={getStatusColor(item.status)} variant="light" size="lg">
                  {item.status}
                </Badge>
              </Group>
              <Text c="dimmed" size="sm">ID: {item.id}</Text>
              <Group gap="sm" mt={4}>
                <Badge color="cyan" variant="dot">{item.relation}</Badge>
                <Badge color="gray" variant="outline" leftSection={<IconHome size={12} />}>{item.unit}</Badge>
              </Group>
            </Stack>
          </Group>

          <Divider my="lg" />

          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="xl">
            <Box>
              <Group gap="sm" mb={4}>
                <ThemeIcon variant="light" color="indigo" size="sm"><IconUser size={14} /></ThemeIcon>
                <Text size="xs" fw={700} c="dimmed" tt="uppercase" lts={1}>Primary Resident</Text>
              </Group>
              <Text size="md" fw={500} ml={34}>{item.primaryResident}</Text>
            </Box>

            <Box>
              <Group gap="sm" mb={4}>
                <ThemeIcon variant="light" color="grape" size="sm"><IconHome size={14} /></ThemeIcon>
                <Text size="xs" fw={700} c="dimmed" tt="uppercase" lts={1}>Assigned Unit</Text>
              </Group>
              <Text size="md" fw={500} ml={34}>{item.unit}</Text>
            </Box>

            <Box>
              <Group gap="sm" mb={4}>
                <ThemeIcon variant="light" color="cyan" size="sm"><IconId size={14} /></ThemeIcon>
                <Text size="xs" fw={700} c="dimmed" tt="uppercase" lts={1}>Relation</Text>
              </Group>
              <Text size="md" fw={500} ml={34}>{item.relation}</Text>
            </Box>

            <Box>
              <Group gap="sm" mb={4}>
                <ThemeIcon variant="light" color="teal" size="sm"><IconCalendarEvent size={14} /></ThemeIcon>
                <Text size="xs" fw={700} c="dimmed" tt="uppercase" lts={1}>Age</Text>
              </Group>
              <Text size="md" fw={500} ml={34}>{item.age} years old</Text>
            </Box>
          </SimpleGrid>

          <Divider my="lg" />

          <Group justify="flex-end">
            <Button variant="light" color="blue">Edit Member</Button>
            <Button variant="light" color="red">Remove Member</Button>
          </Group>
        </Paper>
      ) : (
        <Paper p="xl" radius="md" shadow="sm" withBorder style={{ border: '1px solid #e9ecef', maxWidth: 800 }}>
          <Text c="dimmed" ta="center" py="xl">Family member record not found.</Text>
        </Paper>
      )}
    </Stack>
  );
}
