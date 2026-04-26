"use client";

import { Title, Text, Stack, Paper, Group, ThemeIcon, Button } from "@mantine/core";
import { IconShieldCheck, IconChevronLeft } from "@tabler/icons-react";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";

export default function SecurityApprovalPage() {
  const { lang, mounted } = useTranslation();

  if (!mounted) return null;

  const t = {
    en: {
      title: "Security Approval",
      subtitle: "Review and approve visitor access requests from security.",
      back: "Back to Visitors",
      comingSoon: "Security approval system is coming soon.",
    },
    mm: {
      title: "လုံခြုံရေးအတည်ပြုချက်",
      subtitle: "လုံခြုံရေးမှတစ်ဆင့် ဧည့်သည်ဝင်ရောက်ခွင့်တောင်းဆိုမှုများကို ပြန်လည်သုံးသပ်ပြီး အတည်ပြုပါ။",
      back: "ဧည့်သည်စီမံခန့်ခွဲမှုသို့ ပြန်သွားရန်",
      comingSoon: "လုံခြုံရေးအတည်ပြုချက်စနစ်အား မကြာမီ ရရှိနိုင်တော့မည်ဖြစ်သည်။",
    },
  }[lang === "mm" ? "mm" : "en"];

  return (
    <Stack gap="xl" p="md">
      <Group justify="space-between">
        <Stack gap={4}>
          <Group gap="xs">
            <ThemeIcon variant="light" color="teal" size="lg" radius="md">
              <IconShieldCheck size={20} />
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
          <IconShieldCheck size={48} color="var(--mantine-color-teal-6)" />
          <Text size="lg" fw={500}>{t.comingSoon}</Text>
        </Stack>
      </Paper>
    </Stack>
  );
}
