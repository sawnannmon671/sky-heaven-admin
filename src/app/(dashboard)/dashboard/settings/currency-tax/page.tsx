"use client";

import { Title, Text, Stack, Paper, Group, ThemeIcon, Button } from "@mantine/core";
import { IconCoin, IconChevronLeft } from "@tabler/icons-react";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";

export default function CurrencyTaxPage() {
  const { lang, mounted } = useTranslation();

  if (!mounted) return null;

  const t = {
    en: {
      title: "Currency / Tax",
      subtitle: "Configure currency settings and tax rates.",
      back: "Back to Settings",
      comingSoon: "Currency and tax configuration is coming soon.",
    },
    mm: {
      title: "ငွေကြေးနှင့် အခွန်",
      subtitle: "ငွေကြေးဆက်တင်များနှင့် အခွန်နှုန်းထားများကို ပြင်ဆင်သတ်မှတ်ပါ။",
      back: "ဆက်တင်များစာမျက်နှာသို့ ပြန်သွားရန်",
      comingSoon: "ငွေကြေးနှင့် အခွန်ပြင်ဆင်သတ်မှတ်မှုအား မကြာမီ ရရှိနိုင်တော့မည်ဖြစ်သည်။",
    },
  }[lang === "mm" ? "mm" : "en"];

  return (
    <Stack gap="xl" p="md">
      <Group justify="space-between">
        <Stack gap={4}>
          <Group gap="xs">
            <ThemeIcon variant="light" color="indigo" size="lg" radius="md">
              <IconCoin size={20} />
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
          <IconCoin size={48} color="var(--mantine-color-indigo-6)" />
          <Text size="lg" fw={500}>{t.comingSoon}</Text>
        </Stack>
      </Paper>
    </Stack>
  );
}
