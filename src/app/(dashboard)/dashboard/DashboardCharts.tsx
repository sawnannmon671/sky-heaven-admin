"use client";

import { Paper, Title, Text, Box, Group, Grid, useMantineTheme, Stack, Progress, Button } from '@mantine/core';
import { ReactNode } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Area,
  AreaChart
} from 'recharts';

const billingData = [
  { name: 'Jan', utilities: 1200, bills: 2000, maintenance: 500, other: 800 },
  { name: 'Feb', utilities: 1100, bills: 2100, maintenance: 600, other: 900 },
  { name: 'Mar', utilities: 1000, bills: 1900, maintenance: 450, other: 850 },
  { name: 'Apr', utilities: 1300, bills: 2000, maintenance: 700, other: 700 },
  { name: 'May', utilities: 1250, bills: 2100, maintenance: 550, other: 750 },
  { name: 'Jun', utilities: 1400, bills: 2050, maintenance: 600, other: 800 },
  { name: 'Jul', utilities: 1350, bills: 2200, maintenance: 650, other: 850 },
  { name: 'Aug', utilities: 1500, bills: 2100, maintenance: 700, other: 900 },
  { name: 'Sep', utilities: 1450, bills: 2300, maintenance: 800, other: 950 },
  { name: 'Oct', utilities: 1600, bills: 2200, maintenance: 750, other: 1000 },
  { name: 'Nov', utilities: 1550, bills: 2400, maintenance: 850, other: 1100 },
  { name: 'Dec', utilities: 1700, bills: 2500, maintenance: 900, other: 1200 },
];

const financeData = [
  { name: 'Jan', income: 4000, expense: 2400 },
  { name: 'Feb', income: 3000, expense: 1398 },
  { name: 'Mar', income: 2000, expense: 9800 },
  { name: 'Apr', income: 2780, expense: 3908 },
  { name: 'May', income: 1890, expense: 4800 },
  { name: 'Jun', income: 2390, expense: 3800 },
];

const bookingData = [
  { name: 'Paid', value: 400 },
  { name: 'Pending', value: 300 },
  { name: 'Overdue', value: 300 },
  { name: 'Cancelled', value: 200 },
];

const COLORS = ['#014F86', '#FF6B6B', '#FFA94D', '#00AC79'];

export function DashboardCharts({ occupancyCard }: { occupancyCard?: ReactNode }) {
  const theme = useMantineTheme();
  const { lang } = useTranslation();

  const t = {
    en: {
      billingTrends: "Billing Trends",
      billingSub: "Monthly billing revenue",
      financeOverview: "Finance Overview",
      financeSub: "Income vs Expenses",
      bookingBills: "Invoice Bills",
      bookingSub: "Distribution of invoice bill statuses",
      labels: {
        utilities: "Utilities",
        bills: "Bills",
        maintenance: "Maintenance",
        other: "Other",
        income: "Income",
        expense: "Expense",
        paid: "Paid",
        pending: "Pending",
        overdue: "Overdue",
        cancelled: "Cancelled"
      }
    },
    mm: {
      billingTrends: "ငွေတောင်းခံမှု အလားအလာများ",
      billingSub: "လစဉ် ငွေတောင်းခံမှု ဝင်ငွေ",
      financeOverview: "ဘဏ္ဍာရေး အကျဉ်းချုပ်",
      financeSub: "ဝင်ငွေ နှင့် အသုံးစရိတ်",
      bookingBills: "ငွေတောင်းခံလွှာများ",
      bookingSub: "ငွေတောင်းခံလွှာ အခြေအနေများ ပြသမှု",
      labels: {
        utilities: "အသုံးအဆောင်များ",
        bills: "ဘေလ်များ",
        maintenance: "ပြုပြင်ထိန်းသိမ်းမှု",
        other: "အခြား",
        income: "ဝင်ငွေ",
        expense: "အသုံးစရိတ်",
        paid: "ပေးချေပြီး",
        pending: "စောင့်ဆိုင်းဆဲ",
        overdue: "ရက်လွန်",
        cancelled: "ပယ်ဖျက်ပြီး"
      }
    }
  }[lang === "mm" ? "mm" : "en"];

  const translatedBookingData = bookingData.map(item => ({
    ...item,
    name: t.labels[item.name.toLowerCase() as keyof typeof t.labels] || item.name
  }));

  return (
    <Grid gutter="xl">
      {/* Finance Overview */}
      <Grid.Col span={{ base: 12, lg: 8 }}>
        <Paper radius="md" style={{ border: '2px solid #dee2e6', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)', height: '470px' }}>
           <Box p="lg">
            <Group justify="space-between">
              <Stack gap={0}>
                <Title order={3}>{t.financeOverview}</Title>
                <Text size="xs" c="dimmed" fw={500}>{t.financeSub}</Text>
              </Stack>
              <Button variant="light" size="compact-xs" color="blue" radius="md">View Detail</Button>
            </Group>
          </Box>
          <Box p="md" style={{ height: 'calc(22.75rem * var(--mantine-scale))' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={financeData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e9ecef" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#868e96', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#868e96', fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  cursor={{ fill: '#f8f9fa' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Bar dataKey="income" name={t.labels.income} fill="#014F86" radius={[4, 4, 0, 0]} maxBarSize={40} />
                <Bar dataKey="expense" name={t.labels.expense} fill={theme.colors.red[5]} radius={[4, 4, 0, 0]} maxBarSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Paper>
      </Grid.Col>

      {/* Invoice Bills (Pie Chart) */}
      <Grid.Col span={{ base: 12, lg: 4 }}>
        <Paper radius="md" style={{ border: '2px solid #dee2e6', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)', height: '470px' }}>
           <Box p="lg">
            <Group justify="space-between">
              <Stack gap={0}>
                <Title order={3}>{t.bookingBills}</Title>
                <Text size="xs" c="dimmed" fw={500}>{t.bookingSub}</Text>
              </Stack>
              <Button variant="light" size="compact-xs" color="blue" radius="md">View Detail</Button>
            </Group>
          </Box>
          <Box p="xl">
            <Box h={200} style={{ position: 'relative' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={translatedBookingData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {bookingData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <Stack gap={0} align="center" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none' }}>
                <Text ta="center" style={{ fontSize: '1.8rem', fontWeight: 900, lineHeight: 1.2 }}>1.2K</Text>
                <Text ta="center" size="xs" c="dimmed" fw={700} tt="uppercase" lts={1}>Total</Text>
              </Stack>
            </Box>
            
            <Stack gap="sm">
              {translatedBookingData.map((item, index) => {
                const percentage = Math.round((item.value / 1200) * 100);
                return (
                  <Group justify="space-between" mb={-5} key={item.name}>
                    <Group gap="xs">
                      <Box w={10} h={10} style={{ borderRadius: '50%', backgroundColor: COLORS[index % COLORS.length] }} />
                      <Text size="xs" fw={600}>{item.name}</Text>
                    </Group>
                    <Text size="xs" fw={800}>{item.value}</Text>
                  </Group>
                );
              })}
              <Progress.Root size="md" radius="xl" mt="xs">
                {translatedBookingData.map((item, index) => (
                  <Progress.Section 
                    key={item.name} 
                    value={Math.round((item.value / 1200) * 100)} 
                    color={COLORS[index % COLORS.length]} 
                  />
                ))}
              </Progress.Root>
            </Stack>
          </Box>
        </Paper>
      </Grid.Col>

      {/* Occupancy Card slot */}
      {occupancyCard && (
        <Grid.Col span={{ base: 12, lg: 4 }}>
          {occupancyCard}
        </Grid.Col>
      )}

      {/* Billing Trends (Bar Chart) - moved to bottom */}
      <Grid.Col span={{ base: 12 }}>
        <Paper radius="md" style={{ border: '2px solid #dee2e6', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)', height: '470px' }}>
           <Box p="lg">
            <Group justify="space-between">
              <Stack gap={0}>
                <Title order={3}>{t.billingTrends}</Title>
                <Text size="xs" c="dimmed" fw={500}>{t.billingSub}</Text>
              </Stack>
              <Button variant="light" size="compact-xs" color="blue" radius="md">View Detail</Button>
            </Group>
          </Box>
          <Box p="md" style={{ height: 'calc(22.75rem * var(--mantine-scale))' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={billingData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e9ecef" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#868e96', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#868e96', fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  itemStyle={{ fontWeight: 600 }}
                  cursor={{ fill: 'transparent' }}
                />
                <Legend iconType="square" wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Bar dataKey="utilities" name={t.labels.utilities} stackId="1" fill="#014F86" maxBarSize={40} />
                <Bar dataKey="bills" name={t.labels.bills} stackId="1" fill="#FF6B6B" maxBarSize={40} />
                <Bar dataKey="maintenance" name={t.labels.maintenance} stackId="1" fill="#FFA94D" maxBarSize={40} />
                <Bar dataKey="other" name={t.labels.other} stackId="1" fill="#00AC79" maxBarSize={40} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Paper>
      </Grid.Col>
    </Grid>
  );
}
