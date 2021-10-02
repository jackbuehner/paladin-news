interface IShortURL {
  _id: string;
  original_url: string;
  code: string;
  domain: string;
  timestamps: {
    created_at: string; // ISO string
    modified_at: string; // ISO string
  };
  people: {
    created_by?: number;
    modified_by?: number[];
    last_modified_by: number;
  };
  hidden: boolean;
}

export type { IShortURL };
