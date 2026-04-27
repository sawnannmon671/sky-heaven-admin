import { Center, Loader, Stack, Text } from "@mantine/core";

export default function DashboardLoading() {
  return (
    <Center h="100%" w="100%" mih="70vh">
      <Stack align="center" gap="sm">
        <Loader size="md" color="#014F86" type="dots" />
        <Text c="dimmed" size="sm" fw={500}>Loading content...</Text>
      </Stack>
    </Center>
  );
}
