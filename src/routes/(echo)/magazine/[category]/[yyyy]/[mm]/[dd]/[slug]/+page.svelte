<script lang="ts">
  import { title } from '$lib/stores/title';
  import { capitalize, listOxford, toIK } from '$lib/utils';
  import type { PageData } from './$types';
  import CoverPage from './CoverPage.svelte';
  import SocialButtons from './SocialButtons.svelte';

  export let data: PageData;

  title.set(`${data.name} – ${capitalize(data.type?.replaceAll('-', ' ') || '', true)}`);

  /**
   * Opens the document in Cristata when ALT + C is pressed.
   */
  const openInCMS = (event: KeyboardEvent) => {
    if (event.altKey && event.key === 'c' && data?._id) {
      window.open(
        `https://cristata.app/paladin-news/cms/collection/echo-contents/${data._id}`,
        '_blank'
      );
    }
  };
</script>

<svelte:window on:keydown={openInCMS} />

<svelte:head>
  {#if data}
    <meta
      property={'og:url'}
      content={`https://thepaladin.news/${
        data && data.date
          ? `magazine/${data.type}/${data.date.year}/${data.date.month}/${data.date.day}/${data.slug}`
          : `magazine/${data.type}/${data.slug}`
      }`}
    />
    <meta property={'og:type'} content={'article'} />
    <meta property={'og:title'} content={data.name} />
    <meta
      property={'og:description'}
      content={capitalize(data.type?.replaceAll('-', ' ') || '', true)}
    />
    {#if data.photo}
      <meta property={'og:image'} content={data.photo?.photo_url} />
    {/if}
    <meta property={'og:locale'} content={'en_US'} />
  {/if}
</svelte:head>

<CoverPage {data} />

<article class="echo-article-body" data-type={data.type}>
  <div class="type">
    <a href="/magazine/category/{data.type}" class="invisible"
      >{capitalize(data.type?.replaceAll('-', ' ') || '', true)}</a
    >
  </div>
  <h1>{data.name}</h1>
  <div class="by">By {listOxford(data.authored_by.map(({ name }) => name))}</div>
  {#if data.photo}
    <figure class="main">
      <img
        src={toIK(data.photo.photo_url, 'tr:w-600')}
        style="aspect-ratio: {data.photo.width / data.photo.height};"
        alt=""
      />
      <figcaption data-photo-credit={data.photo.people.photo_created_by} class:noCaption={true} />
    </figure>
  {/if}
  {@html data.body}
</article>

<SocialButtons {data} />

<style>
  article {
    width: 100%;
    max-width: 590px;
    margin: 0 auto;
    padding: 20px;
  }

  h1 {
    font-family: var(--echo-font-body);
    font-size: 36px;
    font-weight: 700;
    margin: 0;
    color: var(--color-neutral-dark);
    line-height: 1.1;
  }

  .type {
    font-family: var(--echo-font-body);
    font-size: 16px;
    font-weight: 400;
    color: var(--color-neutral-dark);
    margin: 10px 0 4px 0;
  }

  .by {
    font-family: var(--echo-font-body);
    font-size: 20px;
    font-weight: 400;
    color: var(--color-neutral-dark);
    font-style: italic;
    margin: 6px 0 20px 10px;
  }

  figure.main {
    width: calc(100% + 40px);
    margin-left: -20px;
  }

  img {
    width: 100%;
  }

  :global(.echo-article-body figure figcaption) {
    margin-left: 20px !important;
    margin-right: 20px !important;
  }

  :global(.echo-article-body) {
    font-family: var(--echo-font-body);
    color: var(--color-neutral-dark);
    font-size: 16px;
    line-height: 1.3;
    font-weight: 400;
  }

  :global(.echo-article-body[data-type='poetry'] p) {
    margin-bottom: 1em;
  }

  :global(.echo-article-body[data-type='prose'] p) {
    margin: 0;
    text-indent: 52px;
  }

  :global(.echo-article-body hr) {
    border: none;
    margin: 0;
  }

  :global(.echo-article-body hr::before) {
    content: '~~~';
    display: flex;
    justify-content: center;
    white-space: pre;
    margin: 0;
  }

  :global(.echo-article-body blockquote) {
    font-size: 15px;
    line-height: 1.2;
  }

  :global(.echo-article-body blockquote p) {
    text-indent: 26px;
  }

  :global(.echo-article-body img) {
    max-width: 100%;
    width: 100%;
    height: auto;
  }

  :global(.echo-article-body a) {
    color: unset;
    text-decoration: none;
    transition: background-color 0.2s, box-shadow 0.1s, color 0.2s;
  }
  :global(.echo-article-body a:not(.invisible)) {
    color: rgb(var(--primary-lighter));
    box-shadow: 0 1px 0 0 rgb(var(--primary));
    text-decoration: none;
  }
  :global(.echo-article-body a:hover) {
    box-shadow: 0 2px 0 0 rgb(var(--primary));
    background-color: rgba(var(--primary), 0.1);
    color: var(--color-neutral-dark);
  }
  :global(.echo-article-body a:active) {
    background-color: rgba(var(--primary), 0.16);
  }

  :global(.echo-article-body .widget) {
    width: 1px;
    min-width: 100%;
    border: none;
    border-top: 1px solid #cccccc;
    border-bottom: 1px solid #cccccc;
    margin: 20px 0;
    display: flex;
    flex-direction: column;
  }

  /* do not use top and bottom borders for photos/figures */
  :global(.echo-article-body figure.widget) {
    border: none;
  }

  /* insert photo credit after the figure */
  /*when there is no caption*/
  :global(.echo-article-body figure .img-wrapper::after) {
    content: attr(data-photo-credit);
    display: inline;
    margin: 0;
    font-family: var(--echo-font-body);
    color: var(--color-neutral-lightest);
    font-size: 13px;
    line-height: 20px;
    position: absolute;
    right: 0;
    top: 100%;
  }
  :global(.echo-article-body figure figcaption.noCaption::after) {
    display: block;
    text-align: right;
  }
  /*when there is a caption*/
  :global(.echo-article-body figure figcaption::after) {
    content: attr(data-photo-credit);
    display: inline;
    margin: -4px 0 0 6px;
    font-family: var(--echo-font-body);
    color: var(--color-neutral-lightest);
    font-size: 13px;
    line-height: 20px;
  }
</style>
