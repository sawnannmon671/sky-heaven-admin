"use client";

import { Title, Text, Stack, Paper, Group, ThemeIcon, Button } from "@mantine/core";
import { IconBellRinging, IconChevronLeft } from "@tabler/icons-react";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";

export default function NotificationSettingsPage() {
  const { lang, mounted } = useTranslation();

  if (!mounted) return null;

  const t = {
    en: {
      title: "Notification Settings",
      subtitle: "Configure notification preferences for various events.",
      back: "Back to Settings",
      comingSoon: "Notification settings management is coming soon.",
    },
    mm: {
      title: "အကြောင်းကြားချက်ဆက်တင်များ",
      subtitle: "အဖြစ်အပျက်အမျိုးမျိုးအတွက် အကြောင်းကြားချက်များကို ပြင်ဆင်သတ်မှတ်ပါ။",
      back: "ဆက်တင်များစာမျက်နှာသို့ ပြန်သွားရန်",
      comingSoon: "အကြောင်းကြားချက်ဆက်တင်စီမံခန့်ခွဲမှုအား မကြာမီ ရရှိနိုင်တော့မည်ဖြစ်သည်။",
    },
  }[lang === "mm" ? "mm" : "en"];

  return (
    <Stack gap="xl" p="md">
      <Group justify="space-between">
        <Stack gap={4}>
          <Group gap="xs">
            <ThemeIcon variant="light" color="orange" size="lg" radius="md">
              <IconBellRinging size={20} />
            </ThemeIcon>
            <Title order={1}>{t.title}</Title>
          </Group>
          <Text c="dimmed" size="md">{t.subtitle}</Text>
        </Stack>
        <Button 
          component={Link} 
          href="/dashboard/settings" 
          variant="subtle" 
          leftSection={<IconChevronLeft size={16} />}
          color="gray"
        >
          {t.back}
        </Button>
      </Group>

      <Paper p="xl" radius="md" withBorder>
        <Stack align="center" py="xl">
          <IconBellRinging size={48} color="var(--mantine-color-orange-6)" />
          <Text size="lg" fw={500}>{t.comingSoon}</Text>
        </Stack>
      </Paper>
    </Stack>
  );
}
