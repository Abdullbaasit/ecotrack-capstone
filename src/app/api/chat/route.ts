
import { NextRequest } from 'next/server';
import { stations, alerts } from '@/data/environment';

function getEnvironmentalResponse(question: string): string {
  const query = question.toLowerCase().trim();

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

  // 1. Handle questions asking which station needs attention.
  // This must come before the general alert condition.
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

  // 2. Air quality questions.
  if (/air|aqi|pollution|particulate/.test(query)) {
    const highest = highestAirStation;

    return `Here is the air quality summary from EcoTrack's demonstration data.

The average air quality index across ${stations.length} monitoring stations is ${averageAir}.

The highest reading is at ${highest.name}, with an index of ${highest.air}. Its current demonstration status is "${highest.status}".

Station readings:
${stations.map(s => `- ${s.name}: ${s.air} AQI (${s.status})`).join('\n')}

Recommendation:
Prioritise a review of the particulate indicators at ${highest.name}.

These are illustrative readings, not live sensor measurements or an official health assessment.`;
  }

  // 3. Water quality questions.
  if (/water|contamination/.test(query)) {
    return `Here is the water quality summary from the demonstration dataset.

The average water quality index is ${averageWater}/100 across ${stations.length} monitoring stations.

Station readings:
${stations.map(s => `- ${s.name}: ${s.water}/100`).join('\n')}

The lowest recorded sample index is at ${lowestWaterStation.name}, with a reading of ${lowestWaterStation.water}.

Recommendation:
Investigate the lower sample reading and conduct appropriate laboratory testing before making any water safety conclusions.

Note: These figures are illustrative and do not establish whether water is safe for consumption.`;
  }

  // 4. Temperature questions.
  if (/temperature|heat|hot|climate/.test(query)) {
    return `Here is the temperature summary from EcoTrack.

The average temperature across the ${stations.length} sample stations is ${averageTemperature}°C.

Station readings:
${stations.map(s => `- ${s.name}: ${s.temperature}°C`).join('\n')}

The highest sample temperature is recorded at ${highestTemperatureStation.name}, with ${highestTemperatureStation.temperature}°C.

These are demonstration readings, not live weather observations.`;
  }

  // 5. Environmental alert questions.
  if (/alert|warning|risk/.test(query)) {
    return `Here is the environmental alert summary.

EcoTrack currently contains ${alerts.length} demonstration alerts.

${alerts.map(a => `- ${a.id} - ${a.title}\n  Severity: ${a.severity}\n  ${a.detail}`).join('\n\n')}

The highest-priority alert is ${alerts.find(a => a.severity === 'High')?.title ?? 'None recorded'}.

Recommendation:
Review high-severity alerts first and verify the underlying measurements before taking action.`;
  }

  // 6. General monitoring station questions.
  if (/station|location|monitoring/.test(query)) {
    return `EcoTrack currently has ${stations.length} demonstration monitoring stations across Lagos.

${stations.map(s => `- ${s.name} (${s.id})
  Area: ${s.area}
  Air index: ${s.air}
  Water index: ${s.water}
  Temperature: ${s.temperature}°C
  Status: ${s.status}`).join('\n\n')}

You can explore these locations on the Monitoring Stations page.`;
  }

  // 7. Welcome response for greetings only.
  if (/^(hello|hi|hey|good morning|good afternoon|good evening)[!. ]*$/.test(query)) {
    return `Welcome to EcoTrack Environmental Assistant!

I can help you explore the environmental demonstration data available in this application.

You can ask me about:
1. Air quality and pollution indicators.
2. Water quality readings.
3. Temperature observations.
4. Environmental alerts and warnings.
5. Monitoring stations across Lagos.

What would you like to know?

Important: I provide predefined responses based on EcoTrack's sample dataset, not live AI or real-time sensor data.`;
  }

  // 8. Proper fallback for unsupported questions.
  return `I'm sorry, I couldn't identify what you're asking about.

I can currently help you with:

- Air quality: Ask about AQI, pollution and particulate indicators.
- Water quality: Ask about water readings and sample indices.
- Temperature: Ask about temperature across monitoring stations.
- Environmental alerts: Ask about warnings and high-priority alerts.
- Monitoring stations: Ask about station locations, readings and environmental conditions.

Try asking:
"Which monitoring station needs the most attention?"

Note: I use predefined responses from EcoTrack's demonstration dataset. I do not provide live AI-generated answers or real-time sensor readings.`;
}

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
        { error: 'Please enter a valid question (maximum 1000 characters).' },
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
          controller.error(new Error('Unable to stream response.'));
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
