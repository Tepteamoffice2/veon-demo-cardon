// All facts below come from veon/client.json (company.contacts, products_services, facts W-F001…W-F007, socials).
export interface Phone { tel: string; display: string; }

const phone = (e164: string): Phone => {
  const d = e164.replace(/^\+38/, "");
  return { tel: `tel:${e164}`, display: `${d.slice(0, 3)} ${d.slice(3, 6)} ${d.slice(6, 8)} ${d.slice(8, 10)}` };
};

export const phones = {
  orders: phone("+380954190739"),
  orders2: phone("+380989319050"),
  finance: phone("+380931319050"),
  sto1: phone("+380973214105"),
  sto2: phone("+380663652019"),
  stoManager: phone("+380977472040"),
};

export const viber = "viber://chat?number=380977472040";
export const email = "mail@cardon.com.ua";
export const address = "м. Київ, вул. Кирилівська (Фрунзе), 69-Т";
export const addressShort = "вул. Кирилівська, 69-Т, Київ";
export const mapUrl = "https://www.google.com/maps?ll=50.476359,30.486047&z=14&t=m&hl=ru&gl=US&mapclient=embed&cid=10128840277203332538";
export const hours = "Пн–Пт 09:00–18:00";
export const since = "2008";

export const makes = ["Suzuki", "Toyota", "Lexus", "Mazda", "Honda", "Acura", "Subaru", "Nissan", "Mitsubishi"];

export const contactGroups: { task: string; phones: Phone[]; viber?: boolean }[] = [
  { task: "Обробка онлайн-замовлень", phones: [phones.orders, phones.orders2] },
  { task: "CARDON Автосервіс (СТО): запис на станцію", phones: [phones.sto1, phones.sto2] },
  { task: "Менеджер СТО (також Viber)", phones: [phones.stoManager], viber: true },
  { task: "Фінансові питання", phones: [phones.finance] },
];

export const socials = [
  { name: "Instagram", href: "https://www.instagram.com/cardon_auto/" },
  { name: "Facebook", href: "https://www.facebook.com/cardonauto" },
  { name: "YouTube", href: "https://www.youtube.com/channel/UCfNrj0N7TXERtYoSkxO0BhA" },
  { name: "TikTok", href: "https://www.tiktok.com/@cardon_auto" },
];

const mail = (subject: string, body?: string) =>
  `mailto:${email}?subject=${encodeURIComponent(subject)}${body ? `&body=${encodeURIComponent(body)}` : ""}`;

export const mailArticleSubject = "Запит за артикулом";
export const mailArticle = mail(mailArticleSubject);
export const mailVin = mail(
  "Запит за VIN-кодом",
  "Марка і модель авто:\nVIN-код (17 символів, з техпаспорта):\nЩо потрібно або що зламалось:\nТелефон для зв’язку:\n",
);

export const NOTE = "Розділ у розробці";
export const NOTE_SEARCH = "Пошук запрацює у повній версії сайту";
