<style>
  article {
    max-width: 590px;
    margin: 32px auto;
  }
</style>

<script context="module" lang="ts">
  import type { LoadInput, LoadOutput } from '@sveltejs/kit';

  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load({ page, fetch }: LoadInput): Promise<LoadOutput> {
    const url = `/articles/${page.params.slug}.json`;
    const res = await fetch(url);

    if (res.ok) {
      return {
        props: {
          article: await res.json(),
        },
      };
    }

    return {
      status: res.status,
      error: new Error(`Could not load ${url}`),
    };
  }
</script>

<script lang="ts">
  import ArticleHeading from '/src/components/article/ArticleHeading.svelte';
  import ArticleSubtitle from '/src/components/article/ArticleSubtitle.svelte';
  import ArticleCategories from '/src/components/article/ArticleCategories.svelte';
  import ArticlePhoto from '/src/components/article/ArticlePhoto.svelte';
  import ArticleCaption from '/src/components/article/ArticleCaption.svelte';
  import ArticlePhotoCredit from '/src/components/article/ArticlePhotoCredit.svelte';
  import ArticleMeta from '/src/components/article/ArticleMeta.svelte';
  import ArticleBody from '/src/components/article/ArticleBody.svelte';
  import type { IArticle } from 'src/interfaces/articles';

  export let article: IArticle;
</script>

<article>
  <ArticleCategories categories={article.categories} />
  <ArticleHeading>{article.name}</ArticleHeading>
  <ArticleSubtitle>{article.description}</ArticleSubtitle>
  <ArticlePhoto src={article.photo_path} />
  <ArticleCaption>{article.photo_caption}</ArticleCaption>
  <ArticlePhotoCredit>{article.photo_credit}</ArticlePhotoCredit>
  <ArticleMeta
    date={article.timestamps.published_at}
    authors={article.people.authors}
    articleName={article.name}
    articleLocation={`https://thepaladin.news/articles/${article.slug}`}
    articleDescription={article.description} />
  <ArticleBody doc={article.body} />
</article>
