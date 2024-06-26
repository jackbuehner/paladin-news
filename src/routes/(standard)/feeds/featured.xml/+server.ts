import { fetchFeatured } from '$lib/utils/fetchFeatured';
import { toHTML, toXML } from '$lib/utils/fetchSectionXml';
import { insertDate } from '$lib/utils/insertDate';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async (request) => {
  const { data } = await fetchFeatured();
  const docs = insertDate(data);

  type Post = Parameters<typeof toXML>[0][0];

  const body = toXML(
    docs
      .map((doc): Post | null => {
        if (!doc.timestamps?.published_at || !doc.body) return null;
        return {
          title: doc.name,
          description: doc.description,
          link: `https://thepaladin.news/articles/${doc.date.year}/${doc.date.month}/${doc.date.day}/${doc.slug}`,
          published_at: new Date(doc.timestamps.published_at),
          html: toHTML(doc.body),
        };
      })
      .filter((post): post is Post => !!post),
    `https://thepaladin.news${request.url.pathname}`
  );

  const headers = {
    'Cache-Control': 'max-age=0, s-maxage=3600',
    'Content-Type': 'application/xml',
  };

  return new Response(body, { headers });
};
