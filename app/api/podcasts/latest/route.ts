const podcastFeeds: Record<string, string> = {
  Gastropod: "https://feeds.megaphone.fm/VMP6255701211",
  "Copper & Heat Radio": "https://feeds.simplecast.com/6tPVj8he",
  "The Splendid Table": "https://feeds.publicradio.org/public_feeds/the-splendid-table",
  "This Is TASTE": "https://feeds.megaphone.fm/this-is-taste",
  "Radio Cherry Bombe": "https://feeds.simplecast.com/b8n00peG",
  "The Dave Chang Show": "https://feeds.megaphone.fm/the-dave-chang-show",
  "Ruthie’s Table 4": "https://www.omnycontent.com/d/playlist/e73c998e-6e60-432f-8610-ae210140c5b1/f142f29a-33cf-4e9a-92e3-ae32006cd59d/75bd3df4-3898-48a6-a40e-ae32006cd5b4/podcast.rss",
  "The Menu": "https://www.omnycontent.com/d/playlist/e6127ab7-b81e-456b-893c-a8d600215365/1c1b8b0b-e9ea-4b7b-ae42-ab8a01222fc7/c06025d2-4e3e-42f2-b453-ab8a01222fcc/podcast.rss",
  "Japan Eats!": "https://rss.art19.com/japan-eats",
  "Prato Cheio": "https://feeds.simplecast.com/SdKZe7SN",
  Proof: "https://feeds.megaphone.fm/ARML1836404539",
  "Good Food": "https://feed.cdnstream1.com/zjb/feed/download/4b/e5/cc/4be5cc7b-8528-4b9e-8981-08d89bcff381.xml",
  "The Food Programme": "https://podcasts.files.bbci.co.uk/b006qnx3.rss",
  "The Sporkful": "https://feeds.simplecast.com/n91GPFY5",
  "Snacky Tunes": "https://rss.art19.com/snacky-tunes",
  "A Taste of the Past": "https://rss.art19.com/a-taste-of-the-past",
  "Opening Soon": "https://rss.art19.com/the-build",
};

type LatestEpisode = {
  title: string;
  audioUrl: string;
  publishedAt?: string;
  link?: string;
};

function decodeXml(value: string) {
  return value
    .replace(/^<!\[CDATA\[|\]\]>$/g, "")
    .replace(/<[^>]+>/g, "")
    .replace(/&#(\d+);/g, (_, code: string) => String.fromCodePoint(Number(code)))
    .replace(/&#x([\da-f]+);/gi, (_, code: string) => String.fromCodePoint(parseInt(code, 16)))
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&apos;|&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .trim();
}

function elementValue(xml: string, tag: string) {
  const match = xml.match(new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${tag}>`, "i"));
  return match ? decodeXml(match[1]) : undefined;
}

function parseLatestEpisode(xml: string): LatestEpisode | null {
  const item = xml.match(/<item\b[\s\S]*?<\/item>/i)?.[0];
  if (!item) return null;

  const audioUrl =
    item.match(/<ppg:enclosureSecure\b[^>]*\burl=["']([^"']+)["']/i)?.[1] ??
    item.match(/<enclosure\b[^>]*\burl=["']([^"']+)["']/i)?.[1] ??
    item.match(/<media:content\b[^>]*\burl=["']([^"']+)["']/i)?.[1];
  const title = elementValue(item, "title");

  if (!audioUrl || !title || !/^https?:\/\//i.test(audioUrl)) return null;

  return {
    title,
    audioUrl: decodeXml(audioUrl),
    publishedAt: elementValue(item, "pubDate"),
    link: elementValue(item, "link"),
  };
}

async function getLatestEpisode(feedUrl: string) {
  const response = await fetch(feedUrl, {
    headers: { "User-Agent": "CREME Food Culture Research/1.0" },
    signal: AbortSignal.timeout(7000),
  });
  if (!response.ok) throw new Error(`Feed returned ${response.status}`);
  return parseLatestEpisode(await response.text());
}

export async function GET() {
  const entries = await Promise.allSettled(
    Object.entries(podcastFeeds).map(async ([title, feedUrl]) => [title, await getLatestEpisode(feedUrl)] as const),
  );

  const episodes = Object.fromEntries(
    entries.flatMap((entry) =>
      entry.status === "fulfilled" && entry.value[1] ? [entry.value] : [],
    ),
  );

  return Response.json(
    { episodes },
    {
      headers: {
        "Cache-Control": "public, max-age=300, s-maxage=1800, stale-while-revalidate=86400",
      },
    },
  );
}
