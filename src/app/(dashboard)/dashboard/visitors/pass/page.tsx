"use client";

import { Title, Text, Stack, Paper, Group, ThemeIcon, Button } from "@mantine/core";
import { IconIdBadge, IconChevronLeft } from "@tabler/icons-react";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";

export default function VisitorPassPage() {
  const { lang, mounted } = useTranslation();

  if (!mounted) return null;

  const t = {
    en: {
      title: "Visitor Pass",
      subtitle: "Issue and manage digital passes for pre-authorized visitors.",
      back: "Back to Visitors",
      comingSoon: "Visitor pass management is coming soon.",
    },
    mm: {
      title: "ဧည့်သည်ဝင်ခွင့်ကတ်",
      subtitle: "ကြိုတင်ခွင့်ပြုထားသော ဧည့်သည်များအတွက် ဒစ်ဂျစ်တယ်ဝင်ခွင့်ကတ်များ ထုတ်ပေးခြင်းနှင့် စီမံခန့်ခွဲခြင်း။",
      back: "ဧည့်သည်စီမံခန့်ခွဲမှုသို့ ပြန်သွားရန်",
      comingSoon: "ဧည့်သည်ဝင်ခွင့်ကတ်စီမံခန့်ခွဲမှုအား မကြာမီ ရရှိနိုင်တော့မည်ဖြစ်သည်။",
    },
  }[lang === "mm" ? "mm" : "en"];

  return (
    <Stack gap="xl" p="md">
      <Group justify="space-between">
        <Stack gap={4}>
          <Group gap="xs">
            <ThemeIcon variant="light" color="indigo" size="lg" radius="md">
              <IconIdBadge size={20} />
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
          <IconIdBadge size={48} color="var(--mantine-color-indigo-6)" />
          <Text size="lg" fw={500}>{t.comingSoon}</Text>
        </Stack>
      </Paper>
    </Stack>
  );
}
