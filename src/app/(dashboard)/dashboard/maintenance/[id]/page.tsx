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
  Card,
  Avatar,
  Box
} from "@mantine/core";
import { 
  IconArrowLeft, 
  IconPrinter, 
  IconTool, 
  IconUser, 
  IconHome, 
  IconCalendar, 
  IconClock,
  IconCheck,
  IconMessage,
  IconAlertCircle
} from "@tabler/icons-react";
import { useTranslation } from "@/hooks/useTranslation";

export default function MaintenanceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { lang } = useTranslation();
  const id = params.id as string;

  const t = {
    en: {
      back: "Back to Requests",
      print: "Print Ticket",
      requestId: "Request Details",
      status: "Status",
      priority: "Priority",
      category: "Category",
      unit: "Unit",
      date: "Request Date",
      description: "Description",
      resident: "Resident Information",
      timeline: "Activity Timeline",
      assignedTo: "Assigned To",
      notAssigned: "Not Assigned",
      actions: "Manage Request",
      approve: "Approve Request",
      complete: "Mark as Completed",
      reject: "Reject",
    },
    mm: {
      back: "တောင်းဆိုချက်များသို့ ပြန်သွားရန်",
      print: "လက်မှတ်ထုတ်ရန်",
      requestId: "တောင်းဆိုမှုအသေးစိတ်",
      status: "အခြေအနေ",
      priority: "ဦးစားပေး",
      category: "အမျိုးအစား",
      unit: "အခန်း",
      date: "တောင်းဆိုသည့်ရက်စွဲ",
      description: "ဖော်ပြချက်",
      resident: "နေထိုင်သူအချက်အလက်",
      timeline: "လုပ်ဆောင်မှုမှတ်တမ်း",
      assignedTo: "တာဝန်ပေးထားသူ",
      notAssigned: "တာဝန်ပေးထားခြင်းမရှိသေးပါ",
      actions: "စီမံခန့်ခွဲရန်",
      approve: "အတည်ပြုရန်",
      complete: "ပြီးစီးကြောင်းသတ်မှတ်ရန်",
      reject: "ပယ်ဖျက်ရန်",
    }
  }[lang === "mm" ? "mm" : "en"];

  // Mock data for the specific request
  const request = {
    id: id,
    unit: "101",
    residentName: "U Kyaw Kyaw",
    residentPhone: "+95 9 123 456 789",
    category: "Plumbing",
    priority: "High",
    status: "In Progress",
    date: "2024-04-20",
    description: "There is a significant water leak in the master bathroom's ceiling. It seems to be coming from the unit above.",
    assignedTechnician: "Zaw Zaw (Lead Plumber)",
    history: [
      { title: "Request Submitted", date: "2024-04-20 09:00 AM", description: "Request created by resident", status: "completed" },
      { title: "Ticket Approved", date: "2024-04-20 10:30 AM", description: "Maintenance manager approved the ticket", status: "completed" },
      { title: "Technician Assigned", date: "2024-04-20 11:00 AM", description: "Zaw Zaw assigned to this task", status: "completed" },
      { title: "Work Started", date: "2024-04-20 01:00 PM", description: "Technician arrived at unit and started inspection", status: "active" },
      { title: "Completed", date: "-", description: "Waiting for completion", status: "pending" },
    ]
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "red";
      case "Medium": return "orange";
      case "Low": return "blue";
      default: return "gray";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "green";
      case "In Progress": return "blue";
      case "Pending": return "yellow";
      default: return "gray";
    }
  };

  return (
    <Stack gap="xl">
      <Group justify="space-between">
        <Button 
          variant="subtle" 
          color="gray" 
          leftSection={<IconArrowLeft size={16} />}
          onClick={() => router.back()}
        >
          {t.back}
        </Button>
        <Button variant="light" color="blue" leftSection={<IconPrinter size={16} />}>
          {t.print}
        </Button>
      </Group>

      <Grid gutter="xl">
        <Grid.Col span={{ base: 12, md: 8 }}>
          <Stack gap="lg">
            <Paper p="xl" radius="md" withBorder shadow="sm">
              <Group justify="space-between" mb="xl">
                <Stack gap={0}>
                  <Title order={2} c="#014F86">{t.requestId}: {request.id}</Title>
                  <Text size="sm" c="dimmed" mt={4}>{t.date}: {request.date}</Text>
                </Stack>
                <Badge size="xl" variant="dot" color={getStatusColor(request.status)}>
                  {request.status}
                </Badge>
              </Group>

              <Grid gutter="lg">
                <Grid.Col span={6}>
                  <Text size="sm" fw={600} c="dimmed">{t.category}</Text>
                  <Text fw={500}>{request.category}</Text>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Text size="sm" fw={600} c="dimmed">{t.priority}</Text>
                  <Badge color={getPriorityColor(request.priority)} variant="light">
                    {request.priority}
                  </Badge>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Text size="sm" fw={600} c="dimmed">{t.unit}</Text>
                  <Group gap={4}>
                    <IconHome size={14} />
                    <Text fw={500}>{request.unit}</Text>
                  </Group>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Text size="sm" fw={600} c="dimmed">{t.assignedTo}</Text>
                  <Group gap={4}>
                    <IconUser size={14} />
                    <Text fw={500}>{request.assignedTechnician || t.notAssigned}</Text>
                  </Group>
                </Grid.Col>
              </Grid>

              <Divider my="xl" />

              <Stack gap="xs">
                <Text size="sm" fw={600} c="dimmed">{t.description}</Text>
                <Paper p="md" bg="gray.0" radius="sm">
                  <Text size="sm" style={{ lineHeight: 1.6 }}>{request.description}</Text>
                </Paper>
              </Stack>
            </Paper>

            <Paper p="xl" radius="md" withBorder shadow="sm">
              <Title order={4} mb="xl">{t.timeline}</Title>
              <Timeline active={3} bulletSize={24} lineWidth={2}>
                {request.history.map((item, index) => (
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
              <Title order={4} mb="xl">{t.resident}</Title>
              <Group>
                <Avatar size="lg" radius="xl" color="blue">
                  {request.residentName.charAt(0)}
                </Avatar>
                <Box>
                  <Text fw={700}>{request.residentName}</Text>
                  <Text size="sm" c="dimmed">{request.residentPhone}</Text>
                </Box>
              </Group>
              <Button variant="light" fullWidth mt="xl" leftSection={<IconMessage size={16} />}>
                Contact Resident
              </Button>
            </Paper>

            <Paper p="xl" radius="md" withBorder shadow="sm">
              <Title order={4} mb="xl">{t.actions}</Title>
              <Stack gap="sm">
                <Button fullWidth color="blue" radius="md">
                  {t.approve}
                </Button>
                <Button fullWidth color="green" radius="md">
                  {t.complete}
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
