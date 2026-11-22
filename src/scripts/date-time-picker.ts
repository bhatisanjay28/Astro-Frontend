/**
 * DateField behaviour (S16-1) — enhances every [data-dt] rendered by
 * DateField.astro:
 *   • typeable segments with auto-advance / auto-pad, Backspace-back,
 *     ArrowUp/Down bump, paste distribution (AC-1, AC-4)
 *   • calendar popup: month + year dropdowns (newest year first, 100 years
 *     back on the birth preset), prev/next, Today, keyboard navigation,
 *     viewport-aware placement (AC-2, AC-7)
 *   • impossible/future validation with clear messages as the entry
 *     completes and on submit; the hidden input stays empty while invalid
 *     (AC-3)
 *   • submit guard: required-but-empty or incomplete entries block the
 *     form's own submit handlers and focus the first segment (AC-4)
 *   • seams: window.vyDateTime.set(input, value) re-renders segments from a
 *     machine value (admin prefill, PanchangDetail prev/next), rebind()
 *     adopts dynamically injected fields (AC-8)
 *
 * Pure logic lives in date-time-core.ts (unit-tested); this file owns DOM.
 */
import {
  checkDate,
  checkTime,
  composeDateTime,
  dateToParts,
  daysInMonth,
  MONTHS,
  normalizeSegment,
  pasteDate,
  splitDateTime,
  timeToParts,
  todayMidnight,
  yearRange,
  type DatePreset,
  type TimeCheck,
} from "./date-time-core";

const ERROR_ICON =
  '<svg class="dt-err-ico" width="13" height="13" viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.3 4.1 2.9 17a2 2 0 0 0 1.7 3h14.8a2 2 0 0 0 1.7-3L13.7 4.1a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4M12 16.5h.01"/></svg>';

/** Popup styles — injected once; token vars keep it on-theme everywhere. */
function injectStyles(): void {
  if (document.getElementById("vydt-styles")) return;
  const style = document.createElement("style");
  style.id = "vydt-styles";
  style.textContent = `
    .dt-pop {
      position: absolute;
      top: calc(100% + 6px);
      left: 0;
      z-index: 60;
      width: min(21rem, 100vw - 24px);
      box-sizing: border-box;
      padding: var(--space-3, 12px);
      background: var(--bg-raised, var(--color-light-surface, #fff));
      border: 1px solid var(--color-border-strong, var(--color-light-outline, #b3a89e));
      border-radius: var(--radius-card, 12px);
      box-shadow: 0 12px 32px rgba(28, 27, 26, 0.22);
    }
    .dt-pop.above { top: auto; bottom: calc(100% + 6px); }
    .dt-pop-head { display: flex; align-items: center; gap: 4px; margin-bottom: 8px; }
    /* selectors are .dt-prefixed (≥ 0,2,0) so host pages' broad button/select
       rules (.kl button — 0,1,1) can't repaint the popup either */
    .dt-pop .dt-nav {
      flex: none;
      width: 32px; height: 32px;
      min-height: 0; padding: 0;
      display: flex; align-items: center; justify-content: center;
      background: transparent; border: none; border-radius: 8px;
      color: var(--text-body, var(--color-light-on-surface, #1c1b1a));
      cursor: pointer;
    }
    .dt-pop .dt-nav:hover { background: rgba(28, 27, 26, 0.07); }
    .dt-pop .dt-nav:disabled { opacity: 0.35; cursor: default; background: transparent; }
    .dt-pop .dt-nav:focus-visible { outline: 2px solid var(--gold, #c9a227); outline-offset: -2px; }
    .dt-pop .dt-sel {
      flex: 1; min-width: 0;
      height: 32px;
      min-height: 0;
      padding: 0 4px;
      background: transparent;
      border: 1px solid var(--color-border, var(--color-light-outline-variant, #dec0b7));
      border-radius: 8px;
      color: var(--text-body, var(--color-light-on-surface, #1c1b1a));
      font: inherit; font-size: 13px; font-weight: 600;
      cursor: pointer;
    }
    .dt-pop .dt-sel-year { flex: 0 0 5.5rem; }
    .dt-pop .dt-sel:focus-visible { outline: 2px solid var(--gold, #c9a227); outline-offset: -2px; }
    .dt-pop .dt-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 1px; }
    .dt-pop .dt-dow {
      text-align: center;
      font-size: 10px; font-weight: 700; letter-spacing: 0.08em;
      color: var(--text-faint, var(--color-light-outline, #8a726a));
      padding: 4px 0;
    }
    .dt-pop .dt-day {
      height: 34px;
      min-height: 0; padding: 0;
      border: none; border-radius: 8px;
      background: transparent;
      color: var(--text-body, var(--color-light-on-surface, #1c1b1a));
      font: inherit; font-size: 13px; font-variant-numeric: tabular-nums;
      cursor: pointer;
      /* host pages set justify-self on buttons — inside this grid it would
         shrink the day cells */
      justify-self: stretch;
    }
    .dt-pop .dt-day:hover { background: rgba(139, 46, 5, 0.1); }
    .dt-pop .dt-day:focus-visible { outline: 2px solid var(--gold, #c9a227); outline-offset: -2px; }
    .dt-pop .dt-day[aria-pressed="true"] {
      background: var(--color-primary, var(--color-light-primary, #8b2e05));
      border: none;
      color: var(--color-on-primary, #fff);
      font-weight: 700;
    }
    .dt-pop .dt-day[data-today] { box-shadow: inset 0 0 0 1.5px var(--color-accent, #c9a227); }
    .dt-pop .dt-day:disabled { opacity: 0.4; cursor: default; background: transparent; }
    .dt-pop .dt-blank { height: 34px; }
    .dt-pop-foot { display: flex; justify-content: flex-end; margin-top: 6px; }
    .dt-pop .dt-today {
      height: 30px; min-height: 0; padding: 0 10px;
      background: transparent; border: none; border-radius: 999px;
      color: var(--color-accent-text, var(--color-saffron, #c0841d));
      font: inherit; font-size: 12.5px; font-weight: 700;
      cursor: pointer;
    }
    .dt-pop .dt-today:hover { text-decoration: underline; background: transparent; }
    .dt-pop .dt-today:focus-visible { outline: 2px solid var(--gold, #c9a227); outline-offset: -2px; }
    .dt-pop .dt-today:disabled { opacity: 0.4; cursor: default; text-decoration: none; }
  `;
  document.head.appendChild(style);
}

const DOW = ["S", "M", "T", "W", "T", "F", "S"];

interface RootCtx {
  root: HTMLElement;
  mode: "date" | "time" | "datetime";
  preset: DatePreset;
  hour12: boolean;
  required: boolean;
  /** server-rendered hidden default — Chrome reflects .value writes on
      type=hidden into the value attribute, so defaultValue is useless by
      reset time; form.reset() must restore THIS */
  resetDefault: string;
  hidden: HTMLInputElement;
  errorEl: HTMLElement;
  dd?: HTMLInputElement;
  mmD?: HTMLInputElement;
  yy?: HTMLInputElement;
  hh?: HTMLInputElement;
  mi?: HTMLInputElement;
  am?: HTMLButtonElement;
  pm?: HTMLButtonElement;
  clears?: NodeListOf<HTMLButtonElement>;
  trigger?: HTMLButtonElement;
  pop?: HTMLElement;
  monthSel?: HTMLSelectElement;
  yearSel?: HTMLSelectElement;
  grid?: HTMLElement;
  prev?: HTMLButtonElement;
  next?: HTMLButtonElement;
  todayBtn?: HTMLButtonElement;
  viewY: number;
  viewM: number; // 0-11
  open: boolean;
  /** last machine value we dispatched events for — skip no-op syncs */
  lastVal: string;
}

const contexts = new Map<HTMLElement, RootCtx>();
let openCtx: RootCtx | null = null;
/** last committed value per segment — lets onSegInput detect append-into-full */
const prevValues = new WeakMap<HTMLInputElement, string>();

function setMessage(ctx: RootCtx, msg: string): void {
  if (msg) {
    ctx.errorEl.innerHTML = ERROR_ICON;
    const span = document.createElement("span");
    span.textContent = msg;
    ctx.errorEl.appendChild(span);
    ctx.root.setAttribute("data-invalid", "true");
  } else {
    ctx.errorEl.textContent = "";
    ctx.root.removeAttribute("data-invalid");
  }
}

/** fire input+change on the hidden input only when its value actually moved —
 *  avoids re-triggering page change listeners (e.g. PanchangDetail) on no-ops */
function dispatchValue(ctx: RootCtx): void {
  const v = ctx.hidden.value;
  if (ctx.lastVal === v) return;
  ctx.lastVal = v;
  ctx.hidden.dispatchEvent(new Event("input", { bubbles: true }));
  ctx.hidden.dispatchEvent(new Event("change", { bubbles: true }));
}

/** per-box clear visibility (datetime has one clear button per box) */
function syncClear(ctx: RootCtx): void {
  if (!ctx.clears) return;
  ctx.clears.forEach((btn) => {
    const box = btn.closest("[data-dt-box]")?.getAttribute("data-dt-box");
    const segs =
      box === "time"
        ? [ctx.hh, ctx.mi]
        : box === "date"
          ? [ctx.dd, ctx.mmD, ctx.yy]
          : [ctx.dd, ctx.mmD, ctx.yy, ctx.hh, ctx.mi];
    btn.hidden = !segs.some((s) => s && s.value !== "");
  });
}

/** ---------- date sync ---------- */
function syncDate(ctx: RootCtx): void {
  if (ctx.mode === "time") {
    syncTimePart(ctx);
    return;
  }
  const chk = checkDate(
    { dd: ctx.dd!.value, mm: ctx.mmD!.value, yyyy: ctx.yy!.value },
    ctx.preset,
    todayMidnight(),
  );
  if (ctx.mode === "datetime") {
    // combined contract: hidden only fills when BOTH halves are valid;
    // incomplete halves stay silent until the submit guard judges them
    const t = syncTimePart(ctx);
    ctx.hidden.value = chk.ok && t.ok ? composeDateTime(chk.iso, t.value) : "";
    if (!chk.ok && chk.code !== "incomplete") setMessage(ctx, chk.message);
    else if (!t.ok && t.code !== "incomplete") setMessage(ctx, t.message);
    else setMessage(ctx, "");
  } else if (chk.ok) {
    ctx.hidden.value = chk.iso;
    setMessage(ctx, "");
  } else if (chk.code === "incomplete") {
    ctx.hidden.value = "";
    setMessage(ctx, "");
  } else {
    ctx.hidden.value = "";
    setMessage(ctx, chk.message);
  }
  dispatchValue(ctx);
  syncClear(ctx);
}

function hasAnyDateDigit(ctx: RootCtx): boolean {
  return [ctx.dd, ctx.mmD, ctx.yy].some((s) => s && s.value !== "");
}

function hasAnyTimeDigit(ctx: RootCtx): boolean {
  return [ctx.hh, ctx.mi].some((s) => s && s.value !== "");
}

/** time half sync for time/datetime modes; returns the full check */
function syncTimePart(ctx: RootCtx): TimeCheck {
  const ampm: "am" | "pm" | "" = ctx.pm?.getAttribute("aria-pressed") === "true"
    ? "pm"
    : ctx.am?.getAttribute("aria-pressed") === "true"
      ? "am"
      : "";
  const chk = checkTime({ hh: ctx.hh!.value, mm: ctx.mi!.value, ampm }, ctx.hour12);
  if (ctx.mode === "time") {
    if (chk.ok) {
      ctx.hidden.value = chk.value;
      setMessage(ctx, "");
    } else if (chk.code === "incomplete") {
      ctx.hidden.value = "";
      setMessage(ctx, "");
    } else {
      ctx.hidden.value = "";
      setMessage(ctx, chk.message);
    }
    dispatchValue(ctx);
    syncClear(ctx);
  }
  return chk;
}

/** ---------- segment behaviour ---------- */
function segMax(ctx: RootCtx, seg: HTMLInputElement): number {
  if (seg === ctx.dd) return 31;
  if (seg === ctx.mmD) return 12;
  if (seg === ctx.hh) return ctx.hour12 ? 12 : 23;
  if (seg === ctx.mi) return 59;
  return 9999;
}

function segKind(ctx: RootCtx, seg: HTMLInputElement): "day" | "month" | "hour12" | "hour24" | "minute" | "year" {
  if (seg === ctx.dd) return "day";
  if (seg === ctx.mmD) return "month";
  if (seg === ctx.hh) return ctx.hour12 ? "hour12" : "hour24";
  if (seg === ctx.mi) return "minute";
  return "year";
}

const SEQUENCE = ["dd", "mmD", "yy", "hh", "mi"] as const;

function nextSeg(ctx: RootCtx, seg: HTMLInputElement): HTMLInputElement | null {
  for (const key of SEQUENCE) {
    if (ctx[key] === seg) {
      for (const k2 of SEQUENCE.slice(SEQUENCE.indexOf(key) + 1)) {
        if (ctx[k2]) return ctx[k2]!;
      }
    }
  }
  return null;
}

function prevSeg(ctx: RootCtx, seg: HTMLInputElement): HTMLInputElement | null {
  const order = SEQUENCE.slice().reverse();
  for (const key of order) {
    if (ctx[key] === seg) {
      for (const k2 of order.slice(order.indexOf(key) + 1)) {
        if (ctx[k2]) return ctx[k2]!;
      }
    }
  }
  return null;
}

function onSegInput(ctx: RootCtx, seg: HTMLInputElement): void {
  const kind = segKind(ctx, seg);
  const maxLen = kind === "year" ? 4 : 2;
  let raw = seg.value.replace(/\D/g, "");
  // typing into a COMPLETE segment with no text selection appends — focus
  // select() isn't guaranteed for programmatic focus, so treat trailing new
  // digits as the fresh value (segmented pickers do the same)
  const prev = prevValues.get(seg) ?? "";
  if (prev.length === maxLen && raw.startsWith(prev) && raw.length > prev.length) {
    raw = raw.slice(prev.length);
  }
  if (kind === "year") {
    seg.value = raw.slice(0, 4);
  } else {
    const { value, advance } = normalizeSegment(raw, segMax(ctx, seg), kind);
    seg.value = value;
    if (advance) {
      const nxt = nextSeg(ctx, seg);
      if (nxt) nxt.focus();
    }
  }
  sync(ctx);
}

function onSegKeydown(ctx: RootCtx, seg: HTMLInputElement, e: KeyboardEvent): void {
  // digits into a FULL segment: without a live text selection the browser
  // drops the keystroke at maxlength — take over and start the fresh value
  if (/^\d$/.test(e.key) && !e.ctrlKey && !e.metaKey && !e.altKey) {
    const maxLen = segKind(ctx, seg) === "year" ? 4 : 2;
    if (seg.value.replace(/\D/g, "").length >= maxLen) {
      e.preventDefault();
      seg.value = e.key;
      seg.dispatchEvent(new Event("input"));
    }
    return;
  }
  if (e.key === "Backspace" && seg.value === "") {
    const pv = prevSeg(ctx, seg);
    if (pv) {
      e.preventDefault();
      pv.focus();
    }
    return;
  }
  if (e.key === "ArrowUp" || e.key === "ArrowDown") {
    e.preventDefault();
    const kind = segKind(ctx, seg);
    const dir = e.key === "ArrowUp" ? 1 : -1;
    if (kind === "year") {
      const { min, max } = yearRange(ctx.preset, todayMidnight());
      const v = (Number(seg.value) || todayMidnight().getFullYear()) + dir;
      seg.value = String(Math.min(max, Math.max(min, v)));
    } else {
      const max = segMax(ctx, seg);
      const min = kind === "hour24" || kind === "minute" ? 0 : 1;
      const cur = seg.value === "" ? null : Number(seg.value);
      let v = cur === null ? (dir > 0 ? min : max) : cur + dir;
      if (v > max) v = min;
      if (v < min) v = max;
      seg.value = String(v).padStart(2, "0");
    }
    sync(ctx);
    return;
  }
  if (ctx.hour12 && seg === ctx.hh && (e.key === "a" || e.key === "A" || e.key === "p" || e.key === "P")) {
    e.preventDefault();
    setAmpm(ctx, e.key.toLowerCase() === "a" ? "am" : "pm");
    sync(ctx);
  }
}

function onSegPaste(ctx: RootCtx, seg: HTMLInputElement, e: ClipboardEvent): void {
  const text = e.clipboardData?.getData("text") ?? "";
  if (!text) return;
  e.preventDefault();
  if (ctx.mode === "time") {
    const digits = text.replace(/\D/g, "");
    const hh = digits.slice(0, 2);
    const mi = digits.slice(2, 4);
    if (ctx.hh) ctx.hh.value = normalizeSegment(hh, segMax(ctx, ctx.hh), ctx.hour12 ? "hour12" : "hour24").value;
    if (ctx.mi) ctx.mi.value = normalizeSegment(mi, 59, "minute").value;
  } else {
    const parts = pasteDate(text);
    if (ctx.dd) ctx.dd.value = parts.dd;
    if (ctx.mmD) ctx.mmD.value = parts.mm;
    if (ctx.yy) ctx.yy.value = parts.yyyy;
    if (ctx.mode === "datetime" && /\d{2}:\d{2}/.test(text)) {
      const t = timeToParts(text.split("T").pop() ?? "", ctx.hour12);
      if (ctx.hh) ctx.hh.value = t.hh;
      if (ctx.mi) ctx.mi.value = t.mm;
      if (t.ampm) setAmpm(ctx, t.ampm);
    }
  }
  sync(ctx);
  // land focus on the last segment of the pasted group
  const last = ctx.mode === "time" ? ctx.mi : ctx.mode === "datetime" ? (ctx.mi ?? ctx.yy) : ctx.yy;
  last?.focus();
}

/** ---------- AM/PM ---------- */
function setAmpm(ctx: RootCtx, which: "am" | "pm"): void {
  if (!ctx.am || !ctx.pm) return;
  ctx.am.setAttribute("aria-pressed", which === "am" ? "true" : "false");
  ctx.pm.setAttribute("aria-pressed", which === "pm" ? "true" : "false");
}

/** ---------- calendar popup ---------- */
function bounds(ctx: RootCtx): { min: { y: number; m: number }; max: { y: number; m: number } } {
  const r = yearRange(ctx.preset, todayMidnight());
  const now = todayMidnight();
  return {
    min: { y: r.min, m: 0 },
    max: { y: r.max, m: ctx.preset === "birth" ? now.getMonth() : 11 },
  };
}

function clampView(ctx: RootCtx): void {
  const b = bounds(ctx);
  if (ctx.viewY < b.min.y) { ctx.viewY = b.min.y; ctx.viewM = b.min.m; }
  if (ctx.viewY > b.max.y) { ctx.viewY = b.max.y; ctx.viewM = b.max.m; }
  if (ctx.viewY === b.min.y && ctx.viewM < b.min.m) ctx.viewM = b.min.m;
  if (ctx.viewY === b.max.y && ctx.viewM > b.max.m) ctx.viewM = b.max.m;
}

function populateYearSelect(ctx: RootCtx): void {
  const { years } = yearRange(ctx.preset, todayMidnight());
  const cur = years.includes(ctx.viewY) ? ctx.viewY : years[0];
  ctx.yearSel!.innerHTML = years
    .map((y) => `<option value="${y}">${y}</option>`)
    .join("");
  ctx.yearSel!.value = String(cur);
  ctx.viewY = cur;
}

function monthDisabled(ctx: RootCtx, m: number): boolean {
  const b = bounds(ctx);
  return (ctx.viewY === b.min.y && m < b.min.m) || (ctx.viewY === b.max.y && m > b.max.m);
}

function selectedDate(ctx: RootCtx): { y: number; m: number; d: number } | null {
  const iso = ctx.mode === "datetime" ? splitDateTime(ctx.hidden.value).date : ctx.hidden.value;
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!m) return null;
  return { y: Number(m[1]), m: Number(m[2]) - 1, d: Number(m[3]) };
}

function renderGrid(ctx: RootCtx): void {
  const { y, m } = { y: ctx.viewY, m: ctx.viewM };
  ctx.monthSel!.value = String(m);
  for (const opt of Array.from(ctx.monthSel!.options)) opt.disabled = monthDisabled(ctx, Number(opt.value));
  const b = bounds(ctx);
  const atMin = y === b.min.y && m === b.min.m;
  const atMax = y === b.max.y && m === b.max.m;
  ctx.prev!.disabled = atMin;
  ctx.next!.disabled = atMax;

  const dim = daysInMonth(y, m + 1);
  const firstDow = new Date(y, m, 1).getDay();
  const sel = selectedDate(ctx);
  const today = todayMidnight();
  const grid = ctx.grid!;
  grid.innerHTML = "";
  for (let i = 0; i < 7; i++) {
    const el = document.createElement("span");
    el.className = "dt-dow";
    el.setAttribute("aria-hidden", "true");
    el.textContent = DOW[i];
    grid.appendChild(el);
  }
  for (let i = 0; i < firstDow; i++) {
    const el = document.createElement("span");
    el.className = "dt-blank";
    grid.appendChild(el);
  }
  const days: HTMLButtonElement[] = [];
  for (let d = 1; d <= dim; d++) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "dt-day";
    btn.textContent = String(d);
    btn.setAttribute("aria-label", `${d} ${MONTHS[m]} ${y}`);
    const date = new Date(y, m, d);
    if (ctx.preset === "birth") {
      const r = yearRange(ctx.preset, today);
      if (y < r.min || date.getTime() > today.getTime()) btn.disabled = true;
    }
    if (sel && sel.y === y && sel.m === m && sel.d === d) btn.setAttribute("aria-pressed", "true");
    if (y === today.getFullYear() && m === today.getMonth() && d === today.getDate()) {
      btn.setAttribute("data-today", "");
      btn.setAttribute("aria-current", "date");
    }
    grid.appendChild(btn);
    days.push(btn);
  }
  const trailing = (7 - ((firstDow + dim) % 7)) % 7;
  for (let i = 0; i < trailing; i++) {
    const el = document.createElement("span");
    el.className = "dt-blank";
    grid.appendChild(el);
  }
  grid.querySelectorAll<HTMLButtonElement>(".dt-day").forEach((btn, idx) => {
    btn.addEventListener("click", () => pickDay(ctx, idx + 1));
    btn.addEventListener("keydown", (e) => onDayKeydown(ctx, e, idx, days));
  });
}

function positionPopup(ctx: RootCtx): void {
  const pop = ctx.pop!;
  pop.classList.remove("above");
  pop.style.left = "";
  // flip above when there's no room below but there is room above
  const boxRect = (pop.parentElement as HTMLElement).getBoundingClientRect();
  const rect = pop.getBoundingClientRect();
  const spaceBelow = window.innerHeight - boxRect.bottom;
  if (rect.height > spaceBelow - 8 && boxRect.top > rect.height + 8) {
    pop.classList.add("above");
  }
  const after = pop.getBoundingClientRect();
  const over = after.right - (window.innerWidth - 8);
  if (over > 0) pop.style.left = `-${Math.min(over, after.left - 8)}px`;
}

function openPopup(ctx: RootCtx): void {
  if (!ctx.pop || !ctx.trigger) return;
  const sel = selectedDate(ctx);
  if (sel) {
    ctx.viewY = sel.y;
    ctx.viewM = sel.m;
  } else {
    const now = todayMidnight();
    ctx.viewY = now.getFullYear();
    ctx.viewM = now.getMonth();
  }
  clampView(ctx);
  populateYearSelect(ctx);
  renderGrid(ctx);
  ctx.pop.hidden = false;
  positionPopup(ctx);
  ctx.trigger.setAttribute("aria-expanded", "true");
  ctx.open = true;
  openCtx = ctx;
  const target =
    ctx.grid!.querySelector<HTMLButtonElement>('.dt-day[aria-pressed="true"]') ??
    ctx.grid!.querySelector<HTMLButtonElement>(".dt-day:not(:disabled)");
  target?.focus();
}

function closePopup(ctx: RootCtx, refocus: boolean): void {
  if (!ctx.open || !ctx.pop || !ctx.trigger) return;
  ctx.pop.hidden = true;
  ctx.trigger.setAttribute("aria-expanded", "false");
  ctx.open = false;
  if (openCtx === ctx) openCtx = null;
  if (refocus) ctx.trigger.focus();
}

function pickDay(ctx: RootCtx, d: number): void {
  const y = ctx.viewY;
  const m = ctx.viewM;
  if (ctx.dd) ctx.dd.value = String(d).padStart(2, "0");
  if (ctx.mmD) ctx.mmD.value = String(m + 1).padStart(2, "0");
  if (ctx.yy) ctx.yy.value = String(y);
  sync(ctx);
  closePopup(ctx, true);
}

function moveMonth(ctx: RootCtx, delta: number): void {
  let m = ctx.viewM + delta;
  let y = ctx.viewY;
  if (m < 0) { m = 11; y--; }
  if (m > 11) { m = 0; y++; }
  ctx.viewM = m;
  ctx.viewY = y;
  clampView(ctx);
  populateYearSelect(ctx);
  renderGrid(ctx);
}

function onDayKeydown(ctx: RootCtx, e: KeyboardEvent, idx: number, days: HTMLButtonElement[]): void {
  const dim = days.length;
  const focusDay = (i: number) => days[Math.max(0, Math.min(dim - 1, i))]?.focus();
  const dayButtons = () => ctx.grid!.querySelectorAll<HTMLButtonElement>(".dt-day");
  switch (e.key) {
    case "ArrowLeft": {
      e.preventDefault();
      if (idx > 0) focusDay(idx - 1);
      else {
        moveMonth(ctx, -1);
        const d = dayButtons();
        d[d.length - 1]?.focus();
      }
      break;
    }
    case "ArrowRight": {
      e.preventDefault();
      if (idx < dim - 1) focusDay(idx + 1);
      else {
        moveMonth(ctx, 1);
        dayButtons()[0]?.focus();
      }
      break;
    }
    case "ArrowUp": {
      e.preventDefault();
      if (idx >= 7) focusDay(idx - 7);
      else {
        moveMonth(ctx, -1);
        const d = dayButtons();
        d[Math.max(0, d.length - (7 - idx))]?.focus();
      }
      break;
    }
    case "ArrowDown": {
      e.preventDefault();
      if (idx + 7 < dim) focusDay(idx + 7);
      else {
        moveMonth(ctx, 1);
        const d = dayButtons();
        d[Math.min(d.length - 1, idx + 7 - dim)]?.focus();
      }
      break;
    }
    case "PageUp": e.preventDefault(); moveMonth(ctx, -1); dayButtons()[0]?.focus(); break;
    case "PageDown": e.preventDefault(); moveMonth(ctx, 1); dayButtons()[0]?.focus(); break;
    case "Home": e.preventDefault(); focusDay(0); break;
    case "End": e.preventDefault(); focusDay(dim - 1); break;
    case "Escape": e.preventDefault(); closePopup(ctx, true); break;
  }
}

/** ---------- value in / out ---------- */
function loadFromValue(ctx: RootCtx): void {
  const v = ctx.hidden.value;
  if (ctx.mode === "time") {
    const t = timeToParts(v, ctx.hour12);
    if (ctx.hh) ctx.hh.value = t.hh;
    if (ctx.mi) ctx.mi.value = t.mm;
    if (t.ampm) setAmpm(ctx, t.ampm);
  } else if (ctx.mode === "datetime") {
    const s = splitDateTime(v);
    const d = dateToParts(s.date);
    const t = timeToParts(s.time, ctx.hour12);
    if (ctx.dd) ctx.dd.value = d.dd;
    if (ctx.mmD) ctx.mmD.value = d.mm;
    if (ctx.yy) ctx.yy.value = d.yyyy;
    if (ctx.hh) ctx.hh.value = t.hh;
    if (ctx.mi) ctx.mi.value = t.mm;
    if (t.ampm) setAmpm(ctx, t.ampm);
  } else {
    const d = dateToParts(v);
    if (ctx.dd) ctx.dd.value = d.dd;
    if (ctx.mmD) ctx.mmD.value = d.mm;
    if (ctx.yy) ctx.yy.value = d.yyyy;
  }
  syncClear(ctx);
}

/** clear one box (datetime has two); sync recomposes the hidden value */
function clearBox(ctx: RootCtx, box: string | null | undefined): void {
  const clearDate = box !== "time";
  const clearTime = box !== "date";
  if (clearDate) for (const s of [ctx.dd, ctx.mmD, ctx.yy]) if (s) s.value = "";
  if (clearTime) {
    for (const s of [ctx.hh, ctx.mi]) if (s) s.value = "";
    if (ctx.am && ctx.pm) {
      ctx.am.setAttribute("aria-pressed", "false");
      ctx.pm.setAttribute("aria-pressed", "false");
    }
  }
  sync(ctx);
  (ctx.dd ?? ctx.hh)?.focus();
}

/** ---------- submit guard ---------- */
// S18 (owner spec): specific, part-aware messages in EN + HI — "Please enter
// your date of birth" / "Please enter your time of birth (hour, minute,
// AM/PM)"; a partially-typed field says WHICH part is missing. The / ↔ /hi/
// language toggle is build-time routing, so the document lang decides.
const isHi = (): boolean =>
  (document.documentElement.lang || "en").toLowerCase().startsWith("hi");

function requiredMessage(ctx: RootCtx): string {
  const hi = isHi();
  if (ctx.mode === "time") {
    if (hasAnyTimeDigit(ctx)) {
      const missing: string[] = [];
      if (ctx.hh && !ctx.hh.value) missing.push(hi ? "घंटा" : "hour");
      if (ctx.mi && !ctx.mi.value) missing.push(hi ? "मिनट" : "minute");
      const ap =
        ctx.am?.getAttribute("aria-pressed") === "true" ||
        ctx.pm?.getAttribute("aria-pressed") === "true";
      if (ctx.hour12 && ctx.am && !ap) missing.push("AM/PM");
      return hi
        ? `कृपया पूर्ण समय दर्ज करें — ${missing.join(", ")} गायब है।`
        : `Please complete the time — ${missing.join(" and ")} missing.`;
    }
    if (ctx.preset === "birth")
      return hi
        ? "कृपया अपना जन्म समय दर्ज करें (घंटा, मिनट, AM/PM)।"
        : "Please enter your time of birth (hour, minute, AM/PM).";
    return hi
      ? "कृपया एक पूर्ण समय दर्ज करें, या इसे हटाएँ।"
      : "Please enter a complete time, or clear it.";
  }
  if (hasAnyDateDigit(ctx)) {
    const missing: string[] = [];
    if (ctx.dd && !ctx.dd.value) missing.push(hi ? "दिन" : "day");
    if (ctx.mmD && !ctx.mmD.value) missing.push(hi ? "महीना" : "month");
    if (ctx.yy && !ctx.yy.value) missing.push(hi ? "साल" : "year");
    return hi
      ? `कृपया पूर्ण तिथि दर्ज करें — ${missing.join(", ")} गायब है।`
      : `Please complete the date — ${missing.join(" and ")} missing.`;
  }
  if (ctx.mode === "datetime")
    return hi
      ? "कृपया पूर्ण तिथि और समय दर्ज करें।"
      : "Please enter a complete date and time.";
  if (ctx.preset === "birth")
    return hi ? "कृपया अपनी जन्म तिथि दर्ज करें।" : "Please enter your date of birth.";
  return hi
    ? "कृपया एक पूर्ण तिथि दर्ज करें (DD/MM/YYYY)।"
    : "Please enter a complete date (DD/MM/YYYY).";
}

function enforceRoot(ctx: RootCtx): boolean {
  if (ctx.hidden.value) return !ctx.root.hasAttribute("data-invalid");
  // an impossible/future message is already showing (S18: keep the SPECIFIC
  // "31 February … doesn't exist" / future-date message on submit — the
  // generic required message must not clobber it)
  if (ctx.root.hasAttribute("data-invalid")) return false;
  if (ctx.required) {
    setMessage(ctx, requiredMessage(ctx));
    return false;
  }
  // optional but partially typed: block with the clear-it message
  if (hasAnyDateDigit(ctx) || hasAnyTimeDigit(ctx)) {
    setMessage(ctx, requiredMessage(ctx));
    return false;
  }
  return true;
}

let globalBound = false;

function bindGlobals(): void {
  if (globalBound) return;
  globalBound = true;

  // submit capture — runs before any page submit handler
  document.addEventListener(
    "submit",
    (e) => {
      const form = e.target as HTMLFormElement;
      let ok = true;
      let firstFail: RootCtx | null = null;
      for (const ctx of contexts.values()) {
        if (!form.contains(ctx.root)) continue;
        // re-sync from current segments before judging
        sync(ctx);
        if (!enforceRoot(ctx)) {
          ok = false;
          if (!firstFail) firstFail = ctx;
        }
      }
      if (!ok) {
        e.preventDefault();
        // S18: validator-managed forms (data-vy-fv) let the event continue —
        // the shared form validator (form-capture, always runs after this
        // document-capture listener) adds its text/place errors and owns the
        // DOM-order focus + summary. Unmanaged forms keep the legacy
        // short-circuit (stop + focus the first dt fail).
        if (form.hasAttribute("data-vy-fv")) return;
        e.stopPropagation();
        // focus the FIRST invalid field — per-field focus inside the loop
        // would land on the last one
        if (firstFail) (firstFail.dd ?? firstFail.hh)?.focus();
      }
    },
    true,
  );

  // form.reset() clears nameless segments and hidden inputs but leaves AM/PM
  // pressed, error text and lastVal stale — re-derive from the reset hidden
  // value after the browser finishes the reset (the event fires before it).
  // Chrome reflects .value writes on type=hidden into the value attribute, so
  // the reset would "restore" the last composed value — put the captured
  // server default back before re-deriving.
  document.addEventListener(
    "reset",
    (e) => {
      const form = e.target as HTMLFormElement;
      setTimeout(() => {
        for (const ctx of contexts.values()) {
          if (!form.contains(ctx.root)) continue;
          if (ctx.am && ctx.pm) {
            ctx.am.setAttribute("aria-pressed", "false");
            ctx.pm.setAttribute("aria-pressed", "false");
          }
          ctx.hidden.value = ctx.resetDefault;
          loadFromValue(ctx);
          sync(ctx);
        }
      }, 0);
    },
    true,
  );

  // close the popup when interaction leaves the field
  document.addEventListener("pointerdown", (e) => {
    if (openCtx && !openCtx.root.contains(e.target as Node)) closePopup(openCtx, false);
  });
}

function sync(ctx: RootCtx): void {
  syncDate(ctx);
  for (const s of [ctx.dd, ctx.mmD, ctx.yy, ctx.hh, ctx.mi]) {
    if (s) prevValues.set(s, s.value);
  }
}

/** ---------- wiring ---------- */
function setupField(root: HTMLElement): void {
  if (contexts.has(root)) return;
  const mode = (root.getAttribute("data-dt") ?? "date") as RootCtx["mode"];
  const hidden = root.querySelector<HTMLInputElement>("[data-dt-value]");
  const errorEl = root.querySelector<HTMLElement>("[data-dt-error]");
  if (!hidden || !errorEl) return;

  const ctx: RootCtx = {
    root,
    mode,
    preset: (root.getAttribute("data-dt-preset") ?? "birth") as DatePreset,
    hour12: root.getAttribute("data-hour12") === "true",
    required: root.getAttribute("data-dt-required") === "true",
    resetDefault: hidden.defaultValue,
    hidden,
    errorEl,
    viewY: todayMidnight().getFullYear(),
    viewM: todayMidnight().getMonth(),
    open: false,
    lastVal: hidden.value,
  };

  const segIds = hidden.id;
  const datePre = mode === "datetime" ? `${segIds}-d` : segIds;
  const timePre = mode === "datetime" ? `${segIds}-t` : segIds;
  if (mode !== "time") {
    ctx.dd = document.getElementById(`${datePre}-dd`) as HTMLInputElement;
    ctx.mmD = document.getElementById(`${datePre}-mm`) as HTMLInputElement;
    ctx.yy = document.getElementById(`${datePre}-yy`) as HTMLInputElement;
    ctx.trigger = root.querySelector<HTMLButtonElement>("[data-dt-trigger]") ?? undefined;
    ctx.pop = root.querySelector<HTMLElement>("[data-dt-pop]") ?? undefined;
    ctx.monthSel = root.querySelector<HTMLSelectElement>("[data-dt-month]") ?? undefined;
    ctx.yearSel = root.querySelector<HTMLSelectElement>("[data-dt-year]") ?? undefined;
    ctx.grid = root.querySelector<HTMLElement>("[data-dt-grid]") ?? undefined;
    ctx.prev = root.querySelector<HTMLButtonElement>("[data-dt-prev]") ?? undefined;
    ctx.next = root.querySelector<HTMLButtonElement>("[data-dt-next]") ?? undefined;
    ctx.todayBtn = root.querySelector<HTMLButtonElement>("[data-dt-today]") ?? undefined;
  }
  if (mode !== "date") {
    ctx.hh = document.getElementById(`${timePre}-hh`) as HTMLInputElement;
    ctx.mi = document.getElementById(`${timePre}-mi`) as HTMLInputElement;
    ctx.am = root.querySelector<HTMLButtonElement>("[data-dt-amp]") ?? undefined;
    ctx.pm = root.querySelector<HTMLButtonElement>("[data-dt-pm]") ?? undefined;
  }
  ctx.clears = root.querySelectorAll<HTMLButtonElement>("[data-dt-clear]");

  // segments
  for (const seg of [ctx.dd, ctx.mmD, ctx.yy, ctx.hh, ctx.mi]) {
    if (!seg) continue;
    seg.addEventListener("input", () => onSegInput(ctx, seg));
    seg.addEventListener("keydown", (e) => onSegKeydown(ctx, seg, e));
    seg.addEventListener("paste", (e) => onSegPaste(ctx, seg, e as ClipboardEvent));
    seg.addEventListener("focus", () => seg.select());
    seg.addEventListener("blur", () => {
      // a single digit left behind ("1" day, "5" minute) pads on leave —
      // checkDate/checkTime judge two-digit segments only
      if (segKind(ctx, seg) !== "year" && seg.value.length === 1) {
        seg.value = `0${seg.value}`;
        sync(ctx);
      }
    });
  }
  if (ctx.am) ctx.am.addEventListener("click", () => { setAmpm(ctx, "am"); sync(ctx); });
  if (ctx.pm) ctx.pm.addEventListener("click", () => { setAmpm(ctx, "pm"); sync(ctx); });
  ctx.clears.forEach((btn) =>
    btn.addEventListener("click", () =>
      clearBox(ctx, btn.closest<HTMLElement>("[data-dt-box]")?.getAttribute("data-dt-box")),
    ),
  );

  // popup
  if (ctx.trigger && ctx.pop) {
    ctx.trigger.addEventListener("click", () => (ctx.open ? closePopup(ctx, true) : openPopup(ctx)));
    ctx.prev?.addEventListener("click", () => moveMonth(ctx, -1));
    ctx.next?.addEventListener("click", () => moveMonth(ctx, 1));
    ctx.yearSel?.addEventListener("change", () => {
      ctx.viewY = Number(ctx.yearSel!.value);
      renderGrid(ctx);
      ctx.grid?.querySelector<HTMLButtonElement>(".dt-day:not(:disabled)")?.focus();
    });
    ctx.monthSel?.addEventListener("change", () => {
      ctx.viewM = Number(ctx.monthSel!.value);
      renderGrid(ctx);
      ctx.grid?.querySelector<HTMLButtonElement>(".dt-day:not(:disabled)")?.focus();
    });
    ctx.todayBtn?.addEventListener("click", () => {
      const now = todayMidnight();
      ctx.viewY = now.getFullYear();
      ctx.viewM = now.getMonth();
      clampView(ctx);
      pickDay(ctx, now.getDate());
    });
    root.addEventListener("focusout", () => {
      // deferred: grid rebuilds remove the focused day and blur with a null
      // relatedTarget — wait for focus to settle before judging "left the field"
      setTimeout(() => {
        if (ctx.open && !ctx.root.contains(document.activeElement)) closePopup(ctx, false);
      }, 0);
    });
  }

  loadFromValue(ctx);
  contexts.set(root, ctx);
}

export function initDateFields(): void {
  injectStyles();
  document.querySelectorAll<HTMLElement>("[data-dt]").forEach(setupField);
  bindGlobals();
}

export {};

declare global {
  interface Window {
    vyDateTime: {
      /** write a machine value (ISO date / HH:MM / datetime-local) into the field and re-render */
      set(input: Element, value: string): void;
      /** adopt fields injected after load */
      rebind(): void;
    };
  }
}

window.vyDateTime = {
  set(input: Element, value: string): void {
    const root = input.closest<HTMLElement>("[data-dt]");
    if (!root) return;
    if (!contexts.has(root)) setupField(root);
    const ctx = contexts.get(root)!;
    ctx.hidden.value = value;
    loadFromValue(ctx);
    sync(ctx);
  },
  rebind(): void {
    injectStyles();
    document.querySelectorAll<HTMLElement>("[data-dt]").forEach(setupField);
  },
};
