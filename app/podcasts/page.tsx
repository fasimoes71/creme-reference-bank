"use client";

import { useEffect, useMemo, useState } from "react";

type PersonCredit = {
  name: string;
  role: string;
  instagram?: string;
};

type LatestEpisode = {
  title: string;
  audioUrl: string;
  publishedAt?: string;
  link?: string;
};

type Podcast = {
  title: string;
  host: string;
  place: string;
  focus: string;
  category: "Culture" | "Restaurants" | "Systems" | "Regional voices";
  format: string;
  note: string;
  listenFor: string;
  url: string;
  accent: string;
  status?: string;
};

const podcastPeople: Record<string, PersonCredit[]> = {
  Gastropod: [
    { name: "Cynthia Graber + Nicola Twilley", role: "Co-founders + co-hosts" },
    { name: "Claudia Geib", role: "Producer" },
    { name: "Gastropod", role: "Show Instagram", instagram: "https://www.instagram.com/gastropodcast/" },
  ],
  "Copper & Heat Radio": [
    { name: "Katy Osuna", role: "Founder + host" },
    { name: "Copper & Heat", role: "Show Instagram", instagram: "https://www.instagram.com/copperandheat/" },
  ],
  "The Splendid Table": [
    { name: "Francis Lam", role: "Host" },
    { name: "The Splendid Table", role: "Show Instagram", instagram: "https://www.instagram.com/splendidtable/" },
  ],
  "This Is TASTE": [
    { name: "Matt Rodbard", role: "Co-founder + host", instagram: "https://www.instagram.com/mattrodbard/" },
    { name: "TASTE", role: "Editorial Instagram", instagram: "https://www.instagram.com/taste/" },
  ],
  "Radio Cherry Bombe": [
    { name: "Kerry Diamond", role: "Founder + host", instagram: "https://www.instagram.com/kerrybombe/" },
    { name: "Cherry Bombe", role: "Show Instagram", instagram: "https://www.instagram.com/cherrybombe/" },
  ],
  "The Dave Chang Show": [
    { name: "David Chang", role: "Creator + host", instagram: "https://www.instagram.com/davidchang/" },
  ],
  "Ruthie’s Table 4": [
    { name: "Ruthie Rogers", role: "Creator + host" },
    { name: "Ruthie’s Table 4", role: "Show Instagram", instagram: "https://www.instagram.com/ruthiestable4/" },
  ],
  "The Menu": [
    { name: "Monocle Radio team", role: "Hosts + international correspondents", instagram: "https://www.instagram.com/monoclemagazine/" },
  ],
  "Japan Eats!": [
    { name: "Akiko Katayama", role: "Creator + host" },
    { name: "Heritage Radio Network", role: "Publisher", instagram: "https://www.instagram.com/heritage_radio/" },
  ],
  "Prato Cheio": [
    { name: "O Joio e O Trigo", role: "Investigative newsroom", instagram: "https://www.instagram.com/ojoioeotrigo/" },
  ],
  Proof: [
    { name: "America’s Test Kitchen", role: "Editorial + production team", instagram: "https://www.instagram.com/testkitchen/" },
  ],
  "Good Food": [
    { name: "Evan Kleiman", role: "Host", instagram: "https://www.instagram.com/evankleiman/" },
    { name: "KCRW Good Food", role: "Show Instagram", instagram: "https://www.instagram.com/kcrwgoodfood/" },
  ],
  "The Food Programme": [
    { name: "Sheila Dillon", role: "Presenter" },
    { name: "Dan Saladino", role: "Presenter + producer" },
    { name: "Jaega Wise", role: "Presenter" },
    { name: "BBC Audio Bristol", role: "Editorial + production team" },
  ],
  "The Sporkful": [
    { name: "Dan Pashman", role: "Creator + host", instagram: "https://www.instagram.com/danpashman/" },
    { name: "The Sporkful", role: "Show Instagram", instagram: "https://www.instagram.com/thesporkful/" },
  ],
  "Snacky Tunes": [
    { name: "Darin + Greg Bresnitz", role: "Creators + hosts" },
    { name: "Snacky Tunes", role: "Show Instagram", instagram: "https://www.instagram.com/snackytunes/" },
  ],
  "A Taste of the Past": [
    { name: "Linda Pelaccio", role: "Creator + host" },
    { name: "Heritage Radio Network", role: "Publisher", instagram: "https://www.instagram.com/heritage_radio/" },
  ],
  "Opening Soon": [
    { name: "Heritage Radio Network", role: "Hosts + production", instagram: "https://www.instagram.com/heritage_radio/" },
  ],
};

const podcasts: Podcast[] = [
  {
    title: "Gastropod",
    host: "Cynthia Graber + Nicola Twilley",
    place: "United States · Global",
    focus: "Science + history",
    category: "Systems",
    format: "Narrative reporting",
    note: "Food is used as a route into science, technology, agriculture and history. Episodes are deeply researched but remain playful, sensory and accessible.",
    listenFor: "How one ingredient can carry a complete investigative story without becoming academic or dry.",
    url: "https://gastropod.com/",
    accent: "#d95f3b",
  },
  {
    title: "Copper & Heat Radio",
    host: "Katy Osuna",
    place: "United States",
    focus: "Restaurant labor + value",
    category: "Restaurants",
    format: "Sound-rich documentary",
    note: "A two-time James Beard Award-winning show about the forces that shape a meal: labor, gender, pricing, craft and the economics of hospitality.",
    listenFor: "First-person kitchen voices, strong season concepts and careful sound design rooted in service work.",
    url: "https://www.copperandheat.com/radio",
    accent: "#b95834",
  },
  {
    title: "The Splendid Table",
    host: "Francis Lam",
    place: "United States · Global",
    focus: "Food culture + everyday life",
    category: "Culture",
    format: "Weekly conversations",
    note: "A long-running multicultural portrait of the food world, moving easily between chefs, home cooks, techniques, migration and the small personal stories found around a table.",
    listenFor: "Warm hosting, broad cultural range and a structure that balances usefulness with emotional storytelling.",
    url: "https://www.splendidtable.org/listen-and-follow",
    accent: "#d0a13c",
  },
  {
    title: "This Is TASTE",
    host: "Matt Rodbard",
    place: "New York · United States",
    focus: "Media + creative practice",
    category: "Culture",
    format: "Long-form interview",
    note: "Conversations with chefs, editors, writers, artists and cultural figures place food inside publishing, entertainment and contemporary creative life.",
    listenFor: "Guest curation and the way an editorial platform extends naturally into books, events and audio.",
    url: "https://www.mattrodbard.com/podcasts",
    accent: "#d84c38",
  },
  {
    title: "Radio Cherry Bombe",
    host: "Kerry Diamond",
    place: "New York · United States",
    focus: "Women + hospitality",
    category: "Culture",
    format: "Interview + community",
    note: "Interviews with chefs, bakers, founders and creatives, built as the audio arm of Cherry Bombe’s magazine, events and professional community.",
    listenFor: "A clear editorial mission translated consistently across print, membership, live gatherings and podcasting.",
    url: "https://cherrybombe.com/",
    accent: "#ef476f",
  },
  {
    title: "The Dave Chang Show",
    host: "David Chang + guests",
    place: "Los Angeles · Global",
    focus: "Restaurants + popular culture",
    category: "Restaurants",
    format: "Conversational analysis",
    note: "Restaurant practice meets sports, media, identity and creative work. The strongest episodes unpack openings, service decisions, criticism and the realities behind a hospitality brand.",
    listenFor: "Candor, operational detail and the tension between chef identity, media personality and restaurant business.",
    url: "https://podcasts.apple.com/us/podcast/the-dave-chang-show/id1375877915",
    accent: "#d85b28",
  },
  {
    title: "Ruthie’s Table 4",
    host: "Ruthie Rogers",
    place: "London · United Kingdom",
    focus: "Food memory + creative lives",
    category: "Restaurants",
    format: "Intimate table conversation",
    note: "Recorded from the social world of The River Cafe, each conversation uses food memory to open into childhood, family, art, politics and personal ritual.",
    listenFor: "How a restaurant table becomes a recognizable editorial setting and a long-term cultural asset.",
    url: "https://www.ruthiestable4.com/",
    accent: "#d8a820",
  },
  {
    title: "The Menu",
    host: "Monocle Radio",
    place: "London · Global",
    focus: "Places + trends + producers",
    category: "Culture",
    format: "Magazine-style radio",
    note: "A weekly international scan of chefs, producers, ingredients, restaurant openings and neighborhood food cultures, edited with Monocle’s concise global rhythm.",
    listenFor: "Short segments, geographic range and the translation of a magazine’s voice into recurring audio formats.",
    url: "https://monocle.com/radio/shows/the-menu/",
    accent: "#b89a4c",
  },
  {
    title: "Japan Eats!",
    host: "Akiko Katayama",
    place: "Japan + New York",
    focus: "Japanese food culture",
    category: "Regional voices",
    format: "Expert interview",
    note: "Japanese cuisine is approached beyond sushi and ramen through artisans, sake makers, regional traditions and chefs working between Japan and the United States.",
    listenFor: "Specific vocabulary, patient expertise and the ability to explain tradition without flattening regional difference.",
    url: "https://podcasts.apple.com/sg/podcast/japan-eats/id994563121",
    accent: "#c9362b",
  },
  {
    title: "Prato Cheio",
    host: "O Joio e O Trigo",
    place: "Brazil",
    focus: "Food politics + public health",
    category: "Regional voices",
    format: "Investigative documentary",
    note: "Brazilian food journalism connects what is on the plate to agribusiness, public health, inequality, regulation, labor and the political construction of taste.",
    listenFor: "Rigorous reporting, serialized seasons and a systemic lens grounded in Brazilian realities.",
    url: "https://podcasts.apple.com/br/podcast/prato-cheio/id1496707488",
    accent: "#9d4938",
  },
  {
    title: "Proof",
    host: "America’s Test Kitchen",
    place: "United States · Global",
    focus: "Hidden food histories",
    category: "Systems",
    format: "Narrative archive",
    note: "Unexpected stories connect food with science, history, psychology and culture. The completed feed remains a rich archive of tightly produced narrative episodes.",
    listenFor: "Curiosity-led premises, narrative turns and research translated into vivid scenes.",
    url: "https://podcasts.apple.com/us/podcast/proof/id1438546054",
    accent: "#5c7181",
    status: "Archive",
  },
  {
    title: "Good Food",
    host: "KCRW",
    place: "Los Angeles · United States",
    focus: "Markets + restaurants + policy",
    category: "Culture",
    format: "Weekly radio magazine",
    note: "Los Angeles food culture is observed through farmers’ markets, restaurant criticism, cookbooks, agriculture and policy, with the city acting as a global crossroads.",
    listenFor: "Local specificity, recurring field reporting and a strong relationship between place and editorial authority.",
    url: "https://www.kcrw.com/culture/shows/good-food",
    accent: "#456b5e",
  },
  {
    title: "The Food Programme",
    host: "Sheila Dillon + Dan Saladino + Jaega Wise",
    place: "United Kingdom · Global",
    focus: "Food systems + culture + policy",
    category: "Systems",
    format: "Weekly radio documentary",
    note: "BBC Radio 4’s long-running food journalism programme investigates ingredients, agriculture, labor, science, history and the politics behind what we eat. Field reporting and expert voices turn complex systems into vivid, accessible audio stories.",
    listenFor: "The linked episode, ‘The Dark Arts of Affinage’, shows how one craft process can open into taste, technique, experimentation and the people shaping a product over time.",
    url: "https://www.bbc.co.uk/programmes/m002zs0z",
    accent: "#9b4938",
  },
  {
    title: "The Sporkful",
    host: "Dan Pashman",
    place: "United States",
    focus: "Identity + everyday eating",
    category: "Culture",
    format: "Reported comedy",
    note: "Everyday eating habits become stories about identity, design, language and cultural difference. Humor provides the entry point, but the reporting often goes much deeper.",
    listenFor: "Memorable formats, audience participation and the use of obsessive detail to reveal broader cultural questions.",
    url: "https://www.sporkful.com/",
    accent: "#c97931",
  },
  {
    title: "Snacky Tunes",
    host: "Heritage Radio Network",
    place: "New York · Global",
    focus: "Food + independent music",
    category: "Culture",
    format: "Interview + live session",
    note: "Chefs and food makers share space with independent musicians, treating restaurants and music scenes as overlapping forms of cultural production.",
    listenFor: "Cross-disciplinary booking and an episode architecture that gives sound a role beyond background music.",
    url: "https://heritageradionetwork.org/series/snacky-tunes",
    accent: "#76538b",
  },
  {
    title: "A Taste of the Past",
    host: "Linda Pelaccio",
    place: "New York · Global",
    focus: "Culinary history",
    category: "Systems",
    format: "Historian interview",
    note: "Writers, historians and researchers trace the movement of ingredients, techniques and dining customs across time and geography.",
    listenFor: "Primary-source thinking and the way historical context can deepen contemporary food storytelling.",
    url: "https://heritageradionetwork.org/series/a-taste-of-the-past",
    accent: "#7d684f",
  },
  {
    title: "Opening Soon",
    host: "Heritage Radio Network",
    place: "United States",
    focus: "Opening + operating restaurants",
    category: "Restaurants",
    format: "Founder conversation",
    note: "A practical view of how restaurants move from concept to opening night, covering financing, teams, real estate, service models and the emotional cost of hospitality.",
    listenFor: "Useful operational language and honest accounts of the decisions hidden behind a finished restaurant identity.",
    url: "https://heritageradionetwork.org/series/opening-soon",
    accent: "#315f58",
  },
];

const categories = ["All", "Culture", "Restaurants", "Systems", "Regional voices"] as const;

function EpisodePlayer({
  episode,
  loading,
  podcast,
}: {
  episode?: LatestEpisode;
  loading: boolean;
  podcast: Podcast;
}) {
  const publishedDate = episode?.publishedAt ? new Date(episode.publishedAt) : undefined;
  const hasValidDate = publishedDate && !Number.isNaN(publishedDate.getTime());

  if (loading) {
    return (
      <div className="episode-player loading" aria-live="polite">
        <span>Latest episode</span>
        <p>Loading the official feed…</p>
      </div>
    );
  }

  if (!episode) {
    return (
      <div className="episode-player unavailable">
        <span>Latest episode</span>
        <p>Audio is available on the show’s official page.</p>
        <a href={podcast.url} target="_blank" rel="noreferrer">
          Open official player ↗
        </a>
      </div>
    );
  }

  return (
    <div className="episode-player">
      <span>Latest episode</span>
      <p>{episode.title}</p>
      {hasValidDate && (
        <time dateTime={publishedDate.toISOString()}>
          {new Intl.DateTimeFormat("en", { day: "2-digit", month: "short", year: "numeric" }).format(
            publishedDate,
          )}
        </time>
      )}
      <audio controls preload="none" src={episode.audioUrl}>
        Your browser does not support embedded audio.
      </audio>
    </div>
  );
}

export default function PodcastsPage() {
  const [category, setCategory] = useState<(typeof categories)[number]>("All");
  const [query, setQuery] = useState("");
  const [latestEpisodes, setLatestEpisodes] = useState<Record<string, LatestEpisode>>({});
  const [episodesLoading, setEpisodesLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    let active = true;

    fetch("/api/podcasts/latest", { signal: controller.signal })
      .then((response) => (response.ok ? response.json() : Promise.reject(new Error("Feed unavailable"))))
      .then((data: { episodes?: Record<string, LatestEpisode> }) => {
        if (active) setLatestEpisodes(data.episodes ?? {});
      })
      .catch((error: unknown) => {
        if (active && !(error instanceof DOMException && error.name === "AbortError")) {
          setLatestEpisodes({});
        }
      })
      .finally(() => {
        if (active) setEpisodesLoading(false);
      });

    return () => {
      active = false;
      controller.abort();
    };
  }, []);

  const visiblePodcasts = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return podcasts.filter((podcast) => {
      const matchesCategory = category === "All" || podcast.category === category;
      const haystack = [
        podcast.title,
        podcast.host,
        podcast.place,
        podcast.focus,
        podcast.note,
        podcast.listenFor,
      ].join(" ").toLowerCase();
      return matchesCategory && (!needle || haystack.includes(needle));
    });
  }, [category, query]);

  const selectHeroCategory = (nextCategory: Podcast["category"]) => {
    setCategory(nextCategory);
    window.requestAnimationFrame(() => {
      document.getElementById("podcast-index")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const showPodcastSections = () => {
    document.getElementById("podcast-sections")?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <main className="podcast-page">
      <header className="topbar">
        <a className="brand" href="/" aria-label="CREME — home">
          <img src="/brand/logo-black.png" alt="CREME" />
        </a>
        <nav className="top-tabs" aria-label="Research libraries">
          <a href="/">Visual library</a>
          <a className="active" href="/podcasts">Podcasts</a>
        </nav>
        <button
          className="top-menu-trigger"
          type="button"
          onClick={showPodcastSections}
          aria-label="Show podcast sections"
        >
          <span>Menu</span>
          <span className="hamburger" aria-hidden="true"><i /><i /><i /></span>
        </button>
      </header>

      <section className="podcast-hero" id="top">
        <div className="hero-kicker">
          <span>CREME Listening Research</span>
          <span>{podcasts.length} selected shows</span>
        </div>
        <h1>FOOD<br />FOR <em>LISTENING.</em></h1>
        <div className="podcast-hero-grid" id="podcast-sections" aria-label="Select a podcast section">
          <button
            type="button"
            className={category === "Restaurants" ? "active" : ""}
            aria-pressed={category === "Restaurants"}
            onClick={() => selectHeroCategory("Restaurants")}
          >
            <img src="/hero/creme-listening-restaurants.jpg" alt="" />
            <span>RESTAURANTS</span>
          </button>
          <button
            type="button"
            className={category === "Culture" ? "active" : ""}
            aria-pressed={category === "Culture"}
            onClick={() => selectHeroCategory("Culture")}
          >
            <img src="/hero/creme-listening-culture.jpg" alt="" />
            <span>CULTURE</span>
          </button>
          <button
            type="button"
            className={category === "Systems" ? "active" : ""}
            aria-pressed={category === "Systems"}
            onClick={() => selectHeroCategory("Systems")}
          >
            <img src="/hero/creme-listening-systems.jpg" alt="" />
            <span>SYSTEMS</span>
          </button>
          <button
            type="button"
            className={category === "Regional voices" ? "active" : ""}
            aria-pressed={category === "Regional voices"}
            onClick={() => selectHeroCategory("Regional voices")}
          >
            <img src="/hero/creme-listening-voices.jpg" alt="" />
            <span>VOICES</span>
          </button>
        </div>
        <p className="podcast-intro">
          A listening library about food as culture, restaurant life, labor,
          memory, politics and creative practice — curated for CREME.
        </p>
      </section>

      <section className="podcast-library" id="podcast-index">
        <div className="section-heading">
          <div>
            <span className="eyebrow">02 — Listening library</span>
            <h2>Podcasts worth following</h2>
          </div>
          <p>
            Filter by editorial angle. Each note explains what the show covers
            and what CREME can learn from its format, voice and community.
          </p>
        </div>

        <div className="podcast-controls">
          <div className="podcast-filter-status" aria-live="polite">
            <span>
              {category === "All" ? "All sections" : category === "Regional voices" ? "Voices" : category}
              {` · ${visiblePodcasts.length} shows`}
            </span>
            {category !== "All" && (
              <button type="button" onClick={() => setCategory("All")}>Show all</button>
            )}
          </div>
          <label className="podcast-search">
            <span>Search</span>
            <input
              type="search"
              placeholder="show, host, place, subject…"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>
        </div>

        <div className="podcast-grid">
          {visiblePodcasts.map((podcast, index) => (
            <article
              className="podcast-card"
              key={podcast.title}
              style={{ "--podcast-accent": podcast.accent } as React.CSSProperties}
            >
              <div className="podcast-tilt">
                <div className="podcast-poster" aria-hidden="true">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{podcast.title}</strong>
                  <small>{podcast.category}</small>
                </div>
              </div>
              <div className="podcast-body">
                <div className="card-meta">
                  <span>{podcast.place}</span>
                  <span>{podcast.status ?? podcast.format}</span>
                </div>
                <h3>{podcast.title}</h3>
                <p className="podcast-host">{podcast.host} · {podcast.focus}</p>
                <p>{podcast.note}</p>
                <p className="listen-for"><strong>Listen for</strong>{podcast.listenFor}</p>
                <EpisodePlayer
                  episode={latestEpisodes[podcast.title]}
                  loading={episodesLoading}
                  podcast={podcast}
                />
                <div className="people-block">
                  <span className="people-label">People behind it</span>
                  <div className="people-list">
                    {podcastPeople[podcast.title]?.map((person) =>
                      person.instagram ? (
                        <a
                          href={person.instagram}
                          key={`${person.name}-${person.role}`}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`${person.name} on Instagram`}
                        >
                          <strong>{person.name}</strong>
                          <small>{person.role} · Instagram ↗</small>
                        </a>
                      ) : (
                        <span key={`${person.name}-${person.role}`}>
                          <strong>{person.name}</strong>
                          <small>{person.role}</small>
                        </span>
                      ),
                    )}
                  </div>
                </div>
                <a href={podcast.url} target="_blank" rel="noreferrer">
                  Listen / explore <span aria-hidden="true">↗</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <footer>
        <div>
          <a className="brand footer-brand" href="/" aria-label="CREME — home">
            <img src="/brand/logo-black.png" alt="CREME" />
          </a>
          <p>Food culture research · audio index</p>
        </div>
        <p>
          An editorial research library. All show names and rights belong to
          their respective creators and publishers.
        </p>
        <div className="footer-links">
          <a href="/">Visual library ↗</a>
          <a href="#top">Back to top ↑</a>
        </div>
      </footer>
    </main>
  );
}
