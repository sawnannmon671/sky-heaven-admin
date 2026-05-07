"use client";

import { useState } from "react";
import {
  Grid,
  Paper,
  Title,
  Text,
  Group,
  Badge,
  Stack,
  ThemeIcon,
  Table,
  Button,
  Box,
  Progress,
  SimpleGrid,
  ActionIcon,
  ScrollArea,
  TextInput,
  Select,
  Pagination,
  UnstyledButton,
  Center,
  Collapse,
} from "@mantine/core";
import {
  IconUsers,
  IconBuilding,
  IconTools,
  IconReceipt,
  IconArrowUpRight,
  IconArrowDownRight,
  IconClock,
  IconSearch,
  IconEye,
  IconEdit,
  IconTrash,
  IconSelector,
  IconChevronUp,
  IconChevronDown,
  IconUser,
  IconFilter,
} from "@tabler/icons-react";
import { useTranslation } from "@/hooks/useTranslation";
import { DashboardCharts } from "./DashboardCharts";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import Link from "next/link";

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
    color: "#00AC79",
    description: "2 new move-ins this week",
  },
];

const recentVisitors = [
  { id: 1, passNo: "V-1024", name: "David Miller", phone: "+1 234-567-8900", host: "A-202", time: "10:15 AM", expectedOut: "02:00 PM", type: "Guest", purpose: "Personal Visit", status: "In" },
  { id: 2, passNo: "V-1025", name: "Wilson Delivery", phone: "+1 987-654-3210", host: "B-501", time: "09:45 AM", expectedOut: "10:00 AM", type: "Delivery", purpose: "Package Drop-off", status: "Out" },
  { id: 3, passNo: "V-1026", name: "Amanda Chen", phone: "+1 555-123-4567", host: "C-104", time: "09:30 AM", expectedOut: "05:00 PM", type: "Guest", purpose: "Family", status: "In" },
  { id: 4, passNo: "V-1027", name: "Total Security", phone: "+1 888-999-0000", host: "System", time: "08:00 AM", expectedOut: "04:00 PM", type: "Service", purpose: "Maintenance", status: "Out" },
  { id: 5, passNo: "V-1028", name: "Robert Taylor", phone: "+1 444-555-6666", host: "A-305", time: "11:20 AM", expectedOut: "01:30 PM", type: "Contractor", purpose: "Plumbing", status: "In" },
];

const recentActivities = [
  { id: 1, user: "John Doe", unit: "A-101", activity: "Maintenance", status: "In Progress", date: "2 hours ago", color: "blue" },
  { id: 2, user: "Sarah Smith", unit: "B-205", activity: "Payment", status: "Completed", date: "5 hours ago", color: "#00AC79" },
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
      searchPlaceholder: "Search visitors...",
      filterType: "All Types",
      thName: "Visitor Name",
      thHost: "Host Unit",
      thTime: "Entry Time",
      thType: "Type",
      thStatus: "Status",
      thContact: "Contact Info",
      thActions: "Actions",
    },
    activities: {
      title: "Recent Activities",
      subtitle: "Latest events across all departments",
      viewAll: "View Detail",
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
      subtitle: "Property unit status overview",
      occupied: "Occupied",
      available: "Available Units",
      maintenance: "Under Maintenance"
    },
    revenue: {
      title: "Revenue Target",
      progress: "Progress to Goal",
      remaining: "$12,500 remaining to reach April goal",
    },
    expenses: {
      title: "Expense Overview",
      subtitle: "Departmental spending breakdown",
      viewReport: "View Detail",
      categories: {
        maintenance: "Maintenance",
        utilities: "Utilities",
        salary: "Salary",
        marketing: "Marketing",
        other: "Other",
      }
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
      searchPlaceholder: "ဧည့်သည်များကို ရှာဖွေရန်...",
      filterType: "အမျိုးအစားအားလုံး",
      thName: "ဧည့်သည်အမည်",
      thHost: "နေထိုင်သူယူနစ်",
      thTime: "ဝင်ရောက်ချိန်",
      thType: "အမျိုးအစား",
      thStatus: "အခြေအနေ",
      thContact: "ဆက်သွယ်ရန်",
      thActions: "လုပ်ဆောင်ချက်များ",
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
      subtitle: "ယူနစ်များ၏ လက်ရှိအခြေအနေ",
      occupied: "နေထိုင်သူရှိသည်",
      available: "အားလပ်သောယူနစ်များ",
      maintenance: "ပြုပြင်နေဆဲ"
    },
      revenue: {
      title: "ဝင်ငွေရည်မှန်းချက်",
      progress: "ရည်မှန်းချက်သို့ရောက်ရှိမှု",
      remaining: "ဧပြီလရည်မှန်းချက်ပြည့်မီရန် $12,500 လိုအပ်သည်",
    },
    expenses: {
      title: "အသုံးစရိတ် အကျဉ်းချုပ်",
      subtitle: "ဌာနအလိုက် အသုံးစရိတ် ခွဲဝေမှု",
      viewReport: "အစီရင်ခံစာ ကြည့်ရန်",
      categories: {
        maintenance: "ပြုပြင်ထိန်းသိမ်းမှု",
        utilities: "အသုံးအဆောင်",
        salary: "လစာ",
        marketing: "စျေးကွက်ရှာဖွေရေး",
        other: "အခြား",
      }
    }
  }
};

const monthlyExpenseData = [
  { name: 'Jan', maintenance: 4500, utilities: 3200, salary: 8500, marketing: 1200, other: 900 },
  { name: 'Feb', maintenance: 4800, utilities: 3100, salary: 8500, marketing: 1500, other: 850 },
  { name: 'Mar', maintenance: 4200, utilities: 3400, salary: 8500, marketing: 1100, other: 950 },
  { name: 'Apr', maintenance: 5100, utilities: 3600, salary: 8500, marketing: 1400, other: 800 },
  { name: 'May', maintenance: 4600, utilities: 3500, salary: 8700, marketing: 1300, other: 1000 },
  { name: 'Jun', maintenance: 4900, utilities: 3800, salary: 8700, marketing: 1600, other: 900 },
  { name: 'Jul', maintenance: 5200, utilities: 4100, salary: 8700, marketing: 1800, other: 1100 },
  { name: 'Aug', maintenance: 5000, utilities: 4000, salary: 8700, marketing: 1500, other: 1050 },
  { name: 'Sep', maintenance: 4700, utilities: 3700, salary: 8900, marketing: 1200, other: 950 },
  { name: 'Oct', maintenance: 5300, utilities: 3900, salary: 8900, marketing: 1700, other: 1150 },
  { name: 'Nov', maintenance: 4800, utilities: 3600, salary: 8900, marketing: 1900, other: 1200 },
  { name: 'Dec', maintenance: 5500, utilities: 4200, salary: 9100, marketing: 2000, other: 1300 },
];

export default function DashboardPage() {
  const { lang, mounted } = useTranslation();
  const t = translations[lang];

  const [sortConfig, setSortConfig] = useState<{ key: string, direction: 'asc' | 'desc' } | null>(null);
  const [activePage, setPage] = useState(1);
  const itemsPerPage = 5;
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const activeVisitors = recentVisitors.filter(v => v.status === "In");
  
  const filteredVisitors = activeVisitors.filter(v => {
    const matchesSearch = v.name.toLowerCase().includes(search.toLowerCase()) || 
      v.passNo.toLowerCase().includes(search.toLowerCase()) ||
      v.host.toLowerCase().includes(search.toLowerCase());
    const matchesType = !typeFilter || v.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const sortedVisitors = [...filteredVisitors].sort((a, b) => {
    if (!sortConfig) return 0;
    const { key, direction } = sortConfig;
    const aValue = a[key as keyof typeof a];
    const bValue = b[key as keyof typeof b];
    if (aValue < bValue) return direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return direction === 'asc' ? 1 : -1;
    return 0;
  });

  const Th = ({ children, reversed, sorted, onSort }: { children: React.ReactNode; reversed: boolean; sorted: boolean; onSort(): void }) => {
    const Icon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;
    return (
      <Table.Th c="white">
        <UnstyledButton onClick={onSort} style={{ width: '100%', color: 'inherit' }}>
          <Group justify="space-between" wrap="nowrap">
            <Text fw={700} fz="sm" c="white">{children}</Text>
            <Center>
              <Icon size={14} color={sorted ? "white" : "rgba(255,255,255,0.5)"} />
            </Center>
          </Group>
        </UnstyledButton>
      </Table.Th>
    );
  };

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
          boxShadow: 'none',
          transition: 'transform 0.2s ease',
          cursor: 'pointer',
          position: 'relative',
          overflow: 'hidden'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-4px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        <Group justify="space-between" align="center" mb="lg" wrap="nowrap">
          <Stack gap={0} style={{ flex: 1, minWidth: 0 }}>
            <Text size="sm" c="rgba(255,255,255,0.9)" fw={600} tt="uppercase" lts={1} truncate>
              {t.stats[stat.id as keyof typeof t.stats]}
            </Text>
            <Title order={2} c="white" style={{ fontSize: 'calc(1.5rem + 0.5vw)' }}>
              {stat.value}
            </Title>
          </Stack>
          <ThemeIcon
            size="xl"
            radius="md"
            variant="transparent"
            style={{ flexShrink: 0 }}
          >
            <Icon size={36} color="rgba(255,255,255,0.8)" stroke={1.5} />
          </ThemeIcon>
        </Group>

        <Group justify="space-between" align="center" wrap="nowrap">
          <Text c="rgba(255,255,255,0.8)" size="xs" fw={500} truncate style={{ flex: 1, minWidth: 0 }}>
            {t.stats[descKey as keyof typeof t.stats]}
          </Text>
          <Badge
            variant="transparent"
            size="sm"
            leftSection={<DiffIcon size={12} />}
            style={{ fontWeight: 700, color: 'white', backgroundColor: 'rgba(255,255,255,0.2)', flexShrink: 0 }}
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
          <Title order={2} c="#014F86">{t.pageTitle}</Title>
          <Text c="dimmed" size="sm" fw={500}>{t.pageSubtitle}</Text>
        </Stack>
        <Paper withBorder px="md" py="xs" radius="md" bg="gray.0">
          <Group gap="xs">
               <IconClock size={16} color="black" />
               <Text size="xs" fw={500} c="black">{t.lastUpdate}: April 24, 2026</Text>
             </Group>
        </Paper>
      </Group>

      <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="lg">
        {cards}
      </SimpleGrid>

      <DashboardCharts />

      <Grid gutter="xl">
        <Grid.Col span={{ base: 12, lg: 8 }}>
          <Stack gap="md">
            {/* Expense Overview */}
            <Paper radius="md" style={{           border: '2px solid #dee2e6', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)', height: '470px' }}>
               <Box p="lg">
                <Group justify="space-between">
                  <Stack gap={0}>
                    <Title order={3} c="#014F86">{t.expenses.title}</Title>
                    <Text size="xs" c="dimmed" fw={500}>{t.expenses.subtitle}</Text>
                  </Stack>
                  <Button variant="light" size="xs" color="blue" radius="md">{t.expenses.viewReport}</Button>
                </Group>
              </Box>
              <Box p="md" style={{ height: 'calc(22.75rem * var(--mantine-scale))' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyExpenseData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e9ecef" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#868e96', fontSize: 12 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#868e96', fontSize: 12 }} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                      cursor={{ fill: 'transparent' }}
                      formatter={(value: any, name: any) => [`$${value}`, t.expenses.categories[name as keyof typeof t.expenses.categories] || name]}
                    />
                    <Legend iconType="square" wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                    <Bar dataKey="maintenance" name={t.expenses.categories.maintenance} stackId="1" fill="#014F86" maxBarSize={40} />
                    <Bar dataKey="utilities" name={t.expenses.categories.utilities} stackId="1" fill="#FF6B6B" maxBarSize={40} />
                    <Bar dataKey="salary" name={t.expenses.categories.salary} stackId="1" fill="#00AC79" maxBarSize={40} />
                    <Bar dataKey="marketing" name={t.expenses.categories.marketing} stackId="1" fill="#FFA94D" maxBarSize={40} />
                    <Bar dataKey="other" name={t.expenses.categories.other} stackId="1" fill="#7048E8" maxBarSize={40} radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </Paper>
          </Stack>
        </Grid.Col>

        <Grid.Col span={{ base: 12, lg: 4 }}>
          <Stack gap="md">
            {/* Occupancy Rate */}
            <Paper radius="md" style={{           border: '2px solid #dee2e6', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)', height: '470px' }}>
               <Box p="lg">
                <Group justify="space-between">
                  <Stack gap={0}>
                    <Title order={3} c="#014F86">{t.occupancy.title}</Title>
                    <Text size="xs" c="dimmed" fw={500}>{t.occupancy.subtitle}</Text>
                  </Stack>
                  <Button variant="light" size="xs" color="blue" radius="md">View Detail</Button>
                </Group>
              </Box>
              <Box p="xl">
                <Box style={{ position: 'relative', height: 'calc(14.5rem * var(--mantine-scale))' }}>
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
          </Stack>
        </Grid.Col>
      </Grid>

      {/* Active Visitors - Full Width */}
      <Paper p="lg" radius="md" style={{ border: '2px solid #dee2e6', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)' }}>
        <Group justify="space-between" mb="md">
          <Stack gap={0}>
            <Title order={3} c="#014F86">Active Visitors</Title>
            <Text size="xs" c="dimmed" fw={500}>Currently on premises</Text>
          </Stack>
          <Button variant="light" size="xs" color="blue" radius="md">View Detail</Button>
        </Group>
        
        <Group justify="space-between" mb="xs">
          <TextInput
            placeholder={t.visitors.searchPlaceholder}
            leftSection={<IconSearch size={16} />}
            size="md"
            radius="md"
            w={300}
            value={search}
            onChange={(e) => setSearch(e.currentTarget.value)}
          />
          <ActionIcon 
            variant={showFilters ? "filled" : "outline"} 
            color={showFilters ? "#014F86" : "gray"} 
            size="lg" 
            radius="md"
            style={{ border: '1px solid #dee2e6' }}
            onClick={() => setShowFilters(!showFilters)}
          >
            <IconFilter size={18} stroke={1.5} />
          </ActionIcon>
        </Group>

        <Collapse in={showFilters}>
          <Box mt="md" mb="md" p="md" style={{ backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
            <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="md">
              <Select
                label={<Text fw={600} size="sm" mb={5}>{t.visitors.thType}</Text>}
                placeholder={t.visitors.filterType}
                data={["Guest", "Delivery", "Service", "Contractor"]}
                size="md"
                radius="md"
                clearable
                value={typeFilter}
                onChange={setTypeFilter}
              />
              {/* Add more filters if needed */}
            </SimpleGrid>
          </Box>
        </Collapse>

        <ScrollArea mt="sm">
          <Table verticalSpacing="md" horizontalSpacing="md" highlightOnHover>
            <Table.Thead bg="#014F86">
              <Table.Tr>
                <Th 
                  sorted={sortConfig?.key === 'name'} 
                  reversed={sortConfig?.direction === 'desc'} 
                  onSort={() => handleSort('name')}
                >
                  {t.visitors.thName}
                </Th>
                <Th 
                  sorted={sortConfig?.key === 'host'} 
                  reversed={sortConfig?.direction === 'desc'} 
                  onSort={() => handleSort('host')}
                >
                  {t.visitors.thHost}
                </Th>
                <Th 
                  sorted={sortConfig?.key === 'phone'} 
                  reversed={sortConfig?.direction === 'desc'} 
                  onSort={() => handleSort('phone')}
                >
                  {t.visitors.thContact}
                </Th>
                <Th 
                  sorted={sortConfig?.key === 'type'} 
                  reversed={sortConfig?.direction === 'desc'} 
                  onSort={() => handleSort('type')}
                >
                  {t.visitors.thType}
                </Th>
                <Table.Th fw={700} fz="sm" c="white" ta="right">{t.visitors.thActions}</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {sortedVisitors.slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage).map((visitor) => (
                <Table.Tr key={visitor.id}>
                  <Table.Td>
                    <Group gap="sm">
                      <ThemeIcon size="md" variant="light" color="blue" radius="md">
                        <IconUser size={18} />
                      </ThemeIcon>
                      <Stack gap={0}>
                        <Text size="sm" fw={700}>{visitor.name}</Text>
                        <Text size="xs" c="dimmed">{visitor.passNo}</Text>
                      </Stack>
                    </Group>
                  </Table.Td>
                  <Table.Td>
                    <Text size="sm" fw={500}>{visitor.host}</Text>
                  </Table.Td>
                  <Table.Td>
                    <Text size="sm" fw={500}>{visitor.phone}</Text>
                  </Table.Td>
                  <Table.Td>
                    <Badge 
                      variant="light" 
                      color={visitor.type === 'Guest' ? 'blue' : visitor.type === 'Delivery' ? 'orange' : visitor.type === 'Service' ? 'teal' : 'violet'} 
                      fw={700}
                      tt="uppercase"
                    >
                      {visitor.type}
                    </Badge>
                  </Table.Td>
                  <Table.Td>
                    <Group gap={4} justify="flex-end">
                      <ActionIcon variant="subtle" color="gray"><IconEye size={16} /></ActionIcon>
                      <ActionIcon variant="subtle" color="blue"><IconEdit size={16} /></ActionIcon>
                      <ActionIcon variant="subtle" color="red"><IconTrash size={16} /></ActionIcon>
                    </Group>
                  </Table.Td>
                </Table.Tr>
              ))}
              {sortedVisitors.length === 0 && (
                <Table.Tr>
                  <Table.Td colSpan={5} ta="center" py="xl">
                    <Text c="dimmed" size="sm">No active visitors found</Text>
                  </Table.Td>
                </Table.Tr>
              )}
            </Table.Tbody>
          </Table>
        </ScrollArea>
        
        <Group justify="space-between" mt="md">
          <Text size="sm" c="dimmed">
            Showing {sortedVisitors.length === 0 ? 0 : (activePage - 1) * itemsPerPage + 1} to {Math.min(activePage * itemsPerPage, sortedVisitors.length)} of {sortedVisitors.length} entries
          </Text>
          <Pagination total={Math.ceil(sortedVisitors.length / itemsPerPage)} value={activePage} onChange={setPage} color="#014F86" />
        </Group>
      </Paper>
    </Stack>
  );
}
