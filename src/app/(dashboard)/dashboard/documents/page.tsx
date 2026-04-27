"use client";

import { useState } from "react";
import {   Title, Paper, Table, Group, Button, TextInput, Stack, ActionIcon, Text, ThemeIcon, Badge , Pagination , UnstyledButton, Center } from "@mantine/core";
import {  IconPlus, IconSearch, IconFileText, IconDownload, IconTrash, IconEye, IconFileTypePdf, IconFileTypeXls , IconSelector, IconChevronUp, IconChevronDown } from "@tabler/icons-react";
import { useTranslation } from "@/hooks/useTranslation";

const elements = [
  { id: "DOC-001", name: "Building Rules & Regulations.pdf", type: "PDF", size: "1.2 MB", date: "2024-01-15" },
  { id: "DOC-002", name: "Maintenance Schedule 2024.xlsx", type: "Excel", size: "450 KB", date: "2024-03-10" },
  { id: "DOC-003", name: "Resident Directory 2024.pdf", type: "PDF", size: "2.5 MB", date: "2024-04-01" },
];

const translations = {
  en: {
    title: "Document Repository",
    subtitle: "Access and manage property documents, manuals, and reports.",
    addBtn: "Upload Document",
    searchPlaceholder: "Search documents by name, type or ID...",
    table: {
      name: "Document Name",
      type: "Type",
      size: "Size",
      date: "Date Added",
      actions: "Actions",
    },
    docNames: {
      "Building Rules & Regulations.pdf": "Building Rules & Regulations.pdf",
      "Maintenance Schedule 2024.xlsx": "Maintenance Schedule 2024.xlsx",
      "Resident Directory 2024.pdf": "Resident Directory 2024.pdf",
    },
  },
  mm: {
    title: "စာရွက်စာတမ်းများ သိမ်းဆည်းရာနေရာ",
    subtitle: "အိမ်ခြံမြေ စာရွက်စာတမ်းများ၊ လမ်းညွှန်ချက်များနှင့် အစီရင်ခံစာများကို ကြည့်ရှုစီမံပါ။",
    addBtn: "စာရွက်စာတမ်း တင်ရန်",
    searchPlaceholder: "အမည်၊ အမျိုးအစား သို့မဟုတ် နံပါတ်ဖြင့် ရှာဖွေရန်...",
    table: {
      name: "စာရွက်စာတမ်းအမည်",
      type: "အမျိုးအစား",
      size: "ပမာဏ",
      date: "တင်သည့်ရက်စွဲ",
      actions: "လုပ်ဆောင်ချက်များ",
    },
    docNames: {
      "Building Rules & Regulations.pdf": "အဆောက်အအုံ စည်းမျဉ်းစည်းကမ်းများ.pdf",
      "Maintenance Schedule 2024.xlsx": "ပြုပြင်ထိန်းသိမ်းမှု အစီအစဉ် ၂၀၂၄.xlsx",
      "Resident Directory 2024.pdf": "နေထိုင်သူများ လမ်းညွှန် ၂၀၂၄.pdf",
    },
  },
};

const getFileIcon = (type: string) => {
  switch (type) {
    case "PDF": return <IconFileTypePdf size={18} color="var(--mantine-color-red-6)" />;
    case "Excel": return <IconFileTypeXls size={18} color="var(--mantine-color-green-6)" />;
    default: return <IconFileText size={18} color="var(--mantine-color-blue-6)" />;
  }
};

export default function DocumentsPage() {
  const [sortConfig, setSortConfig] = useState<{ key: string, direction: 'asc' | 'desc' } | null>(null);

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = [...elements].sort((a, b) => {
    if (!sortConfig) return 0;
    const { key, direction } = sortConfig;
    if (a[key as keyof typeof a] < b[key as keyof typeof b]) return direction === 'asc' ? -1 : 1;
    if (a[key as keyof typeof a] > b[key as keyof typeof b]) return direction === 'asc' ? 1 : -1;
    return 0;
  });

  const [activePage, setPage] = useState(1);
  const itemsPerPage = 5;

  const { lang, mounted } = useTranslation();
  const t = translations[lang];

  

  const rows = sortedData.map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td>
        <Group gap="sm">
          <ThemeIcon variant="light" color="gray" size="lg">
            {getFileIcon(element.type)}
          </ThemeIcon>
          <div>
            <Text size="sm" fw={500}>
              {t.docNames[element.name as keyof typeof t.docNames] || element.name}
            </Text>
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
          <Title order={2}>{t.title}</Title>
          <Text c="dimmed" size="sm">{t.subtitle}</Text>
        </Stack>
        <Button leftSection={<IconPlus size={16} />} color="#014F86">{t.addBtn}</Button>
      </Group>

      <Paper p="md" radius="md" withBorder shadow="sm">
        <TextInput
          placeholder={t.searchPlaceholder}
          leftSection={<IconSearch size={16} />}
          mb="xl"
          size="md"
        />
        <Table verticalSpacing="sm" highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>
                <UnstyledButton onClick={() => handleSort('id')} style={{ width: '100%', color: 'inherit' }}>
                  <Group justify="space-between" wrap="nowrap">
                    <span>{t.table.name}</span>
                    <Center>
                      {sortConfig?.key === 'id' ? (
                        sortConfig.direction === 'asc' ? <IconChevronUp size={14} /> : <IconChevronDown size={14} />
                      ) : (
                        <IconSelector size={14} color="gray" />
                      )}
                    </Center>
                  </Group>
                </UnstyledButton>
              </Table.Th>
              <Table.Th>
                <UnstyledButton onClick={() => handleSort('name')} style={{ width: '100%', color: 'inherit' }}>
                  <Group justify="space-between" wrap="nowrap">
                    <span>{t.table.type}</span>
                    <Center>
                      {sortConfig?.key === 'name' ? (
                        sortConfig.direction === 'asc' ? <IconChevronUp size={14} /> : <IconChevronDown size={14} />
                      ) : (
                        <IconSelector size={14} color="gray" />
                      )}
                    </Center>
                  </Group>
                </UnstyledButton>
              </Table.Th>
              <Table.Th>
                <UnstyledButton onClick={() => handleSort('type')} style={{ width: '100%', color: 'inherit' }}>
                  <Group justify="space-between" wrap="nowrap">
                    <span>{t.table.size}</span>
                    <Center>
                      {sortConfig?.key === 'type' ? (
                        sortConfig.direction === 'asc' ? <IconChevronUp size={14} /> : <IconChevronDown size={14} />
                      ) : (
                        <IconSelector size={14} color="gray" />
                      )}
                    </Center>
                  </Group>
                </UnstyledButton>
              </Table.Th>
              <Table.Th>
                <UnstyledButton onClick={() => handleSort('size')} style={{ width: '100%', color: 'inherit' }}>
                  <Group justify="space-between" wrap="nowrap">
                    <span>{t.table.date}</span>
                    <Center>
                      {sortConfig?.key === 'size' ? (
                        sortConfig.direction === 'asc' ? <IconChevronUp size={14} /> : <IconChevronDown size={14} />
                      ) : (
                        <IconSelector size={14} color="gray" />
                      )}
                    </Center>
                  </Group>
                </UnstyledButton>
              </Table.Th>
              <Table.Th ta="right">{t.table.actions}</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows.slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage)}</Table.Tbody>
        </Table>
        <Group justify="space-between" mt="md">
          <Text size="sm" c="dimmed">
            Showing {((activePage - 1) * itemsPerPage) + 1} to {Math.min(activePage * itemsPerPage, rows.length)} of {rows.length} entries
          </Text>
          <Pagination total={Math.ceil(rows.length / itemsPerPage)} value={activePage} onChange={setPage} color="#014F86" />
        </Group>
      
      </Paper>
    </Stack>
  );
}
