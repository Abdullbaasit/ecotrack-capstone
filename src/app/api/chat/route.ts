
import { NextRequest } from 'next/server';
import { stations, alerts } from '@/data/environment';

function getEnvironmentalResponse(question: string): string {
  const query = question.toLowerCase();

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

  if (/air|aqi|pollution|particulate/.test(query)) {
    const highest = [...stations].sort(
      (a, b) => b.air - a.air
    )[0];

    return `Here is the air quality summary from EcoTrack's demonstration data.

The average air quality index across ${stations.length} monitoring stations is ${averageAir}.

The highest reading is at ${highest.name}, with an index of ${highest.air}. Its current demonstration status is "${highest.status}".

For comparison:
${stations.map(s => `• ${s.name}: ${s.air} AQI (${s.status})`).join('\n')}

Recommendation: Prioritise a review of the particulate indicators at ${highest.name}. These are illustrative readings, not live sensor measurements or an official health assessment.`;
  }

  if (/water|water quality|contamination/.test(query)) {
    return `Here is the water quality summary from the demonstration dataset.

The average water quality index is ${averageWater}/100 across ${stations.length} monitoring stations.

Station readings:
${stations.map(s => `• ${s.name}: ${s.water}/100`).join('\n')}

The lowest recorded sample index is at ${[...stations].sort((a, b) => a.water - b.water)[0].name}.

Recommendation: Investigate the lower sample reading and conduct appropriate laboratory testing before making any water safety conclusions.

Note: These figures are illustrative and do not establish whether water is safe for consumption.`;
  }

  if (/temperature|heat|hot|climate/.test(query)) {
    return `Here is the temperature summary from EcoTrack.

The average temperature across the four sample stations is ${averageTemperature}°C.

Station readings:
${stations.map(s => `• ${s.name}: ${s.temperature}°C`).join('\n')}

The highest sample temperature is recorded at ${[...stations].sort((a, b) => b.temperature - a.temperature)[0].name}.

These are demonstration readings, not live weather observations.`;
  }

  if (/alert|warning|risk|attention/.test(query)) {
    return `Here is the environmental alert summary.

EcoTrack currently contains ${alerts.length} demonstration alerts.

${alerts.map(a => `• ${a.id} — ${a.title}\n  Severity: ${a.severity}\n  ${a.detail}`).join('\n\n')}

The highest-priority alert is ${alerts.find(a => a.severity === 'High')?.title ?? 'None recorded'}.

Recommendation: Review high-severity alerts first and verify the underlying measurements before taking action.`;
  }

  if (/station|location|monitoring/.test(query)) {
    return `EcoTrack currently has ${stations.length} demonstration monitoring stations across Lagos.

${stations.map(s => `• ${s.name} (${s.id})\n  Area: ${s.area}\n  Air index: ${s.air}\n  Water index: ${s.water}\n  Temperature: ${s.temperature}°C\n  Status: ${s.status}`).join('\n\n')}

You can explore these locations on the Monitoring Stations page.`;
  }

  return `Welcome to EcoTrack Environmental Assistant!

I can help you explore the environmental demonstration data available in this application.

You can ask me about:

1. Air quality and pollution indicators.
2. Water quality readings.
3. Temperature observations.
4. Environmental alerts and warnings.
5. Monitoring stations across Lagos.

For example, try asking:
"What is the air quality situation in Ikeja?"

Important: I provide predefined responses based on EcoTrack's sample dataset. I do not use a live AI model or real-time environmental sensors.`;
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

            const chunk = answer.slice(i, i + chunkSize);
            controller.enqueue(encoder.encode(chunk));

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
