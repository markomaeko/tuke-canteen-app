import type { CanteenSlug } from "./constants";

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
