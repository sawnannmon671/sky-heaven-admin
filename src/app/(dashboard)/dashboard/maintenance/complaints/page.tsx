"use client";

import { Title, Text, Stack, Paper, Group, ThemeIcon, Button } from "@mantine/core";
import { IconMessageExclamation, IconChevronLeft } from "@tabler/icons-react";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";

export default function ComplaintManagementPage() {
  const { lang, mounted } = useTranslation();

  if (!mounted) return null;

  const t = {
    en: {
      title: "Complaint Management",
      subtitle: "Track and resolve resident complaints and feedback.",
      back: "Back to Maintenance",
      comingSoon: "Complaint management system is coming soon.",
    },
    mm: {
      title: "တိုင်ကြားချက်စီမံခန့်ခွဲမှု",
      subtitle: "နေထိုင်သူများ၏ တိုင်ကြားချက်များနှင့် တုံ့ပြန်ချက်များကို ခြေရာခံပြီး ဖြေရှင်းပါ။",
      back: "ပြုပြင်ထိန်းသိမ်းမှုစာမျက်နှာသို့ ပြန်သွားရန်",
      comingSoon: "တိုင်ကြားချက်စီမံခန့်ခွဲမှုစနစ်အား မကြာမီ ရရှိနိုင်တော့မည်ဖြစ်သည်။",
    },
  }[lang === "mm" ? "mm" : "en"];

  return (
    <Stack gap="xl" p="md">
      <Group justify="space-between">
        <Stack gap={4}>
          <Group gap="xs">
            <ThemeIcon variant="light" color="red" size="lg" radius="md">
              <IconMessageExclamation size={20} />
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
          <IconMessageExclamation size={48} color="var(--mantine-color-red-6)" />
          <Text size="lg" fw={500}>{t.comingSoon}</Text>
        </Stack>
      </Paper>
    </Stack>
  );
}
