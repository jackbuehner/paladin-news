<script lang="ts">
  import { marked } from 'marked';
  import Plyr from 'plyr';
  import { onMount } from 'svelte';
  import SvelteMarkdown from 'svelte-markdown';
  import { fly } from 'svelte/transition';
  import type { PageData } from './$types';

  // receive the articles from the page endpoint
  export let data: PageData;

  //create and add the plyr stylesheet
  onMount(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/plyr@3/dist/plyr.css';
    document.body.appendChild(link);
    () => {
      // cleanup
      document.removeChild(link);
    };
  });

  let player: Plyr | undefined;
  onMount(() => {
    player = new Plyr('#player');
  });

  $: tokens = marked.lexer(data?.description || '');
  $: {
    marked.walkTokens(tokens, (token) => {
      if (
        token.type !== 'paragraph' &&
        token.type !== 'br' &&
        token.type !== 'code' &&
        token.type !== 'link' &&
        token.type !== 'space' &&
        token.type !== 'em' &&
        token.type !== 'strong' &&
        token.type !== 'text'
      )
        token.type = 'text';
    });
  }
</script>

<svelte:head>
  <title>Video – The Paladin</title>
</svelte:head>

<article in:fly={{ y: 10, duration: 240 }}>
  <p class={'header-tag'}>
    <a href={`/section/video`}>Video</a>
  </p>
  <div class="plyr__video-embed" id="player">
    <iframe
      title={data.name}
      src={(() => {
        if (data.video_url) {
          const url = new URL(data.video_url);
          const videoId = url.searchParams.get('v');
          if (videoId)
            return `https://www.youtube.com/embed/${videoId}?origin=https://plyr.io&amp;iv_load_policy=3&amp;modestbranding=1&amp;playsinline=1&amp;showinfo=0&amp;rel=0&amp;enablejsapi=1`;
        }
        return '';
      })()}
      frameborder="0"
      allowfullscreen
    />
  </div>
  <h1>{data.name}</h1>
  <div class="description">
    <SvelteMarkdown source={marked.parser(tokens)} />
  </div>
  <div class="tags">
    {#each data.tags || [] as tag}
      <span>#{tag}</span>
    {/each}
  </div>
  <p class={'navigation'}>
    <a href={`/section/video`}> ⇐ Return to video home </a>
  </p>
</article>

<style>
  article {
    max-width: 840px;
    margin: 20px auto;
    padding: 0 20px;
    --plyr-color-main: rgb(var(--primary));
  }

  h1 {
    font-family: var(--font-detail);
    color: var(--color-neutral-dark);
    font-size: 22px;
    line-height: 26px;
    font-style: normal;
    font-weight: 700;
    letter-spacing: 0.16px;
    margin: 20px 0 10px 0;
  }

  .tags {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 3px 6px;
    font-family: var(--font-detail);
    color: var(--color-neutral-dark);
    font-size: 16px;
    line-height: 1.2;
    font-style: normal;
    font-weight: 400;
    letter-spacing: 0.16px;
    margin: 10px 0;
  }

  .description {
    font-family: var(--font-detail);
    color: var(--color-neutral-dark);
    font-size: 16px;
    line-height: 1.2;
    font-style: normal;
    font-weight: 400;
    letter-spacing: 0.16px;
    margin: 10px 0;
  }

  .plyr__video-embed {
    position: relative;
    padding-bottom: 56.25%; /* 16:9 */
    height: 0;
  }
  .plyr__video-embed iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  a,
  .description :global(a) {
    font-family: var(--font-detail);
    color: var(--color-neutral-dark);
    box-shadow: 0 0.5px 0 0 var(--color-neutral-lightest);
    text-decoration: none;
    transition: background-color 0.2s, box-shadow 0.1s;
  }
  a:hover,
  .description :global(a:hover) {
    color: rgb(var(--primary));
    background-color: rgba(var(--primary), 0.1);
    box-shadow: 0 2px 0 0 rgb(var(--primary));
  }
  a:active,
  .description :global(a:active) {
    background-color: rgba(var(--primary), 0.16);
  }

  .header-tag a {
    letter-spacing: 5px;
    text-transform: uppercase;
    font-size: 12px;
  }
  .header-tag a:not(:hover):not(:active) {
    box-shadow: none;
  }
</style>
