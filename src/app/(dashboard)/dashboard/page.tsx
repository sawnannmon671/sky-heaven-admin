"use client";

import {
  Grid,
  Paper,
  Title,
  Text,
  Group,
  Badge,
  Stack,
  RingProgress,
  ThemeIcon,
  Table,
  Button,
  Avatar,
  Box,
  Progress,
  SimpleGrid,
  ActionIcon,
} from "@mantine/core";
import {
  IconUsers,
  IconBuilding,
  IconTools,
  IconReceipt,
  IconTrendingUp,
  IconArrowUpRight,
  IconArrowDownRight,
  IconCircleCheck,
  IconClock,
} from "@tabler/icons-react";

const stats = [
  {
    title: "Total Units",
    value: "120",
    diff: 12,
    icon: IconBuilding,
    color: "blue",
    description: "4 units added this month",
  },
  {
    title: "Active Residents",
    value: "245",
    diff: 5,
    icon: IconUsers,
    color: "teal",
    description: "2 new move-ins this week",
  },
  {
    title: "Open Requests",
    value: "12",
    diff: -3,
    icon: IconTools,
    color: "orange",
    description: "3 resolved today",
  },
  {
    title: "Pending Bills",
    value: "8",
    diff: -10,
    icon: IconReceipt,
    color: "red",
    description: "Decreased from last month",
  },
];

const recentActivities = [
  { id: 1, user: "John Doe", unit: "A-101", activity: "Maintenance", status: "In Progress", date: "2 hours ago", color: "blue" },
  { id: 2, user: "Sarah Smith", unit: "B-205", activity: "Payment", status: "Completed", date: "5 hours ago", color: "green" },
  { id: 3, user: "Michael Wong", unit: "C-303", activity: "Registration", status: "New", date: "1 day ago", color: "violet" },
  { id: 4, user: "Elena Rodriguez", unit: "A-404", activity: "Visitor", status: "Checked Out", date: "2 days ago", color: "gray" },
];

export default function DashboardPage() {
  const cards = stats.map((stat) => {
    const Icon = stat.icon;
    const DiffIcon = stat.diff > 0 ? IconArrowUpRight : IconArrowDownRight;

    return (
      <Paper withBorder p="md" radius="md" key={stat.title} shadow="sm">
        <Group justify="space-between">
          <ThemeIcon
            size="xl"
            radius="md"
            variant="light"
            color={stat.color}
          >
            <Icon size={28} />
          </ThemeIcon>
          <Badge
            color={stat.diff > 0 ? "teal" : "red"}
            variant="light"
            leftSection={<DiffIcon size={12} />}
          >
            {Math.abs(stat.diff)}%
          </Badge>
        </Group>

        <Stack gap={2} mt="md">
          <Text size="xs" c="dimmed" fw={700} tt="uppercase">
            {stat.title}
          </Text>
          <Title order={2}>{stat.value}</Title>
        </Stack>

        <Text c="dimmed" size="xs" mt="sm">
          <Text component="span" c={stat.diff > 0 ? "teal" : "red"} fw={700}>
            {stat.description}
          </Text>
        </Text>
      </Paper>
    );
  });

  return (
    <Stack gap="xl">
      <Group justify="space-between">
        <Stack gap={0}>
          <Title order={2}>Property Overview</Title>
          <Text c="dimmed" size="sm">Monitor your property performance and recent activities at a glance.</Text>
        </Stack>
        <Badge size="lg" variant="light" color="#014F86" leftSection={<IconClock size={14} />}>
          Last Update: April 24, 2026
        </Badge>
      </Group>

      <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="xl">
        {cards}
      </SimpleGrid>

      <Grid gutter="xl">
        <Grid.Col span={{ base: 12, lg: 8 }}>
          <Paper withBorder p="md" radius="md" shadow="sm">
            <Group justify="space-between" mb="xl">
              <Stack gap={0}>
                <Title order={4}>Recent Activities</Title>
                <Text size="xs" c="dimmed">Latest events across all departments</Text>
              </Stack>
              <Button variant="subtle" size="xs" color="#014F86">View All Activity</Button>
            </Group>
            <Table verticalSpacing="sm" highlightOnHover>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>User / Resident</Table.Th>
                  <Table.Th>Activity Type</Table.Th>
                  <Table.Th>Current Status</Table.Th>
                  <Table.Th ta="right">Time Elapsed</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {recentActivities.map((item) => (
                  <Table.Tr key={item.id}>
                    <Table.Td>
                      <Group gap="sm">
                        <Avatar color={item.color} radius="xl" size="sm" variant="light">{item.user[0]}</Avatar>
                        <div>
                          <Text size="sm" fw={500}>{item.user}</Text>
                          <Text size="xs" c="dimmed">{item.unit}</Text>
                        </div>
                      </Group>
                    </Table.Td>
                    <Table.Td>
                      <Text size="sm">{item.activity}</Text>
                    </Table.Td>
                    <Table.Td>
                      <Badge color={item.color} variant="dot" size="sm">{item.status}</Badge>
                    </Table.Td>
                    <Table.Td ta="right">
                      <Text size="xs" c="dimmed">{item.date}</Text>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </Paper>
        </Grid.Col>

        <Grid.Col span={{ base: 12, lg: 4 }}>
          <Stack gap="xl">
            <Paper withBorder p="md" radius="md" shadow="sm">
              <Group justify="space-between" mb="md">
                <Title order={4}>Occupancy Rate</Title>
                <ActionIcon variant="subtle" color="gray"><IconArrowUpRight size={16} /></ActionIcon>
              </Group>
              <Group justify="center" mb="md">
                <RingProgress
                  size={160}
                  thickness={16}
                  roundCaps
                  sections={[{ value: 85, color: "#014F86" }]}
                  label={
                    <Stack gap={0} align="center">
                      <Text ta="center" size="xl" fw={800}>85%</Text>
                      <Text ta="center" size="xs" c="dimmed" fw={500}>Occupied</Text>
                    </Stack>
                  }
                />
              </Group>
              <Stack gap="xs">
                <Group justify="space-between">
                  <Text size="sm" fw={500}>Available Units</Text>
                  <Text size="sm" fw={700} c="#014F86">18 / 120</Text>
                </Group>
                <Progress value={85} color="#014F86" size="sm" radius="xl" />
              </Stack>
            </Paper>

            <Paper withBorder p="lg" radius="md" shadow="md" style={{ backgroundColor: "#014F86", color: "white", backgroundImage: "linear-gradient(135deg, #014F86 0%, #2C7dA0 100%)" }}>
              <Group justify="space-between" mb="xs">
                <Text fw={600} size="sm" tt="uppercase" lts={1}>Revenue Target</Text>
                <ThemeIcon variant="white" color="#014F86" size="sm" radius="xl">
                  <IconTrendingUp size={14} />
                </ThemeIcon>
              </Group>
              <Title order={2} mb="md">$42,500.00</Title>
              <Stack gap={4}>
                <Group justify="space-between" size="xs">
                  <Text size="xs" fw={500}>Progress to Goal</Text>
                  <Text size="xs" fw={700}>70%</Text>
                </Group>
                <Progress value={70} color="white" size="xs" radius="xl" />
                <Text size="xs" mt={4} opacity={0.8}>$12,500 remaining to reach April goal</Text>
              </Stack>
            </Paper>
          </Stack>
        </Grid.Col>
      </Grid>
    </Stack>
  );
}
