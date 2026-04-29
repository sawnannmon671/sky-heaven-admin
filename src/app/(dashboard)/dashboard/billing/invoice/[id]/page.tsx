"use client";

import { Title, Text, Stack, Paper, Group, ThemeIcon, Button, Divider, Badge, Box, Grid, SimpleGrid, Card, Table } from "@mantine/core";
import { IconChevronLeft, IconInfoCircle, IconDownload, IconPrinter, IconReceipt, IconBuildingSkyscraper, IconUser, IconCalendarEvent, IconCreditCard } from "@tabler/icons-react";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";
import { useParams } from "next/navigation";

const mockData = [
  { id: "INV-2024-001", unit: "A-101", resident: "U Aung Aung", amount: "$150.00", date: "2024-10-01", dueDate: "2024-10-15", status: "Paid", items: [{ desc: "Monthly Maintenance Fee", qty: 1, price: "$100.00", total: "$100.00" }, { desc: "Water Usage", qty: 1, price: "$30.00", total: "$30.00" }, { desc: "Common Area Electricity", qty: 1, price: "$20.00", total: "$20.00" }] },
  { id: "INV-2024-002", unit: "B-205", resident: "Daw Su Su", amount: "$120.00", date: "2024-10-01", dueDate: "2024-10-15", status: "Unpaid", items: [{ desc: "Monthly Maintenance Fee", qty: 1, price: "$100.00", total: "$100.00" }, { desc: "Water Usage", qty: 1, price: "$20.00", total: "$20.00" }] },
  { id: "INV-2024-003", unit: "C-304", resident: "U Kyaw Min", amount: "$200.00", date: "2024-10-01", dueDate: "2024-10-15", status: "Paid", items: [{ desc: "Monthly Maintenance Fee", qty: 1, price: "$150.00", total: "$150.00" }, { desc: "Parking Fee", qty: 1, price: "$50.00", total: "$50.00" }] },
  { id: "INV-2024-004", unit: "A-502", resident: "Daw Hla Hla", amount: "$150.00", date: "2024-10-01", dueDate: "2024-10-15", status: "Overdue", items: [{ desc: "Monthly Maintenance Fee", qty: 1, price: "$100.00", total: "$100.00" }, { desc: "Late Payment Penalty", qty: 1, price: "$50.00", total: "$50.00" }] },
  { id: "INV-2024-005", unit: "D-102", resident: "U Zaw Myo", amount: "$180.00", date: "2024-10-01", dueDate: "2024-10-15", status: "Paid", items: [{ desc: "Monthly Maintenance Fee", qty: 1, price: "$150.00", total: "$150.00" }, { desc: "Water Usage", qty: 1, price: "$30.00", total: "$30.00" }] },
];

export default function DetailPage() {
  const { mounted } = useTranslation();
  const params = useParams();
  const id = params.id as string;

  const item = mockData.find((d) => String(d.id) === String(id));

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid': return 'teal';
      case 'Unpaid': return 'orange';
      case 'Overdue': return 'red';
      default: return 'blue';
    }
  };

  return (
    <Stack gap="xl" p="md" style={{ maxWidth: 1000, margin: '0 auto' }}>
      <Group justify="space-between" align="center">
        <Group gap="sm">
          <ThemeIcon variant="light" color="blue" size="lg" radius="md">
            <IconReceipt size={20} />
          </ThemeIcon>
          <Title order={2} c="#014F86">Invoice Details</Title>
        </Group>
        <Button 
          component={Link} 
          href="../" 
          variant="subtle" 
          leftSection={<IconChevronLeft size={16} />}
          color="gray"
          px={0}
        >
          Back to Invoices
        </Button>
      </Group>

      <Box>
        {item ? (
          <Stack gap="xl">
            {/* Simple Summary Box */}
            <Paper radius="md" withBorder p="xl" bg="white" shadow="sm">
              <Group justify="space-between" align="center">
                <Box>
                  <Text c="dimmed" size="xs" fw={700} tt="uppercase" lts={1} mb={4}>Total Amount</Text>
                  <Title order={2} c="#014F86" style={{ fontSize: '2.5rem', fontWeight: 800, color: '#2C2E33', letterSpacing: '-1px' }}>
                    {item.amount}
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
                  {item.status}
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
                      <Group wrap="nowrap">
                        <ThemeIcon size={48} radius="md" variant="light" color="blue">
                          <IconUser size={24} stroke={1.5} />
                        </ThemeIcon>
                        <Box>
                          <Text size="xs" c="dimmed" tt="uppercase" fw={700} lts={1}>Billed To</Text>
                          <Text size="md" fw={500}>{item.resident}</Text>
                        </Box>
                      </Group>

                      <Group wrap="nowrap">
                        <ThemeIcon size={48} radius="md" variant="light" color="grape">
                          <IconBuildingSkyscraper size={24} stroke={1.5} />
                        </ThemeIcon>
                        <Box>
                          <Text size="xs" c="dimmed" tt="uppercase" fw={700} lts={1}>Unit</Text>
                          <Text size="md" fw={500}>{item.unit}</Text>
                        </Box>
                      </Group>

                      <Group wrap="nowrap">
                        <ThemeIcon size={48} radius="md" variant="light" color="teal">
                          <IconCalendarEvent size={24} stroke={1.5} />
                        </ThemeIcon>
                        <Box>
                          <Text size="xs" c="dimmed" tt="uppercase" fw={700} lts={1}>Issue Date</Text>
                          <Text size="md" fw={500}>{item.date}</Text>
                        </Box>
                      </Group>

                      <Group wrap="nowrap">
                        <ThemeIcon size={48} radius="md" variant="light" color="orange">
                          <IconCalendarEvent size={24} stroke={1.5} />
                        </ThemeIcon>
                        <Box>
                          <Text size="xs" c="dimmed" tt="uppercase" fw={700} lts={1}>Due Date</Text>
                          <Text size="md" fw={500} c={item.status === 'Overdue' ? 'red' : 'dark'}>{item.dueDate}</Text>
                        </Box>
                      </Group>
                    </SimpleGrid>
                  </Box>

                  <Divider color="gray.2" />

                  {/* Items Table */}
                  <Box>
                    <Title order={3} mb="md" style={{ fontWeight: 600 }}>Itemized Breakdown</Title>
                    <Paper radius="md" withBorder>
                      <Table verticalSpacing="md" striped highlightOnHover={false}>
                        <Table.Thead>
                          <Table.Tr>
                            <Table.Th>Description</Table.Th>
                            <Table.Th style={{ textAlign: 'center' }}>Qty</Table.Th>
                            <Table.Th style={{ textAlign: 'right' }}>Price</Table.Th>
                            <Table.Th style={{ textAlign: 'right' }}>Total</Table.Th>
                          </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                          {item.items.map((row, index) => (
                            <Table.Tr key={index}>
                              <Table.Td>
                                <Text fw={500} size="sm">{row.desc}</Text>
                              </Table.Td>
                              <Table.Td style={{ textAlign: 'center' }}>
                                <Text size="sm" c="dimmed">{row.qty}</Text>
                              </Table.Td>
                              <Table.Td style={{ textAlign: 'right' }}>
                                <Text size="sm" c="dimmed">{row.price}</Text>
                              </Table.Td>
                              <Table.Td style={{ textAlign: 'right' }}>
                                <Text fw={600} size="sm">{row.total}</Text>
                              </Table.Td>
                            </Table.Tr>
                          ))}
                        </Table.Tbody>
                      </Table>
                    </Paper>
                  </Box>
                </Stack>
              </Grid.Col>

              <Grid.Col span={{ base: 12, md: 4 }}>
                <Card shadow="sm" padding="xl" radius="xl" withBorder style={{ position: 'sticky', top: 20 }}>
                  <Text size="sm" c="dimmed" tt="uppercase" fw={700} lts={1} mb="xs">Actions & Summary</Text>
                  <Title order={3} mb="xl">Payment</Title>
                  
                  <Stack gap="sm" mb="xl">
                    <Group justify="space-between">
                      <Text c="dimmed" size="sm">Subtotal</Text>
                      <Text fw={500}>{item.amount}</Text>
                    </Group>
                    <Group justify="space-between">
                      <Text c="dimmed" size="sm">Tax (0%)</Text>
                      <Text fw={500}>$0.00</Text>
                    </Group>
                    <Divider my="xs" />
                    <Group justify="space-between" align="center">
                      <Text fw={700} size="lg">Total Due</Text>
                      <Text fw={800} size="xl" c="#014F86">{item.amount}</Text>
                    </Group>
                  </Stack>

                  <Stack gap="md">
                    <Button fullWidth size="lg" radius="md" color="#014F86" leftSection={<IconCreditCard size={20} />}>
                      {item.status === 'Paid' ? 'View Receipt' : 'Pay Now'}
                    </Button>
                    <Button fullWidth variant="light" size="md" radius="md" color="gray" leftSection={<IconDownload size={18} />}>
                      Download PDF
                    </Button>
                    <Button fullWidth variant="subtle" size="md" radius="md" color="gray" leftSection={<IconPrinter size={18} />} onClick={() => window.print()}>
                      Print Invoice
                    </Button>
                  </Stack>
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
              <Title order={3} mt="md">Invoice Not Found</Title>
              <Text c="dimmed" ta="center" maw={400}>The invoice you are looking for might have been removed or the ID is incorrect.</Text>
              <Button component={Link} href="../" variant="light" color="gray" mt="md">Return to Invoices</Button>
            </Stack>
          </Paper>
        )}
      </Box>
    </Stack>
  );
}
