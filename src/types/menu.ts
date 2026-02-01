export type CanteenSlug = "jedalen-jedlikova-7" | "jedalen-nemcovej-1" | "bistro-urbankova-2" | "bistro-zp-nemcovej-9" | "jedalen-budovatelska-31-presov" | "pizzeria-forte-jedlikova-7" | "libresso-nemcovej-7";
export type ISODate = string;

export type MenuItem = {
  id: string;
  name: string;
  price: number;
  photoUrl?: string;
  currency: "EUR";
  allergens: number[];
};

export type MenuSection = {
  title: string;
  items: MenuItem[];
};

export type CanteenMenuDay = {
  canteenName: string;
  canteenSlug: CanteenSlug;
  date: ISODate;

  sections: MenuSection[];     // môže byť prázdne
  announcement?: string;       // napr. "prevádzka zatvorená..."
  openingHours?: { start: string; end: string };
};
