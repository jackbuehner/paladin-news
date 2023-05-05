<script lang="ts">
  import {
    ArticleTemplateFurmanMediaCom,
    ArticleTemplateFurmanPaladin,
    ArticleTemplateJackBuehner2020,
  } from '$lib/components/article/index';
  import QuickEscape from '$lib/components/QuickEscape.svelte';
  import { title } from '$lib/stores/title';
  import type { LayoutData } from './$types';

  export let data: LayoutData;
  $: ({ article } = data);

  // set the document title
  $: if ($article?.name) title.set($article.name);

  /**
   * Opens the article in Cristata when ALT + C is pressed.
   */
  const openInCMS = (event: KeyboardEvent) => {
    if (event.altKey && event.key === 'c') {
      window.open(
        `https://cristata.app/paladin-news/cms/collection/articles/${$article?._id}?fs=1&props=1`,
        '_blank'
      );
    }
  };
</script>

<svelte:window on:keydown={openInCMS} />

{#if $article?.template === 'jackbuehner2020'}
  <ArticleTemplateJackBuehner2020 article={$article} />
{:else if $article?.template === 'furmanmediacom'}
  <ArticleTemplateFurmanMediaCom article={$article} />
{:else if $article?.template === 'furmanpaladin'}
  <ArticleTemplateFurmanPaladin article={$article} />
{/if}

{#if $article?.show_quick_escape === true}
  <QuickEscape />
{/if}
