"use client";

import {  Title, Text, Stack, Paper, Group, ThemeIcon, Button, Divider , SimpleGrid, Badge, Box } from "@mantine/core";
import { IconChevronLeft, IconInfoCircle } from "@tabler/icons-react";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";
import { useParams } from "next/navigation";

const mockData = [
    { id: "UTL-001", type: "Water", unit: "A-101", amount: "$25.00", month: "Sep 2024", dueDate: "2024-10-15", status: "Paid" },
    { id: "UTL-002", type: "Electricity", unit: "B-205", amount: "$85.00", month: "Sep 2024", dueDate: "2024-10-15", status: "Unpaid" },
    { id: "UTL-003", type: "Water", unit: "C-304", amount: "$30.00", month: "Sep 2024", dueDate: "2024-10-15", status: "Paid" },
    { id: "UTL-004", type: "Internet", unit: "A-502", amount: "$40.00", month: "Sep 2024", dueDate: "2024-10-15", status: "Overdue" },
    { id: "UTL-005", type: "Electricity", unit: "D-102", amount: "$90.00", month: "Sep 2024", dueDate: "2024-10-15", status: "Paid" },
  ];

export default function DetailPage() {
  const { mounted } = useTranslation();
  const params = useParams();
  const id = params.id as string;

  if (!mounted) return null;

  const item = mockData.find((d: any) => String(d.id) === String(id));

  return (
    <Stack gap="xl" p="md">
      <Group justify="space-between">
        <Stack gap={4}>
          <Group gap="xs">
            <ThemeIcon variant="light" color="blue" size="lg" radius="md">
              <IconInfoCircle size={20} />
            </ThemeIcon>
            <Title order={2}>Utility Bill Details</Title>
          </Group>
          <Text c="dimmed" size="sm">Viewing details for ID: {id}</Text>
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

      <Box>
        {item ? (() => {
            const entries = Object.entries(item).filter(([k, v]) => k !== 'color' && k !== 'icon' && typeof v !== 'object');
            const mid = Math.ceil(entries.length / 2);
            const firstHalf = entries.slice(0, mid);
            const secondHalf = entries.slice(mid);

            const renderItem = ([key, value]: [string, any]) => {
              const formattedKey = key === 'id' ? 'ID' : key.replace(/([A-Z])/g, ' $1').trim();
              const isStatus = key.toLowerCase().includes('status');
              return (
                <Box key={key}>
                  <Text size="xs" fw={700} c="dimmed" tt="uppercase" lts={1} mb={4} style={{ textTransform: 'capitalize' }}>
                    {formattedKey}
                  </Text>
                  {isStatus ? (
                    <div>
                      <Badge color={(item as any).color || 'blue'} variant="light" size="lg" radius="md">
                        {String(value)}
                      </Badge>
                    </div>
                  ) : (
                    <Text size="lg" fw={600} style={{ wordBreak: 'break-word' }}>
                      {String(value)}
                    </Text>
                  )}
                </Box>
              );
            };

            return (
              <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
                <Paper p="xl" radius="md" withBorder shadow="sm" style={{ backgroundColor: '#ffffff' }}>
                  <Title order={5} mb="xl" c="dimmed" tt="uppercase" lts={1}>Primary Details</Title>
                  <Stack gap="lg">
                    {firstHalf.map(renderItem)}
                  </Stack>
                </Paper>
                
                <Paper p="xl" radius="md" withBorder shadow="sm" style={{ backgroundColor: '#ffffff' }}>
                  <Title order={5} mb="xl" c="dimmed" tt="uppercase" lts={1}>Additional Details</Title>
                  <Stack gap="lg">
                    {secondHalf.map(renderItem)}
                  </Stack>
                </Paper>
              </SimpleGrid>
            );
          })() : (
          <Paper p="xl" radius="md" withBorder shadow="sm" style={{ backgroundColor: '#ffffff' }}>
            <Text c="dimmed" ta="center" py="xl">Record not found.</Text>
          </Paper>
        )}
      </Box>
    </Stack>
  );
}
