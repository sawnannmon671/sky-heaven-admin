"use client";

import {  Title, Text, Stack, Paper, Group, ThemeIcon, Button, Divider, Badge, Box, ActionIcon } from "@mantine/core";
import { IconChevronLeft, IconInfoCircle, IconDownload, IconPrinter, IconReceipt } from "@tabler/icons-react";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";
import { useParams } from "next/navigation";

const mockData = [
    { id: "MF-2024-001", unit: "A-101", amount: "$50.00", month: "October 2024", dueDate: "2024-10-05", status: "Paid" },
    { id: "MF-2024-002", unit: "B-205", amount: "$60.00", month: "October 2024", dueDate: "2024-10-05", status: "Unpaid" },
    { id: "MF-2024-003", unit: "C-304", amount: "$55.00", month: "October 2024", dueDate: "2024-10-05", status: "Paid" },
    { id: "MF-2024-004", unit: "A-502", amount: "$50.00", month: "October 2024", dueDate: "2024-10-05", status: "Overdue" },
    { id: "MF-2024-005", unit: "D-102", amount: "$70.00", month: "October 2024", dueDate: "2024-10-05", status: "Paid" },
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
            <Title order={2}>Monthly Maintenance Fees Details</Title>
          </Group>
          <Text c="dimmed" size="sm">Viewing details for ID: {id}</Text>
        </Stack>
        <Group>
          <Button 
            variant="outline" 
            leftSection={<IconPrinter size={16} />}
            color="gray"
            onClick={() => window.print()}
          >
            Print
          </Button>
          <Button 
            variant="filled" 
            leftSection={<IconDownload size={16} />}
            color="blue"
          >
            Download PDF
          </Button>
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
      </Group>

      <Box>
        {item ? (() => {
            const entries = Object.entries(item).filter(([k, v]) => k !== 'color' && k !== 'icon' && typeof v !== 'object' && k !== 'id' && k !== 'status' && k !== 'amount');

            return (
              <Box style={{ maxWidth: 800, margin: '0 auto' }}>
                <Paper p="xl" radius="md" withBorder shadow="md" style={{ backgroundColor: '#ffffff' }}>
                  {/* Receipt Header */}
                  <Group justify="space-between" align="flex-start" mb="xl">
                    <Group gap="md">
                      <ThemeIcon size={50} radius="md" color="blue" variant="light">
                        <IconReceipt size={30} />
                      </ThemeIcon>
                      <Box>
                        <Title order={3}>Maintenance Fee</Title>
                        <Text c="dimmed" size="sm">Sky Heaven Residence</Text>
                      </Box>
                    </Group>
                    <Box style={{ textAlign: 'right' }}>
                      <Title order={2} mb={8}>{item.amount}</Title>
                      <Badge color={(item as any).color || (item.status === 'Paid' ? 'green' : item.status === 'Overdue' ? 'red' : 'orange')} variant="light" size="lg" radius="sm">
                        {item.status}
                      </Badge>
                    </Box>
                  </Group>

                  <Divider my="xl" variant="dashed" />

                  {/* Key Info Row */}
                  <Group grow align="flex-start" mb="xl">
                    <Box>
                      <Text size="xs" fw={700} c="dimmed" tt="uppercase" lts={1} mb={4}>Invoice No.</Text>
                      <Text size="md" fw={600}>{item.id}</Text>
                    </Box>
                    <Box>
                      <Text size="xs" fw={700} c="dimmed" tt="uppercase" lts={1} mb={4}>Date Issued</Text>
                      <Text size="md" fw={600}>{new Date().toISOString().split('T')[0]}</Text>
                    </Box>
                  </Group>

                  {/* Detail List */}
                  <Stack gap="md" mt="xl">
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

                  <Divider my="xl" />

                  {/* Total Footer */}
                  <Group justify="space-between" align="center">
                    <Text fw={700} size="lg">Total Amount Due</Text>
                    <Text fw={800} size="xl" c="blue">{item.amount}</Text>
                  </Group>

                  {/* Print/Footer Note */}
                  <Box mt={40} style={{ textAlign: 'center' }}>
                    <Text size="xs" c="dimmed">
                      If you have any questions about this invoice, please contact support.
                      <br />
                      Thank you for your payment!
                    </Text>
                  </Box>
                </Paper>
              </Box>
            );
          })() : (
          <Paper p="xl" radius="md" withBorder shadow="sm" style={{ backgroundColor: '#ffffff' }}>
            <Text c="dimmed" ta="center" py="xl">Record not found.</Text>
          </Paper>
        )}
      </Box>
    </Stack>
  );
}
