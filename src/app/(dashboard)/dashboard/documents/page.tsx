"use client";
import { Title, Paper, Table, Group, Button, TextInput, Stack, ActionIcon, Text, ThemeIcon, Badge } from "@mantine/core";
import { IconPlus, IconSearch, IconFileText, IconDownload, IconTrash, IconEye, IconFileTypePdf, IconFileTypeXls } from "@tabler/icons-react";

const elements = [
  { id: "DOC-001", name: "Building Rules & Regulations.pdf", type: "PDF", size: "1.2 MB", date: "2024-01-15" },
  { id: "DOC-002", name: "Maintenance Schedule 2024.xlsx", type: "Excel", size: "450 KB", date: "2024-03-10" },
  { id: "DOC-003", name: "Resident Directory 2024.pdf", type: "PDF", size: "2.5 MB", date: "2024-04-01" },
];

const getFileIcon = (type: string) => {
  switch (type) {
    case "PDF": return <IconFileTypePdf size={18} color="var(--mantine-color-red-6)" />;
    case "Excel": return <IconFileTypeXls size={18} color="var(--mantine-color-green-6)" />;
    default: return <IconFileText size={18} color="var(--mantine-color-blue-6)" />;
  }
};

export default function DocumentsPage() {
  const rows = elements.map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td>
        <Group gap="sm">
          <ThemeIcon variant="light" color="gray" size="lg">
            {getFileIcon(element.type)}
          </ThemeIcon>
          <div>
            <Text size="sm" fw={500}>{element.name}</Text>
            <Text size="xs" c="dimmed">{element.id}</Text>
          </div>
        </Group>
      </Table.Td>
      <Table.Td>
        <Badge variant="light" color={element.type === "PDF" ? "red" : "green"}>
          {element.type}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Text size="sm">{element.size}</Text>
      </Table.Td>
      <Table.Td>
        <Text size="sm" c="dimmed">{element.date}</Text>
      </Table.Td>
      <Table.Td>
        <Group gap={4} justify="flex-end">
          <ActionIcon variant="subtle" color="gray"><IconEye size={16} /></ActionIcon>
          <ActionIcon variant="subtle" color="blue"><IconDownload size={16} /></ActionIcon>
          <ActionIcon variant="subtle" color="red"><IconTrash size={16} /></ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Stack gap="xl">
      <Group justify="space-between">
        <Stack gap={0}>
          <Title order={2}>Document Repository</Title>
          <Text c="dimmed" size="sm">Access and manage property documents, manuals, and reports.</Text>
        </Stack>
        <Button leftSection={<IconPlus size={16} />} color="#014F86">Upload Document</Button>
      </Group>

      <Paper p="md" radius="md" withBorder shadow="sm">
        <TextInput
          placeholder="Search documents by name, type or ID..."
          leftSection={<IconSearch size={16} />}
          mb="xl"
          size="md"
        />
        <Table verticalSpacing="sm" highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Document Name</Table.Th>
              <Table.Th>Type</Table.Th>
              <Table.Th>Size</Table.Th>
              <Table.Th>Date Added</Table.Th>
              <Table.Th ta="right">Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Paper>
    </Stack>
  );
}
