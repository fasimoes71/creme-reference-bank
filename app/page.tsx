"use client";

import { useEffect, useMemo, useState } from "react";

type PersonCredit = {
  name: string;
  role: string;
  instagram?: string;
};

type Reference = {
  id: string;
  title: string;
  place: string;
  type: string;
  collections: string[];
  url: string;
  image?: string;
  note: string;
  tags: string[];
  accent: string;
  status?: string;
};

const referencePeople: Record<string, PersonCredit[]> = {
  "magazine-f": [
    { name: "Suyong Joh", role: "B publisher" },
    { name: "B Media Company + Baemin", role: "Co-creators" },
    { name: "Magazine F", role: "Editorial Instagram", instagram: "https://www.instagram.com/magazine.f/" },
  ],
  rice: [
    { name: "RiCE editorial team", role: "Editors + contributors", instagram: "https://www.instagram.com/rice.press/" },
  ],
  "slow-press": [
    { name: "Christy Chua", role: "Founder + editorial director" },
    { name: "Tan Aik", role: "Editor-in-chief" },
    { name: "Melody Koh", role: "Art director" },
  ],
  plates: [
    { name: "Dee May Tan", role: "Founder + editor + photographer" },
    { name: "PLATES contributors", role: "Writers + researchers across Southeast Asia" },
  ],
  gourmand: [
    { name: "David Lane", role: "Co-founder · editor-in-chief · creative director" },
    { name: "Marina Tweed", role: "Co-founder · editor-in-chief · publisher" },
    { name: "The Gourmand", role: "Editorial Instagram", instagram: "https://www.instagram.com/thegourmand/" },
  ],
  idler: [
    { name: "Tom Hodgkinson", role: "Founder + editor" },
    { name: "Gavin Pretor-Pinney", role: "Co-founder + original art director" },
    { name: "Victoria Hull", role: "Programming director" },
    { name: "Alice Smith", role: "Art director" },
  ],
  vessel: [
    { name: "Tonje Kjellevold", role: "Managing editor" },
    { name: "Hege Henriksen", role: "Editor-in-chief · Norwegian Crafts director" },
    { name: "Martin Yang / Bielke&Yang", role: "Art direction" },
    { name: "The Vessel", role: "Editorial Instagram", instagram: "https://www.instagram.com/thevesselmag/" },
  ],
  materia: [
    { name: "Sarah Len", role: "Founder + creative director + editor" },
    { name: "Materia contributors", role: "Architects + artists + designers across the Americas" },
  ],
  farta: [
    { name: "Another Collective + Rafael Tonon", role: "Authors + editorial direction" },
    { name: "Estúdio Cozinha", role: "Photography + writing contributor" },
    { name: "Farta contributors", role: "Artists + cooks + writers across Portugal" },
  ],
  "cake-zine": [
    { name: "Tanya Bush + Aliza Abarbanel", role: "Co-founders + editors" },
    { name: "Noah Emrich", role: "Designer + art director" },
    { name: "Cake Zine", role: "Editorial Instagram", instagram: "https://www.instagram.com/cake_zine/" },
  ],
  "family-style": [
    { name: "Joshua Glass", role: "Founder + editor-in-chief" },
    { name: "Nathan Klein", role: "Fashion director" },
    { name: "Meka Boyle + Sahir Ahmed", role: "Articles editor + senior editor" },
  ],
  "off-menu": [
    { name: "Sophie Chen", role: "Founder + editor-in-chief" },
    { name: "Sara Hoffman + Crystal Luo", role: "Digital editors" },
    { name: "Júlia Blanco Boada", role: "Graphic designer" },
  ],
  fare: [
    { name: "Ben Mervis", role: "Founder + director" },
    { name: "Kenzie Yoshimura", role: "Editor-in-chief" },
    { name: "Ric Bell", role: "Art director" },
    { name: "Fare", role: "Editorial Instagram", instagram: "https://www.instagram.com/faremag/" },
  ],
  drift: [
    { name: "Adam Goldberg", role: "Editor-in-chief", instagram: "https://www.instagram.com/alifewortheating/" },
    { name: "Daniela Velasco", role: "Creative director" },
    { name: "Elyssa Goldberg + Bonjwing Lee", role: "Editorial director + executive editor" },
  ],
  goya: [
    { name: "Anisha Rachel Oommen", role: "Founder + director" },
    { name: "Joanna Lobo", role: "Editor-at-large" },
    { name: "Sridevi Pai", role: "Design director" },
  ],
  cleaver: [
    { name: "Lilly Chow + Jonathan White + Iain Shaw", role: "Co-founders + editors" },
    { name: "Ru Brown", role: "Art director" },
    { name: "The Cleaver contributors", role: "Writers + illustrators across China and the diaspora" },
  ],
  vittles: [
    { name: "Jonathan Nunn", role: "Founder + editor" },
    { name: "Vittles", role: "Editorial Instagram", instagram: "https://www.instagram.com/vittlesmagazine/" },
  ],
  whetstone: [
    { name: "Stephen Satterfield", role: "Founder" },
    { name: "Whetstone", role: "Editorial Instagram", instagram: "https://www.instagram.com/whetstonemagazine/" },
  ],
  eaten: [
    { name: "Emelyn Rude", role: "Founder + editor" },
    { name: "EATEN", role: "Editorial Instagram", instagram: "https://www.instagram.com/eatenmag/" },
  ],
  linseed: [
    { name: "Louise Long", role: "Founder + creative and editorial lead" },
    { name: "Emma Hardy + Letitia Clark", role: "Key photographic + writing contributors" },
    { name: "Linseed Journal", role: "Editorial Instagram", instagram: "https://www.instagram.com/linseed_journal/" },
  ],
  sandwich: [
    { name: "TCO London", role: "Publisher + creative studio" },
    { name: "Sandwich editorial team", role: "Editors + photographers + guest contributors" },
  ],
  pit: [
    { name: "Helen Graves", role: "Editor", instagram: "https://www.instagram.com/foodstories/" },
    { name: "Holly Catford", role: "Art director", instagram: "https://www.instagram.com/hollycatford/" },
    { name: "Robert Billington", role: "Lead photographer" },
  ],
  "noble-rot": [
    { name: "Dan Keeling + Mark Andrew", role: "Founders" },
    { name: "Noble Rot", role: "Editorial Instagram", instagram: "https://www.instagram.com/noblerotmag/" },
  ],
  toothache: [
    { name: "Nick Muncy", role: "Founder + editor" },
    { name: "Toothache", role: "Editorial Instagram", instagram: "https://www.instagram.com/toothache_mag/" },
  ],
  pellicle: [
    { name: "Matthew Curtis + Jonny Hamilton", role: "Co-founders" },
    { name: "Pellicle", role: "Editorial Instagram", instagram: "https://www.instagram.com/pelliclemag/" },
  ],
  brutus: [
    { name: "Ro Tajima", role: "Editor-in-chief" },
    { name: "Magazine House", role: "Publisher" },
    { name: "BRUTUS editorial team", role: "Editors + specialist contributors" },
  ],
  hanako: [
    { name: "Nana Sanada", role: "Editor-in-chief" },
    { name: "Magazine House", role: "Publisher" },
    { name: "Hanako editorial team", role: "Food + travel editors and contributors" },
  ],
  "cuisine-magazine": [
    { name: "The Cuisine Magazine team", role: "Editors connecting producers + chefs + eaters" },
    { name: "Kinya Horikoshi", role: "Representative director · Cuisine Press" },
  ],
  "magazine-b": [
    { name: "Suyong Joh", role: "Founder + publisher" },
    { name: "Taehyuk Choi", role: "Magazine B editor" },
    { name: "B Media Company", role: "Editorial + research team" },
  ],
  fatboy: [
    { name: "Chris O’Leary", role: "Founder + creative director" },
    { name: "FatBoy Zine", role: "Editorial Instagram", instagram: "https://www.instagram.com/fatboyzine/" },
  ],
  spillll: [
    { name: "Nandal Seo + Panita Siriwongwan-ngarm", role: "Co-founders + writers + designers" },
    { name: "Mika Tohmon + Hyeda Park", role: "Co-founders + writers + illustrators" },
  ],
  manja: [
    { name: "Sónia Alcaso", role: "Director" },
    { name: "Andreia Gomes", role: "Project manager" },
    { name: "RPVP Designers", role: "Graphic design" },
    { name: "Edições do Gosto", role: "Publisher" },
  ],
  "elle-table": [
    { name: "Susana Barbosa", role: "Editorial director + publisher" },
    { name: "Luciano Schmitz", role: "Creative director at large" },
    { name: "Patricia Oyama + Renata Piza", role: "Editors-in-chief" },
    { name: "ELLE Brasil", role: "Editorial Instagram", instagram: "https://www.instagram.com/ellebrasil/" },
  ],
  feira: [
    { name: "Constance Escobar", role: "Editor + food writer" },
    { name: "Erika Martins", role: "Graphic designer" },
    { name: "Samuel Antonini + Thiago Nasser", role: "Photography + food systems research" },
    { name: "Revista Feira", role: "Editorial Instagram", instagram: "https://www.instagram.com/revistafeira/" },
  ],
  mold: [
    { name: "LinYee Yuan", role: "Founder + editor" },
    { name: "MOLD", role: "Editorial Instagram", instagram: "https://www.instagram.com/thisismold/" },
  ],
  "lucky-peach": [
    { name: "David Chang + Peter Meehan + Chris Ying", role: "Founding team" },
  ],
  food52: [
    { name: "Amanda Hesser + Merrill Stubbs", role: "Co-founders" },
    { name: "Food52", role: "Editorial Instagram", instagram: "https://www.instagram.com/food52/" },
  ],
  eater: [
    { name: "Eater editorial network", role: "Editors + critics + city contributors", instagram: "https://www.instagram.com/eater/" },
  ],
  "gastro-obscura": [
    { name: "Gastro Obscura team", role: "Editors + global contributors", instagram: "https://www.instagram.com/gastroobscura/" },
  ],
};

type FilterGroupKey = "type" | "region" | "focus";

const filterGroups: Array<{
  key: FilterGroupKey;
  label: string;
  options: string[];
}> = [
  {
    key: "type",
    label: "Type",
    options: [
      "All",
      "Magazines + publications",
      "Sites + platforms",
      "Restaurants + spaces",
      "Studios + identity",
      "Photography + image",
    ],
  },
  {
    key: "region",
    label: "Region",
    options: ["All", "Asia", "Brazil", "Portugal", "Europe", "Americas", "Global"],
  },
  {
    key: "focus",
    label: "Observe",
    options: [
      "All",
      "Photography",
      "Typography",
      "Editorial design",
      "Identity",
      "Digital",
      "Spaces",
      "Archive + memory",
    ],
  },
];

function normalizeText(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("en-US");
}

function includesAny(value: string, terms: string[]) {
  return terms.some((term) => value.includes(normalizeText(term)));
}

function hasCollection(reference: Reference, ...names: string[]) {
  return names.some((name) => reference.collections.includes(name));
}

function getReferenceDimensions(reference: Reference) {
  const value = normalizeText(
    [
      reference.title,
      reference.place,
      reference.type,
      reference.note,
      ...reference.collections,
      ...reference.tags,
    ].join(" "),
  );
  const type: string[] = [];
  const region: string[] = [];
  const focus: string[] = [];

  if (
    hasCollection(reference, "Editorial") ||
    includesAny(value, ["magazine", "revista", "journal", "zine", "publication", "quarterly"])
  ) type.push("Magazines + publications");
  if (
    hasCollection(reference, "Digital") ||
    includesAny(value, ["platform", "plataforma", "website", "digital guide", "online magazine"])
  ) type.push("Sites + platforms");
  if (
    hasCollection(reference, "Spaces", "Espaços") ||
    includesAny(value, ["restaurant", "restaurante", "hospitality", "cafe", "bar", "hotel", "interior"])
  ) type.push("Restaurants + spaces");
  if (
    hasCollection(reference, "Identity", "Identidade") ||
    includesAny(value, ["branding", "identity", "identidade", "creative studio", "design studio"])
  ) type.push("Studios + identity");
  if (includesAny(value, ["fotografia", "photography", "fotoensaio", "still life", "analógico", "retrato"])) {
    type.push("Photography + image");
  }

  if (hasCollection(reference, "Asia", "Ásia")) region.push("Asia");
  if (includesAny(value, ["brazil", "são paulo", "rio de janeiro", "belo horizonte"])) region.push("Brazil");
  if (includesAny(value, ["portugal", "porto", "lisboa"])) region.push("Portugal");
  if (
    includesAny(value, [
      "london", "united kingdom", "oslo", "norway", "paris", "france", "berlin",
      "germany", "copenhagen", "denmark", "amsterdam", "italy", "spain", "europe",
    ])
  ) region.push("Europe");
  if (
    includesAny(value, [
      "new york", "los angeles", "washington", "united states", "mexico",
      "canada", "argentina", "chile", "america",
    ])
  ) region.push("Americas");
  if (includesAny(value, ["global", "internacional"])) region.push("Global");

  if (includesAny(value, ["fotografia", "photography", "fotoensaio", "still life", "analógico", "retrato", "documental"])) {
    focus.push("Photography");
  }
  if (includesAny(value, ["tipografia", "typography", "lettering", "display", "covers"])) focus.push("Typography");
  if (hasCollection(reference, "Editorial")) focus.push("Editorial design");
  if (hasCollection(reference, "Identity", "Identidade")) focus.push("Identity");
  if (hasCollection(reference, "Digital")) focus.push("Digital");
  if (hasCollection(reference, "Spaces", "Espaços")) focus.push("Spaces");
  if (
    hasCollection(reference, "Archive", "Arquivo") ||
    includesAny(value, ["arquivo", "archive", "história", "history", "memória", "memory", "vernacular"])
  ) focus.push("Archive + memory");

  return { type, region, focus };
}

const referenceSectionDefinitions = [
  {
    key: "editorial",
    filter: "Magazines + publications",
    title: "Magazines & publications",
    copy: "Independent magazines, journals and zines where food becomes culture, memory and image.",
  },
  {
    key: "digital",
    filter: "Sites + platforms",
    title: "Digital content & platforms",
    copy: "Editorial ecosystems built for discovery, utility, community and continuous publishing.",
  },
  {
    key: "identity",
    filter: "Studios + identity",
    title: "Studios & identities",
    copy: "Brand systems, campaigns and creative practices shaping how food speaks and appears.",
  },
  {
    key: "spaces",
    filter: "Restaurants + spaces",
    title: "Restaurants & spaces",
    copy: "Hospitality expressed through interiors, menus, materials, service and atmosphere.",
  },
  {
    key: "image",
    filter: "Photography + image",
    title: "Photography & image",
    copy: "Light, gesture, portraiture and still life as ingredients in CREME’s visual language.",
  },
] as const;

function getPrimaryReferenceSection(reference: Reference) {
  if (hasCollection(reference, "Editorial")) return "editorial";
  if (hasCollection(reference, "Digital")) return "digital";
  if (hasCollection(reference, "Identity", "Identidade")) return "identity";
  if (hasCollection(reference, "Spaces", "Espaços")) return "spaces";
  return "image";
}

const references: Reference[] = [
  {
    id: "magazine-f",
    title: "Magazine F",
    place: "Seoul · South Korea",
    type: "Monographic magazine",
    collections: ["Editorial", "Ásia"],
    url: "https://en.magazine-b.com/about/media-service.html",
    image: "/covers/magazine-f.jpg",
    note: "Each issue constructs a complete cultural portrait around one ingredient, combining origin stories, producers, brands and eating rituals. Study its disciplined collection system, macro photography and unusually calm information design.",
    tags: ["ingredient", "system", "minimalism"],
    accent: "#ef3d22",
    status: "Active",
  },
  {
    id: "rice",
    title: "RiCE",
    place: "Tokyo · Japan",
    type: "Food culture journal",
    collections: ["Editorial", "Ásia"],
    url: "https://www.rice.press/",
    image: "/covers/rice.jpg",
    note: "RiCE frames food as contemporary Japanese culture rather than lifestyle service, moving between restaurants, music, fashion, people and city life. Its direct covers and dense bilingual layouts make specificity feel energetic and accessible.",
    tags: ["pop culture", "covers", "Japan"],
    accent: "#f03c37",
    status: "Active",
  },
  {
    id: "slow-press",
    title: "The Slow Press",
    place: "Singapore",
    type: "Independent zine",
    collections: ["Editorial", "Ásia"],
    url: "https://theslowpresszine.com/",
    image: "/covers/slow-press.png",
    note: "The Slow Press records everyday Singaporean food culture through illustration, oral memory, humor and familiar vernacular details. Its intimate scale shows how a publication can preserve disappearing rituals without turning them into nostalgia.",
    tags: ["vernacular", "illustration", "memory"],
    accent: "#ffcf3a",
    status: "Active",
  },
  {
    id: "plates",
    title: "PLATES",
    place: "Southeast Asia",
    type: "Cultural journal",
    collections: ["Editorial", "Ásia"],
    url: "https://platesmagazine.com/",
    image: "/covers/plates.jpg",
    note: "PLATES practices slow food journalism across Southeast Asia, connecting ingredients and communities to labor, climate and social justice. Its documentary approach offers a model for representing under-covered places with context and editorial care.",
    tags: ["documentary", "politics", "territory"],
    accent: "#687b54",
    status: "Independent",
  },
  {
    id: "gourmand",
    title: "The Gourmand",
    place: "London · United Kingdom",
    type: "Food & culture journal",
    collections: ["Editorial"],
    url: "https://thegourmand.co.uk/",
    image: "/covers/gourmand.jpg",
    note: "The Gourmand treats food as a serious cultural and artistic subject, commissioning photographers, writers and artists rather than relying on conventional recipes or service journalism. Observe its still life, visual wit, paper choices and generous pacing.",
    tags: ["art", "photography", "art direction"],
    accent: "#3150bd",
    status: "Reference",
  },
  {
    id: "idler",
    title: "The Idler",
    place: "London · United Kingdom",
    type: "Independent culture magazine",
    collections: ["Editorial", "Europe"],
    url: "https://www.idler.co.uk/",
    image: "/covers/idler.jpg",
    note: "Founded in 1993 as ‘literature for loafers’, The Idler turns slowness, learning and everyday pleasure into a complete editorial world spanning print, courses and live events. Study its decorated typesetting, illustrated borders and the way a clear philosophy expands across formats without losing its eccentric human voice.",
    tags: ["slow culture", "typography", "editorial world"],
    accent: "#b9a853",
    status: "Active",
  },
  {
    id: "vessel",
    title: "The Vessel",
    place: "Oslo · Norway",
    type: "Digital material-culture magazine",
    collections: ["Editorial", "Digital", "Identidade"],
    url: "https://vessel-magazine.no/",
    image: "/covers/vessel.jpg",
    note: "The Vessel turns craft and material culture into an immersive digital publication. Full-screen moving images, modular typography and numbered issues create a reading experience that feels spatial, cinematic and deliberately slower than the web around it.",
    tags: ["material culture", "digital design", "archive"],
    accent: "#b8946d",
    status: "Active",
  },
  {
    id: "materia",
    title: "Materia",
    place: "Mexico City + California",
    type: "Independent publication + cultural studio",
    collections: ["Editorial", "Digital", "Identidade"],
    url: "https://materia.press/magazine/",
    image: "https://materia.press/wp-content/themes/materia/images/social.jpg",
    note: "Materia connects architecture, art, design and craft through authored photography, studio visits and long conversations. The annual printed archive gives its digital reporting a material afterlife and makes the editorial platform feel like a cultural institution.",
    tags: ["material culture", "architecture", "photography"],
    accent: "#795d49",
    status: "Active",
  },
  {
    id: "farta",
    title: "Farta",
    place: "Porto · Portugal",
    type: "Magazine + artistic platform",
    collections: ["Editorial", "Brasil + Portugal", "Identidade"],
    url: "https://www.farta.pt/",
    image: "/covers/farta.webp",
    note: "Farta devotes each issue to one popular Portuguese dish, using it to connect domestic memory, labor, regional identity and contemporary art. Its typography and photography respect vernacular culture without reducing it to decorative nostalgia.",
    tags: ["popular culture", "monographic", "bilingual"],
    accent: "#b84e2b",
    status: "Active",
  },
  {
    id: "cake-zine",
    title: "Cake Zine",
    place: "New York · United States",
    type: "Literary magazine",
    collections: ["Editorial"],
    url: "https://cakezine.com/",
    image: "/covers/cake-zine.jpg",
    note: "Cake Zine uses dessert as an entry point into desire, gender, art and popular culture. Every issue reinvents the cover and visual identity, showing how a publication can remain recognizable through attitude rather than a fixed template.",
    tags: ["typography", "humor", "pop culture"],
    accent: "#ef5ea8",
    status: "Active",
  },
  {
    id: "family-style",
    title: "Family Style",
    place: "New York · United States",
    type: "Food, fashion & culture",
    collections: ["Editorial"],
    url: "https://www.family.style/",
    image: "/covers/family-style.jpg",
    note: "Family Style treats the table as a contemporary cultural party where fashion, art, interiors, celebrity and food share equal weight. Its large-format photography and social casting position hospitality as a form of modern luxury.",
    tags: ["fashion", "people", "contemporary luxury"],
    accent: "#8a9ac4",
    status: "Active",
  },
  {
    id: "off-menu",
    title: "Off-Menu",
    place: "New York · United States",
    type: "Magazine + studio",
    collections: ["Editorial", "Identidade"],
    url: "https://www.offmenumag.com/",
    image: "/covers/off-menu.jpg",
    note: "Off-Menu documents the people and processes usually kept behind the scenes of restaurants. Analog photography, close portraiture and first-person stories make hospitality feel lived-in rather than polished for promotion.",
    tags: ["analog", "behind the scenes", "portraiture"],
    accent: "#d7462e",
    status: "Active",
  },
  {
    id: "fare",
    title: "Fare",
    place: "International",
    type: "Food + city journal",
    collections: ["Editorial"],
    url: "https://faremag.com/",
    image: "/covers/fare.jpg",
    note: "Fare dedicates each issue to one city and asks local writers, photographers and illustrators to interpret its food culture from within. The city becomes a layered editorial system rather than a list of destinations.",
    tags: ["city", "travel", "community"],
    accent: "#a61d27",
    status: "Active",
  },
  {
    id: "drift",
    title: "Drift",
    place: "New York · United States",
    type: "Coffee culture journal",
    collections: ["Editorial"],
    url: "https://www.driftmag.com/",
    image: "/covers/drift.png",
    note: "Drift maps one city per issue through its coffee shops, rituals and communities. Coffee provides a repeatable lens, while portraiture and urban photography reveal how informal hospitality shapes a sense of place.",
    tags: ["coffee", "city", "photography"],
    accent: "#c0a66b",
    status: "Active",
  },
  {
    id: "goya",
    title: "Goya Journal",
    place: "India",
    type: "Food & culture magazine",
    collections: ["Editorial", "Ásia", "Digital"],
    url: "https://www.goya.in/",
    image: "https://static1.squarespace.com/static/578753d7d482e9c3a909de40/t/66166b7e2f40cd644f4c1f84/1712745342168/_MG_0437.jpg?format=1500w",
    note: "Goya Journal foregrounds regional kitchens, family recipes and voices often excluded from simplified accounts of Indian food. Its essays and photo stories show the subcontinent as many overlapping cultures rather than a single cuisine.",
    tags: ["South Asia", "identity", "photo essay"],
    accent: "#f06f38",
    status: "Active",
  },
  {
    id: "cleaver",
    title: "The Cleaver Quarterly",
    place: "China + diaspora",
    type: "Chinese food magazine",
    collections: ["Editorial", "Ásia", "Arquivo"],
    url: "https://www.thecleaverquarterly.com/",
    image: "https://static1.squarespace.com/static/57b495a66a496332a197072e/t/583f12a8ff7c50eaf37fd11c/1480528553744/Cleaver+logo++RED+ON+YELLOW.png?format=1500w",
    note: "The Cleaver Quarterly combines long-form reporting, infographics and irreverence to present Chinese food as a global, diasporic phenomenon. Its editorial voice resists both exoticism and rigid ideas of authenticity.",
    tags: ["China", "diaspora", "infographics"],
    accent: "#e42420",
    status: "Print on hiatus",
  },
  {
    id: "vittles",
    title: "Vittles",
    place: "United Kingdom + India",
    type: "Food & culture magazine",
    collections: ["Editorial", "Digital", "Ásia"],
    url: "https://www.vittlesmagazine.com/",
    image: "https://substackcdn.com/image/fetch/$s_!jr-k!,f_auto,q_auto:best,fl_progressive:steep/https%3A%2F%2Fvittles.substack.com%2Ftwitter%2Fsubscribe-card.jpg%3Fv%3D1219834503%26version%3D9",
    note: "Vittles publishes food writing as social reporting, examining class, migration, labor, inheritance and political agency. Its newsletter-to-magazine model proves that rigorous long-form criticism can also build an active reader community.",
    tags: ["writing", "politics", "long-form"],
    accent: "#e6372f",
    status: "Active",
  },
  {
    id: "whetstone",
    title: "Whetstone",
    place: "Global",
    type: "Culinary anthropology",
    collections: ["Editorial", "Digital"],
    url: "https://www.whetstonemagazine.com/",
    image: "/covers/whetstone.jpg",
    note: "Whetstone approaches food through origin, ecology and culinary anthropology, drawing on a global network of writers and photographers. Its documentary imagery gives historical and political subjects a strong material presence.",
    tags: ["origins", "anthropology", "documentary"],
    accent: "#c55b42",
    status: "Active",
  },
  {
    id: "eaten",
    title: "EATEN",
    place: "United States",
    type: "Food history magazine",
    collections: ["Editorial"],
    url: "https://eatenmagazine.com/",
    image: "https://eatenmagazine.com/cdn/shop/files/Oysters_Logo.jpg?v=1694881793",
    note: "EATEN makes food history approachable through themed issues, concise scholarship and imagery sourced from museums, libraries and the public domain. Its archival method is especially useful for connecting contemporary stories to visual evidence.",
    tags: ["history", "archive", "historical image"],
    accent: "#6d3d31",
    status: "Active",
  },
  {
    id: "linseed",
    title: "Linseed Journal",
    place: "United Kingdom",
    type: "Cultural food journal",
    collections: ["Editorial"],
    url: "https://www.linseedjournal.com/",
    image: "https://static1.squarespace.com/static/5e80a77560c39844d660a0f6/t/62e26e67cdae4514b2f3a173/1659006567206/LINSEED+logo_green.jpg?format=1500w",
    note: "Linseed Journal places food beside nature, agriculture, craft and landscape in a slow, poetic object. Restrained typography, organic color and material paper make reading feel closer to field notes than conventional food media.",
    tags: ["nature", "materiality", "poetry"],
    accent: "#6d7596",
  },
  {
    id: "sandwich",
    title: "Sandwich",
    place: "London · United Kingdom",
    type: "Hyper-specialized magazine",
    collections: ["Editorial"],
    url: "https://www.sandwichmagazine.com/",
    image: "https://static1.squarespace.com/static/654e0b9a6858c779468ecced/t/655613f737b9d5261c73c9bc/1700140024035/ICECREAM_ISSUE_THUMB1.jpg?format=1500w",
    note: "Sandwich builds each issue around an apparently narrow food subject, then opens it into photography, behavior, celebrity and popular culture. The strength lies in treating niche obsession as a flexible commissioning framework.",
    tags: ["niche", "humor", "culture"],
    accent: "#efc332",
  },
  {
    id: "pit",
    title: "Pit",
    place: "United Kingdom",
    type: "Independent food magazine",
    collections: ["Editorial"],
    url: "https://pitmagazine.uk/",
    image: "https://pitmagazine.uk/wp-content/uploads/2025/09/PIT16_cover-scaled.jpg",
    note: "Pit organizes issues around primal and specific themes such as fire, MSG, kebabs and sausages. Gritty photography, oversized layouts and sharp humor give specialist knowledge the energy of a music or skate magazine.",
    tags: ["fire", "irreverence", "photography"],
    accent: "#ff5a2f",
  },
  {
    id: "noble-rot",
    title: "Noble Rot",
    place: "London · United Kingdom",
    type: "Wine, food & arts",
    collections: ["Editorial", "Identidade", "Espaços"],
    url: "https://noblerot.co.uk/",
    image: "https://noblerot.co.uk/images/og.png",
    note: "Noble Rot began as an irreverent wine magazine and expanded into restaurants without losing its editorial wit, illustration or critical authority. It is a key model for turning media into hospitality while keeping both sides culturally credible.",
    tags: ["wine", "hospitality", "ecosystem"],
    accent: "#752c2c",
  },
  {
    id: "toothache",
    title: "Toothache",
    place: "San Francisco · United States",
    type: "Magazine by chefs",
    collections: ["Editorial"],
    url: "https://toothachemagazine.com/",
    image: "https://toothachemagazine.com/cdn/shop/products/ToothacheProductIssue10_1024x1024.jpg?v=1658693381",
    note: "Toothache is made by chefs for readers who want to understand professional practice. Detailed recipes, intimate conversations and full-page photography preserve the voice and working methods of its contributors.",
    tags: ["chef", "process", "recipe"],
    accent: "#1b54c0",
  },
  {
    id: "pellicle",
    title: "Pellicle",
    place: "Manchester · United Kingdom",
    type: "Drinks magazine",
    collections: ["Editorial", "Digital"],
    url: "https://www.pelliclemag.com/",
    image: "https://static1.squarespace.com/static/5bf178d1697a98763203fc8c/t/6790baca305b916e01289162/1737538250355/Pellicle_Blobs+Keynote+Crop.jpg?format=1500w",
    note: "Pellicle covers beer, wine, pubs and drinking culture with the seriousness usually reserved for food, while remaining open and personal. Reader support, illustration and a clear ethical policy shape a trustworthy independent voice.",
    tags: ["drinks", "illustration", "community"],
    accent: "#b15d30",
  },
  {
    id: "brutus",
    title: "BRUTUS",
    place: "Tokyo · Japan",
    type: "Culture magazine",
    collections: ["Editorial", "Ásia"],
    url: "https://brutus.jp/magazine/",
    image: "https://brutus.jp/wp-content/themes/brutus/assets/ogp.png",
    note: "BRUTUS repeatedly turns ramen, bars, cafés and home cooking into dense cultural guides. Its energetic grids, diagrams, lists and typographic hierarchy show how a large amount of information can remain pleasurable to browse.",
    tags: ["Japan", "guide", "density"],
    accent: "#101010",
  },
  {
    id: "hanako",
    title: "Hanako",
    place: "Tokyo · Japan",
    type: "Food + city magazine",
    collections: ["Editorial", "Ásia"],
    url: "https://hanako.tokyo/book/",
    image: "https://img.hanako.tokyo/core/ico/favicon-512.png",
    note: "Hanako mixes food, shopping and urban life through friendly guides, illustrated maps and detailed lists. Its accessible visual language demonstrates how service journalism can feel charming, specific and highly collectible.",
    tags: ["guide", "map", "service journalism"],
    accent: "#dd6e77",
  },
  {
    id: "cuisine-magazine",
    title: "料理通信",
    place: "Tokyo · Japan",
    type: "The Cuisine Magazine",
    collections: ["Editorial", "Ásia", "Digital", "Arquivo"],
    url: "https://r-tsushin.com/",
    image: "https://r-tsushin.com/wp-content/uploads/2023/07/bannerslide_world_03.jpg",
    note: "The Cuisine Magazine connects producers, chefs and consumers through a systemic view of Japanese food culture. Reporting follows ingredients across agriculture, craft, restaurants and domestic use rather than isolating the finished plate.",
    tags: ["producer", "chef", "sustainability"],
    accent: "#a44a36",
    status: "Active online",
  },
  {
    id: "magazine-b",
    title: "Magazine B",
    place: "Seoul · South Korea",
    type: "Brand documentary",
    collections: ["Editorial", "Ásia", "Identidade"],
    url: "https://en.magazine-b.com/",
    image: "https://en.magazine-b.com/web/baton/images/seo_1.jpeg",
    note: "Magazine B documents one brand per issue through history, product, retail, users and business logic. It is essential for considering CREME simultaneously as editorial media, a designed product and a coherent commercial system.",
    tags: ["brand", "documentary", "system"],
    accent: "#236245",
  },
  {
    id: "fatboy",
    title: "FatBoy Zine",
    place: "London · Asian diaspora",
    type: "Food & identity zine",
    collections: ["Editorial", "Ásia"],
    url: "https://fatboyzine.com/",
    image: "https://fatboyzine.com/wp-content/uploads/2026/02/FatBoy-Zine-Logo-Outline.png",
    note: "FatBoy Zine celebrates Asian food and diasporic identity through recipes, memory, art and personal history. Its loud, emotional direction proves that cultural specificity and playful visual experimentation can strengthen one another.",
    tags: ["diaspora", "identity", "zine"],
    accent: "#e5482d",
  },
  {
    id: "spillll",
    title: "SPILLLL",
    place: "Japan · Korea · Thailand",
    type: "Queer culinary zine",
    collections: ["Editorial", "Ásia"],
    url: "https://www.itsnicethat.com/articles/spillll-collective-graphic-design-discover-250326",
    image: "https://admin.itsnicethat.com/images/OWL3nn9jRC91XWMsxmqQJIAJ5tQ=/275657/width-1440/14_PaT64Et.jpg",
    note: "SPILLLL combines risograph printing, recipes and conversations about feminism, gender, migration and East and Southeast Asian food. The collective format makes cooking a tool for solidarity and political self-representation.",
    tags: ["queer", "risograph", "politics"],
    accent: "#ff6b99",
  },
  {
    id: "manja",
    title: "Manja",
    place: "Lisbon · Portugal",
    type: "Gastronomy + hospitality",
    collections: ["Editorial", "Brasil + Portugal"],
    url: "https://www.manja.pt/revista/",
    image: "https://cdn.bndlyr.com/scbfmg4pw5uytuud/_assets/capa-292.png",
    note: "Manja is a slow, bilingual print magazine that positions Portuguese gastronomy beside art, design and contemporary hospitality. Its measured pacing and generous image treatment make local culture feel current rather than folkloric.",
    tags: ["Portugal", "hospitality", "bilingual"],
    accent: "#416876",
  },
  {
    id: "elle-table",
    title: "ELLE à Table Brasil",
    place: "São Paulo · Brazil",
    type: "Gastronomy magazine",
    collections: ["Editorial", "Brasil + Portugal"],
    url: "https://elle.com.br/elle-a-table",
    image: "https://elle.com.br/wp-content/themes/theme-elle-brasil/library/images/capa-menu-elle-a-table.png",
    note: "ELLE à Table Brasil brings fashion-image ambition into food publishing through commissioned photographers, sculptural still life and collectible print finishing. It offers a polished Brazilian counterpoint to more documentary food media.",
    tags: ["Brazil", "fashion", "still life"],
    accent: "#af1a28",
  },
  {
    id: "feira",
    title: "Revista Feira",
    place: "Rio de Janeiro · Brazil",
    type: "Independent publication",
    collections: ["Editorial", "Brasil + Portugal", "Arquivo"],
    url: "https://www.revistafeira.com/",
    image: "/covers/revista-feira.jpg",
    note: "Revista Feira traces food between field and city, connecting agriculture, politics, photography and social transformation in Brazil. Its reporting makes supply chains and territories visible without losing human scale.",
    tags: ["Brazil", "agriculture", "politics"],
    accent: "#b89026",
  },
  {
    id: "mold",
    title: "MOLD",
    place: "New York · United States",
    type: "Food futures archive",
    collections: ["Editorial", "Digital", "Arquivo"],
    url: "https://thisismold.com/",
    image: "https://thisismold.com/wp-content/uploads/2025/06/MOLD_Magazine_I_Ching_2025-scaled.jpg",
    note: "MOLD explored food futures through design, sovereignty, technology and ecological systems across six print issues and an extensive online archive. It shows how speculative design can remain grounded in politics, materials and everyday eating.",
    tags: ["futures", "design", "sovereignty"],
    accent: "#394a31",
    status: "Archive since 2025",
  },
  {
    id: "lucky-peach",
    title: "Lucky Peach",
    place: "United States",
    type: "Cult magazine",
    collections: ["Editorial", "Arquivo"],
    url: "https://www.eater.com/2017/4/10/15240054/lucky-peach-design-illustration",
    image: "https://platform.eater.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/8312253/hotpockets.jpg?quality=90&strip=all&crop=5.2423333333333%2C0%2C89.515333333333%2C100&w=1200",
    note: "Lucky Peach broke the polite boundary between food journalism and restaurant culture with illustration, visual noise, obsessive themes and irreverent writing. Its influence still appears across independent food magazines, podcasts and chef-led media.",
    tags: ["cult", "illustration", "irreverence"],
    accent: "#f05a43",
    status: "2011—2017",
  },
  {
    id: "eater",
    title: "Eater",
    place: "United States + global cities",
    type: "Digital food platform",
    collections: ["Digital"],
    url: "https://www.eater.com/",
    image: "https://platform.eater.com/wp-content/uploads/sites/2/2026/01/Eater-Site-Logo.png?quality=90&strip=all&crop=0,23.821989528796,100,52.356020942408",
    note: "Eater is a benchmark for distributed digital food media, combining city maps, restaurant guides, criticism, reported features and video. Its modular product system lets local expertise operate inside a recognizable global platform.",
    tags: ["map", "guide", "digital product"],
    accent: "#e31b23",
  },
  {
    id: "food52",
    title: "Food52",
    place: "New York · United States",
    type: "Content + community + commerce",
    collections: ["Digital", "Identidade"],
    url: "https://food52.com/",
    image: "https://mma.prnewswire.com/media/2090192/Food52_Logo.jpg?p=facebook",
    note: "Food52 combines recipes, editorial content, community participation and commerce inside one brand experience. The useful reference is not one visual style but the way content creates trust that can extend into products and retail.",
    tags: ["community", "commerce", "recipe"],
    accent: "#475c50",
  },
  {
    id: "gastro-obscura",
    title: "Gastro Obscura",
    place: "Global",
    type: "Food discovery platform",
    collections: ["Digital"],
    url: "https://www.atlasobscura.com/gastro/",
    image: "https://d2j6dbq0eux0bg.cloudfront.net/images/87816831/3631032457.jpg",
    note: "Gastro Obscura organizes unusual foods, rituals and places as a continuous system of discovery. Maps, taxonomies and narrative entries turn global curiosity into a product people can browse, save and return to.",
    tags: ["discovery", "map", "history"],
    accent: "#315a45",
  },
  {
    id: "another-collective",
    title: "Another Collective",
    place: "Porto + Madrid",
    type: "Branding studio",
    collections: ["Identidade", "Brasil + Portugal"],
    url: "https://www.anothercollective.pt/",
    image: "https://cdn.prod.website-files.com/697750ac996fbf7ba83de212/69a17e154c634f3e9565c702_ac-share.jpg",
    note: "Another Collective is the studio behind Farta and other identity, packaging and editorial projects. Its work demonstrates how material choices, verbal tone and image direction can build a hospitality brand beyond a logo.",
    tags: ["branding", "packaging", "Portugal"],
    accent: "#f1bf2d",
  },
  {
    id: "estudio-cozinha",
    title: "Estúdio Cozinha",
    place: "Porto · Portugal",
    type: "Food creative studio",
    collections: ["Identidade", "Brasil + Portugal"],
    url: "https://www.estudiocozinha.pt/",
    image: "https://cdn.prod.website-files.com/63be963b8141103a1fd2f816/646656a17db5af1999b6bd18_og.jpg",
    note: "Estúdio Cozinha develops visual and literary identities for restaurants, chefs and gastronomic culture projects. Photography and writing are treated as core brand materials, not content added after the design system is finished.",
    tags: ["photography", "writing", "hospitality"],
    accent: "#813e2d",
  },
  {
    id: "paper-knife",
    title: "Paper Knife",
    place: "Los Angeles · United States",
    type: "Hospitality branding",
    collections: ["Identidade", "Espaços"],
    url: "https://www.paperknife.co/",
    image: "https://static1.squarespace.com/static/66623e1c0e720b2aba05098d/t/6813ea04e610b5057731f32d/1746135556112/paper-knife-1.jpg?format=1500w",
    note: "Paper Knife creates expressive identities for restaurants, bars, hotels and food products. Its strongest systems connect illustration, menus, packaging and signage so the brand becomes part of the physical experience of eating.",
    tags: ["branding", "menu", "signage"],
    accent: "#e95139",
  },
  {
    id: "and-wiser",
    title: "And Wiser",
    place: "Washington DC · United States",
    type: "Hospitality design studio",
    collections: ["Identidade", "Espaços"],
    url: "https://www.andwiser.co/",
    image: "https://static1.squarespace.com/static/645947a12d3f5c5dde31806d/t/64594b84afe16e475f81b164/1683573636495/%26W_Logotype.png?format=1500w",
    note: "And Wiser works across strategy, naming, identity, menus, packaging, signage, digital and interiors. It is a useful model for treating hospitality as one connected ecosystem rather than a sequence of separate design commissions.",
    tags: ["ecosystem", "menu", "interior"],
    accent: "#4b52b8",
  },
  {
    id: "rbda",
    title: "Restaurant & Bar Design Awards",
    place: "Global",
    type: "Spatial design archive",
    collections: ["Espaços"],
    url: "https://restaurantandbardesignawards.com/",
    image: "https://restaurantandbardesignawards.com/images/og/1200x630-default.jpg",
    note: "The Restaurant & Bar Design Awards provide a global archive of hospitality architecture, lighting, materials, façades and spatial experience. Use it as a scanning tool, while looking beyond surface trends to circulation and service logic.",
    tags: ["architecture", "interior", "hospitality"],
    accent: "#222222",
  },
];

const territories = [
  {
    index: "01",
    name: "Editorial cream",
    copy: "Grotesk type, milky tones, tactile photography and the pace of independent publishing.",
    className: "territory-editorial",
  },
  {
    index: "02",
    name: "Modernist bistro",
    copy: "A rigorous grid, red and cream, signage and functional intelligence.",
    className: "territory-bistro",
  },
  {
    index: "03",
    name: "Refined vernacular",
    copy: "Brazilian and Portuguese vernacular elevated without losing warmth, humor or appetite.",
    className: "territory-vernacular",
  },
  {
    index: "04",
    name: "Food surrealism",
    copy: "Sculptural still life, macro detail, artificial color, exaggeration and strangeness.",
    className: "territory-surreal",
  },
  {
    index: "05",
    name: "Contemporary culture",
    copy: "Flash, people, nightlife, fashion, city life and layouts that feel live and immediate.",
    className: "territory-culture",
  },
];

const researchAxes = [
  ["01", "Photography", "Light, gesture, still life, people and texture"],
  ["02", "Typography", "Logo, text, display, numbers and motion"],
  ["03", "Editorial", "Covers, grids, pacing, paper and collecting"],
  ["04", "Restaurants", "Menu, façade, uniforms and service"],
  ["05", "Identity", "System, voice, image and campaigns"],
  ["06", "Vernacular", "Markets, lettering, packaging and archives"],
  ["07", "Packaging", "Labels, boxes, kits and objects"],
  ["08", "Spaces", "Materials, light, sound and circulation"],
  ["09", "Digital product", "Search, maps, profiles and collections"],
  ["10", "Content", "Essays, guides, films and conversations"],
  ["11", "Voice", "Manifesto, headlines, captions and humor"],
  ["12", "Community", "Rituals, members, events and authorship"],
];

export default function Home() {
  const [activeFilters, setActiveFilters] = useState<Record<FilterGroupKey, string>>({
    type: "All",
    region: "All",
    focus: "All",
  });
  const [query, setQuery] = useState("");
  const [saved, setSaved] = useState<Set<string>>(new Set());
  const [view, setView] = useState<"grid" | "list">("grid");
  const [filterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem("creme-saved-references");
    if (stored) setSaved(new Set(JSON.parse(stored)));
  }, []);

  useEffect(() => {
    if (!filterOpen) return;
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setFilterOpen(false);
    }
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [filterOpen]);

  const visibleReferences = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("en-US");
    return references.filter((reference) => {
      const dimensions = getReferenceDimensions(reference);
      const matchesFilters = (Object.keys(activeFilters) as FilterGroupKey[]).every(
        (key) => activeFilters[key] === "All" || dimensions[key].includes(activeFilters[key]),
      );
      const haystack = [
        reference.title,
        reference.place,
        reference.type,
        reference.note,
        ...reference.tags,
      ]
        .join(" ")
        .toLocaleLowerCase("en-US");
      return matchesFilters && (!normalizedQuery || haystack.includes(normalizedQuery));
    });
  }, [activeFilters, query]);

  const referenceSections = useMemo(() => {
    if (activeFilters.type !== "All") {
      const selected = referenceSectionDefinitions.find(
        (section) => section.filter === activeFilters.type,
      );
      return selected && visibleReferences.length > 0
        ? [{ ...selected, references: visibleReferences }]
        : [];
    }

    return referenceSectionDefinitions
      .map((section) => ({
        ...section,
        references: visibleReferences.filter(
          (reference) => getPrimaryReferenceSection(reference) === section.key,
        ),
      }))
      .filter((section) => section.references.length > 0);
  }, [activeFilters.type, visibleReferences]);

  function toggleSaved(id: string) {
    setSaved((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      window.localStorage.setItem(
        "creme-saved-references",
        JSON.stringify(Array.from(next)),
      );
      return next;
    });
  }

  const activeFilterCount =
    Object.values(activeFilters).filter((value) => value !== "All").length +
    (query.trim() ? 1 : 0);
  const latestReferences = ["idler", "rice", "cake-zine"]
    .map((id) => references.find((reference) => reference.id === id))
    .filter((reference): reference is Reference => Boolean(reference));
  const popularReferences = ["magazine-f", "gourmand", "rice", "whetstone", "cake-zine"]
    .map((id) => references.find((reference) => reference.id === id))
    .filter((reference): reference is Reference => Boolean(reference));

  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#top" aria-label="CREME — home">
          <img src="/brand/logo-black.png" alt="CREME" />
        </a>
        <nav className="top-tabs" aria-label="Research libraries">
          <a className="active" href="/">Visual library</a>
          <a href="/podcasts">Podcasts</a>
        </nav>
        <button
          className="top-menu-trigger"
          type="button"
          onClick={() => setFilterOpen(true)}
          aria-expanded={filterOpen}
          aria-controls="library-filter-drawer"
          aria-label="Open library menu"
        >
          <span>Menu</span>
          <span className="hamburger" aria-hidden="true"><i /><i /><i /></span>
          {activeFilterCount > 0 && <strong>{activeFilterCount}</strong>}
        </button>
      </header>

      <section className="hero" id="top">
        <div className="hero-kicker">
          <span>CREME Visual Research Bank</span>
          <a href="https://www.instagram.com/letscreme/?hl=en" target="_blank" rel="noreferrer">
            @letscreme ↗
          </a>
        </div>
        <h1>
          Culture to <em>eat</em>
          <br />
          with eyes, hands,
          <br />
          and mouth.
        </h1>
        <div className="hero-visual" aria-hidden="true">
          <figure className="hero-shot hero-shot-main">
            <img src="/hero/creme-meringue.jpg" alt="" />
          </figure>
          <figure className="hero-shot hero-shot-video">
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              poster="/hero/creme-time-to-cook-poster.jpg"
            >
              <source src="/hero/creme-time-to-cook.mp4" type="video/mp4" />
            </video>
          </figure>
          <figure className="hero-shot hero-shot-detail">
            <img src="/hero/creme-yolk-spoon.jpg" alt="" />
          </figure>
        </div>
        <div className="hero-bottom">
          <p className="hero-intro">
            A living archive for investigating how food becomes photography,
            publishing, space, language, community and desire.
          </p>
          <div className="stats" aria-label="Library summary">
            <div>
              <strong>{references.length}</strong>
              <span>references</span>
            </div>
            <div>
              <strong>12</strong>
              <span>axes</span>
            </div>
            <div>
              <strong>03</strong>
              <span>dimensions</span>
            </div>
          </div>
        </div>
      </section>

      <section className="library" id="referencias">
        {filterOpen && (
          <div className="filter-drawer-layer" role="presentation">
            <button
              className="filter-drawer-backdrop"
              type="button"
              onClick={() => setFilterOpen(false)}
              aria-label="Close filters"
            />
            <aside
              className="filter-drawer"
              id="library-filter-drawer"
              aria-label="Browse and filter references"
            >
              <div className="filter-drawer-heading">
                <div>
                  <span>Visual library</span>
                  <h3>Browse &amp; filter</h3>
                </div>
                <button type="button" onClick={() => setFilterOpen(false)} aria-label="Close filters">×</button>
              </div>
              <div className="filter-drawer-fields">
                {filterGroups.map((group) => (
                  <label className="drawer-field" key={group.key}>
                    <span>{group.label}</span>
                    <select
                      value={activeFilters[group.key]}
                      onChange={(event) =>
                        setActiveFilters((current) => ({
                          ...current,
                          [group.key]: event.target.value,
                        }))
                      }
                    >
                      {group.options.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </label>
                ))}
                <label className="drawer-field drawer-search">
                  <span>Search</span>
                  <input
                    type="search"
                    placeholder="name, country, idea…"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    autoFocus
                  />
                </label>
              </div>
              <div className="filter-drawer-footer">
                <div className="drawer-view-switcher" aria-label="View mode">
                  <button type="button" className={view === "grid" ? "active" : ""} onClick={() => setView("grid")}>Grid</button>
                  <button type="button" className={view === "list" ? "active" : ""} onClick={() => setView("list")}>List</button>
                </div>
                <button
                  className="clear-filters"
                  type="button"
                  onClick={() => {
                    setActiveFilters({ type: "All", region: "All", focus: "All" });
                    setQuery("");
                  }}
                >
                  Clear all
                </button>
              </div>
              <button className="filter-results-button" type="button" onClick={() => setFilterOpen(false)}>
                Show {visibleReferences.length} references
              </button>
            </aside>
          </div>
        )}

        <div className="reference-sections">
          {referenceSections.map((section, sectionIndex) => (
            <section className="reference-section" key={section.key}>
              <header className="reference-section-heading">
                <span>{String(sectionIndex + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{section.title}</h3>
                  <p>{section.copy}</p>
                </div>
                <strong>
                  {section.references.length} {section.references.length === 1 ? "reference" : "references"}
                </strong>
              </header>
              <div className={`reference-grid ${view === "list" ? "list-view" : ""}`}>
                {section.references.map((reference, index) => (
                  <article
                    className={`reference-card ${reference.image ? "has-image" : "poster-card"}`}
                    key={reference.id}
                    style={{ "--accent": reference.accent } as React.CSSProperties}
                  >
              <div className="card-tilt">
                <div className="card-visual">
                  {reference.image ? (
                    <img src={reference.image} alt={`Cover or image from ${reference.title}`} />
                  ) : (
                    <div className="poster" aria-hidden="true">
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <strong>{reference.title}</strong>
                      <i>CREME INDEX</i>
                    </div>
                  )}
                  <button
                    className={`save-button ${saved.has(reference.id) ? "saved" : ""}`}
                    type="button"
                    onClick={() => toggleSaved(reference.id)}
                    aria-label={
                      saved.has(reference.id)
                        ? `Remove ${reference.title} from saved references`
                        : `Save ${reference.title}`
                    }
                  >
                    {saved.has(reference.id) ? "✓" : "+"}
                  </button>
                </div>
              </div>
              <div className="card-body">
                <div className="card-meta">
                  <span>{reference.place}</span>
                  <span>{reference.status ?? reference.type}</span>
                </div>
                <h3>{reference.title}</h3>
                <p>{reference.note}</p>
                <div className="tag-row">
                  {reference.tags.map((tag) => (
                    <span key={tag}>#{tag}</span>
                  ))}
                </div>
                {referencePeople[reference.id] && (
                  <div className="people-block">
                    <span className="people-label">Authors & key contributors</span>
                    <div className="people-list">
                      {referencePeople[reference.id].map((person) =>
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
                )}
                <a href={reference.url} target="_blank" rel="noreferrer">
                  Visit reference <span aria-hidden="true">↗</span>
                </a>
              </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>

        {visibleReferences.length === 0 && (
          <div className="empty-state">
            <strong>Nothing on this shelf.</strong>
            <p>Try another word or return to “All”.</p>
          </div>
        )}
      </section>

      <section className="territories" id="territorios">
        <div className="section-heading inverted">
          <div>
            <span className="eyebrow">03 — Visual hypotheses</span>
            <h2>Five directions for CREME</h2>
          </div>
          <p>
            These are not finished identities. They are productive tensions
            for organizing references and testing decisions.
          </p>
          <div className="section-logo-wrap section-logo-orange" aria-hidden="true">
            <img src="/brand/logo-black.png" alt="" />
          </div>
        </div>
        <div className="territory-grid">
          {territories.map((territory) => (
            <article className={territory.className} key={territory.index}>
              <span>{territory.index}</span>
              <div className="territory-mark" aria-hidden="true" />
              <h3>{territory.name}</h3>
              <p>{territory.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="framework" id="metodo">
        <div className="section-heading">
          <div>
            <span className="eyebrow">04 — Research framework</span>
            <h2>What to observe</h2>
          </div>
          <p>
            Every new reference should answer a question. These axes keep the
            library from becoming a collection of disconnected images.
          </p>
          <div className="section-logo-wrap section-logo-red-one" aria-hidden="true">
            <img src="/brand/logo-black.png" alt="" />
          </div>
        </div>
        <div className="axis-list">
          {researchAxes.map(([number, title, description]) => (
            <article key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{description}</p>
              <i aria-hidden="true">↗</i>
            </article>
          ))}
        </div>
      </section>

      <section className="principles">
        <div className="principles-title">
          <span className="eyebrow">05 — CREME criteria</span>
          <h2>Save less.<br />Observe better.</h2>
          <div className="section-logo-wrap section-logo-red-two" aria-hidden="true">
            <img src="/brand/logo-black.png" alt="" />
          </div>
        </div>
        <ol>
          <li><span>01</span><p>Which decision can this reference inform?</p></li>
          <li><span>02</span><p>What is a system, and what is only styling?</p></li>
          <li><span>03</span><p>How does the idea move across print, digital and space?</p></li>
          <li><span>04</span><p>What is culturally specific and should not be copied?</p></li>
          <li><span>05</span><p>What can CREME do in its own way?</p></li>
        </ol>
      </section>

      <section className="latest-popular" aria-labelledby="latest-popular-title">
        <div className="latest-popular-intro">
          <span className="eyebrow">06 — Library pulse</span>
          <h2 id="latest-popular-title">Latest &amp; popular</h2>
          <p>Recently added references and recurring touchstones in the CREME research bank.</p>
        </div>
        <div className="latest-popular-grid">
          <div className="latest-column">
            <header><h3>Latest</h3><a href="#referencias">See all ↑</a></header>
            <div className="latest-list">
              {latestReferences.map((reference, index) => (
                <a className="latest-item" href={reference.url} target="_blank" rel="noreferrer" key={reference.id}>
                  <div className="latest-image">
                    {reference.image && <img src={reference.image} alt={`Image from ${reference.title}`} />}
                  </div>
                  <div>
                    <span>Recently added · {String(index + 1).padStart(2, "0")}</span>
                    <h4>{reference.title}</h4>
                    <p>{reference.place} · {reference.type}</p>
                  </div>
                  <i aria-hidden="true">↗</i>
                </a>
              ))}
            </div>
          </div>
          <div className="popular-column">
            <header><h3>Popular</h3><a href="#referencias">See all ↑</a></header>
            <ol>
              {popularReferences.map((reference, index) => (
                <li key={reference.id}>
                  <a href={reference.url} target="_blank" rel="noreferrer">
                    <span>{index + 1}</span>
                    <div><h4>{reference.title}</h4><p>{reference.place}</p></div>
                    <i aria-hidden="true">↗</i>
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <footer>
        <div>
          <a className="brand footer-brand" href="#top" aria-label="CREME — back to top">
            <img src="/brand/logo-black.png" alt="CREME" />
          </a>
          <p>Food Culture Research Bank · v0.3</p>
        </div>
        <p>
          Images are used exclusively for research reference. Rights belong to
          their respective publications, creators and authors.
        </p>
        <div className="footer-links">
          <a href="https://www.instagram.com/letscreme/?hl=en" target="_blank" rel="noreferrer">Instagram ↗</a>
          <a href="https://magculture.com/" target="_blank" rel="noreferrer">magCulture ↗</a>
          <a href="/podcasts">Podcasts ↗</a>
          <a href="#top">Back to top ↑</a>
        </div>
      </footer>
    </main>
  );
}
