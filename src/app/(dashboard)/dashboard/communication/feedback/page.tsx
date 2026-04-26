"use client";

import { Title, Text, Stack, Paper, Group, ThemeIcon, Button } from "@mantine/core";
import { IconMessageReport, IconChevronLeft } from "@tabler/icons-react";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";

export default function FeedbackPage() {
  const { lang, mounted } = useTranslation();

  if (!mounted) return null;

  const t = {
    en: {
      title: "Complaint Feedback",
      subtitle: "Manage and respond to resident complaints and feedback.",
      back: "Back to Communication",
      comingSoon: "Complaint feedback system is coming soon.",
    },
    mm: {
      title: "တိုင်ကြားချက်တုံ့ပြန်မှု",
      subtitle: "နေထိုင်သူများ၏ တိုင်ကြားချက်များနှင့် တုံ့ပြန်မှုများကို စီမံခန့်ခွဲပြီး ပြန်လည်ဖြေကြားပါ။",
      back: "ဆက်သွယ်ရေးစာမျက်နှာသို့ ပြန်သွားရန်",
      comingSoon: "တိုင်ကြားချက်တုံ့ပြန်မှုစနစ်အား မကြာမီ ရရှိနိုင်တော့မည်ဖြစ်သည်။",
    },
  }[lang === "mm" ? "mm" : "en"];

  return (
    <Stack gap="xl" p="md">
      <Group justify="space-between">
        <Stack gap={4}>
          <Group gap="xs">
            <ThemeIcon variant="light" color="red" size="lg" radius="md">
              <IconMessageReport size={20} />
            </ThemeIcon>
            <Title order={1}>{t.title}</Title>
          </Group>
          <Text c="dimmed" size="md">{t.subtitle}</Text>
        </Stack>
        <Button 
          component={Link} 
          href="/dashboard/announcements" 
          variant="subtle" 
          leftSection={<IconChevronLeft size={16} />}
          color="gray"
        >
          {t.back}
        </Button>
      </Group>

      <Paper p="xl" radius="md" withBorder>
        <Stack align="center" py="xl">
          <IconMessageReport size={48} color="var(--mantine-color-red-6)" />
          <Text size="lg" fw={500}>{t.comingSoon}</Text>
        </Stack>
      </Paper>
    </Stack>
  );
}
