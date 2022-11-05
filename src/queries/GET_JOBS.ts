import type { GraphJsonType } from '.';

const GET_JOBS = `
  query JobListings {
    settingJobListings {
      title
      note
      description
      form
      form_time
    }
  }
`;

interface GET_JOBS__DOC_TYPE {
  title: string;
  note: string;
  description: string;
  form: string;
  form_time: string;
}

interface GET_JOBS__TYPE {
  settingJobListings?: GET_JOBS__DOC_TYPE[];
}

type GET_JOBS__JSON = GraphJsonType<GET_JOBS__TYPE>;

export { GET_JOBS };
export type { GET_JOBS__DOC_TYPE, GET_JOBS__TYPE, GET_JOBS__JSON };
