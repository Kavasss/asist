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
  alior: {
    title: "Konto firmowe Alior Bank — załóż online w kilka minut",
    text: "Rachunek dla JDG i spółek zakładany przez internet, z kartą firmową i aplikacją mobilną. Sprawdź aktualną promocję z premią dla nowych firm.",
    note: "Dla nowych klientów biznesowych Alior Banku. Wysokość premii i warunki — w aktualnym regulaminie promocji.",
    cta: "Załóż konto firmowe", url: "https://kavasss.produktyfinansowe.pl/e/lead/42?source=lt", advertiser: "Alior Bank S.A.",
  },
};

// Tłumaczenia ofert dla wersji językowych (lang z <html lang="...">). Brak tłumaczenia = tekst polski.
const OFFERS_I18N = {
  en: {
    labels: { ad: "Advertisement", link: "affiliate link" },
    mbank: { title: "mBank eKonto — get up to 1000 PLN + up to 300 PLN in Biedronka vouchers", text: "0 PLN to open and keep the account, 0 PLN for BLIK and ATM withdrawals in Poland from 300 PLN.", note: "For new mBank customers. Details and conditions in the promotion terms.", cta: "Open eKonto" },
    bnp: { title: "BNP Paribas Konto Otwarte na Ciebie — bonus of up to 1100 PLN", text: "Bonus for account activity in the “Podróżnik z aplikacją 2” promotion.", note: "For people who have not had a BNP Paribas product in the last 24 months. Details in the promotion terms.", cta: "Open an account" },
    pekao: { title: "Pekao Konto Biznes z Żubrem — up to 5000 PLN bonus for your business", text: "Bonus for everyday business activity and 3% per year on the Business Savings Account.", note: "For new Bank Pekao customers (no account in the bank in the last year). Details in the promotion terms.", cta: "Open a business account" },
    alior: { title: "Alior Bank business account — open online in minutes", text: "An account for sole traders and companies opened online, with a business card and mobile app. Check the current welcome-bonus promotion for new businesses.", note: "For new Alior Bank business customers. Bonus amount and conditions in the current promotion terms.", cta: "Open a business account" },
  },
  uk: {
    labels: { ad: "Реклама", link: "партнерське посилання" },
    mbank: { title: "eKonto mBank — отримайте до 1000 zł + до 300 zł ваучерами в Biedronka", text: "0 zł за відкриття й обслуговування, 0 zł за BLIK і зняття в банкоматах у Польщі від 300 zł.", note: "Для нових клієнтів mBank. Деталі та умови — у правилах акції.", cta: "Відкрити eKonto" },
    bnp: { title: "Konto Otwarte na Ciebie BNP Paribas — премія до 1100 zł", text: "Премія за активність на рахунку в акції «Podróżnik z aplikacją 2».", note: "Для тих, хто протягом 24 місяців не мав продуктів BNP Paribas. Деталі — у правилах акції.", cta: "Відкрити рахунок" },
    pekao: { title: "Konto Biznes z Żubrem Pekao — до 5000 zł премії для вашої фірми", text: "Премія за щоденну активність фірми та 3% річних на бізнес-ощадному рахунку.", note: "Для нових клієнтів Bank Pekao (без рахунку в банку протягом останнього року). Деталі — у правилах акції.", cta: "Відкрити бізнес-рахунок" },
    alior: { title: "Бізнес-рахунок Alior Bank — відкриття онлайн за кілька хвилин", text: "Рахунок для ФОП (JDG) і компаній, відкривається через інтернет, з бізнес-карткою та мобільним застосунком. Перевірте актуальну акцію з премією для нових фірм.", note: "Для нових бізнес-клієнтів Alior Bank. Розмір премії та умови — в актуальних правилах акції.", cta: "Відкрити бізнес-рахунок" },
  },
  ru: {
    labels: { ad: "Реклама", link: "партнёрская ссылка" },
    mbank: { title: "eKonto mBank — получите до 1000 zł + до 300 zł ваучерами в Biedronka", text: "0 zł за открытие и обслуживание, 0 zł за BLIK и снятие в банкоматах в Польше от 300 zł.", note: "Для новых клиентов mBank. Подробности и условия — в правилах акции.", cta: "Открыть eKonto" },
    bnp: { title: "Konto Otwarte na Ciebie BNP Paribas — премия до 1100 zł", text: "Премия за активность на счёте в акции «Podróżnik z aplikacją 2».", note: "Для тех, у кого в последние 24 месяца не было продуктов BNP Paribas. Подробности — в правилах акции.", cta: "Открыть счёт" },
    pekao: { title: "Konto Biznes z Żubrem Pekao — до 5000 zł премии для вашей фирмы", text: "Премия за ежедневную активность фирмы и 3% годовых на бизнес-сберегательном счёте.", note: "Для новых клиентов Bank Pekao (без счёта в банке за последний год). Подробности — в правилах акции.", cta: "Открыть бизнес-счёт" },
    alior: { title: "Бизнес-счёт Alior Bank — открытие онлайн за несколько минут", text: "Счёт для ИП (JDG) и компаний, открывается через интернет, с бизнес-картой и мобильным приложением. Проверьте актуальную акцию с премией для новых фирм.", note: "Для новых бизнес-клиентов Alior Bank. Размер премии и условия — в актуальных правилах акции.", cta: "Открыть бизнес-счёт" },
  },
  de: {
    labels: { ad: "Anzeige", link: "Partnerlink" },
    mbank: { title: "mBank eKonto — bis zu 1000 PLN + bis zu 300 PLN in Biedronka-Gutscheinen", text: "0 PLN für Eröffnung und Kontoführung, 0 PLN für BLIK und Abhebungen an Geldautomaten in Polen ab 300 PLN.", note: "Für Neukunden der mBank. Details und Bedingungen in den Aktionsbedingungen.", cta: "eKonto eröffnen" },
    bnp: { title: "BNP Paribas Konto Otwarte na Ciebie — Prämie bis zu 1100 PLN", text: "Prämie für Kontoaktivität in der Aktion „Podróżnik z aplikacją 2“.", note: "Für Personen ohne BNP-Paribas-Produkt in den letzten 24 Monaten. Details in den Aktionsbedingungen.", cta: "Konto eröffnen" },
    pekao: { title: "Pekao Konto Biznes z Żubrem — bis zu 5000 PLN Prämie für Ihre Firma", text: "Prämie für die tägliche Geschäftsaktivität und 3 % pro Jahr auf dem Business-Sparkonto.", note: "Für Neukunden der Bank Pekao (kein Konto bei der Bank im letzten Jahr). Details in den Aktionsbedingungen.", cta: "Geschäftskonto eröffnen" },
    alior: { title: "Alior Bank Geschäftskonto — in wenigen Minuten online eröffnen", text: "Konto für Einzelunternehmer und Firmen, online eröffnet, mit Firmenkarte und App. Prüfen Sie die aktuelle Prämienaktion für neue Firmen.", note: "Für neue Geschäftskunden der Alior Bank. Prämienhöhe und Bedingungen in den aktuellen Aktionsbedingungen.", cta: "Geschäftskonto eröffnen" },
  },
};

// Które oferty pokazujemy w danym miejscu strony (data-partners="...").
const PARTNERS = {
  home: [OFFERS.mbank, OFFERS.bnp, OFFERS.pekao, OFFERS.alior],
  lokata: [OFFERS.mbank, OFFERS.bnp],
  invest: [OFFERS.mbank, OFFERS.bnp],
  kredyt: [OFFERS.mbank, OFFERS.bnp],
  firma: [OFFERS.pekao, OFFERS.alior],
};

function renderPartners() {
  const t = OFFERS_I18N[document.documentElement.lang] || {};
  const labels = t.labels || { ad: "Reklama", link: "link partnerski" };
  const localize = (o) => ({ ...o, ...(t[Object.keys(OFFERS).find((k) => OFFERS[k] === o)] || {}) });
  const pick = (u) => (Array.isArray(u) ? u[Math.floor(Math.random() * u.length)] : u);
  document.querySelectorAll("[data-partners]").forEach((box) => {
    const offers = (PARTNERS[box.dataset.partners] || []).map(localize).map((o) => ({ ...o, url: pick(o.url) })).filter((o) => o.url);
    box.innerHTML = offers.map((o) => `
      <div class="card offer">
        <b>${o.title}</b><p>${o.text}</p>
        <a class="btn" href="${o.url}" target="_blank" rel="sponsored noopener">${o.cta}</a>
        <small>${o.note ? o.note + "<br>" : ""}${labels.ad}${o.advertiser ? " · " + o.advertiser : ""} · ${labels.link}</small>
      </div>`).join("");
  });
}
document.addEventListener("DOMContentLoaded", renderPartners);
