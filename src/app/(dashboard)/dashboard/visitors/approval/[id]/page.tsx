"use client";

import { useParams } from "next/navigation";
import { 
  Title, Text, Stack, Paper, Group, Badge, Button, 
  Grid, Divider, Box, ThemeIcon, ActionIcon 
} from "@mantine/core";
import { 
  IconChevronLeft, IconPrinter, IconDownload, 
  IconShieldCheck, IconUser, IconBuildingSkyscraper,
  IconClock, IconDoorEnter, IconFileDescription
} from "@tabler/icons-react";
import Link from "next/link";

export default function VisitorApprovalDetailPage() {
  const params = useParams();
  const id = params.id as string;

  // Mock data based on ID
  const item = {
    id: id || "SA-001",
    visitor: "U Kyaw Swar",
    hostUnit: "A-101",
    hostName: "Daw Mya",
    gate: "Main Gate",
    purpose: "Family Visit",
    requestedAt: "2024-10-26 09:00 AM",
    status: id === "SA-004" ? "Rejected" : id === "SA-003" ? "Pending" : "Approved",
    notes: "Visitor mentioned they are here for a birthday party.",
    securityOfficer: "Ko Htun",
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved': return 'green';
      case 'rejected': return 'red';
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
              href="/dashboard/visitors/approval" 
              variant="subtle" 
              color="gray"
              radius="xl"
            >
              <IconChevronLeft size={20} />
            </ActionIcon>
            <Title order={2} style={{ color: '#2C2E33', fontWeight: 700 }}>
              Approval Details
            </Title>
          </Group>
          <Text c="dimmed" size="sm" ml={40}>
            Review access request {item.id}
          </Text>
        </Stack>
        
        <Group gap="sm">
          <Button variant="default" leftSection={<IconPrinter size={16} />}>Print</Button>
          <Button variant="filled" color="teal" leftSection={<IconDownload size={16} />}>Download PDF</Button>
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
                  <IconShieldCheck size={80} color="var(--mantine-color-teal-6)" />
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
                  <Text c="dimmed" size="sm">Gate: {item.gate}</Text>
                </Stack>
              </Stack>
            </Paper>

            <Paper p="md" radius="md" withBorder style={{ border: '1px solid #E9ECEF' }}>
              <Stack gap="sm">
                <Text fw={600} size="sm" c="dimmed" tt="uppercase">Quick Actions</Text>
                {item.status === 'Pending' && (
                  <>
                    <Button variant="light" color="green" fullWidth>Approve Request</Button>
                    <Button variant="light" color="red" fullWidth>Reject Request</Button>
                  </>
                )}
                {item.status !== 'Pending' && (
                  <Button variant="light" color="teal" fullWidth>Update Status</Button>
                )}
              </Stack>
            </Paper>
          </Stack>
        </Grid.Col>

        {/* Right Column: Details */}
        <Grid.Col span={{ base: 12, md: 8 }}>
          <Stack gap="xl">
            {/* Request Info Card */}
            <Paper p="xl" radius="md" withBorder style={{ border: '1px solid #E9ECEF', backgroundColor: '#FFFFFF' }}>
              <Group gap="sm" mb="xl">
                <ThemeIcon variant="light" color="teal" size="lg" radius="md">
                  <IconUser size={20} />
                </ThemeIcon>
                <Title order={3} style={{ color: '#2C2E33', fontSize: '1.25rem' }}>Request Information</Title>
              </Group>

              <Grid gutter="xl">
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <Stack gap={4}>
                    <Text c="dimmed" size="xs" fw={600} tt="uppercase">Visitor Name</Text>
                    <Text fw={500} size="md" style={{ color: '#2C2E33' }}>{item.visitor}</Text>
                  </Stack>
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <Stack gap={4}>
                    <Text c="dimmed" size="xs" fw={600} tt="uppercase">Purpose</Text>
                    <Text fw={500} size="md" style={{ color: '#2C2E33' }}>{item.purpose}</Text>
                  </Stack>
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <Stack gap={4}>
                    <Text c="dimmed" size="xs" fw={600} tt="uppercase">Entry Gate</Text>
                    <Group gap="xs">
                      <IconDoorEnter size={14} color="gray" />
                      <Text fw={500} size="md" style={{ color: '#2C2E33' }}>{item.gate}</Text>
                    </Group>
                  </Stack>
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <Stack gap={4}>
                    <Text c="dimmed" size="xs" fw={600} tt="uppercase">Requested At</Text>
                    <Group gap="xs">
                      <IconClock size={14} color="gray" />
                      <Text fw={500} size="md" style={{ color: '#2C2E33' }}>{item.requestedAt}</Text>
                    </Group>
                  </Stack>
                </Grid.Col>
              </Grid>
            </Paper>

            {/* Host Details Card */}
            <Paper p="xl" radius="md" withBorder style={{ border: '1px solid #E9ECEF', backgroundColor: '#FFFFFF' }}>
              <Group gap="sm" mb="xl">
                <ThemeIcon variant="light" color="indigo" size="lg" radius="md">
                  <IconBuildingSkyscraper size={20} />
                </ThemeIcon>
                <Title order={3} style={{ color: '#2C2E33', fontSize: '1.25rem' }}>Host Details</Title>
              </Group>

              <Grid gutter="xl">
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <Stack gap={4}>
                    <Text c="dimmed" size="xs" fw={600} tt="uppercase">Host Unit</Text>
                    <Text fw={500} size="md" style={{ color: '#2C2E33' }}>Unit {item.hostUnit}</Text>
                  </Stack>
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <Stack gap={4}>
                    <Text c="dimmed" size="xs" fw={600} tt="uppercase">Host Name</Text>
                    <Text fw={500} size="md" style={{ color: '#2C2E33' }}>{item.hostName}</Text>
                  </Stack>
                </Grid.Col>
              </Grid>
            </Paper>

            {/* Additional Notes */}
            <Paper p="xl" radius="md" withBorder style={{ border: '1px solid #E9ECEF', backgroundColor: '#FFFFFF' }}>
              <Group gap="sm" mb="md">
                <ThemeIcon variant="light" color="gray" size="lg" radius="md">
                  <IconFileDescription size={20} />
                </ThemeIcon>
                <Title order={3} style={{ color: '#2C2E33', fontSize: '1.25rem' }}>Additional Notes</Title>
              </Group>
              <Text size="sm" style={{ color: '#495057' }}>{item.notes}</Text>

              <Divider my="md" color="gray.2" />
              
              <Group justify="space-between">
                <Text size="xs" c="dimmed">Security Officer on Duty: {item.securityOfficer}</Text>
              </Group>
            </Paper>

          </Stack>
        </Grid.Col>
      </Grid>
    </Stack>
  );
}