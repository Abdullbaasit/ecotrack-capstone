
import { z } from 'zod';

import { stations } from '@/data/environment';

/**
 * FE-07: Environmental Station Analysis Tool
 *
 * This tool uses EcoTrack's demonstration dataset.
 * It does not retrieve live sensor measurements.
 */

// Validate incoming tool parameters.
export const stationAnalysisInputSchema = z.object({
  stationId: z
    .string()
    .trim()
    .min(1, 'A station ID is required.'),
});

// Validate the structured result.
export const stationAnalysisOutputSchema = z.object({
  stationId: z.string(),
  name: z.string(),
  area: z.string(),

  readings: z.object({
    air: z.number(),
    water: z.number(),
    temperature: z.number(),
    humidity: z.number(),
  }),

  status: z.enum([
    'Good',
    'Moderate',
    'Needs attention',
  ]),

  dataSource: z.literal('EcoTrack demonstration dataset'),

  disclaimer: z.string(),
});

export type StationAnalysisInput = z.infer<
  typeof stationAnalysisInputSchema
>;

export type StationAnalysisOutput = z.infer<
  typeof stationAnalysisOutputSchema
>;

/**
 * Server-side execution function.
 */
export async function executeStationAnalysis(
  input: StationAnalysisInput
): Promise<StationAnalysisOutput> {
  const validatedInput =
    stationAnalysisInputSchema.parse(input);

  const station = stations.find(
    (item) =>
      item.id.toLowerCase() ===
      validatedInput.stationId.toLowerCase()
  );

  if (!station) {
    throw new Error(
      `Monitoring station "${validatedInput.stationId}" was not found.`
    );
  }

  const result = {
    stationId: station.id,
    name: station.name,
    area: station.area,

    readings: {
      air: station.air,
      water: station.water,
      temperature: station.temperature,
      humidity: station.humidity,
    },

    status: station.status,

    dataSource: 'EcoTrack demonstration dataset' as const,

    disclaimer:
      'These measurements are illustrative and do not represent live environmental sensor data.',
  };

  return stationAnalysisOutputSchema.parse(result);
}

/**
 * Tool definition.
 *
 * The description and input schema define the
 * tool contract. The execute function performs
 * the server-side data lookup.
 */
export const getStationAnalysis = {
  description:
    'Retrieve structured environmental readings for an EcoTrack monitoring station.',

  inputSchema: stationAnalysisInputSchema,

  execute: executeStationAnalysis,
};
