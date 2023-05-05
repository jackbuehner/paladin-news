import type { GraphJsonType } from '.';

const GET_SERIES = `
  query GetSeries($_id: ObjectID!) {
    articleStreamPublic(_id: $_id) {
      _id
      name
    }
  }
`;

interface GET_SERIES__DOC_TYPE {
  _id: string;
  name: string;
}

interface GET_SERIES__TYPE {
  articleStreamPublic?: GET_SERIES__DOC_TYPE;
}

type GET_SERIES__JSON = GraphJsonType<GET_SERIES__TYPE>;

export { GET_SERIES };
export type { GET_SERIES__DOC_TYPE, GET_SERIES__TYPE, GET_SERIES__JSON };
