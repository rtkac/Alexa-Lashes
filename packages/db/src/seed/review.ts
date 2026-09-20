import { createReview } from '../queries/reviews';

const name = 'John Doe'; // add reviewer name here
const rating = 5; // 1-5
const url = 'https://example.com/1'; // link to the original review, optional
const translations = [{ locale: 'sk', description: 'The product was excellent!' }]; // add description(s) here

const reviewId = await createReview({
  name,
  rating,
  url,
  translations,
});

console.log(`Seeded review: ${reviewId}`);
