"use client";

import {  Title, Text, Stack, Paper, Group, ThemeIcon, Button, Divider , SimpleGrid, Badge, Box } from "@mantine/core";
import { IconChevronLeft, IconInfoCircle } from "@tabler/icons-react";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";
import { useParams } from "next/navigation";

const elements = [
  { id: "TYP-STD", name: "Studio", size: "450 sqft", rooms: "1 Room", price: "$1,200", color: "blue" },
  { id: "TYP-1BR", name: "1 Bedroom", size: "750 sqft", rooms: "2 Rooms", price: "$1,800", color: "green" },
  { id: "TYP-2BR", name: "2 Bedroom", size: "1,100 sqft", rooms: "3 Rooms", price: "$2,500", color: "orange" },
  { id: "TYP-PNT", name: "Penthouse", size: "2,500 sqft", rooms: "5 Rooms", price: "$5,000", color: "violet" },
];

export default function DetailPage() {
  const { mounted } = useTranslation();
  const params = useParams();
  const id = params.id as string;

  

  const item = elements.find((d: any) => String(d.id) === String(id));

  return (
    <Stack gap="xl" p="md">
      <Group justify="space-between">
        <Stack gap={4}>
          <Title order={2} c="#014F86">Unit Type Details</Title>
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

      <Paper p="xl" radius="md" shadow="sm" withBorder style={{ border: '1px solid #e9ecef', maxWidth: 900, backgroundColor: '#ffffff' }}>
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
