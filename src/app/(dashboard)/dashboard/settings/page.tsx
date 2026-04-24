"use client";

import {
  Title,
  Paper,
  Stack,
  Text,
  ColorPicker,
  Group,
  ColorSwatch,
  useMantineTheme,
  Box,
  SimpleGrid,
  useMantineColorScheme,
  Switch,
} from "@mantine/core";
import { useThemeStore } from "@/lib/theme-store";

const SWATCH_COLORS = [
  "blue",
  "cyan",
  "grape",
  "green",
  "indigo",
  "lime",
  "orange",
  "pink",
  "red",
  "teal",
  "violet",
  "yellow",
];

export default function SettingsPage() {
  const theme = useMantineTheme();
  const { primaryColor, setPrimaryColor } = useThemeStore();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <Stack gap="xl">
      <Title order={2}>Settings</Title>

      <Paper p="md" radius="md" withBorder>
        <Stack gap="md">
          <Title order={4}>Appearance</Title>
          <Group justify="space-between">
            <Box>
              <Text fw={500}>Dark Mode</Text>
              <Text size="xs" c="dimmed">
                Switch between light and dark color schemes
              </Text>
            </Box>
            <Switch
              size="lg"
              onLabel="Dark"
              offLabel="Light"
              checked={colorScheme === "dark"}
              onChange={() => toggleColorScheme()}
            />
          </Group>
        </Stack>
      </Paper>

      <Paper p="md" radius="md" withBorder>
        <Stack gap="md">
          <Box>
            <Title order={4}>Theme Color</Title>
            <Text size="xs" c="dimmed">
              Select the primary color for the application
            </Text>
          </Box>

          <SimpleGrid cols={{ base: 3, xs: 4, sm: 6 }} spacing="xs">
            {SWATCH_COLORS.map((color) => (
              <Paper
                key={color}
                p="xs"
                withBorder
                style={{
                  cursor: "pointer",
                  backgroundColor:
                    primaryColor === color
                      ? theme.colors[color][theme.colorScheme === "dark" ? 9 : 0]
                      : "transparent",
                  borderColor: primaryColor === color ? theme.colors[color][6] : undefined,
                }}
                onClick={() => setPrimaryColor(color)}
              >
                <Stack align="center" gap={4}>
                  <ColorSwatch color={theme.colors[color][6]} size={20} />
                  <Text size="xs" tt="capitalize" fw={primaryColor === color ? 700 : 400}>
                    {color}
                  </Text>
                </Stack>
              </Paper>
            ))}
          </SimpleGrid>
        </Stack>
      </Paper>

      <Paper p="md" radius="md" withBorder>
        <Stack gap="md">
          <Title order={4}>About</Title>
          <Text size="sm">
            <Text component="span" c="#014F86" fw={700}>Sky Haven CMS</Text> v0.1.0
          </Text>
        </Stack>
      </Paper>
    </Stack>
  );
}
