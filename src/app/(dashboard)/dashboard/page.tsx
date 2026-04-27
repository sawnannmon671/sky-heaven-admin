"use client";

import {
  Grid,
  Paper,
  Title,
  Text,
  Group,
  Badge,
  Stack,
  RingProgress,
  ThemeIcon,
  Table,
  Button,
  Avatar,
  Box,
  Progress,
  SimpleGrid,
  ActionIcon,
  List,
  ScrollArea,
} from "@mantine/core";
import {
  IconUsers,
  IconBuilding,
  IconTools,
  IconReceipt,
  IconTrendingUp,
  IconArrowUpRight,
  IconArrowDownRight,
  IconCircleCheck,
  IconClock,
  IconBell,
  IconAlertTriangle,
  IconMessageCircle,
} from "@tabler/icons-react";
import { useTranslation } from "@/hooks/useTranslation";
import { DashboardCharts } from "./DashboardCharts";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const stats = [
  {
    id: "occupancy_rate",
    title: "Occupancy Rate",
    value: "85%",
    diff: 5,
    icon: IconBuilding,
    color: "#014F86",
    description: "Up from 80% last month",
  },
  {
    id: "pending_payments",
    title: "Pending Payments",
    value: "12",
    diff: -8,
    icon: IconReceipt,
    color: "#FF6B6B",
    description: "3 overdue by 7+ days",
  },
  {
    id: "maintenance_tickets",
    title: "Open Maintenance",
    value: "8",
    diff: -15,
    icon: IconTools,
    color: "#FFA94D",
    description: "2 emergency, 6 normal",
  },
  {
    id: "active_residents",
    title: "Active Residents",
    value: "245",
    diff: 2,
    icon: IconUsers,
    color: "#38D9A9",
    description: "2 new move-ins this week",
  },
];

const recentVisitors = [
  { id: 1, name: "David Miller", host: "A-202", time: "10:15 AM", type: "Guest", status: "In" },
  { id: 2, name: "Wilson Delivery", host: "B-501", time: "09:45 AM", type: "Delivery", status: "Out" },
  { id: 3, name: "Amanda Chen", host: "C-104", time: "09:30 AM", type: "Guest", status: "In" },
  { id: 4, name: "Total Security", host: "System", time: "08:00 AM", type: "Service", status: "Out" },
];

const alerts = [
  { id: 1, title: "Fire Alarm Test", msg: "Scheduled for Block A tomorrow at 10 AM", time: "1 hour ago", type: "info", icon: IconBell },
  { id: 2, title: "Water Interruption", msg: "Emergency repair in Block B, Level 3", time: "3 hours ago", type: "error", icon: IconAlertTriangle },
  { id: 3, title: "New Message", msg: "Resident from C-303 sent a query", time: "5 hours ago", type: "success", icon: IconMessageCircle },
];

const recentActivities = [
  { id: 1, user: "John Doe", unit: "A-101", activity: "Maintenance", status: "In Progress", date: "2 hours ago", color: "blue" },
  { id: 2, user: "Sarah Smith", unit: "B-205", activity: "Payment", status: "Completed", date: "5 hours ago", color: "green" },
  { id: 3, user: "Michael Wong", unit: "C-303", activity: "Registration", status: "New", date: "1 day ago", color: "violet" },
  { id: 4, user: "Elena Rodriguez", unit: "A-404", activity: "Visitor", status: "Checked Out", date: "2 days ago", color: "orange" },
];

const translations = {
  en: {
    pageTitle: "Dashboard Overview",
    pageSubtitle: "Monitor your property performance and recent activities at a glance.",
    lastUpdate: "Last Update",
    stats: {
      occupancy_rate: "Occupancy Rate",
      active_residents: "Active Residents",
      maintenance_tickets: "Maintenance Tickets",
      pending_payments: "Pending Payments",
      desc_occupancy: "Up from 80% last month",
      desc_residents: "2 new move-ins this week",
      desc_maintenance: "2 emergency, 6 normal",
      desc_payments: "3 overdue by 7+ days",
    },
    visitors: {
      title: "Recent Visitors",
      thName: "Visitor Name",
      thHost: "Host Unit",
      thTime: "Entry Time",
      thType: "Type",
      thStatus: "Status",
    },
    alerts: {
      title: "Alerts & Notifications",
      viewAll: "Clear All",
    },
    activities: {
      title: "Recent Activities",
      subtitle: "Latest events across all departments",
      viewAll: "View All Activity",
      thUser: "User / Resident",
      thType: "Activity Type",
      thStatus: "Current Status",
      thTime: "Time Elapsed",
      types: {
        Maintenance: "Maintenance",
        Payment: "Payment",
        Registration: "Registration",
        Visitor: "Visitor",
      },
      status: {
        "In Progress": "In Progress",
        "Completed": "Completed",
        "New": "New",
        "Checked Out": "Checked Out",
      },
      times: {
        "2 hours ago": "2 hours ago",
        "5 hours ago": "5 hours ago",
        "1 day ago": "1 day ago",
        "2 days ago": "2 days ago",
      }
    },
    occupancy: {
      title: "Occupancy Rate",
      occupied: "Occupied",
      available: "Available Units",
      maintenance: "Under Maintenance"
    },
    revenue: {
      title: "Revenue Target",
      progress: "Progress to Goal",
      remaining: "$12,500 remaining to reach April goal",
    }
  },
  mm: {
    pageTitle: "ဒက်ရှ်ဘုတ်အကျဉ်းချုပ်",
    pageSubtitle: "သင်၏အိမ်ခြံမြေလုပ်ဆောင်ချက်များနှင့် လတ်တလောလှုပ်ရှားမှုများကို တစ်နေရာတည်းတွင် ကြည့်ရှုပါ။",
    lastUpdate: "နောက်ဆုံးပြင်ဆင်ချိန်",
    stats: {
      occupancy_rate: "နေထိုင်မှုနှုန်း",
      active_residents: "နေထိုင်သူဦးရေ",
      maintenance_tickets: "ပြုပြင်ထိန်းသိမ်းမှုလက်မှတ်များ",
      pending_payments: "ပေးဆောင်ရန်ကျန်ငွေများ",
      desc_occupancy: "ပြီးခဲ့သည့်လက ၈၀% မှ မြင့်တက်လာသည်",
      desc_residents: "ယခုအပတ်တွင် အသစ် ၂ ဦး ပြောင်းရွှေ့လာသည်",
      desc_maintenance: "အရေးပေါ် ၂ ခု၊ ပုံမှန် ၆ ခု",
      desc_payments: "၇ ရက်ကျော် နောက်ကျနေသော ၃ ခု",
    },
    visitors: {
      title: "လတ်တလောဧည့်သည်များ",
      thName: "ဧည့်သည်အမည်",
      thHost: "နေထိုင်သူယူနစ်",
      thTime: "ဝင်ရောက်ချိန်",
      thType: "အမျိုးအစား",
      thStatus: "အခြေအနေ",
    },
    alerts: {
      title: "သတိပေးချက်များနှင့် အကြောင်းကြားစာများ",
      viewAll: "အားလုံးဖျက်ရန်",
    },
    activities: {
      title: "လတ်တလောလှုပ်ရှားမှုများ",
      subtitle: "ဌာနအားလုံးမှ နောက်ဆုံးဖြစ်ရပ်များ",
      viewAll: "လှုပ်ရှားမှုအားလုံးကြည့်ရန်",
      thUser: "အသုံးပြုသူ / နေထိုင်သူ",
      thType: "လှုပ်ရှားမှုအမျိုးအစား",
      thStatus: "လက်ရှိအခြေအနေ",
      thTime: "ကြာမြင့်ချိန်",
      types: {
        Maintenance: "ပြုပြင်ထိန်းသိမ်းမှု",
        Payment: "ငွေပေးချေမှု",
        Registration: "မှတ်ပုံတင်ခြင်း",
        Visitor: "ဧည့်သည်",
      },
      status: {
        "In Progress": "လုပ်ဆောင်ဆဲ",
        "Completed": "ပြီးစီး",
        "New": "အသစ်",
        "Checked Out": "ထွက်ခွာပြီး",
      },
      times: {
        "2 hours ago": "၂ နာရီအလို",
        "5 hours ago": "၅ နာရီအလို",
        "1 day ago": "၁ ရက်အလို",
        "2 days ago": "၂ ရက်အလို",
      }
    },
    occupancy: {
      title: "နေထိုင်မှုနှုန်း",
      occupied: "နေထိုင်သူရှိသည်",
      available: "အားလပ်သောယူနစ်များ",
      maintenance: "ပြုပြင်နေဆဲ"
    },
    revenue: {
      title: "ဝင်ငွေရည်မှန်းချက်",
      progress: "ရည်မှန်းချက်သို့ရောက်ရှိမှု",
      remaining: "ဧပြီလရည်မှန်းချက်ပြည့်မီရန် $12,500 လိုအပ်သည်",
    }
  }
};

export default function DashboardPage() {
  const { lang, mounted } = useTranslation();
  const t = translations[lang];

  

  const cards = stats.map((stat) => {
    const Icon = stat.icon;
    const DiffIcon = stat.diff > 0 ? IconArrowUpRight : IconArrowDownRight;
    
    // Map descriptions to translation keys
    const descKey = stat.id === "occupancy_rate" ? "desc_occupancy" :
                    stat.id === "active_residents" ? "desc_residents" :
                    stat.id === "maintenance_tickets" ? "desc_maintenance" : "desc_payments";

    return (
      <Paper 
        p="xl" 
        radius="md" 
        key={stat.id} 
        style={{ 
          border: '1px solid rgba(255,255,255,0.2)',
          backgroundColor: stat.color,
          color: 'white',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          cursor: 'pointer',
          position: 'relative',
          overflow: 'hidden'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-4px)';
          e.currentTarget.style.boxShadow = `0 10px 25px ${stat.color}66`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
        }}
      >
        <Group justify="space-between" align="center" mb="lg">
          <Stack gap={0}>
            <Text size="sm" c="rgba(255,255,255,0.9)" fw={600} tt="uppercase" lts={1}>
              {t.stats[stat.id as keyof typeof t.stats]}
            </Text>
            <Title order={2} style={{ fontSize: '2rem', fontWeight: 800 }}>
              {stat.value}
            </Title>
          </Stack>
          <ThemeIcon
            size="xl"
            radius="md"
            variant="transparent"
          >
            <Icon size={36} color="rgba(255,255,255,0.8)" stroke={1.5} />
          </ThemeIcon>
        </Group>

        <Group justify="space-between" align="center">
          <Text c="rgba(255,255,255,0.8)" size="xs" fw={500}>
            {t.stats[descKey as keyof typeof t.stats]}
          </Text>
          <Badge
            variant="transparent"
            size="sm"
            leftSection={<DiffIcon size={12} />}
            style={{ fontWeight: 700, color: 'white', backgroundColor: 'rgba(255,255,255,0.2)' }}
          >
            {Math.abs(stat.diff)}%
          </Badge>
        </Group>
      </Paper>
    );
  });

  return (
    <Stack gap="xl" p="md">
      <Group justify="space-between" align="flex-end">
        <Stack gap={4}>
          <Title order={2}>{t.pageTitle}</Title>
          <Text c="dimmed" size="md" fw={500}>{t.pageSubtitle}</Text>
        </Stack>
        <Paper withBorder px="md" py="xs" radius="md" bg="gray.0">
          <Group gap="xs">
            <IconClock size={16} color="var(--mantine-color-blue-6)" />
            <Text size="xs" fw={700} c="dimmed">{t.lastUpdate}: April 24, 2026</Text>
          </Group>
        </Paper>
      </Group>

      <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="lg">
        {cards}
      </SimpleGrid>

      <DashboardCharts occupancyCard={
        <Paper radius="md" style={{ border: '1px solid #e9ecef', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)', height: '100%' }}>
          <Box p="lg" style={{ borderBottom: '1px solid #e9ecef', backgroundColor: '#fafafa' }}>
            <Group justify="space-between">
              <Title order={3}>{t.alerts.title}</Title>
              <ActionIcon variant="light" color="gray" radius="md">
                <IconBell size={18} />
              </ActionIcon>
            </Group>
          </Box>
          <Stack gap="0">
            {alerts.map((alert, index) => {
              const Icon = alert.icon;
              return (
                <Box 
                  key={alert.id} 
                  p="lg" 
                  style={{ 
                    borderBottom: index === alerts.length - 1 ? 'none' : '1px solid #f1f3f5',
                    backgroundColor: alert.type === 'error' ? 'var(--mantine-color-red-0)' : 'transparent',
                    transition: 'background-color 0.2s ease',
                    cursor: 'pointer'
                  }}
                >
                  <Group wrap="nowrap" align="flex-start" gap="md">
                    <ThemeIcon color={alert.type === 'info' ? 'blue' : alert.type === 'error' ? 'red' : 'green'} variant="light" size="md" radius="md">
                      <Icon size={16} />
                    </ThemeIcon>
                    <Stack gap={4}>
                      <Text size="sm" fw={700}>{alert.title}</Text>
                      <Text size="xs" c="dimmed" style={{ lineHeight: 1.4 }}>{alert.msg}</Text>
                      <Text size="xs" c="dimmed" fw={600} mt={4}>{alert.time}</Text>
                    </Stack>
                  </Group>
                </Box>
              );
            })}
          </Stack>
          <Box p="sm" bg="gray.0" style={{ textAlign: 'center', borderTop: '1px solid #f1f3f5' }}>
            <Button variant="subtle" size="xs" color="blue" fullWidth>{t.alerts.viewAll}</Button>
          </Box>
        </Paper>
      } />

      <Grid gutter="xl">
        <Grid.Col span={{ base: 12, lg: 8 }}>
          <Stack gap="xl">
            {/* Recent Activities */}
            <Paper radius="md" style={{ border: '1px solid #e9ecef', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)' }}>
              <Box p="lg" style={{ borderBottom: '1px solid #e9ecef', backgroundColor: '#fafafa' }}>
                <Group justify="space-between">
                  <Stack gap={0}>
                    <Title order={3}>{t.activities.title}</Title>
                    <Text size="xs" c="dimmed" fw={500}>{t.activities.subtitle}</Text>
                  </Stack>
                  <Button variant="light" size="xs" color="blue" radius="md">{t.activities.viewAll}</Button>
                </Group>
              </Box>
              <ScrollArea>
                <Table verticalSpacing="md" horizontalSpacing="lg" highlightOnHover>
                  <Table.Thead bg="gray.0">
                    <Table.Tr>
                      <Table.Th fw={700} fz="sm" c="dark">{t.activities.thUser}</Table.Th>
                      <Table.Th fw={700} fz="sm" c="dark">{t.activities.thType}</Table.Th>
                      <Table.Th fw={700} fz="sm" c="dark">{t.activities.thStatus}</Table.Th>
                      <Table.Th ta="right" fw={700} fz="sm" c="dark">{t.activities.thTime}</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {recentActivities.map((item) => (
                      <Table.Tr key={item.id} style={{ transition: 'background-color 0.2s ease' }}>
                        <Table.Td>
                          <Group gap="sm">
                            <Avatar color={item.color} radius="md" size="sm" variant="light" fw={700}>{item.user[0]}</Avatar>
                            <div>
                              <Text size="sm" fw={600}>{item.user}</Text>
                              <Text size="xs" c="dimmed">{item.unit}</Text>
                            </div>
                          </Group>
                        </Table.Td>
                        <Table.Td>
                          <Text size="sm" fw={500}>{t.activities.types[item.activity as keyof typeof t.activities.types] || item.activity}</Text>
                        </Table.Td>
                        <Table.Td>
                          <Badge color={item.color} variant="light" size="sm" radius="sm" fw={700}>
                            {t.activities.status[item.status as keyof typeof t.activities.status] || item.status}
                          </Badge>
                        </Table.Td>
                        <Table.Td ta="right">
                          <Text size="xs" c="dimmed" fw={500}>{t.activities.times[item.date as keyof typeof t.activities.times] || item.date}</Text>
                        </Table.Td>
                      </Table.Tr>
                    ))}
                  </Table.Tbody>
                </Table>
              </ScrollArea>
            </Paper>

            {/* Recent Visitors */}
            <Paper radius="md" style={{ border: '1px solid #e9ecef', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)' }}>
              <Box p="lg" style={{ borderBottom: '1px solid #e9ecef', backgroundColor: '#fafafa' }}>
                <Group justify="space-between">
                  <Title order={3}>{t.visitors.title}</Title>
                  <Button variant="light" size="xs" color="blue" radius="md">View History</Button>
                </Group>
              </Box>
              <ScrollArea>
                <Table verticalSpacing="md" horizontalSpacing="lg" highlightOnHover>
                  <Table.Thead bg="gray.0">
                  <Table.Tr>
                     <Table.Th fw={700} fz="sm" c="dark">{t.visitors.thName}</Table.Th>
                     <Table.Th fw={700} fz="sm" c="dark">{t.visitors.thHost}</Table.Th>
                     <Table.Th fw={700} fz="sm" c="dark">{t.visitors.thTime}</Table.Th>
                     <Table.Th fw={700} fz="sm" c="dark">{t.visitors.thType}</Table.Th>
                     <Table.Th ta="right" fw={700} fz="sm" c="dark">{t.visitors.thStatus}</Table.Th>
                   </Table.Tr>
                </Table.Thead>
                  <Table.Tbody>
                    {recentVisitors.map((visitor) => (
                      <Table.Tr key={visitor.id}>
                        <Table.Td>
                          <Group gap="sm">
                            <Avatar size="sm" radius="md" fw={700} color="blue" variant="light">{visitor.name[0]}</Avatar>
                            <Text size="sm" fw={600}>{visitor.name}</Text>
                          </Group>
                        </Table.Td>
                        <Table.Td><Text size="sm" fw={500}>{visitor.host}</Text></Table.Td>
                        <Table.Td><Text size="sm" fw={500}>{visitor.time}</Text></Table.Td>
                        <Table.Td>
                          <Badge size="xs" variant="outline" color={visitor.type === "Guest" ? "blue" : visitor.type === "Delivery" ? "red" : "orange"} radius="sm">
                          {visitor.type || 'Visitor'}
                        </Badge>
                        </Table.Td>
                        <Table.Td ta="right">
                          <Badge size="sm" color={visitor.status === "In" ? "green" : "orange"} variant="filled" radius="sm">
                          {visitor.status}
                        </Badge>
                        </Table.Td>
                      </Table.Tr>
                    ))}
                  </Table.Tbody>
                </Table>
              </ScrollArea>
            </Paper>
          </Stack>
        </Grid.Col>

        <Grid.Col span={{ base: 12, lg: 4 }}>
          <Stack gap="xl">
            {/* Occupancy Rate */}
            <Paper radius="md" style={{ border: '1px solid #e9ecef', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)' }}>
              <Box p="lg" style={{ borderBottom: '1px solid #e9ecef', backgroundColor: '#fafafa' }}>
                <Group justify="space-between">
                  <Title order={3}>{t.occupancy.title}</Title>
                  <ActionIcon variant="light" color="blue" radius="md"><IconArrowUpRight size={18} /></ActionIcon>
                </Group>
              </Box>
              <Box p="xl">
                <Box h={200} style={{ position: 'relative' }} mb="xl">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: t.occupancy.occupied, value: 75, color: '#014F86' },
                          { name: t.occupancy.available, value: 15, color: '#FFA94D' },
                          { name: t.occupancy.maintenance, value: 10, color: '#FF6B6B' },
                        ]}
                        cx="50%"
                        cy="50%"
                        innerRadius={70}
                        outerRadius={90}
                        paddingAngle={5}
                        dataKey="value"
                        stroke="none"
                        cornerRadius={4}
                      >
                        {[
                          { name: t.occupancy.occupied, value: 75, color: '#014F86' },
                          { name: t.occupancy.available, value: 15, color: '#FFA94D' },
                          { name: t.occupancy.maintenance, value: 10, color: '#FF6B6B' },
                        ].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                        itemStyle={{ fontWeight: 600, color: '#495057' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <Stack gap={0} align="center" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none' }}>
                    <Text ta="center" style={{ fontSize: '1.8rem', fontWeight: 900, lineHeight: 1.2 }}>75%</Text>
                    <Text ta="center" size="xs" c="dimmed" fw={700} tt="uppercase" lts={1}>{t.occupancy.occupied}</Text>
                  </Stack>
                </Box>
                <Stack gap="sm">
                  <Group justify="space-between" mb={-5}>
                    <Group gap="xs">
                      <Box w={10} h={10} style={{ borderRadius: '50%', backgroundColor: '#014F86' }} />
                      <Text size="xs" fw={600}>{t.occupancy.occupied}</Text>
                    </Group>
                    <Text size="xs" fw={800}>90</Text>
                  </Group>
                  <Group justify="space-between" mb={-5}>
                    <Group gap="xs">
                      <Box w={10} h={10} style={{ borderRadius: '50%', backgroundColor: '#FFA94D' }} />
                      <Text size="xs" fw={600}>{t.occupancy.available}</Text>
                    </Group>
                    <Text size="xs" fw={800}>18</Text>
                  </Group>
                  <Group justify="space-between" mb="xs">
                    <Group gap="xs">
                      <Box w={10} h={10} style={{ borderRadius: '50%', backgroundColor: '#FF6B6B' }} />
                      <Text size="xs" fw={600}>{t.occupancy.maintenance}</Text>
                    </Group>
                    <Text size="xs" fw={800}>12</Text>
                  </Group>
                  <Progress.Root size="md" radius="xl">
                    <Progress.Section value={75} color="#014F86" />
                    <Progress.Section value={15} color="#FFA94D" />
                    <Progress.Section value={10} color="#FF6B6B" />
                  </Progress.Root>
                </Stack>
              </Box>
            </Paper>

            <Paper 
              p="xl" 
              radius="md" 
              shadow="lg" 
              style={{ 
                backgroundColor: "#014F86", 
                color: "white", 
                backgroundImage: "linear-gradient(135deg, #014F86 0%, #2C7dA0 100%)",
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <Box pos="absolute" top={-20} right={-20} style={{ opacity: 0.1 }}>
                <IconTrendingUp size={150} />
              </Box>
              <Group justify="space-between" mb="lg">
                <Text fw={700} size="xs" tt="uppercase" lts={2} opacity={0.9}>{t.revenue.title}</Text>
                <ThemeIcon variant="white" color="#014F86" size="md" radius="md">
                  <IconTrendingUp size={18} />
                </ThemeIcon>
              </Group>
              <Title order={1} style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '1.5rem' }}>$42,500.00</Title>
              <Stack gap="md">
                <Group justify="space-between">
                  <Text size="xs" fw={700} tt="uppercase" lts={1}>{t.revenue.progress}</Text>
                  <Text size="xs" fw={900}>70%</Text>
                </Group>
                <Progress value={70} color="white" size="xs" radius="xl" />
                <Text size="xs" fw={500} opacity="0.9">{t.revenue.remaining}</Text>
              </Stack>
            </Paper>
          </Stack>
        </Grid.Col>
      </Grid>
    </Stack>
  );
}
