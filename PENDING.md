# superme-product · PENDING

Quiz funnel for SuperMe (MyEntourage Sàrl, Lausanne). Problem-aware visitors take a 5-question matching quiz
in the hero, see 3 matched experts, then book a free 45-minute first session held by a $1 refundable deposit.

- Copy: `funnel-copy/01-landing.md` (NO-BRAINER), applied verbatim. Step 2 (payment) is lifted from the reference page.
- Theme: `_intake/SuperMe_Black_Friday_Landing_Page.html` (navy #053279, cyan #00a8e8, DM Sans + Manrope wordmark).
- Facts: `_intake/source-facts.md` (mysuperme.com).
- Flow: `/` (`components/Quiz.tsx`) Q1 to Q5 → safety screens (body pain / stress and anxiety), then the answers go
  to sessionStorage (`lib/answers.ts`) and the visitor moves to `/match` (`components/Match.tsx`): AI loader (UI only)
  → 3 matches → Step 1 of 2 details → Step 2 of 2 payment → confirmation. `/match` without saved answers sends the
  visitor back to `/#quiz`; "Edit my answers" on `/match` reopens the last question on `/`.
- Experts: `lib/experts-data.ts`, 20 real experts from the first page of mysuperme.com/experts (pulled 2026-11-12),
  photos in `public/experts/`. Matching (`lib/match.ts`) scores them on Q1 focus, specialties and language. Re-pull
  when the directory changes.

Every open item shows on the page as a yellow `[TODO: ...]` marker.

## Decided (2026-11-12)

- The first session costs $1 "for now" (Atul), refunded when you attend. Never "free" anywhere on the page. Session is 45 minutes plus a written summary (reference page).
- 3 experts, ranked; card 1 badged "Closest to your answers".
- Crisis lines: UK 999 / Samaritans 116 123 / NHS 111 option 2 · France 15 or 112 / 3114 · Switzerland 144 or 112 / 143.
- Legal links point to mysuperme.com/privacy, /terms, /refund.
- Step 2 shows both reference offers ($1 first session, preselected; €9-style Mind & Body Kickstart as
  recommended) with the reference's currency selector, default USD. Black Friday labels and prototype notes removed.

## Open

0. **Verify before launch, hero + section 5, from Atul's designs.** The hero shows "12,000+ people have already
   taken their first session" and "4.8 / 5 from verified sessions"; section 5 says "4.9/5 average rating". The
   two ratings disagree, so at least one must change. Section 5 (Trust): "12,000+ matched sessions", "4.9/5 average
   rating", "88% would book again", "thousands have already taken / booked". No source on file. The public expert
   directory shows roughly 350 sessions across the 20 experts pulled, and section 2 says "We're new to you".
   Confirm each number with SuperMe's data, or change them. (The design's client quote was removed by Atul.) The three
   avatars (`public/trust/face-1..3.webp`) are cropped from Atul's design image, so they are not known
   SuperMe clients: swap in real client photos (with consent) before launch.

1. Payment processor and booking: `PAYMENT_URL` in `lib/plans.ts`. Until set, the pay button shows a confirmation screen with a TODO.
2. How the session time is chosen and where the confirmation arrives.
3. Login method for "Already on SuperMe? Log in", and where Step 1 details are sent (nothing is submitted yet).
4. Legal sign-off on both consent wordings in Step 1.
5. Currency per market on the landing page (the $1 and CHF anchors).
6. "Show me 3 more" (on /match, from Atul's design) walks down the front-end ranking in `lib/match.ts` and starts
   over when fewer than 3 are left. Confirm that matches how SuperMe wants rematching to work.
7. Any real urgency limit. Kickstart: confirm it should be sold here at all.
8. French version. Tracking (Meta, GA4, Clarity) not wired.

## To run

`npm install` then `npm run dev`. Not run by Claude.
