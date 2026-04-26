"use client";

import {
  Container,
  Title,
  Text,
  Button,
  Group,
  SimpleGrid,
  Card,
  Image,
  Badge,
  Stack,
  Box,
  Overlay,
  useMantineTheme,
  Avatar,
  ThemeIcon,
  Paper,
} from "@mantine/core";
import { 
  IconCalendar, 
  IconArrowRight, 
  IconMapPin, 
  IconPhone, 
  IconMail, 
  IconShieldCheck, 
  IconTools, 
  IconCreditCard, 
  IconSpeakerphone,
  IconStarFilled,
  IconUsers,
  IconBuildingCommunity,
} from "@tabler/icons-react";
import Link from "next/link";
import { useTranslation } from "@/hooks/useTranslation";
import { useEffect, useRef, useState } from "react";
import classes from "./home.module.css";

const useReveal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Fallback for browsers that don't support IntersectionObserver
    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        // If the element is intersecting or we've already scrolled past it
        if (entry.isIntersecting || (entry.boundingClientRect.top < 0 && entry.boundingClientRect.bottom < 0)) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { 
        threshold: 0.01,
        rootMargin: '0px 0px -2% 0px' 
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
      
      // Immediate check in case it's already in view
      const rect = currentRef.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom >= 0) {
        setIsVisible(true);
        observer.unobserve(currentRef);
      }
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return { ref, isVisible };
};

const amenities = [
  {
    title: "Sky Pool",
    image: "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800&q=80",
    description: "Relax in our rooftop infinity pool with breathtaking city views.",
    mmTitle: "ကောင်းကင်ရေကူးကန်",
    mmDescription: "လှပသော မြို့ပြမြင်ကွင်းများနှင့်အတူ ကျွန်ုပ်တို့၏ အမိုးပေါ်ရှိ ရေကူးကန်တွင် အပန်းဖြေလိုက်ပါ။",
  },
  {
    title: "Fitness Center",
    image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=800&q=80",
    description: "State-of-the-art fitness equipment for your daily workout needs.",
    mmTitle: "အားကစားခန်းမ",
    mmDescription: "သင်၏ နေ့စဉ်ကိုယ်လက်လှုပ်ရှားမှုများအတွက် ခေတ်မီစက်ကိရိယာများ အပြည့်အစုံရှိသည်။",
  },
  {
    title: "Rooftop Lounge",
    image: "https://images.unsplash.com/photo-1524350303351-806088de20ba?w=800&q=80",
    description: "Perfect spot for social gatherings and evening relaxation.",
    mmTitle: "အမိုးပေါ်အနားယူရန်နေရာ",
    mmDescription: "မိတ်ဆွေများနှင့် ဆုံတွေ့ရန်နှင့် ညနေခင်း အပန်းဖြေရန် အကောင်းဆုံးနေရာဖြစ်သည်။",
  },
  {
    title: "Smart Clubhouse",
    image: "https://images.unsplash.com/photo-1517816743773-6e0fd518b4a6?w=800&q=80",
    description: "Modern space for community events and coworking.",
    mmTitle: "စမတ်ကလပ်ဟောက်စ်",
    mmDescription: "လူမှုရေးပွဲများနှင့် အလုပ်လုပ်ရန်အတွက် ခေတ်မီသော နေရာတစ်ခုဖြစ်သည်။",
  },
];

const features = [
  {
    icon: IconShieldCheck,
    color: "blue",
    title: "Smart Security",
    mmTitle: "စမတ်ကျသော လုံခြုံရေး",
    description: "Integrated visitor management and 24/7 digital surveillance tracking.",
    mmDescription: "ဧည့်သည်စီမံခန့်ခွဲမှုနှင့် ၂၄ နာရီ ဒစ်ဂျစ်တယ် စောင့်ကြည့်ရေးစနစ် ပေါင်းစပ်ထားသည်။",
  },
  {
    icon: IconTools,
    color: "orange",
    title: "Maintenance Tracker",
    mmTitle: "ပြုပြင်ထိန်းသိမ်းမှု ခြေရာခံခြင်း",
    description: "Quickly report and track repair requests with real-time updates.",
    mmDescription: "ပြုပြင်ရန် လိုအပ်သည်များကို အချိန်နှင့်တပြေးညီ တင်ပြပြီး ခြေရာခံနိုင်ပါသည်။",
  },
  {
    icon: IconCreditCard,
    color: "green",
    title: "Digital Payments",
    mmTitle: "ဒစ်ဂျစ်တယ် ငွေပေးချေမှု",
    description: "Hassle-free online billing and secure payment history tracking.",
    mmDescription: "အွန်လိုင်းမှတစ်ဆင့် လွယ်ကူစွာ ငွေပေးချေနိုင်ပြီး မှတ်တမ်းများကို ကြည့်ရှုနိုင်သည်။",
  },
  {
    icon: IconSpeakerphone,
    color: "grape",
    title: "Community News",
    mmTitle: "လူမှုအသိုင်းအဝိုင်း သတင်းများ",
    description: "Stay updated with the latest announcements and property events.",
    mmDescription: "နောက်ဆုံးရ ကြေငြာချက်များနှင့် အစီအစဉ်များကို အမြဲမပြတ် သိရှိနိုင်ပါသည်။",
  },
];

const stats = [
  { label: "Active Residents", mmLabel: "နေထိုင်သူဦးရေ", value: "1,200+", icon: IconUsers },
  { label: "Properties Managed", mmLabel: "စီမံခန့်ခွဲသည့် အိမ်ရာ", value: "500+", icon: IconBuildingCommunity },
  { label: "Satisfaction Rate", mmLabel: "ကျေနပ်မှုနှုန်း", value: "99.9%", icon: IconStarFilled },
];

const testimonials = [
  {
    name: "U Aung Kyaw",
    role: "Resident",
    mmRole: "နေထိုင်သူ",
    comment: "Sky Haven makes living so much easier. The maintenance reporting is incredibly fast!",
    mmComment: "Sky Haven ကြောင့် နေထိုင်ရတာ အရမ်းအဆင်ပြေပါတယ်။ ပြုပြင်ထိန်းသိမ်းမှု တောင်းဆိုတာတွေကလည်း အရမ်းမြန်ပါတယ်!",
    avatar: "https://i.pravatar.cc/150?u=aung",
  },
  {
    name: "Daw Thandar",
    role: "Property Manager",
    mmRole: "အိမ်ခြံမြေမန်နေဂျာ",
    comment: "The most comprehensive CMS I've used. It streamlined all our administrative tasks.",
    mmComment: "ကျွန်မသုံးဖူးသမျှ အကောင်းဆုံး CMS ပါပဲ။ စီမံခန့်ခွဲမှု အလုပ်အားလုံးကို ပိုမိုမြန်ဆန်စေပါတယ်။",
    avatar: "https://i.pravatar.cc/150?u=thandar",
  },
];

const translations = {
  en: {
    hero: {
      title: "Welcome to Sky Haven",
      subtitle: "Experience luxury living with world-class amenities and premium management services.",
      cta: "Explore Dashboard",
      amenitiesBtn: "View Facilities",
    },
    features: {
      badge: "WHY CHOOSE US",
      title: "Comprehensive Management Features",
      subtitle: "Everything you need to manage your property and community in one place.",
    },
    amenities: {
      badge: "FACILITIES",
      title: "Premium Amenities & Facilities",
      subtitle: "Discover the exceptional features that make Sky Haven the perfect home.",
    },
    stats: {
      title: "Trusted by Thousands",
    },
    testimonials: {
      badge: "TESTIMONIALS",
      title: "What Our Community Says",
    },
    contact: {
      title: "Get in Touch",
      subtitle: "Have questions? We're here to help you 24/7.",
    },
  },
  mm: {
    hero: {
      title: "Sky Haven မှ ကြိုဆိုပါသည်",
      subtitle: "ကမ္ဘာ့အဆင့်မီ အသုံးအဆောင်များနှင့် ပရီမီယံ စီမံခန့်ခွဲမှု ဝန်ဆောင်မှုများဖြင့် ဇိမ်ခံလူနေမှုကို ခံစားလိုက်ပါ။",
      cta: "ဒက်ရှ်ဘုတ်သို့ သွားရန်",
      amenitiesBtn: "ဝန်ဆောင်မှုများ ကြည့်ရန်",
    },
    features: {
      badge: "ကျွန်ုပ်တို့ကို ဘာကြောင့် ရွေးချယ်သင့်သလဲ",
      title: "ပြည့်စုံသော စီမံခန့်ခွဲမှု လုပ်ဆောင်ချက်များ",
      subtitle: "သင်၏ အိမ်ခြံမြေနှင့် လူမှုအသိုင်းအဝိုင်းကို တစ်နေရာတည်းတွင် စီမံခန့်ခွဲရန် လိုအပ်သမျှ။",
    },
    amenities: {
      badge: "ဝန်ဆောင်မှုများ",
      title: "အဆင့်မြင့် သာယာအဆင်ပြေမှုများနှင့် အဆောက်အအုံများ",
      subtitle: "Sky Haven ကို ပြီးပြည့်စုံသော အိမ်တစ်ခုဖြစ်စေသည့် ထူးခြားသော ဝန်ဆောင်မှုများကို ရှာဖွေပါ။",
    },
    stats: {
      title: "ထောင်ပေါင်းများစွာ၏ ယုံကြည်မှု",
    },
    testimonials: {
      badge: "သုံးသပ်ချက်များ",
      title: "ကျွန်ုပ်တို့၏ လူမှုအသိုင်းအဝိုင်းမှ ပြောကြားချက်များ",
    },
    contact: {
      title: "ဆက်သွယ်ရန်",
      subtitle: "မေးမြန်းလိုသည်များ ရှိပါသလား? ကျွန်ုပ်တို့ ၂၄ နာရီလုံး ကူညီရန် အသင့်ရှိပါသည်။",
    },
  },
};

export default function HomePage() {
  const { lang, mounted } = useTranslation();
  const theme = useMantineTheme();
  const t = translations[lang] || translations.en;

  // Reveal hooks for each section
  const featuresReveal = useReveal();
  const statsReveal = useReveal();
  const amenitiesReveal = useReveal();
  const testimonialsReveal = useReveal();

  if (!mounted) return null;

  return (
    <Box component="main" style={{ overflowX: 'hidden', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header / Navigation */}
      <Box 
        component="header" 
        pos="fixed" 
        top={0} 
        left={0} 
        right={0} 
        style={{ 
          zIndex: 100, 
          background: 'rgba(255, 255, 255, 0.8)', 
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(0,0,0,0.05)'
        }}
        py="md"
      >
        <Container size="lg">
          <Group justify="space-between">
            <Group gap="sm">
              <Image src="/sh.png" alt="Logo" h={30} w="auto" />
              <Title order={3} size="h4" fw={900} c="#014F86">
                Sky Haven
              </Title>
            </Group>
            <Group gap="xl" visibleFrom="sm">
              <Text component={Link} href="#features" fw={600} size="sm" c="gray.7" style={{ cursor: 'pointer' }}>Features</Text>
              <Text component={Link} href="#amenities" fw={600} size="sm" c="gray.7" style={{ cursor: 'pointer' }}>Facilities</Text>
              <Text component={Link} href="/login" fw={600} size="sm" c="gray.7">Login</Text>
              <Button component={Link} href="/dashboard" color="#014F86" radius="md" size="sm">
                Dashboard
              </Button>
            </Group>
          </Group>
        </Container>
      </Box>

      {/* Hero Section */}
      <Box 
        pos="relative"
        h="100vh"
        mih={600}
        bg="#012a4a"
        style={{ overflow: 'hidden', display: 'flex', alignItems: 'center' }}
      >
        <Box
          className={classes.heroImage}
          pos="absolute"
          inset={0}
          style={{ 
            backgroundImage: 'url("https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2070&auto=format&fit=crop")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: 0,
            backgroundColor: '#012a4a'
          }}
        />
        <Overlay color="#000" backgroundOpacity={0.65} zIndex={1} />
        <Container size="lg" h="100%" pos="relative" style={{ zIndex: 2, display: 'flex', alignItems: 'center' }}>
          <Stack justify="center" gap="xl" maw={700} className={classes.heroContent}>
            <Badge variant="outline" color="blue.2" size="lg" radius="sm" style={{ alignSelf: 'flex-start' }}>
              {lang === 'mm' ? 'အဆင့်မြင့် လူနေမှုဘဝ' : 'PREMIUM LIVING'}
            </Badge>
            <Title order={1} c="white" size={64} fw={900} style={{ lineHeight: 1.05 }}>
              {t.hero.title}
            </Title>
            <Text c="gray.3" size="xl" fw={500}>
              {t.hero.subtitle}
            </Text>
            <Group gap="md" mt="lg">
              <Button 
                component={Link} 
                href="/dashboard" 
                size="xl" 
                color="#014F86" 
                radius="md"
                px={40}
                rightSection={<IconArrowRight size={22} />}
                style={{ boxShadow: '0 8px 15px rgba(1, 79, 134, 0.3)' }}
              >
                {t.hero.cta}
              </Button>
              <Button 
                variant="outline" 
                color="white" 
                size="xl" 
                radius="md"
                px={40}
                onClick={() => document.getElementById('amenities')?.scrollIntoView({ behavior: 'smooth' })}
              >
                {t.hero.amenitiesBtn}
              </Button>
            </Group>
          </Stack>
        </Container>
      </Box>

      {/* Features Section */}
      <Box 
        id="features" 
        py={120}
        bg="#fcfcfc"
        mih={600}
        ref={featuresReveal.ref}
        className={`${classes.featuresSection} ${classes.reveal} ${featuresReveal.isVisible ? classes.revealVisible : ''}`}
      >
        <Container size="lg">
          <Stack align="center" mb={80}>
            <Badge variant="filled" color="#014F86" size="lg" radius="sm" px="xl" py="md">
              {t.features.badge}
            </Badge>
            <Title order={2} size={48} ta="center" mt="xl" fw={900} style={{ letterSpacing: -1 }}>
              {t.features.title}
            </Title>
            <Text c="gray.7" ta="center" maw={700} size="xl" fw={500} lh={1.6}>
              {t.features.subtitle}
            </Text>
          </Stack>

          <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing={30}>
            {features.map((feature, index) => (
              <Paper 
                key={feature.title} 
                p="xl" 
                radius="lg" 
                withBorder 
                shadow="xs" 
                style={{ 
                  height: '100%',
                  transition: 'all 0.3s ease',
                  cursor: 'default'
                }}
                className={classes.featureCard}
              >
                <ThemeIcon variant="light" size={60} radius="md" color={feature.color} mb="xl">
                  <feature.icon size={35} />
                </ThemeIcon>
                <Text fw={800} size="xl" mb="sm" c="dark.4">
                  {lang === 'mm' ? feature.mmTitle : feature.title}
                </Text>
                <Text size="md" c="gray.7" lh={1.6} fw={500}>
                  {lang === 'mm' ? feature.mmDescription : feature.description}
                </Text>
              </Paper>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* Stats Section */}
      <Box 
        py={100} 
        bg="#014F86"
        c="white"
        mih={300}
        ref={statsReveal.ref}
        className={`${classes.reveal} ${statsReveal.isVisible ? classes.revealVisible : ''}`}
        style={{ position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center' }}
      >
        <Box 
          pos="absolute" 
          inset={0} 
          style={{ 
            opacity: 0.05, 
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} 
        />
        <Container size="lg" pos="relative" style={{ zIndex: 1 }}>
          <SimpleGrid cols={{ base: 1, sm: 3 }} spacing={50}>
            {stats.map((stat) => (
              <Stack key={stat.label} align="center" gap={0}>
                <stat.icon size={50} stroke={1.5} color="rgba(255,255,255,0.7)" />
                <Text fz={64} fw={900} mt="md" style={{ letterSpacing: -2 }}>{stat.value}</Text>
                <Text size="xl" fw={600} c="blue.1">
                  {lang === 'mm' ? stat.mmLabel : stat.label}
                </Text>
              </Stack>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* Amenities Section */}
      <Box 
        id="amenities" 
        py={120} 
        bg="gray.0"
        mih={600}
        ref={amenitiesReveal.ref}
        className={`${classes.reveal} ${amenitiesReveal.isVisible ? classes.revealVisible : ''}`}
      >
        <Container size="lg">
          <Stack align="center" mb={80}>
            <Badge variant="filled" color="#014F86" size="lg" radius="sm">{t.amenities.badge}</Badge>
            <Title order={2} size={42} ta="center" mt="md" fw={800}>
              {t.amenities.title}
            </Title>
            <Text c="dimmed" ta="center" maw={600} size="lg">
              {t.amenities.subtitle}
            </Text>
          </Stack>

          <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="xl">
            {amenities.map((item) => (
              <Card key={item.title} shadow="md" padding="0" radius="lg" withBorder style={{ overflow: 'hidden' }}>
                <Card.Section style={{ overflow: 'hidden' }}>
                  <Image 
                    src={item.image} 
                    height={240} 
                    alt={item.title} 
                    style={{ transition: 'transform 0.5s ease' }}
                    className={classes.amenityImage}
                  />
                </Card.Section>
                <Stack p="xl" gap="md">
                  <Text fw={800} size="xl">
                    {lang === 'mm' ? item.mmTitle : item.title}
                  </Text>
                  <Text size="md" c="dimmed" lineClamp={3} lh={1.5}>
                    {lang === 'mm' ? item.mmDescription : item.description}
                  </Text>
                  <Button 
                    component={Link} 
                    href="/dashboard/amenities" 
                    variant="subtle" 
                    color="#014F86" 
                    p={0} 
                    mt="md"
                    justify="flex-start"
                    rightSection={<IconArrowRight size={20} />}
                    size="md"
                    fw={700}
                  >
                    {lang === 'mm' ? 'အသေးစိတ်ကြည့်ရန်' : 'Learn More'}
                  </Button>
                </Stack>
              </Card>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Box 
        py={120}
        ref={testimonialsReveal.ref}
        className={`${classes.reveal} ${testimonialsReveal.isVisible ? classes.revealVisible : ''}`}
      >
        <Container size="lg">
          <Stack align="center" mb={80}>
            <Badge variant="light" color="#014F86" size="lg" radius="sm">{t.testimonials.badge}</Badge>
            <Title order={2} size={42} ta="center" mt="md" fw={800}>
              {t.testimonials.title}
            </Title>
          </Stack>

          <SimpleGrid cols={{ base: 1, md: 2 }} spacing={50}>
            {testimonials.map((item) => (
              <Paper key={item.name} p={40} radius="lg" withBorder shadow="md" pos="relative" bg="white">
                <IconStarFilled 
                  size={60} 
                  color="var(--mantine-color-yellow-4)" 
                  style={{ position: 'absolute', top: 30, right: 30, opacity: 0.1 }} 
                />
                <Text size="xl" style={{ fontStyle: 'italic', lineHeight: 1.6 }} mb="xl" fw={500}>
                  "{lang === 'mm' ? item.mmComment : item.comment}"
                </Text>
                <Group mt="xl">
                  <Avatar src={item.avatar} radius="xl" size={60} />
                  <div>
                    <Text fw={800} size="lg">{item.name}</Text>
                    <Text size="md" c="dimmed" fw={500}>
                      {lang === 'mm' ? item.mmRole : item.role}
                    </Text>
                  </div>
                </Group>
              </Paper>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* Footer Section */}
      <Box className={classes.classicFooter} py={100} c="white">
        <Container size="lg">
          <SimpleGrid cols={{ base: 1, md: 4 }} spacing={50}>
            <Stack gap="xl">
              <Group gap="sm">
                <Box bg="white" p={6} radius="md" style={{ display: 'flex' }}>
                  <Image src="/sh.png" alt="Sky Haven Logo" h={36} w="auto" fit="contain" />
                </Box>
                <Title order={3} size="h3" fw={900} style={{ letterSpacing: -1 }}>
                  Sky Haven <Text span c="blue.4">CMS</Text>
                </Title>
              </Group>
              <Text c="gray.5" size="md" lh={1.7}>
                Elevating property management to an art form. 
                Our platform provides a seamless, luxurious experience 
                for both residents and administrators.
              </Text>
              <Group gap="md">
                {[1, 2, 3, 4].map((i) => (
                  <Box 
                    key={i} 
                    w={40} h={40} 
                    bg="rgba(255,255,255,0.05)" 
                    style={{ borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                  >
                    <Box w={18} h={18} bg="white" style={{ opacity: 0.5, borderRadius: '2px' }} />
                  </Box>
                ))}
              </Group>
            </Stack>

            <Stack gap="xl">
              <Title order={4} size="h4" fw={800} mb="xs">{t.contact.title}</Title>
              <Stack gap="lg">
                <Group gap="md" align="flex-start" wrap="nowrap">
                  <ThemeIcon variant="light" color="blue.4" size="md" radius="md">
                    <IconMapPin size={20} />
                  </ThemeIcon>
                  <Text size="md" c="gray.4">123 Luxury Way, Golden Valley, Yangon</Text>
                </Group>
                <Group gap="md" align="flex-start" wrap="nowrap">
                  <ThemeIcon variant="light" color="blue.4" size="md" radius="md">
                    <IconPhone size={20} />
                  </ThemeIcon>
                  <Text size="md" c="gray.4">+95 9 123 456 789</Text>
                </Group>
                <Group gap="md" align="flex-start" wrap="nowrap">
                  <ThemeIcon variant="light" color="blue.4" size="md" radius="md">
                    <IconMail size={20} />
                  </ThemeIcon>
                  <Text size="md" c="gray.4">support@skyhaven.com</Text>
                </Group>
              </Stack>
            </Stack>

            <Stack gap="xl">
              <Title order={4} size="h4" fw={800} mb="xs">{lang === 'mm' ? 'အမြန်လင့်ခ်များ' : 'Quick Links'}</Title>
              <Stack gap="md">
                <Text component={Link} href="/dashboard" size="md" c="gray.5" style={{ transition: 'color 0.2s' }} className={classes.footerLink}>Dashboard</Text>
                <Text component={Link} href="/dashboard/amenities" size="md" c="gray.5" className={classes.footerLink}>Amenities</Text>
                <Text component={Link} href="/dashboard/announcements" size="md" c="gray.5" className={classes.footerLink}>Announcements</Text>
                <Text component={Link} href="/login" size="md" c="gray.5" className={classes.footerLink}>Login</Text>
              </Stack>
            </Stack>

            <Stack gap="xl">
              <Title order={4} size="h4" fw={800} mb="xs">{lang === 'mm' ? 'တရားဝင်အချက်အလက်' : 'Legal'}</Title>
              <Stack gap="md">
                <Text component={Link} href="#" size="md" c="gray.5" className={classes.footerLink}>Privacy Policy</Text>
                <Text component={Link} href="#" size="md" c="gray.5" className={classes.footerLink}>Terms of Service</Text>
                <Text component={Link} href="#" size="md" c="gray.5" className={classes.footerLink}>Cookie Policy</Text>
              </Stack>
            </Stack>
          </SimpleGrid>

          <Box mt={80} pt={40} style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <Group justify="space-between" wrap="wrap">
              <Text size="sm" c="gray.6">
                © 2026 Sky Haven CMS. All rights reserved.
              </Text>
              <Text size="sm" c="gray.6">
                Crafted with <Text span c="red.6">❤</Text> for luxury living.
              </Text>
            </Group>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
