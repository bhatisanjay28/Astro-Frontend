/**
 * Epic 3.2b — monthly Panchang calendar island for the city pages.
 * Toggled by the "Monthly view" link in PanchangDetail (?view=calendar&month=
 * YYYY-MM). Each day cell fills from the live /api/v1/panchang city mode —
 * the same (city, date) reads the backend caches write-through, so a month
 * view is cheap after first render. Day-view fetch/limits stay owned by the
 * inline script in PanchangDetail; we only ask it to re-show via an event.
 */

interface DayPayload {
  tithi?: Array<{ name?: string }>;
  nakshatra?: Array<{ name?: string }>;
}

/* S24 — calendar chrome follows the page language (tithi/nakshatra names
   come from the API; P5 adds ?lang=hi to the panchang engine) */
const isHi = (): boolean => (document.documentElement.lang || "en").toLowerCase().startsWith("hi");

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
const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const WEEKDAYS_HI = ["रवि", "सोम", "मंगल", "बुध", "गुरु", "शुक्र", "शनि"];

function esc(s: string): string {
  return s.replace(
    /[&<>"']/g,
    (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[ch] ?? ch,
  );
}

function todayISO(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function monthKey(y: number, m0: number): string {
  return `${y}-${String(m0 + 1).padStart(2, "0")}`;
}

function parseMonth(raw: string | null): [number, number] {
  const m = /^(\d{4})-(\d{2})$/.exec(raw ?? "");
  const now = new Date();
  if (!m) return [now.getFullYear(), now.getMonth()];
  const y = Number(m[1]);
  const mo = Number(m[2]) - 1;
  if (mo < 0 || mo > 11) return [now.getFullYear(), now.getMonth()];
  return [y, mo];
}

async function fetchDay(
  apiBase: string,
  citySlug: string,
  dateISO: string,
): Promise<DayPayload | null> {
  try {
    // S24 — hi pages get localized tithi/nakshatra names (cache is lang-neutral)
    const langQ = isHi() ? "&lang=hi" : "";
    const res = await fetch(
      `${apiBase}/api/v1/panchang?city=${encodeURIComponent(citySlug)}&date=${dateISO}${langQ}`,
    );
    if (!res.ok) return null;
    const body = (await res.json()) as { data?: DayPayload };
    return body.data ?? null;
  } catch {
    return null;
  }
}

function setup(): void {
  const section = document.querySelector<HTMLElement>(".pd[data-city-slug]");
  const calEl = section?.querySelector<HTMLElement>("[data-pd-calendar]");
  const link = section?.querySelector<HTMLButtonElement>("[data-pd-monthly]");
  if (!section || !calEl || !link) return;
  const apiBase = section.dataset.apiBase ?? "";
  const citySlug = section.dataset.citySlug ?? "";
  if (!apiBase || !citySlug) return;

  // arrow consts AFTER the guard so TypeScript's narrowing holds in closures
  const setUrl = (view: "calendar" | "day", y?: number, m0?: number): void => {
    const url = new URL(location.href);
    if (view === "calendar" && y !== undefined && m0 !== undefined) {
      url.searchParams.set("view", "calendar");
      url.searchParams.set("month", monthKey(y, m0));
    } else {
      url.searchParams.delete("view");
      url.searchParams.delete("month");
    }
    history.replaceState(null, "", url.toString());
  };

  const render = async (y: number, m0: number): Promise<void> => {
    const days = new Date(y, m0 + 1, 0).getDate();
    const today = todayISO();
    const hi = isHi();
    const MONTH_L = hi ? MONTHS_HI : MONTHS;
    const WEEK_L = hi ? WEEKDAYS_HI : WEEKDAYS;
    let html =
      `<div class="cal-nav">` +
      `<button type="button" data-cal-prev aria-label="${hi ? "पिछला महीना" : "Previous month"}">‹ ${hi ? "पिछला" : "Prev"}</button>` +
      `<span class="cal-title">${MONTH_L[m0] ?? ""} ${y}</span>` +
      `<button type="button" data-cal-next aria-label="${hi ? "अगला महीना" : "Next month"}">${hi ? "अगला" : "Next"} ›</button>` +
      `</div><div class="cal-grid">`;
    for (const w of WEEK_L) html += `<div class="cal-head">${w}</div>`;
    const firstDow = new Date(y, m0, 1).getDay();
    for (let i = 0; i < firstDow; i += 1) html += `<div class="cal-day" aria-hidden="true"></div>`;
    for (let d = 1; d <= days; d += 1) {
      const iso = `${monthKey(y, m0)}-${String(d).padStart(2, "0")}`;
      html +=
        `<div class="cal-day${iso === today ? " today" : ""}" data-cal-day="${iso}">` +
        `<span class="d">${d}</span><span class="sk">…</span></div>`;
    }
    calEl.innerHTML = `${html}</div>`;

    calEl.querySelector("[data-cal-prev]")?.addEventListener("click", () => {
      const [py, pm] = cur;
      enterCalendar(pm === 0 ? py - 1 : py, pm === 0 ? 11 : pm - 1);
    });
    calEl.querySelector("[data-cal-next]")?.addEventListener("click", () => {
      const [py, pm] = cur;
      enterCalendar(pm === 11 ? py + 1 : py, pm === 11 ? 0 : pm + 1);
    });

    // fill cells in chunks of 6 concurrent reads
    for (let start = 1; start <= days; start += 6) {
      const chunk: Array<Promise<void>> = [];
      for (let d = start; d <= Math.min(start + 5, days); d += 1) {
        const iso = `${monthKey(y, m0)}-${String(d).padStart(2, "0")}`;
        const cell = calEl.querySelector<HTMLElement>(`[data-cal-day="${iso}"]`);
        if (!cell) continue;
        chunk.push(
          fetchDay(apiBase, citySlug, iso).then((data) => {
            const tithi = data?.tithi?.[0]?.name;
            const nak = data?.nakshatra?.[0]?.name;
            cell.innerHTML =
              `<span class="d">${d}</span>` +
              `<span class="t">${tithi ? esc(tithi) : "—"}</span>` +
              (nak ? `<span class="n">${esc(nak)}</span>` : "");
          }),
        );
      }
      await Promise.all(chunk);
    }
  };

  const enterCalendar = (y: number, m0: number): void => {
    cur = [y, m0];
    section.classList.add("cal-mode");
    calEl.removeAttribute("hidden");
    link.textContent = isHi() ? "दैनिक दृश्य" : "Day view";
    setUrl("calendar", y, m0);
    void render(y, m0);
  };

  const exitCalendar = (): void => {
    section.classList.remove("cal-mode");
    calEl.setAttribute("hidden", "");
    link.textContent = isHi() ? "मासिक दृश्य" : "Monthly view";
    setUrl("day");
    // the inline day script owns the day fetch; ask it to (re)load
    section.dispatchEvent(new CustomEvent("pd:show-day"));
  };

  let cur: [number, number] = [new Date().getFullYear(), new Date().getMonth()];

  const params = new URLSearchParams(location.search);
  if (params.get("view") === "calendar") {
    const [y, m0] = parseMonth(params.get("month"));
    enterCalendar(y, m0);
  }
  link.addEventListener("click", (e) => {
    e.preventDefault();
    if (section.classList.contains("cal-mode")) {
      exitCalendar();
    } else {
      const now = new Date();
      const mParam = parseMonth(params.get("month"));
      // fresh click always starts at the month the URL asks for, else now
      enterCalendar(mParam[0], params.get("month") ? mParam[1] : now.getMonth());
    }
  });
}

void setup();
