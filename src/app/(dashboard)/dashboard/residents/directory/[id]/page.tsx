"use client";

import {  Title, Text, Stack, Paper, Group, ThemeIcon, Button, Divider , SimpleGrid, Badge, Box } from "@mantine/core";
import { IconChevronLeft, IconInfoCircle } from "@tabler/icons-react";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";
import { useParams } from "next/navigation";

const mockData = [
    { id: "RES-001", name: "U Aung Aung", role: "Owner", unit: "A-101", phone: "+95 9 123 456 789", moveInDate: "2020-01-15", status: "Resident" },
    { id: "RES-002", name: "Daw Mya Mya", role: "Tenant", unit: "B-205", phone: "+95 9 987 654 321", moveInDate: "2023-07-01", status: "Resident" },
    { id: "RES-003", name: "Mg Thura", role: "Family Member", unit: "A-502", phone: "+95 9 111 222 333", moveInDate: "2021-03-10", status: "Resident" },
    { id: "RES-004", name: "U Zaw Myo", role: "Owner", unit: "D-102", phone: "+95 9 444 888 999", moveInDate: "2019-11-20", status: "Resident" },
    { id: "RES-005", name: "Daw Thandar", role: "Tenant", unit: "A-502", phone: "+95 9 555 666 777", moveInDate: "2022-08-15", status: "Past Resident" },
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
            <Title order={2}>Directory Details</Title>
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
