"use client";

import { Paper, Title, Text, Box, Group, Grid, useMantineTheme } from '@mantine/core';
import { ReactNode } from 'react';
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

const COLORS = ['#014F86', '#FF6B6B', '#FFA94D', '#38D9A9'];

export function DashboardCharts({ occupancyCard }: { occupancyCard?: ReactNode }) {
  const theme = useMantineTheme();

  return (
    <Grid gutter="xl">
      {/* Billing Trends (Area Chart) */}
      <Grid.Col span={{ base: 12, lg: occupancyCard ? 8 : 12 }}>
        <Paper radius="md" style={{ border: '1px solid #e9ecef', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)' }}>
          <Box p="lg" style={{ borderBottom: '1px solid #e9ecef', backgroundColor: '#fafafa' }}>
            <Title order={3}>Billing Trends</Title>
            <Text size="xs" c="dimmed" fw={500}>Monthly billing revenue</Text>
          </Box>
          <Box p="md" h={350}>
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
                <Bar dataKey="utilities" name="Utilities" stackId="1" fill="#014F86" maxBarSize={40} />
                <Bar dataKey="bills" name="Bills" stackId="1" fill="#FF6B6B" maxBarSize={40} />
                <Bar dataKey="maintenance" name="Maintenance" stackId="1" fill="#FFA94D" maxBarSize={40} />
                <Bar dataKey="other" name="Other" stackId="1" fill="#38D9A9" maxBarSize={40} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Paper>
      </Grid.Col>

      {/* Occupancy Card slot */}
      {occupancyCard && (
        <Grid.Col span={{ base: 12, lg: 4 }}>
          {occupancyCard}
        </Grid.Col>
      )}

      {/* Finance Overview */}
      <Grid.Col span={{ base: 12, lg: 8 }}>
        <Paper radius="md" style={{ border: '1px solid #e9ecef', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)' }}>
          <Box p="lg" style={{ borderBottom: '1px solid #e9ecef', backgroundColor: '#fafafa' }}>
            <Title order={3}>Finance Overview</Title>
            <Text size="xs" c="dimmed" fw={500}>Income vs Expenses</Text>
          </Box>
          <Box p="md" h={350}>
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
                <Bar dataKey="income" name="Income" fill="#014F86" radius={[4, 4, 0, 0]} maxBarSize={40} />
                <Bar dataKey="expense" name="Expense" fill={theme.colors.red[5]} radius={[4, 4, 0, 0]} maxBarSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Paper>
      </Grid.Col>

      {/* Booking Bills (Pie Chart) */}
      <Grid.Col span={{ base: 12, lg: 4 }}>
        <Paper radius="md" style={{ border: '1px solid #e9ecef', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)', height: '100%' }}>
          <Box p="lg" style={{ borderBottom: '1px solid #e9ecef', backgroundColor: '#fafafa' }}>
            <Title order={3}>Booking Bills</Title>
            <Text size="xs" c="dimmed" fw={500}>Distribution of booking bill statuses</Text>
          </Box>
          <Box p="md" h={350}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={bookingData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
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
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} layout="vertical" verticalAlign="middle" align="right" />
              </PieChart>
            </ResponsiveContainer>
          </Box>
        </Paper>
      </Grid.Col>
    </Grid>
  );
}
