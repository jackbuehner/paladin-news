import type { GraphJsonType } from '.';

const GET_CURRENT_TEAM_PAGE_SETTING = `
  query GetCurrentTeamPageSetting {
    settingCurrentTeamPage {
      board {
        name
        current_title
        photo
        slug
      }
      managers {
        name
        current_title
        photo
        slug
      }
      copy {
        name
        current_title
        photo
        slug
      }
      photoVideo {
        name
        current_title
        photo
        slug
      }
    }
  }
`;

interface GET_CURRENT_TEAM_PAGE_SETTING__DOC_TYPE {
  name: string;
  current_title: string;
  photo?: string;
  slug: string;
}

interface GET_CURRENT_TEAM_PAGE_SETTING__TYPE {
  settingCurrentTeamPage: {
    board: GET_CURRENT_TEAM_PAGE_SETTING__DOC_TYPE[];
    managers: GET_CURRENT_TEAM_PAGE_SETTING__DOC_TYPE[];
    copy: GET_CURRENT_TEAM_PAGE_SETTING__DOC_TYPE[];
    photoVideo: GET_CURRENT_TEAM_PAGE_SETTING__DOC_TYPE[];
  }[];
}

type GET_CURRENT_TEAM_PAGE_SETTING__JSON = GraphJsonType<GET_CURRENT_TEAM_PAGE_SETTING__TYPE>;

export { GET_CURRENT_TEAM_PAGE_SETTING };
export type {
  GET_CURRENT_TEAM_PAGE_SETTING__DOC_TYPE,
  GET_CURRENT_TEAM_PAGE_SETTING__TYPE,
  GET_CURRENT_TEAM_PAGE_SETTING__JSON,
};
