import { createReview } from '../queries/reviews';

const name = 'John Doe'; // add reviewer name here
const rating = 5; // 1-5
const url = 'https://example.com/1'; // link to the original review, optional
// A description is required for every locale (see packages/types/src/locales.ts)
const translations = {
  sk: 'Produkt bol vynikajúci!',
  en: 'The product was excellent!',
  ru: 'Продукт был отличным!',
};

const reviewId = await createReview({
  name,
  rating,
  url,
  translations,
});

console.log(`Seeded review: ${reviewId}`);
