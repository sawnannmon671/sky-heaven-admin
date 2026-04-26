"use client";

import { Title, Text, Stack, Paper, Group, ThemeIcon, Button } from "@mantine/core";
import { IconBarbell, IconChevronLeft } from "@tabler/icons-react";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";

export default function GymBookingPage() {
  const { lang, mounted } = useTranslation();

  if (!mounted) return null;

  const t = {
    en: {
      title: "Gym Booking",
      subtitle: "Book your gym session and view equipment availability.",
      back: "Back to Amenities",
      comingSoon: "Gym booking system is coming soon.",
    },
    mm: {
      title: "ဂျင်မ်ဘွတ်ကင်",
      subtitle: "ဂျင်မ်အသုံးပြုရန် ဘွတ်ကင်လုပ်ခြင်းနှင့် စက်ပစ္စည်းများ၏ အခြေအနေကို ကြည့်ရှုပါ။",
      back: "ဝန်ဆောင်မှုများသို့ ပြန်သွားရန်",
      comingSoon: "ဂျင်မ်ဘွတ်ကင်စနစ်အား မကြာမီ ရရှိနိုင်တော့မည်ဖြစ်သည်။",
    },
  }[lang === "mm" ? "mm" : "en"];

  return (
    <Stack gap="xl" p="md">
      <Group justify="space-between">
        <Stack gap={4}>
          <Group gap="xs">
            <ThemeIcon variant="light" color="teal" size="lg" radius="md">
              <IconBarbell size={20} />
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
          <IconBarbell size={48} color="var(--mantine-color-teal-6)" />
          <Text size="lg" fw={500}>{t.comingSoon}</Text>
        </Stack>
      </Paper>
    </Stack>
  );
}
