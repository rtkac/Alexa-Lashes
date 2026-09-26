import { getReviews } from '@alexa-lashes/db/queries/reviews';
import { locales } from '@alexa-lashes/types/locales';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const outDir = path.resolve(fileURLToPath(import.meta.url), '../../data');
const outFile = path.join(outDir, 'reviews.json');

const reviewsByLocale = Object.fromEntries(
  await Promise.all(
    locales.map(async (locale) => {
      const reviews = await getReviews(locale);
      return [locale, reviews];
    }),
  ),
);

await mkdir(outDir, { recursive: true });
await writeFile(outFile, `${JSON.stringify(reviewsByLocale, null, 2)}\n`);

console.log(`Generated reviews for locales: ${locales.join(', ')}`);
