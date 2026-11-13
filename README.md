# The Entrepreneurial DNA Quiz

A 10-question personality quiz that sorts takers into one of four entrepreneurial archetypes. Plain HTML, CSS and JavaScript, so there is nothing to build or install.

## Put it online with Netlify

**Drag and drop:** log in at [app.netlify.com](https://app.netlify.com), go to **Sites → Add new site → Deploy manually**, and drag this whole folder onto the page.

**Or from GitHub:** **Add new site → Import an existing project**, pick this repo, leave the build command empty and set the publish directory to `.`.

Netlify gives you a link to share. You can rename it under **Site configuration → Change site name**.

## See your classmates' responses

1. In Netlify, open the site and go to **Forms**, then click **Enable form detection**.
2. Redeploy the site once (**Deploys → Trigger deploy**).
3. Each completed quiz then appears under **Forms → quiz-results** with the archetype, the ten answer letters and the four scores. You can export them as CSV.

Responses are anonymous. The free Netlify plan includes 100 form submissions a month.

## Editing the content

Everything the quiz says lives in `quiz-data.js`:

- `QUESTIONS` holds the questions. Options are always in the order A, B, C, D.
- `ARCHETYPES` holds each result's quote, summary, strengths, career directions and UBC Sauder courses, copied from the group's Google Doc.

## Scoring

A = Strategic Mind, B = Innovation Architect, C = Impact Catalyst, D = Visionary Leader. The archetype with the most answers wins. On a tie, the tied archetype picked most recently wins.
