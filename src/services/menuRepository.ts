import type { CanteenMenuDay, ISODate } from "../types";
import type { CanteenSlug } from "../constants";
import { fetchTukeMenuHtml } from "./menuClient";
import { parseTukeMenuHtml } from "./menuParser";

export async function getMenuDay(canteenSlug: CanteenSlug, date: ISODate): Promise<CanteenMenuDay> {
  const html = await fetchTukeMenuHtml(canteenSlug, date);
  return parseTukeMenuHtml(html, { date, canteenSlug });
}
