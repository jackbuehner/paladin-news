type GitHubUserID = number;
type GitHubTeamNodeID = string;

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
  name?: string;
  slug?: string;
  permissions: {
    teams?: GitHubTeamNodeID[];
    users: GitHubUserID[];
  };
  locked?: boolean;
  timestamps?: {
    created_at?: string; // ISO string
    modified_at?: string; // ISO string
    published_at?: string; // ISO string
    target_publish_at?: string; // ISO string
  };
  people: {
    created_by?: GitHubUserID;
    modified_by?: GitHubUserID[];
    last_modified_by: GitHubUserID;
    published_by?: GitHubUserID[];
    authors?: GitHubUserID[];
    editors?: {
      primary?: GitHubUserID;
      copy?: GitHubUserID[];
    };
  };
  stage?: Stage;
  categories?: string[];
  tags?: string[];
  description?: string;
  photo_path: string;
  photo_caption?: string;
  body?: string;
  versions?: IArticle[]; // store previous versions of the article
  hidden?: boolean;
  history?: { type: string; user: GitHubUserID; at: string }[];
}

export type { IArticle, Stage as EnumArticleStage };
