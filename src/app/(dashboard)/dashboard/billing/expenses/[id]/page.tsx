"use client";

import { Title, Text, Stack, Paper, Group, ThemeIcon, Button, Divider, Badge, Box, Grid, SimpleGrid, Card, Table } from "@mantine/core";
import { IconChevronLeft, IconInfoCircle, IconDownload, IconPrinter, IconReceipt, IconBuildingSkyscraper, IconUser, IconCalendarEvent, IconCreditCard, IconFileDescription } from "@tabler/icons-react";
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

  const item = mockData.find((d: any) => String(d.id) === String(id));

  const getStatusColor = (status: string) => {
    if (!status) return 'blue';
    switch (status.toLowerCase()) {
      case 'paid': case 'completed': case 'processed': case 'approved': case 'closed': return 'teal';
      case 'unpaid': case 'pending': case 'ongoing': return 'orange';
      case 'overdue': case 'failed': case 'rejected': return 'red';
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

  const entries = Object.entries(item).filter(([k, v]) => k !== 'color' && k !== 'icon' && typeof v !== 'object' && k !== 'id' && k !== 'status' && k !== 'amount' && k !== 'totalAmount' && k !== 'items');

  return (
    <Stack gap="xl" p="md" style={{ maxWidth: 1000, margin: '0 auto' }}>
      <Group justify="space-between" align="center">
        <Title order={2} c="#014F86">Expense Details</Title>
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
                <Text c="dimmed" size="xs" fw={700} tt="uppercase" lts={1} mb={4}>Total Amount</Text>
                <Title order={2} c="#014F86" style={{ fontSize: '2.5rem', fontWeight: 800, color: '#2C2E33', letterSpacing: '-1px' }}>
                  {item.amount || (item as any).totalAmount || '-'}
                </Title>
                <Text c="dimmed" mt="sm" fw={500}>Reference: <Text component="span" fw={600} c="dark">{item.id}</Text></Text>
              </Box>
              <Badge 
                color={getStatusColor(item.status)} 
                size="xl" 
                radius="sm" 
                variant="light" 
                style={{ textTransform: 'uppercase', letterSpacing: 1 }}
              >
                {item.status || 'Processed'}
              </Badge>
            </Group>
          </Paper>

          {/* Content Section */}
          <Grid gutter="xl">
            <Grid.Col span={{ base: 12, md: 8 }}>
              <Stack gap="xl">
                <Box>
                  <Title order={3} mb="lg" style={{ fontWeight: 600 }}>Quick Facts</Title>
                  <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
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
                </Box>

                <Divider color="gray.2" />

                {/* Detail List */}
                <Box>
                  <Title order={3} mb="md" style={{ fontWeight: 600 }}>Itemized Breakdown</Title>
                  <Paper radius="md" withBorder p="md">
                    <Stack gap="md">
                      {entries.map(([key, value]) => {
                        const formattedKey = key.replace(/([A-Z])/g, ' $1').trim();
                        return (
                          <Group key={key} justify="space-between" wrap="nowrap">
                            <Text c="dimmed" style={{ textTransform: 'capitalize' }}>{formattedKey}</Text>
                            <Text fw={500} style={{ textAlign: 'right' }}>{String(value)}</Text>
                          </Group>
                        );
                      })}
                    </Stack>
                  </Paper>
                </Box>
              </Stack>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 4 }}>
              <Card shadow="sm" padding="xl" radius="xl" withBorder style={{ position: 'sticky', top: 20 }}>
                <Text size="sm" c="dimmed" tt="uppercase" fw={700} lts={1} mb="xs">Actions & Summary</Text>
                <Title order={3} mb="xl">Details</Title>
                
                <Stack gap="sm" mb="xl">
                  <Group justify="space-between">
                    <Text c="dimmed" size="sm">Subtotal</Text>
                    <Text fw={500}>{item.amount || (item as any).totalAmount || '-'}</Text>
                  </Group>
                  <Group justify="space-between">
                    <Text c="dimmed" size="sm">Tax (0%)</Text>
                    <Text fw={500}>$0.00</Text>
                  </Group>
                  <Divider my="xs" />
                  <Group justify="space-between" align="center">
                    <Text fw={700} size="lg">Total Amount</Text>
                    <Text fw={800} size="xl" c="#014F86">{item.amount || (item as any).totalAmount || '-'}</Text>
                  </Group>
                </Stack>

                <Stack gap="md">
                  <Button fullWidth size="lg" radius="md" color="#014F86" leftSection={<IconCreditCard size={20} />}>
                    Process / Action
                  </Button>
                  <Button fullWidth variant="light" size="md" radius="md" color="gray" leftSection={<IconDownload size={18} />}>
                    Download PDF
                  </Button>
                  <Button fullWidth variant="subtle" size="md" radius="md" color="gray" leftSection={<IconPrinter size={18} />} onClick={() => window.print()}>
                    Print Document
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