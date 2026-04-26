"use client";

import { Title, Text, Stack, Paper, Group, ThemeIcon, Button } from "@mantine/core";
import { IconBuildingSkyscraper, IconChevronLeft } from "@tabler/icons-react";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";

export default function CompanyProfilePage() {
  const { lang, mounted } = useTranslation();

  if (!mounted) return null;

  const t = {
    en: {
      title: "Company Profile",
      subtitle: "Manage company information and branding.",
      back: "Back to Settings",
      comingSoon: "Company profile management is coming soon.",
    },
    mm: {
      title: "ကုမ္ပဏီအချက်အလက်",
      subtitle: "ကုမ္ပဏီအချက်အလက်နှင့် အမှတ်တံဆိပ်များကို စီမံခန့်ခွဲပါ။",
      back: "ဆက်တင်များစာမျက်နှာသို့ ပြန်သွားရန်",
      comingSoon: "ကုမ္ပဏီအချက်အလက်စီမံခန့်ခွဲမှုအား မကြာမီ ရရှိနိုင်တော့မည်ဖြစ်သည်။",
    },
  }[lang === "mm" ? "mm" : "en"];

  return (
    <Stack gap="xl" p="md">
      <Group justify="space-between">
        <Stack gap={4}>
          <Group gap="xs">
            <ThemeIcon variant="light" color="blue" size="lg" radius="md">
              <IconBuildingSkyscraper size={20} />
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
          <IconBuildingSkyscraper size={48} color="var(--mantine-color-blue-6)" />
          <Text size="lg" fw={500}>{t.comingSoon}</Text>
        </Stack>
      </Paper>
    </Stack>
  );
}
