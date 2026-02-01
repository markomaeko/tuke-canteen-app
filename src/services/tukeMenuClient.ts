import type { ISODate, CanteenSlug } from "../types/menu";

export async function fetchTukeMenuHtml(canteenSlug: CanteenSlug, date: ISODate): Promise<string> {
  const url = `https://jedalen.tuke.sk/jedalny-listok/${canteenSlug}/${date}`;
  const res = await fetch(url, {
    headers: { "User-Agent": "tuke-canteen-app/0.1" },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch menu: ${res.status} ${res.statusText}`);
  }
  return await res.text();
}
