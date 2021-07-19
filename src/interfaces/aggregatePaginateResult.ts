interface AggregatePaginateResult<T> {
  docs: T[];
  totalDocs: number;
  limit: number;
  page?: number | undefined;
  totalPages: number;
  nextPage?: number | null | undefined;
  prevPage?: number | null | undefined;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  meta?: any;
  [customLabel: string]: T[] | number | boolean | null | undefined;
}

export type { AggregatePaginateResult };
