import { IMGS } from "./images";

export interface BlogPost {
  id: string;
  title: string;
  cat: string;
  date: string;
  read: string;
  img: string;
  excerpt: string;
}

/**
 * Static fallback content. The live Blogs page fetches published posts from
 * Supabase; this array documents the editorial seed content / placeholders.
 */
export const BLOG_POSTS: BlogPost[] = [
  {
    id: "dholera-investment-2026",
    title: "Why Dholera SIR Is India's Top Real Estate Investment in 2026",
    cat: "Investment",
    date: "May 28, 2026",
    read: "6 min read",
    img: IMGS.pride_megaprojects,
    excerpt:
      "Dholera Smart City is rapidly becoming the most talked-about real estate destination in India. With the Tata Semiconductor FAB plant, Dholera International Airport, and a 920 km² master plan, here's why early investors are seeing exceptional returns.",
  },
  {
    id: "plot-buying-guide",
    title: "A Complete Guide to Buying NA Plots in Dholera",
    cat: "Buying Guide",
    date: "May 20, 2026",
    read: "8 min read",
    img: IMGS.aerox_gateway,
    excerpt:
      "From title verification to NA/NOC certification — everything you need to know before you book a residential or commercial plot in Dholera SIR. A step-by-step walkthrough from RSC Group's experts.",
  },
  {
    id: "dholera-vs-gift-city",
    title: "Dholera vs GIFT City: Where Should You Invest?",
    cat: "Market Insights",
    date: "May 12, 2026",
    read: "5 min read",
    img: IMGS.regalia_gateway,
    excerpt:
      "Both are Gujarat's flagship smart cities — but they serve very different investors. We compare appreciation potential, infrastructure timelines, and ticket sizes to help you decide.",
  },
  {
    id: "abcd-building-impact",
    title: "The ABCD Building Effect: How Dholera's Admin Hub Is Driving Plot Prices",
    cat: "Location",
    date: "Apr 30, 2026",
    read: "4 min read",
    img: IMGS.paradise_cover,
    excerpt:
      "Plots within 10 minutes of the ABCD Building have appreciated faster than the wider Dholera market. Here's the data behind the trend — and what it means for projects like Pride and Aerox.",
  },
  {
    id: "tata-semiconductor",
    title: "What the Tata Semiconductor FAB Plant Means for Dholera Real Estate",
    cat: "Industry",
    date: "Apr 18, 2026",
    read: "7 min read",
    img: IMGS.pride_megaprojects,
    excerpt:
      "India's first semiconductor fabrication plant is coming up in Dholera. We break down the jobs, the housing demand, and the long-term impact on plot prices in surrounding villages.",
  },
  {
    id: "rsc-pride-walkthrough",
    title: "Inside RSC Pride: A Walkthrough of Our Flagship Kasindra Project",
    cat: "Project Spotlight",
    date: "Apr 05, 2026",
    read: "5 min read",
    img: IMGS.pride_cover,
    excerpt:
      "From the grand entrance to plot demarcations and amenity zones — take a guided tour of Pride 1, 2 and 3 at Kasindra, just 9 minutes from the ABCD Building.",
  },
];
