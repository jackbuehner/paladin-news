<script context="module" lang="ts">
  export const load: Load = async ({ params, fetch }) => {
    // build date string from date params
    const date: Record<'year' | 'month' | 'day' | 'path', string | undefined> = {
      year: undefined,
      month: undefined,
      day: undefined,
      path: undefined,
    };
    if (params.yyyy && parseInt(params.yyyy) >= 1000 && parseInt(params.yyyy) < 10000)
      date.year = params.yyyy;
    if (params.mm && parseInt(params.mm) > 0 && parseInt(params.mm) <= 12)
      date.month = params.mm.padStart(2, '0'); // ensure it is always two digits
    if (params.dd && parseInt(params.dd) > 0 && parseInt(params.dd) <= 31)
      date.day = params.dd.padStart(2, '0'); // ensure it is always two digits
    if (date.year && date.month && date.day) {
      date.path = '/' + date.year + '/' + date.month + '/' + date.day;
    }

    // fetch the data
    const endpoint = `/articles${date.path || '/_/_/_'}/${params.slug}.json`;
    const res = await fetch(endpoint);
    const { data }: GraphResponse<string> = await res.json();

    if (res.ok && data) {
      const article: GET_ARTICLE_BY_SLUG__DOC_TYPE = JSON.parse(data);

      // set the document title
      title.set(article.name);

      return {
        props: {
          article: insertDate([article])[0],
        },
      };
    }

    return {
      status: res.status,
      error: new Error(`Could not load ${endpoint}`),
    };
  };
</script>

<script lang="ts">
  import type { GET_ARTICLE_BY_SLUG__DOC_TYPE } from '$lib/queries';
  import { insertDate } from '$lib/utils';
  import type { GraphResponse } from '$lib/utils/api';
  import type { PublishedDocWithDate } from '$lib/utils/insertDate';
  import type { Load } from '@sveltejs/kit';
  import {
    ArticleTemplateFurmanMediaCom,
    ArticleTemplateFurmanPaladin,
    ArticleTemplateJackBuehner2020,
  } from '$lib/components/article/index';
  import { title } from '$lib/stores/title';
  import QuickEscape from '$lib/components/QuickEscape.svelte';

  export let article: PublishedDocWithDate<GET_ARTICLE_BY_SLUG__DOC_TYPE>;

  /**
   * Opens the article in Cristata when ALT + C is pressed.
   */
  const openInCMS = (event: KeyboardEvent) => {
    if (event.altKey && event.key === 'c') {
      window.open(
        `https://thepaladin.cristata.app/cms/collection/articles/${article._id}?fs=1&props=1`,
        '_blank'
      );
    }
  };
</script>

<svelte:window on:keydown={openInCMS} />

{#if article.template === 'jackbuehner2020'}
  <ArticleTemplateJackBuehner2020 {article} />
{:else if article.template === 'furmanmediacom'}
  <ArticleTemplateFurmanMediaCom {article} />
{:else if article.template === 'furmanpaladin'}
  <ArticleTemplateFurmanPaladin {article} />
{/if}

{#if article.show_quick_escape === true}
  <QuickEscape />
{/if}
