import type { ApiResponse } from './types';

const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
} as const;

class ApiError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = 'ApiError';
  }
}

const fetcher = async (
  url: string,
  options?: RequestInit
): Promise<Response> => {
  const response = await fetch(url, options);
  
  if (!response.ok) {
    throw new ApiError(
      `HTTP ${response.status}: ${response.statusText}`,
      response.status
    );
  }
  
  return response;
}

const validateApiResponse = async <T>(response: Response): Promise<T> => {
  const data: ApiResponse<T> = await response.json();
  
  if (!data.success) {
    throw new ApiError(data.error || 'API request failed');
  }
  
  return data.data as T;
}

export const apiGet = async <T>(url: string): Promise<T> => {
  const response = await fetcher(url);
  return validateApiResponse<T>(response);
}

export const apiPost = async <T>(
  url: string,
  body?: Record<string, unknown>,
  returnData = false
): Promise<T | void> => {
  const response = await fetcher(url, {
    method: 'POST',
    headers: DEFAULT_HEADERS,
    body: body ? JSON.stringify(body) : undefined,
  });
  
  if (returnData) {
    return validateApiResponse<T>(response);
  }
}

  export const apiPostRaw = async <T>(
  url: string,
  body?: Record<string, unknown>
): Promise<T> => {
  const response = await fetch(url, {
    method: 'POST',
    headers: DEFAULT_HEADERS,
    body: body ? JSON.stringify(body) : undefined,
  });
  
  return response.json();
}

export { ApiError }; 