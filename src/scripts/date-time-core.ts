/**
 * Pure date/time logic for the shared DateField component (S16-1) —
 * segment auto-advance, impossible-date detection, birth presets
 * (no future, 100-year window) and the ISO / 24-hour value contracts.
 * Kept dependency-free so bun unit tests (meta repo qa/) can import it
 * directly and the browser bundle stays small.
 */

export type DatePreset = "birth" | "free";

/** auto-advance + zero-pad rule for a 2-digit segment (day/month/hour/minute) */
export function normalizeSegment(
  raw: string,
  max: number,
  kind: "day" | "month" | "hour12" | "hour24" | "minute",
): { value: string; advance: boolean } {
  const digits = raw.replace(/\D/g, "").slice(0, 2);
  if (!digits) return { value: "", advance: false };
  // 24h hour and minute start at 0; day/month/12h hour start at 1
  const min = kind === "minute" || kind === "hour24" ? 0 : 1;
  if (digits.length === 2) {
    const n = Number(digits);
    if (n >= min && n <= max) return { value: digits, advance: true };
    // two digits but out of range (e.g. "00" day, "99" minute) — keep for
    // the validator to message about; no advance
    return { value: digits, advance: false };
  }
  const first = Number(digits);
  // a first digit that can never start a valid pair pads to 0X and advances:
  // day >3 (40+ impossible), month >1 (20+ impossible), 12h hour >1,
  // 24h hour >2, minute >5 (60+ impossible)
  const padThreshold: Record<typeof kind, number> = {
    day: 3,
    month: 1,
    hour12: 1,
    hour24: 2,
    minute: 5,
  };
  if (first > padThreshold[kind]) return { value: `0${digits}`, advance: true };
  return { value: digits, advance: false };
}

export function daysInMonth(year: number, month1to12: number): number {
  return new Date(year, month1to12, 0).getDate();
}

export interface DateParts {
  dd: string;
  mm: string;
  yyyy: string;
}

export interface DateCheck {
  ok: boolean;
  /** machine key for tests/styles: incomplete | impossible | future | too-old | valid */
  code: "incomplete" | "impossible" | "future" | "too-old" | "valid";
  /** human message (only when !ok and the entry is complete) */
  message: string;
  iso: string;
}

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
/* S24 — Hindi month names for the impossible-date message */
const MONTHS_HI = [
  "जनवरी",
  "फ़रवरी",
  "मार्च",
  "अप्रैल",
  "मई",
  "जून",
  "जुलाई",
  "अगस्त",
  "सितंबर",
  "अक्टूबर",
  "नवंबर",
  "दिसंबर",
];

function isoFrom(dd: string, mm: string, yyyy: string): string {
  return `${yyyy}-${mm}-${dd}`;
}

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

/**
 * Validate DD/MM/YYYY entry.
 * - `today` is injected (local midnight) so tests are deterministic.
 * - `minYear`/`maxYear` only apply to the birth preset; free has none.
 * - `lang` (S24): message language; default "en" keeps pure-function tests
 *   deterministic — the picker passes the page language.
 */
export function checkDate(
  parts: DateParts,
  preset: DatePreset,
  today: Date,
  lang: "en" | "hi" = "en",
): DateCheck {
  const dd = parts.dd.replace(/\D/g, "");
  const mm = parts.mm.replace(/\D/g, "");
  const yyyy = parts.yyyy.replace(/\D/g, "");
  if (dd.length < 2 || mm.length < 2 || yyyy.length < 4) {
    return { ok: false, code: "incomplete", message: "", iso: "" };
  }
  const d = Number(dd);
  const m = Number(mm);
  const y = Number(yyyy);
  const yMin = preset === "birth" ? today.getFullYear() - 100 : 1;
  const yMax = preset === "birth" ? today.getFullYear() : 9999;
  const hi = lang === "hi";
  const M = (idx: number) => (hi ? MONTHS_HI[idx] : MONTHS[idx]);

  if (m < 1 || m > 12) {
    return {
      ok: false,
      code: "impossible",
      message: hi ? `महीना 1–12 होना चाहिए।` : `Month must be 1–12.`,
      iso: "",
    };
  }
  if (d < 1) {
    return {
      ok: false,
      code: "impossible",
      message: hi ? `दिन 1–31 होना चाहिए।` : `Day must be 1–31.`,
      iso: "",
    };
  }
  const dim = daysInMonth(y, m);
  if (d > dim) {
    return {
      ok: false,
      code: "impossible",
      message: hi
        ? `${d} ${M(m - 1)} ${y} मौजूद नहीं है — ${M(m - 1)} ${y} में ${dim} दिन हैं।`
        : `${d} ${M(m - 1)} ${y} doesn't exist — ${M(m - 1)} ${y} has ${dim} days.`,
      iso: "",
    };
  }
  if (preset === "birth") {
    // future = any local calendar day after today's
    const entered = new Date(y, m - 1, d);
    const t0 = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    if (y > yMax || entered.getTime() > t0.getTime()) {
      return {
        ok: false,
        code: "future",
        message: hi ? "जन्म तिथि भविष्य में नहीं हो सकती।" : "The birth date can't be in the future.",
        iso: "",
      };
    }
    if (y < yMin) {
      return {
        ok: false,
        code: "too-old",
        message: hi
          ? `कृपया पिछले 100 वर्षों (${yMin}–${yMax}) के भीतर का वर्ष दर्ज करें।`
          : `Please enter a year within the last 100 years (${yMin}–${yMax}).`,
        iso: "",
      };
    }
  }
  return { ok: true, code: "valid", message: "", iso: isoFrom(dd, mm, yyyy) };
}

/** year dropdown range — birth: newest-first from the current year back 100 */
export function yearRange(
  preset: DatePreset,
  today: Date,
): { years: number[]; min: number; max: number } {
  if (preset === "birth") {
    const max = today.getFullYear();
    const min = max - 100;
    const years: number[] = [];
    for (let y = max; y >= min; y--) years.push(y);
    return { years, min, max };
  }
  const years: number[] = [];
  for (let y = 2100; y >= 1900; y--) years.push(y);
  return { years, min: 1900, max: 2100 };
}

export interface TimeParts {
  hh: string;
  mm: string;
  ampm: "am" | "pm" | "";
}

export interface TimeCheck {
  ok: boolean;
  code: "incomplete" | "hour" | "minute" | "ampm" | "valid";
  message: string;
  /** 24-hour HH:MM — the only value the backend sees */
  value: string;
}

/** `lang` (S24): message language; default "en" keeps pure-function tests deterministic. */
export function checkTime(parts: TimeParts, hour12: boolean, lang: "en" | "hi" = "en"): TimeCheck {
  const hh = parts.hh.replace(/\D/g, "");
  const mm = parts.mm.replace(/\D/g, "");
  if (hh.length < 2 || mm.length < 2) {
    return { ok: false, code: "incomplete", message: "", value: "" };
  }
  const h = Number(hh);
  const m = Number(mm);
  const hMax = hour12 ? 12 : 23;
  const hMin = hour12 ? 1 : 0;
  const hi = lang === "hi";
  if (h < hMin || h > hMax) {
    return {
      ok: false,
      code: "hour",
      message: hi ? `घंटा ${hMin}–${hMax} होना चाहिए।` : `Hour must be ${hMin}–${hMax}.`,
      value: "",
    };
  }
  if (m < 0 || m > 59) {
    return {
      ok: false,
      code: "minute",
      message: hi ? "मिनट 00–59 होने चाहिए।" : "Minutes must be 00–59.",
      value: "",
    };
  }
  // a complete hh:mm WITHOUT a meridiem is still incomplete — assuming AM
  // silently composed 10:30 PM as 10:30 AM, a wrong result (S18 owner find)
  if (hour12 && parts.ampm !== "am" && parts.ampm !== "pm") {
    return {
      ok: false,
      code: "ampm",
      message: hi ? "AM या PM चुनें।" : "Select AM or PM.",
      value: "",
    };
  }
  let h24 = h;
  if (hour12) {
    if (parts.ampm === "pm" && h !== 12) h24 = h + 12;
    if (parts.ampm === "am" && h === 12) h24 = 0;
  }
  return { ok: true, code: "valid", message: "", value: `${pad(h24)}:${pad(m)}` };
}

/** split "HH:MM" (24h) into display parts for the given mode */
export function timeToParts(
  value: string,
  hour12: boolean,
): { hh: string; mm: string; ampm: "am" | "pm" | "" } {
  const m = /^(\d{1,2}):(\d{2})/.exec(value.trim());
  if (!m) return { hh: "", mm: "", ampm: "" };
  let h = Number(m[1]);
  const min = m[2];
  if (!hour12) return { hh: pad(h), mm: min, ampm: "" };
  let ampm: "am" | "pm" = "am";
  if (h >= 12) ampm = "pm";
  if (h === 0) h = 12;
  if (h > 12) h -= 12;
  return { hh: pad(h), mm: min, ampm };
}

/** split ISO "YYYY-MM-DD" into display segments */
export function dateToParts(value: string): { dd: string; mm: string; yyyy: string } {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(value.trim());
  if (!m) return { dd: "", mm: "", yyyy: "" };
  return { dd: m[3], mm: m[2], yyyy: m[1] };
}

/**
 * Distribute pasted digits across the segments. Accepts "15/08/1990",
 * "15-08-1990", "15081990", "1508 1990", "15.08.1990" — anything whose
 * digits run in DD MM YYYY order.
 */
export function pasteDate(raw: string): DateParts {
  const digits = raw.replace(/\D/g, "").slice(0, 8);
  return {
    dd: digits.slice(0, 2),
    mm: digits.slice(2, 4),
    yyyy: digits.slice(4, 8),
  };
}

/** compose "YYYY-MM-DDTHH:MM" (datetime-local contract) or "" when incomplete */
export function composeDateTime(isoDate: string, time24: string): string {
  if (!isoDate || !time24) return "";
  return `${isoDate}T${time24}`;
}

/** split "YYYY-MM-DDTHH:MM" into its date and time halves */
export function splitDateTime(value: string): { date: string; time: string } {
  const v = value.trim();
  if (!v) return { date: "", time: "" };
  const [d, t = ""] = v.split("T");
  return {
    date: /^\d{4}-\d{2}-\d{2}$/.test(d) ? d : "",
    time: /^\d{2}:\d{2}/.test(t) ? t.slice(0, 5) : "",
  };
}

/** local-midnight "today" — the single place the wall clock is consulted */
export function todayMidnight(now: Date = new Date()): Date {
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

export { MONTHS };
