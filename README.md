# Signal Intelligence Lab

Signal Intelligence Lab is a React/Vite portfolio application that demonstrates human-centered AI signal intelligence for AI infrastructure, energy, manufacturing, and operational decision support.

The product emphasizes methodology over prediction: public signals are translated into testable expectations, validation windows, outcomes, and business actions using static local data.

## Run Locally

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
```

The app is Vercel-ready with `vercel.json` configured for Vite.

## Application Scope

- Public signal methodology
- One-year signal timeline
- Backtested signal cards
- Source-backed evidence scorecard
- Category and audience filters
- Local executive brief generator
- Interactive source-backed evidence database
- Filterable reporting lab with CSV export
- Real-data story graphs tied to sourced evidence records
- Source monitoring framework
- Current outlook for AI infrastructure and energy-constrained operations

## Data Lab

The Data Lab page uses a local source-backed evidence ledger to show how public observations can be turned into structured signal intelligence. It includes filters for category, quarter, source type, and search terms, real-data story graphs, summary reports, and CSV export.

The public JSON dataset is available at:

```text
/data/evidence-records.json
```

Each signal card includes a decision-flow chart showing the linked evidence inputs, measured signal, testable expectation, validation readout, and recommended business action.

The data-story graphs use only numeric values from sourced records. Non-numeric monitoring records are excluded from charting until exact values are extracted from source data.

The included records are working evidence records with source URLs, retrieval dates, metric values, units, and decision notes. Before public release, each record should receive a final analyst review against the source document and, where possible, an archived source snapshot.
