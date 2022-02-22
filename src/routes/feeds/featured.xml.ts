import type { ServerRequest } from '@sveltejs/kit/types/hooks';
import { toHTML, toXML } from '../../utils/fetchSectionXml';
import { insertDate } from '../../utils/insertDate';
import { fetchFeatured } from '../../utils/fetchFeatured';

export async function get(
  request: ServerRequest
): Promise<{ headers: Record<string, string>; body: string }> {
  const { data } = await fetchFeatured();
  const docs = insertDate(data.docs);

  const body = toXML(
    docs
      .map((doc) => {
        if (!doc.timestamps?.published_at) return null;
        return {
          title: doc.name,
          description: doc.description,
          link: `https://thepaladin.news/articles/${doc.date.year}/${doc.date.month}/${doc.date.day}/${doc.slug}`,
          published_at: new Date(doc.timestamps.published_at),
          html: toHTML(doc.body),
        };
      })
      .filter((t) => !!t),
    `https://thepaladin.news${request.path}`
  );

  const headers = {
    'Cache-Control': 'max-age=0, s-maxage=3600',
    'Content-Type': 'application/xml',
  };
  return {
    headers,
    body,
  };
}
