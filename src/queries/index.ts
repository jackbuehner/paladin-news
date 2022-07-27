export { CREATE_SUDOKU } from './CREATE_SUDOKU';
export type {
  CREATE_SUDOKU__DOC_TYPE,
  CREATE_SUDOKU__JSON,
  CREATE_SUDOKU__TYPE,
} from './CREATE_SUDOKU';
export { GET_ARTICLES } from './GET_ARTICLES';
export type {
  GET_ARTICLES__DOC_TYPE,
  GET_ARTICLES__JSON,
  GET_ARTICLES__TYPE,
} from './GET_ARTICLES';
export { GET_ARTICLE_BASIC } from './GET_ARTICLE_BASIC';
export type {
  GET_ARTICLE_BASIC__DOC_TYPE,
  GET_ARTICLE_BASIC__JSON,
  GET_ARTICLE_BASIC__TYPE,
} from './GET_ARTICLE_BASIC';
export { GET_ARTICLE_BY_SLUG } from './GET_ARTICLE_BY_SLUG';
export type {
  GET_ARTICLE_BY_SLUG__DOC_TYPE,
  GET_ARTICLE_BY_SLUG__JSON,
  GET_ARTICLE_BY_SLUG__TYPE,
} from './GET_ARTICLE_BY_SLUG';
export { GET_CROSSWORD } from './GET_CROSSWORD';
export type {
  GET_CROSSWORD__DOC_TYPE,
  GET_CROSSWORD__JSON,
  GET_CROSSWORD__TYPE,
} from './GET_CROSSWORD';
export { GET_CROSSWORDS } from './GET_CROSSWORDS';
export type {
  GET_CROSSWORDS__DOC_TYPE,
  GET_CROSSWORDS__JSON,
  GET_CROSSWORDS__TYPE,
} from './GET_CROSSWORDS';
export { GET_FLUSHERS } from './GET_FLUSHERS';
export type {
  GET_FLUSHERS__DOC_TYPE,
  GET_FLUSHERS__JSON,
  GET_FLUSHERS__TYPE,
} from './GET_FLUSHERS';
export { GET_FRONT_PAGE } from './GET_FRONT_PAGE';
export type {
  GET_FRONT_PAGE__DOC_TYPE,
  GET_FRONT_PAGE__JSON,
  GET_FRONT_PAGE__TYPE,
} from './GET_FRONT_PAGE';
export { GET_PLAYLIST } from './GET_PLAYLIST';
export type {
  GET_PLAYLIST__DOC_TYPE,
  GET_PLAYLIST__JSON,
  GET_PLAYLIST__TYPE,
} from './GET_PLAYLIST';
export { GET_PLAYLISTS } from './GET_PLAYLISTS';
export type {
  GET_PLAYLISTS__DOC_TYPE,
  GET_PLAYLISTS__JSON,
  GET_PLAYLISTS__TYPE,
} from './GET_PLAYLISTS';
export { GET_PROFILE } from './GET_PROFILE';
export type { GET_PROFILE__DOC_TYPE, GET_PROFILE__JSON, GET_PROFILE__TYPE } from './GET_PROFILE';
export { GET_PROFILES } from './GET_PROFILES';
export type {
  GET_PROFILES__DOC_TYPE,
  GET_PROFILES__JSON,
  GET_PROFILES__TYPE,
} from './GET_PROFILES';
export { GET_SATIRES } from './GET_SATIRES';
export type { GET_SATIRES__DOC_TYPE, GET_SATIRES__JSON, GET_SATIRES__TYPE } from './GET_SATIRES';
export { GET_SATIRE_BY_SLUG } from './GET_SATIRE_BY_SLUG';
export type {
  GET_SATIRE_BY_SLUG__DOC_TYPE,
  GET_SATIRE_BY_SLUG__JSON,
  GET_SATIRE_BY_SLUG__TYPE,
} from './GET_SATIRE_BY_SLUG';
export { GET_SHORTURL } from './GET_SHORTURL';
export type {
  GET_SHORTURL__DOC_TYPE,
  GET_SHORTURL__JSON,
  GET_SHORTURL__TYPE,
} from './GET_SHORTURL';
export { GET_SUDOKU } from './GET_SUDOKU';
export type { GET_SUDOKU__DOC_TYPE, GET_SUDOKU__JSON, GET_SUDOKU__TYPE } from './GET_SUDOKU';
export { GET_USER_BY_SLUG } from './GET_USER_BY_SLUG';
export type {
  GET_USER_BY_SLUG__DOC_TYPE,
  GET_USER_BY_SLUG__JSON,
  GET_USER_BY_SLUG__TYPE,
} from './GET_USER_BY_SLUG';
export { GET_VIDEO } from './GET_VIDEO';
export type { GET_VIDEO__DOC_TYPE, GET_VIDEO__JSON, GET_VIDEO__TYPE } from './GET_VIDEO';
export { GET_VIDEOS } from './GET_VIDEOS';
export type { GET_VIDEOS__DOC_TYPE, GET_VIDEOS__JSON, GET_VIDEOS__TYPE } from './GET_VIDEOS';
export { GET_VIDEO_PAGE } from './GET_VIDEO_PAGE';
export type {
  GET_VIDEO_PAGE_FEATURED_VIDEO__DOC_TYPE,
  GET_VIDEO_PAGE_PLAYLIST__DOC_TYPE,
  GET_VIDEO_PAGE__JSON,
  GET_VIDEO_PAGE__TYPE,
} from './GET_VIDEO_PAGE';
export { GET_VIDEO_PAGE_SETTING } from './GET_VIDEO_PAGE_SETTING';
export type {
  GET_VIDEO_PAGE_SETTING__DOC_TYPE,
  GET_VIDEO_PAGE_SETTING__JSON,
  GET_VIDEO_PAGE_SETTING__TYPE,
} from './GET_VIDEO_PAGE_SETTING';
export type {
  MUTATE_CROSSWORD_LAYOUT__DOC_TYPE,
  MUTATE_CROSSWORD_LAYOUT__JSON,
  MUTATE_CROSSWORD_LAYOUT__TYPE,
} from './MUTATE_CROSSWORD_LAYOUT';

export interface GraphJsonType<T> {
  errors?: unknown;
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
