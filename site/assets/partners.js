// Oferty partnerskie. Blok wyświetla się tylko, gdy uzupełniony jest url.
// url        — Twój link afiliacyjny z sieci (MyLead, Systempartnerski.pl, Afilo, Comperia, Awin itp.)
//              lub tablica linków — wtedy przy każdym wejściu losowany jest jeden
// advertiser — nazwa reklamodawcy (opcjonalnie, do oznaczenia reklamy)
// Linki produktyfinansowe.pl — rotowane losowo.
const LINK_PF = [
  "https://kavasss.produktyfinansowe.pl/e/lead/3332?source=lt",
  "https://kavasss.produktyfinansowe.pl/e/lead/2189?source=lt",
  "https://kavasss.produktyfinansowe.pl/e/lead/1437?source=lt",
];

const PARTNERS = {
  lokata: [
    { title: "Porównaj oferty banków", text: "Sprawdź aktualne oferty kont, lokat i innych produktów finansowych", cta: "Porównaj oferty", url: LINK_PF, advertiser: "" },
  ],
  invest: [
    { title: "Porównaj produkty finansowe", text: "Zobacz aktualne oferty banków i instytucji finansowych w jednym miejscu", cta: "Zobacz oferty", url: LINK_PF, advertiser: "" },
  ],
  kredyt: [
    { title: "Porównaj oferty kredytów i pożyczek", text: "Sprawdź, gdzie możesz dostać lepsze warunki", cta: "Porównaj oferty", url: LINK_PF, advertiser: "" },
  ],
};

function renderPartners() {
  document.querySelectorAll("[data-partners]").forEach((box) => {
    const pick = (u) => (Array.isArray(u) ? u[Math.floor(Math.random() * u.length)] : u);
    const offers = (PARTNERS[box.dataset.partners] || []).map((o) => ({ ...o, url: pick(o.url) })).filter((o) => o.url);
    box.innerHTML = offers.map((o) => `
      <div class="card offer">
        <b>${o.title}</b><p>${o.text}</p>
        <a class="btn" href="${o.url}" target="_blank" rel="sponsored noopener">${o.cta}</a>
        <small>Reklama${o.advertiser ? " · " + o.advertiser : ""} · link partnerski</small>
      </div>`).join("");
  });
}
document.addEventListener("DOMContentLoaded", renderPartners);
