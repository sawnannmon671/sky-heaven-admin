"use client";

import { Title, Text, Stack, Paper, Group, ThemeIcon, Button } from "@mantine/core";
import { IconClipboardList, IconChevronLeft } from "@tabler/icons-react";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";

export default function ResidentFormsPage() {
  const { lang, mounted } = useTranslation();

  if (!mounted) return null;

  const t = {
    en: {
      title: "Resident Forms",
      subtitle: "Access and manage various forms for residents.",
      back: "Back to Documents",
      comingSoon: "Resident forms management is coming soon.",
    },
    mm: {
      title: "နေထိုင်သူပုံစံများ",
      subtitle: "နေထိုင်သူများအတွက် ပုံစံအမျိုးမျိုးကို ဝင်ရောက်ကြည့်ရှုခြင်းနှင့် စီမံခန့်ခွဲခြင်း။",
      back: "စာရွက်စာတမ်းများစာမျက်နှာသို့ ပြန်သွားရန်",
      comingSoon: "နေထိုင်သူပုံစံစီမံခန့်ခွဲမှုအား မကြာမီ ရရှိနိုင်တော့မည်ဖြစ်သည်။",
    },
  }[lang === "mm" ? "mm" : "en"];

  return (
    <Stack gap="xl" p="md">
      <Group justify="space-between">
        <Stack gap={4}>
          <Group gap="xs">
            <ThemeIcon variant="light" color="teal" size="lg" radius="md">
              <IconClipboardList size={20} />
            </ThemeIcon>
            <Title order={1}>{t.title}</Title>
          </Group>
          <Text c="dimmed" size="md">{t.subtitle}</Text>
        </Stack>
        <Button 
          component={Link} 
          href="/dashboard/documents" 
          variant="subtle" 
          leftSection={<IconChevronLeft size={16} />}
          color="gray"
        >
          {t.back}
        </Button>
      </Group>

      <Paper p="xl" radius="md" withBorder>
        <Stack align="center" py="xl">
          <IconClipboardList size={48} color="var(--mantine-color-teal-6)" />
          <Text size="lg" fw={500}>{t.comingSoon}</Text>
        </Stack>
      </Paper>
    </Stack>
  );
}
