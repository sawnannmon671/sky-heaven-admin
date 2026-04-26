"use client";

import { Title, Text, Stack, Paper, Group, ThemeIcon, Button } from "@mantine/core";
import { IconBrush, IconChevronLeft } from "@tabler/icons-react";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";

export default function CleaningStaffPage() {
  const { lang, mounted } = useTranslation();

  if (!mounted) return null;

  const t = {
    en: {
      title: "Cleaning Staff",
      subtitle: "Manage cleaning personnel and their schedules.",
      back: "Back to Staff Management",
      comingSoon: "Cleaning staff management is coming soon.",
    },
    mm: {
      title: "သန့်ရှင်းရေးဝန်ထမ်းများ",
      subtitle: "သန့်ရှင်းရေးဝန်ထမ်းများနှင့် ၎င်းတို့၏ အချိန်ဇယားများကို စီမံခန့်ခွဲပါ။",
      back: "ဝန်ထမ်းစီမံခန့်ခွဲမှုစာမျက်နှာသို့ ပြန်သွားရန်",
      comingSoon: "သန့်ရှင်းရေးဝန်ထမ်းစီမံခန့်ခွဲမှုအား မကြာမီ ရရှိနိုင်တော့မည်ဖြစ်သည်။",
    },
  }[lang === "mm" ? "mm" : "en"];

  return (
    <Stack gap="xl" p="md">
      <Group justify="space-between">
        <Stack gap={4}>
          <Group gap="xs">
            <ThemeIcon variant="light" color="green" size="lg" radius="md">
              <IconBrush size={20} />
            </ThemeIcon>
            <Title order={1}>{t.title}</Title>
          </Group>
          <Text c="dimmed" size="md">{t.subtitle}</Text>
        </Stack>
        <Button 
          component={Link} 
          href="/dashboard/staff" 
          variant="subtle" 
          leftSection={<IconChevronLeft size={16} />}
          color="gray"
        >
          {t.back}
        </Button>
      </Group>

      <Paper p="xl" radius="md" withBorder>
        <Stack align="center" py="xl">
          <IconBrush size={48} color="var(--mantine-color-green-6)" />
          <Text size="lg" fw={500}>{t.comingSoon}</Text>
        </Stack>
      </Paper>
    </Stack>
  );
}
