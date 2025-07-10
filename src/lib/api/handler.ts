import { NextRequest, NextResponse } from 'next/server';
import { initializeDatabaseOnStartup } from '../database-startup';
import type { ApiResponse } from './types';
import { z } from 'zod';

export type ApiHandler<T = unknown> = (
  request: NextRequest
) => Promise<ApiResponse<T>>;

export type ApiHandlerGet<T = unknown> = () => Promise<ApiResponse<T>>;

export const createErrorResponse = (
  error: string,
  status: number = 500
): NextResponse => {
  return NextResponse.json<ApiResponse>(
    {
      success: false,
      error,
    },
    { status }
  );
};

export const createSuccessResponse = <T>(
  data?: T,
  message?: string,
  status: number = 200
): NextResponse => {
  return NextResponse.json<ApiResponse<T>>(
    {
      success: true,
      ...(data !== undefined && { data }),
      ...(message && { message }),
    },
    { status }
  );
};

const ensureDatabaseInitialized = (): void => {
  try {
    initializeDatabaseOnStartup();
  } catch (error) {
    console.error('Failed to ensure database initialization:', error);
    throw new Error('Database initialization failed');
  }
};

export const withApiHandlerGet = (handler: ApiHandlerGet) => {
  return async (): Promise<NextResponse> => {
    try {
      ensureDatabaseInitialized();
      const result = await handler();

      if (result.success) {
        return createSuccessResponse(result.data, result.message);
      } else {
        return createErrorResponse(result.error || 'Unknown error', 400);
      }
    } catch (error) {
      console.error('API Handler Error:', error);
      
      return createErrorResponse(
        error instanceof Error ? error.message : 'Internal server error',
        500
      );
    }
  };
};

export const withApiHandler = (handler: ApiHandler) => {
  return async (request: NextRequest): Promise<NextResponse> => {
    try {
      ensureDatabaseInitialized();
      const result = await handler(request);

      if (result.success) {
        return createSuccessResponse(result.data, result.message);
      } else {
        return createErrorResponse(result.error || 'Unknown error', 400);
      }
    } catch (error) {
      console.error('API Handler Error:', error);
      
      return createErrorResponse(
        error instanceof Error ? error.message : 'Internal server error',
        500
      );
    }
  };
};

export const validateSchema = <T>(
  schema: z.ZodSchema<T>,
  data: unknown
): { success: true; data: T } | { success: false; error: string } => {
  try {
    const validated = schema.parse(data);
    return { success: true, data: validated };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessage = error.issues
        .map(issue => `${issue.path.join('.')}: ${issue.message}`)
        .join(', ');
      return { success: false, error: errorMessage };
    }
    return { success: false, error: 'Validation failed' };
  }
};

export const validateRequestBody = async <T>(
  request: NextRequest,
  schema: z.ZodSchema<T>
): Promise<{ success: true; data: T } | { success: false; error: string }> => {
  try {
    const body = await request.json();
    return validateSchema(schema, body);
  } catch {
    return { success: false, error: 'Invalid JSON in request body' };
  }
};