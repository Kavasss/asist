// Oferty partnerskie (System Partnerski Bankier.pl). Blok wyświetla się tylko, gdy uzupełniony jest url.
// url        — link afiliacyjny; tablica linków = przy każdym wejściu losowany jest jeden
// advertiser — nazwa reklamodawcy (do oznaczenia reklamy)
// note       — najważniejsze warunki promocji, pokazywane drobnym drukiem
const OFFERS = {
  mbank: {
    title: "eKonto mBank — zgarnij nawet 1000 zł + do 300 zł w bonach do Biedronki",
    text: "0 zł za otwarcie i prowadzenie konta, 0 zł za BLIK i wypłaty z bankomatów w Polsce od 300 zł.",
    note: "Dla nowych klientów mBanku. Szczegóły i warunki w regulaminie promocji.",
    cta: "Załóż eKonto", url: "https://kavasss.produktyfinansowe.pl/e/lead/3332?source=lt", advertiser: "mBank S.A.",
  },
  bnp: {
    title: "Konto Otwarte na Ciebie BNP Paribas — premia nawet do 1100 zł",
    text: "Premia za aktywność na koncie w promocji „Podróżnik z aplikacją 2”.",
    note: "Dla osób, które w ostatnich 24 miesiącach nie miały produktu BNP Paribas. Szczegóły w regulaminie promocji.",
    cta: "Otwórz konto", url: "https://kavasss.produktyfinansowe.pl/e/lead/1437?source=lt", advertiser: "BNP Paribas Bank Polska S.A.",
  },
  pekao: {
    title: "Konto Biznes z Żubrem — do 5000 zł premii dla Twojej firmy",
    text: "Premia za codzienną aktywność firmy i 3% w skali roku na Koncie Oszczędnościowym Biznes.",
    note: "Dla nowych klientów Banku Pekao (bez konta w banku w ostatnim roku). Szczegóły w regulaminie promocji.",
    cta: "Otwórz konto firmowe", url: "https://kavasss.produktyfinansowe.pl/e/lead/2189?source=lt", advertiser: "Bank Pekao S.A.",
  },
};

// Które oferty pokazujemy w danym miejscu strony (data-partners="...").
const PARTNERS = {
  home: [OFFERS.mbank, OFFERS.bnp, OFFERS.pekao],
  lokata: [OFFERS.mbank, OFFERS.bnp],
  invest: [OFFERS.mbank, OFFERS.bnp],
  kredyt: [OFFERS.mbank, OFFERS.bnp],
  firma: [OFFERS.pekao],
};

function renderPartners() {
  const pick = (u) => (Array.isArray(u) ? u[Math.floor(Math.random() * u.length)] : u);
  document.querySelectorAll("[data-partners]").forEach((box) => {
    const offers = (PARTNERS[box.dataset.partners] || []).map((o) => ({ ...o, url: pick(o.url) })).filter((o) => o.url);
    box.innerHTML = offers.map((o) => `
      <div class="card offer">
        <b>${o.title}</b><p>${o.text}</p>
        <a class="btn" href="${o.url}" target="_blank" rel="sponsored noopener">${o.cta}</a>
        <small>${o.note ? o.note + "<br>" : ""}Reklama${o.advertiser ? " · " + o.advertiser : ""} · link partnerski</small>
      </div>`).join("");
  });
}
document.addEventListener("DOMContentLoaded", renderPartners);
