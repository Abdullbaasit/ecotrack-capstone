
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


## FE-07: Structured Tool Results

EcoTrack implements a server-side environmental station analysis tool.

The tool retrieves structured environmental readings from the application's demonstration dataset and returns validated results.

### Tool Name

`getStationAnalysis`

### Tool Description

Retrieve environmental readings for a specific monitoring station using its station ID.

### Input Schema

| Property | Type | Required | Description |
|---|---|---|---|
| stationId | string | Yes | Unique monitoring station identifier |

Example input:

```json
{
  "stationId": "ST-002"
}
```

### Output Schema

The tool returns:

```json
{
  "stationId": "ST-002",
  "name": "Ikeja Central",
  "area": "Ikeja",
  "readings": {
    "air": 112,
    "water": 71,
    "temperature": 31.2,
    "humidity": 68
  },
  "status": "Needs attention",
  "dataSource": "EcoTrack demonstration dataset",
  "disclaimer": "These measurements are illustrative and do not represent live environmental sensor data."
}
```

### Execution

The server-side execution function is:

`executeStationAnalysis()`

It validates incoming parameters, locates the requested monitoring station and validates the structured output using Zod.

### API Endpoint

`POST /api/station-analysis`

Example request:

```json
{
  "stationId": "ST-002"
}
```

Successful execution returns structured station analysis.

An invalid station identifier returns HTTP 404.

Invalid request parameters are rejected through input validation.

### Tool Interface States

The application demonstrates the following tool lifecycle states:

- Input available
- Output available
- Output error

Tool results are displayed through the Environmental Station Analysis interface.

### Technology Used

- Next.js API Routes
- TypeScript
- Zod schema validation
- React components

### Data Limitations

The tool uses EcoTrack's demonstration dataset. It does not retrieve live environmental sensor measurements or independently establish environmental safety conditions.
