/* eslint-disable no-useless-escape */
import type { GraphJsonType } from '.';

const GET_ECHO_EC = `
  query GetEchoEC {
    settingEditorsChoiceTheEcho {
      studio_art {
        _id
        name
        type
        slug
        authored_by {
          name
        }
        timestamps {
          published_at
        }
      }
      poetry {
        _id
        name
        type
        slug
        authored_by {
          name
        }
        timestamps {
          published_at
        }
      }
      prose {
        _id
        name
        type
        slug
        authored_by {
          name
        }
        timestamps {
          published_at
        }
      }
      photography {
        _id
        name
        type
        slug
        authored_by {
          name
        }
        timestamps {
          published_at
        }
      }
    }
  }
`;

interface GET_ECHO_EC__DOC_TYPE {
  _id: string;
  name: string;
  slug: string;
  type: string;
  authored_by: { name: string }[];
  timestamps: { published_at: string };
}

interface GET_ECHO_EC__TYPE {
  settingEditorsChoiceTheEcho?: [
    {
      studio_art?: GET_ECHO_EC__DOC_TYPE;
      poetry?: GET_ECHO_EC__DOC_TYPE;
      prose?: GET_ECHO_EC__DOC_TYPE;
      photography?: GET_ECHO_EC__DOC_TYPE;
    }
  ];
}

type GET_ECHO_EC__JSON = GraphJsonType<GET_ECHO_EC__DOC_TYPE>;

export { GET_ECHO_EC };
export type { GET_ECHO_EC__JSON, GET_ECHO_EC__TYPE, GET_ECHO_EC__DOC_TYPE };
