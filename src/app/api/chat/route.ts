
import { NextRequest } from 'next/server';
import { stations, alerts } from '@/data/environment';

function getEnvironmentalResponse(question: string): string {
  const query = question.toLowerCase().trim();

  // ==========================================
  // 1. CALCULATED ENVIRONMENTAL STATISTICS
  // ==========================================

  const averageAir = Math.round(
    stations.reduce((sum, station) => sum + station.air, 0) /
      stations.length
  );

  const averageWater = (
    stations.reduce((sum, station) => sum + station.water, 0) /
    stations.length
  ).toFixed(1);

  const averageTemperature = (
    stations.reduce((sum, station) => sum + station.temperature, 0) /
    stations.length
  ).toFixed(1);

  const highestAirStation = [...stations].sort(
    (a, b) => b.air - a.air
  )[0];

  const lowestWaterStation = [...stations].sort(
    (a, b) => a.water - b.water
  )[0];

  const highestTemperatureStation = [...stations].sort(
    (a, b) => b.temperature - a.temperature
  )[0];

  // ==========================================
  // 2. GREETINGS
  // ==========================================

  if (
    /^(hello|hi|hey|good morning|good afternoon|good evening)[!. ]*$/.test(
      query
    )
  ) {
    return `Welcome to EcoTrack Environmental Assistant!

I can help you explore environmental information available in this application.

You can ask me about:

1. Air quality and pollution indicators.
2. Water quality readings.
3. Temperature observations.
4. Climate change and global warming.
5. Environmental alerts and warnings.
6. Monitoring stations across Lagos.

You can also request an analysis of an individual monitoring station.

What would you like to know?

Important: I provide predefined responses based on EcoTrack's demonstration dataset, not live AI-generated answers or real-time sensor measurements.`;
  }

  // ==========================================
  // 3. STATION REQUIRING ATTENTION
  // ==========================================

  if (
    /(which|what|identify|name)/.test(query) &&
    /(station|location)/.test(query) &&
    /(attention|priority|worst|highest|concern|problem|needs)/.test(query)
  ) {
    return `The monitoring station requiring the most attention is ${highestAirStation.name} (${highestAirStation.id}).

Environmental readings:
- Air quality index: ${highestAirStation.air}
- Water quality index: ${highestAirStation.water}
- Temperature: ${highestAirStation.temperature}°C
- Area: ${highestAirStation.area}
- Status: ${highestAirStation.status}

Why it needs attention:

Its air quality index of ${highestAirStation.air} is the highest among the ${stations.length} demonstration monitoring stations.

Recommendation:

Prioritise reviewing the air-quality readings at ${highestAirStation.name} and verify the measurements before taking environmental management decisions.

Note: These are illustrative demonstration readings, not live sensor measurements.`;
  }

  // ==========================================
  // 4. CLIMATE CHANGE AND GLOBAL WARMING
  // IMPORTANT: This MUST come before temperature.
  // ==========================================

  if (
    /climate change|global warming|greenhouse gas(es)?|greenhouse effect|climate crisis|climate adaptation|climate mitigation|climate science/.test(
      query
    )
  ) {
    return `CLIMATE CHANGE AND GLOBAL WARMING

Climate change refers to long-term changes in the Earth's temperature and weather patterns. Current global warming is primarily driven by human activities that increase greenhouse gas concentrations in the atmosphere.

1. WHAT CAUSES CLIMATE CHANGE?

Major human-related contributors include:

- Burning fossil fuels such as coal, oil and natural gas.
- Deforestation and changes in land use.
- Agricultural activities and livestock production.
- Industrial processes.
- Waste management and landfill emissions.

2. ENVIRONMENTAL CONSEQUENCES

Climate change can contribute to:

- Rising global temperatures.
- More frequent and intense heatwaves.
- Changes in rainfall patterns.
- Increased risks of drought and flooding.
- Rising sea levels.
- Pressure on biodiversity and ecosystems.
- Changes in agricultural productivity and water availability.

3. HOW CAN WE ADDRESS CLIMATE CHANGE?

Climate change mitigation:

- Increase renewable energy adoption.
- Improve energy efficiency.
- Reduce greenhouse gas emissions.
- Promote sustainable transportation.
- Protect forests and restore degraded ecosystems.

Climate change adaptation:

- Promote climate-smart agriculture.
- Improve flood-management systems.
- Strengthen water conservation.
- Develop early-warning systems.
- Improve community resilience to extreme weather.

4. HOW TECHNOLOGY CAN HELP

Environmental technology can support climate action through:

- Satellite-based environmental monitoring.
- Geographic Information Systems (GIS).
- Environmental sensor networks.
- Climate data analytics.
- Greenhouse gas emissions monitoring.
- Predictive climate modelling.
- AI-assisted environmental analysis where appropriate.

5. APPLICATION TO ECOTRACK

EcoTrack can be extended to support climate-related environmental monitoring by integrating verified weather datasets, historical climate records, GIS information and environmental monitoring observations.

Such integration could help users identify environmental trends, visualise changing conditions and support evidence-based environmental decisions.

IMPORTANT SCIENTIFIC DISTINCTION:

Climate change is a long-term global phenomenon. EcoTrack's four sample monitoring stations provide illustrative local environmental measurements. These measurements cannot independently establish global climate trends or demonstrate climate change.`;
  }

  // ==========================================
  // 5. AIR QUALITY
  // ==========================================

  if (/air|aqi|pollution|particulate/.test(query)) {
    const highest = highestAirStation;

    return `Here is the air quality summary from EcoTrack's demonstration data.

The average air quality index across ${stations.length} monitoring stations is ${averageAir}.

The highest reading is at ${highest.name}, with an index of ${highest.air}. Its demonstration status is "${highest.status}".

Station readings:

${stations
  .map(
    s => `- ${s.name}: ${s.air} AQI (${s.status})`
  )
  .join('\n')}

Recommendation:

Prioritise a review of the particulate indicators at ${highest.name}.

These are illustrative readings, not live sensor measurements or an official health assessment.`;
  }

  // ==========================================
  // 6. WATER QUALITY
  // ==========================================

  if (/water|contamination/.test(query)) {
    return `Here is the water quality summary from the demonstration dataset.

The average water quality index is ${averageWater}/100 across ${stations.length} monitoring stations.

Station readings:

${stations
  .map(s => `- ${s.name}: ${s.water}/100`)
  .join('\n')}

The lowest recorded sample index is at ${lowestWaterStation.name}, with a reading of ${lowestWaterStation.water}.

Recommendation:

Investigate the lower sample reading and conduct appropriate laboratory testing before making any water safety conclusions.

Note: These figures are illustrative and do not establish whether water is safe for consumption.`;
  }

  // ==========================================
  // 7. TEMPERATURE
  // ==========================================

  if (/temperature|heat|hot/.test(query)) {
    return `Here is the temperature summary from EcoTrack.

The average temperature across the ${stations.length} sample stations is ${averageTemperature}°C.

Station readings:

${stations
  .map(s => `- ${s.name}: ${s.temperature}°C`)
  .join('\n')}

The highest sample temperature is recorded at ${highestTemperatureStation.name}, with ${highestTemperatureStation.temperature}°C.

These are demonstration readings, not live weather observations.`;
  }

  // ==========================================
  // 8. ENVIRONMENTAL ALERTS
  // ==========================================

  if (/alert|warning|risk/.test(query)) {
    return `Here is the environmental alert summary.

EcoTrack currently contains ${alerts.length} demonstration alerts.

${alerts
  .map(
    a => `- ${a.id} - ${a.title}
  Severity: ${a.severity}
  ${a.detail}`
  )
  .join('\n\n')}

The highest-priority alert is ${
      alerts.find(a => a.severity === 'High')?.title ??
      'None recorded'
    }.

Recommendation:

Review high-severity alerts first and verify the underlying measurements before taking action.`;
  }

  // ==========================================
  // 9. GENERAL MONITORING STATIONS
  // ==========================================

  if (/station|location|monitoring/.test(query)) {
    return `EcoTrack currently has ${stations.length} demonstration monitoring stations across Lagos.

${stations
  .map(
    s => `- ${s.name} (${s.id})
  Area: ${s.area}
  Air index: ${s.air}
  Water index: ${s.water}
  Temperature: ${s.temperature}°C
  Status: ${s.status}`
  )
  .join('\n\n')}

You can explore these locations on the Monitoring Stations page or use the Environmental Station Analysis tool for an individual station.`;
  }

  // ==========================================
  // 10. FALLBACK FOR UNSUPPORTED QUESTIONS
  // ==========================================

  return `I'm sorry, I couldn't identify what you're asking about.

I can currently help you with:

- Air quality: Ask about AQI, pollution and particulate indicators.
- Water quality: Ask about water readings and sample indices.
- Temperature: Ask about temperature across monitoring stations.
- Climate change: Ask about global warming, greenhouse gases, mitigation and adaptation.
- Environmental alerts: Ask about warnings and high-priority alerts.
- Monitoring stations: Ask about station locations, readings and environmental conditions.

Try asking:

"Explain climate change in simple terms."

"Which monitoring station needs the most attention?"

"What is the average temperature across the four monitoring stations?"

Note: I use predefined responses from EcoTrack's demonstration dataset. I do not provide live AI-generated answers or real-time sensor readings.`;
}

// ==========================================
// 11. API POST ROUTE AND STREAMING
// ==========================================

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const question = body.question;

    if (
      typeof question !== 'string' ||
      !question.trim() ||
      question.length > 1000
    ) {
      return Response.json(
        {
          error:
            'Please enter a valid question (maximum 1000 characters).',
        },
        { status: 400 }
      );
    }

    const answer = getEnvironmentalResponse(question.trim());
    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        try {
          const chunkSize = 12;

          for (let i = 0; i < answer.length; i += chunkSize) {
            if (request.signal.aborted) break;

            controller.enqueue(
              encoder.encode(answer.slice(i, i + chunkSize))
            );

            await new Promise(resolve => setTimeout(resolve, 20));
          }

          controller.close();
        } catch {
          controller.error(
            new Error('Unable to stream response.')
          );
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache, no-transform',
        'X-Content-Type-Options': 'nosniff',
      },
    });
  } catch {
    return Response.json(
      { error: 'Unable to process your request.' },
      { status: 500 }
    );
  }
}
