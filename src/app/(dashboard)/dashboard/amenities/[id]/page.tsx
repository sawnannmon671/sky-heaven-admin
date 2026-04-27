"use client";

import { 
  Title, 
  Paper, 
  Group, 
  Button, 
  Badge, 
  Stack, 
  Text, 
  Image, 
  Container, 
  Grid, 
  ThemeIcon, 
  Divider, 
  Box,
  SimpleGrid,
  ActionIcon
} from "@mantine/core";
import { 
  IconArrowLeft, 
  IconUsers, 
  IconClock, 
  IconShieldCheck, 
  IconInfoCircle,
  IconMapPin,
  IconCalendarEvent,
  IconEdit
} from "@tabler/icons-react";
import { useParams, useRouter } from "next/navigation";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";

const amenityDetails = {
  "AMN-001": {
    title: "Swimming Pool",
    image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=2070&auto=format&fit=crop",
    description: "Our Olympic-sized infinity pool offers breathtaking views and crystal-clear water. Perfect for both morning laps and relaxing afternoon dips.",
    rules: ["Shower before entering", "No food or glass near pool", "Proper swimwear required", "Children must be supervised"],
    location: "Level 5, Sky Terrace",
    type: "Outdoor",
    capacity: "20 people",
    schedule: "06:00 - 22:00"
  },
  "AMN-002": {
    title: "Gym Center",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop",
    description: "State-of-the-art fitness center equipped with the latest cardio and strength training machines from Technogym.",
    rules: ["Towel required", "Wipe down equipment after use", "Max 60 mins on cardio machines", "Proper gym attire only"],
    location: "Level 2, Fitness Wing",
    type: "Indoor",
    capacity: "15 people",
    schedule: "24/7"
  },
  "AMN-003": {
    title: "BBQ Area",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2070&auto=format&fit=crop",
    description: "Spacious outdoor barbecue area with professional-grade grills and comfortable seating for family gatherings.",
    rules: ["Advance booking required", "Clean the grill after use", "Dispose of waste in bins", "No loud music after 10 PM"],
    location: "Level 5, Poolside Deck",
    type: "Outdoor / Recreational",
    capacity: "10 people",
    schedule: "17:00 - 23:00"
  },
  "AMN-004": {
    title: "Function Hall",
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2070&auto=format&fit=crop",
    description: "Versatile event space for residents, ideal for private parties, meetings, and community gatherings.",
    rules: ["Security deposit required", "Maximum 100 guests", "Cleanliness must be maintained", "No heavy decorations on walls"],
    location: "Level 1, Community Center",
    type: "Indoor / Multi-purpose",
    capacity: "100 people",
    schedule: "By Booking"
  },
  "AMN-005": {
    title: "Karaoke Room",
    image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=2070&auto=format&fit=crop",
    description: "Private soundproofed lounge with professional audio systems and an extensive song library for your entertainment.",
    rules: ["No smoking", "Max 8 persons", "Book at least 2 hours in advance", "Clean up after use"],
    location: "Level B1, Entertainment Hub",
    type: "Indoor / Private",
    capacity: "8 people",
    schedule: "10:00 - 00:00"
  },
  "AMN-006": {
    title: "Sky Bar",
    image: "https://images.unsplash.com/photo-1536935338218-d413d88e7a43?q=80&w=2070&auto=format&fit=crop",
    description: "A sophisticated rooftop lounge offering premium beverages and panoramic city views. Ideal for evening gatherings.",
    rules: ["Age 21+ only", "Smart casual dress code", "Table reservation recommended", "Last order at 01:30"],
    location: "Rooftop, Block A",
    type: "Outdoor / Lounge",
    capacity: "50 people",
    schedule: "16:00 - 02:00"
  },
  "AMN-007": {
    title: "Children Playground",
    image: "https://images.unsplash.com/photo-1588075592446-265fd1e6e76f?q=80&w=2070&auto=format&fit=crop",
    description: "Safe and colorful play area designed to stimulate children's physical and creative development with modern equipment.",
    rules: ["Socks required in soft play", "Parental supervision mandatory", "No sharp objects", "Ages 2-12 only"],
    location: "Ground Floor, Garden Area",
    type: "Outdoor",
    capacity: "30 people",
    schedule: "08:00 - 20:00"
  },
  "AMN-008": {
    title: "Futsal Court",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=2070&auto=format&fit=crop",
    description: "High-quality synthetic turf court with professional lighting for night matches. Suitable for 5-a-side football.",
    rules: ["Futsal shoes only", "Max 12 players", "Bring your own ball", "No food on turf"],
    location: "Level 6, Sports Deck",
    type: "Outdoor / Lit",
    capacity: "12 people",
    schedule: "06:00 - 22:00"
  },
  "AMN-009": {
    title: "Reading Lounge",
    image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=2070&auto=format&fit=crop",
    description: "A quiet and peaceful sanctuary for book lovers. Features ergonomic seating and a curated collection of literature.",
    rules: ["Maintain silence", "No food allowed", "Return books to shelves", "Mobile phones on silent"],
    location: "Level 3, Library Wing",
    type: "Indoor / Quiet Zone",
    capacity: "20 people",
    schedule: "08:00 - 21:00"
  },
  "AMN-010": {
    title: "Cinema Room",
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070&auto=format&fit=crop",
    description: "Private mini-theater experience with premium leather recliners and Dolby Atmos surround sound system.",
    rules: ["Max 12 people", "No outside food allowed", "Book session in advance", "Clean up after use"],
    location: "Level B1, Media Center",
    type: "Indoor / Private Theater",
    capacity: "12 people",
    schedule: "10:00 - 22:00"
  }
};

const translations = {
  en: {
    back: "Back to List",
    edit: "Edit Details",
    about: "About this Facility",
    rules: "Usage Rules",
    location: "Location",
    capacity: "Capacity",
    schedule: "Operating Hours",
    type: "Facility Type",
    bookBtn: "Check Availability",
    idLabel: "Amenity ID",
    amenityTitles: {
      "Swimming Pool": "Swimming Pool",
      "Gym Center": "Gym Center",
      "BBQ Area": "BBQ Area",
      "Function Hall": "Function Hall",
      "Karaoke Room": "Karaoke Room",
      "Sky Bar": "Sky Bar",
      "Children Playground": "Children Playground",
      "Futsal Court": "Futsal Court",
      "Reading Lounge": "Reading Lounge",
      "Cinema Room": "Cinema Room",
    },
  },
  mm: {
    back: "စာရင်းသို့ပြန်သွားရန်",
    edit: "ပြင်ဆင်ရန်",
    about: "ဝန်ဆောင်မှုအကြောင်း",
    rules: "စည်းကမ်းချက်များ",
    location: "တည်နေရာ",
    capacity: "ဆံ့ဝင်ဦးရေ",
    schedule: "ဖွင့်လှစ်ချိန်",
    type: "အမျိုးအစား",
    bookBtn: "ရရှိနိုင်မှုစစ်ဆေးရန်",
    idLabel: "ဝန်ဆောင်မှု ID",
    amenityTitles: {
      "Swimming Pool": "ရေကူးကန်",
      "Gym Center": "အားကစားခန်းမ",
      "BBQ Area": "အကင်စားသောက်ရန်နေရာ",
      "Function Hall": "အခမ်းအနားခန်းမ",
      "Karaoke Room": "ကာရာအိုကေခန်း",
      "Sky Bar": "Sky Bar",
      "Children Playground": "ကလေးကစားကွင်း",
      "Futsal Court": "ဖူဆယ်ကွင်း",
      "Reading Lounge": "စာဖတ်ခန်း",
      "Cinema Room": "ရုပ်ရှင်ခန်း",
    },
  }
};

export default function AmenityDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { lang, mounted } = useTranslation();
  
  
  
  const t = translations[lang as keyof typeof translations] || translations.en;
  
  // Find amenity by ID or use a default if not found (since it's a demo)
  const amenityId = Array.isArray(id) ? id[0] : id;
  const data = amenityDetails[amenityId as keyof typeof amenityDetails] || amenityDetails["AMN-001"];

  return (
    <Container size="xl" py="xl">
      <Stack gap="xl">
        {/* Header Actions */}
        <Group justify="space-between">
          <Button 
            variant="light" 
            color="gray" 
            leftSection={<IconArrowLeft size={18} />}
            onClick={() => router.back()}
            radius="md"
            size="md"
          >
            {t.back}
          </Button>
          <Button 
            variant="filled" 
            color="#014F86" 
            leftSection={<IconEdit size={18} />}
            radius="md"
            size="md"
            style={{ boxShadow: '0 4px 15px rgba(1, 79, 134, 0.25)' }}
          >
            {t.edit}
          </Button>
        </Group>

        {/* Hero Section */}
        <Paper 
          radius="2rem" 
          shadow="xl" 
          style={{ 
            overflow: 'hidden', 
            position: 'relative',
            height: '500px',
            border: '8px solid white',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
          }}
        >
          <Image 
            src={data.image} 
            h="100%" 
            w="100%"
            alt={data.title}
            fallbackSrc="https://placehold.co/1200x500?text=Amenity+Image"
            style={{ objectFit: 'cover' }}
          />
          <Box 
            pos="absolute" 
            bottom={0} 
            left={0} 
            right={0} 
            p="3rem" 
            style={{ 
              background: 'linear-gradient(transparent, rgba(0,0,0,0.85))',
              color: 'white',
              backdropFilter: 'blur(2px)'
            }}
          >
            <Group justify="space-between" align="flex-end">
              <Stack gap="xs">
                <Badge 
                  color="blue.4" 
                  variant="filled" 
                  size="lg" 
                  radius="sm"
                  style={{ fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}
                >
                  {t.idLabel}: {amenityId}
                </Badge>
                <Title order={1} style={{ fontSize: '3.5rem', fontWeight: 900, letterSpacing: '-2px' }}>
                  {t.amenityTitles[data.title as keyof typeof t.amenityTitles] || data.title}
                </Title>
              </Stack>
              <Button 
                size="xl" 
                color="white" 
                c="#014F86" 
                radius="md"
                style={{ 
                  boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
                  fontWeight: 800
                }}
              >
                {t.bookBtn}
              </Button>
            </Group>
          </Box>
        </Paper>

        <Grid gutter={40}>
          {/* Main Info */}
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Stack gap={40}>
              <Box>
                <Group mb="xl" gap="xs">
                  <ThemeIcon variant="light" color="blue" size="md" radius="sm">
                    <IconInfoCircle size={20} />
                  </ThemeIcon>
                  <Title order={2} style={{ fontWeight: 800, letterSpacing: '-0.5px' }}>Amenities Details</Title>
                </Group>
                <Text size="xl" c="gray.7" style={{ lineHeight: 1.8, fontWeight: 500 }}>
                  {data.description}
                </Text>
              </Box>

              <Paper radius="lg" p="xl" style={{ border: '1px solid #e9ecef', backgroundColor: '#fafafa' }}>
                <Group mb="xl" gap="xs">
                  <ThemeIcon variant="light" color="green" size="md" radius="sm">
                    <IconShieldCheck size={20} />
                  </ThemeIcon>
                  <Title order={2} style={{ fontWeight: 800, letterSpacing: '-0.5px' }}>{t.rules}</Title>
                </Group>
                <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="xl">
                  {data.rules.map((rule, index) => (
                    <Group key={index} gap="md" align="flex-start" wrap="nowrap">
                      <ThemeIcon color="green" variant="filled" size="sm" radius="xl" mt={4}>
                        <IconShieldCheck size={12} />
                      </ThemeIcon>
                      <Text size="md" fw={600} c="gray.8">{rule}</Text>
                    </Group>
                  ))}
                </SimpleGrid>
              </Paper>
            </Stack>
          </Grid.Col>

          {/* Side Info Cards */}
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack gap="xl">
              <Paper radius="lg" p="xl" style={{ border: '1px solid #e9ecef', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
                <Stack gap="xl">
                  <Group wrap="nowrap" gap="lg">
                    <ThemeIcon size={48} radius="lg" variant="light" color="blue">
                      <IconMapPin size={24} />
                    </ThemeIcon>
                    <Box>
                      <Text size="xs" c="dimmed" fw={800} tt="uppercase" lts={1}>{t.location}</Text>
                      <Text fw={700} size="lg">{data.location}</Text>
                    </Box>
                  </Group>

                  <Group wrap="nowrap" gap="lg">
                    <ThemeIcon size={48} radius="lg" variant="light" color="teal">
                      <IconClock size={24} />
                    </ThemeIcon>
                    <Box>
                      <Text size="xs" c="dimmed" fw={800} tt="uppercase" lts={1}>{t.schedule}</Text>
                      <Text fw={700} size="lg">{data.schedule}</Text>
                    </Box>
                  </Group>

                  <Group wrap="nowrap" gap="lg">
                    <ThemeIcon size={48} radius="lg" variant="light" color="orange">
                      <IconInfoCircle size={24} />
                    </ThemeIcon>
                    <Box>
                      <Text size="xs" c="dimmed" fw={800} tt="uppercase" lts={1}>{t.type}</Text>
                      <Text fw={700} size="lg">{data.type}</Text>
                    </Box>
                  </Group>
                </Stack>
              </Paper>

              <Paper radius="lg" p="xl" style={{ backgroundColor: '#014F86', color: 'white' }}>
                <Stack gap="lg">
                  <Group gap="xs">
                    <IconUsers size={20} />
                    <Text fw={800} size="sm" tt="uppercase" lts={1}>{t.capacity}</Text>
                  </Group>
                  <Group justify="space-between" align="flex-end">
                    <Text size="xs" fw={500} opacity={0.8}>Max Occupancy</Text>
                    <Text fw={900} size="xl">{data.capacity}</Text>
                  </Group>
                  <Divider opacity={0.2} />
                  <Group justify="space-between">
                    <Text size="sm" fw={600}>Available Today</Text>
                    <Badge color="white" c="#014F86" fw={900}>High</Badge>
                  </Group>
                </Stack>
              </Paper>
            </Stack>
          </Grid.Col>
        </Grid>
      </Stack>
    </Container>
  );
}
