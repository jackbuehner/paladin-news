<script context="module" lang="ts">
  import type { LoadInput, LoadOutput } from '@sveltejs/kit';

  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load({ page, fetch }: LoadInput): Promise<LoadOutput> {
    // build date string from date params
    const date = {
      year: undefined,
      month: undefined,
      day: undefined,
      path: undefined,
    };
    if (
      page.params.yyyy &&
      parseInt(page.params.yyyy) >= 1000 &&
      parseInt(page.params.yyyy) < 10000
    )
      date.year = page.params.yyyy;
    if (page.params.mm && parseInt(page.params.mm) > 0 && parseInt(page.params.mm) <= 12)
      date.month = page.params.mm.padStart(2, '0'); // ensure it is always two digits
    if (page.params.dd && parseInt(page.params.dd) > 0 && parseInt(page.params.dd) <= 31)
      date.day = page.params.dd.padStart(2, '0'); // ensure it is always two digits
    if (date.year && date.month && date.day) {
      date.path = '/' + date.year + '/' + date.month + '/' + date.day;
    }

    // fetch the data
    const url = `/articles${date.path || '/_/_/_'}/${page.params.slug}.json`;
    const res = await fetch(url);
    const article = await res.json();

    // set the document title
    title.set(article.name);

    if (res.ok) {
      return {
        props: {
          article,
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
  import type { IArticle } from 'src/interfaces/articles';
  import { title } from '../../stores/title';
  import {
    ArticleTemplateJackBuehner2020,
    ArticleTemplateFurmanPaladin,
    ArticleTemplateFurmanMediaCom,
  } from '../../components/article/index';
  import { onMount, tick } from 'svelte';
  import { articlePhotoRect } from '../../stores/articlePhotoRect';

  onMount(() => {
    const photoPos = document
      .querySelector(`[class^="article-photo-container"]`)
      .getBoundingClientRect();
    const pagePos = document
      .querySelector(`[class^="article-photo-container"]`)
      .parentElement.parentElement.parentElement.getBoundingClientRect();
    $articlePhotoRect = {
      bottom: photoPos.bottom - pagePos.bottom,
      height: photoPos.height,
      left: photoPos.left - pagePos.left,
      right: photoPos.right - pagePos.right,
      top: photoPos.x - pagePos.top,
      width: photoPos.width,
      x: photoPos.x - pagePos.x,
      y: photoPos.y - pagePos.y,
      toJSON: () =>
        JSON.stringify({
          bottom: photoPos.bottom - pagePos.bottom,
          height: photoPos.height,
          left: photoPos.left - pagePos.left,
          right: photoPos.right - pagePos.right,
          top: photoPos.x - pagePos.top,
          width: photoPos.width,
          x: photoPos.x - pagePos.x,
          y: photoPos.y - pagePos.y,
        }),
    };
  });

  // if we navigated to this url from elsewhere on the website, scroll to
  // the top (useful because we navigate to this page with scrolling
  // disabled )
  // onMount(async () => {
  //   await tick(); // wait for mount to finish
  //   const isFromInternalUrl = new URL(document.referrer).host === window.location.host;
  //   if (isFromInternalUrl) {
  //     window.scrollTo(0, 0);
  //   }
  // });

  export let article: IArticle;

  /**
   * Opens the article in Cristata when ALT + C is pressed.
   */
  const openInCMS = (event: KeyboardEvent) => {
    if (event.altKey && event.key === 'c') {
      window.open(
        `https://thepaladin.cristata.app/cms/item/articles/${article._id}?fs=force&props=1`,
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
