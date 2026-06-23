import { IMGS } from "./images";
import { C } from "./site";

export interface SurveyRow {
  label: string;
  value: string;
}

export interface Amenity {
  icon: string;
  name: string;
}

export interface LocationBenefit {
  icon: string;
  title: string;
  desc: string;
}

export interface Project {
  id: ProjectId;
  name: string;
  tagline: string;
  cat: string;
  loc: string;
  color: string;
  imgs: string[];
  bookingImg: string;
  about: string;
  plots: string;
  sizes: string;
  status: string;
  whyInvest: string[];
  surveyInfo: SurveyRow[];
  amenities: Amenity[];
  locationBenefits: LocationBenefit[];
  // Optional per-project SEO / GEO overrides.
  seoTitle?: string;
  seoDescription?: string;
  schemaName?: string;
  schemaDescription?: string;
  faqs?: { q: string; a: string; inSchema?: boolean }[];
}

export type ProjectId = "pride" | "aerox" | "regalia" | "elanza" | "paradise";

/** A lighter summary used by listing / card views. */
export interface ProjectSummary {
  id: ProjectId;
  name: string;
  sub: string;
  cat: string;
  loc: string;
  plots: string;
  sizes: string;
  color: string;
  img: string;
  desc: string;
  /** When true, the project is fully booked — shown with a SOLD OUT treatment. */
  soldOut?: boolean;
}

export const PROJECTS: Record<ProjectId, Project> = {
  pride: {
    id: "pride",
    name: "Pride",
    tagline: "A Community Built on Dignity & Growth",
    cat: "Residential Plotted Development",
    loc: "Kasindra, Dholera",
    color: "#e05c1a",
    imgs: [IMGS.pride_cover, IMGS.pride_megaprojects, IMGS.pride_amenities],
    bookingImg: IMGS.pride_booking,
    about:
      "RSC Pride is a premium residential plotted development at Kasindra — one of the original 22 villages of Dholera SIR. With Pride 1, Pride 2 and Pride 3 phases, this project offers strategically located plots with full civic amenities. Positioned at the entrance of DSIR TP2, just 9 minutes from the ABCD Building and near the Knowledge & IT Zone.",
    plots: "400+ Plots",
    sizes: "150–400 Sq.Yd",
    status: "Available",
    whyInvest: [
      "Located in Ahmedabad–Dholera Expressway corridor",
      "In the vicinity of Dholera SIR Activation Area",
      "Just 9 minutes from ABCD Building",
      "Near Knowledge & IT Zone of DSIR",
      "At entrance of DSIR TP2 — prime gateway location",
      "NA, NOC, Title Clear with Plan-Pass approval",
    ],
    surveyInfo: [
      { label: "Location", value: "Kasindra MDR Road, Dholera" },
      { label: "NA / NOC", value: "Certified" },
      { label: "Title Clear", value: "Yes" },
      { label: "Plan Pass", value: "Approved" },
    ],
    amenities: [
      { icon: "🛝", name: "Children Play Area" },
      { icon: "🏊", name: "Kids Swimming Pool" },
      { icon: "⛪", name: "Temple" },
      { icon: "🏡", name: "Club House" },
      { icon: "🌳", name: "Landscaping Garden" },
      { icon: "🔒", name: "24/7 Security" },
      { icon: "⚡", name: "24/7 Electricity" },
      { icon: "🛣️", name: "Internal Road" },
      { icon: "🚧", name: "Project Boundary" },
      { icon: "💧", name: "Water Connection" },
    ],
    locationBenefits: [
      { icon: "🏛️", title: "ABCD Building", desc: "Administrative hub — 9 minutes away" },
      { icon: "✈️", title: "Dholera Int'l Airport", desc: "Upcoming greenfield airport via Navagam" },
      { icon: "🛣️", title: "Expressway Access", desc: "Direct access to Ahmedabad-Dholera NH-751" },
      { icon: "🔬", title: "Knowledge & IT Zone", desc: "Located near the IT Zone of DSIR" },
      { icon: "💻", title: "Tata Semiconductor", desc: "India's first semiconductor FAB plant nearby" },
      { icon: "☀️", title: "Tata Solar Park", desc: "5000 MW world's largest solar park" },
    ],
    seoTitle: "RSC Pride Dholera – Plot Sizes & Booking | DealWithIt Realty",
    seoDescription:
      "Book RERA-approved residential plots in RSC Pride, Dholera SIR through DealWithIt Realty. NA/NOC title-clear plots, flexible payment plans, and full investment guidance.",
    schemaName: "RSC Pride - Dholera SIR",
    schemaDescription:
      "RERA-approved residential plots in RSC Pride, Dholera Special Investment Region, Gujarat. NA/NOC title-clear plots offered through DealWithIt Realty.",
    faqs: [
      {
        q: "Is this project RERA-approved?",
        a: "Yes, the project is RERA-registered with NA/NOC title-clear plots ready for immediate registration.",
        inSchema: true,
      },
      {
        q: "Who is DealWithIt Realty?",
        a: "DealWithIt Realty is an authorized real estate sales partner for plot investments in Dholera SIR, including RSC Pride and Aerox.",
        inSchema: true,
      },
      { q: "What plot sizes are available?", a: "Plots range from 150–400 Sq.Yd." },
    ],
  },
  aerox: {
    id: "aerox",
    name: "Aerox",
    tagline: "Where Leisure Finds its Landmark",
    cat: "Commercial & Residential Plots",
    loc: "Pipli, Dholera",
    color: C.gold,
    imgs: [IMGS.aerox_gateway, IMGS.aerox_clubhouse, IMGS.aerox_about],
    bookingImg: IMGS.aerox_booking,
    about:
      "Aerox by RSC Group Dholera is a premium residential and commercial plotting scheme at Pipli, Dholera. Strategically positioned between the Ahmedabad-Dholera Expressway (NH-751) and the Dholera International Airport, Aerox offers unmatched investment opportunity in India's first greenfield smart city.",
    plots: "350+ Plots",
    sizes: "144–430 Sq.Yd",
    status: "Available",
    whyInvest: [
      "Directly facing Ahmedabad-Dholera Expressway (NH-751)",
      "Towards Dholera International Airport",
      "Near Lothal National Maritime Heritage Museum",
      "Pipli Circle — strategic connectivity junction",
      "Ambli Metro Station access",
      "Proximity to Dholera Activation Area",
    ],
    surveyInfo: [
      { label: "Location", value: "Pipli, Ta: Dholera, Dist: Ahmedabad" },
      { label: "NA / NOC", value: "Registered & Certified" },
      { label: "Title Clear", value: "Yes" },
    ],
    amenities: [
      { icon: "🚪", name: "Entrance Gate" },
      { icon: "🏡", name: "Club House" },
      { icon: "🛣️", name: "Internal Road" },
      { icon: "🔒", name: "24x7 Security" },
      { icon: "🌳", name: "Landscape Garden" },
      { icon: "🛖", name: "Security Cabin" },
      { icon: "📍", name: "Plot Demarcation" },
      { icon: "💡", name: "Street Light" },
      { icon: "🚧", name: "Project Boundary" },
      { icon: "💧", name: "Water Connection" },
      { icon: "📷", name: "CCTV Surveillance" },
      { icon: "⚡", name: "24x7 Electricity" },
    ],
    locationBenefits: [
      { icon: "✈️", title: "Dholera Int'l Airport", desc: "Greenfield airport on 1700 acres" },
      { icon: "🛣️", title: "NH-751 Expressway", desc: "109 km six-lane expressway" },
      { icon: "🏛️", title: "Lothal Heritage Museum", desc: "National Maritime Heritage Museum" },
      { icon: "🚇", title: "Ambli Metro Station", desc: "Metro to Ahmedabad and GIFT City" },
      { icon: "🏢", title: "ABCD Building", desc: "Central admin of Dholera Smart City" },
      { icon: "⚡", title: "Activation Area", desc: "Near 22.5 sq.km Dholera activation zone" },
    ],
    seoTitle: "Aerox Dholera SIR – Residential & Commercial Plots | DealWithIt Realty",
    seoDescription:
      "Aerox in Dholera SIR offers title-clear residential and commercial plots near the Dholera-Ahmedabad highway. DealWithIt Realty helps you invest with confidence — sizes, locations, and booking details inside.",
    schemaName: "Aerox - Dholera SIR",
    schemaDescription:
      "RERA-approved residential and commercial plots in Aerox, Dholera Special Investment Region, near the Ahmedabad-Dholera highway. Offered through DealWithIt Realty.",
    faqs: [
      {
        q: "Is this project RERA-approved?",
        a: "Yes, the project is RERA-registered with NA/NOC title-clear plots ready for immediate registration.",
        inSchema: true,
      },
      {
        q: "Who is DealWithIt Realty?",
        a: "DealWithIt Realty is an authorized real estate sales partner for plot investments in Dholera SIR, including RSC Pride and Aerox.",
        inSchema: true,
      },
      { q: "What plot sizes are available?", a: "Plots range from 144–430 Sq.Yd." },
    ],
  },
  regalia: {
    id: "regalia",
    name: "Regalia 5",
    tagline: "A Perfect Canvas for Your Dream Home",
    cat: "Luxury Residential Plots",
    loc: "Cher, Dholera",
    color: C.goldL,
    imgs: [IMGS.regalia_gateway, IMGS.regalia_cover, IMGS.regalia_awards],
    bookingImg: IMGS.regalia_booking,
    about:
      "Regalia 5 is an exclusive luxury residential plotting scheme at Cher village, Dholera. With just 22 thoughtfully planned plots of 444.76 sq. yards each, this boutique development offers unrivalled exclusivity. Located in Residential Zone (FP 382, TP 3C1) with a 30 MTR wide approach road.",
    plots: "22 Plots",
    sizes: "444.76 Sq.Yd each",
    status: "Available",
    whyInvest: [
      "Only 22 exclusive plots — maximum exclusivity",
      "Final Plot 382, TP 3C1 — Residential Zone, Cher",
      "City Center just 2 minutes away",
      "River Front access within 3 minutes",
      "Express Highway access within 6 minutes",
      "Activation Zone 11 minutes away",
    ],
    surveyInfo: [
      { label: "Survey No.", value: "135" },
      { label: "Final Plot", value: "382" },
      { label: "TP No.", value: "3 C1" },
      { label: "Zone", value: "Residential Zone" },
      { label: "Village", value: "Cher, Dholera" },
      { label: "Road Width", value: "30 MTR" },
    ],
    amenities: [
      { icon: "🚪", name: "Entrance Gate" },
      { icon: "🏡", name: "Club House" },
      { icon: "🛣️", name: "Internal Road" },
      { icon: "🔒", name: "24x7 Security" },
      { icon: "🌳", name: "Landscape Garden" },
      { icon: "🛖", name: "Security Cabin" },
      { icon: "📍", name: "Plot Demarcation" },
      { icon: "💡", name: "Street Light" },
      { icon: "🚧", name: "Project Boundary" },
      { icon: "💧", name: "Water Connection" },
      { icon: "📷", name: "CCTV Surveillance" },
      { icon: "⚡", name: "24x7 Electricity" },
    ],
    locationBenefits: [
      { icon: "🏙️", title: "City Center", desc: "2 minutes from Dholera City Center" },
      { icon: "🌊", title: "River Front", desc: "Scenic riverfront access in 3 mins" },
      { icon: "🏢", title: "ABCD Building", desc: "10 minutes away" },
      { icon: "🛣️", title: "Express Highway", desc: "NH-751 in 6 minutes" },
      { icon: "💻", title: "TATA Semiconductor", desc: "12 minutes away" },
      { icon: "✈️", title: "Dholera Airport", desc: "30 minutes away" },
    ],
  },
  elanza: {
    id: "elanza",
    name: "Elanza 2",
    tagline: "Build Your Future in Dholera",
    cat: "Premium Residential Plots",
    loc: "Kharod, Dholera",
    color: "#5a86c4",
    imgs: ["/projects/elanza.jpeg", "/projects/elanza.jpeg", "/projects/elanza.jpeg"],
    bookingImg: "/projects/elanza.jpeg",
    about:
      "Elanza 2 is a premium residential plotting scheme by RSC Group Dholera at Kharod, strategically positioned near TP-2 of the Dholera SIR. A NA/NOC title-clear project with a planned layout of 7.5, 9 and 12-metre wide roads, corner and garden-adjoined plots — minutes from the ABCD Building, metro station and the Dholera growth corridor.",
    plots: "Premium Plots",
    sizes: "Square-Yard Plots",
    status: "New Launch",
    whyInvest: [
      "Strategic Kharod location, very near TP-2 (Dholera SIR)",
      "Just 2 minutes from the TP-2 entrance",
      "Metro station within 6 minutes",
      "ABCD City Center hub within 10 minutes",
      "Easily reachable to Dholera International Airport",
      "NA, NOC and Title Clear — RSC Group standard",
    ],
    surveyInfo: [
      { label: "Location", value: "Kharod, Dholera (near TP-2)" },
      { label: "NA / NOC", value: "Registered & Certified" },
      { label: "Title Clear", value: "Yes" },
      { label: "Road Width", value: "7.5 / 9 / 12 MTR" },
      { label: "Developer", value: "RSC Group Dholera" },
    ],
    amenities: [
      { icon: "🚪", name: "Entrance Gate" },
      { icon: "🛝", name: "Children Play Area" },
      { icon: "🧱", name: "Compound Wall" },
      { icon: "🏛️", name: "Gazebo" },
      { icon: "🌳", name: "Senior Citizen Park" },
      { icon: "🏃", name: "Jogging Park" },
      { icon: "🛣️", name: "Internal Road" },
      { icon: "📷", name: "CCTV Surveillance" },
      { icon: "📍", name: "Plot Demarcation" },
    ],
    locationBenefits: [
      { icon: "🏛️", title: "TP-2 Entrance", desc: "2 minutes away" },
      { icon: "🚇", title: "Metro Station", desc: "6 minutes away" },
      { icon: "🏢", title: "ABCD Building", desc: "Central admin hub — 10 minutes" },
      { icon: "🔬", title: "IT & Knowledge Area", desc: "10 minutes away" },
      { icon: "🏭", title: "Industrial Zone", desc: "8 minutes away" },
      { icon: "✈️", title: "Dholera Int'l Airport", desc: "Approx. 20 minutes" },
    ],
    seoTitle: "Elanza 2 Dholera SIR – Premium Residential Plots at Kharod | DealWithIt Realty",
    seoDescription:
      "Elanza 2 by RSC Group — premium residential plots at Kharod, near TP-2 of Dholera SIR. NA/NOC title-clear plots offered through DealWithIt Realty.",
    schemaName: "Elanza 2 - Dholera SIR",
    schemaDescription:
      "Premium residential plots in Elanza 2 at Kharod, Dholera Special Investment Region, Gujarat. NA/NOC title-clear plots offered through DealWithIt Realty.",
  },
  paradise: {
    id: "paradise",
    name: "Paradise",
    tagline: "Your Gateway to a New Era of Living",
    cat: "Township Development",
    loc: "Gamph, Dholera",
    color: "#4aab82",
    imgs: [IMGS.paradise_cover, IMGS.paradise_dholera, IMGS.paradise_mega],
    bookingImg: IMGS.paradise_booking,
    about:
      "Paradise by RSC Group Dholera is a landmark township development at Gamph village, Dholera. Situated along the Ahmedabad-Dholera Expressway corridor, Paradise is designed to provide exceptional quality of life with premium amenities, wide internal roads, and a master-planned layout. This project is now fully booked.",
    plots: "200+ Plots",
    sizes: "150–500 Sq.Yd",
    status: "Sold Out",
    whyInvest: [
      "Prime location along Ahmedabad-Dholera Expressway",
      "Close proximity to Dholera Activation Area",
      "Master-planned township with world-class amenities",
      "Strong appreciation potential — early mover advantage",
      "Backed by RSC Group — 15+ successful Dholera projects",
    ],
    surveyInfo: [
      { label: "Location", value: "Gamph, Dholera" },
      { label: "NA / NOC", value: "Certified" },
      { label: "Title Clear", value: "Yes" },
      { label: "Developer", value: "RSC Group Dholera" },
    ],
    amenities: [
      { icon: "🚪", name: "Grand Entrance" },
      { icon: "🏡", name: "Club House" },
      { icon: "🏊", name: "Swimming Pool" },
      { icon: "🛝", name: "Children Play Area" },
      { icon: "🌳", name: "Landscaped Gardens" },
      { icon: "🔒", name: "24/7 Security" },
      { icon: "💡", name: "Street Lighting" },
      { icon: "💧", name: "Water Connection" },
      { icon: "⚡", name: "24/7 Electricity" },
      { icon: "🛣️", name: "Internal Roads" },
      { icon: "🚧", name: "Project Boundary" },
      { icon: "📷", name: "CCTV Surveillance" },
    ],
    locationBenefits: [
      { icon: "🛣️", title: "Expressway Access", desc: "Ahmedabad-Dholera Expressway" },
      { icon: "✈️", title: "Dholera Airport", desc: "Dholera International Airport nearby" },
      { icon: "🏢", title: "ABCD Building", desc: "Central admin hub" },
      { icon: "☀️", title: "Tata Solar Park", desc: "5000 MW solar park" },
      { icon: "💻", title: "Semiconductor Hub", desc: "Tata Electronics FAB plant" },
      { icon: "⚡", title: "Activation Area", desc: "22.5 sq.km activated zone" },
    ],
  },
};

/** Ordered list used by home & projects listing pages. */
export const PROJECT_SUMMARIES: ProjectSummary[] = [
  {
    id: "pride",
    name: "Pride",
    sub: "Residential Plots",
    cat: "Residential Plotted Development",
    loc: "Kasindra, Dholera",
    plots: "400+ Plots",
    sizes: "150–400 Sq.Yd",
    color: "#e05c1a",
    img: IMGS.pride_cover,
    desc: "Premium residential plots at the entrance of DSIR TP2, just 9 minutes from ABCD Building with full civic amenities.",
  },
  {
    id: "aerox",
    name: "Aerox",
    sub: "Commercial & Residential",
    cat: "Commercial & Residential",
    loc: "Pipli, Dholera",
    plots: "350+ Plots",
    sizes: "144–430 Sq.Yd",
    color: C.gold,
    img: IMGS.aerox_gateway,
    desc: "Strategic plots on NH-751, between Ahmedabad and the Dholera International Airport.",
  },
  {
    id: "regalia",
    name: "Regalia 5",
    sub: "Luxury Residential",
    cat: "Luxury Residential",
    loc: "Cher, Dholera",
    plots: "22 Plots",
    sizes: "444.76 Sq.Yd",
    color: C.goldL,
    img: IMGS.regalia_gateway,
    desc: "Boutique — only 22 luxury plots in a prime zone with 30 MTR wide approach road.",
  },
  {
    id: "elanza",
    name: "Elanza 2",
    sub: "Premium Residential",
    cat: "Premium Residential Plots",
    loc: "Kharod, Dholera",
    plots: "Premium Plots",
    sizes: "Square-Yard Plots",
    color: "#5a86c4",
    img: "/projects/elanza.jpeg",
    desc: "Premium residential plots by RSC Group at Kharod, near TP-2 of Dholera SIR — NA/NOC title clear.",
  },
  {
    id: "paradise",
    name: "Paradise",
    sub: "Township",
    cat: "Township Development",
    loc: "Gamph, Dholera",
    plots: "200+ Plots",
    sizes: "150–500 Sq.Yd",
    color: "#4aab82",
    img: IMGS.paradise_cover,
    desc: "Master-planned township along the Ahmedabad-Dholera Expressway — now fully booked.",
    soldOut: true,
  },
];
