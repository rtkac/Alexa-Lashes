# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primary: salon clients.** Women in Bratislava looking for eyelash extensions. They arrive to judge
the quality of the work, check prices, and get in touch to book. Served in Slovak (default), English
and Russian.

**Secondary: future and practising lash stylists.** People considering a course with Alexa, from
complete beginners to certified stylists who want advanced volume techniques.

## Product Purpose

The public website of Alexa Lashes, a lash studio in Bratislava-Petržalka. It exists to turn a
visitor into a booked client, and secondarily into a course enquiry. Success is a visitor contacting
the salon.

## Positioning

- **Alexa herself.** One named master, Oleksandra "Alexa" Afanasieva, with over 9 years in the
  beauty industry and dozens of certificates, does the work personally.
- **Natural-looking results.** Precision and a well-groomed, natural look rather than dramatic
  volume for its own sake.
- **Salon and teacher in one.** Alexa also trains other lash stylists, one-on-one, which is proof of
  expertise for clients as well as a service in its own right.

## Operating Context

- Booking is not self-service. Clients book by phone/WhatsApp, Instagram DM, or the site's contact
  form/email. There is no online booking system.
- Course enquiries go through the training form modal; course details are arranged individually.
- Reviews are managed in the internal admin app and baked into the site at build time, so a new
  review appears only after a marketing redeploy.
- The salon is at Pajštúnska 1, Bratislava-Petržalka, open Monday to Friday.

## Capabilities and Constraints

- Pages: home, about, price list, gallery, trainings (overview + basic course), contact, privacy
  policy.
- Services priced on the site: Classic 1D, 2D, 3-4D and 5-6D volume lashes (new set and 2/3/4-week
  refills), plus additional services.
- Basic course: individual (1 participant), 2 days, certificate, starter kit included.
- Three locales: `sk` (unprefixed), `en`, `ru`. Every user-facing string exists in all three via
  Paraglide.
- Analytics cookies only after consent.
- House rules for accessibility and SEO live in the repo `CLAUDE.md` and are binding.
- Shared components and the Tailwind theme come from `packages/ui`; changes there also affect the
  admin app.
- **Undecided:** the advanced course has copy in all three locales but no page yet.

## Brand Commitments

- Name: Alexa Lashes. Logo assets: `public/logo.svg`, `public/logo_primary.svg`, `public/logo.png`.
- Voice in existing copy: warm, personal and reassuring; course pages speak in Alexa's first person.
- Footer line: "Beauty, quality, and your satisfaction come first."

## Evidence on Hand

- Real client work: `public/0.webp`–`26.webp`.
- Real course photos: `public/course-*.webp`.
- Salon interior: `public/salon-*.webp`, `public/reception.webp`, `public/salon-alexa.webp`.
- Portrait of Alexa: `public/alexa-lashes-stylist.webp`.
- Real customer reviews with ratings, from the database (`src/data/reviews.json`, generated).
- "Since 2018" and "over 9 years of experience" are stated in current copy.
- Do not fabricate: reviews, certificates or awards by name, client counts, or prices.

## Product Principles

1. The work is the proof. Real photos and real reviews carry the argument.
2. Alexa is the brand. A named person, not an anonymous salon.
3. Every page leads to getting in touch, since booking happens in conversation.
4. Clients come first; training supports the salon's credibility without competing with it.
5. All three languages are first-class.

## Accessibility & Inclusion

WCAG 2.2 AA, per the house rules in the repo `CLAUDE.md`.
