import { redirect, signOut } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import {
  AppShell,
  Burger,
  Group,
  NavLink,
  Box,
  Text,
  Button,
  Menu,
} from "@mantine/core";
import {
  IconDashboard,
  IconUsers,
  IconBuilding,
  IconReceipt,
  IconTools,
  IconCalendar,
  IconCar,
  IconUser,
  IconBell,
  IconChartBar,
  IconLogout,
} from "@tabler/icons-react";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 250, breakpoint: "sm" }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Text fw={700} size="lg">
            Sky Heaven
          </Text>
          <Menu shadow="md" width={200}>
            <Menu.Target>
              <Button variant="subtle" size="sm">
                {session.user?.name || "Admin"}
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

      <AppShell.Navbar p="md">
        <NavLink
          href="/dashboard"
          label="Dashboard"
          leftSection={<IconDashboard size={20} />}
        />
        <NavLink
          href="/dashboard/units"
          label="Units"
          leftSection={<IconBuilding size={20} />}
        />
        <NavLink
          href="/dashboard/residents"
          label="Residents"
          leftSection={<IconUsers size={20} />}
        />
        <NavLink
          href="/dashboard/billing"
          label="Billing"
          leftSection={<IconReceipt size={20} />}
        />
        <NavLink
          href="/dashboard/maintenance"
          label="Maintenance"
          leftSection={<IconTools size={20} />}
        />
        <NavLink
          href="/dashboard/staff"
          label="Staff"
          leftSection={<IconUser size={20} />}
        />
        <NavLink
          href="/dashboard/visitors"
          label="Visitors"
          leftSection={<IconCalendar size={20} />}
        />
        <NavLink
          href="/dashboard/parking"
          label="Parking"
          leftSection={<IconCar size={20} />}
        />
        <NavLink
          href="/dashboard/announcements"
          label="Announcements"
          leftSection={<IconBell size={20} />}
        />
        <NavLink
          href="/dashboard/reports"
          label="Reports"
          leftSection={<IconChartBar size={20} />}
        />
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
