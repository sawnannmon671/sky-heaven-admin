"use client";

import { useParams } from "next/navigation";
import { 
  Title, Text, Stack, Paper, Group, Badge, Button, 
  Grid, Divider, Box, ThemeIcon, ActionIcon 
} from "@mantine/core";
import { 
  IconChevronLeft, IconPrinter, IconDownload, 
  IconHome, IconBuildingSkyscraper, IconUser, 
  IconFileDescription, IconLayoutBoardSplit
} from "@tabler/icons-react";
import Link from "next/link";

const elements = [
  { id: "101", floor: 1, type: "Studio", status: "Occupied", resident: "John Doe", area: "450 sq ft", moveInDate: "2023-01-15" },
  { id: "102", floor: 1, type: "1 Bedroom", status: "Available", resident: "-", area: "650 sq ft", moveInDate: "-" },
  { id: "201", floor: 2, type: "2 Bedroom", status: "Occupied", resident: "Jane Smith", area: "900 sq ft", moveInDate: "2022-11-01" },
  { id: "305", floor: 3, type: "Penthouse", status: "Maintenance", resident: "-", area: "1200 sq ft", moveInDate: "-" },
];

export default function UnitDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const item = elements.find((d: any) => String(d.id) === String(id)) || elements[0];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'occupied': return 'teal';
      case 'available': return 'green';
      case 'maintenance': return 'orange';
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
              href="/dashboard/units" 
              variant="subtle" 
              color="gray"
              radius="xl"
            >
              <IconChevronLeft size={20} />
            </ActionIcon>
            <Title order={2} style={{ color: '#2C2E33', fontWeight: 700 }}>
              Unit Details
            </Title>
          </Group>
          <Text c="dimmed" size="sm" ml={40}>
            Information and residency status for Unit {item.id}
          </Text>
        </Stack>
        
        <Group gap="sm">
          <Button variant="default" leftSection={<IconPrinter size={16} />}>Print</Button>
          <Button variant="filled" color="teal" leftSection={<IconDownload size={16} />}>Download Report</Button>
        </Group>
      </Group>

      {/* Main Content */}
      <Grid gutter="xl">
        {/* Left Column: Status */}
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Stack gap="md">
            <Paper p="xl" radius="lg" withBorder style={{ border: '1px solid #E9ECEF', backgroundColor: '#F8F9FA' }}>
              <Stack align="center" gap="lg">
                <Box p="xl" bg="white" style={{ borderRadius: 16, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                  <IconHome size={80} color="var(--mantine-color-teal-6)" />
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
                  <Text fw={700} size="xl" mt="xs" style={{ color: '#2C2E33' }}>Unit {item.id}</Text>
                  <Text c="dimmed" size="sm">{item.type}</Text>
                </Stack>
              </Stack>
            </Paper>

            <Paper p="md" radius="lg" withBorder style={{ border: '1px solid #E9ECEF' }}>
              <Stack gap="sm">
                <Text fw={600} size="sm" c="dimmed" tt="uppercase">Quick Actions</Text>
                <Button variant="light" color="teal" fullWidth>Edit Unit Info</Button>
                {item.status === 'Available' ? (
                  <Button variant="light" color="blue" fullWidth>Assign Resident</Button>
                ) : (
                  <Button variant="light" color="orange" fullWidth>Request Maintenance</Button>
                )}
                <Button variant="light" color="gray" fullWidth>View Billing History</Button>
              </Stack>
            </Paper>
          </Stack>
        </Grid.Col>

        {/* Right Column: Details */}
        <Grid.Col span={{ base: 12, md: 8 }}>
          <Stack gap="xl">
            {/* Stats Info Card */}
            <Paper p="xl" radius="lg" withBorder style={{ border: '1px solid #E9ECEF', backgroundColor: '#FFFFFF' }}>
              <Group gap="sm" mb="xl">
                <ThemeIcon variant="light" color="teal" size="lg" radius="md">
                  <IconBuildingSkyscraper size={20} />
                </ThemeIcon>
                <Title order={3} style={{ color: '#2C2E33', fontSize: '1.25rem' }}>Unit Specifications</Title>
              </Group>

              <Grid gutter="xl">
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <Stack gap={4}>
                    <Text c="dimmed" size="xs" fw={600} tt="uppercase">Floor Number</Text>
                    <Group gap="xs">
                      <IconLayoutBoardSplit size={14} color="gray" />
                      <Text fw={500} size="md" style={{ color: '#2C2E33' }}>Floor {item.floor}</Text>
                    </Group>
                  </Stack>
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <Stack gap={4}>
                    <Text c="dimmed" size="xs" fw={600} tt="uppercase">Unit Type</Text>
                    <Text fw={500} size="md" style={{ color: '#2C2E33' }}>{item.type}</Text>
                  </Stack>
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <Stack gap={4}>
                    <Text c="dimmed" size="xs" fw={600} tt="uppercase">Floor Area</Text>
                    <Text fw={500} size="md" style={{ color: '#2C2E33' }}>{item.area}</Text>
                  </Stack>
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <Stack gap={4}>
                    <Text c="dimmed" size="xs" fw={600} tt="uppercase">Resident / Tenant</Text>
                    <Group gap="xs">
                      <IconUser size={14} color="gray" />
                      <Text fw={500} size="md" style={{ color: '#2C2E33' }}>{item.resident}</Text>
                    </Group>
                  </Stack>
                </Grid.Col>
              </Grid>
            </Paper>

            {/* Additional Info */}
            <Paper p="xl" radius="lg" withBorder style={{ border: '1px solid #E9ECEF', backgroundColor: '#FFFFFF' }}>
              <Group gap="sm" mb="md">
                <ThemeIcon variant="light" color="gray" size="lg" radius="md">
                  <IconFileDescription size={20} />
                </ThemeIcon>
                <Title order={3} style={{ color: '#2C2E33', fontSize: '1.25rem' }}>Description & Notes</Title>
              </Group>
              <Text size="sm" style={{ color: '#495057' }}>
                This unit features an open-concept living area, modern kitchen appliances, and large windows with ample natural light. Utilities are metered separately.
              </Text>
              
              <Divider my="md" color="gray.2" />
              
              <Group justify="space-between">
                <Text size="xs" c="dimmed">Move-in date: {item.moveInDate}</Text>
              </Group>
            </Paper>

          </Stack>
        </Grid.Col>
      </Grid>
    </Stack>
  );
}