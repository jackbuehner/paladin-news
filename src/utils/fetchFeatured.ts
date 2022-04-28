import type { GET_ARTICLES__DOC_TYPE } from '../queries';
import { variables } from '../variables';

async function fetchFeatured(): Promise<{ data: GET_ARTICLES__DOC_TYPE[]; ok: boolean }> {
  const hostUrl = `${variables.SERVER_PROTOCOL}://${variables.SERVER_URL}`;

  // request the articles from the api
  const res = await fetch(`${hostUrl}/v3/paladin-news`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `
        query {
          articleFeaturedDocsPublic {
            name
            slug
            timestamps {
              published_at
            },
            people {
              authors {
                _id
                name
                slug
                photo
              }
            }
            categories
            tags
            description
            photo_path
            photo_caption
            photo_credit
            body
            legacy_html
            video_path
            video_replaces_photo
            show_comments
            template
            layout
          }
        }
      `,
    }),
  });

  // proces the response
  const resJson = await res.json(); // get the response as JSON
  const articles = resJson?.data?.articleFeaturedDocsPublic; // identify the articles response

  // return the articles
  return { data: articles, ok: res.ok };
}

export { fetchFeatured };
