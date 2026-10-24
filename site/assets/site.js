// Общие функции: форматирование и подключение рекламы.
const SITE_CONFIG = {
  // Вставьте свои ID после одобрения рекламных сетей — и реклама включится автоматически.
  yandexBlockId: "",        // напр. "R-A-1234567-1" (РСЯ)
  adsenseClient: "",        // напр. "ca-pub-1234567890123456"
  adsenseSlot: "",
};

const fmt = (n) => new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 }).format(Math.round(n)) + " ₽";
const num = (id) => parseFloat(String(document.getElementById(id).value).replace(",", ".")) || 0;

function bindCalc(ids, fn) {
  ids.forEach((id) => document.getElementById(id).addEventListener("input", fn));
  fn();
}

function loadAds() {
  const slots = document.querySelectorAll(".ad");
  if (!slots.length) return;
  if (SITE_CONFIG.yandexBlockId) {
    window.yaContextCb = window.yaContextCb || [];
    const s = document.createElement("script");
    s.src = "https://yandex.ru/ads/system/context.js"; s.async = true;
    document.head.appendChild(s);
    slots.forEach((el, i) => {
      el.id = "yandex_rtb_" + i;
      window.yaContextCb.push(() => Ya.Context.AdvManager.render({ blockId: SITE_CONFIG.yandexBlockId, renderTo: el.id }));
    });
  } else if (SITE_CONFIG.adsenseClient) {
    const s = document.createElement("script");
    s.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=" + SITE_CONFIG.adsenseClient;
    s.async = true; s.crossOrigin = "anonymous";
    document.head.appendChild(s);
    slots.forEach((el) => {
      el.innerHTML = `<ins class="adsbygoogle" style="display:block" data-ad-client="${SITE_CONFIG.adsenseClient}" data-ad-slot="${SITE_CONFIG.adsenseSlot}" data-ad-format="auto" data-full-width-responsive="true"></ins>`;
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    });
  }
}
document.addEventListener("DOMContentLoaded", loadAds);
