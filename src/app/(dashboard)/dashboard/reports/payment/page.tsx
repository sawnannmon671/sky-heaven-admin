"use client";

import { Title, Text, Stack, Paper, Group, ThemeIcon, Button } from "@mantine/core";
import { IconCash, IconChevronLeft } from "@tabler/icons-react";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";

export default function PaymentReportPage() {
  const { lang, mounted } = useTranslation();

  if (!mounted) return null;

  const t = {
    en: {
      title: "Payment Report",
      subtitle: "Generate reports on all payment transactions.",
      back: "Back to Reports",
      comingSoon: "Payment reporting system is coming soon.",
    },
    mm: {
      title: "ငွေပေးချေမှုအစီရင်ခံစာ",
      subtitle: "ငွေပေးချေမှုမှတ်တမ်းများအားလုံးအတွက် အစီရင်ခံစာများထုတ်လုပ်ပါ။",
      back: "အစီရင်ခံစာများစာမျက်နှာသို့ ပြန်သွားရန်",
      comingSoon: "ငွေပေးချေမှုအစီရင်ခံစာစနစ်အား မကြာမီ ရရှိနိုင်တော့မည်ဖြစ်သည်။",
    },
  }[lang === "mm" ? "mm" : "en"];

  return (
    <Stack gap="xl" p="md">
      <Group justify="space-between">
        <Stack gap={4}>
          <Group gap="xs">
            <ThemeIcon variant="light" color="blue" size="lg" radius="md">
              <IconCash size={20} />
            </ThemeIcon>
            <Title order={1}>{t.title}</Title>
          </Group>
          <Text c="dimmed" size="md">{t.subtitle}</Text>
        </Stack>
        <Button 
          component={Link} 
          href="/dashboard/reports" 
          variant="subtle" 
          leftSection={<IconChevronLeft size={16} />}
          color="gray"
        >
          {t.back}
        </Button>
      </Group>

      <Paper p="xl" radius="md" withBorder>
        <Stack align="center" py="xl">
          <IconCash size={48} color="var(--mantine-color-blue-6)" />
          <Text size="lg" fw={500}>{t.comingSoon}</Text>
        </Stack>
      </Paper>
    </Stack>
  );
}
