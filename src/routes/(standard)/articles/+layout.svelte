<script lang="ts">
  import {
    ArticleTemplateFurmanMediaCom,
    ArticleTemplateFurmanPaladin,
    ArticleTemplateJackBuehner2020
  } from '$lib/components/article/index';
  import QuickEscape from '$lib/components/QuickEscape.svelte';
  import { title } from '$lib/stores/title';
  import type { LayoutData } from './$types';

  export let data: LayoutData;

  // set the document title
  title.set(data.name);

  /**
   * Opens the article in Cristata when ALT + C is pressed.
   */
  const openInCMS = (event: KeyboardEvent) => {
    if (event.altKey && event.key === 'c') {
      window.open(
        `https://cristata.app/paladin-news/cms/collection/articles/${data._id}?fs=1&props=1`,
        '_blank'
      );
    }
  };
</script>

<svelte:window on:keydown={openInCMS} />

{#if data.template === 'jackbuehner2020'}
  <ArticleTemplateJackBuehner2020 article={data} />
{:else if data.template === 'furmanmediacom'}
  <ArticleTemplateFurmanMediaCom article={data} />
{:else if data.template === 'furmanpaladin'}
  <ArticleTemplateFurmanPaladin article={data} />
{/if}

{#if data.show_quick_escape === true}
  <QuickEscape />
{/if}
