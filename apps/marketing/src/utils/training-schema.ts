import { personRef, postalAddress, salonRef } from './schema';

import { pageUrl } from './index';
import { m } from '@/paraglide/messages';

export const basicTrainingPrice = 870;

const location = {
  '@type': 'Place',
  address: postalAddress,
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
  instructor: personRef,
  location,
};

export const basicCourseSchema = () => ({
  '@type': 'Course',
  '@id': 'https://alexalashes.sk/training/basic/#course',
  name: m.meta_schema_training_basic_title(),
  description: m.training_basic_desc(),
  url: pageUrl('/training/basic/'),
  image: 'https://alexalashes.sk/basic-training-banner.webp',
  provider: salonRef,
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
  provider: salonRef,
  hasCourseInstance: twoDayInstance,
});
