"use client";

import {  Title, Text, Stack, Paper, Group, ThemeIcon, Button, Divider , SimpleGrid, Badge, Box, Image, Container } from "@mantine/core";
import { IconChevronLeft, IconInfoCircle, IconMapPin, IconClock, IconUsers } from "@tabler/icons-react";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";
import { useParams } from "next/navigation";

const elements = [
  { id: "FAC-001", name: "Swimming Pool", location: "Level 1", status: "Open", color: "blue", image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=2070&auto=format&fit=crop", description: "Our Olympic-sized infinity pool offers breathtaking views and crystal-clear water. Perfect for both morning laps and relaxing afternoon dips.", capacity: "30 People", schedule: "06:00 - 22:00" },
  { id: "FAC-002", name: "Gym Center", location: "Level 3", status: "Open", color: "teal", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop", description: "State-of-the-art fitness center equipped with the latest cardio and strength training machines from Technogym.", capacity: "20 People", schedule: "24/7" },
  { id: "FAC-003", name: "Function Room", location: "Penthouse", status: "Cleaning", color: "orange", image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=2069&auto=format&fit=crop", description: "A versatile and spacious function room equipped with modern audiovisual technology, perfect for hosting events, meetings, and private celebrations.", capacity: "50 People", schedule: "08:00 - 23:00" },
  { id: "FAC-004", name: "Children Playground", location: "Garden", status: "Open", color: "green", image: "https://images.unsplash.com/photo-1588075592446-265fd1e6e76f?q=80&w=2070&auto=format&fit=crop", description: "Safe and colorful play area designed to stimulate children's physical and creative development with modern equipment.", capacity: "15 Children", schedule: "08:00 - 20:00" },
];

export default function DetailPage() {
  const { mounted } = useTranslation();
  const params = useParams();
  const id = params.id as string;

  if (!mounted) return null;

  const item = elements.find((d: any) => String(d.id) === String(id));

  return (
    <Stack gap="xl" p="md">
      <Group justify="space-between">
        <Stack gap={4}>
          <Group gap="xs">
            <ThemeIcon variant="light" color="blue" size="lg" radius="md">
              <IconInfoCircle size={20} />
            </ThemeIcon>
            <Title order={2}>Facility Details</Title>
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
        {item ? (
          <Stack gap="xl">
            {/* Hero Image Section */}
            <Paper radius="lg" style={{ overflow: 'hidden', position: 'relative', height: 350 }}>
              <Image 
                src={item.image || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2070&auto=format&fit=crop"} 
                alt={item.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <Box 
                style={{ 
                  position: 'absolute', 
                  bottom: 0, 
                  left: 0, 
                  right: 0, 
                  padding: '40px 30px 30px',
                  background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)' 
                }}
              >
                <Group justify="space-between" align="flex-end">
                  <Box>
                    <Title order={1} c="white" mb={8}>{item.name}</Title>
                    <Group gap="md">
                      <Group gap={6}>
                        <IconMapPin size={18} color="white" opacity={0.8} />
                        <Text c="white" fw={500}>{item.location}</Text>
                      </Group>
                      <Group gap={6}>
                        <IconClock size={18} color="white" opacity={0.8} />
                        <Text c="white" fw={500}>{item.schedule}</Text>
                      </Group>
                    </Group>
                  </Box>
                  <Badge color={item.color || 'blue'} size="xl" radius="md" variant="filled">
                    {item.status}
                  </Badge>
                </Group>
              </Box>
            </Paper>

            {/* Description & Details Grid */}
            <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
              <Paper p="xl" radius="md" shadow="sm" withBorder style={{ backgroundColor: '#ffffff' }}>
                <Title order={5} mb="md" c="dimmed" tt="uppercase" lts={1}>About This Facility</Title>
                <Text size="md" lh={1.6}>
                  {item.description || "No description available for this facility."}
                </Text>
              </Paper>

              <Paper p="xl" radius="md" shadow="sm" withBorder style={{ backgroundColor: '#ffffff' }}>
                <Title order={5} mb="xl" c="dimmed" tt="uppercase" lts={1}>Key Details</Title>
                <Stack gap="lg">
                  <Box>
                    <Text size="xs" fw={700} c="dimmed" tt="uppercase" lts={1} mb={4}>Facility ID</Text>
                    <Text size="lg" fw={600}>{item.id}</Text>
                  </Box>
                  <Box>
                    <Text size="xs" fw={700} c="dimmed" tt="uppercase" lts={1} mb={4}>Capacity</Text>
                    <Group gap="xs">
                      <IconUsers size={20} color="gray" />
                      <Text size="lg" fw={600}>{item.capacity}</Text>
                    </Group>
                  </Box>
                  <Box>
                    <Text size="xs" fw={700} c="dimmed" tt="uppercase" lts={1} mb={4}>Current Status</Text>
                    <Badge color={item.color || 'blue'} variant="light" size="lg" radius="md">
                      {item.status}
                    </Badge>
                  </Box>
                </Stack>
              </Paper>
            </SimpleGrid>
          </Stack>
        ) : (
          <Paper p="xl" radius="md" withBorder shadow="sm" style={{ backgroundColor: '#ffffff' }}>
            <Text c="dimmed" ta="center" py="xl">Record not found.</Text>
          </Paper>
        )}
      </Box>
    </Stack>
  );
}
