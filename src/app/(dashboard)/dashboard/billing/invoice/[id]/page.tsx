"use client";

import { Title, Text, Stack, Paper, Group, ThemeIcon, Button, Divider } from "@mantine/core";
import { IconChevronLeft, IconInfoCircle } from "@tabler/icons-react";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";
import { useParams } from "next/navigation";

const mockData = [
    { id: "INV-2024-001", unit: "A-101", resident: "U Aung Aung", amount: "$150.00", date: "2024-10-01", dueDate: "2024-10-15", status: "Paid" },
    { id: "INV-2024-002", unit: "B-205", resident: "Daw Su Su", amount: "$120.00", date: "2024-10-01", dueDate: "2024-10-15", status: "Unpaid" },
    { id: "INV-2024-003", unit: "C-304", resident: "U Kyaw Min", amount: "$200.00", date: "2024-10-01", dueDate: "2024-10-15", status: "Paid" },
    { id: "INV-2024-004", unit: "A-502", resident: "Daw Hla Hla", amount: "$150.00", date: "2024-10-01", dueDate: "2024-10-15", status: "Overdue" },
    { id: "INV-2024-005", unit: "D-102", resident: "U Zaw Myo", amount: "$180.00", date: "2024-10-01", dueDate: "2024-10-15", status: "Paid" },
  ];

export default function DetailPage() {
  const { mounted } = useTranslation();
  const params = useParams();
  const id = params.id as string;

  if (!mounted) return null;

  const item = mockData.find((d: any) => String(d.id) === String(id));

  return (
    <Stack gap="xl" p="md">
      <Group justify="space-between">
        <Stack gap={4}>
          <Group gap="xs">
            <ThemeIcon variant="light" color="blue" size="lg" radius="md">
              <IconInfoCircle size={20} />
            </ThemeIcon>
            <Title order={2}>Invoice Details</Title>
          </Group>
          <Text c="dimmed" size="sm">Viewing details for ID: {id}</Text>
        </Stack>
        <Button 
          component={Link} 
          href="../" 
          variant="subtle" 
          leftSection={<IconChevronLeft size={16} />}
          color="gray"
        >
          Back to List
        </Button>
      </Group>

      <Paper p="xl" radius="md" withBorder shadow="sm" style={{ border: '1px solid #e9ecef', maxWidth: 800 }}>
        {item ? (
          <Stack gap="md">
            <Group justify="space-between" wrap="nowrap" align="flex-start">
              <Text size="sm" fw={600} c="dimmed" style={{ minWidth: 150 }}>ID</Text>
              <Text size="sm" fw={600} style={{ flex: 1 }}>{id}</Text>
            </Group>
            <Divider my="sm" variant="dotted" />
            
            {Object.entries(item).map(([key, value]) => {
              if (key === 'id' || key === 'color' || key === 'icon' || typeof value === 'object') return null;
              return (
                <div key={key}>
                  <Group justify="space-between" wrap="nowrap" align="flex-start">
                    <Text size="sm" fw={600} c="dimmed" style={{ minWidth: 150, textTransform: 'capitalize' }}>
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </Text>
                    <Text size="sm" style={{ flex: 1 }}>
                      {String(value)}
                    </Text>
                  </Group>
                  <Divider my="sm" variant="dotted" />
                </div>
              );
            })}
          </Stack>
        ) : (
          <Text c="dimmed" ta="center" py="xl">Record not found.</Text>
        )}
      </Paper>
    </Stack>
  );
}
