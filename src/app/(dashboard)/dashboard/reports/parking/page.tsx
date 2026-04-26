"use client";

import { Title, Text, Stack, Paper, Group, ThemeIcon, Button } from "@mantine/core";
import { IconCar, IconChevronLeft } from "@tabler/icons-react";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";

export default function ParkingReportPage() {
  const { lang, mounted } = useTranslation();

  if (!mounted) return null;

  const t = {
    en: {
      title: "Parking Report",
      subtitle: "Generate reports on parking slot usage and vehicle movements.",
      back: "Back to Reports",
      comingSoon: "Parking reporting system is coming soon.",
    },
    mm: {
      title: "ကားပါကင်အစီရင်ခံစာ",
      subtitle: "ကားပါကင်နေရာအသုံးပြုမှုနှင့် ယာဉ်အသွားအလာအတွက် အစီရင်ခံစာများထုတ်လုပ်ပါ။",
      back: "အစီရင်ခံစာများစာမျက်နှာသို့ ပြန်သွားရန်",
      comingSoon: "ကားပါကင်အစီရင်ခံစာစနစ်အား မကြာမီ ရရှိနိုင်တော့မည်ဖြစ်သည်။",
    },
  }[lang === "mm" ? "mm" : "en"];

  return (
    <Stack gap="xl" p="md">
      <Group justify="space-between">
        <Stack gap={4}>
          <Group gap="xs">
            <ThemeIcon variant="light" color="violet" size="lg" radius="md">
              <IconCar size={20} />
            </ThemeIcon>
            <Title order={1}>{t.title}</Title>
          </Group>
          <Text c="dimmed" size="md">{t.subtitle}</Text>
        </Stack>
        <Button 
          component={Link} 
          href="/dashboard/reports" 
          variant="subtle" 
          leftSection={<IconChevronLeft size={16} />}
          color="gray"
        >
          {t.back}
        </Button>
      </Group>

      <Paper p="xl" radius="md" withBorder>
        <Stack align="center" py="xl">
          <IconCar size={48} color="var(--mantine-color-violet-6)" />
          <Text size="lg" fw={500}>{t.comingSoon}</Text>
        </Stack>
      </Paper>
    </Stack>
  );
}
