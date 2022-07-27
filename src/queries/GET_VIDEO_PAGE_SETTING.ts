import type { GraphJsonType } from '.';

const GET_VIDEO_PAGE_SETTING = `
  query GetVideoPageSetting {
    setting(name: "Videos page") {
      setting
    }
  }
`;

interface GET_VIDEO_PAGE_SETTING__DOC_TYPE {
  setting: string;
}

interface GET_VIDEO_PAGE_SETTING__TYPE {
  setting?: GET_VIDEO_PAGE_SETTING__DOC_TYPE;
}

type GET_VIDEO_PAGE_SETTING__JSON = GraphJsonType<GET_VIDEO_PAGE_SETTING__TYPE>;

export { GET_VIDEO_PAGE_SETTING };
export type {
  GET_VIDEO_PAGE_SETTING__DOC_TYPE,
  GET_VIDEO_PAGE_SETTING__TYPE,
  GET_VIDEO_PAGE_SETTING__JSON,
};
