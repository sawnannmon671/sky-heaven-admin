"use client";

import { AppShell, Group, NavLink, Text, Button, Menu, Box, Image, Stack } from "@mantine/core";
import {
  IconPalette,
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
  IconBell,
  IconUserCircle,
  IconChevronRight,
  IconCash,
  IconSpeakerphone,
  IconFileText,
  IconShieldCheck,
  IconHome,
  IconDatabase,
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
      <AppShell.Header className={classes.header}>
        <Group h="100%" px="md" justify="space-between">
          <Group gap="xs">
            <Image src="/sh.png" alt="Sky Haven Logo" h={32} w="auto" fit="contain" />
            <Text fw={700} size="lg" c="#014F86">
              Sky Haven CMS
            </Text>
          </Group>
          <Group gap="sm">
            <Menu shadow="md" width={150}>
              <Menu.Target>
                <Button variant="subtle" color="gray" px={8} radius="md">
                  <Image src="https://flagcdn.com/w40/us.png" w={24} alt="English" />
                </Button>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item leftSection={<Image src="https://flagcdn.com/w40/us.png" w={20} alt="English" />}>English</Menu.Item>
                <Menu.Item leftSection={<Image src="https://flagcdn.com/w40/mm.png" w={20} alt="Myanmar" />}>Myanmar</Menu.Item>
                <Menu.Item leftSection={<Image src="https://flagcdn.com/w40/th.png" w={20} alt="Thai" />}>Thai</Menu.Item>
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
            leftSection={<IconPalette size={20} />}
            className={classes.navLink}
          />

          <NavLink
            label="Property Management"
            leftSection={<IconHome size={20} />}
            childrenOffset={28}
            className={classes.navLink}
          >
            <NavLink
              href="/dashboard/units"
              label="Units"
              leftSection={<IconBuilding size={18} />}
              className={classes.navLink}
            />
            <NavLink
              href="/dashboard/residents"
              label="Residents"
              leftSection={<IconUsers size={18} />}
              className={classes.navLink}
            />
            <NavLink
              href="/dashboard/parking"
              label="Parking"
              leftSection={<IconCar size={18} />}
              className={classes.navLink}
            />
            <NavLink
              href="/dashboard/amenities"
              label="Amenities"
              leftSection={<IconCalendar size={18} />}
              className={classes.navLink}
            />
          </NavLink>

          <NavLink
            label="Finance"
            leftSection={<IconReceipt size={20} />}
            childrenOffset={28}
            className={classes.navLink}
          >
            <NavLink
              href="/dashboard/billing"
              label="Billing"
              leftSection={<IconReceipt size={18} />}
              className={classes.navLink}
            />
            <NavLink
              href="/dashboard/payments"
              label="Payments"
              leftSection={<IconCash size={18} />}
              className={classes.navLink}
            />
            <NavLink
              href="/dashboard/reports"
              label="Reports"
              leftSection={<IconChartBar size={18} />}
              className={classes.navLink}
            />
          </NavLink>

          <NavLink
            label="Operations"
            leftSection={<IconTools size={20} />}
            childrenOffset={28}
            className={classes.navLink}
          >
            <NavLink
              href="/dashboard/maintenance"
              label="Maintenance"
              leftSection={<IconTools size={18} />}
              className={classes.navLink}
            />
            <NavLink
              href="/dashboard/visitors"
              label="Visitors"
              leftSection={<IconCar size={18} />}
              className={classes.navLink}
            />
            <NavLink
              href="/dashboard/staff"
              label="Staff"
              leftSection={<IconUsers size={18} />}
              className={classes.navLink}
            />
            <NavLink
              href="/dashboard/announcements"
              label="Announcements"
              leftSection={<IconSpeakerphone size={18} />}
              className={classes.navLink}
            />
          </NavLink>

          <NavLink
            label="Administration"
            leftSection={<IconShieldCheck size={20} />}
            childrenOffset={28}
            className={classes.navLink}
          >
            <NavLink
              href="/dashboard/staff"
              label="User Management"
              leftSection={<IconUsers size={18} />}
              className={classes.navLink}
            />
            <NavLink
              href="/dashboard/documents"
              label="Documents"
              leftSection={<IconFileText size={18} />}
              className={classes.navLink}
            />
            <NavLink
              href="/dashboard/settings"
              label="Settings"
              leftSection={<IconSettings size={18} />}
              className={classes.navLink}
            />
          </NavLink>
        </Box>
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
