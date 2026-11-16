
# EcoTrack — Environmental Monitoring Dashboard

EcoTrack is a responsive environmental monitoring dashboard built with Next.js, React, TypeScript, and Tailwind CSS.

The application demonstrates environmental monitoring workflows using sample station readings from Lagos, Nigeria.

## Live Application

https://ecotrack-capstone.vercel.app/

## Features

- Environmental summary dashboard
- Searchable and filterable monitoring stations
- Environmental analytics and trend visualisation
- Active and acknowledged alert management
- Alert severity filtering
- Downloadable CSV environmental reports
- System health API and status page
- Reusable loading, empty and error components
- Responsive layouts

## Technology Stack

- Next.js 16.4.4
- React 19.3.0
- TypeScript
- Tailwind CSS 4
- Lucide React
- Vercel

## Getting Started

Clone the repository:

```bash
git clone https://github.com/Abdullbaasit/ecotrack-capstone.git
cd ecotrack-capstone
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Visit http://localhost:3000.

## Validation

```bash
npx tsc --noEmit
npm run lint
npm run build
```

## Application Routes

| Route | Description |
|---|---|
| / | Environmental dashboard |
| /stations | Monitoring station explorer |
| /analytics | Environmental analytics |
| /alerts | Alert management |
| /reports | Environmental reporting |
| /settings | Application settings |
| /health | Application health interface |
| /api/health | Health API endpoint |

## Data Disclaimer

EcoTrack currently uses illustrative environmental monitoring data.

Readings are not live measurements, official environmental warnings, or certifications of air or water safety.

## Future Improvements

- Verified environmental data integrations
- Historical environmental data storage
- Geographic monitoring visualisations
- Persistent alert management
- Automated tests

## Project Context

Developed as a React capstone project demonstrating reusable components, state management, TypeScript models, API integration and deployment.

## Repository

https://github.com/Abdullbaasit/ecotrack-capstone
