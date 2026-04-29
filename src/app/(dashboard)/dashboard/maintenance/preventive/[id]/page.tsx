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
  Box,
  List
} from "@mantine/core";
import { 
  IconArrowLeft, 
  IconPrinter, 
  IconCalendarStats, 
  IconTools, 
  IconMapPin, 
  IconCalendar, 
  IconClock,
  IconCheck,
  IconAlertCircle,
  IconUserCog,
  IconSettings
} from "@tabler/icons-react";
import { useTranslation } from "@/hooks/useTranslation";

export default function PreventiveDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { lang } = useTranslation();
  const id = params.id as string;

  const t = {
    en: {
      back: "Back to Schedule",
      print: "Print Work Order",
      details: "Preventive Maintenance Details",
      status: "Status",
      equipment: "Equipment",
      location: "Location",
      frequency: "Frequency",
      nextDue: "Next Due Date",
      lastService: "Last Service Date",
      description: "Service Description",
      checklist: "Maintenance Checklist",
      assignedTo: "Assigned Team/Technician",
      actions: "Schedule Actions",
      complete: "Mark Task as Completed",
      reschedule: "Reschedule Task",
      cancel: "Cancel Schedule",
    },
    mm: {
      back: "အချိန်ဇယားသို့ ပြန်သွားရန်",
      print: "လုပ်ငန်းအမိန့်ထုတ်ရန်",
      details: "ကြိုတင်ထိန်းသိမ်းမှု အသေးစိတ်",
      status: "အခြေအနေ",
      equipment: "စက်ကိရိယာ",
      location: "တည်နေရာ",
      frequency: "ကြိမ်နှုန်း",
      nextDue: "နောက်တစ်ကြိမ်လုပ်ဆောင်ရမည့်ရက်",
      lastService: "နောက်ဆုံးလုပ်ဆောင်ခဲ့သည့်ရက်",
      description: "ဝန်ဆောင်မှုဖော်ပြချက်",
      checklist: "စစ်ဆေးရမည့်စာရင်း",
      assignedTo: "တာဝန်ပေးထားသည့်အဖွဲ့/စက်မှုကျွမ်းကျင်သူ",
      actions: "စီမံခန့်ခွဲရန်",
      complete: "ပြီးစီးကြောင်းသတ်မှတ်ရန်",
      reschedule: "အချိန်ညှိရန်",
      cancel: "အချိန်ဇယားဖျက်ရန်",
    }
  }[lang === "mm" ? "mm" : "en"];

  // Mock data for the specific PM task
  const task = {
    id: id,
    equipment: "Main Elevator",
    location: "Block A",
    frequency: "Monthly",
    nextDue: "2024-11-01",
    lastService: "2024-10-01",
    status: "Scheduled",
    assignedTechnician: "Express Lift Services Co.",
    description: "Standard monthly safety inspection and lubrication of the main traction system for Block A elevator.",
    checklist: [
      "Inspect hoist ropes and governor cables",
      "Check door operation and safety edges",
      "Verify emergency lighting and alarm bell",
      "Lubricate guide rails and sheaves",
      "Test backup power systems"
    ],
    history: [
      { title: "Schedule Created", date: "2024-01-01", description: "Annual maintenance plan generated", status: "completed" },
      { title: "Last Service", date: "2024-10-01", description: "Completed by Express Lift Services", status: "completed" },
      { title: "Upcoming Service", date: "2024-11-01", description: "Technician confirmation pending", status: "active" },
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Scheduled": return "blue";
      case "Upcoming": return "cyan";
      case "Overdue": return "red";
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
        <Button variant="light" color="cyan" leftSection={<IconPrinter size={16} />}>
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
                    <ThemeIcon variant="light" color="cyan" size="lg" radius="md">
                      <IconCalendarStats size={20} />
                    </ThemeIcon>
                    <Title order={2} c="#014F86">{t.details}: {task.id}</Title>
                  </Group>
                  <Text size="sm" c="dimmed" mt={4}>{t.nextDue}: {task.nextDue}</Text>
                </Stack>
                <Badge size="xl" variant="dot" color={getStatusColor(task.status)}>
                  {task.status}
                </Badge>
              </Group>

              <Grid gutter="lg">
                <Grid.Col span={6}>
                  <Text size="sm" fw={600} c="dimmed">{t.equipment}</Text>
                  <Group gap={4}>
                    <IconSettings size={14} />
                    <Text fw={700}>{task.equipment}</Text>
                  </Group>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Text size="sm" fw={600} c="dimmed">{t.location}</Text>
                  <Group gap={4}>
                    <IconMapPin size={14} />
                    <Text fw={500}>{task.location}</Text>
                  </Group>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Text size="sm" fw={600} c="dimmed">{t.frequency}</Text>
                  <Badge color="blue" variant="light">{task.frequency}</Badge>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Text size="sm" fw={600} c="dimmed">{t.lastService}</Text>
                  <Text fw={500}>{task.lastService}</Text>
                </Grid.Col>
              </Grid>

              <Divider my="xl" />

              <Stack gap="md">
                <Box>
                  <Text size="sm" fw={600} c="dimmed" mb={8}>{t.description}</Text>
                  <Text size="sm" style={{ lineHeight: 1.6 }}>{task.description}</Text>
                </Box>

                <Box>
                  <Text size="sm" fw={600} c="dimmed" mb={8}>{t.checklist}</Text>
                  <List
                    spacing="xs"
                    size="sm"
                    center
                    icon={
                      <ThemeIcon color="teal" size={20} radius="xl">
                        <IconCheck size={12} />
                      </ThemeIcon>
                    }
                  >
                    {task.checklist.map((item, index) => (
                      <List.Item key={index}>{item}</List.Item>
                    ))}
                  </List>
                </Box>
              </Stack>
            </Paper>

            <Paper p="xl" radius="md" withBorder shadow="sm">
              <Title order={4} mb="xl">Maintenance History</Title>
              <Timeline active={2} bulletSize={24} lineWidth={2}>
                {task.history.map((item, index) => (
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
          </Stack>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <Stack gap="lg">
            <Paper p="xl" radius="md" withBorder shadow="sm">
              <Title order={4} mb="xl">{t.assignedTo}</Title>
              <Group>
                <ThemeIcon size="lg" radius="xl" color="cyan">
                  <IconUserCog size={20} />
                </ThemeIcon>
                <Box>
                  <Text fw={700}>{task.assignedTechnician}</Text>
                  <Text size="sm" c="dimmed">Third-party Service Provider</Text>
                </Box>
              </Group>
              <Button variant="light" fullWidth mt="xl" color="cyan">
                View Contract Details
              </Button>
            </Paper>

            <Paper p="xl" radius="md" withBorder shadow="sm">
              <Title order={4} mb="xl">{t.actions}</Title>
              <Stack gap="sm">
                <Button fullWidth color="green" radius="md" leftSection={<IconCheck size={16} />}>
                  {t.complete}
                </Button>
                <Button fullWidth color="blue" variant="light" radius="md" leftSection={<IconCalendar size={16} />}>
                  {t.reschedule}
                </Button>
                <Button fullWidth variant="outline" color="red" radius="md">
                  {t.cancel}
                </Button>
              </Stack>
            </Paper>
          </Stack>
        </Grid.Col>
      </Grid>
    </Stack>
  );
}
