export const telephoneNumber = "+421 951 268 876";
export const whatsAppNumber = "https://wa.me/421951268876";
export const email = "info@alexalashes.sk";
export const address = "Pajštúnska 1, 851 01 Bratislava";

export type Benefit = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

export type Review = {
  name: string;
  description: string;
};

export type Service = {
  name: string;
  description: string;
  duration: string;
  price: string;
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
