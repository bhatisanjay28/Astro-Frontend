/**
 * S18 shared form validation (owner directive 2026-11-22) — one submit gate,
 * error renderer and message catalog for every form that takes birth details
 * (calculator BirthForm + registry kinds, kundli, HomeKundli, matching,
 * BookingForm, BookingModal).
 *
 * Division of labour with the S16 date field (date-time-picker.ts):
 *   - DateField keeps its own per-field messages, enforced by a
 *     document-CAPTURE submit listener that runs first and sets data-invalid
 *     on the dt root. For validator-managed forms (data-vy-fv on the <form>)
 *     the picker no longer short-circuits the event; THIS module runs second
 *     (form-capture on the form always fires after document capture), reads
 *     the dt state, adds its own text/place errors and owns the DOM-order
 *     focus + the screen-reader summary. When it blocks it stops propagation
 *     so the page's bubble-phase fetch handler never runs on bad input.
 *   - PlaceField wrappers (.pp[data-place-field="required"]) are auto-covered:
 *     a required place is valid only with data-place-selected="true" — free
 *     text without a pick can never submit.
 *   - Pages declare their text/checkbox rules explicitly.
 *
 * Behaviour contract (owner spec): no errors before interaction; inline error
 * under each problem field + red border; focus moves to the FIRST error in
 * DOM order; a role="alert" summary ("Please fix 2 fields to continue.");
 * errors clear the moment the field is fixed and re-validate on blur.
 *
 * Messages: EN + HI, chosen by document.documentElement.lang (the / ↔ /hi/
 * build-time toggle; /hi/ ships no forms today — the catalog is ready for
 * when they land).
 */

interface Rule {
  el: HTMLElement;
  errEl: HTMLElement;
  message: string | null;
  /** returns the error message for the CURRENT value, or null when valid */
  validate: () => string | null;
  /** element to focus when this field is the first error */
  focusEl: HTMLElement;
}

const MSG = {
  en: {
    requiredText: "This field is required.",
    name: "Please enter your name.",
    phone: "Please enter your phone number.",
    place: "Please select your place of birth from the list.",
    checkbox: "Please confirm to continue.",
    summary: (n: number) => `Please fix ${n} ${n === 1 ? "field" : "fields"} to continue.`,
  },
  hi: {
    requiredText: "यह फ़ील्ड आवश्यक है।",
    name: "कृपया अपना नाम दर्ज करें।",
    phone: "कृपया अपना फ़ोन नंबर दर्ज करें।",
    place: "कृपया सूची से अपनी जन्म स्थली चुनें।",
    checkbox: "कृपया आगे बढ़ने के लिए पुष्टि करें।",
    summary: (n: number) => `कृपया जारी रखने के लिए ${n} फ़ील्ड ठीक करें।`,
  },
} as const;

export const validationMessages = MSG;

const msg = () => {
  const docLang = (document.documentElement.lang || "en").toLowerCase();
  return docLang.startsWith("hi") ? MSG.hi : MSG.en;
};

let stylesInjected = false;
function injectStyles(): void {
  if (stylesInjected) return;
  stylesInjected = true;
  const style = document.createElement("style");
  style.id = "vy-form-validation";
  style.textContent = `
    .vy-err { color: var(--color-error-text, #b3261e); font-size: 12.5px; margin: 4px 0 0; }
    .vy-err::before { content: "\\26A0 "; }
    .vy-invalid { border-color: var(--color-error-text, #b3261e) !important; }
    .vy-summary {
      color: var(--color-error-text, #b3261e);
      font-size: 13.5px; font-weight: 600;
      margin: 0 0 var(--space-3, 12px);
      grid-column: 1 / -1; /* full row when the form is a grid */
    }
  `;
  document.head.appendChild(style);
}

function ensureErrEl(el: HTMLElement): HTMLElement {
  const id = `${el.id || el.getAttribute("name") || "field"}-err`;
  let err = document.getElementById(id);
  if (!err) {
    err = document.createElement("p");
    err.id = id;
    err.className = "vy-err";
    err.setAttribute("role", "status");
    // inline under the control: right after the input/select itself
    el.insertAdjacentElement("afterend", err);
  }
  return err;
}

function wireDescribedBy(el: HTMLElement, errId: string): void {
  const existing = el.getAttribute("aria-describedby");
  if (existing && !existing.split(/\s+/).includes(errId)) {
    el.setAttribute("aria-describedby", `${existing} ${errId}`);
  } else if (!existing) {
    el.setAttribute("aria-describedby", errId);
  }
}

/** invalid dt roots inside the form — state already enforced by the picker */
function dtErrors(form: HTMLFormElement): HTMLElement[] {
  const bad: HTMLElement[] = [];
  for (const root of form.querySelectorAll<HTMLElement>("[data-dt]")) {
    const hidden = root.querySelector<HTMLInputElement>("[data-dt-value]");
    const requiredEmpty = root.getAttribute("data-dt-required") === "true" && !hidden?.value;
    if (root.getAttribute("data-invalid") === "true" || requiredEmpty) {
      // focus the first still-empty segment, else the first segment
      const segs = [...root.querySelectorAll<HTMLInputElement>("[data-dt-seg]")];
      bad.push(segs.find((s) => !s.value) ?? segs[0] ?? root);
    }
  }
  return bad;
}

export interface TextRule {
  el: HTMLInputElement;
  required?: boolean;
  /** message override for the required case (defaults by name/kind) */
  message?: string;
  /** extra value check — returns an error message or null */
  invalid?: (value: string) => string | null;
}
export interface CheckRule {
  el: HTMLInputElement;
  message?: string;
}

export function installFormValidation(
  form: HTMLFormElement,
  rules: { text?: TextRule[]; check?: CheckRule[] } = {},
): void {
  injectStyles();
  form.setAttribute("data-vy-fv", "true");
  // the custom validator owns submit-time UX; native bubbles would preempt
  // the submit event (native required attrs stay for no-JS semantics)
  form.setAttribute("novalidate", "");

  const entries: Rule[] = [];

  for (const r of rules.text ?? []) {
    // lang is read at VALIDATE time, not install time — the catalog must
    // follow a runtime lang flip (and the future /hi/ build) immediately
    const validate = () => {
      const value = r.el.value.trim();
      if (!value) {
        return r.required
          ? (r.message ?? (r.el.name === "name" ? msg().name : msg().requiredText))
          : null;
      }
      return r.invalid?.(value) ?? null;
    };
    const errEl = ensureErrEl(r.el);
    wireDescribedBy(r.el, errEl.id);
    if (r.required) r.el.setAttribute("aria-required", "true");
    entries.push({ el: r.el, errEl, message: null, validate, focusEl: r.el });
  }

  for (const r of rules.check ?? []) {
    const errEl = ensureErrEl(r.el);
    wireDescribedBy(r.el, errEl.id);
    r.el.setAttribute("aria-required", "true");
    entries.push({
      el: r.el,
      errEl,
      message: null,
      validate: () => (r.el.checked ? null : (r.message ?? msg().checkbox)),
      focusEl: r.el,
    });
  }

  // required place fields are markup-driven — auto-cover every one
  for (const pp of form.querySelectorAll<HTMLElement>('.pp[data-place-field="required"]')) {
    const input = pp.querySelector<HTMLInputElement>("[data-place-input]");
    if (!input) continue;
    if (!input.getAttribute("aria-required")) input.setAttribute("aria-required", "true");
    const status = pp.querySelector<HTMLElement>("[data-place-status]");
    if (!status) continue;
    const validate = () => (pp.getAttribute("data-place-selected") === "true" ? null : msg().place);
    entries.push({ el: pp, errEl: status, message: null, validate, focusEl: input });
  }

  const show = (e: Rule, message: string) => {
    e.errEl.textContent = message;
    e.errEl.classList.add("vy-err");
    const ctrl = e.el.matches("input, select, textarea")
      ? (e.el as HTMLInputElement)
      : e.el.querySelector<HTMLInputElement>("[data-place-input]");
    ctrl?.setAttribute("aria-invalid", "true");
    if (ctrl) ctrl.classList.add("vy-invalid");
  };
  const clear = (e: Rule) => {
    e.errEl.textContent = "";
    const ctrl = e.el.matches("input, select, textarea")
      ? (e.el as HTMLInputElement)
      : e.el.querySelector<HTMLInputElement>("[data-place-input]");
    ctrl?.removeAttribute("aria-invalid");
    ctrl?.classList.remove("vy-invalid");
  };

  const summary = (() => {
    let el = form.querySelector<HTMLElement>("[data-form-errors]");
    if (!el) {
      el = document.createElement("p");
      el.className = "vy-summary";
      el.setAttribute("data-form-errors", "");
      el.setAttribute("role", "alert");
      el.hidden = true;
      form.prepend(el);
    }
    return el;
  })();

  // submit gate — form capture: runs AFTER the DateField document-capture
  // guard (which has already enforced dt state), BEFORE the page's bubble
  // fetch handler (which never sees a blocked submission).
  form.addEventListener(
    "submit",
    (e) => {
      summary.hidden = true;
      const failed: Rule[] = entries.filter((e) => {
        const message = e.validate();
        if (message) show(e, message);
        else clear(e);
        return !!message;
      });
      const dtFails = dtErrors(form);
      const total = failed.length + dtFails.length;
      if (total === 0) return; // valid — page handler proceeds

      e.preventDefault();
      e.stopPropagation(); // the page fetch handler must not run
      summary.textContent = msg().summary(total);
      summary.hidden = false;
      // focus the FIRST error in DOM order (dt fields already show the
      // picker's per-field message)
      const focusables = [...dtFails, ...failed.map((f) => f.focusEl)];
      focusables.sort((a, b) =>
        a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1,
      );
      focusables[0]?.focus();
    },
    true,
  );

  // clear the error the moment the field is fixed (input) — dt roots are the
  // picker's job, skip them here
  form.addEventListener("input", (e) => {
    const target = e.target as HTMLElement;
    if (target.closest("[data-dt]")) return;
    for (const entry of entries) {
      const ctrl = entry.el.matches("input, select, textarea")
        ? (entry.el as HTMLElement)
        : entry.el.querySelector<HTMLElement>("[data-place-input]");
      if (!ctrl || (ctrl !== target && !ctrl.contains(target))) continue;
      if (!entry.validate()) clear(entry);
    }
  });

  // a resolved pick clears the place error immediately
  form.addEventListener("place:selected", (e) => {
    const pp = (e.target as HTMLElement).closest<HTMLElement>(".pp");
    const entry = entries.find((x) => x.el === pp);
    if (entry && !entry.validate()) clear(entry);
  });

  // validate on blur once the user has interacted — never before
  form.addEventListener("focusout", (e) => {
    const target = e.target as HTMLElement;
    if (target.closest("[data-dt]")) return; // picker owns blur there
    for (const entry of entries) {
      const ctrl = entry.el.matches("input, select, textarea")
        ? (entry.el as HTMLElement)
        : entry.el.querySelector<HTMLElement>("[data-place-input]");
      if (ctrl && (ctrl === target || ctrl.contains(target))) {
        const message = entry.validate();
        if (message) show(entry, message);
      }
    }
  });
}
