import type { GraphJsonType } from '.';

const GET_SHORTURL = `
  query GetShortUrlBasic($code: String!) {
    shorturl(code: $code) {
      original_url
      code
      domain
      hidden
    }
  }
`;

interface GET_SHORTURL__DOC_TYPE {
  original_url: string;
  code: string;
  string: string;
  hidden: boolean;
}

interface GET_SHORTURL__TYPE {
  shorturl?: GET_SHORTURL__DOC_TYPE;
}

type GET_SHORTURL__JSON = GraphJsonType<GET_SHORTURL__TYPE>;

export { GET_SHORTURL };
export type { GET_SHORTURL__DOC_TYPE, GET_SHORTURL__TYPE, GET_SHORTURL__JSON };
