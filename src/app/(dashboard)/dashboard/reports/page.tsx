"use client";

import { Title, Paper, Group, Button, Stack, Text, SimpleGrid, RingProgress, ThemeIcon, ActionIcon } from "@mantine/core";
import { IconDownload, IconChartPie, IconChartBar, IconChartLine, IconTrendingUp, IconTrendingDown, IconCalendarStats } from "@tabler/icons-react";

export default function ReportsPage() {
  return (
    <Stack gap="xl">
      <Group justify="space-between">
        <Stack gap={0}>
          <Title order={2}>Analytics & Reports</Title>
          <Text c="dimmed" size="sm">Monitor property performance and financial health metrics.</Text>
        </Stack>
        <Group gap="sm">
          <Button leftSection={<IconCalendarStats size={16} />} variant="outline" color="gray">Select Date Range</Button>
          <Button leftSection={<IconDownload size={16} />} color="#014F86">Export Data</Button>
        </Group>
      </Group>

      <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="xl">
        <Paper p="lg" radius="md" withBorder shadow="sm">
          <Group justify="space-between">
            <div>
              <Text size="xs" c="dimmed" tt="uppercase" fw={700}>Occupancy Rate</Text>
              <Text fw={700} size="h2" mt={4}>85.4%</Text>
              <Group gap={4} mt={4}>
                <IconTrendingUp size={14} color="var(--mantine-color-green-6)" />
                <Text size="xs" color="green.6" fw={500}>+2.4% from last month</Text>
              </Group>
            </div>
            <RingProgress
              size={90}
              roundCaps
              thickness={8}
              sections={[{ value: 85, color: "#014F86" }]}
              label={
                <Text ta="center" size="xs" fw={700}>85%</Text>
              }
            />
          </Group>
        </Paper>

        <Paper p="lg" radius="md" withBorder shadow="sm">
          <Group justify="space-between">
            <div>
              <Text size="xs" c="dimmed" tt="uppercase" fw={700}>Monthly Revenue</Text>
              <Text fw={700} size="h2" mt={4}>$45,200</Text>
              <Group gap={4} mt={4}>
                <IconTrendingUp size={14} color="var(--mantine-color-green-6)" />
                <Text size="xs" color="green.6" fw={500}>+12% from last month</Text>
              </Group>
            </div>
            <ThemeIcon color="green" variant="light" size={48} radius="md">
              <IconChartLine size={28} />
            </ThemeIcon>
          </Group>
        </Paper>

        <Paper p="lg" radius="md" withBorder shadow="sm">
          <Group justify="space-between">
            <div>
              <Text size="xs" c="dimmed" tt="uppercase" fw={700}>Maintenance Efficency</Text>
              <Text fw={700} size="h2" mt={4}>92.1%</Text>
              <Group gap={4} mt={4}>
                <IconTrendingDown size={14} color="var(--mantine-color-red-6)" />
                <Text size="xs" color="red.6" fw={500}>-1.2% from last month</Text>
              </Group>
            </div>
            <ThemeIcon color="orange" variant="light" size={48} radius="md">
              <IconChartBar size={28} />
            </ThemeIcon>
          </Group>
        </Paper>
      </SimpleGrid>

      <Paper p="xl" radius="md" withBorder shadow="sm" style={{ minHeight: 400, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "var(--mantine-color-gray-0)" }}>
        <Stack align="center" gap="md">
          <ThemeIcon size={64} radius="xl" variant="light" color="gray">
            <IconChartPie size={36} />
          </ThemeIcon>
          <div style={{ textAlign: "center" }}>
            <Text fw={700} size="lg">No Detailed Charts Available</Text>
            <Text c="dimmed" size="sm">Select a data range and generate a report to see visual analytics.</Text>
          </div>
          <Button variant="outline" color="#014F86" mt="md">Generate Detailed Report</Button>
        </Stack>
      </Paper>
    </Stack>
  );
}
