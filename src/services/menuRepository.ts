import type { CanteenMenuDay, ISODate, CanteenSlug } from "../types/menu";
import { fetchTukeMenuHtml } from "./tukeMenuClient";
import { parseTukeMenuHtml } from "./tukeMenuParser";

export async function getMenuDay(canteenSlug: CanteenSlug, date: ISODate): Promise<CanteenMenuDay> {
  const html = await fetchTukeMenuHtml(canteenSlug, date);
  return parseTukeMenuHtml(html, { date, canteenSlug });
}
