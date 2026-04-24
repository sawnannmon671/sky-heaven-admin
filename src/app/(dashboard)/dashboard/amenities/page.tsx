"use client";

import { Title, Paper, Table, Group, Button, Badge, Stack, Text, SimpleGrid, Card, Image } from "@mantine/core";
import { IconPlus, IconCalendar } from "@tabler/icons-react";

const amenities = [
  { title: "Swimming Pool", status: "Open", capacity: "20 people", schedule: "06:00 - 22:00" },
  { title: "Gym Center", status: "Open", capacity: "15 people", schedule: "24/7" },
  { title: "BBQ Area", status: "Reserved", capacity: "10 people", schedule: "17:00 - 23:00" },
  { title: "Function Hall", status: "Maintenance", capacity: "100 people", schedule: "Closed" },
];

export default function AmenitiesPage() {
  const cards = amenities.map((item) => (
    <Card key={item.title} shadow="sm" padding="lg" radius="md" withBorder>
      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>{item.title}</Text>
        <Badge color={item.status === "Open" ? "green" : item.status === "Reserved" ? "blue" : "red"}>
          {item.status}
        </Badge>
      </Group>

      <Stack gap={5}>
        <Text size="sm" c="dimmed">Capacity: {item.capacity}</Text>
        <Text size="sm" c="dimmed">Schedule: {item.schedule}</Text>
      </Stack>

      <Button variant="light" color="blue" fullWidth mt="md" radius="md" leftSection={<IconCalendar size={16} />}>
        Book Now
      </Button>
    </Card>
  ));

  return (
    <Stack gap="md">
      <Group justify="space-between">
        <Title order={2}>Amenities & Facilities</Title>
        <Button leftSection={<IconPlus size={16} />}>Add Amenity</Button>
      </Group>

      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
        {cards}
      </SimpleGrid>
    </Stack>
  );
}
