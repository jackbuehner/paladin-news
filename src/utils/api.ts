import { variables } from '$lib/variables';
const API_URL = `${variables.SERVER_PROTOCOL}://${variables.SERVER_URL}/v3/paladin-news`;

interface GraphResponse<T = unknown> {
  data?: T | null;
  errors?: GraphError[];
}

interface GraphError {
  message: string;
  locations?: [{ line: number; column: number }];
  path?: string[];
  extensions?: Record<string, string> & { code?: string };
}

const api = {
  /**
   * Query the GraphQL API.
   *
   * @param query The query string. Do not serialize.
   * @param options An object containing options for the query, including the variables for the query. Not always required.
   */
  async query<T>(
    query: string,
    options?: {
      variables?: Record<string, string | number | undefined | string[] | number[]>;
      headers?: Record<string, string>;
    }
  ): Promise<{
    data: T | null;
    error: { errors?: GraphError[]; status: number; statusText: string };
  }> {
    // fetch
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...(options?.headers || {}) },
      body: JSON.stringify({
        query,
        variables: options?.variables,
      }),
    });

    // return a graph response of data and errors if fetch was successful
    if (res.ok) {
      const graphResponse: GraphResponse<T> | undefined = await res.json();

      return {
        data: graphResponse?.data || null,
        error: {
          errors: graphResponse?.errors,
          status: res.status,
          statusText: res.statusText,
        },
      };
    }

    // otherwise, return a graph response with no data and one error
    return {
      data: null,
      error: {
        status: res.status,
        statusText: res.statusText,
      },
    };
  },
  /**
   * Mutate data via the GraphQL API.
   *
   * @param mutation The mutation string. Do not serialize.
   * @param options An object containing options for the mutation, including the variables for the mutation. Not always required.
   */
  async mutate<T>(
    mutation: string,
    options?: {
      variables?: Record<string, string | number | undefined | string[] | number[]>;
      headers?: Record<string, string>;
    }
  ): Promise<{
    data: T | null;
    error: { errors?: GraphError[]; status: number; statusText: string };
  }> {
    // fetch
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...(options?.headers || {}) },
      body: JSON.stringify({
        query: mutation,
        variables: options?.variables,
      }),
    });

    // return a graph response of data and errors if fetch was successful
    if (res.ok) {
      const graphResponse: GraphResponse<T> | undefined = await res.json();

      return {
        data: graphResponse?.data || null,
        error: {
          errors: graphResponse?.errors,
          status: res.status,
          statusText: res.statusText,
        },
      };
    }

    // otherwise, return a graph response with no data and one error
    return {
      data: null,
      error: {
        status: res.status,
        statusText: res.statusText,
      },
    };
  },
};

export { api };
export type { GraphResponse, GraphError };
