# LGM documents for Guebre-ai

Guebre-ai is **not** trained as a new brain. It reads a fixed corpus, then
answers with a source. That is safer for a school, cheaper, and easier to
correct.

The **who-to-email** list lives in `../contacts.js`, copied from
https://www.guebre-mariam.org/contact/ — update that file when the school page
changes. Never invent an email.

## How to add a document (calendar, circular, menu, …)

1. Get written agreement from the school leadership.
2. Use only **public or semi-public** school documents. Never grades,
   attendance, or a student's file.
3. Copy the useful text (dates, rules, hours) into `knowledge/lgm-corpus.js`.
4. Fill `title`, `date`, `owner`, `text`.
5. Push to GitHub. GitHub Pages republishes the site.

A scanned PDF must be re-read by a human first. A wrong date is worse than
no answer.
