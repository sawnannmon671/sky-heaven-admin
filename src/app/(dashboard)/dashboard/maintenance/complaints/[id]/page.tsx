"use client";

import { useParams, useRouter } from "next/navigation";
import { 
  Title, 
  Text, 
  Stack, 
  Paper, 
  Group, 
  Button, 
  Badge, 
  Grid, 
  Divider, 
  ThemeIcon, 
  ActionIcon,
  Timeline,
  Avatar,
  Box,
  Textarea
} from "@mantine/core";
import { 
  IconArrowLeft, 
  IconPrinter, 
  IconMessageExclamation, 
  IconUser, 
  IconHome, 
  IconCalendar, 
  IconClock,
  IconCheck,
  IconMessage,
  IconAlertCircle,
  IconSend
} from "@tabler/icons-react";
import { useTranslation } from "@/hooks/useTranslation";

export default function ComplaintDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { lang } = useTranslation();
  const id = params.id as string;

  const t = {
    en: {
      back: "Back to Complaints",
      print: "Print Complaint",
      details: "Complaint Details",
      status: "Status",
      subject: "Subject",
      unit: "Unit",
      date: "Date Filed",
      description: "Description",
      resident: "Resident Information",
      timeline: "Resolution Timeline",
      actions: "Manage Complaint",
      resolve: "Mark as Resolved",
      investigate: "Start Investigation",
      reject: "Dismiss Complaint",
      feedback: "Official Response",
      sendResponse: "Send Response to Resident",
    },
    mm: {
      back: "တိုင်ကြားချက်များသို့ ပြန်သွားရန်",
      print: "တိုင်ကြားချက်ထုတ်ရန်",
      details: "တိုင်ကြားမှုအသေးစိတ်",
      status: "အခြေအနေ",
      subject: "ခေါင်းစဉ်",
      unit: "အခန်း",
      date: "တိုင်ကြားသည့်ရက်စွဲ",
      description: "ဖော်ပြချက်",
      resident: "နေထိုင်သူအချက်အလက်",
      timeline: "ဖြေရှင်းမှုမှတ်တမ်း",
      actions: "စီမံခန့်ခွဲရန်",
      resolve: "ဖြေရှင်းပြီးကြောင်းသတ်မှတ်ရန်",
      investigate: "စုံစမ်းစစ်ဆေးမှုစတင်ရန်",
      reject: "ပယ်ဖျက်ရန်",
      feedback: "တရားဝင်တုံ့ပြန်မှု",
      sendResponse: "နေထိုင်သူထံ တုံ့ပြန်မှုပေးပို့ရန်",
    }
  }[lang === "mm" ? "mm" : "en"];

  // Mock data for the specific complaint
  const complaint = {
    id: id,
    residentName: "U Aung Aung",
    residentPhone: "+95 9 777 888 999",
    unit: "A-101",
    subject: "Noisy Neighbors",
    status: "In Progress",
    date: "2024-10-12",
    description: "The residents in unit A-102 have been hosting loud parties late into the night (after 11 PM) for the past three days. It's affecting our sleep and well-being.",
    history: [
      { title: "Complaint Filed", date: "2024-10-12 10:00 PM", description: "Complaint submitted via resident portal", status: "completed" },
      { title: "Initial Review", date: "2024-10-13 09:00 AM", description: "Security team notified to monitor noise levels", status: "completed" },
      { title: "Investigation Started", date: "2024-10-13 02:00 PM", description: "Management reached out to A-102 residents", status: "active" },
      { title: "Resolved", date: "-", description: "Pending resolution and resident confirmation", status: "pending" },
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Resolved": return "green";
      case "In Progress": return "blue";
      case "Pending": return "orange";
      default: return "gray";
    }
  };

  return (
    <Stack gap="xl" p="md">
      <Group justify="space-between">
        <Button 
          variant="subtle" 
          color="gray" 
          leftSection={<IconArrowLeft size={16} />}
          onClick={() => router.back()}
        >
          {t.back}
        </Button>
        <Button variant="light" color="red" leftSection={<IconPrinter size={16} />}>
          {t.print}
        </Button>
      </Group>

      <Grid gutter="xl">
        <Grid.Col span={{ base: 12, md: 8 }}>
          <Stack gap="lg">
            <Paper p="xl" radius="md" withBorder shadow="sm">
              <Group justify="space-between" mb="xl">
                <Stack gap={0}>
                  <Group gap="xs">
                    <ThemeIcon variant="light" color="red" size="lg" radius="md">
                      <IconMessageExclamation size={20} />
                    </ThemeIcon>
                    <Title order={2}>{t.details}: {complaint.id}</Title>
                  </Group>
                  <Text size="sm" c="dimmed" mt={4}>{t.date}: {complaint.date}</Text>
                </Stack>
                <Badge size="xl" variant="dot" color={getStatusColor(complaint.status)}>
                  {complaint.status}
                </Badge>
              </Group>

              <Grid gutter="lg">
                <Grid.Col span={12}>
                  <Text size="sm" fw={600} c="dimmed">{t.subject}</Text>
                  <Text fw={700} size="lg">{complaint.subject}</Text>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Text size="sm" fw={600} c="dimmed">{t.unit}</Text>
                  <Group gap={4}>
                    <IconHome size={14} />
                    <Text fw={500}>{complaint.unit}</Text>
                  </Group>
                </Grid.Col>
              </Grid>

              <Divider my="xl" />

              <Stack gap="xs">
                <Text size="sm" fw={600} c="dimmed">{t.description}</Text>
                <Paper p="md" bg="gray.0" radius="sm">
                  <Text size="sm" style={{ lineHeight: 1.6 }}>{complaint.description}</Text>
                </Paper>
              </Stack>
            </Paper>

            <Paper p="xl" radius="md" withBorder shadow="sm">
              <Title order={4} mb="xl">{t.feedback}</Title>
              <Textarea 
                placeholder="Type your response to the resident here..."
                label="Management Response"
                minRows={4}
                mb="md"
              />
              <Button leftSection={<IconSend size={16} />} color="#014F86">
                {t.sendResponse}
              </Button>
            </Paper>
          </Stack>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <Stack gap="lg">
            <Paper p="xl" radius="md" withBorder shadow="sm">
              <Title order={4} mb="xl">{t.resident}</Title>
              <Group>
                <Avatar size="lg" radius="xl" color="red">
                  {complaint.residentName.charAt(0)}
                </Avatar>
                <Box>
                  <Text fw={700}>{complaint.residentName}</Text>
                  <Text size="sm" c="dimmed">{complaint.residentPhone}</Text>
                </Box>
              </Group>
              <Button variant="light" fullWidth mt="xl" leftSection={<IconMessage size={16} />} color="red">
                Contact Resident
              </Button>
            </Paper>

            <Paper p="xl" radius="md" withBorder shadow="sm">
              <Title order={4} mb="xl">{t.timeline}</Title>
              <Timeline active={2} bulletSize={24} lineWidth={2}>
                {complaint.history.map((item, index) => (
                  <Timeline.Item 
                    key={index} 
                    bullet={item.status === 'completed' ? <IconCheck size={12} /> : item.status === 'active' ? <IconClock size={12} /> : <IconAlertCircle size={12} />}
                    title={item.title}
                  >
                    <Text size="sm" mt={4}>{item.description}</Text>
                    <Text size="xs" c="dimmed" mt={4}>{item.date}</Text>
                  </Timeline.Item>
                ))}
              </Timeline>
            </Paper>

            <Paper p="xl" radius="md" withBorder shadow="sm">
              <Title order={4} mb="xl">{t.actions}</Title>
              <Stack gap="sm">
                <Button fullWidth color="blue" radius="md">
                  {t.investigate}
                </Button>
                <Button fullWidth color="green" radius="md">
                  {t.resolve}
                </Button>
                <Button fullWidth variant="outline" color="red" radius="md">
                  {t.reject}
                </Button>
              </Stack>
            </Paper>
          </Stack>
        </Grid.Col>
      </Grid>
    </Stack>
  );
}
