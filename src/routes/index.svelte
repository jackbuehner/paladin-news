<script context="module" lang="ts">
  import type { LoadInput, LoadOutput } from '@sveltejs/kit';

  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load({ page, fetch }: LoadInput): Promise<LoadOutput> {
    // set the document title
    title.set(undefined);

    // get the articles
    const res = await fetch(`/frontpage.json`);

    if (res.ok) {
      const { news, opinion, sports, diversity, acc, featured } = await res.json();
      return {
        props: {
          articles: {
            news,
            opinion,
            sports,
            diversity,
            acc,
            featured,
          },
        },
      };
    }

    return {
      status: 500,
      error: new Error(`Could not load articles for home page.`),
    };
  }
</script>

<script lang="ts">
  import Featured from '../components/home/Featured.svelte';
  import ArticleCardRow from '../components/home/ArticleCardRow.svelte';
  import Container from '/src/components/Container.svelte';
  import type { IArticle } from 'src/interfaces/articles';
  import { title } from '../stores/title';
  import type { Paged } from '../queries';

  // receive the articles from the load function
  interface Iarticles {
    news: Paged<IArticle>;
    opinion: Paged<IArticle>;
    sports: Paged<IArticle>;
    diversity: Paged<IArticle>;
    acc: Paged<IArticle>;
    featured: IArticle[];
  }
  export let articles: Iarticles;
</script>

<!--<note
  ><Container
    >We updated our <a href={'/privacy-policy'}>privacy policy</a> on Feb. 6, 2022 to reflect our new
    analytics provider. To ensure your privacy, we left Google Analytics for Fathom Analytics, which
    does not track you across multiple websites.</Container
  ></note
>-->

<div class={'wrapper'}>
  <Container>
    <Featured articles={articles.featured} />
    <div class={'sections-grid'}>
      <ArticleCardRow
        label={'News'}
        href={'/section/news'}
        articles={articles.news}
        gridArea={'news'}
        quantity={[5, 4, 2, 3]}
      />
      <div style={'grid-area: opinions'}>
        <ArticleCardRow
          label={'Opinions'}
          href={'/section/opinions'}
          articles={articles.opinion}
          quantity={[6, 4, 3, 3]}
          forceVertical={true}
        />
        <div class={'section twitter'}>
          <h2>Tweets</h2>
          <a
            href="https://twitter.com/thepaladin_news"
            data-theme="light"
            data-border-color="#ffff00"
            data-cards="hidden"
            data-chrome="noheader nofooter noborders noscrollbar transparent"
            data-dnt="true"
            data-width="312"
            data-tweet-limit="2"
            target="_blank"
            rel="noreferrer"
          >
            Tweets by thepaladin_news
          </a>
          <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
        </div>
      </div>
      <ArticleCardRow
        label={'Sports'}
        href={'/section/sports'}
        articles={articles.sports}
        gridArea={'sports'}
        quantity={[3, 2, 2, 3]}
      />
      <ArticleCardRow
        label={'Diversity Matters'}
        href={'/section/diversity-matters'}
        articles={articles.diversity}
        gridArea={'diversity'}
        quantity={[3, 2, 2, 3]}
      />
      <ArticleCardRow
        label={'Arts, Campus, & Culture'}
        href={'/section/arts-campus-culture'}
        articles={articles.acc}
        gridArea={'acc'}
        quantity={[3, 2, 2, 3]}
      />
      <span />
    </div>
  </Container>
</div>

<style>
  .wrapper {
    position: relative;
    /*top: -52px;*/
    background-color: #ffffbb;
  }

  .sections-grid {
    display: grid;
    grid-template-columns: 1fr 1px 316px;
    grid-template-rows: repeat(4, minmax(0, auto)) 1fr; /* end with 1fr so only last row will expand if needed */
    grid-template-areas:
      'news       news    news'
      'sports     divider opinions'
      'diversity  divider opinions'
      'acc        divider opinions'
      'plus       divider opinions';
    gap: 0px 16px;
  }
  @media (max-width: 740px) {
    .sections-grid {
      grid-template-columns: 1fr;
      grid-template-rows: repeat(5, minmax(0, auto)) 1fr;
      grid-template-areas:
        'news     '
        'opinions '
        'sports   '
        'diversity'
        'acc      '
        'plus     ';
    }
  }
  span {
    grid-area: divider;
    border-left: 1px solid var(--border-dark);
    margin: 16px 0;
  }
  @media (max-width: 740px) {
    span {
      display: none;
    }
  }

  /* section groups */
  .section {
    padding: 30px 0;
    border-bottom: 1px solid var(--border-dark);
  }

  /* section headings */
  .section > h2 {
    font-family: var(--font-detail);
    font-size: 18px;
    line-height: 18px;
    text-transform: uppercase;
    margin: 0 0 16px 0;
  }

  /* hide twitter section on smaller screens */
  @media (max-width: 740px) {
    .twitter {
      display: none;
    }
  }

  /* notice bars  */
  note {
    display: block;
    background-color: var(--color-neutral-dark);
    color: #e0e0e0;
    font-size: 12px;
    padding: 4px 0;
    letter-spacing: 0.3px;
    font-family: var(--font-detail);
    max-width: 1200px;
  }
  note a {
    color: #e0e0e0;
  }
  @media (min-width: 991px) {
    note {
      margin: 16px auto 0 auto;
      text-align: center;
    }
  }
</style>
