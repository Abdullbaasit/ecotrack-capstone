
import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';

import {
  executeStationAnalysis,
  stationAnalysisInputSchema,
} from '@/lib/tools/getStationAnalysis';

export async function POST(request: NextRequest) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: 'Invalid JSON request body.',
      },
      { status: 400 }
    );
  }

  let input;

  try {
    input = stationAnalysisInputSchema.parse(body);
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid station analysis input.',
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Unable to validate station analysis input.',
      },
      { status: 500 }
    );
  }

  try {
    const result = await executeStationAnalysis(input);

    return NextResponse.json({
      success: true,
      tool: 'getStationAnalysis',
      data: result,
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes('was not found')
    ) {
      return NextResponse.json(
        {
          success: false,
          error: error.message,
        },
        { status: 404 }
      );
    }

    console.error('Station analysis error:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Unable to analyse the monitoring station.',
      },
      { status: 500 }
    );
  }
}
