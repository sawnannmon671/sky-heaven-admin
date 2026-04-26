"use client";

import { Title, Text, Stack, Paper, Group, ThemeIcon, Button } from "@mantine/core";
import { IconUserCog, IconChevronLeft } from "@tabler/icons-react";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";

export default function TechnicianAssignmentPage() {
  const { lang, mounted } = useTranslation();

  if (!mounted) return null;

  const t = {
    en: {
      title: "Technician Assignment",
      subtitle: "Assign technicians to work orders and manage their schedules.",
      back: "Back to Maintenance",
      comingSoon: "Technician assignment system is coming soon.",
    },
    mm: {
      title: "စက်မှုကျွမ်းကျင်သူတာဝန်ပေးခြင်း",
      subtitle: "လုပ်ငန်းအမိန့်များအတွက် စက်မှုကျွမ်းကျင်သူများ တာဝန်ပေးခြင်းနှင့် ၎င်းတို့၏ အချိန်ဇယားများကို စီမံခန့်ခွဲပါ။",
      back: "ပြုပြင်ထိန်းသိမ်းမှုစာမျက်နှာသို့ ပြန်သွားရန်",
      comingSoon: "စက်မှုကျွမ်းကျင်သူတာဝန်ပေးခြင်းစနစ်အား မကြာမီ ရရှိနိုင်တော့မည်ဖြစ်သည်။",
    },
  }[lang === "mm" ? "mm" : "en"];

  return (
    <Stack gap="xl" p="md">
      <Group justify="space-between">
        <Stack gap={4}>
          <Group gap="xs">
            <ThemeIcon variant="light" color="indigo" size="lg" radius="md">
              <IconUserCog size={20} />
            </ThemeIcon>
            <Title order={1}>{t.title}</Title>
          </Group>
          <Text c="dimmed" size="md">{t.subtitle}</Text>
        </Stack>
        <Button 
          component={Link} 
          href="/dashboard/maintenance" 
          variant="subtle" 
          leftSection={<IconChevronLeft size={16} />}
          color="gray"
        >
          {t.back}
        </Button>
      </Group>

      <Paper p="xl" radius="md" withBorder>
        <Stack align="center" py="xl">
          <IconUserCog size={48} color="var(--mantine-color-indigo-6)" />
          <Text size="lg" fw={500}>{t.comingSoon}</Text>
        </Stack>
      </Paper>
    </Stack>
  );
}
