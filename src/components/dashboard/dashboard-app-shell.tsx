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
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import classes from "./dashboard-app-shell.module.css";

export function DashboardAppShell({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) {
  const pathname = usePathname();

  const [propertyOpened, setPropertyOpened] = useState(false);
  const [financeOpened, setFinanceOpened] = useState(false);
  const [operationsOpened, setOperationsOpened] = useState(false);
  const [adminOpened, setAdminOpened] = useState(false);
  const [lang, setLang] = useState<"en" | "mm">("en");

  const languages = {
    en: { label: "English", flag: "https://flagcdn.com/w40/us.png" },
    mm: { label: "Myanmar", flag: "https://flagcdn.com/w40/mm.png" },
  };

  useEffect(() => {
    if (pathname.includes("/dashboard/units") || 
        pathname.includes("/dashboard/residents") || 
        pathname.includes("/dashboard/parking") || 
        pathname.includes("/dashboard/amenities")) {
      setPropertyOpened(true);
    }
    if (pathname.includes("/dashboard/billing") || 
        pathname.includes("/dashboard/payments") || 
        pathname.includes("/dashboard/reports")) {
      setFinanceOpened(true);
    }
    if (pathname.includes("/dashboard/maintenance") || 
        pathname.includes("/dashboard/visitors") || 
        pathname.includes("/dashboard/staff") || 
        pathname.includes("/dashboard/announcements")) {
      setOperationsOpened(true);
    }
    if (pathname.includes("/dashboard/staff") || 
        pathname.includes("/dashboard/documents") || 
        pathname.includes("/dashboard/settings")) {
      setAdminOpened(true);
    }
  }, [pathname]);

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
                  <Image src={languages[lang].flag} w={24} alt={languages[lang].label} />
                </Button>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item 
                  leftSection={<Image src={languages.en.flag} w={20} alt="English" />}
                  onClick={() => setLang("en")}
                >
                  English
                </Menu.Item>
                <Menu.Item 
                  leftSection={<Image src={languages.mm.flag} w={20} alt="Myanmar" />}
                  onClick={() => setLang("mm")}
                >
                  Myanmar
                </Menu.Item>
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
            component={Link}
            href="/dashboard"
            label="Dashboard"
            leftSection={<IconPalette size={20} />}
            className={classes.navLink}
            active={pathname === "/dashboard"}
          />

          <NavLink
            label="Property Management"
            leftSection={<IconHome size={20} />}
            childrenOffset={28}
            className={classes.navLink}
            opened={propertyOpened}
            onChange={setPropertyOpened}
          >
            <NavLink
              component={Link}
              href="/dashboard/units"
              label="Units"
              leftSection={<IconBuilding size={18} />}
              className={classes.navLink}
              active={pathname === "/dashboard/units"}
            />
            <NavLink
              component={Link}
              href="/dashboard/residents"
              label="Residents"
              leftSection={<IconUsers size={18} />}
              className={classes.navLink}
              active={pathname === "/dashboard/residents"}
            />
            <NavLink
              component={Link}
              href="/dashboard/parking"
              label="Parking"
              leftSection={<IconCar size={18} />}
              className={classes.navLink}
              active={pathname === "/dashboard/parking"}
            />
            <NavLink
              component={Link}
              href="/dashboard/amenities"
              label="Amenities"
              leftSection={<IconCalendar size={18} />}
              className={classes.navLink}
              active={pathname === "/dashboard/amenities"}
            />
          </NavLink>

          <NavLink
            label="Finance"
            leftSection={<IconReceipt size={20} />}
            childrenOffset={28}
            className={classes.navLink}
            opened={financeOpened}
            onChange={setFinanceOpened}
          >
            <NavLink
              component={Link}
              href="/dashboard/billing"
              label="Billing"
              leftSection={<IconReceipt size={18} />}
              className={classes.navLink}
              active={pathname === "/dashboard/billing"}
            />
            <NavLink
              component={Link}
              href="/dashboard/payments"
              label="Payments"
              leftSection={<IconCash size={18} />}
              className={classes.navLink}
              active={pathname === "/dashboard/payments"}
            />
            <NavLink
              component={Link}
              href="/dashboard/reports"
              label="Reports"
              leftSection={<IconChartBar size={18} />}
              className={classes.navLink}
              active={pathname === "/dashboard/reports"}
            />
          </NavLink>

          <NavLink
            label="Operations"
            leftSection={<IconTools size={20} />}
            childrenOffset={28}
            className={classes.navLink}
            opened={operationsOpened}
            onChange={setOperationsOpened}
          >
            <NavLink
              component={Link}
              href="/dashboard/maintenance"
              label="Maintenance"
              leftSection={<IconTools size={18} />}
              className={classes.navLink}
              active={pathname === "/dashboard/maintenance"}
            />
            <NavLink
              component={Link}
              href="/dashboard/visitors"
              label="Visitors"
              leftSection={<IconCar size={18} />}
              className={classes.navLink}
              active={pathname === "/dashboard/visitors"}
            />
            <NavLink
              component={Link}
              href="/dashboard/staff"
              label="Staff"
              leftSection={<IconUsers size={18} />}
              className={classes.navLink}
              active={pathname === "/dashboard/staff" && !pathname.includes('administration')}
            />
            <NavLink
              component={Link}
              href="/dashboard/announcements"
              label="Announcements"
              leftSection={<IconSpeakerphone size={18} />}
              className={classes.navLink}
              active={pathname === "/dashboard/announcements"}
            />
          </NavLink>

          <NavLink
            label="Administration"
            leftSection={<IconShieldCheck size={20} />}
            childrenOffset={28}
            className={classes.navLink}
            opened={adminOpened}
            onChange={setAdminOpened}
          >
            <NavLink
              component={Link}
              href="/dashboard/staff"
              label="User Management"
              leftSection={<IconUsers size={18} />}
              className={classes.navLink}
              active={pathname === "/dashboard/staff"}
            />
            <NavLink
              component={Link}
              href="/dashboard/documents"
              label="Documents"
              leftSection={<IconFileText size={18} />}
              className={classes.navLink}
              active={pathname === "/dashboard/documents"}
            />
            <NavLink
              component={Link}
              href="/dashboard/settings"
              label="Settings"
              leftSection={<IconSettings size={18} />}
              className={classes.navLink}
              active={pathname === "/dashboard/settings"}
            />
          </NavLink>
        </Box>
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
