"use client";

import { Title, Text, Stack, Paper, Group, ThemeIcon, Button } from "@mantine/core";
import { IconArmchair, IconChevronLeft } from "@tabler/icons-react";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";

export default function MeetingRoomPage() {
  const { lang, mounted } = useTranslation();

  if (!mounted) return null;

  const t = {
    en: {
      title: "Meeting Room Booking",
      subtitle: "Reserve meeting rooms for your business or personal use.",
      back: "Back to Amenities",
      comingSoon: "Meeting room booking system is coming soon.",
    },
    mm: {
      title: "အစည်းအဝေးခန်းဘွတ်ကင်",
      subtitle: "စီးပွားရေး သို့မဟုတ် ကိုယ်ရေးကိုယ်တာအတွက် အစည်းအဝေးခန်းများ ကြိုတင်မှာယူပါ။",
      back: "ဝန်ဆောင်မှုများသို့ ပြန်သွားရန်",
      comingSoon: "အစည်းအဝေးခန်းဘွတ်ကင်စနစ်အား မကြာမီ ရရှိနိုင်တော့မည်ဖြစ်သည်။",
    },
  }[lang === "mm" ? "mm" : "en"];

  return (
    <Stack gap="xl" p="md">
      <Group justify="space-between">
        <Stack gap={4}>
          <Group gap="xs">
            <ThemeIcon variant="light" color="indigo" size="lg" radius="md">
              <IconArmchair size={20} />
            </ThemeIcon>
            <Title order={1}>{t.title}</Title>
          </Group>
          <Text c="dimmed" size="md">{t.subtitle}</Text>
        </Stack>
        <Button 
          component={Link} 
          href="/dashboard/amenities" 
          variant="subtle" 
          leftSection={<IconChevronLeft size={16} />}
          color="gray"
        >
          {t.back}
        </Button>
      </Group>

      <Paper p="xl" radius="md" withBorder>
        <Stack align="center" py="xl">
          <IconArmchair size={48} color="var(--mantine-color-indigo-6)" />
          <Text size="lg" fw={500}>{t.comingSoon}</Text>
        </Stack>
      </Paper>
    </Stack>
  );
}
