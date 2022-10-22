export type PodcastsConfig = {
  name?: string;
  description?: string;
  podcasts?: Array<{
    name?: string;
    slug?: string;
    description?: string;
    photo?: string;
    hidden?: boolean;
  }>;
};

export type PodcastsStuffType = App.Stuff & {
  podcastsConfig: string;
};
