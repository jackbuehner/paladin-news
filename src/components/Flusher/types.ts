interface Flusher {
  volume: number;
  issue: number;
  timestamps: {
    week: string; // ISO date
  };
  events: Array<Event | null>;
  leftAdvertPhoto?: string;
  articles: {
    featured?: {
      categories: string[];
      name: string;
      authors: string[];
      photo?: string;
      body: string;
    };
    more: Array<{
      name: string;
      _id: string;
    }>;
  };
}

interface Event {
  name: string;
  date: string; // ISO date
  location: string;
}

export type { Flusher, Event as FlusherEvent };
