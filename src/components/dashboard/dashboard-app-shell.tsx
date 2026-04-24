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
  IconCreditCard,
  IconWallet,
} from "@tabler/icons-react";
import { signOut } from "next-auth/react";
import { Session } from "next-auth";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useLanguageStore } from "@/store/useLanguageStore";
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
  const [settingsOpened, setSettingsOpened] = useState(false);
  const { lang, setLang } = useLanguageStore();

  const languages = {
    en: { label: "English", flag: "https://flagcdn.com/w40/us.png" },
    mm: { label: "Myanmar", flag: "https://flagcdn.com/w40/mm.png" },
  };

  const t = {
    en: {
      dashboard: "Dashboard",
      propertyManagement: "Property Management",
      units: "Units",
      residents: "Residents",
      parking: "Parking",
      amenities: "Amenities",
      finance: "Finance",
      billing: "Billing",
      payments: "Payments",
      reports: "Reports",
      operations: "Operations",
      maintenance: "Maintenance",
      visitors: "Visitors",
      staff: "Staff",
      announcements: "Announcements",
      administration: "Administration",
      userManagement: "User Management",
      documents: "Documents",
      settings: "Settings",
      paymentType: "Payment Type",
      paymentMethod: "Payment Method",
      generalSettings: "General Settings",
      profile: "Profile",
      signOut: "Sign out",
    },
    mm: {
      dashboard: "ဒက်ရှ်ဘုတ်",
      propertyManagement: "အိမ်ခြံမြေစီမံခန့်ခွဲမှု",
      units: "ယူနစ်များ",
      residents: "နေထိုင်သူများ",
      parking: "ကားပါကင်",
      amenities: "အသုံးအဆောင်များ",
      finance: "ဘဏ္ဍာရေး",
      billing: "ငွေတောင်းခံလွှာ",
      payments: "ငွေပေးချေမှုများ",
      reports: "အစီရင်ခံစာများ",
      operations: "လုပ်ငန်းဆောင်ရွက်မှုများ",
      maintenance: "ပြုပြင်ထိန်းသိမ်းမှု",
      visitors: "ဧည့်သည်များ",
      staff: "ဝန်ထမ်းများ",
      announcements: "ကြေငြာချက်များ",
      administration: "စီမံခန့်ခွဲမှု",
      userManagement: "အသုံးပြုသူစီမံခန့်ခွဲမှု",
      documents: "စာရွက်စာတမ်းများ",
      settings: "ဆက်တင်များ",
      paymentType: "ငွေပေးချေမှုအမျိုးအစား",
      paymentMethod: "ငွေပေးချေမှုနည်းလမ်း",
      generalSettings: "အထွေထွေဆက်တင်များ",
      profile: "ပရိုဖိုင်",
      signOut: "ထွက်ရန်",
    },
  }[lang];

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
        pathname.includes("/dashboard/documents")) {
      setAdminOpened(true);
    }
    if (pathname.includes("/dashboard/settings")) {
      setSettingsOpened(true);
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
                <Menu.Item leftSection={<IconUser size={16} />}>{t.profile}</Menu.Item>
                <Menu.Item
                  leftSection={<IconLogout size={16} />}
                  onClick={() => signOut({ callbackUrl: "/login" })}
                >
                  {t.signOut}
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
            label={t.dashboard}
            leftSection={<IconPalette size={20} />}
            className={classes.navLink}
            active={pathname === "/dashboard"}
          />

          <NavLink
            label={t.propertyManagement}
            leftSection={<IconBuilding size={20} />}
            childrenOffset={28}
            className={classes.navLink}
            opened={propertyOpened}
            onChange={setPropertyOpened}
          >
            <NavLink
              component={Link}
              href="/dashboard/units"
              label={t.units}
              leftSection={<IconHome size={18} />}
              className={classes.navLink}
              active={pathname === "/dashboard/units"}
            />
            <NavLink
              component={Link}
              href="/dashboard/residents"
              label={t.residents}
              leftSection={<IconUsers size={18} />}
              className={classes.navLink}
              active={pathname === "/dashboard/residents"}
            />
            <NavLink
              component={Link}
              href="/dashboard/parking"
              label={t.parking}
              leftSection={<IconCar size={18} />}
              className={classes.navLink}
              active={pathname === "/dashboard/parking"}
            />
            <NavLink
              component={Link}
              href="/dashboard/amenities"
              label={t.amenities}
              leftSection={<IconCalendar size={18} />}
              className={classes.navLink}
              active={pathname === "/dashboard/amenities"}
            />
          </NavLink>

          <NavLink
            label={t.finance}
            leftSection={<IconReceipt size={20} />}
            childrenOffset={28}
            className={classes.navLink}
            opened={financeOpened}
            onChange={setFinanceOpened}
          >
            <NavLink
              component={Link}
              href="/dashboard/billing"
              label={t.billing}
              leftSection={<IconReceipt size={18} />}
              className={classes.navLink}
              active={pathname === "/dashboard/billing"}
            />
            <NavLink
              component={Link}
              href="/dashboard/payments"
              label={t.payments}
              leftSection={<IconCash size={18} />}
              className={classes.navLink}
              active={pathname === "/dashboard/payments"}
            />
            <NavLink
              component={Link}
              href="/dashboard/reports"
              label={t.reports}
              leftSection={<IconChartBar size={18} />}
              className={classes.navLink}
              active={pathname === "/dashboard/reports"}
            />
          </NavLink>

          <NavLink
            label={t.operations}
            leftSection={<IconTools size={20} />}
            childrenOffset={28}
            className={classes.navLink}
            opened={operationsOpened}
            onChange={setOperationsOpened}
          >
            <NavLink
              component={Link}
              href="/dashboard/maintenance"
              label={t.maintenance}
              leftSection={<IconTools size={18} />}
              className={classes.navLink}
              active={pathname === "/dashboard/maintenance"}
            />
            <NavLink
              component={Link}
              href="/dashboard/visitors"
              label={t.visitors}
              leftSection={<IconCar size={18} />}
              className={classes.navLink}
              active={pathname === "/dashboard/visitors"}
            />
            <NavLink
              component={Link}
              href="/dashboard/staff"
              label={t.staff}
              leftSection={<IconUsers size={18} />}
              className={classes.navLink}
              active={pathname === "/dashboard/staff" && !pathname.includes('administration')}
            />
            <NavLink
              component={Link}
              href="/dashboard/announcements"
              label={t.announcements}
              leftSection={<IconSpeakerphone size={18} />}
              className={classes.navLink}
              active={pathname === "/dashboard/announcements"}
            />
          </NavLink>

          <NavLink
            label={t.administration}
            leftSection={<IconShieldCheck size={20} />}
            childrenOffset={28}
            className={classes.navLink}
            opened={adminOpened}
            onChange={setAdminOpened}
          >
            <NavLink
              component={Link}
              href="/dashboard/staff"
              label={t.userManagement}
              leftSection={<IconUsers size={18} />}
              className={classes.navLink}
              active={pathname === "/dashboard/staff"}
            />
            <NavLink
              component={Link}
              href="/dashboard/documents"
              label={t.documents}
              leftSection={<IconFileText size={18} />}
              className={classes.navLink}
              active={pathname === "/dashboard/documents"}
            />
          </NavLink>

          <NavLink
            label={t.settings}
            leftSection={<IconSettings size={20} />}
            childrenOffset={28}
            className={classes.navLink}
            opened={settingsOpened}
            onChange={setSettingsOpened}
          >
            <NavLink
              component={Link}
              href="/dashboard/settings/payment-type"
              label={t.paymentType}
              leftSection={<IconCreditCard size={18} />}
              className={classes.navLink}
              active={pathname === "/dashboard/settings/payment-type"}
            />
            <NavLink
              component={Link}
              href="/dashboard/settings/payment-method"
              label={t.paymentMethod}
              leftSection={<IconWallet size={18} />}
              className={classes.navLink}
              active={pathname === "/dashboard/settings/payment-method"}
            />
            <NavLink
              component={Link}
              href="/dashboard/settings"
              label={t.generalSettings}
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
