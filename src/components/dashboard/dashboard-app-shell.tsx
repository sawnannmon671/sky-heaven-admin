"use client";

import { AppShell, Group, NavLink, Text, Button, Menu, Box, Image, Stack } from "@mantine/core";
import {
  IconDashboard,
  IconUsers,
  IconBuilding,
  IconReceipt,
  IconTools,
  IconCalendar,
  IconCar,
  IconUser,
  IconVideo,
  IconChartBar,
  IconLogout,
  IconSettings,
  IconBell,
  IconUserCircle,
} from "@tabler/icons-react";
import { signOut } from "next-auth/react";
import { Session } from "next-auth";
import classes from "./dashboard-app-shell.module.css";

export function DashboardAppShell({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) {
  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 250, breakpoint: "sm" }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Group gap="xs">
            <Image src="/sh.png" alt="Sky Heaven Logo" h={32} w="auto" fit="contain" />
            <Text fw={700} size="lg">
              Sky Heaven Admin
            </Text>
          </Group>
          <Group gap="sm">
            <Menu shadow="md" width={150}>
              <Menu.Target>
                <Button variant="subtle" color="gray" p={4} radius="md">
                  <Text size="xl">🇺🇸</Text>
                </Button>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item leftSection={<Text size="lg">🇺🇸</Text>}>English</Menu.Item>
                <Menu.Item leftSection={<Text size="lg">🇲🇲</Text>}>Myanmar</Menu.Item>
                <Menu.Item leftSection={<Text size="lg">🇹🇭</Text>}>Thai</Menu.Item>
              </Menu.Dropdown>
            </Menu>
            <Button variant="subtle" color="gray" p={4} radius="md">
              <IconBell size={22} />
            </Button>
            <Menu shadow="md" width={200}>
              <Menu.Target>
                <Button variant="subtle" color="gray" p={4} radius="md">
                  <IconUserCircle size={24} />
                </Button>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Label>{session?.user?.name || "Admin"}</Menu.Label>
                <Menu.Item leftSection={<IconUser size={16} />}>Profile</Menu.Item>
                <Menu.Item
                  leftSection={<IconLogout size={16} />}
                  onClick={() => signOut({ callbackUrl: "/login" })}
                >
                  Sign out
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar className={classes.navbar}>
        <Box className={classes.navbarLinks}>
          <NavLink
            href="/dashboard"
            label="Dashboard"
            leftSection={<IconDashboard size={20} />}
            className={classes.navLink}
          />
          <NavLink
            href="/dashboard/units"
            label="Units"
            leftSection={<IconBuilding size={20} />}
            className={classes.navLink}
          />
          <NavLink
            href="/dashboard/residents"
            label="Residents"
            leftSection={<IconUsers size={20} />}
            className={classes.navLink}
          />
          <NavLink
            href="/dashboard/billing"
            label="Billing"
            leftSection={<IconReceipt size={20} />}
            className={classes.navLink}
          />
          <NavLink
            href="/dashboard/maintenance"
            label="Maintenance"
            leftSection={<IconTools size={20} />}
            className={classes.navLink}
          />
          <NavLink
            href="/dashboard/video-call"
            label="Video Call"
            leftSection={<IconVideo size={20} />}
            className={classes.navLink}
          />
          <NavLink
            href="/dashboard/visitors"
            label="Visitors"
            leftSection={<IconCar size={20} />}
            className={classes.navLink}
          />
          <NavLink
            href="/dashboard/amenities"
            label="Amenities"
            leftSection={<IconCalendar size={20} />}
            className={classes.navLink}
          />
          <NavLink
            href="/dashboard/reports"
            label="Reports"
            leftSection={<IconChartBar size={20} />}
            className={classes.navLink}
          />
          <NavLink
            href="/dashboard/staff"
            label="User Management"
            leftSection={<IconUser size={20} />}
            className={classes.navLink}
          />
          <NavLink
            href="/dashboard/settings"
            label="Settings"
            leftSection={<IconSettings size={20} />}
            className={classes.navLink}
          />
        </Box>
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
