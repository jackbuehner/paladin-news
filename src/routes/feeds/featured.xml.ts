import type { ServerRequest } from '@sveltejs/kit/types/hooks';
import { variables } from '../../variables';
import { toHTML, toXML } from '../../utils/fetchSectionXml';
import { insertDate } from '../../utils/insertDate';
import type { IArticle } from 'src/interfaces/articles';

export async function get(
  request: ServerRequest
): Promise<{ headers: Record<string, string>; body: string }> {
  const hostUrl = `${variables.SERVER_PROTOCOL}://${variables.SERVER_URL}`;
  const url = `${hostUrl}/api/v2/articles/public?limit=4`;
  const res = await (await fetch(`${url}&featured=true`)).json();
  const docs = insertDate<IArticle>(res.docs);

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
