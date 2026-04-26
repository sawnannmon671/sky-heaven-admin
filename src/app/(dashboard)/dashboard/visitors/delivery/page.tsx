"use client";

import { Title, Text, Stack, Paper, Group, ThemeIcon, Button } from "@mantine/core";
import { IconTruck, IconChevronLeft } from "@tabler/icons-react";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";

export default function DeliveryLogsPage() {
  const { lang, mounted } = useTranslation();

  if (!mounted) return null;

  const t = {
    en: {
      title: "Delivery Logs",
      subtitle: "Monitor and record all courier and food delivery arrivals.",
      back: "Back to Visitors",
      comingSoon: "Delivery log system is coming soon.",
    },
    mm: {
      title: "ပို့ဆောင်မှုမှတ်တမ်းများ",
      subtitle: "ချောပို့နှင့် အစားအသောက်ပို့ဆောင်မှု အားလုံးကို စောင့်ကြည့်မှတ်တမ်းတင်ပါ။",
      back: "ဧည့်သည်စီမံခန့်ခွဲမှုသို့ ပြန်သွားရန်",
      comingSoon: "ပို့ဆောင်မှုမှတ်တမ်းစနစ်အား မကြာမီ ရရှိနိုင်တော့မည်ဖြစ်သည်။",
    },
  }[lang === "mm" ? "mm" : "en"];

  return (
    <Stack gap="xl" p="md">
      <Group justify="space-between">
        <Stack gap={4}>
          <Group gap="xs">
            <ThemeIcon variant="light" color="orange" size="lg" radius="md">
              <IconTruck size={20} />
            </ThemeIcon>
            <Title order={1}>{t.title}</Title>
          </Group>
          <Text c="dimmed" size="md">{t.subtitle}</Text>
        </Stack>
        <Button 
          component={Link} 
          href="/dashboard/visitors" 
          variant="subtle" 
          leftSection={<IconChevronLeft size={16} />}
          color="gray"
        >
          {t.back}
        </Button>
      </Group>

      <Paper p="xl" radius="md" withBorder>
        <Stack align="center" py="xl">
          <IconTruck size={48} color="var(--mantine-color-orange-6)" />
          <Text size="lg" fw={500}>{t.comingSoon}</Text>
        </Stack>
      </Paper>
    </Stack>
  );
}
