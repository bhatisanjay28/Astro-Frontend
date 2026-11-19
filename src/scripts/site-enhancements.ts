/**
 * Site enhancements (Epic 7.4) — runtime, settings-driven, D12-compliant:
 *  1. WhatsApp float: appears when `contact_whatsapp` is set in site_settings
 *     (public /api/v1/settings).
 *  2. Analytics: only loads GA4 AFTER an explicit consent click, and only
 *     when a `ga_measurement_id` setting exists. Until then the consent
 *     banner stays honestly "no analytics".
 */

const API_BASE = import.meta.env.PUBLIC_API_BASE_URL ?? "https://astro-backend.vyotish.workers.dev";

const CONSENT_KEY = "vyotish.consent.v1";

interface PublicSettings {
  ga_measurement_id?: string | null;
  contact_whatsapp?: string | null;
}

async function loadSettings(): Promise<PublicSettings | null> {
  try {
    const res = await fetch(`${API_BASE}/api/v1/settings`);
    if (!res.ok) return null;
    const body = (await res.json()) as { data?: PublicSettings };
    return body.data ?? null;
  } catch {
    return null;
  }
}

function loadGtag(measurementId: string): void {
  if (document.getElementById("gtag-script")) return;
  const s = document.createElement("script");
  s.id = "gtag-script";
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(s);
  const inline = document.createElement("script");
  inline.textContent = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${measurementId}',{anonymous_ip:true});`;
  document.head.appendChild(inline);
}

function upgradeConsentBanner(settings: PublicSettings): void {
  const banner = document.querySelector("[data-consent-stub]");
  if (!banner) return;
  const span = banner.querySelector("span");
  const ok = banner.querySelector("[data-consent-ok]");
  if (!span || !ok) return;
  // real CMP only when an analytics id is configured
  if (!settings.ga_measurement_id) return;
  if (localStorage.getItem(CONSENT_KEY) === "analytics-granted") {
    loadGtag(settings.ga_measurement_id);
    return;
  }
  if (localStorage.getItem(CONSENT_KEY)) return; // declined/acknowledged earlier
  span.textContent =
    "We use Google Analytics (with IP anonymisation) to understand which pages help visitors. Nothing loads until you accept. You can decline and still use everything.";
  ok.textContent = "Accept analytics";
  // add a decline link next to the accept button
  const decline = document.createElement("button");
  decline.type = "button";
  decline.textContent = "Decline";
  decline.style.marginLeft = "8px";
  decline.addEventListener("click", () => {
    localStorage.setItem(CONSENT_KEY, "analytics-declined");
    banner.setAttribute("hidden", "");
  });
  ok.parentElement?.appendChild(decline);
}

function addWhatsAppFloat(number: string): void {
  if (document.getElementById("wa-float")) return;
  const digits = number.replace(/[^\d+]/g, "");
  const a = document.createElement("a");
  a.id = "wa-float";
  a.href = `https://wa.me/${digits.replace(/^\+/, "")}`;
  a.target = "_blank";
  a.rel = "noopener noreferrer";
  a.setAttribute("aria-label", "Chat with us on WhatsApp");
  a.textContent = "WhatsApp";
  document.body.appendChild(a);
  const style = document.createElement("style");
  style.textContent =
    "#wa-float{position:fixed;right:16px;bottom:16px;z-index:60;background:#25d366;color:#06340f;font:600 13px/1 Poppins,sans-serif;padding:12px 16px;border-radius:999px;text-decoration:none;box-shadow:0 4px 14px rgba(0,0,0,.35)}#wa-float:hover{filter:brightness(1.05)}";
  document.head.appendChild(style);
}

void (async () => {
  const settings = await loadSettings();
  if (!settings) return;
  if (settings.contact_whatsapp) addWhatsAppFloat(settings.contact_whatsapp);
  upgradeConsentBanner(settings);
})();
