"use client";

import { useParams } from "next/navigation";
import { 
  Title, Text, Stack, Paper, Group, Badge, Button, 
  Grid, Divider, Box, ThemeIcon, ActionIcon 
} from "@mantine/core";
import { 
  IconChevronLeft, IconPrinter, IconDownload, 
  IconIdBadge, IconUser, IconCalendar, IconBuildingSkyscraper,
  IconShieldCheck, IconPhone, IconCar
} from "@tabler/icons-react";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";

export default function VisitorRegistrationDetailPage() {
  const params = useParams();
  const id = params.id as string;

  // Mock data based on ID
  const item = {
    id: id || "VP-001",
    visitor: "U Kyaw Swar",
    phone: "+95 9 123 456 789",
    vehicleNo: "YGN-1A-1234",
    hostUnit: "A-101",
    hostName: "Daw Mya",
    validFrom: "2024-10-26",
    validTo: "2024-10-28",
    type: "Multiple Entry",
    purpose: "Family Visit",
    status: id === "VP-002" ? "Expired" : id === "VP-003" ? "Pending" : "Active",
    registeredAt: "2024-10-25 14:30",
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'green';
      case 'expired': return 'red';
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
              href="/dashboard/visitors/registration" 
              variant="subtle" 
              color="gray"
              radius="xl"
            >
              <IconChevronLeft size={20} />
            </ActionIcon>
            <Title order={2} style={{ color: '#2C2E33', fontWeight: 700 }}>
              Visitor Registration
            </Title>
          </Group>
          <Text c="dimmed" size="sm" ml={40}>
            Detailed information for pass {item.id}
          </Text>
        </Stack>
        
        <Group gap="sm">
          <Button variant="default" leftSection={<IconPrinter size={16} />}>Print Pass</Button>
          <Button variant="filled" color="indigo" leftSection={<IconDownload size={16} />}>Download PDF</Button>
        </Group>
      </Group>

      {/* Main Content */}
      <Grid gutter="xl">
        {/* Left Column: QR & Status */}
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Stack gap="md">
            <Paper p="xl" radius="lg" withBorder style={{ border: '1px solid #E9ECEF', backgroundColor: '#F8F9FA' }}>
              <Stack align="center" gap="lg">
                <Box p="md" bg="white" style={{ borderRadius: 16, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                  <QRCodeSVG value={JSON.stringify({ id: item.id, visitor: item.visitor, type: item.type, status: item.status })} size={180} />
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
                  <Text c="dimmed" size="sm">{item.type}</Text>
                </Stack>
              </Stack>
            </Paper>

            <Paper p="md" radius="lg" withBorder style={{ border: '1px solid #E9ECEF' }}>
              <Stack gap="sm">
                <Text fw={600} size="sm" c="dimmed" tt="uppercase">Quick Actions</Text>
                {item.status === 'Active' && (
                  <Button variant="light" color="red" fullWidth>Revoke Pass</Button>
                )}
                {item.status === 'Pending' && (
                  <Button variant="light" color="green" fullWidth>Approve Pass</Button>
                )}
                <Button variant="light" color="indigo" fullWidth>Edit Details</Button>
              </Stack>
            </Paper>
          </Stack>
        </Grid.Col>

        {/* Right Column: Details */}
        <Grid.Col span={{ base: 12, md: 8 }}>
          <Stack gap="xl">
            {/* Visitor Info Card */}
            <Paper p="xl" radius="lg" withBorder style={{ border: '1px solid #E9ECEF', backgroundColor: '#FFFFFF' }}>
              <Group gap="sm" mb="xl">
                <ThemeIcon variant="light" color="indigo" size="lg" radius="md">
                  <IconUser size={20} />
                </ThemeIcon>
                <Title order={3} style={{ color: '#2C2E33', fontSize: '1.25rem' }}>Visitor Information</Title>
              </Group>

              <Grid gutter="xl">
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <Stack gap={4}>
                    <Text c="dimmed" size="xs" fw={600} tt="uppercase">Full Name</Text>
                    <Text fw={500} size="md" style={{ color: '#2C2E33' }}>{item.visitor}</Text>
                  </Stack>
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <Stack gap={4}>
                    <Text c="dimmed" size="xs" fw={600} tt="uppercase">Contact Number</Text>
                    <Group gap="xs">
                      <IconPhone size={14} color="gray" />
                      <Text fw={500} size="md" style={{ color: '#2C2E33' }}>{item.phone}</Text>
                    </Group>
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
                    <Text c="dimmed" size="xs" fw={600} tt="uppercase">Vehicle Registration</Text>
                    <Group gap="xs">
                      <IconCar size={14} color="gray" />
                      <Text fw={500} size="md" style={{ color: '#2C2E33' }}>{item.vehicleNo}</Text>
                    </Group>
                  </Stack>
                </Grid.Col>
              </Grid>
            </Paper>

            {/* Host & Validity Card */}
            <Paper p="xl" radius="lg" withBorder style={{ border: '1px solid #E9ECEF', backgroundColor: '#FFFFFF' }}>
              <Group gap="sm" mb="xl">
                <ThemeIcon variant="light" color="teal" size="lg" radius="md">
                  <IconBuildingSkyscraper size={20} />
                </ThemeIcon>
                <Title order={3} style={{ color: '#2C2E33', fontSize: '1.25rem' }}>Host & Validity</Title>
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

              <Divider my="xl" color="gray.2" />

              <Grid gutter="xl">
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <Stack gap={4}>
                    <Text c="dimmed" size="xs" fw={600} tt="uppercase">Valid From</Text>
                    <Group gap="xs">
                      <IconCalendar size={14} color="gray" />
                      <Text fw={500} size="md" style={{ color: '#2C2E33' }}>{item.validFrom}</Text>
                    </Group>
                  </Stack>
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <Stack gap={4}>
                    <Text c="dimmed" size="xs" fw={600} tt="uppercase">Valid To</Text>
                    <Group gap="xs">
                      <IconCalendar size={14} color="gray" />
                      <Text fw={500} size="md" style={{ color: '#2C2E33' }}>{item.validTo}</Text>
                    </Group>
                  </Stack>
                </Grid.Col>
              </Grid>
            </Paper>

            {/* System Info */}
            <Box px="md">
              <Group gap="xs" justify="center">
                <IconShieldCheck size={14} color="gray" />
                <Text size="xs" c="dimmed">
                  Registered by Security on {item.registeredAt}
                </Text>
              </Group>
            </Box>
          </Stack>
        </Grid.Col>
      </Grid>
    </Stack>
  );
}