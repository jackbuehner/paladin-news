import type { IArticle } from './articles';

type GitHubUserID = number;
type GitHubTeamNodeID = string;

interface IFlush {
  events: {
    name: string;
    date: string;
    location: string;
  }[];
  articles: {
    featured: IArticle;
    more: IArticle[];
  };
  volume: number;
  issue: number;
  left_advert_photo_url: string;
  timestamps: {
    created_at: string; // ISO string
    modified_at: string; // ISO string
    published_at: string; // ISO string
    updated_at: string; // ISO string
    week: string; // ISO string
  };
  people: {
    created_by?: GitHubUserID;
    modified_by: GitHubUserID[]; // mongoose always returns at least an empty array
    last_modified_by?: GitHubUserID;
    watching: GitHubUserID[]; // mongoose always returns at least an empty array
    published_by: GitHubUserID[]; // mongoose always returns at least an empty array
    last_published_by?: GitHubUserID;
    authors: GitHubUserID[];
    display_authors: string[];
    editors: {
      primary: GitHubUserID[];
      copy: GitHubUserID[];
    };
  };
  tags: string[];
  description: string;
  photo_path: string;
  photo_credit: string;
  photo_caption: string;
  body?: string;
  versions?: IFlush[]; // store previous versions of the flush profile (only via v2 api)
  legacy_html: boolean; // true if it is html from the old webflow
  hidden: boolean;
  locked: boolean;
  history: Array<{
    type: string;
    user: GitHubUserID;
    at: string; // ISO string
  }>;
  permissions: {
    teams: GitHubTeamNodeID[];
    users: GitHubUserID[];
  };
}

export type { IFlush };
