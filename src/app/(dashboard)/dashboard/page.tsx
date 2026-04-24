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
} from "@mantine/core";
import {
  IconUsers,
  IconBuilding,
  IconTools,
  IconReceipt,
} from "@tabler/icons-react";

export default function DashboardPage() {
  return (
    <Stack gap="md">
      <Title>Dashboard</Title>

      <Grid>
        <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
          <Paper p="md" radius="md" withBorder>
            <Group>
              <IconBuilding size={32} />
              <div>
                <Text size="xs" c="dimmed">
                  Total Units
                </Text>
                <Title order={3}>120</Title>
              </div>
            </Group>
          </Paper>
        </Grid.Col>

        <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
          <Paper p="md" radius="md" withBorder>
            <Group>
              <IconUsers size={32} />
              <div>
                <Text size="xs" c="dimmed">
                  Residents
                </Text>
                <Title order={3}>245</Title>
              </div>
            </Group>
          </Paper>
        </Grid.Col>

        <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
          <Paper p="md" radius="md" withBorder>
            <Group>
              <IconTools size={32} />
              <div>
                <Text size="xs" c="dimmed">
                  Open Requests
                </Text>
                <Title order={3}>12</Title>
              </div>
            </Group>
          </Paper>
        </Grid.Col>

        <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
          <Paper p="md" radius="md" withBorder>
            <Group>
              <IconReceipt size={32} />
              <div>
                <Text size="xs" c="dimmed">
                  Pending Payments
                </Text>
                <Title order={3}>8</Title>
              </div>
            </Group>
          </Paper>
        </Grid.Col>
      </Grid>

      <Grid>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Paper p="md" radius="md" withBorder>
            <Title order={4} mb="md">
              Unit Status
            </Title>
            <Group justify="center">
              <RingProgress
                size={120}
                roundCaps
                thickness={12}
                sections={[{ value: 75, color: "green" }]}
                label={
                  <Text ta="center" size="sm" fw={700}>
                    75%
                  </Text>
                }
              />
            </Group>
          </Paper>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }}>
          <Paper p="md" radius="md" withBorder>
            <Title order={4} mb="md">
              Recent Activities
            </Title>
            <Stack>
              <Text size="sm">Unit 101 - Maintenance request submitted</Text>
              <Text size="sm">Unit 205 - Payment received</Text>
              <Text size="sm">Unit 303 - New resident registered</Text>
            </Stack>
          </Paper>
        </Grid.Col>
      </Grid>
    </Stack>
  );
}
