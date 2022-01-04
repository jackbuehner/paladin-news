export { GET_ARTICLES } from './GET_ARTICLES';
export type {
  GET_ARTICLES__DOC_TYPE,
  GET_ARTICLES__JSON,
  GET_ARTICLES__TYPE,
} from './GET_ARTICLES';
export { GET_USER_BY_SLUG } from './GET_USER_BY_SLUG';
export type {
  GET_USER_BY_SLUG__DOC_TYPE,
  GET_USER_BY_SLUG__JSON,
  GET_USER_BY_SLUG__TYPE,
} from './GET_USER_BY_SLUG';

export interface GraphJsonType<T> {
  error?: unknown;
  data?: T;
}

export interface Paged<T> {
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
}
