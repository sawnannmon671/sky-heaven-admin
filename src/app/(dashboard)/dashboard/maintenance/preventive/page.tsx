"use client";

import { Title, Text, Stack, Paper, Group, ThemeIcon, Button } from "@mantine/core";
import { IconCalendarStats, IconChevronLeft } from "@tabler/icons-react";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";

export default function PreventiveMaintenancePage() {
  const { lang, mounted } = useTranslation();

  if (!mounted) return null;

  const t = {
    en: {
      title: "Schedule Preventive Maintenance",
      subtitle: "Plan and schedule regular maintenance for property facilities.",
      back: "Back to Maintenance",
      comingSoon: "Preventive maintenance scheduling is coming soon.",
    },
    mm: {
      title: "ကြိုတင်ထိန်းသိမ်းမှုအချိန်ဇယား",
      subtitle: "အဆောက်အဦးအသုံးအဆောင်များအတွက် ပုံမှန်ပြုပြင်ထိန်းသိမ်းမှုများကို စီစဉ်ပြီး အချိန်ဇယားဆွဲပါ။",
      back: "ပြုပြင်ထိန်းသိမ်းမှုစာမျက်နှာသို့ ပြန်သွားရန်",
      comingSoon: "ကြိုတင်ထိန်းသိမ်းမှုစီစဉ်ခြင်းစနစ်အား မကြာမီ ရရှိနိုင်တော့မည်ဖြစ်သည်။",
    },
  }[lang === "mm" ? "mm" : "en"];

  return (
    <Stack gap="xl" p="md">
      <Group justify="space-between">
        <Stack gap={4}>
          <Group gap="xs">
            <ThemeIcon variant="light" color="cyan" size="lg" radius="md">
              <IconCalendarStats size={20} />
            </ThemeIcon>
            <Title order={1}>{t.title}</Title>
          </Group>
          <Text c="dimmed" size="md">{t.subtitle}</Text>
        </Stack>
        <Button 
          component={Link} 
          href="/dashboard/maintenance" 
          variant="subtle" 
          leftSection={<IconChevronLeft size={16} />}
          color="gray"
        >
          {t.back}
        </Button>
      </Group>

      <Paper p="xl" radius="md" withBorder>
        <Stack align="center" py="xl">
          <IconCalendarStats size={48} color="var(--mantine-color-cyan-6)" />
          <Text size="lg" fw={500}>{t.comingSoon}</Text>
        </Stack>
      </Paper>
    </Stack>
  );
}
