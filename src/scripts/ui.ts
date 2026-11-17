// Small progressive enhancements. Everything works and is visible without this script.

// --- mobile menu ---
const header = document.querySelector<HTMLElement>(".site-header");
const burger = header?.querySelector<HTMLButtonElement>(".site-header__burger");
if (header && burger) {
  const setOpen = (open: boolean) => {
    header.classList.toggle("is-open", open);
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Закрити меню" : "Меню");
  };
  burger.addEventListener("click", () => setOpen(!header.classList.contains("is-open")));
  header.querySelectorAll<HTMLAnchorElement>(".site-nav a").forEach((a) => a.addEventListener("click", () => setOpen(false)));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && header.classList.contains("is-open")) { setOpen(false); burger.focus(); }
  });
  window.matchMedia("(min-width: 1024px)").addEventListener("change", () => setOpen(false));
}

// --- picker tabs (WAI-ARIA tabs, manual focus with arrows) ---
const picker = document.querySelector<HTMLElement>("[data-picker]");
let selectTab: ((id: string, focus?: boolean) => void) | null = null;
if (picker) {
  const tabs = Array.from(picker.querySelectorAll<HTMLButtonElement>('[role="tab"]'));
  const bar = picker.querySelector<HTMLElement>(".picker__bar");
  const moveBar = (tab: HTMLElement) => {
    if (!bar) return;
    bar.style.setProperty("--bar-x", `${tab.offsetLeft}px`);
    bar.style.setProperty("--bar-s", String(tab.offsetWidth / 100));
  };
  selectTab = (id, focus = false) => {
    tabs.forEach((t) => {
      const on = t.dataset.tab === id;
      t.setAttribute("aria-selected", String(on));
      t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute("aria-controls") || "")?.classList.toggle("is-active", on);
      if (on) { moveBar(t); if (focus) t.focus(); }
    });
  };
  tabs.forEach((t, i) => {
    t.addEventListener("click", () => selectTab!(t.dataset.tab!));
    t.addEventListener("keydown", (e) => {
      let n = -1;
      if (e.key === "ArrowRight") n = (i + 1) % tabs.length;
      else if (e.key === "ArrowLeft") n = (i - 1 + tabs.length) % tabs.length;
      else if (e.key === "Home") n = 0;
      else if (e.key === "End") n = tabs.length - 1;
      if (n < 0) return;
      e.preventDefault();
      selectTab!(tabs[n].dataset.tab!, true);
    });
  });
  const active = tabs.find((t) => t.getAttribute("aria-selected") === "true") || tabs[0];
  if (active) moveBar(active);
  const ro = new ResizeObserver(() => { const a = tabs.find((t) => t.getAttribute("aria-selected") === "true"); if (a) moveBar(a); });
  tabs.forEach((t) => ro.observe(t));

  // mailto with the typed article in the subject
  const input = picker.querySelector<HTMLInputElement>("[data-article]");
  const mail = picker.querySelector<HTMLAnchorElement>("[data-article-mail]");
  if (input && mail) {
    const base = mail.href.split("?")[0];
    const subject = input.dataset.subject || "";
    input.addEventListener("input", () => {
      const v = input.value.trim().toUpperCase();
      mail.href = `${base}?subject=${encodeURIComponent(v ? `${subject} ${v}` : subject)}`;
    });
  }
}

// Links that open a picker tab (make → VIN, mobile bar «За VIN»)
document.querySelectorAll<HTMLAnchorElement>("[data-go-tab]").forEach((a) => {
  a.addEventListener("click", (e) => {
    if (!selectTab || !picker) return;
    e.preventDefault();
    selectTab(a.dataset.goTab!);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    picker.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    window.setTimeout(() => picker.querySelector<HTMLElement>('[role="tab"][aria-selected="true"]')?.focus({ preventScroll: true }), reduce ? 0 : 450);
  });
});

// --- mobile action bar: shown once the hero call button leaves the screen ---
const mbar = document.querySelector<HTMLElement>(".mbar");
const heroCall = document.querySelector<HTMLElement>("[data-hero-call]");
if (mbar && heroCall && "IntersectionObserver" in window) {
  mbar.inert = true;
  new IntersectionObserver(([e]) => {
    const past = !e.isIntersecting && e.boundingClientRect.top < 0;
    mbar.classList.toggle("is-shown", past);
    mbar.inert = !past;
  }).observe(heroCall);
} else if (mbar) {
  mbar.classList.add("is-shown");
}
