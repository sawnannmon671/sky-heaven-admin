"use client";

import {  Title, Text, Stack, Paper, Group, ThemeIcon, Button, Divider , SimpleGrid, Badge, Box } from "@mantine/core";
import { IconChevronLeft, IconInfoCircle } from "@tabler/icons-react";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";
import { useParams } from "next/navigation";

const mockData = [
    { id: "TEN-001", name: "U Tun Tun", phone: "+95 9 123 456 789", email: "tuntun@example.com", unit: "A-101", leaseEnd: "2024-12-31", status: "Active" },
    { id: "TEN-002", name: "Daw Mya Mya", phone: "+95 9 987 654 321", email: "myamya@example.com", unit: "B-205", leaseEnd: "2025-06-30", status: "Active" },
    { id: "TEN-003", name: "U Hlaing Bwar", phone: "+95 9 555 666 777", email: "hlaing@example.com", unit: "C-304", leaseEnd: "2023-11-15", status: "Expired" },
    { id: "TEN-004", name: "Daw Thandar", phone: "+95 9 111 222 333", email: "thandar@example.com", unit: "A-502", leaseEnd: "2024-08-20", status: "Active" },
    { id: "TEN-005", name: "U Nyan Lin", phone: "+95 9 444 888 999", email: "nyan@example.com", unit: "D-102", leaseEnd: "2024-01-10", status: "Pending" },
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
            <Title order={2}>Tenant Details</Title>
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
