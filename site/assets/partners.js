// Oferty partnerskie. Blok wyświetla się tylko, gdy uzupełniony jest url.
// url        — Twój link afiliacyjny z sieci (MyLead, Systempartnerski.pl, Afilo, Comperia, Awin itp.)
// advertiser — nazwa reklamodawcy (opcjonalnie, do oznaczenia reklamy)
const PARTNERS = {
  lokata: [
    { title: "Najlepsze lokaty i konta oszczędnościowe", text: "Porównaj oprocentowanie banków i załóż lokatę online", cta: "Sprawdź oferty", url: "", advertiser: "" },
  ],
  invest: [
    { title: "Konto maklerskie / IKE / IKZE", text: "Zacznij inwestować w ETF-y od niewielkiej kwoty", cta: "Otwórz konto", url: "", advertiser: "" },
  ],
  kredyt: [
    { title: "Kredyt konsolidacyjny", text: "Połącz raty i obniż miesięczną spłatę", cta: "Sprawdź ratę", url: "", advertiser: "" },
    { title: "Karta kredytowa z okresem bezodsetkowym", text: "Nawet kilkadziesiąt dni bez odsetek", cta: "Zamów kartę", url: "", advertiser: "" },
  ],
};

function renderPartners() {
  document.querySelectorAll("[data-partners]").forEach((box) => {
    const offers = (PARTNERS[box.dataset.partners] || []).filter((o) => o.url);
    box.innerHTML = offers.map((o) => `
      <div class="card offer">
        <b>${o.title}</b><p>${o.text}</p>
        <a class="btn" href="${o.url}" target="_blank" rel="sponsored noopener">${o.cta}</a>
        <small>Reklama${o.advertiser ? " · " + o.advertiser : ""} · link partnerski</small>
      </div>`).join("");
  });
}
document.addEventListener("DOMContentLoaded", renderPartners);
