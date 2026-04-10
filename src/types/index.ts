export const telephoneNumber = "+421 951 268 876";
export const whatsAppNumber = "https://wa.me/421951268876";
export const instagramUrl = "https://instagram.com/alexa_lashes_bratislava";
export const tiktokUrl = "https://tiktok.com/@alexa_lashes_bratislava";
export const email = "alecsandraafanasyeva@gmail.com";
export const address = "Pajštúnska 1, 851 01 Bratislava - Petržalka";

export type Benefit = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

export type Review = {
  name: string;
  description: string;
  url: string;
};

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
  thumbSrc: string;
  src: string;
  name: string;
};

export const ContactType = {
  Training: "training",
  Contact: "contact",
} as const;

export type ContactFormBody = {
  contactType: (typeof ContactType)[keyof typeof ContactType];
} & User;
