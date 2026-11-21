/**
 * Per-tool result mapping — Epic 14 S14-2 AC-2 (design/output-spec.md §4).
 * Each registry endpoint maps its API `data` onto the shared block spec:
 * B1 verdict card (eyebrow/main/sub/status), B2 chips, B3 meaning (from the
 * API `interpretation`), B4 detail cards. Keys listed in `hide` are consumed
 * here; anything unlisted still renders as generic rows (honesty rule — the
 * frontend never hides API data).
 */
import type { Cell, Chip, DetailCard, ToolMapEntry } from "./calculator-renderer-types";

const fmtDate = (iso: unknown): string => {
  const s = iso == null ? "" : String(iso);
  const d = new Date(s);
  if (!s || Number.isNaN(d.getTime())) return s || "—";
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
};
const fmtDateTime = (iso: unknown): string => {
  const s = iso == null ? "" : String(iso);
  const d = new Date(s);
  if (!s || Number.isNaN(d.getTime())) return s || "—";
  return `${fmtDate(s)}, ${d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}`;
};
const ordinal = (n: number): string => {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return `${n}st`;
  if (mod10 === 2 && mod100 !== 12) return `${n}nd`;
  if (mod10 === 3 && mod100 !== 13) return `${n}rd`;
  return `${n}th`;
};
const str = (v: unknown): string => (v == null ? "" : String(v));
const num = (v: unknown): number => (typeof v === "number" ? v : Number(v) || 0);
const list = (v: unknown): unknown[] => (Array.isArray(v) ? v : []);
const illum = (v: unknown): string => (num(v) <= 1 ? `${Math.round(num(v) * 100)}%` : `${num(v)}%`);

const row = (k: string, v: unknown): [string, string] => [k, str(v) || "—"];
const periodStatus = (start: unknown, end: unknown): Cell | "" => {
  const now = Date.now();
  const s = new Date(str(start)).getTime();
  const e = new Date(str(end)).getTime();
  if (Number.isNaN(s) || Number.isNaN(e)) return "";
  const label = now < s ? "Upcoming" : now > e ? "Past" : "Current";
  return { text: label, status: label === "Current" ? "info" : undefined };
};

const LO_SHU_PLANETS: Record<number, string> = {
  1: "Sun",
  2: "Moon",
  3: "Jupiter",
  4: "Rahu",
  5: "Mercury",
  6: "Venus",
  7: "Ketu",
  8: "Saturn",
  9: "Mars",
};

export const CALC_MAP: Record<string, ToolMapEntry> = {
  "/calculators/rashi": {
    hide: ["rashi", "rashiIndex", "nakshatra", "nakshatraIndex", "pada", "lord", "nakshatra_lord"],
    build: (d) => ({
      eyebrow: "MOON SIGN",
      main: str(d.rashi),
      sub: `Nakshatra ${str(d.nakshatra)}, pada ${num(d.pada)}`,
      chips: [
        { label: "Nakshatra", value: str(d.nakshatra) },
        { label: "Pada", value: str(d.pada) },
        { label: "Sign lord", value: str(d.lord) },
        { label: "Nakshatra lord", value: str(d.nakshatra_lord) },
      ],
    }),
  },

  "/calculators/nakshatra": {
    hide: [
      "nakshatra",
      "nakshatra_index",
      "pada",
      "moon_sign",
      "nakshatra_lord",
      "balance_at_birth_years",
    ],
    build: (d) => ({
      eyebrow: "NAKSHATRA",
      main: str(d.nakshatra),
      sub: `Pada ${num(d.pada)} · Moon in ${str(d.moon_sign)}`,
      chips: [
        { label: "Pada", value: str(d.pada) },
        { label: "Nakshatra lord", value: str(d.nakshatra_lord) },
        { label: "Moon sign", value: str(d.moon_sign) },
      ],
      details: [
        {
          title: "Dasha anchor",
          rows: [
            row("Balance at birth", `${num(d.balance_at_birth_years)} years`),
            row(
              "Meaning",
              "The remaining years of this nakshatra's lord set your first Vimshottari dasha.",
            ),
          ],
        },
      ],
    }),
  },

  "/calculators/lagna": {
    hide: ["lagna", "sign_index", "nakshatra", "pada", "lord"],
    build: (d) => ({
      eyebrow: "ASCENDANT (LAGNA)",
      main: str(d.lagna),
      sub: `Nakshatra ${str(d.nakshatra)}, pada ${num(d.pada)}`,
      chips: [
        { label: "Lagna lord", value: str(d.lord) },
        { label: "Nakshatra", value: str(d.nakshatra) },
        { label: "Pada", value: str(d.pada) },
      ],
    }),
  },

  "/calculators/vimshottari-dasha": {
    hide: [
      "moon_nakshatra",
      "moon_nakshatra_lord",
      "balance_at_birth_years",
      "mahadashas",
      "current",
      "active_antardashas",
    ],
    build: (d) => {
      const cur = (d.current ?? {}) as Record<string, unknown>;
      const mahas = list(d.mahadashas) as Array<Record<string, unknown>>;
      const subs = list(d.active_antardashas) as Array<Record<string, unknown>>;
      const pct = Math.round(num(cur.elapsed_fraction) * 100);
      return {
        eyebrow: "CURRENT MAHADASHA",
        main: str(cur.mahadasha_lord),
        sub: `${str(cur.antardasha_lord)} antardasha · until ${fmtDate(cur.antardasha_end)}`,
        chips: [
          {
            label: "Next antardasha",
            value: `${str(cur.next_antardasha_lord)} from ${fmtDate(cur.next_antardasha_start)}`,
          },
          {
            label: "Birth nakshatra",
            value: `${str(d.moon_nakshatra)} (${str(d.moon_nakshatra_lord)})`,
          },
          { label: "Balance at birth", value: `${num(d.balance_at_birth_years)} years` },
        ],
        details: [
          {
            bar: { pct, label: `${pct}% of the antardasha elapsed` },
          },
          {
            title: "Mahadasha timeline",
            table: {
              head: ["Lord", "From", "To", ""],
              rows: mahas.map((m) => {
                const status = periodStatus(m.start, m.end);
                return [str(m.lord), fmtDate(m.start), fmtDate(m.end), status ?? ""];
              }),
            },
          },
          {
            title: "Antardashas within the running mahadasha",
            table: {
              head: ["Lord", "From", "To", ""],
              rows: subs.map((m) => {
                const status = periodStatus(m.start, m.end);
                return [str(m.lord), fmtDate(m.start), fmtDate(m.end), status ?? ""];
              }),
            },
          },
        ],
      };
    },
  },

  "/calculators/sade-sati": {
    hide: [
      "in_sade_sati",
      "phase",
      "in_dhaiya",
      "dhaiya_house",
      "moon_sign",
      "moon_sign_index",
      "saturn_sign",
      "saturn_sign_index",
      "saturn_offset_from_moon",
      "current",
      "next",
      "phase_windows",
      "note",
      "verified",
    ],
    build: (d) => {
      const inWindow = d.in_sade_sati === true;
      const cur = (d.current ?? null) as Record<string, unknown> | null;
      const next = (d.next ?? null) as Record<string, unknown> | null;
      const phases = list(d.phase_windows) as Array<Record<string, unknown>>;
      const dhaiya = num(d.dhaiya_house);
      const chips: Chip[] = [];
      if (inWindow && d.phase != null)
        chips.push({ label: "Phase", value: `Phase ${num(d.phase)} of 3` });
      if (d.in_dhaiya === true)
        chips.push({ label: "Dhaiya", value: `${ordinal(dhaiya)} from Moon`, status: "info" });
      return {
        eyebrow: "SADE SATI",
        main: inWindow ? "In Sade Sati" : "Not in Sade Sati",
        status: inWindow ? "bad" : "good",
        sub: `Saturn in ${str(d.saturn_sign)} — ${ordinal(num(d.saturn_offset_from_moon))} from your Moon (${str(d.moon_sign)})`,
        chips,
        details: [
          {
            title: "Windows",
            rows: [
              cur
                ? row("Current window", `${fmtDate(cur.start)} → ${fmtDate(cur.end)}`)
                : row("Current window", "none open"),
              next
                ? row("Next window", `${fmtDate(next.start)} → ${fmtDate(next.end)}`)
                : row("Next window", "—"),
            ],
          },
          phases.length
            ? {
                title: "Phase timeline",
                table: {
                  head: ["Phase", "From", "To"],
                  rows: phases.map((p) => [
                    `Phase ${num(p.phase)}`,
                    fmtDate(p.start),
                    fmtDate(p.end),
                  ]),
                },
              }
            : null,
        ].filter(Boolean) as DetailCard[],
      };
    },
  },

  "/calculators/kaal-sarp": {
    hide: ["present", "axis", "rahu_house", "type", "planets", "note", "verified"],
    build: (d) => {
      const planets = list(d.planets) as Array<Record<string, unknown>>;
      const present = d.present === true;
      return {
        eyebrow: "KAAL SARP YOGA",
        main: present ? (str(d.type) ? `Full — ${str(d.type)}` : "Present") : "Not present",
        status: present ? "bad" : "good",
        chips: [{ label: "Rahu house", value: str(d.rahu_house) }],
        details: [
          {
            title: "Grahas against the Rahu–Ketu axis",
            table: {
              head: ["Planet", "Sign", "Degree", "House", "Axis side"],
              rows: planets.map((p) => [
                str(p.planet),
                str(p.sign),
                `${num(p.degree_in_sign)}°`,
                str(p.house),
                str(p.side) === "ketu_to_rahu" ? "Ketu → Rahu" : "Rahu → Ketu",
              ]),
            },
            legend:
              "The planet table shows each graha's side of the axis so a partial pattern is visible without being asserted as yoga.",
          },
        ],
      };
    },
  },

  "/calculators/mangal-dosha": {
    hide: [
      "is_manglik",
      "from_lagna",
      "from_moon",
      "from_venus",
      "mars_houses",
      "cancelled",
      "cancellation_reason",
      "detail",
      "verified",
      "gender",
    ],
    build: (d) => {
      const houses = (d.mars_houses ?? {}) as Record<string, unknown>;
      const manglik = d.is_manglik === true;
      const cancelled = d.cancelled === true;
      const chips: Chip[] = [
        { label: "From Lagna", value: d.from_lagna ? "Yes" : "No" },
        { label: "From Moon", value: d.from_moon ? "Yes" : "No" },
        { label: "From Venus", value: d.from_venus ? "Yes" : "No" },
      ];
      if (cancelled)
        chips.push({ label: "Cancellation", value: str(d.cancellation_reason), status: "info" });
      return {
        eyebrow: "MANGAL DOSHA",
        main: manglik ? (cancelled ? "Manglik — cancelled" : "Manglik") : "Not Manglik",
        status: manglik && !cancelled ? "bad" : manglik ? "info" : "good",
        chips,
        details: [
          {
            title: "Mars placement (raw, never suppressed)",
            rows: [
              row("House from Lagna", houses.lagna),
              row("House from Moon", houses.moon),
              row("House from Venus", houses.venus),
              str(d.cancellation_reason) ? row("Cancellation reason", d.cancellation_reason) : null,
              str(d.gender) ? row("Gender (informational)", d.gender) : null,
            ].filter(Boolean) as Array<[string, string]>,
          },
        ],
      };
    },
  },

  "/calculators/karakas": {
    hide: ["scheme", "karakas", "atmakaraka"],
    build: (d) => {
      const karakas = list(d.karakas) as Array<Record<string, unknown>>;
      return {
        eyebrow: "SOUL SIGNIFICATOR",
        main: str(d.atmakaraka),
        details: [
          {
            title: "Full ranking",
            table: {
              head: ["Karaka", "Planet", "Sign", "Degree"],
              rows: karakas.map((k) => [
                { text: str(k.karaka), highlight: k.is_atmakaraka === true },
                { text: str(k.planet), highlight: k.is_atmakaraka === true },
                str(k.sign),
                `${num(k.degree_in_sign)}°`,
              ]),
            },
            legend: str(d.scheme),
          },
        ],
      };
    },
  },

  "/calculators/ishta-devata": {
    hide: [
      "atmakaraka",
      "navamsha_sign",
      "karakamsha_sign",
      "jivanmukta_sign",
      "indicating_planet",
      "derivation_source",
      "ishta_devata",
      "alternates",
      "disputed",
      "note",
      "verified",
    ],
    build: (d) => {
      const atma = (d.atmakaraka ?? {}) as Record<string, unknown>;
      const alternates = list(d.alternates).map(str).filter(Boolean);
      return {
        eyebrow: "ISHTA DEVATA",
        main: str(d.ishta_devata),
        sub: `via ${str(atma.planet)} (${str(atma.karaka)}) — 12th from Karakamsha`,
        chips: [
          { label: "Atmakaraka", value: str(atma.planet) },
          { label: "Karakamsha", value: str(d.karakamsha_sign) },
          { label: "Indicating planet", value: str(d.indicating_planet) },
        ],
        details: [
          {
            title: "Derivation",
            rows: [
              row("Navamsha sign", d.navamsha_sign),
              row("Jivanmukta sign", d.jivanmukta_sign),
              row("Source", d.derivation_source),
              alternates.length ? row("Alternate readings", alternates.join(" · ")) : null,
              d.disputed === true
                ? row("Disputed derivation", "Yes — schools differ for this placement")
                : null,
            ].filter(Boolean) as Array<[string, string]>,
          },
        ],
      };
    },
  },

  "/calculators/transits": {
    hide: ["as_of", "timezone", "grahas"],
    build: (d) => {
      const grahas = list(d.grahas) as Array<Record<string, unknown>>;
      return {
        eyebrow: "CURRENT SKY",
        main: fmtDateTime(d.as_of),
        chips: [
          { label: "Location", value: str(d.timezone) },
          { label: "Bodies", value: str(grahas.length) },
        ],
        details: [
          {
            title: "Planetary positions",
            table: {
              head: ["Planet", "Sign", "Degree", "Motion"],
              rows: grahas.map((g) => [
                str(g.planet),
                str(g.sign),
                `${num(g.degree_in_sign)}°`,
                g.retrograde === true ? { text: "Retrograde", badge: true } : "Direct",
              ]),
            },
          },
        ],
      };
    },
  },

  "/calculators/moon-phase": {
    hide: [
      "phase",
      "illumination",
      "waxing",
      "moon_age_days",
      "prev_new_moon",
      "next_new_moon",
      "prev_full_moon",
      "next_full_moon",
      "rashi",
    ],
    build: (d) => ({
      eyebrow: "MOON PHASE",
      main: str(d.phase),
      chips: [
        { label: "Illumination", value: illum(d.illumination) },
        { label: "Motion", value: d.waxing ? "Waxing" : "Waning" },
        { label: "Moon age", value: `${Math.round(num(d.moon_age_days))} days` },
      ],
      details: [
        {
          title: "Neighbouring phases",
          rows: [
            row("Previous new moon", fmtDateTime(d.prev_new_moon)),
            row("Next new moon", fmtDateTime(d.next_new_moon)),
            row("Previous full moon", fmtDateTime(d.prev_full_moon)),
            row("Next full moon", fmtDateTime(d.next_full_moon)),
            row("Moon's rashi", d.rashi),
          ],
        },
      ],
    }),
  },

  "/calculators/sun-sign": {
    hide: [
      "tropical_sign",
      "tropical_longitude",
      "rashi",
      "rashiIndex",
      "nakshatra",
      "nakshatraIndex",
      "pada",
      "lord",
      "element",
      "sanskrit_name",
      "approximate_dates",
      "evaluated_at",
      "cusp",
    ],
    build: (d) => {
      const cusp = (d.cusp ?? null) as Record<string, unknown> | null;
      return {
        eyebrow: "WESTERN SUN SIGN",
        main: str(d.tropical_sign),
        sub: `${str(d.sanskrit_name)} · Vedic rashi ${str(d.rashi)}`,
        chips: [
          { label: "Element", value: str(d.element) },
          { label: "Nakshatra", value: `${str(d.nakshatra)} ${num(d.pada)}` },
          { label: "Sign lord", value: str(d.lord) },
        ],
        details: [
          {
            title: "Details",
            rows: [
              row("Sun longitude", `${num(d.tropical_longitude)}° tropical`),
              row("Approximate dates", d.approximate_dates),
              row("Computed at", fmtDateTime(d.evaluated_at)),
              cusp
                ? row(
                    "Cusp warning",
                    `Only ${num(cusp.degrees_to_boundary)}° from ${str(cusp.neighbouring_sign)} — ${str(cusp.warning)}`,
                  )
                : null,
            ].filter(Boolean) as Array<[string, string]>,
          },
        ],
      };
    },
  },

  "/calculators/destiny-number": {
    hide: ["destiny", "destiny_sum", "master", "mulank", "destiny_lord", "mulank_lord"],
    build: (d) => ({
      eyebrow: "DESTINY NUMBER (BHAGYANK)",
      main: str(d.destiny),
      chips: [
        { label: "Mulank", value: str(d.mulank) },
        { label: "Destiny lord", value: str(d.destiny_lord) },
        { label: "Mulank lord", value: str(d.mulank_lord) },
        ...(d.master === true
          ? [{ label: "Master number", value: "Yes", status: "info" as const }]
          : []),
      ],
      details: [
        {
          title: "Working",
          rows: [
            row("Full sum before reduction", d.destiny_sum),
            row("Master number", d.master ? "Yes" : "No"),
          ],
        },
      ],
    }),
  },

  "/calculators/numerology": {
    hide: ["mulank", "bhagyank", "name"],
    build: (d) => {
      const mulank = (d.mulank ?? {}) as Record<string, unknown>;
      const bhagyank = (d.bhagyank ?? {}) as Record<string, unknown>;
      const name = (d.name ?? null) as Record<string, unknown> | null;
      return {
        eyebrow: "VEDIC NUMEROLOGY",
        main: str(bhagyank.value),
        sub: "Bhagyank (destiny number)",
        chips: [
          { label: "Mulank", value: str(mulank.value) },
          ...(name ? [{ label: "Namank", value: str(name.root) }] : []),
        ],
        details: [
          {
            title: "Your numbers",
            rows: [
              row("Mulank", `${str(mulank.value)} — ${str(mulank.verdict)}`),
              row("Bhagyank", `${str(bhagyank.value)} — ${str(bhagyank.verdict)}`),
              name
                ? row("Namank", `${str(name.root)} — ${str(name.verdict)} (lord ${str(name.lord)})`)
                : null,
            ].filter(Boolean) as Array<[string, string]>,
          },
        ],
        meaning: { text: [str(bhagyank.meaning)].filter(Boolean) },
      };
    },
  },

  "/calculators/lo-shu": {
    hide: ["grid", "missing", "repeated", "lines"],
    build: (d) => {
      const grid = list(d.grid) as Array<Record<string, unknown>>;
      const missing = list(d.missing).map(num);
      const repeated = list(d.repeated).map(num);
      const lines = list(d.lines) as Array<Record<string, unknown>>;
      return {
        eyebrow: "LO SHU GRID",
        main: missing.length ? `Missing ${missing.join(", ")}` : "All nine numbers present",
        chips: [
          { label: "Missing", value: missing.length ? missing.join(", ") : "none" },
          { label: "Repeated", value: repeated.length ? repeated.join(", ") : "none" },
        ],
        details: [
          {
            loshu: grid.map((g) => ({ number: num(g.number), count: num(g.count) })),
            legend: "Dashed cells are missing from your birth date; each cell names its planet.",
          },
          {
            title: "Planes and arrows",
            table: {
              head: ["Line", "Type", "Complete"],
              rows: lines.map((l) => [
                str(l.name),
                str(l.kind) === "plane" ? "Plane" : "Arrow",
                l.complete === true
                  ? { text: "Yes", status: "good" }
                  : { text: "No", status: "bad" },
              ]),
            },
          },
        ],
      };
    },
  },

  "/calculators/name-numerology": {
    hide: ["sum", "root", "lord", "letters", "words", "note", "owner_compatibility"],
    build: (d) => {
      const words = list(d.words) as Array<Record<string, unknown>>;
      const letters = list(d.letters) as Array<Record<string, unknown>>;
      const compat = (d.owner_compatibility ?? null) as Record<string, unknown> | null;
      return {
        eyebrow: "NAME NUMBER",
        main: str(d.root),
        chips: [
          { label: "Lord", value: str(d.lord) },
          { label: "Chaldean sum", value: str(d.sum) },
        ],
        details: [
          {
            title: "Per-word subtotals",
            table: {
              head: ["Word", "Sum", "Root"],
              rows: words.map((w) => [str(w.word), str(w.sum), str(w.root)]),
            },
          },
          {
            title: "Letter values",
            list: [letters.map((l) => `${str(l.letter)}(${str(l.value)})`).join("  ")],
          },
          compat
            ? {
                title: "Owner compatibility (with your birth date)",
                rows: [
                  row("Owner mulank", compat.owner_mulank),
                  row("Owner bhagyank", compat.owner_bhagyank),
                  row("Relation to mulank", compat.relation_to_mulank),
                  row("Relation to bhagyank", compat.relation_to_bhagyank),
                ],
              }
            : null,
        ].filter(Boolean) as DetailCard[],
      };
    },
  },

  "/calculators/mobile-numerology": {
    hide: [
      "raw",
      "digits_clean",
      "prefix_stripped",
      "sum",
      "root",
      "lord",
      "length_warning",
      "note",
    ],
    build: (d) => ({
      eyebrow: "MOBILE NUMBER",
      main: str(d.root),
      chips: [
        { label: "Lord", value: str(d.lord) },
        { label: "Digit sum", value: str(d.sum) },
      ],
      details: [
        {
          title: "Working",
          rows: [
            row("Digits read", d.digits_clean),
            row("Prefix stripped", d.prefix_stripped ? str(d.prefix_stripped) : "none"),
            d.length_warning ? row("Length warning", d.length_warning) : null,
            row("Method", d.note),
          ].filter(Boolean) as Array<[string, string]>,
        },
      ],
    }),
  },

  "/calculators/vehicle-plate": {
    hide: [
      "plate",
      "state_code",
      "rto_code",
      "series_letters",
      "number_portion",
      "owner",
      "school_a",
      "school_b",
      "verdict",
      "verdict_reasons",
      "digit_clash_warnings",
    ],
    build: (d) => {
      const owner = (d.owner ?? {}) as Record<string, unknown>;
      const schoolA = (d.school_a ?? null) as Record<string, unknown> | null;
      const schoolB = (d.school_b ?? null) as Record<string, unknown> | null;
      const reasons = list(d.verdict_reasons).map(str).filter(Boolean);
      const warnings = list(d.digit_clash_warnings).map(str).filter(Boolean);
      const status =
        str(d.verdict) === "Lucky"
          ? "good"
          : str(d.verdict) === "Not suggested"
            ? "bad"
            : str(d.verdict) === "Mixed"
              ? "info"
              : undefined;
      return {
        eyebrow: "PLATE VERDICT",
        main: str(d.verdict),
        status,
        chips: [
          { label: "Owner mulank", value: str(owner.mulank) },
          { label: "Owner bhagyank", value: str(owner.bhagyank) },
        ],
        details: [
          {
            title: "Plate structure",
            rows: [
              row("Plate", d.plate),
              row("State code", d.state_code),
              row("RTO code", d.rto_code),
              row("Series", d.series_letters),
              row("Number portion", d.number_portion),
            ],
          },
          schoolA
            ? {
                title: "School A (number digits)",
                rows: [row("Root", schoolA.root), row("Working", schoolA.label)],
              }
            : null,
          schoolB
            ? {
                title: "School B (Chaldean letters + digits)",
                rows: [row("Root", schoolB.root), row("Working", schoolB.label)],
              }
            : null,
          reasons.length ? { title: "Why", list: reasons } : null,
          warnings.length ? { title: "Digit clash warnings", list: warnings } : null,
        ].filter(Boolean) as DetailCard[],
      };
    },
  },

  "/calculators/age": {
    hide: [
      "years",
      "months",
      "days",
      "total_days",
      "total_weeks",
      "total_hours",
      "day_of_week",
      "next_birthday",
    ],
    build: (d) => {
      const nb = (d.next_birthday ?? {}) as Record<string, unknown>;
      return {
        eyebrow: "AGE",
        main: `${num(d.years)}y ${num(d.months)}m ${num(d.days)}d`,
        chips: [
          { label: "Total days", value: str(d.total_days) },
          { label: "Born on a", value: str(d.day_of_week) },
        ],
        details: [
          {
            title: "Totals",
            rows: [
              row("Total weeks", d.total_weeks),
              row("Total hours", d.total_hours),
              row(
                "Next birthday",
                `${fmtDate(nb.date)} (${str(nb.days_until)} days, a ${str(nb.weekday)})`,
              ),
            ],
          },
        ],
      };
    },
  },

  "/calculators/name-compatibility": {
    hide: ["a_root", "b_root", "combined_root", "band", "note"],
    build: (d) => ({
      eyebrow: "NAME COMPATIBILITY",
      main: str(d.band),
      chips: [
        { label: "First name root", value: str(d.a_root) },
        { label: "Second name root", value: str(d.b_root) },
        { label: "Combined root", value: str(d.combined_root) },
      ],
    }),
  },

  "/calculators/flames": {
    hide: ["result", "letters_removed", "remaining_letters", "rounds"],
    build: (d) => {
      const rounds = list(d.rounds).map(str).filter(Boolean);
      return {
        eyebrow: "FLAMES",
        main: str(d.result),
        chips: [
          { label: "Letters cancelled", value: str(d.letters_removed) },
          { label: "Letters remaining", value: str(d.remaining_letters) },
        ],
        details: rounds.length ? [{ title: "Round-by-round trace", list: rounds }] : undefined,
      };
    },
  },

  "/calculators/love": {
    hide: ["score", "band", "counts", "steps", "note"],
    build: (d) => funScore(d, "LOVE SCORE"),
  },

  "/calculators/friendship": {
    hide: ["score", "band", "counts", "steps", "note"],
    build: (d) => funScore(d, "FRIENDSHIP SCORE"),
  },
};

function funScore(d: Record<string, unknown>, eyebrow: string) {
  const counts = (d.counts ?? {}) as Record<string, unknown>;
  const steps = list(d.steps).map(str).filter(Boolean);
  return {
    eyebrow,
    main: str(d.score),
    chips: [{ label: "Band", value: str(d.band) }],
    details: [
      {
        title: "Letter counts",
        rows: Object.entries(counts).map(([k, v]) => row(k.toUpperCase(), v)),
      },
      steps.length ? { title: "Fold steps", list: steps } : null,
    ].filter(Boolean) as DetailCard[],
  };
}

export const LO_SHU_PLANET_NAMES = LO_SHU_PLANETS;
