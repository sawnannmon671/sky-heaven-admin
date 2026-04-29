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
  Divider,
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
    title: "Luxury Residences",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200&auto=format&fit=crop",
    description: "Experience modern living with premium condominiums and serviced apartments designed for comfort.",
    mmTitle: "အဆင့်မြင့် လူနေအိမ်ရာများ",
    mmDescription: "သက်ဆောင့်သက်သာရှိစေရန် ဒီဇိုင်းထုတ်ထားသော အဆင့်မြင့် ကွန်ဒိုနှင့် ဝန်ဆောင်မှုပေးသည့် တိုက်ခန်းများ။",
  },
  {
    title: "Grade A Office Towers",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&q=80",
    description: "International standard contemporary office spaces in the heart of the business district.",
    mmTitle: "နိုင်ငံတကာအဆင့်မီ ရုံးခန်းတာဝါများ",
    mmDescription: "စီးပွားရေးအချက်အချာကျသောနေရာရှိ နိုင်ငံတကာအဆင့်မီ ခေတ်မီရုံးခန်းနေရာများ။",
  },
  {
    title: "Sky Haven Mall",
    image: "https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?q=80&w=1200&auto=format&fit=crop",
    description: "Discover the ultimate shopping experience with global brands and diverse dining options.",
    mmTitle: "Sky Haven ကုန်တိုက်",
    mmDescription: "ကမ္ဘာ့အဆင့်မီ အမှတ်တံဆိပ်များနှင့် စားသောက်ဆိုင်များစွာပါဝင်သည့် ဈေးဝယ်စင်တာ။",
  },
  {
    title: "Shophouses & Services",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop",
    description: "Vibrant shophouses offering education zones, professional services, and specialty retail.",
    mmTitle: "ဆိုင်ခန်းများနှင့် ဝန်ဆောင်မှုများ",
    mmDescription: "ပညာရေးဇုန်များ၊ ပရော်ဖက်ရှင်နယ်ဝန်ဆောင်မှုများနှင့် ဆိုင်ခန်းများ။",
  },
  {
    title: "Signature Infinity Pool",
    image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=800&q=80",
    description: "A luxurious infinity pool with stunning views of the city skyline for residents.",
    mmTitle: "အဆင့်မြင့် ရေကူးကန်",
    mmDescription: "မြို့ပြရှုခင်းများကို မြင်တွေ့နိုင်မည့် အဆင့်မြင့် ရေကူးကန်။",
  },
  {
    title: "Elite Fitness Center",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&q=80",
    description: "Fully equipped modern sports complex and gym for a healthy lifestyle.",
    mmTitle: "အဆင့်မြင့် အားကစားခန်းမ",
    mmDescription: "ကျန်းမာသော လူနေမှုဘဝအတွက် အဆင့်မြင့် အားကစားခန်းမနှင့် စက်ကိရိယာများ။",
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
      title: "The Art of Exquisite Living",
      subtitle: "Discover Sky Haven — where timeless architecture meets the serenity of botanical gardens and elite amenities.",
      cta: "Experience Now",
      amenitiesBtn: "The Residences",
    },
    features: {
      badge: "THE SKY HAVEN STANDARD",
      title: "Exquisite Living Redefined",
      subtitle: "Experience unparalleled management and a lifestyle curated for the most discerning residents.",
    },
    amenities: {
      badge: "LUXURY AMENITIES",
      title: "A World of Refinement",
      subtitle: "From lush landscapes to signature pools, every detail is designed for your ultimate comfort.",
    },
    stats: {
      title: "A Legacy of Excellence",
    },
    testimonials: {
      badge: "VOICES OF SKY HAVEN",
      title: "Our Community's Perspective",
    },
    contact: {
      title: "Connect with Us",
      subtitle: "Our concierge team is available 24/7 to assist with your inquiries.",
    },
  },
  mm: {
    hero: {
      title: "ပြီးပြည့်စုံသော အဆင့်မြင့်လူနေမှု အနုပညာ",
      subtitle: "Sky Haven — ထာဝရတည်တံ့မည့် ဗိသုကာလက်ရာများ၊ ငြိမ်းချမ်းသောဥယျာဉ်များနှင့် အထူးဝန်ဆောင်မှုများ ပေါင်းစပ်ထားရာနေရာ။",
      cta: "အခုပဲ စတင်လိုက်ပါ",
      amenitiesBtn: "နေထိုင်မှုပုံစံများ",
    },
    features: {
      badge: "SKY HAVEN ၏ စံနှုန်းများ",
      title: "ထူးကဲသော လူနေမှုဘဝသစ်",
      subtitle: "အဆင့်မြင့်စီမံခန့်ခွဲမှုနှင့် အကောင်းဆုံးကိုသာ လိုလားသူများအတွက် ဖန်တီးထားသော လူနေမှုပုံစံ။",
    },
    amenities: {
      badge: "ဇိမ်ခံဝန်ဆောင်မှုများ",
      title: "ပြီးပြည့်စုံသော ကမ္ဘာတစ်ခု",
      subtitle: "စိမ်းလန်းသောဥယျာဉ်များမှသည် အဆင့်မြင့်ရေကူးကန်များအထိ၊ အသေးစိတ်တိုင်းကို သင့်သက်တောင့်သက်သာရှိမှုအတွက် ဖန်တီးထားပါသည်။",
    },
    stats: {
      title: "ထူးချွန်မှု၏ အမွေအနှစ်",
    },
    testimonials: {
      badge: "SKY HAVEN မှ အသံများ",
      title: "ကျွန်ုပ်တို့၏ လူမှုအသိုင်းအဝိုင်းမှ ထင်မြင်ချက်များ",
    },
    contact: {
      title: "ကျွန်ုပ်တို့နှင့် ဆက်သွယ်ပါ",
      subtitle: "ကျွန်ုပ်တို့၏ အဖွဲ့သည် သင့်မေးမြန်းမှုများကို ကူညီရန် ၂၄ နာရီပတ်လုံး အသင့်ရှိပါသည်။",
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
  const [scrolled, setScrolled] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  const heroSlides = [
    {
      image: "https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?q=80&w=2070&auto=format&fit=crop",
      title: t.hero.title,
      subtitle: t.hero.subtitle
    },
    {
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
      title: lang === 'mm' ? "နိုင်ငံတကာအဆင့်မီ ရုံးခန်းတာဝါများ" : "Grade A Office Towers",
      subtitle: lang === 'mm' ? "စီးပွားရေးအချက်အချာကျသောနေရာရှိ ရုံးခန်းနေရာများ" : "International standard contemporary office spaces in the heart of the city."
    },
    {
      image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=2070&auto=format&fit=crop",
      title: lang === 'mm' ? "ခေတ်မီရေကူးကန်" : "Signature Infinity Pool",
      subtitle: lang === 'mm' ? "အပန်းဖြေအနားယူရန် အကောင်းဆုံးနေရာ" : "Relax and unwind in our temperature-controlled luxury pool."
    },
    {
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop",
      title: lang === 'mm' ? "အဆင့်မြင့်အားကစားခန်းမ" : "Elite Fitness Center",
      subtitle: lang === 'mm' ? "ကျန်းမာကြံ့ခိုင်သော လူနေမှုဘဝ" : "Achieve your fitness goals with world-class equipment."
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
          background: scrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent', 
          backdropFilter: scrolled ? 'blur(10px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(0,0,0,0.05)' : 'none',
          transition: 'all 0.3s ease'
        }}
        py={scrolled ? "xs" : "md"}
      >
        <Container size="lg">
          <Group justify="space-between">
            <Group gap="sm">
              <Image 
                src="/sh.png" 
                alt="Logo" 
                h={scrolled ? 30 : 35} 
                w="auto" 
                style={{ 
                  filter: scrolled ? 'none' : 'brightness(0) invert(1)',
                  transition: 'all 0.3s ease'
                }} 
              />
              <Title 
                order={3} 
                size="h4" 
                fw={700} 
                c={scrolled ? "#014F86" : "white"}
                style={{ transition: 'color 0.3s ease' }}
              >
                Sky Haven
              </Title>
            </Group>
            <Group gap="xl" visibleFrom="sm">
              <Text 
                component={Link} 
                href="#features" 
                fw={600} 
                size="sm" 
                c={scrolled ? "gray.7" : "gray.1"} 
                style={{ cursor: 'pointer', transition: 'color 0.3s ease' }}
              >
                Features
              </Text>
              <Text 
                component={Link} 
                href="#amenities" 
                fw={600} 
                size="sm" 
                c={scrolled ? "gray.7" : "gray.1"} 
                style={{ cursor: 'pointer', transition: 'color 0.3s ease' }}
              >
                Facilities
              </Text>
              <Text 
                component={Link} 
                href="/login" 
                fw={600} 
                size="sm" 
                c={scrolled ? "gray.7" : "gray.1"}
                style={{ transition: 'color 0.3s ease' }}
              >
                Login
              </Text>
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
        {heroSlides.map((slide, index) => (
          <Box
            key={index}
            className={classes.heroImage}
            pos="absolute"
            inset={0}
            style={{ 
              backgroundImage: `url("${slide.image}")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              zIndex: 0,
              backgroundColor: '#012a4a',
              opacity: activeSlide === index ? 1 : 0,
              transition: 'opacity 1.5s ease-in-out',
              transform: activeSlide === index ? 'scale(1.05)' : 'scale(1)',
            }}
          />
        ))}
        
        <Overlay color="#000" backgroundOpacity={0.6} zIndex={1} />
        
        <Container size="lg" h="100%" pos="relative" style={{ zIndex: 2, display: 'flex', alignItems: 'center' }}>
          <Stack justify="center" gap="xl" maw={800} className={classes.heroContent} style={{ width: '100%' }}>
            <Badge variant="filled" color="blue.7" size="lg" radius="sm" style={{ alignSelf: 'flex-start' }}>
              {lang === 'mm' ? 'အဆင့်မြင့် လူနေမှုဘဝ' : 'ESTABLISHED 2026'}
            </Badge>
            
            <Box style={{ height: 240 }}> {/* Fixed height container to prevent layout shift */}
              <Title 
                order={1} 
                c="white" 
                size={72} 
                fw={700} 
                style={{ 
                  lineHeight: 1.1, 
                  letterSpacing: '-1px',
                  opacity: 1,
                  transition: 'all 0.5s ease'
                }}
              >
                {heroSlides[activeSlide].title}
              </Title>
              <Text 
                c="gray.1" 
                size="xl" 
                fw={400} 
                maw={600} 
                mt="xl"
                style={{ 
                  lineHeight: 1.6,
                  opacity: 1,
                  transition: 'all 0.5s ease'
                }}
              >
                {heroSlides[activeSlide].subtitle}
              </Text>
            </Box>

            <Group gap="md" mt="xl">
              <Button 
                component={Link} 
                href="/login" 
                size="xl" 
                color="#014F86" 
                radius="md"
                px={40}
                rightSection={<IconArrowRight size={22} />}
                style={{ boxShadow: '0 8px 25px rgba(1, 79, 134, 0.4)' }}
              >
                {t.hero.cta}
              </Button>
              <Button 
                variant="white" 
                color="dark" 
                size="xl" 
                radius="md" 
                px={40}
                onClick={() => document.getElementById('amenities')?.scrollIntoView({ behavior: 'smooth' })}
              >
                {t.hero.amenitiesBtn}
              </Button>
            </Group>

            {/* Slide Indicators */}
            <Group gap="xs" mt={50}>
              {heroSlides.map((_, index) => (
                <Box
                  key={index}
                  onClick={() => setActiveSlide(index)}
                  style={{
                    width: activeSlide === index ? 40 : 10,
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: activeSlide === index ? '#014F86' : 'rgba(255,255,255,0.5)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                />
              ))}
            </Group>
          </Stack>
        </Container>
      </Box>

      {/* Stats Section */}
      <Box py={80} bg="white" id="stats">
        <Container size="lg">
          <SimpleGrid cols={{ base: 1, sm: 3 }} spacing={50}>
            {stats.map((stat, index) => (
              <Group key={index} wrap="nowrap" align="center" gap="xl">
                <ThemeIcon size={60} radius="md" color="#014F86" variant="light">
                  <stat.icon size={34} stroke={1.5} />
                </ThemeIcon>
                <div>
                  <Text size="xl" fw={700} style={{ fontSize: 32, lineHeight: 1 }}>{stat.value}</Text>
                  <Text size="sm" c="dimmed" fw={400} tt="uppercase" mt={4}>
                    {lang === 'mm' ? stat.mmLabel : stat.label}
                  </Text>
                </div>
              </Group>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* Amenities Section */}
      <Box py={100} id="amenities" className={classes.featuresSection}>
        <Container size="lg">
          <Stack align="center" gap="xs" mb={50}>
            <Badge variant="outline" color="#014F86" size="lg" radius="sm">
              {t.amenities.badge}
            </Badge>
            <Title order={2} size={42} fw={700} ta="center">
              {t.amenities.title}
            </Title>
            <Text c="dimmed" size="lg" maw={600} ta="center">
              {t.amenities.subtitle}
            </Text>
          </Stack>

          <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing={30}>
            {amenities.map((amenity, index) => (
              <Card key={index} radius="md" p={0} className={classes.featureCard} withBorder shadow="sm">
                <Box style={{ overflow: 'hidden', height: 320 }}>
                  <Image 
                    src={amenity.image} 
                    alt={amenity.title} 
                    className={classes.amenityImage}
                    h="100%"
                    fit="cover"
                    style={{ transition: 'transform 0.6s ease' }}
                  />
                </Box>
                <Box p="xl">
                  <Title order={3} size="h3" mb="xs" fw={600}>
                    {lang === 'mm' ? amenity.mmTitle : amenity.title}
                  </Title>
                  <Text c="dimmed" size="md" style={{ lineHeight: 1.6 }}>
                    {lang === 'mm' ? amenity.mmDescription : amenity.description}
                  </Text>
                </Box>
              </Card>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box py={100} id="features" bg="white">
        <Container size="lg">
          <Stack align="center" gap="xs" mb={60}>
            <Badge variant="outline" color="#014F86" size="lg" radius="sm">
              {t.features.badge}
            </Badge>
            <Title order={2} size={42} fw={700} ta="center">
              {t.features.title}
            </Title>
            <Text c="dimmed" size="lg" maw={600} ta="center">
              {t.features.subtitle}
            </Text>
          </Stack>

          <SimpleGrid cols={{ base: 1, md: 2, lg: 4 }} spacing={30}>
            {features.map((feature, index) => (
              <Paper key={index} p="xl" radius="md" withBorder className={classes.featureCard}>
                <ThemeIcon size={50} radius="md" color={feature.color} variant="light" mb="xl">
                  <feature.icon size={28} />
                </ThemeIcon>
                <Text size="lg" fw={600} mb="sm">
                  {lang === 'mm' ? feature.mmTitle : feature.title}
                </Text>
                <Text size="sm" c="dimmed" style={{ lineHeight: 1.6 }}>
                  {lang === 'mm' ? feature.mmDescription : feature.description}
                </Text>
              </Paper>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* Testimonials */}
      <Box py={100} bg="gray.0">
        <Container size="lg">
          <Stack align="center" gap="xs" mb={60}>
            <Badge variant="outline" color="#014F86" size="lg" radius="sm">
              {t.testimonials.badge}
            </Badge>
            <Title order={2} size={42} fw={700} ta="center">
              {t.testimonials.title}
            </Title>
          </Stack>

          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={50}>
            {testimonials.map((item, index) => (
              <Paper key={index} p={40} radius="lg" withBorder shadow="sm" style={{ background: 'white' }}>
                <Group mb="xl">
                  <Avatar src={item.avatar} size={60} radius="xl" />
                  <div>
                    <Text fw={600} size="lg">{item.name}</Text>
                    <Text size="sm" c="dimmed">{lang === 'mm' ? item.mmRole : item.role}</Text>
                  </div>
                </Group>
                <Text size="lg" style={{ lineHeight: 1.6 }}>
                  &quot;{lang === 'mm' ? item.mmComment : item.comment}&quot;
                </Text>
              </Paper>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* Footer */}
      <Box component="footer" py={80} className={classes.classicFooter} c="white">
        <Container size="lg">
          <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing={50}>
            <Stack gap="md">
              <Group gap="sm">
                <Image src="/sh.png" alt="Logo" h={40} w="auto" style={{ filter: 'brightness(0) invert(1)' }} />
                <Title order={3} c="white" fw={700}>Sky Haven</Title>
              </Group>
              <Text c="gray.5" size="sm" maw={260}>
                Setting the benchmark for luxury condo management and elite urban living.
              </Text>
              <Group gap="xs" mt="md">
                <ThemeIcon size="lg" radius="xl" color="blue.8" variant="filled">
                  <IconMapPin size={18} />
                </ThemeIcon>
                <Text size="sm">Yangon, Myanmar</Text>
              </Group>
            </Stack>

            <Stack gap="md">
              <Text fw={600} size="lg">Quick Links</Text>
              <Text component={Link} href="#features" className={classes.footerLink} c="gray.5" size="sm">Features</Text>
              <Text component={Link} href="#amenities" className={classes.footerLink} c="gray.5" size="sm">Facilities</Text>
              <Text component={Link} href="/login" className={classes.footerLink} c="gray.5" size="sm">Resident Login</Text>
              <Text component={Link} href="/dashboard" className={classes.footerLink} c="gray.5" size="sm">Management Portal</Text>
            </Stack>

            <Stack gap="md">
              <Text fw={600} size="lg">Contact Us</Text>
              <Group gap="sm">
                <IconPhone size={18} />
                <Text size="sm">+95 9 123 456 789</Text>
              </Group>
              <Group gap="sm">
                <IconMail size={18} />
                <Text size="sm">concierge@skyhaven.com</Text>
              </Group>
            </Stack>

            <Stack gap="md">
              <Text fw={600} size="lg">Newsletter</Text>
              <Text c="gray.5" size="sm">Subscribe for the latest community updates.</Text>
              <Button color="#014F86" radius="md">Subscribe</Button>
            </Stack>
          </SimpleGrid>

          <Divider my={40} color="gray.8" />
          
          <Group justify="space-between">
            <Text c="gray.6" size="xs">
              © 2026 Futurehub Myanmar. All rights reserved.
            </Text>
            <Group gap="xl">
              <Text c="gray.6" size="xs" style={{ cursor: 'pointer' }}>Privacy Policy</Text>
              <Text c="gray.6" size="xs" style={{ cursor: 'pointer' }}>Terms of Service</Text>
            </Group>
          </Group>
        </Container>
      </Box>
    </Box>
  );
}
