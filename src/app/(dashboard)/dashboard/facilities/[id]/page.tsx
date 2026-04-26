"use client";

import { Title, Text, Stack, Paper, Group, ThemeIcon, Button, Grid, Badge, Box } from "@mantine/core";
import { IconChevronLeft, IconInfoCircle, IconFileDescription } from "@tabler/icons-react";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function DetailPage() {
  const { mounted } = useTranslation();
  const params = useParams();
  const id = params.id as string;

  if (!mounted) return null;

  return (
    <Stack gap="xl" p="md">
      <Group justify="space-between">
        <Stack gap={4}>
          <Group gap="xs">
            <ThemeIcon variant="light" color="blue" size="lg" radius="md">
              <IconInfoCircle size={20} />
            </ThemeIcon>
            <Title order={1}>Facility Details</Title>
          </Group>
          <Text c="dimmed" size="md">Viewing details for facility ID: {id}</Text>
        </Stack>
        <Button 
          component={Link} 
          href="../" 
          variant="subtle" 
          leftSection={<IconChevronLeft size={16} />}
          color="gray"
        >
          Back to List
        </Button>
      </Group>

      <Grid>
        <Grid.Col span={{ base: 12, md: 8 }}>
          <Paper p="xl" radius="lg" withBorder shadow="sm" style={{ border: '1px solid #e9ecef' }}>
            <Stack gap="lg">
              <Group justify="space-between" align="flex-start">
                <div>
                  <Text size="xs" tt="uppercase" fw={700} c="dimmed">Facility ID</Text>
                  <Text size="xl" fw={700} mt={4}>{id}</Text>
                </div>
                <Badge size="lg" variant="light" color="blue">Active</Badge>
              </Group>

              <Grid>
                <Grid.Col span={6}>
                  <Text size="sm" c="dimmed" mb={4}>Date Created</Text>
                  <Text fw={500}>Oct 1, 2024</Text>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Text size="sm" c="dimmed" mb={4}>Assigned To</Text>
                  <Text fw={500}>System User</Text>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Text size="sm" c="dimmed" mb={4}>Last Updated</Text>
                  <Text fw={500}>Oct 15, 2024</Text>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Text size="sm" c="dimmed" mb={4}>Status</Text>
                  <Badge variant="dot" color="green">Processed</Badge>
                </Grid.Col>
              </Grid>

              <Box mt="md">
                <Text size="sm" c="dimmed" mb={8}>Description / Notes</Text>
                <Paper p="md" bg="gray.0" radius="md">
                  <Text size="sm">
                    This is a detailed view for the selected facility. Additional information, metadata, and related transactions would be displayed here depending on the specific module.
                  </Text>
                </Paper>
              </Box>
            </Stack>
          </Paper>
        </Grid.Col>
        
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Paper p="xl" radius="lg" withBorder shadow="sm" style={{ border: '1px solid #e9ecef' }}>
            <Stack gap="md">
              <Group gap="xs">
                <IconFileDescription size={20} color="gray" />
                <Title order={4}>Summary</Title>
              </Group>
              <Text size="sm" c="dimmed">
                Overview of the current facility. Use the actions below to manage this entry.
              </Text>
              <Button fullWidth color="blue" mt="sm">Print / Download</Button>
              <Button fullWidth variant="light" color="blue">Edit Facility</Button>
              <Button fullWidth variant="light" color="red">Delete</Button>
            </Stack>
          </Paper>
        </Grid.Col>
      </Grid>
    </Stack>
  );
}
