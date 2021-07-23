// interface for each satire article
interface ISatire {
  _id: string;
  name: string;
  slug?: string;
  timestamps?: {
    published_at?: string; // ISO string
  };
  people: {
    display_authors: string[];
  };
  tags?: string[];
  description?: string;
  photo_path: string;
  photo_caption?: string;
  photo_credit?: string;
  body?: string;
  legacy_html?: boolean;
}

export type { ISatire };
