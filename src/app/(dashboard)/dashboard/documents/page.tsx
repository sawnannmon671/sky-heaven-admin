"use client";
import { Title, Paper, Table, Group, Button, TextInput, Stack, ActionIcon } from "@mantine/core";
import { IconPlus, IconSearch, IconFileText, IconDownload, IconTrash } from "@tabler/icons-react";

const elements = [
  { id: "DOC-001", name: "Building Rules & Regulations.pdf", type: "PDF", size: "1.2 MB", date: "2024-01-15" },
  { id: "DOC-002", name: "Maintenance Schedule 2024.xlsx", type: "Excel", size: "450 KB", date: "2024-03-10" },
];

export default function DocumentsPage() {
  const rows = elements.map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td>
        <Group gap="xs">
          <IconFileText size={16} />
          {element.name}
        </Group>
      </Table.Td>
      <Table.Td>{element.type}</Table.Td>
      <Table.Td>{element.size}</Table.Td>
      <Table.Td>{element.date}</Table.Td>
      <Table.Td>
        <Group gap="xs">
          <ActionIcon variant="subtle" color="blue"><IconDownload size={16} /></ActionIcon>
          <ActionIcon variant="subtle" color="red"><IconTrash size={16} /></ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Stack gap="md">
      <Group justify="space-between">
        <Title order={2}>Documents</Title>
        <Button leftSection={<IconPlus size={16} />}>Upload Document</Button>
      </Group>
      <Paper p="md" radius="md" withBorder>
        <TextInput placeholder="Search documents..." leftSection={<IconSearch size={16} />} mb="md" />
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Name</Table.Th>
              <Table.Th>Type</Table.Th>
              <Table.Th>Size</Table.Th>
              <Table.Th>Date Added</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Paper>
    </Stack>
  );
}
