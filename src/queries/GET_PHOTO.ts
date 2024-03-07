import type { GraphJsonType } from '.';

const GET_PHOTO = `
  query GetPhoto($_id: ObjectID!) {
    photo(_id: $_id) {
      people {
        photo_created_by
      }
    }
  }
`;

interface GET_PHOTO__DOC_TYPE {
  people?: {
    photo_created_by?: string;
  };
}

interface GET_PHOTO__TYPE {
  photo?: GET_PHOTO__DOC_TYPE;
}

type GET_PHOTO__JSON = GraphJsonType<GET_PHOTO__TYPE>;

export { GET_PHOTO };
export type { GET_PHOTO__DOC_TYPE, GET_PHOTO__JSON, GET_PHOTO__TYPE };
