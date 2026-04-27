"use client";

import {  Title, Text, Stack, Paper, Group, ThemeIcon, Button, Divider, Badge, Box, ActionIcon } from "@mantine/core";
import { IconChevronLeft, IconInfoCircle, IconDownload, IconPrinter, IconReceipt } from "@tabler/icons-react";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";
import { useParams } from "next/navigation";

const mockData = [
    { id: "REF-001", unit: "A-101", resident: "U Aung Aung", amount: "$50.00", reason: "Overpayment", date: "2024-10-08", status: "Completed" },
    { id: "REF-002", unit: "B-205", resident: "Daw Su Su", amount: "$25.00", reason: "Deposit Return", date: "2024-10-10", status: "Pending" },
    { id: "REF-003", unit: "C-304", resident: "U Kyaw Min", amount: "$15.00", reason: "Maintenance Error", date: "2024-10-12", status: "Processing" },
    { id: "REF-004", unit: "A-502", resident: "Daw Hla Hla", amount: "$30.00", reason: "Overpayment", date: "2024-10-15", status: "Completed" },
    { id: "REF-005", unit: "D-102", resident: "U Zaw Myo", amount: "$100.00", reason: "Move-out Deposit", date: "2024-10-20", status: "Pending" },
  ];

export default function DetailPage() {
  const { mounted } = useTranslation();
  const params = useParams();
  const id = params.id as string;

  

  const item = mockData.find((d: any) => String(d.id) === String(id));

  return (
    <Stack gap="xl" p="md">
      <Group justify="space-between">
        <Stack gap={4}>
          <Group gap="xs">
            <ThemeIcon variant="light" color="blue" size="lg" radius="md">
              <IconInfoCircle size={20} />
            </ThemeIcon>
            <Title order={2}>Refund Details</Title>
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
                        <Title order={3}>Refund Details</Title>
                        <Text c="dimmed" size="sm">Sky Heaven Residence</Text>
                      </Box>
                    </Group>
                    <Box style={{ textAlign: 'right' }}>
                      <Title order={2} mb={8}>{item.amount || '-'}</Title>
                      <Badge color={(item as any).color || (item.status === 'Paid' || item.status === 'Completed' || item.status === 'Processed' ? 'green' : item.status === 'Overdue' || item.status === 'Failed' ? 'red' : 'orange')} variant="light" size="lg" radius="sm">
                        {item.status || 'Processed'}
                      </Badge>
                    </Box>
                  </Group>

                  <Divider my="xl" variant="dashed" />

                  {/* Key Info Row */}
                  <Group grow align="flex-start" mb="xl">
                    <Box>
                      <Text size="xs" fw={700} c="dimmed" tt="uppercase" lts={1} mb={4}>Reference No.</Text>
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
                    <Text fw={700} size="lg">Total Amount</Text>
                    <Text fw={800} size="xl" c="blue">{item.amount || '-'}</Text>
                  </Group>

                  {/* Print/Footer Note */}
                  <Box mt={40} style={{ textAlign: 'center' }}>
                    <Text size="xs" c="dimmed">
                      If you have any questions about this receipt, please contact support.
                      <br />
                      Thank you for your business!
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
