/** IDAC Futwork disposition definitions (mirrors backend IDAC_DISPOSITION_ORDER). */

export const IDAC_DISPOSITIONS = [
  {
    key: "Dropped",
    label: "Dropped",
    statKey: "dropped_calls",
    filterKey: "Dropped",
    color: "#059669",
    borderClass: "border-red-500",
    badgeClass: "bg-orange-900/30 text-orange-300 border-orange-500/30",
  },
  {
    key: "Attending",
    label: "Attending",
    statKey: "attending_calls",
    filterKey: "Attending",
    color: "#14B8A6",
    borderClass: "border-teal-500",
    badgeClass: "bg-emerald-900/30 text-emerald-300 border-emerald-500/30",
  },
  {
    key: "Busy",
    label: "Busy",
    statKey: "busy_calls",
    filterKey: "Busy",
    color: "#0d9488",
    borderClass: "border-amber-500",
    badgeClass: "bg-yellow-900/30 text-yellow-300 border-yellow-500/30",
  },
  {
    key: "No Answer",
    label: "NA",
    statKey: "na_calls",
    filterKey: "No Answer",
    color: "#38bdf8",
    borderClass: "border-gray-500",
    badgeClass: "bg-sky-900/30 text-sky-300 border-sky-500/30",
  },
  {
    key: "Not Attending",
    label: "Not Attending",
    statKey: "not_attending_calls",
    filterKey: "Not Attending",
    color: "#2563eb",
    borderClass: "border-orange-500",
    badgeClass: "bg-blue-900/30 text-blue-300 border-blue-500/30",
  },
  {
    key: "Wrong Number",
    label: "Wrong Number",
    statKey: "wrong_number_calls",
    filterKey: "Wrong Number",
    color: "#8B5CF6",
    borderClass: "border-purple-500",
    badgeClass: "bg-purple-900/30 text-purple-300 border-purple-500/30",
  },
];

export const IDAC_DISPOSITION_KEYS = IDAC_DISPOSITIONS.map((d) => d.key);

export const IDAC_DISPOSITION_FILTER_OPTIONS = IDAC_DISPOSITIONS.map((d) => d.filterKey);

const BADGE_BY_KEY = Object.fromEntries(
  IDAC_DISPOSITIONS.flatMap((d) => [
    [d.key, d.badgeClass],
    [d.label, d.badgeClass],
    [d.filterKey, d.badgeClass],
  ])
);

/** Badge classes for raw disposition strings (incl. Futwork aliases like Na). */
export function getIdacDispositionBadgeClass(disposition) {
  const raw = String(disposition || "").trim();
  if (!raw) return "bg-gray-900/30 text-gray-300 border-gray-500/30";
  if (BADGE_BY_KEY[raw]) return BADGE_BY_KEY[raw];
  const lower = raw.toLowerCase();
  if (lower === "na" || lower === "no answer") return BADGE_BY_KEY["No Answer"];
  const match = IDAC_DISPOSITIONS.find(
    (d) =>
      d.key.toLowerCase() === lower ||
      d.label.toLowerCase() === lower ||
      d.filterKey.toLowerCase() === lower
  );
  return match?.badgeClass || "bg-gray-900/30 text-gray-300 border-gray-500/30";
}

export function normalizeDispositionChartLabel(key) {
  const raw = String(key || "").trim();
  if (!raw) return raw;
  if (raw === "No Answer") return "NA";
  return raw;
}
