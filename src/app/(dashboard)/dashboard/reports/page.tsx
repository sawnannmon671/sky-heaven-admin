"use client";

import { Title, Paper, Group, Button, Stack, Text, SimpleGrid, RingProgress, ThemeIcon } from "@mantine/core";
import { IconDownload, IconChartPie, IconChartBar, IconChartLine } from "@tabler/icons-react";

export default function ReportsPage() {
  return (
    <Stack gap="md">
      <Group justify="space-between">
        <Title order={2}>Analytics & Reports</Title>
        <Button leftSection={<IconDownload size={16} />} variant="light">Export All</Button>
      </Group>

      <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="lg">
        <Paper p="md" radius="md" withBorder>
          <Group justify="space-between">
            <div>
              <Text size="xs" c="dimmed" tt="uppercase" fw={700}>Occupancy Rate</Text>
              <Text fw={700} size="xl">85%</Text>
            </div>
            <RingProgress
              size={80}
              roundCaps
              thickness={8}
              sections={[{ value: 85, color: "blue" }]}
            />
          </Group>
        </Paper>

        <Paper p="md" radius="md" withBorder>
          <Group justify="space-between">
            <div>
              <Text size="xs" c="dimmed" tt="uppercase" fw={700}>Revenue (Mtd)</Text>
              <Text fw={700} size="xl">$45,200</Text>
            </div>
            <ThemeIcon color="green" variant="light" size={40}>
              <IconChartLine size={24} />
            </ThemeIcon>
          </Group>
        </Paper>

        <Paper p="md" radius="md" withBorder>
          <Group justify="space-between">
            <div>
              <Text size="xs" c="dimmed" tt="uppercase" fw={700}>Maintenance Solved</Text>
              <Text fw={700} size="xl">92%</Text>
            </div>
            <ThemeIcon color="orange" variant="light" size={40}>
              <IconChartBar size={24} />
            </ThemeIcon>
          </Group>
        </Paper>
      </SimpleGrid>

      <Paper p="xl" radius="md" withBorder style={{ minHeight: 300 }}>
        <Stack align="center" justify="center" gap="md" mt={50}>
          <IconChartPie size={48} color="gray" />
          <Text c="dimmed">Detailed charts and graphs will be displayed here.</Text>
          <Button variant="outline">Generate Detailed Report</Button>
        </Stack>
      </Paper>
    </Stack>
  );
}
