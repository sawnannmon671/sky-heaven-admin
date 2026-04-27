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
    </Box>
  );
}
