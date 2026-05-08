const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

async function fetchApi<T>(endpoint: string, fallback: T): Promise<T> {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch {
    console.info(`[API] Using fallback data for ${endpoint}`);
    return fallback;
  }
}

async function postApi<T>(endpoint: string, body: unknown): Promise<T> {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

// Types matching Spring Boot entities

const API = "http://localhost:8080/api";

export async function checkAvailability(
  roomId: number,
  checkin: string,
  checkout: string
) {
  const res = await fetch(
    `http://localhost:8080/api/bookings/availability?roomId=${roomId}&checkIn=${checkin}&checkOut=${checkout}`
  );

  if (!res.ok) throw new Error("Failed to check availability");

  return res.json();
}

export const getDashboardStats = async () => {
  const res = await fetch("http://localhost:8080/api/bookings/dashboard");
  return res.json();
};

export const getBookings = async () => {
  const res = await fetch("http://localhost:8080/api/bookings");
  return res.json();
};



// GET
export const getRoom = () =>
  fetch(API + "/rooms").then(res => res.json());

// ADD
export const addRoom = (room: any) =>
  fetch(API + "/rooms", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(room),
  }).then(res => res.json());

// UPDATE
export const updateRoom = (id: number, room: any) =>
  fetch(API + "/rooms/" + id, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(room),
  }).then(res => res.json());

// DELETE
export const deleteRoom = (id: number) =>
  fetch(API + "/rooms/" + id, {
    method: "DELETE",
  });



export interface Room {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  capacity: number;
  features: string[];
}

export interface Booking {
  name: string;
  email: string;
  checkin: string;
  checkout: string;
  guests: number;
  promoCode?: string;
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  discount: number;
  code: string;
  validUntil: string;
  image: string;
}

export interface GalleryImage {
  id: string;
  imageUrl: string;
  caption: string;
  category: string;
}

export interface Video {
  id: string;
  title: string;
  videoUrl: string;
  thumbnail: string;
}

export interface Facility {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface LocationInfo {
  address: string;
  city: string;
  country: string;
  phone: string;
  email: string;
  mapEmbedUrl: string;
  lat: number;
  lng: number;
}

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
}

// Fallback data
import roomSuite from "@/assets/room-suite.jpg";
import roomDeluxe from "@/assets/room-deluxe.jpg";
import roomStandard from "@/assets/room-standard.jpg";
import diningImg from "@/assets/dining.jpg";
import heroImg from "@/assets/hero-hotel.jpg";

export const fallbackRooms: Room[] = [
  { id: "1", name: "Royal Suite", price: 1500, description: "An opulent suite featuring panoramic city views, a private lounge, marble bathroom with soaking tub, and personalized butler service.", image: roomSuite, capacity: 3, features: ["King Bed", "City View", "Butler Service", "Lounge", "Mini Bar"] },
  { id: "2", name: "Deluxe Room", price: 2000, description: "Elegantly appointed with rich wood furnishings, premium linens, and a spacious marble bathroom with rain shower.", image: roomDeluxe, capacity: 2, features: ["King Bed", "Garden View", "Rain Shower", "Work Desk", "Wi-Fi"] },
  { id: "3", name: "AC", price: 2500, description: "Comfortable room options available in both air-conditioned and non-air-conditioned variants for every budget.", image: roomStandard, capacity: 2, features: ["Queen Bed", "City View", "Shower", "Smart TV", "Wi-Fi"] },
  { id: "4", name: "Non AC Room", price: 2500, description: "Comfortable room options available in both air-conditioned and non-air-conditioned variants for every budget.", image: roomStandard, capacity: 2, features: ["Queen Bed", "City View", "Shower", "Smart TV", "Wi-Fi"]},
];

const fallbackOffers: Offer[] = [
  { id: "1", title: "Direct Booking Benefit", description: "Book directly through our website and enjoy an exclusive 15% discount on all room categories, complimentary breakfast, and late checkout.", discount: 15, code: "DIRECT15", validUntil: "2026-12-31", image: heroImg },
  { id: "2", title: "Loyalty Member Rate", description: "Aurelian Privilege members receive 20% off the best available rate, priority upgrades, and exclusive access to member-only experiences.", discount: 20, code: "MEMBER20", validUntil: "2026-12-31", image: roomSuite },
  { id: "3", title: "Extended Stay Package", description: "Stay 4 nights or more and enjoy 25% off your entire stay, daily dining credits, and a complimentary spa treatment.", discount: 25, code: "STAY25", validUntil: "2026-09-30", image: roomDeluxe },
];

const fallbackGallery: GalleryImage[] = [
  { id: "1", imageUrl: heroImg, caption: "Grand Lobby", category: "Interior" },
  { id: "2", imageUrl: roomSuite, caption: "Royal Suite", category: "Rooms" },
  { id: "3", imageUrl: roomDeluxe, caption: "Deluxe Room", category: "Rooms" },
  { id: "4", imageUrl: roomStandard, caption: "Superior Room", category: "Rooms" },
];

const fallbackVideos: Video[] = [
  { id: "1", title: "Experience Aurelian", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", thumbnail: heroImg },
  { id: "2", title: "The Royal Suite Tour", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", thumbnail: roomSuite },
  { id: "3", title: "Culinary Excellence", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", thumbnail: diningImg },
];

const fallbackFacilities: Facility[] = [
  { id: "1", name: "High-Speed Wi-Fi", icon: "Wifi", description: "Complimentary ultra-fast wireless internet throughout the property" },
  { id: "2", name: "Travel Desk", icon: "Compass", description: "Expert concierge team for tours, transfers, and local experiences" },
  { id: "3", name: "24/7 Room Service", icon: "UtensilsCrossed", description: "Round-the-clock in-room dining with a curated gourmet menu" },
  { id: "4", name: "24-Hour Check-in/out", icon: "Clock", description: "Flexible arrival and departure to suit your schedule" },
  { id: "5", name: "Luxury Spa", icon: "Sparkles", description: "Full-service spa with signature treatments and wellness programs" },
  { id: "6", name: "Valet Parking", icon: "Car", description: "Complimentary valet parking for all hotel guests" },
];

const fallbackLocation: LocationInfo = {
  address: "20/17-2 Kalavai Street, Near Saraswathi School & Temple Car Parking",
  city: "Rameswram-623 526",
  country: "India",
  phone: "+91 7010688411",
  email: "hotelpanchvarnaa@gmail.com",
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3937.4623429480503!2d79.31479797438105!3d9.292236784814179!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5266069776cbd9%3A0x5543ac8176ca530f!2sHOTEL%20PANCHAVARNAA!5e0!3m2!1sen!2sin!4v1775496483429!5m2!1sen!2sin",
  lat: 40.7484,
  lng: -73.9857,
};

// API functions
export const getRooms = () => fetchApi<Room[]>("/rooms", fallbackRooms);
export const getOffers = () => fetchApi<Offer[]>("/offers", fallbackOffers);
export const getGallery = () => fetchApi<GalleryImage[]>("/gallery", fallbackGallery);
export const getVideos = () => fetchApi<Video[]>("/videos", fallbackVideos);
export const getFacilities = () => fetchApi<Facility[]>("/facilities", fallbackFacilities);
export const getLocation = () => fetchApi<LocationInfo>("/location", fallbackLocation);

export const createBooking = (booking: Booking) => postApi("/bookings", booking);
export const sendContact = (msg: ContactMessage) => postApi("/contact", msg);
