export const telephoneNumber = '+421 951 268 876';
export const whatsAppNumber = 'https://wa.me/421951268876';
export const instagramUrl = 'https://instagram.com/alexa_lashes_bratislava';
export const tiktokUrl = 'https://tiktok.com/@alexa_lashes_bratislava';
export const youtubeUrl = 'https://www.youtube.com/@alexa_lashes_bratislava';
export const email = 'alecsandraafanasyeva@gmail.com';
export const address = 'Pajštúnska 1, 851 01 Bratislava - Petržalka';
export const mapsUrl = 'https://maps.app.goo.gl/mTVDSACYUsSW4yN17';
/** Canonical Google Business Profile URL (CID form) for JSON-LD `sameAs`/`hasMap`; `mapsUrl` is the short link for UI. */
export const googleBusinessUrl = 'https://www.google.com/maps?cid=15930515621788203838';
export const geoCoordinates = { lat: 48.11161906921437, lng: 17.102062243103443 };

export type LashPrice = {
  name: string;
  price: number;
};

export type Faq = {
  question: string;
  answer: string;
};

export type User = {
  name: string;
  email: string;
  message: string;
};

export type Gallery = {
  src: string;
  name: string;
};

export const ContactType = {
  Training: 'training',
  Contact: 'contact',
} as const;

export type ContactFormBody = {
  contactType: (typeof ContactType)[keyof typeof ContactType];
} & User;
