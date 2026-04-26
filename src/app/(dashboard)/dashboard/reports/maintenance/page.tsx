"use client";

import { Title, Text, Stack, Paper, Group, ThemeIcon, Button } from "@mantine/core";
import { IconTools, IconChevronLeft } from "@tabler/icons-react";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";

export default function MaintenanceReportPage() {
  const { lang, mounted } = useTranslation();

  if (!mounted) return null;

  const t = {
    en: {
      title: "Maintenance Report",
      subtitle: "Generate reports on maintenance activities and costs.",
      back: "Back to Reports",
      comingSoon: "Maintenance reporting system is coming soon.",
    },
    mm: {
      title: "ပြုပြင်ထိန်းသိမ်းမှုအစီရင်ခံစာ",
      subtitle: "ပြုပြင်ထိန်းသိမ်းမှုလုပ်ငန်းများနှင့် ကုန်ကျစရိတ်များအတွက် အစီရင်ခံစာများထုတ်လုပ်ပါ။",
      back: "အစီရင်ခံစာများစာမျက်နှာသို့ ပြန်သွားရန်",
      comingSoon: "ပြုပြင်ထိန်းသိမ်းမှုအစီရင်ခံစာစနစ်အား မကြာမီ ရရှိနိုင်တော့မည်ဖြစ်သည်။",
    },
  }[lang === "mm" ? "mm" : "en"];

  return (
    <Stack gap="xl" p="md">
      <Group justify="space-between">
        <Stack gap={4}>
          <Group gap="xs">
            <ThemeIcon variant="light" color="indigo" size="lg" radius="md">
              <IconTools size={20} />
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
          <IconTools size={48} color="var(--mantine-color-indigo-6)" />
          <Text size="lg" fw={500}>{t.comingSoon}</Text>
        </Stack>
      </Paper>
    </Stack>
  );
}
