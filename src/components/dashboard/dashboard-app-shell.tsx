"use client";

import { AppShell, Group, NavLink, Text, Button, Menu, Box, Image, Stack, Avatar, Divider, Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
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
  IconUsersGroup,
  IconUserPlus,
  IconAddressBook,
  IconFileInvoice,
  IconDroplet,
  IconAlertTriangle,
  IconHistory,
  IconRotate2,
  IconReportMoney,
  IconChartPie,
  IconTicket,
  IconClipboardList,
  IconUserCog,
  IconCalendarStats,
  IconMessageExclamation,
  IconParkingCircle,
  IconId,
  IconUserCheck,
  IconDoorEnter,
  IconIdBadge,
  IconTruck,
  IconPool,
  IconBarbell,
  IconArmchair,
  IconGlassFull,
  IconMail,
  IconMessageReport,
  IconUserShield,
  IconBrush,
  IconClock,
  IconCalendarTime,
  IconCloudUpload,
  IconKey,
  IconLock,
  IconEye,
  IconBuildingSkyscraper,
  IconCoin,
  IconDeviceFloppy,
} from "@tabler/icons-react";
import { signOut } from "next-auth/react";
import { Session } from "next-auth";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useTranslation } from "@/hooks/useTranslation";
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
  const [residentOpened, setResidentOpened] = useState(false);
  const [financeOpened, setFinanceOpened] = useState(false);
  const [operationsOpened, setOperationsOpened] = useState(false);
  const [parkingOpened, setParkingOpened] = useState(false);
  const [visitorOpened, setVisitorOpened] = useState(false);
  const [amenitiesOpened, setAmenitiesOpened] = useState(false);
  const [communicationOpened, setCommunicationOpened] = useState(false);
  const [staffOpened, setStaffOpened] = useState(false);
  const [adminOpened, setAdminOpened] = useState(false);
  const [reportsOpened, setReportsOpened] = useState(false);
  const [userManagementOpened, setUserManagementOpened] = useState(false);
  const [settingsOpened, setSettingsOpened] = useState(false);
  const [masterSettingOpened, setMasterSettingOpened] = useState(false);
  const { lang, setLang, mounted } = useTranslation();
  const [opened, { toggle }] = useDisclosure(true);

  const languages = {
    en: { label: "English", flag: "https://flagcdn.com/w40/us.png" },
    mm: { label: "Myanmar", flag: "https://flagcdn.com/w40/mm.png" },
  };

  const safeLang = (lang === "mm" ? "mm" : "en") as keyof typeof languages;

  const t = {
    en: {
      home: "Home",
      dashboard: "Dashboard",
      masterSetting: "Master Setting",
      propertyManagement: "Property",
      buildings: "Buildings / Towers",
      floors: "Floors",
      units: "Units / Rooms",
      unitTypes: "Unit Types",
      facilities: "Facilities / Common Areas",
      residentManagement: "Resident",
      owners: "Owners",
      tenants: "Tenants",
      familyMembers: "Family Members",
      moveInOut: "Move In / Move Out",
      residentDirectory: "Resident Directory",
      billingFinance: "Billing & Finance",
      invoiceGeneration: "Invoice Generation",
      maintenanceFees: "Monthly Maintenance Fees",
      utilityBills: "Utility Bills",
      lateFees: "Late Fees / Penalties",
      paymentRecords: "Payment Records",
      refunds: "Refunds",
      expenseTracking: "Expense Tracking",
      financialReports: "Financial Reports",
      maintenance: "Maintenance",
      createTicket: "Create Ticket",
      workOrders: "Work Orders",
      technicianAssignment: "Technician Assignment",
      preventiveMaintenance: "Schedule Preventive Maintenance",
      complaintManagement: "Complaint",
      parkingManagement: "Parking",
      parkingSlots: "Parking Slots",
      vehicleRegistration: "Vehicle Registration",
      guestParking: "Guest Parking",
      parkingFees: "Parking Fees",
      visitorManagement: "Visitor",
      visitorEntry: "Visitor Entry",
      visitorPass: "Visitor Pass",
      deliveryLogs: "Delivery Logs",
      securityApproval: "Security Approval",
      amenitiesBooking: "Amenities Booking",
      gymBooking: "Gym Booking",
      poolBooking: "Pool Booking",
      meetingRoom: "Meeting Room",
      eventHall: "Event Hall Reservation",
      communication: "Communication",
      announcements: "Announcements",
      notices: "Notices",
      broadcast: "SMS / Email Broadcast",
      feedback: "Complaint Feedback",
      staffManagement: "Staff",
      staffList: "Staff List",
      securityGuards: "Security Guards",
      cleaningStaff: "Cleaning Staff",
      attendance: "Attendance",
      shiftSchedule: "Shift Schedule",
      documents: "Documents",
      contracts: "Contracts",
      residentForms: "Resident Forms",
      rules: "Rules & Regulations",
      uploadFiles: "Upload Files",
      reports: "Reports",
      paymentReport: "Payment Report",
      occupancyReport: "Occupancy Report",
      maintenanceReport: "Maintenance Report",
      visitorReport: "Visitor Report",
      parkingReport: "Parking Report",
      userManagement: "User Management",
      users: "Users",
      roles: "Roles & Permissions",
      accessLogs: "Access Logs",
      settings: "Settings",
      companyProfile: "Company Profile",
      condoInfo: "Condo Info",
      currencyTax: "Currency / Tax",
      notificationSettings: "Notification Settings",
      backup: "Backup",
      profile: "Profile",
      signOut: "Sign out",
    },
    mm: {
      home: "ပင်မစာမျက်နှာ",
      dashboard: "ဒက်ရှ်ဘုတ်",
      masterSetting: "အခြေခံဆက်တင်များ",
      propertyManagement: "အိမ်ခြံမြေ",
      buildings: "အဆောက်အဦးများ / မျှော်စင်များ",
      floors: "အလွှာများ",
      units: "ယူနစ်များ / အခန်းများ",
      unitTypes: "ယူနစ်အမျိုးအစားများ",
      facilities: "အသုံးအဆောင်များ / ဘုံနေရာများ",
      residentManagement: "နေထိုင်သူ",
      owners: "အိမ်ပိုင်ရှင်များ",
      tenants: "အငှားနေထိုင်သူများ",
      familyMembers: "မိသားစုဝင်များ",
      moveInOut: "အဝင် / အထွက်",
      residentDirectory: "နေထိုင်သူများစာရင်း",
      billingFinance: "ငွေတောင်းခံလွှာနှင့် ဘဏ္ဍာရေး",
      invoiceGeneration: "ငွေတောင်းခံလွှာထုတ်ခြင်း",
      maintenanceFees: "လစဉ်ထိန်းသိမ်းခများ",
      utilityBills: "ယူတီလီတီဘေလ်များ",
      lateFees: "နောက်ကျကြေးများ",
      paymentRecords: "ငွေပေးချေမှုမှတ်တမ်းများ",
      refunds: "ငွေပြန်အမ်းမှုများ",
      expenseTracking: "အသုံးစရိတ်ခြေရာခံခြင်း",
      financialReports: "ဘဏ္ဍာရေးအစီရင်ခံစာများ",
      maintenance: "ပြုပြင်ထိန်းသိမ်းမှု",
      createTicket: "တိုင်ကြားချက်အသစ်ဖွင့်ရန်",
      workOrders: "လုပ်ငန်းအမိန့်များ",
      technicianAssignment: "စက်မှုကျွမ်းကျင်သူတာဝန်ပေးခြင်း",
      preventiveMaintenance: "ကြိုတင်ထိန်းသိမ်းမှုအချိန်ဇယား",
      complaintManagement: "တိုင်ကြားချက်",
      parkingManagement: "ကားပါကင်",
      parkingSlots: "ကားပါကင်နေရာများ",
      vehicleRegistration: "ယာဉ်မှတ်ပုံတင်ခြင်း",
      guestParking: "ဧည့်သည်ကားပါကင်",
      parkingFees: "ကားပါကင်ခများ",
      visitorManagement: "ဧည့်သည်",
      visitorEntry: "ဧည့်သည်အဝင်",
      visitorPass: "ဧည့်သည်ဝင်ခွင့်ကတ်",
      deliveryLogs: "ပို့ဆောင်မှုမှတ်တမ်းများ",
      securityApproval: "လုံခြုံရေးအတည်ပြုချက်",
      amenitiesBooking: "အသုံးအဆောင်ဘွတ်ကင်လုပ်ခြင်း",
      gymBooking: "ဂျင်မ်ဘွတ်ကင်",
      poolBooking: "ရေကူးကန်ဘွတ်ကင်",
      meetingRoom: "အစည်းအဝေးခန်း",
      eventHall: "ပွဲခန်းမဘွတ်ကင်",
      communication: "ဆက်သွယ်ရေး",
      announcements: "ကြေငြာချက်များ",
      notices: "အသိပေးချက်များ",
      broadcast: "SMS / အီးမေးလ် ပေးပို့ခြင်း",
      feedback: "တိုင်ကြားချက်တုံ့ပြန်မှု",
      staffManagement: "ဝန်ထမ်း",
      staffList: "ဝန်ထမ်းစာရင်း",
      securityGuards: "လုံခြုံရေးဝန်ထမ်းများ",
      cleaningStaff: "သန့်ရှင်းရေးဝန်ထမ်းများ",
      attendance: "တက်ရောက်မှု",
      shiftSchedule: "အလှည့်ကျတာဝန်အချိန်ဇယား",
      documents: "စာရွက်စာတမ်းများ",
      contracts: "စာချုပ်များ",
      residentForms: "နေထိုင်သူပုံစံများ",
      rules: "စည်းမျဉ်းစည်းကမ်းများ",
      uploadFiles: "ဖိုင်တင်ရန်",
      reports: "အစီရင်ခံစာများ",
      paymentReport: "ငွေပေးချေမှုအစီရင်ခံစာ",
      occupancyReport: "နေထိုင်မှုအစီရင်ခံစာ",
      maintenanceReport: "ပြုပြင်ထိန်းသိမ်းမှုအစီရင်ခံစာ",
      visitorReport: "ဧည့်သည်အစီရင်ခံစာ",
      parkingReport: "ကားပါကင်အစီရင်ခံစာ",
      userManagement: "အသုံးပြုသူစီမံခန့်ခွဲမှု",
      users: "အသုံးပြုသူများ",
      roles: "အခန်းကဏ္ဍနှင့် ခွင့်ပြုချက်များ",
      accessLogs: "ဝင်ရောက်မှုမှတ်တမ်းများ",
      settings: "ဆက်တင်များ",
      companyProfile: "ကုမ္ပဏီအချက်အလက်",
      condoInfo: "ကွန်ဒိုအချက်အလက်",
      currencyTax: "ငွေကြေးနှင့် အခွန်",
      notificationSettings: "အကြောင်းကြားချက်ဆက်တင်များ",
      backup: "ဒေတာသိမ်းဆည်းမှု",
      profile: "ပရိုဖိုင်",
      signOut: "ထွက်ရန်",
    },
  }[safeLang];

  useEffect(() => {
    if (!pathname) return;

    if (pathname.includes("/dashboard/buildings") || 
        pathname.includes("/dashboard/floors") || 
        pathname.includes("/dashboard/units") || 
        pathname.includes("/dashboard/facilities")) {
      setPropertyOpened(true);
    }
    if (pathname.includes("/dashboard/residents")) {
      setResidentOpened(true);
    }
    if (pathname.includes("/dashboard/billing") || 
        pathname.includes("/dashboard/payments") || 
        pathname.includes("/dashboard/finance")) {
      setFinanceOpened(true);
    }
    if (pathname.includes("/dashboard/maintenance")) {
      setOperationsOpened(true);
    }
    if (pathname.includes("/dashboard/parking")) {
      setParkingOpened(true);
    }
    if (pathname.includes("/dashboard/visitors")) {
      setVisitorOpened(true);
    }
    if (pathname.includes("/dashboard/amenities")) {
      setAmenitiesOpened(true);
    }
    if (pathname.includes("/dashboard/communication") || 
        pathname.includes("/dashboard/announcements")) {
      setCommunicationOpened(true);
    }
    if (pathname.includes("/dashboard/staff")) {
      setStaffOpened(true);
    }
    if (pathname.includes("/dashboard/documents")) {
      setAdminOpened(true);
    }
    if (pathname.includes("/dashboard/reports")) {
      setReportsOpened(true);
    }
    if (pathname.includes("/dashboard/user-management")) {
      setUserManagementOpened(true);
    }
    if (pathname.includes("/dashboard/master-setting") || pathname.includes("/dashboard/master-setting/unit-types")) {
      setMasterSettingOpened(true);
    }
    if (pathname.includes("/dashboard/settings")) {
      setSettingsOpened(true);
    }
  }, [pathname]);

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ 
        width: 250, 
        breakpoint: "sm",
        collapsed: { mobile: !opened, desktop: !opened }
      }}
      padding="md"
    >
      <AppShell.Header className={classes.header}>
        <Group h="100%" px="md" justify="space-between">
          <Group gap="xs">
            <Image src="/sh.png" alt="Sky Haven Logo" h={32} w="auto" fit="contain" />
            <Text fw={700} size="lg" c="#014F86">
              Sky Haven CMS
            </Text>
            <Burger opened={!opened} onClick={toggle} size="sm" color="#014F86" ml="xs" />
          </Group>
          <Group gap="sm">
            <Menu shadow="md" width={150}>
              <Menu.Target>
                <Button variant="subtle" color="gray" px={8} radius="md">
                  <Image src={languages[safeLang].flag} w={24} alt={languages[safeLang].label} />
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
                <Button variant="subtle" color="gray" px="xs" radius="md">
                  <Group gap="xs">
                    <IconUserCircle size={24} />
                    <Text size="sm" fw={500} visibleFrom="sm">
                      {session?.user?.name || "Admin"}
                    </Text>
                  </Group>
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
            label={t.masterSetting}
            leftSection={<IconSettings size={20} />}
            childrenOffset={28}
            className={classes.navLink}
            opened={masterSettingOpened}
            onChange={setMasterSettingOpened}
          >
            <NavLink
              component={Link}
              href="/dashboard/master-setting/unit-types"
              label={t.unitTypes}
              leftSection={<IconPalette size={18} />}
              className={classes.navLink}
              active={pathname === "/dashboard/master-setting/unit-types"}
            />
            <NavLink component={Link} href="/dashboard/master-setting/payment-method" label="Payment Methods" leftSection={<IconCreditCard size={18} />} className={classes.navLink} active={pathname === "/dashboard/master-setting/payment-method"} />
            <NavLink component={Link} href="/dashboard/master-setting/payment-type" label="Payment Types" leftSection={<IconCoin size={18} />} className={classes.navLink} active={pathname === "/dashboard/master-setting/payment-type"} />
          </NavLink>

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
              href="/dashboard/buildings"
              label={t.buildings}
              leftSection={<IconBuilding size={18} />}
              className={classes.navLink}
              active={pathname === "/dashboard/buildings"}
            />
            <NavLink
              component={Link}
              href="/dashboard/floors"
              label={t.floors}
              leftSection={<IconDatabase size={18} />}
              className={classes.navLink}
              active={pathname === "/dashboard/floors"}
            />
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
              href="/dashboard/facilities"
              label={t.facilities}
              leftSection={<IconBuilding size={18} />}
              className={classes.navLink}
              active={pathname === "/dashboard/facilities"}
            />
          </NavLink>

          <NavLink
            label={t.residentManagement}
            leftSection={<IconUsers size={20} />}
            childrenOffset={28}
            className={classes.navLink}
            opened={residentOpened}
            onChange={setResidentOpened}
          >
            <NavLink component={Link} href="/dashboard/residents/owners" label={t.owners} leftSection={<IconUser size={18} />} className={classes.navLink} active={pathname === "/dashboard/residents/owners"} />
            <NavLink component={Link} href="/dashboard/residents/tenants" label={t.tenants} leftSection={<IconUsersGroup size={18} />} className={classes.navLink} active={pathname === "/dashboard/residents/tenants"} />
            <NavLink component={Link} href="/dashboard/residents/family" label={t.familyMembers} leftSection={<IconUsers size={18} />} className={classes.navLink} active={pathname === "/dashboard/residents/family"} />
            <NavLink component={Link} href="/dashboard/residents/move-in-out" label={t.moveInOut} leftSection={<IconUserPlus size={18} />} className={classes.navLink} active={pathname === "/dashboard/residents/move-in-out"} />
            <NavLink component={Link} href="/dashboard/residents/directory" label={t.residentDirectory} leftSection={<IconAddressBook size={18} />} className={classes.navLink} active={pathname === "/dashboard/residents/directory"} />
          </NavLink>

          <NavLink
            label={t.billingFinance}
            leftSection={<IconReceipt size={20} />}
            childrenOffset={28}
            className={classes.navLink}
            opened={financeOpened}
            onChange={setFinanceOpened}
          >
            <NavLink component={Link} href="/dashboard/billing/invoice" label={t.invoiceGeneration} leftSection={<IconFileInvoice size={18} />} className={classes.navLink} active={pathname === "/dashboard/billing/invoice"} />
            <NavLink component={Link} href="/dashboard/billing/maintenance" label={t.maintenanceFees} leftSection={<IconTools size={18} />} className={classes.navLink} active={pathname === "/dashboard/billing/maintenance"} />
            <NavLink component={Link} href="/dashboard/billing/utilities" label={t.utilityBills} leftSection={<IconDroplet size={18} />} className={classes.navLink} active={pathname === "/dashboard/billing/utilities"} />
            <NavLink component={Link} href="/dashboard/billing/late-fees" label={t.lateFees} leftSection={<IconAlertTriangle size={18} />} className={classes.navLink} active={pathname === "/dashboard/billing/late-fees"} />
            <NavLink component={Link} href="/dashboard/billing/payments" label={t.paymentRecords} leftSection={<IconHistory size={18} />} className={classes.navLink} active={pathname === "/dashboard/billing/payments"} />
            <NavLink component={Link} href="/dashboard/billing/refunds" label={t.refunds} leftSection={<IconRotate2 size={18} />} className={classes.navLink} active={pathname === "/dashboard/billing/refunds"} />
            <NavLink component={Link} href="/dashboard/billing/expenses" label={t.expenseTracking} leftSection={<IconReportMoney size={18} />} className={classes.navLink} active={pathname === "/dashboard/billing/expenses"} />
            <NavLink component={Link} href="/dashboard/billing/reports" label={t.financialReports} leftSection={<IconChartPie size={18} />} className={classes.navLink} active={pathname === "/dashboard/billing/reports"} />
          </NavLink>

          <NavLink
            label={t.maintenance}
            leftSection={<IconTools size={20} />}
            childrenOffset={28}
            className={classes.navLink}
            opened={operationsOpened}
            onChange={setOperationsOpened}
          >
            <NavLink component={Link} href="/dashboard/maintenance/create" label={t.createTicket} leftSection={<IconTicket size={18} />} className={classes.navLink} active={pathname === "/dashboard/maintenance/create"} />
            <NavLink component={Link} href="/dashboard/maintenance/orders" label={t.workOrders} leftSection={<IconClipboardList size={18} />} className={classes.navLink} active={pathname === "/dashboard/maintenance/orders"} />
            <NavLink component={Link} href="/dashboard/maintenance/technician" label={t.technicianAssignment} leftSection={<IconUserCog size={18} />} className={classes.navLink} active={pathname === "/dashboard/maintenance/technician"} />
            <NavLink component={Link} href="/dashboard/maintenance/preventive" label={t.preventiveMaintenance} leftSection={<IconCalendarStats size={18} />} className={classes.navLink} active={pathname === "/dashboard/maintenance/preventive"} />
            <NavLink component={Link} href="/dashboard/maintenance/complaints" label={t.complaintManagement} leftSection={<IconMessageExclamation size={18} />} className={classes.navLink} active={pathname === "/dashboard/maintenance/complaints"} />
          </NavLink>

          {/* Parking Menu Hidden
          <NavLink
            label={t.parkingManagement}
            leftSection={<IconCar size={20} />}
            childrenOffset={28}
            className={classes.navLink}
            opened={parkingOpened}
            onChange={setParkingOpened}
          >
            <NavLink component={Link} href="/dashboard/parking/slots" label={t.parkingSlots} leftSection={<IconParkingCircle size={18} />} className={classes.navLink} active={pathname === "/dashboard/parking/slots"} />
            <NavLink component={Link} href="/dashboard/parking/registration" label={t.vehicleRegistration} leftSection={<IconId size={18} />} className={classes.navLink} active={pathname === "/dashboard/parking/registration"} />
            <NavLink component={Link} href="/dashboard/parking/guest" label={t.guestParking} leftSection={<IconUserCheck size={18} />} className={classes.navLink} active={pathname === "/dashboard/parking/guest"} />
          </NavLink>
          */}

          <NavLink
            label={t.visitorManagement}
            leftSection={<IconDoorEnter size={20} />}
            childrenOffset={28}
            className={classes.navLink}
            opened={visitorOpened}
            onChange={setVisitorOpened}
          >
            <NavLink component={Link} href="/dashboard/visitors/entry" label={t.visitorEntry} leftSection={<IconDoorEnter size={18} />} className={classes.navLink} active={pathname === "/dashboard/visitors/entry"} />
            <NavLink component={Link} href="/dashboard/visitors/pass" label={t.visitorPass} leftSection={<IconIdBadge size={18} />} className={classes.navLink} active={pathname === "/dashboard/visitors/pass"} />
            <NavLink component={Link} href="/dashboard/visitors/delivery" label={t.deliveryLogs} leftSection={<IconTruck size={18} />} className={classes.navLink} active={pathname === "/dashboard/visitors/delivery"} />
            <NavLink component={Link} href="/dashboard/visitors/security" label={t.securityApproval} leftSection={<IconShieldCheck size={18} />} className={classes.navLink} active={pathname === "/dashboard/visitors/security"} />
          </NavLink>

          <NavLink
            label={t.amenitiesBooking}
            leftSection={<IconPool size={20} />}
            childrenOffset={28}
            className={classes.navLink}
            opened={amenitiesOpened}
            onChange={setAmenitiesOpened}
          >
            <NavLink component={Link} href="/dashboard/amenities/gym" label={t.gymBooking} leftSection={<IconBarbell size={18} />} className={classes.navLink} active={pathname === "/dashboard/amenities/gym"} />
            <NavLink component={Link} href="/dashboard/amenities/pool" label={t.poolBooking} leftSection={<IconPool size={18} />} className={classes.navLink} active={pathname === "/dashboard/amenities/pool"} />
            <NavLink component={Link} href="/dashboard/amenities/meeting" label={t.meetingRoom} leftSection={<IconArmchair size={18} />} className={classes.navLink} active={pathname === "/dashboard/amenities/meeting"} />
            <NavLink component={Link} href="/dashboard/amenities/event" label={t.eventHall} leftSection={<IconGlassFull size={18} />} className={classes.navLink} active={pathname === "/dashboard/amenities/event"} />
          </NavLink>

          <NavLink
            label={t.communication}
            leftSection={<IconSpeakerphone size={20} />}
            childrenOffset={28}
            className={classes.navLink}
            opened={communicationOpened}
            onChange={setCommunicationOpened}
          >
            <NavLink component={Link} href="/dashboard/announcements" label={t.announcements} leftSection={<IconSpeakerphone size={18} />} className={classes.navLink} active={pathname === "/dashboard/announcements"} />
            <NavLink component={Link} href="/dashboard/communication/notices" label={t.notices} leftSection={<IconFileText size={18} />} className={classes.navLink} active={pathname === "/dashboard/communication/notices"} />
            <NavLink component={Link} href="/dashboard/communication/broadcast" label={t.broadcast} leftSection={<IconMail size={18} />} className={classes.navLink} active={pathname === "/dashboard/communication/broadcast"} />
            <NavLink component={Link} href="/dashboard/communication/feedback" label={t.feedback} leftSection={<IconMessageReport size={18} />} className={classes.navLink} active={pathname === "/dashboard/communication/feedback"} />
          </NavLink>

          <NavLink
            label={t.staffManagement}
            leftSection={<IconUsersGroup size={20} />}
            childrenOffset={28}
            className={classes.navLink}
            opened={staffOpened}
            onChange={setStaffOpened}
          >
            <NavLink component={Link} href="/dashboard/staff/list" label={t.staffList} leftSection={<IconUsers size={18} />} className={classes.navLink} active={pathname === "/dashboard/staff/list"} />
            <NavLink component={Link} href="/dashboard/staff/guards" label={t.securityGuards} leftSection={<IconUserShield size={18} />} className={classes.navLink} active={pathname === "/dashboard/staff/guards"} />
            <NavLink component={Link} href="/dashboard/staff/cleaning" label={t.cleaningStaff} leftSection={<IconBrush size={18} />} className={classes.navLink} active={pathname === "/dashboard/staff/cleaning"} />
            <NavLink component={Link} href="/dashboard/staff/attendance" label={t.attendance} leftSection={<IconClock size={18} />} className={classes.navLink} active={pathname === "/dashboard/staff/attendance"} />
            <NavLink component={Link} href="/dashboard/staff/shift" label={t.shiftSchedule} leftSection={<IconCalendarTime size={18} />} className={classes.navLink} active={pathname === "/dashboard/staff/shift"} />
          </NavLink>

          <NavLink
            label={t.documents}
            leftSection={<IconFileText size={20} />}
            childrenOffset={28}
            className={classes.navLink}
            opened={adminOpened}
            onChange={setAdminOpened}
          >
            <NavLink component={Link} href="/dashboard/documents/contracts" label={t.contracts} leftSection={<IconFileText size={18} />} className={classes.navLink} active={pathname === "/dashboard/documents/contracts"} />
            <NavLink component={Link} href="/dashboard/documents/forms" label={t.residentForms} leftSection={<IconClipboardList size={18} />} className={classes.navLink} active={pathname === "/dashboard/documents/forms"} />
            <NavLink component={Link} href="/dashboard/documents/rules" label={t.rules} leftSection={<IconShieldCheck size={18} />} className={classes.navLink} active={pathname === "/dashboard/documents/rules"} />
            <NavLink component={Link} href="/dashboard/documents/upload" label={t.uploadFiles} leftSection={<IconCloudUpload size={18} />} className={classes.navLink} active={pathname === "/dashboard/documents/upload"} />
          </NavLink>

          <NavLink
            label={t.reports}
            leftSection={<IconChartBar size={20} />}
            childrenOffset={28}
            className={classes.navLink}
            opened={reportsOpened}
            onChange={setReportsOpened}
          >
            <NavLink component={Link} href="/dashboard/reports/payment" label={t.paymentReport} leftSection={<IconCash size={18} />} className={classes.navLink} active={pathname === "/dashboard/reports/payment"} />
            <NavLink component={Link} href="/dashboard/reports/occupancy" label={t.occupancyReport} leftSection={<IconHome size={18} />} className={classes.navLink} active={pathname === "/dashboard/reports/occupancy"} />
            <NavLink component={Link} href="/dashboard/reports/maintenance" label={t.maintenanceReport} leftSection={<IconTools size={18} />} className={classes.navLink} active={pathname === "/dashboard/reports/maintenance"} />
            <NavLink component={Link} href="/dashboard/reports/visitor" label={t.visitorReport} leftSection={<IconDoorEnter size={18} />} className={classes.navLink} active={pathname === "/dashboard/reports/visitor"} />
            <NavLink component={Link} href="/dashboard/reports/parking" label={t.parkingReport} leftSection={<IconCar size={18} />} className={classes.navLink} active={pathname === "/dashboard/reports/parking"} />
          </NavLink>

          <NavLink
            label={t.userManagement}
            leftSection={<IconKey size={20} />}
            childrenOffset={28}
            className={classes.navLink}
            opened={userManagementOpened}
            onChange={setUserManagementOpened}
          >
            <NavLink component={Link} href="/dashboard/user-management/users" label={t.users} leftSection={<IconUsers size={18} />} className={classes.navLink} active={pathname === "/dashboard/user-management/users"} />
            <NavLink component={Link} href="/dashboard/user-management/roles" label={t.roles} leftSection={<IconLock size={18} />} className={classes.navLink} active={pathname === "/dashboard/user-management/roles"} />
            <NavLink component={Link} href="/dashboard/user-management/access-logs" label={t.accessLogs} leftSection={<IconEye size={18} />} className={classes.navLink} active={pathname === "/dashboard/user-management/access-logs"} />
          </NavLink>

          <NavLink
            label={t.settings}
            leftSection={<IconSettings size={20} />}
            childrenOffset={28}
            className={classes.navLink}
            opened={settingsOpened}
            onChange={setSettingsOpened}
          >
            <NavLink component={Link} href="/dashboard/settings/company-profile" label={t.companyProfile} leftSection={<IconBuilding size={18} />} className={classes.navLink} active={pathname === "/dashboard/settings/company-profile"} />
            <NavLink component={Link} href="/dashboard/settings/condo-info" label={t.condoInfo} leftSection={<IconBuildingSkyscraper size={18} />} className={classes.navLink} active={pathname === "/dashboard/settings/condo-info"} />
            <NavLink component={Link} href="/dashboard/settings/currency-tax" label={t.currencyTax} leftSection={<IconCoin size={18} />} className={classes.navLink} active={pathname === "/dashboard/settings/currency-tax"} />
            <NavLink component={Link} href="/dashboard/settings/notification-settings" label={t.notificationSettings} leftSection={<IconBell size={18} />} className={classes.navLink} active={pathname === "/dashboard/settings/notification-settings"} />
            <NavLink component={Link} href="/dashboard/settings/backup" label={t.backup} leftSection={<IconDeviceFloppy size={18} />} className={classes.navLink} active={pathname === "/dashboard/settings/backup"} />
          </NavLink>
        </Box>
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
