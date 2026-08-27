import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CREME — Food & Restaurant Podcasts",
  description: "A curated listening library about food culture, restaurants, hospitality, history and food systems.",
};

export default function PodcastsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
