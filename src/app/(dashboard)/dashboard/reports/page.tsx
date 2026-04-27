"use client";

import { Title, Paper, Group, Button, Stack, Text, SimpleGrid, RingProgress, ThemeIcon, ActionIcon } from "@mantine/core";
import { IconDownload, IconChartPie, IconChartBar, IconChartLine, IconTrendingUp, IconTrendingDown, IconCalendarStats } from "@tabler/icons-react";
import { useTranslation } from "@/hooks/useTranslation";

const translations = {
  en: {
    title: "Analytics & Reports",
    subtitle: "Monitor property performance and financial health metrics.",
    selectDate: "Select Date Range",
    exportData: "Export Data",
    stats: {
      occupancy: {
        label: "Occupancy Rate",
        trend: "+2.4% from last month",
      },
      revenue: {
        label: "Monthly Revenue",
        trend: "+12% from last month",
      },
      efficiency: {
        label: "Maintenance Efficency",
        trend: "-1.2% from last month",
      },
    },
    noCharts: {
      title: "No Detailed Charts Available",
      subtitle: "Select a data range and generate a report to see visual analytics.",
      btn: "Generate Detailed Report",
    },
  },
  mm: {
    title: "ပိုင်းခြားစိတ်ဖြာချက်များနှင့် အစီရင်ခံစာများ",
    subtitle: "အိမ်ခြံမြေ စွမ်းဆောင်ရည်နှင့် ဘဏ္ဍာရေးဆိုင်ရာ အခြေအနေများကို စောင့်ကြည့်ပါ။",
    selectDate: "ရက်စွဲအပိုင်းအခြားကို ရွေးပါ",
    exportData: "ဒေတာများကို ထုတ်ယူရန်",
    stats: {
      occupancy: {
        label: "နေထိုင်မှုနှုန်း",
        trend: "ပြီးခဲ့သည့်လထက် ၂.၄% တိုးလာသည်",
      },
      revenue: {
        label: "လစဉ်ဝင်ငွေ",
        trend: "ပြီးခဲ့သည့်လထက် ၁၂% တိုးလာသည်",
      },
      efficiency: {
        label: "ပြုပြင်ထိန်းသိမ်းမှု စွမ်းဆောင်ရည်",
        trend: "ပြီးခဲ့သည့်လထက် ၁.၂% လျော့နည်းသည်",
      },
    },
    noCharts: {
      title: "အသေးစိတ်ဇယားများ မရှိသေးပါ",
      subtitle: "ရက်စွဲအပိုင်းအခြားကို ရွေးချယ်ပြီး ပိုင်းခြားစိတ်ဖြာချက်များကို ကြည့်ရှုရန် အစီရင်ခံစာ ထုတ်ယူပါ။",
      btn: "အသေးစိတ်အစီရင်ခံစာ ထုတ်ယူရန်",
    },
  },
};

export default function ReportsPage() {
  const { lang, mounted } = useTranslation();
  const t = translations[lang];

  

  return (
    <Stack gap="xl">
      <Group justify="space-between">
        <Stack gap={0}>
          <Title order={2}>{t.title}</Title>
          <Text c="dimmed" size="sm">{t.subtitle}</Text>
        </Stack>
        <Group gap="sm">
          <Button leftSection={<IconCalendarStats size={16} />} variant="outline" color="gray">{t.selectDate}</Button>
          <Button leftSection={<IconDownload size={16} />} color="#014F86">{t.exportData}</Button>
        </Group>
      </Group>

      <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="xl">
        <Paper p="lg" radius="md" withBorder shadow="sm">
          <Group justify="space-between">
            <div>
              <Text size="xs" c="dimmed" tt="uppercase" fw={700}>{t.stats.occupancy.label}</Text>
              <Text fw={700} size="h2" mt={4}>85.4%</Text>
              <Group gap={4} mt={4}>
                <IconTrendingUp size={14} color="var(--mantine-color-green-6)" />
                <Text size="xs" color="green.6" fw={500}>{t.stats.occupancy.trend}</Text>
              </Group>
            </div>
            <RingProgress
              size={90}
              roundCaps
              thickness={8}
              sections={[{ value: 85, color: "#014F86" }]}
              label={
                <Text ta="center" size="xs" fw={700}>85%</Text>
              }
            />
          </Group>
        </Paper>

        <Paper p="lg" radius="md" withBorder shadow="sm">
          <Group justify="space-between">
            <div>
              <Text size="xs" c="dimmed" tt="uppercase" fw={700}>{t.stats.revenue.label}</Text>
              <Text fw={700} size="h2" mt={4}>$45,200</Text>
              <Group gap={4} mt={4}>
                <IconTrendingUp size={14} color="var(--mantine-color-green-6)" />
                <Text size="xs" color="green.6" fw={500}>{t.stats.revenue.trend}</Text>
              </Group>
            </div>
            <ThemeIcon color="green" variant="light" size={48} radius="md">
              <IconChartLine size={28} />
            </ThemeIcon>
          </Group>
        </Paper>

        <Paper p="lg" radius="md" withBorder shadow="sm">
          <Group justify="space-between">
            <div>
              <Text size="xs" c="dimmed" tt="uppercase" fw={700}>{t.stats.efficiency.label}</Text>
              <Text fw={700} size="h2" mt={4}>92.1%</Text>
              <Group gap={4} mt={4}>
                <IconTrendingDown size={14} color="var(--mantine-color-red-6)" />
                <Text size="xs" color="red.6" fw={500}>{t.stats.efficiency.trend}</Text>
              </Group>
            </div>
            <ThemeIcon color="orange" variant="light" size={48} radius="md">
              <IconChartBar size={28} />
            </ThemeIcon>
          </Group>
        </Paper>
      </SimpleGrid>

      <Paper p="xl" radius="md" withBorder shadow="sm" style={{ minHeight: 400, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "var(--mantine-color-gray-0)" }}>
        <Stack align="center" gap="md">
          <ThemeIcon size={64} radius="xl" variant="light" color="gray">
            <IconChartPie size={36} />
          </ThemeIcon>
          <div style={{ textAlign: "center" }}>
            <Text fw={700} size="lg">{t.noCharts.title}</Text>
            <Text c="dimmed" size="sm">{t.noCharts.subtitle}</Text>
          </div>
          <Button variant="outline" color="#014F86" mt="md">{t.noCharts.btn}</Button>
        </Stack>
      </Paper>
    </Stack>
  );
}
