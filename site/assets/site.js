// Wspólne funkcje: formatowanie i reklamy.
const SITE_CONFIG = {
  // Wpisz swoje ID po akceptacji w Google AdSense — reklamy włączą się automatycznie.
  adsenseClient: "ca-pub-6163251646983594",
  adsenseSlot: "",
  contactEmail: "hukobvdibd@gmail.com",         // adres pokazywany na stronach Kontakt i Polityka prywatności
};

// Wstawia adres e-mail w elementy <span data-email> (składany w JS, żeby boty go nie zbierały).
function fillEmail() {
  const e = SITE_CONFIG.contactEmail;
  document.querySelectorAll("[data-email]").forEach((el) => {
    el.innerHTML = e ? `<a href="mailto:${e}">${e}</a>` : "—";
  });
}
document.addEventListener("DOMContentLoaded", fillEmail);

const fmt = (n) => new Intl.NumberFormat("pl-PL", { style: "currency", currency: "PLN", maximumFractionDigits: 0 }).format(Math.round(n));
const num = (id) => parseFloat(String(document.getElementById(id).value).replace(",", ".")) || 0;

function bindCalc(ids, fn) {
  ids.forEach((id) => document.getElementById(id).addEventListener("input", fn));
  fn();
}

function loadAds() {
  // Skrypt AdSense jest wpięty w <head> każdej strony (wymóg weryfikacji); tu tylko wypełniamy bloki .ad,
  // gdy jest ustawiony adsenseSlot. Bez slotu reklamy rozmieszcza Automatyczna reklama AdSense.
  const slots = document.querySelectorAll(".ad");
  if (!slots.length || !SITE_CONFIG.adsenseClient || !SITE_CONFIG.adsenseSlot) return;
  slots.forEach((el) => {
    el.innerHTML = `<ins class="adsbygoogle" style="display:block" data-ad-client="${SITE_CONFIG.adsenseClient}" data-ad-slot="${SITE_CONFIG.adsenseSlot}" data-ad-format="auto" data-full-width-responsive="true"></ins>`;
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  });
}
document.addEventListener("DOMContentLoaded", loadAds);
