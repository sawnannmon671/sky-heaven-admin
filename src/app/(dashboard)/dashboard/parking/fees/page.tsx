"use client";

import { Title, Text, Stack, Paper, Group, ThemeIcon, Button } from "@mantine/core";
import { IconCash, IconChevronLeft } from "@tabler/icons-react";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";

export default function ParkingFeesPage() {
  const { lang, mounted } = useTranslation();

  if (!mounted) return null;

  const t = {
    en: {
      title: "Parking Fees",
      subtitle: "Manage and track monthly and visitor parking fees.",
      back: "Back to Parking",
      comingSoon: "Parking fee management is coming soon.",
    },
    mm: {
      title: "ကားပါကင်ခများ",
      subtitle: "လစဉ်နှင့် ဧည့်သည်ကားပါကင်ခများကို စီမံခန့်ခွဲခြင်းနှင့် ခြေရာခံခြင်း။",
      back: "ကားပါကင်စာမျက်နှာသို့ ပြန်သွားရန်",
      comingSoon: "ကားပါကင်ခစီမံခန့်ခွဲမှုအား မကြာမီ ရရှိနိုင်တော့မည်ဖြစ်သည်။",
    },
  }[lang === "mm" ? "mm" : "en"];

  return (
    <Stack gap="xl" p="md">
      <Group justify="space-between">
        <Stack gap={4}>
          <Group gap="xs">
            <ThemeIcon variant="light" color="green" size="lg" radius="md">
              <IconCash size={20} />
            </ThemeIcon>
            <Title order={1}>{t.title}</Title>
          </Group>
          <Text c="dimmed" size="md">{t.subtitle}</Text>
        </Stack>
        <Button 
          component={Link} 
          href="/dashboard/parking" 
          variant="subtle" 
          leftSection={<IconChevronLeft size={16} />}
          color="gray"
        >
          {t.back}
        </Button>
      </Group>

      <Paper p="xl" radius="md" withBorder>
        <Stack align="center" py="xl">
          <IconCash size={48} color="var(--mantine-color-green-6)" />
          <Text size="lg" fw={500}>{t.comingSoon}</Text>
        </Stack>
      </Paper>
    </Stack>
  );
}
