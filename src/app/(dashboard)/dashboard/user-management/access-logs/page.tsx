"use client";

import { Title, Text, Stack, Paper, Group, ThemeIcon, Button } from "@mantine/core";
import { IconLock, IconChevronLeft } from "@tabler/icons-react";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";

export default function AccessLogsPage() {
  const { lang, mounted } = useTranslation();

  if (!mounted) return null;

  const t = {
    en: {
      title: "Access Logs",
      subtitle: "Review user access logs and activity history.",
      back: "Back to User Management",
      comingSoon: "Access log tracking system is coming soon.",
    },
    mm: {
      title: "ဝင်ရောက်မှုမှတ်တမ်းများ",
      subtitle: "အသုံးပြုသူဝင်ရောက်မှုမှတ်တမ်းများနှင့် လုပ်ဆောင်ချက်မှတ်တမ်းများကို ပြန်လည်သုံးသပ်ပါ။",
      back: "အသုံးပြုသူစီမံခန့်ခွဲမှုစာမျက်နှာသို့ ပြန်သွားရန်",
      comingSoon: "ဝင်ရောက်မှုမှတ်တမ်းခြေရာခံစနစ်အား မကြာမီ ရရှိနိုင်တော့မည်ဖြစ်သည်။",
    },
  }[lang === "mm" ? "mm" : "en"];

  return (
    <Stack gap="xl" p="md">
      <Group justify="space-between">
        <Stack gap={4}>
          <Group gap="xs">
            <ThemeIcon variant="light" color="indigo" size="lg" radius="md">
              <IconLock size={20} />
            </ThemeIcon>
            <Title order={1}>{t.title}</Title>
          </Group>
          <Text c="dimmed" size="md">{t.subtitle}</Text>
        </Stack>
        <Button 
          component={Link} 
          href="/dashboard/user-management" 
          variant="subtle" 
          leftSection={<IconChevronLeft size={16} />}
          color="gray"
        >
          {t.back}
        </Button>
      </Group>

      <Paper p="xl" radius="md" withBorder>
        <Stack align="center" py="xl">
          <IconLock size={48} color="var(--mantine-color-indigo-6)" />
          <Text size="lg" fw={500}>{t.comingSoon}</Text>
        </Stack>
      </Paper>
    </Stack>
  );
}
