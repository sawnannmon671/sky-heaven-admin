"use client";

import { useParams } from "next/navigation";
import { 
  Title, Text, Stack, Paper, Group, Badge, Button, 
  Grid, Divider, Box, ThemeIcon, ActionIcon 
} from "@mantine/core";
import { 
  IconChevronLeft, IconPrinter, IconDownload, 
  IconTruck, IconUser, IconCalendar, IconBuildingSkyscraper,
  IconBox, IconPhone, IconClock
} from "@tabler/icons-react";
import Link from "next/link";

export default function DeliveryLogsDetailPage() {
  const params = useParams();
  const id = params.id as string;

  // Mock data based on ID
  const item = {
    id: id || "DL-001",
    company: "FoodPanda",
    driverName: "Aung Aung",
    phone: "+95 9 123 456 789",
    unit: "A-101",
    recipientName: "Daw Mya",
    item: "Food",
    arrival: "2024-10-26 12:30 PM",
    departure: "2024-10-26 12:45 PM",
    status: id === "DL-005" ? "Pending" : id === "DL-002" ? "Arrived" : "Delivered",
    gate: "Main Gate",
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered': return 'green';
      case 'arrived': return 'blue';
      case 'pending': return 'orange';
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
              href="/dashboard/visitors/delivery" 
              variant="subtle" 
              color="gray"
              radius="xl"
            >
              <IconChevronLeft size={20} />
            </ActionIcon>
            <Title order={2} style={{ color: '#2C2E33', fontWeight: 700 }}>
              Delivery Details
            </Title>
          </Group>
          <Text c="dimmed" size="sm" ml={40}>
            Detailed information for delivery {item.id}
          </Text>
        </Stack>
        
        <Group gap="sm">
          <Button variant="default" leftSection={<IconPrinter size={16} />}>Print Log</Button>
          <Button variant="filled" color="orange" leftSection={<IconDownload size={16} />}>Download PDF</Button>
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
                  <IconTruck size={80} color="var(--mantine-color-orange-6)" />
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
                  <Text c="dimmed" size="sm">{item.company}</Text>
                </Stack>
              </Stack>
            </Paper>

            <Paper p="md" radius="md" withBorder style={{ border: '1px solid #E9ECEF' }}>
              <Stack gap="sm">
                <Text fw={600} size="sm" c="dimmed" tt="uppercase">Quick Actions</Text>
                {item.status === 'Pending' && (
                  <Button variant="light" color="blue" fullWidth>Mark Arrived</Button>
                )}
                {item.status === 'Arrived' && (
                  <Button variant="light" color="green" fullWidth>Mark Delivered</Button>
                )}
                <Button variant="light" color="orange" fullWidth>Edit Details</Button>
              </Stack>
            </Paper>
          </Stack>
        </Grid.Col>

        {/* Right Column: Details */}
        <Grid.Col span={{ base: 12, md: 8 }}>
          <Stack gap="xl">
            {/* Delivery Info Card */}
            <Paper p="xl" radius="md" withBorder style={{ border: '1px solid #E9ECEF', backgroundColor: '#FFFFFF' }}>
              <Group gap="sm" mb="xl">
                <ThemeIcon variant="light" color="orange" size="lg" radius="md">
                  <IconBox size={20} />
                </ThemeIcon>
                <Title order={3} style={{ color: '#2C2E33', fontSize: '1.25rem' }}>Delivery Information</Title>
              </Group>

              <Grid gutter="xl">
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <Stack gap={4}>
                    <Text c="dimmed" size="xs" fw={600} tt="uppercase">Delivery Company</Text>
                    <Text fw={500} size="md" style={{ color: '#2C2E33' }}>{item.company}</Text>
                  </Stack>
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <Stack gap={4}>
                    <Text c="dimmed" size="xs" fw={600} tt="uppercase">Item Type</Text>
                    <Text fw={500} size="md" style={{ color: '#2C2E33' }}>{item.item}</Text>
                  </Stack>
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <Stack gap={4}>
                    <Text c="dimmed" size="xs" fw={600} tt="uppercase">Driver Name</Text>
                    <Group gap="xs">
                      <IconUser size={14} color="gray" />
                      <Text fw={500} size="md" style={{ color: '#2C2E33' }}>{item.driverName}</Text>
                    </Group>
                  </Stack>
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <Stack gap={4}>
                    <Text c="dimmed" size="xs" fw={600} tt="uppercase">Driver Contact</Text>
                    <Group gap="xs">
                      <IconPhone size={14} color="gray" />
                      <Text fw={500} size="md" style={{ color: '#2C2E33' }}>{item.phone}</Text>
                    </Group>
                  </Stack>
                </Grid.Col>
              </Grid>
            </Paper>

            {/* Recipient & Timings Card */}
            <Paper p="xl" radius="md" withBorder style={{ border: '1px solid #E9ECEF', backgroundColor: '#FFFFFF' }}>
              <Group gap="sm" mb="xl">
                <ThemeIcon variant="light" color="teal" size="lg" radius="md">
                  <IconBuildingSkyscraper size={20} />
                </ThemeIcon>
                <Title order={3} style={{ color: '#2C2E33', fontSize: '1.25rem' }}>Recipient & Timings</Title>
              </Group>

              <Grid gutter="xl">
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <Stack gap={4}>
                    <Text c="dimmed" size="xs" fw={600} tt="uppercase">Recipient Unit</Text>
                    <Text fw={500} size="md" style={{ color: '#2C2E33' }}>Unit {item.unit}</Text>
                  </Stack>
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <Stack gap={4}>
                    <Text c="dimmed" size="xs" fw={600} tt="uppercase">Recipient Name</Text>
                    <Text fw={500} size="md" style={{ color: '#2C2E33' }}>{item.recipientName}</Text>
                  </Stack>
                </Grid.Col>
              </Grid>

              <Divider my="xl" color="gray.2" />

              <Grid gutter="xl">
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <Stack gap={4}>
                    <Text c="dimmed" size="xs" fw={600} tt="uppercase">Arrival Time</Text>
                    <Group gap="xs">
                      <IconClock size={14} color="gray" />
                      <Text fw={500} size="md" style={{ color: '#2C2E33' }}>{item.arrival}</Text>
                    </Group>
                  </Stack>
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <Stack gap={4}>
                    <Text c="dimmed" size="xs" fw={600} tt="uppercase">Departure Time</Text>
                    <Group gap="xs">
                      <IconClock size={14} color="gray" />
                      <Text fw={500} size="md" style={{ color: '#2C2E33' }}>{item.status === 'Delivered' ? item.departure : '-'}</Text>
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