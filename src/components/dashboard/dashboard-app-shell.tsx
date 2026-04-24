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
  IconChartBar,
  IconLogout,
  IconSettings,
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
          <Text fw={700} size="lg">
            Sky Heaven Admin
          </Text>
          <Menu shadow="md" width={200}>
            <Menu.Target>
              <Button variant="subtle" size="sm">
                {session?.user?.name || "Admin"}
              </Button>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                leftSection={<IconLogout size={16} />}
                onClick={() => signOut({ callbackUrl: "/login" })}
              >
                Sign out
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
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
