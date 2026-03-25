function pad2(n: number) {
  return String(n).padStart(2, "0");
}

function toISODate(d: Date): string {
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}

function formatDayLabelSK(dayIndex: number): string {
  const labels = ["Nedeľa", "Pondelok", "Utorok", "Streda", "Štvrtok", "Piatok", "Sobota"];
  return labels[dayIndex] ?? "";
}

function formatShortDateSK(d: Date): string {
  return `${pad2(d.getDate())}.${pad2(d.getMonth() + 1)}.`;
}

export function getNextWorkdays(count = 5): { iso: string; label: string; dateLabel: string }[] {
  const out: { iso: string; label: string; dateLabel: string }[] = [];
  let cursor = new Date();

  while (out.length < count) {
    const dow = cursor.getDay(); // 0..6
    const isWeekend = dow === 0 || dow === 6; // Ne or So

    if (!isWeekend) {
      out.push({
        iso: toISODate(cursor),
        label: formatDayLabelSK(dow),
        dateLabel: formatShortDateSK(cursor),
      });
    }

    cursor = new Date(cursor);
    cursor.setDate(cursor.getDate() + 1);
  }

  return out;
}

export function formatPrice(price: number): string {
  return price.toFixed(2).replace(".", ",") + " €";
}
