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
  { name: 'Jan', utilities: 1200, bills: 2000, other: 800 },
  { name: 'Feb', utilities: 1100, bills: 2100, other: 900 },
  { name: 'Mar', utilities: 1000, bills: 1900, other: 850 },
  { name: 'Apr', utilities: 1300, bills: 2000, other: 700 },
  { name: 'May', utilities: 1250, bills: 2100, other: 750 },
  { name: 'Jun', utilities: 1400, bills: 2050, other: 800 },
  { name: 'Jul', utilities: 1350, bills: 2200, other: 850 },
  { name: 'Aug', utilities: 1500, bills: 2100, other: 900 },
  { name: 'Sep', utilities: 1450, bills: 2300, other: 950 },
  { name: 'Oct', utilities: 1600, bills: 2200, other: 1000 },
];

const financeData = [
  { name: 'Jan', income: 4000, expense: 2400 },
  { name: 'Feb', income: 3000, expense: 1398 },
  { name: 'Mar', income: 2000, expense: 9800 },
  { name: 'Apr', income: 2780, expense: 3908 },
  { name: 'May', income: 1890, expense: 4800 },
  { name: 'Jun', income: 2390, expense: 3800 },
  { name: 'Jul', income: 3490, expense: 4300 },
  { name: 'Aug', income: 4100, expense: 2800 },
  { name: 'Sep', income: 3800, expense: 2600 },
  { name: 'Oct', income: 4500, expense: 3100 },
  { name: 'Nov', income: 4800, expense: 3400 },
  { name: 'Dec', income: 5100, expense: 3800 },
];

const bookingData = [
  { name: 'Paid', value: 400 },
  { name: 'Pending', value: 300 },
  { name: 'Overdue', value: 300 },
  { name: 'Cancelled', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export function DashboardCharts({ occupancyCard }: { occupancyCard?: ReactNode }) {
  const theme = useMantineTheme();

  return (
    <Grid gutter="xl">
      {/* Finance Overview (Bar Chart) */}
      <Grid.Col span={{ base: 12, lg: occupancyCard ? 8 : 12 }}>
        <Paper radius="lg" style={{ border: '1px solid #e9ecef', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)' }}>
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
                <Bar dataKey="income" name="Income" fill="#014F86" radius={[4, 4, 0, 0]} barSize={30} />
                <Bar dataKey="expense" name="Expense" fill={theme.colors.red[5]} radius={[4, 4, 0, 0]} barSize={30} />
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

      {/* Billing Trends (Area Chart) */}
      <Grid.Col span={{ base: 12, lg: 8 }}>
        <Paper radius="lg" style={{ border: '1px solid #e9ecef', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)' }}>
          <Box p="lg" style={{ borderBottom: '1px solid #e9ecef', backgroundColor: '#fafafa' }}>
            <Title order={3}>Billing Trends</Title>
            <Text size="xs" c="dimmed" fw={500}>Monthly billing revenue</Text>
          </Box>
          <Box p="md" h={300}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={billingData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorUtilities" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={theme.colors.blue[6]} stopOpacity={0.8}/>
                    <stop offset="95%" stopColor={theme.colors.blue[6]} stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorBills" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={theme.colors.teal[5]} stopOpacity={0.8}/>
                    <stop offset="95%" stopColor={theme.colors.teal[5]} stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorOther" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={theme.colors.orange[5]} stopOpacity={0.8}/>
                    <stop offset="95%" stopColor={theme.colors.orange[5]} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e9ecef" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#868e96', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#868e96', fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  itemStyle={{ fontWeight: 600 }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Area type="monotone" dataKey="other" name="Other" stackId="1" stroke={theme.colors.orange[5]} fillOpacity={1} fill="url(#colorOther)" />
                <Area type="monotone" dataKey="bills" name="Bills" stackId="1" stroke={theme.colors.teal[5]} fillOpacity={1} fill="url(#colorBills)" />
                <Area type="monotone" dataKey="utilities" name="Utilities" stackId="1" stroke={theme.colors.blue[6]} fillOpacity={1} fill="url(#colorUtilities)" />
              </AreaChart>
            </ResponsiveContainer>
          </Box>
        </Paper>
      </Grid.Col>

      {/* Booking Bills (Pie Chart) */}
      <Grid.Col span={{ base: 12, lg: 4 }}>
        <Paper radius="lg" style={{ border: '1px solid #e9ecef', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)', height: '100%' }}>
          <Box p="lg" style={{ borderBottom: '1px solid #e9ecef', backgroundColor: '#fafafa' }}>
            <Title order={3}>Booking Bills</Title>
            <Text size="xs" c="dimmed" fw={500}>Distribution of booking bill statuses</Text>
          </Box>
          <Box p="md" h={300}>
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
