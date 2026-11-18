/**
 * City dataset for SEO URLs (/panchang/{city}) — mirrors the 30-city
 * GeoNames-derived seed in backend/supabase/migrations/0002_seed_v1.sql.
 * The DB `cities` table remains the source of truth for the backend; this
 * static mirror drives build-time page generation only.
 */
export interface City {
  slug: string;
  name: string;
  name_hi: string;
  lat: number;
  lng: number;
  tz: string;
}

export const CITIES: City[] = [
  {
    slug: "new-delhi",
    name: "New Delhi",
    name_hi: "नई दिल्ली",
    lat: 28.6139,
    lng: 77.209,
    tz: "Asia/Kolkata",
  },
  { slug: "mumbai", name: "Mumbai", name_hi: "मुंबई", lat: 19.076, lng: 72.8777, tz: "Asia/Kolkata" },
  {
    slug: "kolkata",
    name: "Kolkata",
    name_hi: "कोलकाता",
    lat: 22.5726,
    lng: 88.3639,
    tz: "Asia/Kolkata",
  },
  {
    slug: "chennai",
    name: "Chennai",
    name_hi: "चेन्नई",
    lat: 13.0827,
    lng: 80.2707,
    tz: "Asia/Kolkata",
  },
  {
    slug: "bengaluru",
    name: "Bengaluru",
    name_hi: "बेंगलुरु",
    lat: 12.9716,
    lng: 77.5946,
    tz: "Asia/Kolkata",
  },
  {
    slug: "hyderabad",
    name: "Hyderabad",
    name_hi: "हैदराबाद",
    lat: 17.385,
    lng: 78.4867,
    tz: "Asia/Kolkata",
  },
  { slug: "pune", name: "Pune", name_hi: "पुणे", lat: 18.5204, lng: 73.8567, tz: "Asia/Kolkata" },
  {
    slug: "ahmedabad",
    name: "Ahmedabad",
    name_hi: "अहमदाबाद",
    lat: 23.0225,
    lng: 72.5714,
    tz: "Asia/Kolkata",
  },
  {
    slug: "jaipur",
    name: "Jaipur",
    name_hi: "जयपुर",
    lat: 26.9124,
    lng: 75.7873,
    tz: "Asia/Kolkata",
  },
  {
    slug: "lucknow",
    name: "Lucknow",
    name_hi: "लखनऊ",
    lat: 26.8467,
    lng: 80.9462,
    tz: "Asia/Kolkata",
  },
  {
    slug: "varanasi",
    name: "Varanasi",
    name_hi: "वाराणसी",
    lat: 25.3176,
    lng: 82.9739,
    tz: "Asia/Kolkata",
  },
  {
    slug: "prayagraj",
    name: "Prayagraj",
    name_hi: "प्रयागराज",
    lat: 25.4358,
    lng: 81.8463,
    tz: "Asia/Kolkata",
  },
  { slug: "patna", name: "Patna", name_hi: "पटना", lat: 25.5941, lng: 85.1376, tz: "Asia/Kolkata" },
  {
    slug: "bhopal",
    name: "Bhopal",
    name_hi: "भोपाल",
    lat: 23.2599,
    lng: 77.4126,
    tz: "Asia/Kolkata",
  },
  {
    slug: "indore",
    name: "Indore",
    name_hi: "इंदौर",
    lat: 22.7196,
    lng: 75.8577,
    tz: "Asia/Kolkata",
  },
  {
    slug: "nagpur",
    name: "Nagpur",
    name_hi: "नागपुर",
    lat: 21.1458,
    lng: 79.0882,
    tz: "Asia/Kolkata",
  },
  { slug: "surat", name: "Surat", name_hi: "सूरत", lat: 21.1702, lng: 72.8311, tz: "Asia/Kolkata" },
  { slug: "kochi", name: "Kochi", name_hi: "कोच्चि", lat: 9.9312, lng: 76.2673, tz: "Asia/Kolkata" },
  {
    slug: "guwahati",
    name: "Guwahati",
    name_hi: "गुवाहाटी",
    lat: 26.1445,
    lng: 91.7362,
    tz: "Asia/Kolkata",
  },
  {
    slug: "chandigarh",
    name: "Chandigarh",
    name_hi: "चंडीगढ़",
    lat: 30.7333,
    lng: 76.7794,
    tz: "Asia/Kolkata",
  },
  {
    slug: "amritsar",
    name: "Amritsar",
    name_hi: "अमृतसर",
    lat: 31.634,
    lng: 74.8723,
    tz: "Asia/Kolkata",
  },
  {
    slug: "dehradun",
    name: "Dehradun",
    name_hi: "देहरादून",
    lat: 30.3165,
    lng: 78.0322,
    tz: "Asia/Kolkata",
  },
  {
    slug: "shimla",
    name: "Shimla",
    name_hi: "शिमला",
    lat: 31.1048,
    lng: 77.1734,
    tz: "Asia/Kolkata",
  },
  {
    slug: "udaipur",
    name: "Udaipur",
    name_hi: "उदयपुर",
    lat: 24.5854,
    lng: 73.7125,
    tz: "Asia/Kolkata",
  },
  {
    slug: "goa-panaji",
    name: "Panaji",
    name_hi: "पणजी",
    lat: 15.4909,
    lng: 73.8278,
    tz: "Asia/Kolkata",
  },
  {
    slug: "london",
    name: "London",
    name_hi: "लंदन",
    lat: 51.5074,
    lng: -0.1278,
    tz: "Europe/London",
  },
  {
    slug: "new-york",
    name: "New York",
    name_hi: "न्यूयॉर्क",
    lat: 40.7128,
    lng: -74.006,
    tz: "America/New_York",
  },
  { slug: "dubai", name: "Dubai", name_hi: "दुबई", lat: 25.2048, lng: 55.2708, tz: "Asia/Dubai" },
  {
    slug: "singapore",
    name: "Singapore",
    name_hi: "सिंगापुर",
    lat: 1.3521,
    lng: 103.8198,
    tz: "Asia/Singapore",
  },
  {
    slug: "kathmandu",
    name: "Kathmandu",
    name_hi: "काठमांडू",
    lat: 27.7172,
    lng: 85.324,
    tz: "Asia/Kathmandu",
  },
];

export function cityBySlug(slug: string): City | undefined {
  return CITIES.find((c) => c.slug === slug);
}
