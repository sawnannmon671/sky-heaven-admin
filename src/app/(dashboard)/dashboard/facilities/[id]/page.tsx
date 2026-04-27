"use client";

import {  Title, Text, Stack, Paper, Group, ThemeIcon, Button, Divider , SimpleGrid, Badge, Box, Image, Container, Grid, Card } from "@mantine/core";
import { IconChevronLeft, IconInfoCircle, IconMapPin, IconClock, IconUsers, IconCalendarEvent, IconCheck } from "@tabler/icons-react";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";
import { useParams } from "next/navigation";

const elements = [
  { id: "FAC-001", name: "Tennis", location: "Sports Complex", status: "Open", color: "blue", image: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=2070&auto=format&fit=crop", description: "Professional-grade outdoor tennis courts. Perfect for friendly matches or rigorous practice sessions. Bring your own rackets and balls.", capacity: "4 Persons", schedule: "06:00 AM - 10:00 PM" },
  { id: "FAC-002", name: "Swimming pool", location: "Level 1", status: "Open", color: "cyan", image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=2070&auto=format&fit=crop", description: "Our Olympic-sized infinity pool offers breathtaking views and crystal-clear water. Perfect for both morning laps and relaxing afternoon dips. Regular maintenance on Mondays.", capacity: "50 Persons", schedule: "06:00 AM - 10:00 PM" },
  { id: "FAC-003", name: "Badminton", location: "Sports Complex", status: "Open", color: "indigo", image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=2070&auto=format&fit=crop", description: "Indoor badminton courts with shock-absorbing flooring. Indoor shoes required to maintain the court surface.", capacity: "4 Persons", schedule: "06:00 AM - 10:00 PM" },
  { id: "FAC-004", name: "Movie", location: "Level 3", status: "Open", color: "violet", image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=2070&auto=format&fit=crop", description: "Private mini-cinema with plush seating and surround sound system. Advance booking recommended for weekend slots.", capacity: "20 Persons", schedule: "10:00 AM - 11:00 PM" },
  { id: "FAC-005", name: "Function Room", location: "Penthouse", status: "Cleaning", color: "orange", image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=2069&auto=format&fit=crop", description: "A versatile and spacious function room equipped with modern audiovisual technology, perfect for hosting events, meetings, and private celebrations. Booking required 3 days in advance.", capacity: "100 Persons", schedule: "08:00 AM - 11:00 PM" },
  { id: "FAC-006", name: "BBQ", location: "Garden", status: "Open", color: "red", image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1974&auto=format&fit=crop", description: "Outdoor BBQ pits set in a lush garden environment. Ideal for family gatherings and weekend parties. Please clean up after use.", capacity: "15 Persons", schedule: "10:00 AM - 10:00 PM" },
  { id: "FAC-007", name: "Bar", location: "Rooftop", status: "Open", color: "grape", image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1974&auto=format&fit=crop", description: "Exclusive rooftop bar offering panoramic city views. Adults only area. Enjoy premium beverages in a sophisticated atmosphere.", capacity: "40 Persons", schedule: "05:00 PM - 12:00 AM" },
  { id: "FAC-008", name: "Gym", location: "Level 3", status: "Open", color: "teal", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop", description: "State-of-the-art fitness center equipped with the latest cardio and strength training machines. Bring your own towel.", capacity: "30 Persons", schedule: "05:00 AM - 11:00 PM" },
];

export default function DetailPage() {
  const { mounted } = useTranslation();
  const params = useParams();
  const id = params.id as string;

  

  const item = elements.find((d: any) => String(d.id) === String(id));

  return (
    <Stack gap="xl" p="md" style={{ maxWidth: 1000, margin: '0 auto' }}>
      <Group justify="space-between">
        <Button 
          component={Link} 
          href="../" 
          variant="subtle" 
          leftSection={<IconChevronLeft size={16} />}
          color="gray"
          px={0}
        >
          Back to Facilities
        </Button>
      </Group>

      <Box>
        {item ? (
          <Stack gap="xl">
            {/* Minimalist Hero Section */}
            <Paper radius="xl" style={{ overflow: 'hidden', position: 'relative', height: 400, boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}>
              <Image 
                src={item.image || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2070&auto=format&fit=crop"} 
                alt={item.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <Box 
                style={{ 
                  position: 'absolute', 
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.8) 100%)' 
                }}
              />
              <Box 
                style={{ 
                  position: 'absolute', 
                  bottom: 0, 
                  left: 0, 
                  right: 0, 
                  padding: '40px'
                }}
              >
                <Badge color={item.color || 'blue'} size="lg" radius="sm" variant="filled" mb="md" style={{ textTransform: 'uppercase', letterSpacing: 1 }}>
                  {item.status}
                </Badge>
                <Title order={1} c="white" style={{ fontSize: '3rem', fontWeight: 800, letterSpacing: '-1px' }}>
                  {item.name}
                </Title>
              </Box>
            </Paper>

            {/* Content Section */}
            <Grid gutter="xl">
              <Grid.Col span={{ base: 12, md: 8 }}>
                <Stack gap="xl">
                  <Box>
                    <Title order={3} mb="sm" style={{ fontWeight: 600 }}>About</Title>
                    <Text size="lg" c="dimmed" lh={1.7}>
                      {item.description || "No description available for this facility."}
                    </Text>
                  </Box>

                  <Divider color="gray.2" />

                  <Box>
                    <Title order={3} mb="lg" style={{ fontWeight: 600 }}>Quick Facts</Title>
                    <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
                      <Group wrap="nowrap">
                        <ThemeIcon size={48} radius="md" variant="light" color="blue">
                          <IconMapPin size={24} stroke={1.5} />
                        </ThemeIcon>
                        <Box>
                          <Text size="xs" c="dimmed" tt="uppercase" fw={700} lts={1}>Location</Text>
                          <Text size="md" fw={500}>{item.location}</Text>
                        </Box>
                      </Group>

                      <Group wrap="nowrap">
                        <ThemeIcon size={48} radius="md" variant="light" color="teal">
                          <IconUsers size={24} stroke={1.5} />
                        </ThemeIcon>
                        <Box>
                          <Text size="xs" c="dimmed" tt="uppercase" fw={700} lts={1}>Capacity</Text>
                          <Text size="md" fw={500}>{item.capacity}</Text>
                        </Box>
                      </Group>

                      <Group wrap="nowrap">
                        <ThemeIcon size={48} radius="md" variant="light" color="orange">
                          <IconClock size={24} stroke={1.5} />
                        </ThemeIcon>
                        <Box>
                          <Text size="xs" c="dimmed" tt="uppercase" fw={700} lts={1}>Opening Hours</Text>
                          <Text size="md" fw={500}>{item.schedule}</Text>
                        </Box>
                      </Group>

                      <Group wrap="nowrap">
                        <ThemeIcon size={48} radius="md" variant="light" color="grape">
                          <IconCalendarEvent size={24} stroke={1.5} />
                        </ThemeIcon>
                        <Box>
                          <Text size="xs" c="dimmed" tt="uppercase" fw={700} lts={1}>Booking</Text>
                          <Text size="md" fw={500}>Required</Text>
                        </Box>
                      </Group>
                    </SimpleGrid>
                  </Box>
                </Stack>
              </Grid.Col>

              <Grid.Col span={{ base: 12, md: 4 }}>
                <Card shadow="sm" padding="xl" radius="xl" withBorder style={{ position: 'sticky', top: 20 }}>
                  <Text size="sm" c="dimmed" tt="uppercase" fw={700} lts={1} mb="xs">Ready to use?</Text>
                  <Title order={3} mb="md">Reserve a spot</Title>
                  <Text size="sm" c="dimmed" mb="xl">
                    Secure your time slot for {item.name}. Some facilities may require advance notice or carry a small maintenance fee.
                  </Text>
                  <Button fullWidth size="lg" radius="md" color="#014F86" leftSection={<IconCheck size={20} />}>
                    Book Now
                  </Button>
                </Card>
              </Grid.Col>
            </Grid>
          </Stack>
        ) : (
          <Paper p="xl" radius="xl" withBorder shadow="sm" style={{ backgroundColor: '#ffffff' }}>
            <Stack align="center" py="xl">
              <ThemeIcon size={80} radius="xl" color="gray" variant="light">
                <IconInfoCircle size={40} />
              </ThemeIcon>
              <Title order={3} mt="md">Facility Not Found</Title>
              <Text c="dimmed" ta="center" maw={400}>The facility you are looking for might have been removed or the ID is incorrect.</Text>
              <Button component={Link} href="../" variant="light" color="gray" mt="md">Return to Facilities</Button>
            </Stack>
          </Paper>
        )}
      </Box>
    </Stack>
  );
}
