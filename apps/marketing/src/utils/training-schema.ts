import { pageUrl } from './index';
import { m } from '@/paraglide/messages';
import { instagramUrl } from '@/types';

export const basicTrainingPrice = 870;

const provider = {
  '@type': 'BeautySalon',
  '@id': 'https://alexalashes.sk/#salon',
  name: 'Alexa Lashes',
  url: 'https://alexalashes.sk',
};

const instructor = {
  '@type': 'Person',
  jobTitle: 'Lash Stylist',
  name: 'Oleksandra Afanasieva',
  image: 'https://alexalashes.sk/alexa-lashes-stylist.webp',
  sameAs: instagramUrl,
};

const location = {
  '@type': 'Place',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Pajštúnska 1',
    addressLocality: 'Bratislava',
    addressRegion: 'Bratislava',
    postalCode: '85101',
    addressCountry: 'SK',
  },
  url: 'https://alexalashes.sk/contact/',
};

/** Two onsite days, 8 hours each. */
const twoDayInstance = {
  '@type': 'CourseInstance',
  courseMode: 'Onsite',
  courseWorkload: 'PT16H',
  courseSchedule: {
    '@type': 'Schedule',
    duration: 'PT8H',
    repeatCount: 2,
    repeatFrequency: 'Daily',
  },
  inLanguage: ['sk', 'ru', 'uk'],
  instructor,
  location,
};

export const basicCourseSchema = () => ({
  '@type': 'Course',
  '@id': 'https://alexalashes.sk/training/basic/#course',
  name: m.meta_schema_training_basic_title(),
  description: m.training_basic_desc(),
  url: pageUrl('/training/basic/'),
  image: 'https://alexalashes.sk/basic-training-banner.webp',
  provider,
  offers: {
    '@type': 'Offer',
    category: 'Paid',
    price: String(basicTrainingPrice),
    priceCurrency: 'EUR',
    url: pageUrl('/training/basic/'),
  },
  hasCourseInstance: twoDayInstance,
});

export const advancedCourseSchema = () => ({
  '@type': 'Course',
  '@id': 'https://alexalashes.sk/training/#advanced-course',
  name: m.training_advanced_subtitle(),
  description: m.training_advanced_desc(),
  image: 'https://alexalashes.sk/advanced-training-banner.webp',
  provider,
  hasCourseInstance: twoDayInstance,
});
