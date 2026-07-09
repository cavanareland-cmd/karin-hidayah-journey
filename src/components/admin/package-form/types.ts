// Types for package form data

export interface ItineraryActivity {
  text: string;
  link?: string;
}

export interface ItineraryDay {
  day: number;
  title: string;
  temperature?: string;
  weather?: string;
  description?: string;
  activities: ItineraryActivity[];
  thumbnail?: string;
}

export interface Facility {
  icon: string;
  name: string;
}

export interface NotIncludedItem {
  icon?: string;
  text: string;
}

export interface ReviewTestimonial {
  name: string;
  role: string;
  content: string;
  avatar?: string;
  recommended: boolean;
}

export interface ReviewStats {
  total_reviews: number;
  average_rating: number;
  breakdown: {
    "5": number;
    "4": number;
    "3": number;
    "2": number;
    "1": number;
  };
}

export interface AgentInfo {
  name: string;
  position: string;
  email: string;
  photo_url: string;
  button_text: string;
}

export interface GalleryImage {
  url: string;
  caption?: string;
}

export interface GallerySection {
  title: string;
  subtitle: string;
  description: string;
  button_text: string;
  button_link: string;
  images: GalleryImage[];
}

export interface RelatedPackage {
  id: string;
  name: string;
  image: string;
  link: string;
  button_text: string;
}

export interface CTASection {
  background_image: string;
  headline: string;
  subheadline: string;
  description: string;
  button_text: string;
  button_link: string;
}

export interface HotelInfo {
  name: string;
  stars: number;
  distance: string;
  image: string;
  note?: string;
}

export interface TrustBadge {
  title: string;
  sub: string;
}

export interface PackageFormData {
  // Basic info
  name: string;
  subtitle: string;
  location_text: string;
  category: string;
  description: string;
  price: string;
  duration_days: string;
  departure_date: string;
  period_text: string;
  image_url: string;
  hero_image: string;
  is_featured: boolean;
  is_active: boolean;
  rating: string;
  total_reviews: string;

  // Detail info (new)
  permit_number: string;
  airline: string;
  route: string;
  deposit_amount: string;
  whatsapp_number: string;
  hotels: { madinah: HotelInfo; makkah: HotelInfo };
  trust_badges: TrustBadge[];
  
  // Complex fields
  itinerary: ItineraryDay[];
  facilities: Facility[];
  facilities_not_included: NotIncludedItem[];
  gallery_images: GalleryImage[];
  reviews_data: ReviewTestimonial[];
  review_stats: ReviewStats;
  agent_info: AgentInfo;
  gallery_section: GallerySection;
  related_packages: RelatedPackage[];
  cta_section: CTASection;
}

export const defaultFormData: PackageFormData = {
  name: "",
  subtitle: "",
  location_text: "",
  category: "Regular",
  description: "",
  price: "",
  duration_days: "",
  departure_date: "",
  period_text: "",
  image_url: "",
  hero_image: "",
  is_featured: false,
  is_active: true,
  rating: "5.0",
  total_reviews: "0",
  permit_number: "",
  airline: "Lion Air",
  route: "SUB-JED",
  deposit_amount: "5000000",
  whatsapp_number: "",
  hotels: {
    madinah: { name: "", stars: 4, distance: "", image: "", note: "/ Setaraf" },
    makkah: { name: "", stars: 4, distance: "", image: "", note: "/ Setaraf" },
  },
  trust_badges: [
    { title: "KEMENAG", sub: "Terakreditasi" },
    { title: "5 PASTI", sub: "Umroh Resmi" },
    { title: "SISKOPATUH", sub: "Terdaftar" },
  ],
  itinerary: [],
  facilities: [],
  facilities_not_included: [],
  gallery_images: [],
  reviews_data: [],
  review_stats: {
    total_reviews: 0,
    average_rating: 0,
    breakdown: { "5": 0, "4": 0, "3": 0, "2": 0, "1": 0 }
  },
  agent_info: {
    name: "",
    position: "",
    email: "",
    photo_url: "",
    button_text: "Contact With Me"
  },
  gallery_section: {
    title: "",
    subtitle: "",
    description: "",
    button_text: "",
    button_link: "",
    images: []
  },
  related_packages: [],
  cta_section: {
    background_image: "",
    headline: "",
    subheadline: "",
    description: "",
    button_text: "",
    button_link: ""
  }
};
