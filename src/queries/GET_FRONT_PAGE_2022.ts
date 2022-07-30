/* eslint-disable no-useless-escape */
import type { GraphJsonType } from '.';

const GET_FRONT_PAGE_2022 = `
  query GetFrontPage {
    articleFrontPagePublic {
      featured {
        name
        slug
        timestamps {
          published_at
        }
        categories
        description
        photo_path
      }
      news {
        name
        slug
        timestamps {
          published_at
        }
        photo_path
      }
      opinion {
        name
        slug
        timestamps {
          published_at
        }
        people {
          authors {
            name
          }
        }
        photo_path
      }
      sports {
        name
        slug
        timestamps {
          published_at
        }
        categories
        photo_path
      }
      diversity {
        name
        slug
        timestamps {
          published_at
        }
        categories
        photo_path
      }
      acc {
        name
        slug
        timestamps {
          published_at
        }
        categories
        description
        photo_path
      }
      videos {
        _id
        name
        video_url
      }
      crimeincidents {
        _id
        name
        location
        reported_at
      }
    }
  }
`;

interface GET_FRONT_PAGE_2022__TYPE {
  articleFrontPagePublic?: {
    featured: {
      name: string;
      slug: string;
      timestamps: {
        published_at: string;
      };
      categories: string[];
      description?: string;
      photo_path?: string;
    }[];
    news: {
      name: string;
      slug: string;
      timestamps: {
        published_at: string;
      };
      photo_path?: string;
    }[];
    opinion: {
      name: string;
      slug: string;
      timestamps: {
        published_at: string;
      };
      people: {
        authors: Array<{
          name: string;
        }>;
      };
      photo_path?: string;
    }[];
    sports: {
      name: string;
      slug: string;
      timestamps: {
        published_at: string;
      };
      categories: string[];
      photo_path?: string;
    }[];
    diversity: {
      name: string;
      slug: string;
      timestamps: {
        published_at: string;
      };
      categories: string[];
      photo_path?: string;
    }[];
    acc: {
      name: string;
      slug: string;
      timestamps: {
        published_at: string;
      };
      categories: string[];
      description?: string;
      photo_path?: string;
    }[];
    videos: {
      _id: string;
      name: string;
      video_url: string;
    }[];
    crimeincidents: {
      _id: string;
      name: string;
      location: string;
      reported_at: string;
    }[];
  }[];
}

type GET_FRONT_PAGE_2022__JSON = GraphJsonType<GET_FRONT_PAGE_2022__TYPE>;

export { GET_FRONT_PAGE_2022 };
export type { GET_FRONT_PAGE_2022__TYPE, GET_FRONT_PAGE_2022__JSON };
