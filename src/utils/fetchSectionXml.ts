import Renderer from '@cristata/prosemirror-to-html-js';
import { variables } from '../variables';
import type { AggregatePaginateResult } from '../interfaces/aggregatePaginateResult';
import type { IArticle } from '../interfaces/articles';
import { PhotoWidget } from '../pm/render/PhotoWidget';
import { SweepwidgetWidget } from '../pm/render/SweepwidgetWidget';
import { YoutubeWidget } from '../pm/render/YoutubeWidget';
import { fetchSection } from './fetchSection';
import { insertDate } from './insertDate';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
async function fetchSectionXml(section: string, path: string, limit?: number) {
  const res = (await fetchSection(section, limit)).data as AggregatePaginateResult<IArticle>;
  const docs = insertDate<IArticle>(res.docs);

  const toHTML = (str: string) => {
    // if the body is not html, convert json to html (check with closing p tag)
    if (!str.includes('</p>')) {
      const renderer = new Renderer.Renderer();
      renderer.addNode(SweepwidgetWidget);
      renderer.addNode(YoutubeWidget);
      renderer.addNode(PhotoWidget);
      return renderer.render({
        type: 'doc',
        content: JSON.parse(str),
      });
    }
    return str;
  };

  const body = xml(
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
    `https://thepaladin.news${path}`
  );

  return body;
}

interface Post {
  title: string;
  description: string;
  link: string;
  published_at: Date;
  html: string;
}

const xml = (
  posts: Post[],
  url: string
) => `<rss xmlns:dc="https://purl.org/dc/elements/1.1/" xmlns:content="https://purl.org/rss/1.0/modules/content/" xmlns:atom="https://www.w3.org/2005/Atom" version="2.0">
  <channel>
    <title>${variables.name}</title>
    <link>${variables.website}</link>
    <description>${variables.description}</description>
    ${posts
      .map(
        (post) =>
          `
          <item>
            <guid>${post.link}</guid>
            <title><![CDATA[${post.title}]]></title>
            <description><![CDATA[${post.description}]]></description>
            <link>${post.link}</link>
            <pubDate>${post.published_at.toUTCString()}</pubDate>
            <content:encoded><![CDATA[${post.html}]]></content:encoded>
          </item>
        `
      )
      .join('')}
    <atom:link href="${url}" rel="self" type="application/rss+xml" />
  </channel>
</rss>`;

export { fetchSectionXml };
