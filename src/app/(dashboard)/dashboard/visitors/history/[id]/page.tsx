"use client";

import { useParams } from "next/navigation";
import { 
  Title, Text, Stack, Paper, Group, Badge, Button, 
  Grid, Divider, Box, ThemeIcon, ActionIcon 
} from "@mantine/core";
import { 
  IconChevronLeft, IconPrinter, IconDownload, 
  IconDoorEnter, IconUser, IconBuildingSkyscraper,
  IconClock, IconIdBadge
} from "@tabler/icons-react";
import Link from "next/link";

export default function VisitorHistoryDetailPage() {
  const params = useParams();
  const id = params.id as string;

  // Mock data based on ID
  const item = {
    id: id || "VE-001",
    visitor: "U Kyaw Swar",
    hostUnit: "A-101",
    purpose: "Personal",
    entryTime: "2024-10-26 09:00 AM",
    exitTime: id === "VE-002" || id === "VE-004" ? "-" : "2024-10-26 11:30 AM",
    status: id === "VE-002" || id === "VE-004" ? "Inside" : "Checked Out",
    duration: id === "VE-002" || id === "VE-004" ? "Ongoing" : "2h 30m",
    idType: "NRC",
    idNumber: "12/LMN(N)123456",
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'inside': return 'blue';
      case 'checked out': return 'gray';
      default: return 'gray';
    }
  };

  return (
    <Stack gap="xl" p="md" style={{ maxWidth: 1000, margin: '0 auto' }}>
      {/* Header */}
      <Group justify="space-between" align="flex-start">
        <Stack gap={8}>
          <Group gap="sm">
            <ActionIcon 
              component={Link} 
              href="/dashboard/visitors/history" 
              variant="subtle" 
              color="gray"
              radius="xl"
            >
              <IconChevronLeft size={20} />
            </ActionIcon>
            <Title order={2} c="#014F86" style={{ color: '#2C2E33', fontWeight: 700 }}>
              Visitor History Details
            </Title>
          </Group>
          <Text c="dimmed" size="sm" ml={40}>
            Detailed entry log for {item.id}
          </Text>
        </Stack>
        
        <Group gap="sm">
          <Button variant="default" leftSection={<IconPrinter size={16} />}>Print Record</Button>
          <Button variant="filled" color="blue" leftSection={<IconDownload size={16} />}>Export PDF</Button>
        </Group>
      </Group>

      {/* Main Content */}
      <Grid gutter="xl">
        {/* Left Column: Status */}
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Stack gap="md">
            <Paper p="xl" radius="md" withBorder style={{ border: '1px solid #E9ECEF', backgroundColor: '#F8F9FA' }}>
              <Stack align="center" gap="lg">
                <Box p="xl" bg="white" style={{ borderRadius: 16, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                  <IconDoorEnter size={80} color="var(--mantine-color-blue-6)" />
                </Box>
                
                <Stack gap={4} align="center">
                  <Badge 
                    size="lg" 
                    variant="filled" 
                    color={getStatusColor(item.status)}
                    style={{ padding: '0 16px', height: 28, textTransform: 'uppercase', letterSpacing: 1 }}
                  >
                    {item.status}
                  </Badge>
                  <Text fw={700} size="xl" mt="xs" style={{ color: '#2C2E33' }}>{item.id}</Text>
                  <Text c="dimmed" size="sm">Duration: {item.duration}</Text>
                </Stack>
              </Stack>
            </Paper>

            <Paper p="md" radius="md" withBorder style={{ border: '1px solid #E9ECEF' }}>
              <Stack gap="sm">
                <Text fw={600} size="sm" c="dimmed" tt="uppercase">Quick Actions</Text>
                {item.status === 'Inside' && (
                  <Button variant="light" color="blue" fullWidth>Force Checkout</Button>
                )}
                <Button variant="light" color="gray" fullWidth>View ID Document</Button>
              </Stack>
            </Paper>
          </Stack>
        </Grid.Col>

        {/* Right Column: Details */}
        <Grid.Col span={{ base: 12, md: 8 }}>
          <Stack gap="xl">
            {/* Log Info Card */}
            <Paper p="xl" radius="md" withBorder style={{ border: '1px solid #E9ECEF', backgroundColor: '#FFFFFF' }}>
              <Title order={3} mb="xl" style={{ color: '#2C2E33', fontSize: '1.25rem' }}>Visitor Information</Title>

              <Grid gutter="xl">
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <Stack gap={4}>
                    <Text c="dimmed" size="xs" fw={600} tt="uppercase">Visitor Name</Text>
                    <Text fw={500} size="md" style={{ color: '#2C2E33' }}>{item.visitor}</Text>
                  </Stack>
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <Stack gap={4}>
                    <Text c="dimmed" size="xs" fw={600} tt="uppercase">Purpose of Visit</Text>
                    <Text fw={500} size="md" style={{ color: '#2C2E33' }}>{item.purpose}</Text>
                  </Stack>
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <Stack gap={4}>
                    <Text c="dimmed" size="xs" fw={600} tt="uppercase">ID Type</Text>
                    <Group gap="xs">
                      <IconIdBadge size={14} color="gray" />
                      <Text fw={500} size="md" style={{ color: '#2C2E33' }}>{item.idType}</Text>
                    </Group>
                  </Stack>
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <Stack gap={4}>
                    <Text c="dimmed" size="xs" fw={600} tt="uppercase">ID Number</Text>
                    <Text fw={500} size="md" style={{ color: '#2C2E33' }}>{item.idNumber}</Text>
                  </Stack>
                </Grid.Col>
              </Grid>
            </Paper>

            {/* Visit Details Card */}
            <Paper p="xl" radius="md" withBorder style={{ border: '1px solid #E9ECEF', backgroundColor: '#FFFFFF' }}>
              <Title order={3} mb="xl" style={{ color: '#2C2E33', fontSize: '1.25rem' }}>Visit Details</Title>

              <Grid gutter="xl">
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <Stack gap={4}>
                    <Text c="dimmed" size="xs" fw={600} tt="uppercase">Host Unit</Text>
                    <Text fw={500} size="md" style={{ color: '#2C2E33' }}>Unit {item.hostUnit}</Text>
                  </Stack>
                </Grid.Col>
              </Grid>

              <Divider my="xl" color="gray.2" />

              <Grid gutter="xl">
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <Stack gap={4}>
                    <Text c="dimmed" size="xs" fw={600} tt="uppercase">Entry Time</Text>
                    <Group gap="xs">
                      <IconClock size={14} color="gray" />
                      <Text fw={500} size="md" style={{ color: '#2C2E33' }}>{item.entryTime}</Text>
                    </Group>
                  </Stack>
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <Stack gap={4}>
                    <Text c="dimmed" size="xs" fw={600} tt="uppercase">Exit Time</Text>
                    <Group gap="xs">
                      <IconClock size={14} color="gray" />
                      <Text fw={500} size="md" style={{ color: '#2C2E33' }}>{item.exitTime}</Text>
                    </Group>
                  </Stack>
                </Grid.Col>
              </Grid>
            </Paper>

          </Stack>
        </Grid.Col>
      </Grid>
    </Stack>
  );
}