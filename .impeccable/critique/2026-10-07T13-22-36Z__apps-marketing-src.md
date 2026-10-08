---
target: marketing website
total_score: 24
max_score: 36
na_heuristics: 7
p0_count: 1
p1_count: 2
target_identity: "file:/Users/radovan.tkac/Documents/development/alexa-lashes/apps/marketing/src"
timestamp: 2026-10-07T13-22-36Z
slug: apps-marketing-src
---
# Critique: apps/marketing (whole site)
Score 24/36 (H7 n/a). Acceptable/Good boundary (67%).

## Design specificity
Mostly template-grade: stock hero face, "Welcome to X" block, 3-up lucide icon benefit cards, identical centered h2 + equal mb-18/md:mb-25 rhythm, .card on everything, gold icon chips, gold kickers, "Are you ready for…" CTA band on every page, Manrope-only 700–800, gold as the only accent move. Authored parts: prices page (LashPriceCard subgrid, dotted leaders), Program timeline, real salon/Alexa photos.
Detector: CLI 0 findings. Browser overlay: real = placeholder contrast 3.7:1 on contact form, ~97-char welcome line length, ~89-99 char lines on training/about; false positives = carousel clipping, FAQ cramped-padding, Google Maps iframe tiny text.

## Priority issues
1. [P0] [TODO Alexa] placeholder copy visible in FAQ (messages/*.json:93,99,101) + FAQPage JSON-LD; "AlexaLashses s.r.o." typo in footer & privacy (messages/*.json:55,288/289). clarify
2. [P1] Hero: stock model with un-extended lashes instead of Alexa's work; primary button = Price list, Book = secondary; generic H1; location line hidden on mobile (index.tsx:91-120, Banner.tsx). clarify, layout
3. [P1] Template rhythm/filler: Welcome + Benefits grid (index.tsx:121-136, Benefits.tsx), uniform centered h2s & spacing, proof (gallery, reviews) arrives 4th/5th, generic CTA copy. distill, layout
4. [P2] Fragmented booking: hero → /contact, CTA/prices → WhatsApp; no header Book; ~9 equal channels on contact; no response-time reassurance; avg rating computed but only in JSON-LD; cookie banner covers content/buttons. clarify, layout
5. [P2] Typographic voice & gold overuse: single font, leading-snug body, gold text on checklists/kickers/breadcrumbs, chroma-0 greys vs cream. typeset, quieter

## Persona red flags
Jordan: no visual for 1D/2D/3-4D on prices; "Book" doesn't book; no appointment length. Riley: TODO copy, unequal review heights, nowrap buttons in RU, empty map box on error. Casey: no reachable booking action on mobile, hero description hidden. IG comparer: stock hero mismatches IG feed; reviews all use logo avatar, no source.

## Minor
Duplicate salon images across home/about; training index vs detail header inconsistency; repeated H1/H2 on training; hardcoded bg-[#4a413a]; gallery alt "Gallery Image N" hardcoded English; same scale-110 hover on all thumbnails; course enquiry button says "Book an appointment".
