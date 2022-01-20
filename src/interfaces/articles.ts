// use these as the stages for articles
enum Stage {
  PLANNING = 1.1,
  DRAFT = 2.1,
  PENDING_EDITOR_REVIEW = 3.1,
  PENDING_INTERVIEWEE_APPROVAL = 3.2,
  PENDING_EDIT = 3.4,
  PENDING_UPLOAD = 4.1,
  UPLOADED = 5.1,
  PUBLISHED = 5.2,
}

// interface for each article
interface IArticle {
  name: string;
  slug?: string;
  timestamps: {
    published_at: string; // ISO string
  };
  people: {
    authors?: IAuthor[];
  };
  categories?: string[];
  tags?: string[];
  description?: string;
  photo_path: string;
  photo_caption?: string;
  photo_credit?: string;
  body?: string;
  video_path?: string;
  video_replaces_photo?: boolean;
  show_comments?: boolean;
  date?: {
    // is sometimes added using the insertDate() function
    year: string;
    month: string;
    day: string;
  };
  template: string;
}

// interface for author data includes in article
interface IAuthor {
  _id: string;
  name: string;
  slug: string;
  photo: string; // url to photo
}

export type { IArticle, Stage as EnumArticleStage, IAuthor as IArticleAuthor };
