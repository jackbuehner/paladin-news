interface IProfile {
  _id: string;
  github_id: number;
  name: string;
  slug: string;
  email: string;
  twitter: string;
  biography: string;
  current_title: string;
  photo: string; // url to photo
  group: number;
}

export type { IProfile };
