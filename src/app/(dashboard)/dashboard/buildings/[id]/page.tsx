"use client";

import { useParams } from "next/navigation";
import { 
  Title, Text, Stack, Paper, Group, Badge, Button, 
  Grid, Divider, Box, ThemeIcon, ActionIcon 
} from "@mantine/core";
import { 
  IconChevronLeft, IconPrinter, IconDownload, 
  IconBuildingSkyscraper, IconLayoutBoardSplit, 
  IconHome, IconFileDescription
} from "@tabler/icons-react";
import Link from "next/link";

const elements = [
  { id: "BLD-001", name: "Tower A", floors: 24, units: 96, status: "Active", constructionYear: "2018", manager: "U Kyaw Swar" },
  { id: "BLD-002", name: "Tower B", floors: 24, units: 96, status: "Active", constructionYear: "2019", manager: "Daw Ni Ni" },
  { id: "BLD-003", name: "Tower C", floors: 12, units: 48, status: "Under Maintenance", constructionYear: "2020", manager: "Ko Htun" },
];

export default function BuildingDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const item = elements.find((d: any) => String(d.id) === String(id)) || elements[0];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'green';
      case 'under maintenance': return 'orange';
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
              href="/dashboard/buildings" 
              variant="subtle" 
              color="gray"
              radius="xl"
            >
              <IconChevronLeft size={20} />
            </ActionIcon>
            <Title order={2} c="#014F86" style={{ color: '#2C2E33', fontWeight: 700 }}>
              Building Details
            </Title>
          </Group>
          <Text c="dimmed" size="sm" ml={40}>
            Overview and statistics for {item.name}
          </Text>
        </Stack>
        
        <Group gap="sm">
          <Button variant="default" leftSection={<IconPrinter size={16} />}>Print</Button>
          <Button variant="filled" color="blue" leftSection={<IconDownload size={16} />}>Download Report</Button>
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
                  <IconBuildingSkyscraper size={80} color="var(--mantine-color-blue-6)" />
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
                  <Text fw={700} size="xl" mt="xs" style={{ color: '#2C2E33' }}>{item.name}</Text>
                  <Text c="dimmed" size="sm">ID: {item.id}</Text>
                </Stack>
              </Stack>
            </Paper>

            <Paper p="md" radius="md" withBorder style={{ border: '1px solid #E9ECEF' }}>
              <Stack gap="sm">
                <Text fw={600} size="sm" c="dimmed" tt="uppercase">Quick Actions</Text>
                <Button variant="light" color="blue" fullWidth>Edit Building Info</Button>
                {item.status === 'Active' ? (
                  <Button variant="light" color="orange" fullWidth>Set Under Maintenance</Button>
                ) : (
                  <Button variant="light" color="green" fullWidth>Mark as Active</Button>
                )}
                <Button variant="light" color="gray" fullWidth>View Floor Plan</Button>
              </Stack>
            </Paper>
          </Stack>
        </Grid.Col>

        {/* Right Column: Details */}
        <Grid.Col span={{ base: 12, md: 8 }}>
          <Stack gap="xl">
            {/* Stats Info Card */}
            <Paper p="xl" radius="md" withBorder style={{ border: '1px solid #E9ECEF', backgroundColor: '#FFFFFF' }}>
              <Title order={3} mb="xl" style={{ color: '#2C2E33', fontSize: '1.25rem' }}>Structure & Capacity</Title>

              <Grid gutter="xl">
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <Stack gap={4}>
                    <Text c="dimmed" size="xs" fw={600} tt="uppercase">Total Floors</Text>
                    <Text fw={500} size="md" style={{ color: '#2C2E33' }}>{item.floors} Floors</Text>
                  </Stack>
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <Stack gap={4}>
                    <Text c="dimmed" size="xs" fw={600} tt="uppercase">Total Units</Text>
                    <Group gap="xs">
                      <IconHome size={14} color="gray" />
                      <Text fw={500} size="md" style={{ color: '#2C2E33' }}>{item.units} Units</Text>
                    </Group>
                  </Stack>
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <Stack gap={4}>
                    <Text c="dimmed" size="xs" fw={600} tt="uppercase">Construction Year</Text>
                    <Text fw={500} size="md" style={{ color: '#2C2E33' }}>{item.constructionYear || 'N/A'}</Text>
                  </Stack>
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <Stack gap={4}>
                    <Text c="dimmed" size="xs" fw={600} tt="uppercase">Building Manager</Text>
                    <Text fw={500} size="md" style={{ color: '#2C2E33' }}>{item.manager || 'N/A'}</Text>
                  </Stack>
                </Grid.Col>
              </Grid>
            </Paper>

            {/* Additional Info */}
            <Paper p="xl" radius="md" withBorder style={{ border: '1px solid #E9ECEF', backgroundColor: '#FFFFFF' }}>
              <Title order={3} mb="md" style={{ color: '#2C2E33', fontSize: '1.25rem' }}>Description & Notes</Title>
              <Text size="sm" style={{ color: '#495057' }}>
                This building is equipped with modern security systems and high-speed elevators. Regular maintenance is scheduled quarterly to ensure optimal functionality of all utilities.
              </Text>
              
              <Divider my="md" color="gray.2" />
              
              <Group justify="space-between">
                <Text size="xs" c="dimmed">Last inspection: 2 weeks ago</Text>
              </Group>
            </Paper>

          </Stack>
        </Grid.Col>
      </Grid>
    </Stack>
  );
}