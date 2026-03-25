import type { ISODate } from "../types";
import type { CanteenSlug } from "../constants";

const FETCH_TIMEOUT_MS = 15_000;

export async function fetchTukeMenuHtml(canteenSlug: CanteenSlug, date: ISODate): Promise<string> {
  const url = `https://jedalen.tuke.sk/jedalny-listok/${canteenSlug}/${date}`;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "tuke-canteen-app/0.1" },
      signal: controller.signal,
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch menu: ${res.status} ${res.statusText}`);
    }
    return await res.text();
  } catch (e: unknown) {
    if (e instanceof DOMException && e.name === "AbortError") {
      throw new Error("Načítanie menu trvalo príliš dlho. Skúste to znova.");
    }
    throw e;
  } finally {
    clearTimeout(timer);
  }
}
