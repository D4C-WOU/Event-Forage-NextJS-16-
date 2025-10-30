interface Event {
  title: string;
  image: string;
  slug: string;
  location: string;
  date: string;
  time: string;
}

export const events: Event[] = [
  {
    title: "Next.js Conference 2026",
    image: "/images/event1.png",
    slug: "nextjs-conf-2026",
    location: "San Francisco, CA",
    date: "March 15, 2026",
    time: "9:00 AM PST"
  },
  {
    title: "DevConnect Global Summit",
    image: "/images/event2.png",
    slug: "devconnect-summit-2026",
    location: "London, UK",
    date: "April 22, 2026",
    time: "10:00 AM GMT"
  },
  {
    title: "AI & ML Developer Days",
    image: "/images/event3.png",
    slug: "ai-ml-dev-days-2026",
    location: "Singapore",
    date: "May 8, 2026",
    time: "9:30 AM SGT"
  },
  {
    title: "React Summit Americas",
    image: "/images/event4.png",
    slug: "react-summit-americas-2026",
    location: "New York, NY",
    date: "June 12, 2026",
    time: "10:00 AM EST"
  },
  {
    title: "Global Hackathon Series",
    image: "/images/event5.png",
    slug: "global-hackathon-2026",
    location: "Virtual Event",
    date: "July 1-3, 2026",
    time: "Starts 9:00 AM UTC"
  },
  {
    title: "Cloud Native DevOps Forum",
    image: "/images/event6.png",
    slug: "cloud-native-devops-2026",
    location: "Berlin, Germany",
    date: "August 18, 2026",
    time: "10:00 AM CEST"
  }
];