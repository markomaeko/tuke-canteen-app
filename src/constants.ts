export const CANTEENS = [
  { slug: "jedalen-nemcovej-1", name: "Jedáleň Němcovej 1" },
  { slug: "jedalen-jedlikova-7", name: "Jedáleň Jedlíkova 7" },
  { slug: "bistro-urbankova-2", name: "Bistro Urbánkova 2" },
  { slug: "bistro-zp-nemcovej-9", name: "Bistro ZP, Němcovej 9" },
  { slug: "jedalen-budovatelska-31-presov", name: "Jedáleň Budovateľská 31, Prešov" },
  { slug: "pizzeria-forte-jedlikova-7", name: "Pizzéria Forte Jedlíkova 7" },
  { slug: "libresso-nemcovej-7", name: "Libresso, Němcovej 7" },
] as const;

export type CanteenSlug = (typeof CANTEENS)[number]["slug"];

export const ALLERGENS: { short: string; full: string }[] = [
  { short: "Obilniny", full: "Obilniny obsahujúce lepok (t.j. pšenica, raž, jačmeň, ovos, špalda, kamut alebo ich hybridné odrody)." },
  { short: "Kôrovce", full: "Kôrovce a výrobky z nich." },
  { short: "Vajcia", full: "Vajcia a výrobky z nich." },
  { short: "Ryby", full: "Ryby a výrobky z nich." },
  { short: "Arašídy", full: "Arašidy a výrobky z nich." },
  { short: "Sója", full: "Sójové zrná a výrobky z nich." },
  { short: "Mlieko", full: "Mlieko a výrobky z neho." },
  { short: "Orechy", full: "Orechy (mandle, lieskové, vlašské, kešu, pekanové, para, pistácie, makadamové a queenslandské orechy) a výrobky z nich." },
  { short: "Zeler", full: "Zeler a výrobky z neho." },
  { short: "Horčica", full: "Horčica a výrobky z nej." },
  { short: "Sezam", full: "Sezamové semená a výrobky z nich." },
  { short: "SO₂ a siričitany", full: "Oxid siričitý a siričitany v koncentráciách vyšších ako 10 mg/kg alebo 10 mg/l." },
  { short: "Vlčí bôb", full: "Vlčí bob a výrobky z neho." },
  { short: "Mäkkýše", full: "Mäkkýše a výrobky z nich." },
];

// Skrátené názvy alergénov indexované číslom (1–14) pre AllergenChips
export const ALLERGENS_SK: Record<number, string> = Object.fromEntries(
  ALLERGENS.map((a, i) => [i + 1, a.short]),
);

// Sekcie menu skryté filtrom „Iba hlavné jedlá"
export const SIDE_SECTION_TITLES = ["Nápoje", "Ostatné", "Prílohy"] as const;
