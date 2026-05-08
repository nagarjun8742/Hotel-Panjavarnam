import roomSuite from "@/assets/room-suite.jpg";
import roomDeluxe from "@/assets/room-deluxe.jpg";
import roomStandard from "@/assets/room-standard.jpg";
import diningImg from "@/assets/dining.jpg";
import banquetImg from "@/assets/banquet.jpg";
import kovilImg from "@/assets/kovil.jpg";
import beachImg from "@/assets/beach.jpg";
import panbanImg from "@/assets/panban.jpg";

export interface Room {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  capacity: number;
  features: string[];
}

export interface Event {
  id: string;
  name: string;
  capacity: number;
  description: string;
  image: string;
  features: string[];
}

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  description: string;
  image: string;
  hours: string;
}

export const rooms: Room[] = [
  {
    id: "1",
    name: "Royal Suite",
    price: 850,
    description: "An opulent suite featuring panoramic city views, a private lounge, marble bathroom with soaking tub, and personalized butler service.",
    image: roomSuite,
    capacity: 3,
    features: ["King Bed", "City View", "Butler Service", "Lounge", "Mini Bar"],
  },
  {
    id: "2",
    name: "Deluxe Room",
    price: 450,
    description: "Elegantly appointed with rich wood furnishings, premium linens, and a spacious marble bathroom with rain shower.",
    image: roomDeluxe,
    capacity: 2,
    features: ["King Bed", "Garden View", "Rain Shower", "Work Desk", "Wi-Fi"],
  },
  {
    id: "3",
    name: "AC / Non Ac Room",
    price: 280,
    description: "Comfortable room options available in both air-conditioned and non-air-conditioned variants for every budget.",
    image: roomStandard,
    capacity: 2,
    features: ["Queen Bed", "City View", "Shower", "Smart TV", "Wi-Fi"],
  },
];

export const restaurants: Restaurant[] = [
  {
    id: "1",
    name: "Ramanathaswamy Temple",
    cuisine: "Holy Place",
    description: "One of the most sacred temples in India, famous for its long corridors and spiritual significance.",
    image: kovilImg,
    hours: "6:00 PM – 11:00 PM",
  },
  {
    id: "2",
    name: "Dhanushkodi Beach",
    cuisine: "Scenic Beach",
    description: "A beautiful and peaceful beach destination known for sunrise views and historical ruins.",
    image: beachImg,
    hours: "12:00 PM – 10:30 PM",
  },
  {
    id: "3",
    name: "Pamban Bridge",
    cuisine: "Iconic Landmark",
    description: "The famous sea bridge connecting Rameshwaram island, offering stunning ocean and train views.",
    image: panbanImg,
    hours: "10:00 AM – 12:00 AM",
  },
];

export const events: Event[] = [
  {
    id: "1",
    name: "The Grand Ballroom",
    capacity: 500,
    description: "A magnificent space adorned with crystal chandeliers and gilded columns, perfect for grand weddings and galas.",
    image: banquetImg,
    features: ["Stage", "Dance Floor", "AV System", "Catering", "Valet Parking"],
  },
  {
    id: "2",
    name: "The Monarch Hall",
    capacity: 200,
    description: "An intimate yet stately venue ideal for corporate conferences, product launches, and private celebrations.",
    image: banquetImg,
    features: ["Projector", "Podium", "Wi-Fi", "Breakout Rooms", "Catering"],
  },
  {
    id: "3",
    name: "The Terrace Pavilion",
    capacity: 120,
    description: "An open-air venue with stunning garden views, perfect for cocktail receptions and sunset ceremonies.",
    image: banquetImg,
    features: ["Open Air", "Garden View", "Bar Setup", "Lighting", "Sound System"],
  },
];

export const testimonials = [
  {
    name: "Alexandra M.",
    role: "Business Traveler",
    quote: "An extraordinary experience from the moment we arrived. The attention to detail and impeccable service made our anniversary truly unforgettable.",
  },
  {
    name: "James & Sarah K.",
    role: "Honeymoon",
    quote: "The Royal Suite exceeded every expectation. Waking up to that panoramic view with breakfast served by our butler — pure magic.",
  },
  {
    name: "David R.",
    role: "Corporate Event",
    quote: "We hosted our annual gala in The Grand Ballroom and it was flawless. The events team handled every detail with precision and grace.",
  },
];
