"use client";

import {  Title, Text, Stack, Paper, Group, ThemeIcon, Button, Divider , SimpleGrid, Badge, Box } from "@mantine/core";
import { IconChevronLeft, IconInfoCircle } from "@tabler/icons-react";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";
import { useParams } from "next/navigation";

const mockData = [
    { id: "EXP-001", category: "Maintenance", description: "Elevator Repair", amount: "$450.00", date: "2024-10-02", status: "Paid" },
    { id: "EXP-002", category: "Cleaning", description: "Monthly Cleaning Service", amount: "$200.00", date: "2024-10-05", status: "Paid" },
    { id: "EXP-003", category: "Utilities", description: "Common Area Electricity", amount: "$350.00", date: "2024-10-10", status: "Pending" },
    { id: "EXP-004", category: "Security", description: "Security Guard Salary", amount: "$800.00", date: "2024-10-15", status: "Approved" },
    { id: "EXP-005", category: "Landscaping", description: "Garden Maintenance", amount: "$150.00", date: "2024-10-18", status: "Pending" },
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
            <Title order={2}>Expense Details</Title>
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

      <Paper p="xl" radius="lg" shadow="sm" withBorder style={{ border: '1px solid #e9ecef', maxWidth: 900, backgroundColor: '#ffffff' }}>
        {item ? (
          <Stack gap="xl">
            <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="xl">
              <Box>
                <Text size="xs" fw={700} c="dimmed" tt="uppercase" lts={1} mb={4}>ID</Text>
                <Text size="lg" fw={500}>{id}</Text>
              </Box>
              
              {Object.entries(item).map(([key, value]) => {
                if (key === 'id' || key === 'color' || key === 'icon' || typeof value === 'object') return null;
                
                const formattedKey = key.replace(/([A-Z])/g, ' $1').trim();
                const isStatus = key.toLowerCase().includes('status');
                
                return (
                  <Box key={key}>
                    <Text size="xs" fw={700} c="dimmed" tt="uppercase" lts={1} mb={4} style={{ textTransform: 'capitalize' }}>
                      {formattedKey}
                    </Text>
                    {isStatus ? (
                      <Badge color={(item as any).color || 'blue'} variant="light" size="lg" radius="md">
                        {String(value)}
                      </Badge>
                    ) : (
                      <Text size="lg" fw={500} style={{ wordBreak: 'break-word' }}>
                        {String(value)}
                      </Text>
                    )}
                  </Box>
                );
              })}
            </SimpleGrid>
          </Stack>
        ) : (
          <Text c="dimmed" ta="center" py="xl">Record not found.</Text>
        )}
      </Paper>
    </Stack>
  );
}
