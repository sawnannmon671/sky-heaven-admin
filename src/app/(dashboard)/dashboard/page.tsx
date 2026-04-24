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
} from "@tabler/icons-react";
import { useTranslation } from "@/hooks/useTranslation";

const stats = [
  {
    id: "total_units",
    title: "Total Units",
    value: "120",
    diff: 12,
    icon: IconBuilding,
    color: "blue",
    description: "4 units added this month",
  },
  {
    id: "active_residents",
    title: "Active Residents",
    value: "245",
    diff: 5,
    icon: IconUsers,
    color: "teal",
    description: "2 new move-ins this week",
  },
  {
    id: "open_requests",
    title: "Open Requests",
    value: "12",
    diff: -3,
    icon: IconTools,
    color: "orange",
    description: "3 resolved today",
  },
  {
    id: "pending_bills",
    title: "Pending Bills",
    value: "8",
    diff: -10,
    icon: IconReceipt,
    color: "red",
    description: "Decreased from last month",
  },
];

const recentActivities = [
  { id: 1, user: "John Doe", unit: "A-101", activity: "Maintenance", status: "In Progress", date: "2 hours ago", color: "blue" },
  { id: 2, user: "Sarah Smith", unit: "B-205", activity: "Payment", status: "Completed", date: "5 hours ago", color: "green" },
  { id: 3, user: "Michael Wong", unit: "C-303", activity: "Registration", status: "New", date: "1 day ago", color: "violet" },
  { id: 4, user: "Elena Rodriguez", unit: "A-404", activity: "Visitor", status: "Checked Out", date: "2 days ago", color: "gray" },
];

const translations = {
  en: {
    pageTitle: "Property Overview",
    pageSubtitle: "Monitor your property performance and recent activities at a glance.",
    lastUpdate: "Last Update",
    stats: {
      total_units: "Total Units",
      active_residents: "Active Residents",
      open_requests: "Open Requests",
      pending_bills: "Pending Bills",
      desc_units: "4 units added this month",
      desc_residents: "2 new move-ins this week",
      desc_requests: "3 resolved today",
      desc_bills: "Decreased from last month",
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
    },
    revenue: {
      title: "Revenue Target",
      progress: "Progress to Goal",
      remaining: "$12,500 remaining to reach April goal",
    }
  },
  mm: {
    pageTitle: "အိမ်ခြံမြေအကျဉ်းချုပ်",
    pageSubtitle: "သင်၏အိမ်ခြံမြေလုပ်ဆောင်ချက်များနှင့် လတ်တလောလှုပ်ရှားမှုများကို တစ်နေရာတည်းတွင် ကြည့်ရှုပါ။",
    lastUpdate: "နောက်ဆုံးပြင်ဆင်ချိန်",
    stats: {
      total_units: "ယူနစ်စုစုပေါင်း",
      active_residents: "နေထိုင်သူဦးရေ",
      open_requests: "တောင်းဆိုချက်များ",
      pending_bills: "ပေးဆောင်ရန်ကျန်ငွေတောင်းခံလွှာများ",
      desc_units: "ယခုလတွင် ယူနစ် ၄ ခု ထပ်တိုးသည်",
      desc_residents: "ယခုအပတ်တွင် အသစ် ၂ ဦး ပြောင်းရွှေ့လာသည်",
      desc_requests: "ယနေ့ ၃ ခု ဖြေရှင်းပြီး",
      desc_bills: "ပြီးခဲ့သည့်လထက် လျော့နည်းသွားသည်",
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

  if (!mounted) return null;

  const cards = stats.map((stat) => {
    const Icon = stat.icon;
    const DiffIcon = stat.diff > 0 ? IconArrowUpRight : IconArrowDownRight;
    
    // Map descriptions to translation keys
    const descKey = stat.id === "total_units" ? "desc_units" :
                    stat.id === "active_residents" ? "desc_residents" :
                    stat.id === "open_requests" ? "desc_requests" : "desc_bills";

    return (
      <Paper withBorder p="md" radius="md" key={stat.id} shadow="sm">
        <Group justify="space-between">
          <ThemeIcon
            size="xl"
            radius="md"
            variant="light"
            color={stat.color}
          >
            <Icon size={28} />
          </ThemeIcon>
          <Badge
            color={stat.diff > 0 ? "teal" : "red"}
            variant="light"
            leftSection={<DiffIcon size={12} />}
          >
            {Math.abs(stat.diff)}%
          </Badge>
        </Group>

        <Stack gap={2} mt="md">
          <Text size="xs" c="dimmed" fw={700} tt="uppercase">
            {t.stats[stat.id as keyof typeof t.stats]}
          </Text>
          <Title order={2}>{stat.value}</Title>
        </Stack>

        <Text c="dimmed" size="xs" mt="sm">
          <Text component="span" c={stat.diff > 0 ? "teal" : "red"} fw={700}>
            {t.stats[descKey as keyof typeof t.stats]}
          </Text>
        </Text>
      </Paper>
    );
  });

  return (
    <Stack gap="xl">
      <Group justify="space-between">
        <Stack gap={0}>
          <Title order={2}>{t.pageTitle}</Title>
          <Text c="dimmed" size="sm">{t.pageSubtitle}</Text>
        </Stack>
        <Badge size="lg" variant="light" color="#014F86" leftSection={<IconClock size={14} />}>
          {t.lastUpdate}: April 24, 2026
        </Badge>
      </Group>

      <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="xl">
        {cards}
      </SimpleGrid>

      <Grid gutter="xl">
        <Grid.Col span={{ base: 12, lg: 8 }}>
          <Paper withBorder p="md" radius="md" shadow="sm">
            <Group justify="space-between" mb="xl">
              <Stack gap={0}>
                <Title order={4}>{t.activities.title}</Title>
                <Text size="xs" c="dimmed">{t.activities.subtitle}</Text>
              </Stack>
              <Button variant="subtle" size="xs" color="#014F86">{t.activities.viewAll}</Button>
            </Group>
            <Table verticalSpacing="sm" highlightOnHover>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>{t.activities.thUser}</Table.Th>
                  <Table.Th>{t.activities.thType}</Table.Th>
                  <Table.Th>{t.activities.thStatus}</Table.Th>
                  <Table.Th ta="right">{t.activities.thTime}</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {recentActivities.map((item) => (
                  <Table.Tr key={item.id}>
                    <Table.Td>
                      <Group gap="sm">
                        <Avatar color={item.color} radius="xl" size="sm" variant="light">{item.user[0]}</Avatar>
                        <div>
                          <Text size="sm" fw={500}>{item.user}</Text>
                          <Text size="xs" c="dimmed">{item.unit}</Text>
                        </div>
                      </Group>
                    </Table.Td>
                    <Table.Td>
                      <Text size="sm">{t.activities.types[item.activity as keyof typeof t.activities.types] || item.activity}</Text>
                    </Table.Td>
                    <Table.Td>
                      <Badge color={item.color} variant="dot" size="sm">
                        {t.activities.status[item.status as keyof typeof t.activities.status] || item.status}
                      </Badge>
                    </Table.Td>
                    <Table.Td ta="right">
                      <Text size="xs" c="dimmed">{t.activities.times[item.date as keyof typeof t.activities.times] || item.date}</Text>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </Paper>
        </Grid.Col>

        <Grid.Col span={{ base: 12, lg: 4 }}>
          <Stack gap="xl">
            <Paper withBorder p="md" radius="md" shadow="sm">
              <Group justify="space-between" mb="md">
                <Title order={4}>{t.occupancy.title}</Title>
                <ActionIcon variant="subtle" color="gray"><IconArrowUpRight size={16} /></ActionIcon>
              </Group>
              <Group justify="center" mb="md">
                <RingProgress
                  size={160}
                  thickness={16}
                  roundCaps
                  sections={[{ value: 85, color: "#014F86" }]}
                  label={
                    <Stack gap={0} align="center">
                      <Text ta="center" size="xl" fw={800}>85%</Text>
                      <Text ta="center" size="xs" c="dimmed" fw={500}>{t.occupancy.occupied}</Text>
                    </Stack>
                  }
                />
              </Group>
              <Stack gap="xs">
                <Group justify="space-between">
                  <Text size="sm" fw={500}>{t.occupancy.available}</Text>
                  <Text size="sm" fw={700} c="#014F86">18 / 120</Text>
                </Group>
                <Progress value={85} color="#014F86" size="sm" radius="xl" />
              </Stack>
            </Paper>

            <Paper withBorder p="lg" radius="md" shadow="md" style={{ backgroundColor: "#014F86", color: "white", backgroundImage: "linear-gradient(135deg, #014F86 0%, #2C7dA0 100%)" }}>
              <Group justify="space-between" mb="xs">
                <Text fw={600} size="sm" tt="uppercase" lts={1}>{t.revenue.title}</Text>
                <ThemeIcon variant="white" color="#014F86" size="sm" radius="xl">
                  <IconTrendingUp size={14} />
                </ThemeIcon>
              </Group>
              <Title order={2} mb="md">$42,500.00</Title>
              <Stack gap={4}>
                <Group justify="space-between">
                  <Text size="xs" fw={500}>{t.revenue.progress}</Text>
                  <Text size="xs" fw={700}>70%</Text>
                </Group>
                <Progress value={70} color="white" size="xs" radius="xl" />
                <Text size="xs" mt={4} opacity={0.8}>{t.revenue.remaining}</Text>
              </Stack>
            </Paper>
          </Stack>
        </Grid.Col>
      </Grid>
    </Stack>
  );
}
