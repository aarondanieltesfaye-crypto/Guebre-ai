# Guebre-ai

Guebre-ai is the school assistant and news page for Lycée Guebre-Mariam
(~1,800 students, preschool to terminale).

**Public site:** [https://aarondanieltesfaye-crypto.github.io/Guebre-ai/](https://aarondanieltesfaye-crypto.github.io/Guebre-ai/)

Visitors never enter an API key. School facts (calendar, who to email) are
answered from files in this repo. Optional live AI uses Groq behind a server.

## What changed

- Official LGM contact directory (from [guebre-mariam.org/contact](https://www.guebre-mariam.org/contact/))
- Email options appear while typing in the chat box or the remarks form
- Remarks form labels say whose name / whose email, plus a recipient picker
- Daily question quota removed
- Hosted on GitHub Pages (no Netlify required)

## Costs to watch for 1,800 people

GitHub Pages (the website itself) is **free**. The money risk is the **AI**,
not the pages.

| What | Free path | What to watch |
| --- | --- | --- |
| Website hosting | GitHub Pages | $0. Custom domain on GitHub is also $0. |
| HTTPS / SSL | Included | $0 |
| School facts (calendar, who to email) | Files in this repo | $0 — works even if AI is down |
| Optional live AI (Groq) | Groq free tier: ~30 requests/min, **14,400 requests/day** | Enough for a school day **if** people do not spam. Removing the 7-question cap means one person can burn the whole quota. |
| Groq paid (only if free tier is too small) | Llama 3.1 8B Instant: **$0.05 / 1M input tokens**, **$0.08 / 1M output tokens** | Heavy use example: 1,800 students × 5 questions/day × 800 tokens ≈ 7.2M tokens/day → about **$0.40–$0.70/day** (~$12–$21/month) on this cheap model. A bigger model (Llama 3.3 70B) is ~10× more. |
| Server for the AI key | Vercel Hobby is $0, **personal / non-commercial**. A school site is commercial-ish. | If Vercel asks you to upgrade: **Pro is $20/month**, then extra function use. **Do not put the Groq key in the browser** — anyone would steal it and you pay. |
| Remarks emails | Opens the visitor's own mail app (`mailto:`) | $0. Paid form services (Formspree, etc.) charge once volume grows. |
| Bandwidth | GitHub Pages is generous for a light school site | This site is tiny. Unlikely to cost anything. |
| Abuse / spam | No per-user cap anymore | Biggest real risk: one script hitting the AI thousands of times. Keep the Groq key on a server and watch the Groq dashboard. |
| Domain | Optional | A `.org` / `.et` domain is typically **$10–$40 / year**, not required. |
| Privacy / legal | — | Do not store student grades or personal files. Remarks go through the visitor's own email. |

**Practical advice:** stay on GitHub Pages + the built-in directory (cost **$0**).
Add Groq later only if you want open conversation beyond school facts. Start
with Groq's free tier; if the dashboard shows 429 errors during the school day,
add a card and keep the cheap 8B model.

## How the assistant works

1. The visitor types a question.
2. Matching school emails appear under the box.
3. The site tries `/api/chat` (Vercel or `npm start`). If that is missing, it
   answers from `contacts.js` and the calendar files.
4. Contact answers always use the official emails from the LGM contact page.

## Optional live AI (Vercel)

1. Create a free Groq key at [console.groq.com](https://console.groq.com).
2. Import this GitHub repo into Vercel.
3. Add env var `GROQ_API_KEY`.
4. Put the Vercel URL in `config.js` as `CHAT_API_URL` (example:
   `https://your-app.vercel.app/api/chat`) and push.

## Important files

| File | Role |
| --- | --- |
| `index.html`, `styles.css`, `app.js` | Public site |
| `contacts.js` | Official who-to-email directory |
| `local-answer.js` | On-device answers when no AI server |
| `knowledge/lgm-corpus.js` | Documents the AI may cite |
| `server/chat-core.js` | Groq call |
| `api/chat.js` | Vercel function |
| `server.js` | Local `npm start` |
| `logo-mark.png`, `logo.png` | Brand |
