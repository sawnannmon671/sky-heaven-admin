"use client";

import { Title, Text, Stack, Paper, Group, ThemeIcon, Button, Grid, Badge, Box, Divider, Table } from "@mantine/core";
import { IconChevronLeft, IconTools, IconFileDescription, IconPrinter, IconDownload, IconCheck, IconAlertTriangle } from "@tabler/icons-react";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function MaintenanceFeeDetailPage() {
  const { lang, mounted } = useTranslation();
  const params = useParams();
  const id = params.id as string;

  if (!mounted) return null;

  const t = {
    en: {
      title: "Maintenance Fee Details",
      subtitle: "Viewing details for maintenance fee",
      back: "Back to List",
      summary: "Fee Summary",
      summaryDesc: "Overview of the current fee. Use the actions below to manage this entry.",
      print: "Print Invoice",
      download: "Download PDF",
      markPaid: "Mark as Paid",
      sendReminder: "Send Reminder",
      feeId: "Fee ID",
      unit: "Unit",
      month: "Billing Month",
      dueDate: "Due Date",
      amount: "Total Amount",
      status: "Status",
      resident: "Resident Name",
      paymentMethod: "Payment Method",
      paidDate: "Paid Date",
      description: "Description",
      breakdown: "Fee Breakdown",
      subtotal: "Subtotal",
      lateFee: "Late Fee",
      total: "Total",
    },
    mm: {
      title: "လစဉ်ထိန်းသိမ်းခ အသေးစိတ်",
      subtitle: "လစဉ်ထိန်းသိမ်းခ အသေးစိတ်ကို ကြည့်ရှုနေသည်",
      back: "စာရင်းသို့ ပြန်သွားရန်",
      summary: "အခကြေးငွေ အကျဉ်းချုပ်",
      summaryDesc: "လက်ရှိအခကြေးငွေ အကျဉ်းချုပ်။ ဤအချက်အလက်ကို စီမံရန် အောက်ပါလုပ်ဆောင်ချက်များကို အသုံးပြုပါ။",
      print: "ဘေလ်ကို ပရင့်ထုတ်ရန်",
      download: "PDF ဒေါင်းလုဒ်လုပ်ရန်",
      markPaid: "ငွေပေးချေပြီးအဖြစ် သတ်မှတ်ရန်",
      sendReminder: "သတိပေးချက် ပို့ရန်",
      feeId: "အခကြေးငွေ ID",
      unit: "အခန်း",
      month: "ကျသင့်လ",
      dueDate: "ပေးသွင်းရမည့်ရက်",
      amount: "စုစုပေါင်းပမာဏ",
      status: "အခြေအနေ",
      resident: "နေထိုင်သူအမည်",
      paymentMethod: "ငွေပေးချေမှုနည်းလမ်း",
      paidDate: "ပေးချေသည့်ရက်",
      description: "ဖော်ပြချက်",
      breakdown: "အခကြေးငွေ အသေးစိတ်ခွဲခြမ်းစိတ်ဖြာချက်",
      subtotal: "စုစုပေါင်း (အကြမ်း)",
      lateFee: "နောက်ကျကြေး",
      total: "စုစုပေါင်း",
    }
  }[lang === "mm" ? "mm" : "en"];

  // Mock specific data based on ID (to match the list view)
  const mockDatabase: Record<string, any> = {
    "MF-2024-001": { unit: "A-101", amount: 50.00, month: "October 2024", dueDate: "2024-10-05", status: "Paid", resident: "Aung Aung", paymentMethod: "AYA Pay", paidDate: "2024-10-03" },
    "MF-2024-002": { unit: "B-205", amount: 60.00, month: "October 2024", dueDate: "2024-10-05", status: "Unpaid", resident: "Mya Mya", paymentMethod: "-", paidDate: "-" },
    "MF-2024-003": { unit: "C-304", amount: 55.00, month: "October 2024", dueDate: "2024-10-05", status: "Paid", resident: "Kyaw Kyaw", paymentMethod: "KBZPay", paidDate: "2024-10-04" },
    "MF-2024-004": { unit: "A-502", amount: 50.00, month: "October 2024", dueDate: "2024-10-05", status: "Overdue", resident: "Su Su", paymentMethod: "-", paidDate: "-" },
    "MF-2024-005": { unit: "D-102", amount: 70.00, month: "October 2024", dueDate: "2024-10-05", status: "Paid", resident: "Zaw Zaw", paymentMethod: "Cash", paidDate: "2024-10-01" },
  };

  // Fallback for random IDs
  const data = mockDatabase[id] || { 
    unit: "Unknown", 
    amount: 50.00, 
    month: "October 2024", 
    dueDate: "2024-10-05", 
    status: "Unpaid",
    resident: "Resident User",
    paymentMethod: "-",
    paidDate: "-"
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid': return 'green';
      case 'Overdue': return 'red';
      case 'Unpaid': return 'orange';
      default: return 'gray';
    }
  };

  const isOverdue = data.status === 'Overdue';
  const totalAmount = isOverdue ? data.amount + 10 : data.amount;

  return (
    <Stack gap="xl" p="md">
      <Group justify="space-between">
        <Stack gap={4}>
          <Group gap="xs">
            <ThemeIcon variant="light" color="teal" size="lg" radius="md">
              <IconTools size={20} />
            </ThemeIcon>
            <Title order={1}>{t.title}</Title>
          </Group>
          <Text c="dimmed" size="md">{t.subtitle}: {id}</Text>
        </Stack>
        <Button 
          component={Link} 
          href="../" 
          variant="subtle" 
          leftSection={<IconChevronLeft size={16} />}
          color="gray"
        >
          {t.back}
        </Button>
      </Group>

      <Grid>
        <Grid.Col span={{ base: 12, md: 8 }}>
          <Paper p="xl" radius="lg" withBorder shadow="sm" style={{ border: '1px solid #e9ecef' }}>
            <Stack gap="lg">
              <Group justify="space-between" align="flex-start">
                <div>
                  <Text size="xs" tt="uppercase" fw={700} c="dimmed">{t.feeId}</Text>
                  <Text size="xl" fw={700} mt={4}>{id}</Text>
                </div>
                <Badge size="xl" variant="light" color={getStatusColor(data.status)}>
                  {data.status}
                </Badge>
              </Group>

              <Divider />

              <Grid>
                <Grid.Col span={6}>
                  <Text size="sm" c="dimmed" mb={4}>{t.unit}</Text>
                  <Text fw={600} size="lg">{data.unit}</Text>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Text size="sm" c="dimmed" mb={4}>{t.resident}</Text>
                  <Text fw={500}>{data.resident}</Text>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Text size="sm" c="dimmed" mb={4}>{t.month}</Text>
                  <Text fw={500}>{data.month}</Text>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Text size="sm" c="dimmed" mb={4}>{t.dueDate}</Text>
                  <Text fw={500} c={isOverdue ? 'red' : 'dark'}>{data.dueDate}</Text>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Text size="sm" c="dimmed" mb={4}>{t.paymentMethod}</Text>
                  <Text fw={500}>{data.paymentMethod}</Text>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Text size="sm" c="dimmed" mb={4}>{t.paidDate}</Text>
                  <Text fw={500}>{data.paidDate}</Text>
                </Grid.Col>
              </Grid>

              <Box mt="md">
                <Text size="sm" c="dimmed" mb={8} fw={600}>{t.breakdown}</Text>
                <Paper withBorder radius="md">
                  <Table>
                    <Table.Tbody>
                      <Table.Tr>
                        <Table.Td><Text fw={500}>Base Maintenance Fee</Text></Table.Td>
                        <Table.Td ta="right"><Text>${data.amount.toFixed(2)}</Text></Table.Td>
                      </Table.Tr>
                      {isOverdue && (
                        <Table.Tr>
                          <Table.Td><Text fw={500} c="red">{t.lateFee}</Text></Table.Td>
                          <Table.Td ta="right"><Text c="red">$10.00</Text></Table.Td>
                        </Table.Tr>
                      )}
                      <Table.Tr bg="gray.0">
                        <Table.Td><Text fw={700}>{t.total}</Text></Table.Td>
                        <Table.Td ta="right"><Text fw={700} size="lg" c="teal.7">${totalAmount.toFixed(2)}</Text></Table.Td>
                      </Table.Tr>
                    </Table.Tbody>
                  </Table>
                </Paper>
              </Box>

              <Box mt="xs">
                <Text size="sm" c="dimmed" mb={8}>{t.description}</Text>
                <Paper p="md" bg="gray.0" radius="md">
                  <Text size="sm">
                    Regular monthly maintenance fee covering building security, cleaning of common areas, elevator maintenance, and garbage disposal.
                  </Text>
                </Paper>
              </Box>
            </Stack>
          </Paper>
        </Grid.Col>
        
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Paper p="xl" radius="lg" withBorder shadow="sm" style={{ border: '1px solid #e9ecef' }}>
            <Stack gap="md">
              <Group gap="xs">
                <IconFileDescription size={20} color="gray" />
                <Title order={4}>{t.summary}</Title>
              </Group>
              <Text size="sm" c="dimmed">
                {t.summaryDesc}
              </Text>
              
              <Divider my="sm" />
              
              <Button fullWidth color="gray" variant="outline" leftSection={<IconPrinter size={16} />}>
                {t.print}
              </Button>
              <Button fullWidth color="gray" variant="outline" leftSection={<IconDownload size={16} />}>
                {t.download}
              </Button>
              
              {data.status !== 'Paid' && (
                <>
                  <Divider my="sm" />
                  <Button fullWidth color="teal" leftSection={<IconCheck size={16} />}>
                    {t.markPaid}
                  </Button>
                  <Button fullWidth variant="light" color="orange" leftSection={<IconAlertTriangle size={16} />}>
                    {t.sendReminder}
                  </Button>
                </>
              )}
            </Stack>
          </Paper>
        </Grid.Col>
      </Grid>
    </Stack>
  );
}
