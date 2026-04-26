"use client";

import { Title, Text, Stack, Paper, Group, ThemeIcon, Button } from "@mantine/core";
import { IconCloudUpload, IconChevronLeft } from "@tabler/icons-react";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";

export default function UploadFilesPage() {
  const { lang, mounted } = useTranslation();

  if (!mounted) return null;

  const t = {
    en: {
      title: "Upload Files",
      subtitle: "Upload and manage important documents and files.",
      back: "Back to Documents",
      comingSoon: "File upload and management system is coming soon.",
    },
    mm: {
      title: "ဖိုင်တင်ရန်",
      subtitle: "အရေးကြီးသော စာရွက်စာတမ်းများနှင့် ဖိုင်များကို တင်သွင်းခြင်းနှင့် စီမံခန့်ခွဲခြင်း။",
      back: "စာရွက်စာတမ်းများစာမျက်နှာသို့ ပြန်သွားရန်",
      comingSoon: "ဖိုင်တင်သွင်းခြင်းနှင့် စီမံခန့်ခွဲမှုစနစ်အား မကြာမီ ရရှိနိုင်တော့မည်ဖြစ်သည်။",
    },
  }[lang === "mm" ? "mm" : "en"];

  return (
    <Stack gap="xl" p="md">
      <Group justify="space-between">
        <Stack gap={4}>
          <Group gap="xs">
            <ThemeIcon variant="light" color="orange" size="lg" radius="md">
              <IconCloudUpload size={20} />
            </ThemeIcon>
            <Title order={1}>{t.title}</Title>
          </Group>
          <Text c="dimmed" size="md">{t.subtitle}</Text>
        </Stack>
        <Button 
          component={Link} 
          href="/dashboard/documents" 
          variant="subtle" 
          leftSection={<IconChevronLeft size={16} />}
          color="gray"
        >
          {t.back}
        </Button>
      </Group>

      <Paper p="xl" radius="md" withBorder>
        <Stack align="center" py="xl">
          <IconCloudUpload size={48} color="var(--mantine-color-orange-6)" />
          <Text size="lg" fw={500}>{t.comingSoon}</Text>
        </Stack>
      </Paper>
    </Stack>
  );
}
