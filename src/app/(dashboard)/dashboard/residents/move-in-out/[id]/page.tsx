"use client";

import { Title, Text, Stack, Paper, Group, ThemeIcon, Button, Divider, SimpleGrid, Badge, Box } from "@mantine/core";
import { IconChevronLeft, IconUserPlus, IconUser, IconHome, IconCalendarEvent, IconActivity } from "@tabler/icons-react";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";
import { useParams } from "next/navigation";

const mockData = [
  { id: "REQ-001", type: "Move In", residentName: "U Tun Tun", unit: "A-101", date: "2024-05-01", status: "Approved" },
  { id: "REQ-002", type: "Move Out", residentName: "Daw Mya Mya", unit: "B-205", date: "2024-04-15", status: "Pending" },
  { id: "REQ-003", type: "Move In", residentName: "U Hlaing Bwar", unit: "C-304", date: "2024-06-01", status: "Approved" },
  { id: "REQ-004", type: "Move Out", residentName: "Daw Thandar", unit: "A-502", date: "2024-03-20", status: "Completed" },
  { id: "REQ-005", type: "Move In", residentName: "U Nyan Lin", unit: "D-102", date: "2024-05-10", status: "Rejected" },
];

export default function MoveInOutDetailPage() {
  const { lang, mounted } = useTranslation();
  const params = useParams();
  const id = params.id as string;

  const item = mockData.find((d) => d.id === id);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved': return 'blue';
      case 'completed': return 'green';
      case 'rejected': return 'red';
      case 'pending': return 'yellow';
      default: return 'gray';
    }
  };

  const getTypeColor = (type: string) => {
    return type === 'Move In' ? 'green' : 'orange';
  };

  if (!mounted) return null;

  return (
    <Stack gap="xl" p="md">
      <Group justify="space-between">
        <Stack gap={4}>
          <Title order={2} c="#014F86">Move In / Move Out Request</Title>
          <Text c="dimmed" size="sm">Request details for {id}</Text>
        </Stack>
        <Button 
          component={Link} 
          href="/dashboard/residents/move-in-out" 
          variant="subtle" 
          leftSection={<IconChevronLeft size={16} />}
          color="gray"
        >
          Back to List
        </Button>
      </Group>

      {item ? (
        <Paper p="xl" radius="md" shadow="sm" withBorder style={{ border: '1px solid #e9ecef', maxWidth: 800 }}>
          <Group align="center" justify="space-between" mb="xl">
            <Group>
              <ThemeIcon size="xl" radius="md" color={getTypeColor(item.type)} variant="light">
                <IconUserPlus size={24} />
              </ThemeIcon>
              <Stack gap={0}>
                <Title order={3}>{item.type} Request</Title>
                <Text c="dimmed" size="sm">ID: {item.id}</Text>
              </Stack>
            </Group>
            <Badge color={getStatusColor(item.status)} variant="filled" size="lg">
              {item.status}
            </Badge>
          </Group>

          <Divider my="lg" />

          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="xl">
            <Box>
              <Group gap="sm" mb={4}>
                <ThemeIcon variant="light" color="indigo" size="sm"><IconUser size={14} /></ThemeIcon>
                <Text size="xs" fw={700} c="dimmed" tt="uppercase" lts={1}>Resident Name</Text>
              </Group>
              <Text size="md" fw={500} ml={34}>{item.residentName}</Text>
            </Box>

            <Box>
              <Group gap="sm" mb={4}>
                <ThemeIcon variant="light" color="grape" size="sm"><IconHome size={14} /></ThemeIcon>
                <Text size="xs" fw={700} c="dimmed" tt="uppercase" lts={1}>Unit</Text>
              </Group>
              <Text size="md" fw={500} ml={34}>{item.unit}</Text>
            </Box>

            <Box>
              <Group gap="sm" mb={4}>
                <ThemeIcon variant="light" color="teal" size="sm"><IconCalendarEvent size={14} /></ThemeIcon>
                <Text size="xs" fw={700} c="dimmed" tt="uppercase" lts={1}>Date</Text>
              </Group>
              <Text size="md" fw={500} ml={34}>{item.date}</Text>
            </Box>

            <Box>
              <Group gap="sm" mb={4}>
                <ThemeIcon variant="light" color="cyan" size="sm"><IconActivity size={14} /></ThemeIcon>
                <Text size="xs" fw={700} c="dimmed" tt="uppercase" lts={1}>Current Status</Text>
              </Group>
              <Text size="md" fw={500} ml={34}>{item.status}</Text>
            </Box>
          </SimpleGrid>

          <Divider my="lg" />

          <Group justify="flex-end">
            {item.status === 'Pending' && (
              <>
                <Button variant="outline" color="red">Reject</Button>
                <Button variant="filled" color="blue">Approve</Button>
              </>
            )}
            {item.status === 'Approved' && (
              <Button variant="filled" color="green">Mark as Completed</Button>
            )}
          </Group>
        </Paper>
      ) : (
        <Paper p="xl" radius="md" shadow="sm" withBorder style={{ border: '1px solid #e9ecef', maxWidth: 800 }}>
          <Text c="dimmed" ta="center" py="xl">Request record not found.</Text>
        </Paper>
      )}
    </Stack>
  );
}
