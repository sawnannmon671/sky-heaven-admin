"use client";

import { Title, Paper, Table, Group, Button, Badge, Stack, Text, SimpleGrid, Card, Image, ActionIcon, ThemeIcon } from "@mantine/core";
import { IconPlus, IconCalendar, IconUsers, IconClock, IconSettings } from "@tabler/icons-react";

const amenities = [
  { title: "Swimming Pool", status: "Open", capacity: "20 people", schedule: "06:00 - 22:00", image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=400&q=80" },
  { title: "Gym Center", status: "Open", capacity: "15 people", schedule: "24/7", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80" },
  { title: "BBQ Area", status: "Reserved", capacity: "10 people", schedule: "17:00 - 23:00", image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&q=80" },
  { title: "Function Hall", status: "Maintenance", capacity: "100 people", schedule: "Closed", image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&q=80" },
];

export default function AmenitiesPage() {
  const cards = amenities.map((item) => (
    <Card key={item.title} shadow="sm" padding="0" radius="md" withBorder>
      <Card.Section>
        <Image
          src={item.image}
          height={160}
          alt={item.title}
        />
      </Card.Section>

      <Stack p="md" gap="xs">
        <Group justify="space-between">
          <Text fw={700} size="lg">{item.title}</Text>
          <Badge 
            variant="light" 
            color={item.status === "Open" ? "green" : item.status === "Reserved" ? "blue" : "red"}
          >
            {item.status}
          </Badge>
        </Group>

        <Stack gap={8} mt="xs">
          <Group gap={8}>
            <ThemeIcon variant="light" size="sm" color="gray">
              <IconUsers size={14} />
            </ThemeIcon>
            <Text size="sm" c="dimmed">Capacity: {item.capacity}</Text>
          </Group>
          <Group gap={8}>
            <ThemeIcon variant="light" size="sm" color="gray">
              <IconClock size={14} />
            </ThemeIcon>
            <Text size="sm" c="dimmed">Schedule: {item.schedule}</Text>
          </Group>
        </Stack>

        <Group gap="sm" mt="md">
          <Button 
            variant="filled" 
            color="#014F86" 
            flex={1} 
            radius="md" 
            leftSection={<IconCalendar size={16} />}
            disabled={item.status === "Maintenance"}
          >
            Book Now
          </Button>
          <ActionIcon variant="light" size="lg" color="gray" radius="md">
            <IconSettings size={18} />
          </ActionIcon>
        </Group>
      </Stack>
    </Card>
  ));

  return (
    <Stack gap="xl">
      <Group justify="space-between">
        <Stack gap={0}>
          <Title order={2}>Amenities & Facilities</Title>
          <Text c="dimmed" size="sm">Explore and reserve property amenities and common areas.</Text>
        </Stack>
        <Button leftSection={<IconPlus size={16} />} color="#014F86">Add Amenity</Button>
      </Group>

      <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="xl">
        {cards}
      </SimpleGrid>
    </Stack>
  );
}
