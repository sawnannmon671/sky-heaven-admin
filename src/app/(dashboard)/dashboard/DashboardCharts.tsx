"use client";

import { Paper, Title, Text, Box, Group, SimpleGrid, useMantineTheme } from '@mantine/core';
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
  { name: 'Jan', amount: 4000 },
  { name: 'Feb', amount: 3000 },
  { name: 'Mar', amount: 2000 },
  { name: 'Apr', amount: 2780 },
  { name: 'May', amount: 1890 },
  { name: 'Jun', amount: 2390 },
  { name: 'Jul', amount: 3490 },
];

const financeData = [
  { name: 'Jan', income: 4000, expense: 2400 },
  { name: 'Feb', income: 3000, expense: 1398 },
  { name: 'Mar', income: 2000, expense: 9800 },
  { name: 'Apr', income: 2780, expense: 3908 },
  { name: 'May', income: 1890, expense: 4800 },
  { name: 'Jun', income: 2390, expense: 3800 },
  { name: 'Jul', income: 3490, expense: 4300 },
];

const bookingData = [
  { name: 'Paid', value: 400 },
  { name: 'Pending', value: 300 },
  { name: 'Overdue', value: 300 },
  { name: 'Cancelled', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export function DashboardCharts() {
  const theme = useMantineTheme();

  return (
    <SimpleGrid cols={{ base: 1, lg: 3 }} spacing="xl">
      {/* Billing Trends (Area Chart) */}
      <Paper radius="lg" style={{ border: '1px solid #e9ecef', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)' }}>
        <Box p="lg" style={{ borderBottom: '1px solid #e9ecef', backgroundColor: '#fafafa' }}>
          <Title order={3}>Billing Trends</Title>
          <Text size="xs" c="dimmed" fw={500}>Monthly billing revenue</Text>
        </Box>
        <Box p="md" h={300}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={billingData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={theme.colors.blue[6]} stopOpacity={0.8}/>
                  <stop offset="95%" stopColor={theme.colors.blue[6]} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e9ecef" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#868e96', fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#868e96', fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                itemStyle={{ fontWeight: 600 }}
              />
              <Area type="monotone" dataKey="amount" stroke={theme.colors.blue[6]} strokeWidth={3} fillOpacity={1} fill="url(#colorAmount)" />
            </AreaChart>
          </ResponsiveContainer>
        </Box>
      </Paper>

      {/* Finance Overview (Bar Chart) */}
      <Paper radius="lg" style={{ border: '1px solid #e9ecef', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)' }}>
        <Box p="lg" style={{ borderBottom: '1px solid #e9ecef', backgroundColor: '#fafafa' }}>
          <Title order={3}>Finance Overview</Title>
          <Text size="xs" c="dimmed" fw={500}>Income vs Expenses</Text>
        </Box>
        <Box p="md" h={300}>
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
              <Bar dataKey="income" name="Income" fill={theme.colors.teal[5]} radius={[4, 4, 0, 0]} barSize={20} />
              <Bar dataKey="expense" name="Expense" fill={theme.colors.red[5]} radius={[4, 4, 0, 0]} barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </Paper>

      {/* Booking Bills (Pie Chart) */}
      <Paper radius="lg" style={{ border: '1px solid #e9ecef', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)' }}>
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
    </SimpleGrid>
  );
}
