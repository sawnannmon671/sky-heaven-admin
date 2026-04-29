"use client";

import { useState } from "react";
import {   Title, Text, Stack, Paper, Group, ThemeIcon, Button, Table, TextInput, ActionIcon, Badge , Pagination , UnstyledButton, Center, Modal } from "@mantine/core";
import {  IconIdBadge, IconChevronLeft, IconSearch, IconEye, IconEdit, IconTrash, IconPlus , IconSelector, IconChevronUp, IconChevronDown, IconQrcode } from "@tabler/icons-react";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";

export default function VisitorRegistrationPage() {
  const [sortConfig, setSortConfig] = useState<{ key: string, direction: 'asc' | 'desc' } | null>(null);
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [selectedVisitor, setSelectedVisitor] = useState<any>(null);

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const openQrModal = (visitor: any) => {
    setSelectedVisitor(visitor);
    setQrModalOpen(true);
  };

  

  const [activePage, setPage] = useState(1);
  const itemsPerPage = 5;

  const { lang, mounted } = useTranslation();

  

  const t = {
    en: {
      title: "Visitor Registration",
      subtitle: "Register visitors, manage entry passes, and generate QR codes.",
      back: "Back to Visitors",
      comingSoon: "Visitor registration management is coming soon.",
    },
    mm: {
      title: "ဧည့်သည်မှတ်ပုံတင်ခြင်း",
      subtitle: "ဧည့်သည်များ မှတ်ပုံတင်ခြင်း၊ ဝင်ခွင့်ကတ်များ စီမံခန့်ခွဲခြင်းနှင့် QR ကုဒ်များ ထုတ်ပေးခြင်း။",
      back: "ဧည့်သည်စီမံခန့်ခွဲမှုသို့ ပြန်သွားရန်",
      comingSoon: "ဧည့်သည်မှတ်ပုံတင်ခြင်းအား မကြာမီ ရရှိနိုင်တော့မည်ဖြစ်သည်။",
    },
  }[lang === "mm" ? "mm" : "en"];

  const mockData = [
    { id: "VP-001", visitor: "U Kyaw Swar", hostUnit: "A-101", validFrom: "2024-10-26", validTo: "2024-10-28", type: "Multiple Entry", status: "Active" },
    { id: "VP-002", visitor: "Daw Ni Ni", hostUnit: "B-205", validFrom: "2024-10-26", validTo: "2024-10-26", type: "Single Entry", status: "Expired" },
    { id: "VP-003", visitor: "Ko Htun", hostUnit: "C-304", validFrom: "2024-10-27", validTo: "2024-10-27", type: "Single Entry", status: "Pending" },
    { id: "VP-004", visitor: "Ma Hlaing", hostUnit: "A-502", validFrom: "2024-10-25", validTo: "2024-11-25", type: "Contractor", status: "Active" },
    { id: "VP-005", visitor: "U Zaw", hostUnit: "D-102", validFrom: "2024-10-26", validTo: "2024-10-26", type: "Single Entry", status: "Active" },
  ];

  const sortedData = [...mockData].sort((a, b) => {
    if (!sortConfig) return 0;
    const { key, direction } = sortConfig;
    if (a[key as keyof typeof a] < b[key as keyof typeof b]) return direction === 'asc' ? -1 : 1;
    if (a[key as keyof typeof a] > b[key as keyof typeof b]) return direction === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <Stack gap="xl" p="md">
      <Group justify="space-between">
        <Stack gap={4}>
          <Group gap="xs">
            <ThemeIcon variant="light" color="indigo" size="lg" radius="md">
              <IconIdBadge size={20} />
            </ThemeIcon>
            <Title order={1} c="#014F86">{t.title}</Title>
          </Group>
          <Text c="dimmed" size="md">{t.subtitle}</Text>
        </Stack>
        <Button 
          component={Link} 
          href="/dashboard/visitors" 
          variant="subtle" 
          leftSection={<IconChevronLeft size={16} />}
          color="gray"
        >
          {t.back}
        </Button>
      </Group>

      
      <Paper p="md" radius="md" withBorder shadow="sm">
        <Group justify="space-between" mb="md">
          <TextInput
            placeholder="Search..." w={250}
            leftSection={<IconSearch size={16} />}
            size="md"
            radius="md"
            w={250}
          />
          <Button leftSection={<IconPlus size={16} />} color="#014F86" radius="md">
            Add New
          </Button>
        </Group>

        <Table verticalSpacing="md" highlightOnHover>
          <Table.Thead bg="gray.0">
            <Table.Tr>
              <Table.Th fw={700} fz="sm" c="dark">
                <UnstyledButton onClick={() => handleSort('id')} style={{ width: '100%', color: 'inherit' }}>
                  <Group justify="space-between" wrap="nowrap">
                    <span>Pass ID</span>
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
              <Table.Th fw={700} fz="sm" c="dark">
                <UnstyledButton onClick={() => handleSort('visitor')} style={{ width: '100%', color: 'inherit' }}>
                  <Group justify="space-between" wrap="nowrap">
                    <span>Visitor & Host</span>
                    <Center>
                      {sortConfig?.key === 'visitor' ? (
                        sortConfig.direction === 'asc' ? <IconChevronUp size={14} /> : <IconChevronDown size={14} />
                      ) : (
                        <IconSelector size={14} color="gray" />
                      )}
                    </Center>
                  </Group>
                </UnstyledButton>
              </Table.Th>
              <Table.Th fw={700} fz="sm" c="dark">
                <UnstyledButton onClick={() => handleSort('hostUnit')} style={{ width: '100%', color: 'inherit' }}>
                  <Group justify="space-between" wrap="nowrap">
                    <span>Pass Type</span>
                    <Center>
                      {sortConfig?.key === 'hostUnit' ? (
                        sortConfig.direction === 'asc' ? <IconChevronUp size={14} /> : <IconChevronDown size={14} />
                      ) : (
                        <IconSelector size={14} color="gray" />
                      )}
                    </Center>
                  </Group>
                </UnstyledButton>
              </Table.Th>
              <Table.Th fw={700} fz="sm" c="dark">
                <UnstyledButton onClick={() => handleSort('validFrom')} style={{ width: '100%', color: 'inherit' }}>
                  <Group justify="space-between" wrap="nowrap">
                    <span>Validity</span>
                    <Center>
                      {sortConfig?.key === 'validFrom' ? (
                        sortConfig.direction === 'asc' ? <IconChevronUp size={14} /> : <IconChevronDown size={14} />
                      ) : (
                        <IconSelector size={14} color="gray" />
                      )}
                    </Center>
                  </Group>
                </UnstyledButton>
              </Table.Th>
              <Table.Th fw={700} fz="sm" c="dark">Status</Table.Th>
              <Table.Th fw={700} fz="sm" c="dark" ta="right">Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {sortedData.slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage).map((item) => (
              <Table.Tr key={item.id}>
                <Table.Td>
                  <Text size="sm" fw={700}>{item.id}</Text>
                </Table.Td>
                <Table.Td>
                  <Group gap="sm">
                    <ThemeIcon size="md" variant="light" color="indigo" radius="md">
                      <IconIdBadge size={18} />
                    </ThemeIcon>
                    <Stack gap={0}>
                      <Text size="sm" fw={500}>{item.visitor}</Text>
                      <Text size="xs" c="dimmed">Host: {item.hostUnit}</Text>
                    </Stack>
                  </Group>
                </Table.Td>
                <Table.Td>
                  <Text size="sm">{item.type}</Text>
                </Table.Td>
                <Table.Td>
                  <Stack gap={0}>
                    <Text size="xs" c="dimmed">From: {item.validFrom}</Text>
                    <Text size="xs" c="dimmed">To: {item.validTo}</Text>
                  </Stack>
                </Table.Td>
                <Table.Td>
                  <Badge variant="light" color={item.status === 'Active' ? 'green' : item.status === 'Expired' ? 'red' : 'orange'} fw={700}>
                    {item.status}
                  </Badge>
                </Table.Td>
                <Table.Td>
                  <Group gap={4} justify="flex-end">
                    <ActionIcon variant="subtle" color="teal" onClick={() => openQrModal(item)} title="Generate QR">
                      <IconQrcode size={16} />
                    </ActionIcon>
                    <ActionIcon component={Link} href={`/dashboard/visitors/registration/${item.id}`} variant="subtle" color="gray"><IconEye size={16} /></ActionIcon>
                    <ActionIcon variant="subtle" color="blue"><IconEdit size={16} /></ActionIcon>
                    <ActionIcon variant="subtle" color="red"><IconTrash size={16} /></ActionIcon>
                  </Group>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
        <Group justify="space-between" mt="md">
          <Text size="sm" c="dimmed">
            Showing {((activePage - 1) * itemsPerPage) + 1} to {Math.min(activePage * itemsPerPage, mockData.length)} of {mockData.length} entries
          </Text>
          <Pagination total={Math.ceil(mockData.length / itemsPerPage)} value={activePage} onChange={setPage} color="#014F86" />
        </Group>
      
      </Paper>

      <Modal opened={qrModalOpen} onClose={() => setQrModalOpen(false)} title="Visitor QR Code" centered>
        {selectedVisitor && (
          <Stack align="center" gap="md" p="md">
            <QRCodeSVG value={JSON.stringify(selectedVisitor)} size={200} />
            <Text fw={700} size="lg">{selectedVisitor.visitor}</Text>
            <Text size="sm" c="dimmed">Pass ID: {selectedVisitor.id}</Text>
            <Badge color={selectedVisitor.status === 'Active' ? 'green' : selectedVisitor.status === 'Expired' ? 'red' : 'orange'}>
              {selectedVisitor.status}
            </Badge>
            <Text size="xs" ta="center" mt="sm">
              Scan this QR code at the entrance for verification.
            </Text>
          </Stack>
        )}
      </Modal>
    </Stack>
  );
}
