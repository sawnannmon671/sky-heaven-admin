"use client";

import { Title, Text, Stack, Paper, Group, ThemeIcon, Button } from "@mantine/core";
import { IconDoorEnter, IconChevronLeft } from "@tabler/icons-react";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";

export default function VisitorEntryPage() {
  const { lang, mounted } = useTranslation();

  if (!mounted) return null;

  const t = {
    en: {
      title: "Visitor Entry",
      subtitle: "Register and track visitor arrivals and departures.",
      back: "Back to Visitors",
      comingSoon: "Visitor entry registration is coming soon.",
    },
    mm: {
      title: "ဧည့်သည်အဝင်",
      subtitle: "ဧည့်သည်များ အဝင်အထွက်ကို မှတ်ပုံတင်ခြင်းနှင့် ခြေရာခံခြင်း။",
      back: "ဧည့်သည်စီမံခန့်ခွဲမှုသို့ ပြန်သွားရန်",
      comingSoon: "ဧည့်သည်အဝင်မှတ်ပုံတင်ခြင်းစနစ်အား မကြာမီ ရရှိနိုင်တော့မည်ဖြစ်သည်။",
    },
  }[lang === "mm" ? "mm" : "en"];

  return (
    <Stack gap="xl" p="md">
      <Group justify="space-between">
        <Stack gap={4}>
          <Group gap="xs">
            <ThemeIcon variant="light" color="blue" size="lg" radius="md">
              <IconDoorEnter size={20} />
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
          <IconDoorEnter size={48} color="var(--mantine-color-blue-6)" />
          <Text size="lg" fw={500}>{t.comingSoon}</Text>
        </Stack>
      </Paper>
    </Stack>
  );
}
