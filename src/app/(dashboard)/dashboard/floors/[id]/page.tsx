"use client";

import { Title, Text, Stack, Paper, Group, ThemeIcon, Button, Divider, Badge, Box, Grid, SimpleGrid, Card } from "@mantine/core";
import { IconChevronLeft, IconInfoCircle, IconBuildingSkyscraper, IconDatabase, IconHome, IconBuilding, IconFileDescription, IconEdit, IconTrash } from "@tabler/icons-react";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";
import { useParams } from "next/navigation";

const elements = [
  { id: "FL-A-01", building: "Tower A", floor: "Floor 1", units: 4, type: "Residential", color: "blue" },
  { id: "FL-A-02", building: "Tower A", floor: "Floor 2", units: 4, type: "Residential", color: "blue" },
  { id: "FL-B-PH", building: "Tower B", floor: "Penthouse", units: 2, type: "Premium", color: "violet" },
];

export default function DetailPage() {
  const { mounted } = useTranslation();
  const params = useParams();
  const id = params.id as string;

  const dataList = typeof elements !== 'undefined' ? elements : (typeof mockData !== 'undefined' ? mockData : []);
  const item = dataList.find((d: any) => String(d.id) === String(id));

  const getStatusColor = (status: string) => {
    if (!status) return 'blue';
    switch (status.toLowerCase()) {
      case 'active': case 'occupied': case 'available': case 'operational': return 'teal';
      case 'inactive': case 'vacant': case 'under maintenance': return 'orange';
      case 'maintenance': case 'out of order': return 'red';
      default: return 'blue';
    }
  };

  if (!item) {
    return (
      <Stack gap="xl" p="md" style={{ maxWidth: 1000, margin: '0 auto' }}>
        <Paper p="xl" radius="xl" withBorder shadow="sm" style={{ backgroundColor: '#ffffff' }}>
          <Stack align="center" py="xl">
            <ThemeIcon size={80} radius="xl" color="gray" variant="light">
              <IconInfoCircle size={40} />
            </ThemeIcon>
            <Title order={3} mt="md">Record Not Found</Title>
            <Text c="dimmed" ta="center" maw={400}>The record you are looking for might have been removed or the ID is incorrect.</Text>
            <Button component={Link} href="../" variant="light" color="gray" mt="md">Return to List</Button>
          </Stack>
        </Paper>
      </Stack>
    );
  }

  const entries = Object.entries(item).filter(([k, v]) => k !== 'color' && k !== 'icon' && typeof v !== 'object' && k !== 'id' && k !== 'status' && k !== 'name' && k !== 'unitNumber');

  return (
    <Stack gap="xl" p="md" style={{ maxWidth: 1000, margin: '0 auto' }}>
      <Group justify="space-between" align="center">
        <Group gap="sm">
          <ThemeIcon variant="light" color="blue" size="lg" radius="md">
            <IconBuildingSkyscraper size={20} />
          </ThemeIcon>
          <Title order={2}>Floor Details</Title>
        </Group>
        <Button 
          component={Link} 
          href="../" 
          variant="subtle" 
          leftSection={<IconChevronLeft size={16} />}
          color="gray"
          px={0}
        >
          Back to List
        </Button>
      </Group>

      <Box>
        <Stack gap="xl">
          {/* Simple Summary Box */}
          <Paper radius="md" withBorder p="xl" bg="white" shadow="sm">
            <Group justify="space-between" align="center">
              <Box>
                <Text c="dimmed" size="xs" fw={700} tt="uppercase" lts={1} mb={4}>Primary Identifier</Text>
                <Title order={1} style={{ fontSize: '2rem', fontWeight: 800, color: '#2C2E33', letterSpacing: '-0.5px' }}>
                  {item.name || item.unitNumber || item.id}
                </Title>
                <Text c="dimmed" mt="sm" fw={500}>Reference ID: <Text component="span" fw={600} c="dark">{item.id}</Text></Text>
              </Box>
              {item.status && (
                  <Badge 
                    color={getStatusColor(item.status)} 
                    size="xl" 
                    radius="sm" 
                    variant="light" 
                    style={{ textTransform: 'uppercase', letterSpacing: 1 }}
                  >
                    {item.status}
                  </Badge>
              )}
            </Group>
          </Paper>

          {/* Content Section */}
          <Grid gutter="xl">
            <Grid.Col span={{ base: 12, md: 8 }}>
              <Stack gap="xl">
                <Box>
                  <Title order={3} mb="lg" style={{ fontWeight: 600 }}>Property Details</Title>
                  <Paper radius="md" withBorder p="xl" bg="white">
                      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="xl">
                        {entries.map(([key, value]) => {
                          const formattedKey = key.replace(/([A-Z])/g, ' $1').trim();
                          return (
                            <Group wrap="nowrap" key={key}>
                              <ThemeIcon size={48} radius="md" variant="light" color="blue">
                                <IconInfoCircle size={24} stroke={1.5} />
                              </ThemeIcon>
                              <Box>
                                <Text size="xs" c="dimmed" tt="uppercase" fw={700} lts={1} style={{ textTransform: 'capitalize' }}>{formattedKey}</Text>
                                <Text size="md" fw={500}>{String(value)}</Text>
                              </Box>
                            </Group>
                          );
                        })}
                      </SimpleGrid>
                  </Paper>
                </Box>
              </Stack>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 4 }}>
              <Card shadow="sm" padding="xl" radius="xl" withBorder style={{ position: 'sticky', top: 20 }}>
                <Text size="sm" c="dimmed" tt="uppercase" fw={700} lts={1} mb="xs">Actions</Text>
                <Title order={3} mb="xl">Management</Title>
                
                <Stack gap="md">
                  <Button fullWidth size="md" radius="md" color="#014F86" leftSection={<IconEdit size={18} />}>
                    Edit Details
                  </Button>
                  <Button fullWidth variant="light" size="md" radius="md" color="red" leftSection={<IconTrash size={18} />}>
                    Delete Record
                  </Button>
                </Stack>
              </Card>
            </Grid.Col>
          </Grid>
        </Stack>
      </Box>
    </Stack>
  );
}