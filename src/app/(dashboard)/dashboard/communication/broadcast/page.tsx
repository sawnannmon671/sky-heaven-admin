"use client";

import { Title, Text, Stack, Paper, Group, ThemeIcon, Button } from "@mantine/core";
import { IconMail, IconChevronLeft } from "@tabler/icons-react";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";

export default function BroadcastPage() {
  const { lang, mounted } = useTranslation();

  if (!mounted) return null;

  const t = {
    en: {
      title: "SMS / Email Broadcast",
      subtitle: "Send mass communications to residents via SMS or email.",
      back: "Back to Communication",
      comingSoon: "Broadcast messaging system is coming soon.",
    },
    mm: {
      title: "SMS / အီးမေးလ် ပေးပို့ခြင်း",
      subtitle: "နေထိုင်သူများထံ SMS သို့မဟုတ် အီးမေးလ်မှတစ်ဆင့် အစုလိုက်အပြုံလိုက် ဆက်သွယ်မှုများ ပေးပို့ပါ။",
      back: "ဆက်သွယ်ရေးစာမျက်နှာသို့ ပြန်သွားရန်",
      comingSoon: "အစုလိုက်အပြုံလိုက် မက်ဆေ့ချ်ပို့စနစ်အား မကြာမီ ရရှိနိုင်တော့မည်ဖြစ်သည်။",
    },
  }[lang === "mm" ? "mm" : "en"];

  return (
    <Stack gap="xl" p="md">
      <Group justify="space-between">
        <Stack gap={4}>
          <Group gap="xs">
            <ThemeIcon variant="light" color="teal" size="lg" radius="md">
              <IconMail size={20} />
            </ThemeIcon>
            <Title order={1}>{t.title}</Title>
          </Group>
          <Text c="dimmed" size="md">{t.subtitle}</Text>
        </Stack>
        <Button 
          component={Link} 
          href="/dashboard/announcements" 
          variant="subtle" 
          leftSection={<IconChevronLeft size={16} />}
          color="gray"
        >
          {t.back}
        </Button>
      </Group>

      <Paper p="xl" radius="md" withBorder>
        <Stack align="center" py="xl">
          <IconMail size={48} color="var(--mantine-color-teal-6)" />
          <Text size="lg" fw={500}>{t.comingSoon}</Text>
        </Stack>
      </Paper>
    </Stack>
  );
}
