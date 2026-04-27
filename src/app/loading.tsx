import { Center, Loader, Stack, Text } from "@mantine/core";

export default function RootLoading() {
  return (
    <Center h="100vh" w="100vw">
      <Stack align="center" gap="sm">
        <Loader size="md" color="#014F86" type="dots" />
        <Text c="dimmed" size="sm" fw={500}>Loading application...</Text>
      </Stack>
    </Center>
  );
}
