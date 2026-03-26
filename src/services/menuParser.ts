import { parse } from "node-html-parser";
import type { CanteenMenuDay, MenuSection, MenuItem, ISODate } from "../types";
import type { CanteenSlug } from "../constants";

function parsePriceToNumber(priceText: string): number {
  const cleaned = priceText.replace("€", "").trim().replace(",", ".");
  const value = Number(cleaned);
  return Number.isFinite(value) ? value : 0;
}

function uniqIdFromPopupOrName(popup: string | null, name: string, price: number): string {
  // nepoužívaj slice na popup – spôsobuje kolízie; na fallback je OK
  if (popup && popup.length > 10) return popup;

  // fallback, keď popup nie je:
  return `${name}-${price}`.toLowerCase().replace(/\s+/g, "-").slice(0, 80);
}

export function parseTukeMenuHtml(
  html: string,
  meta: { date: ISODate; canteenSlug: CanteenSlug }
): CanteenMenuDay {
  const root = parse(html);

  // názov jedálne
  const canteenName =
    root.querySelector(".jedalen-full h2")?.text.trim() ??
    root.querySelector(".jedalen-small h2")?.text.trim() ??
    "Neznáma jedáleň";

  // oznam (napr. zatvorené)
  const announcement = root.querySelector(".ponukaView .announcement")?.text.trim();

  // sekcie
  const groups = root.querySelectorAll(".ponukaView .group");

  const sections: MenuSection[] = groups.map((g) => {
    const title = g.querySelector(".header")?.text.trim() ?? "Nezaradené";
    const rows = g.querySelectorAll(".row.has_popup");

    const items: MenuItem[] = rows.map((row) => {
      const popup = row.getAttribute("data-popup");

      const nameNode = row.querySelector(".data.col-xs-10");
      const priceNode = row.querySelector(".data.col-xs-2");

      // alergény (robustne)
      const alergensSpan = nameNode?.querySelector("span.alergens");

      const alergensText = String(
        (alergensSpan as any)?.textContent ??
          (alergensSpan as any)?.innerText ??
          (alergensSpan as any)?.rawText ??
          ""
      );

      const allergens = (alergensText.match(/\d+/g) ?? [])
        .map((x) => Number(x))
        .filter((n) => Number.isFinite(n) && n >= 1 && n <= 14);

      // odstráň alergény zo "name" textu
      if (alergensSpan) alergensSpan.remove();

      const name = nameNode?.text.trim() ?? "Neznáme jedlo";
      const priceText = priceNode?.text.trim() ?? "0 €";
      const price = parsePriceToNumber(priceText);

      const id = uniqIdFromPopupOrName(popup ?? null, name, price);

      return { id, name, price, currency: "EUR", allergens };
    });

    return { title, items };
  });

  // otváracia doba
  const start = root.querySelector(".timeline li.start")?.getAttribute("data-time") ?? undefined;
  const end = root.querySelector(".timeline li.end")?.getAttribute("data-time") ?? undefined;

  if (canteenName === "Neznáma jedáleň") {
    throw new Error("Nepodarilo sa spracovať údaje z jedálne.");
  }

  return {
    canteenName,
    canteenSlug: meta.canteenSlug,
    date: meta.date,
    sections,
    announcement: announcement && announcement.length > 0 ? announcement : undefined,
    openingHours: start && end ? { start, end } : undefined,
  };
}
