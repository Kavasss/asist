// Wspólne funkcje: formatowanie i reklamy.
const SITE_CONFIG = {
  // Wpisz swoje ID po akceptacji w Google AdSense — reklamy włączą się automatycznie.
  adsenseClient: "",        // np. "ca-pub-1234567890123456"
  adsenseSlot: "",
};

const fmt = (n) => new Intl.NumberFormat("pl-PL", { style: "currency", currency: "PLN", maximumFractionDigits: 0 }).format(Math.round(n));
const num = (id) => parseFloat(String(document.getElementById(id).value).replace(",", ".")) || 0;

function bindCalc(ids, fn) {
  ids.forEach((id) => document.getElementById(id).addEventListener("input", fn));
  fn();
}

function loadAds() {
  const slots = document.querySelectorAll(".ad");
  if (!slots.length || !SITE_CONFIG.adsenseClient) return;
  const s = document.createElement("script");
  s.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=" + SITE_CONFIG.adsenseClient;
  s.async = true; s.crossOrigin = "anonymous";
  document.head.appendChild(s);
  slots.forEach((el) => {
    el.innerHTML = `<ins class="adsbygoogle" style="display:block" data-ad-client="${SITE_CONFIG.adsenseClient}" data-ad-slot="${SITE_CONFIG.adsenseSlot}" data-ad-format="auto" data-full-width-responsive="true"></ins>`;
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  });
}
document.addEventListener("DOMContentLoaded", loadAds);
