<script lang="ts">
  import { marked } from 'marked';
  import SvelteMarkdown from 'svelte-markdown';
  import Image from '../Image.svelte';
  export let thumbnail: string;
  export let name: string;
  export let href: string;
  export let description: string;

  let truncated = true;

  let descriptionElem: HTMLDivElement | undefined;
  let isTextClamped: boolean = false;

  const tokens = marked.lexer(description);
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
</script>

<svelte:window
  on:resize={(e) => {
    console.log(descriptionElem?.scrollHeight);
    console.log(descriptionElem?.clientHeight);
    isTextClamped = (descriptionElem?.scrollHeight || 0) > (descriptionElem?.clientHeight || 0);
  }}
/>

<section>
  <h2>Featured video</h2>
  <a {href}>
    <div class="thumbnail">
      <Image
        src={thumbnail}
        className="featured-video-thumbnail"
        containerClassName="featured-video-thumbnail-container"
      />
    </div>
  </a>
  <div>
    <a {href}><h3>{name}</h3></a>
    <div>
      <div
        class="description featured-video-decription"
        class:truncated
        bind:this={descriptionElem}
      >
        <SvelteMarkdown source={marked.parser(tokens)} />
      </div>
      {#if truncated && isTextClamped}
        <div
          class={'trunc-btn'}
          on:click={() => {
            truncated = false;
          }}
        >
          Read more
        </div>
      {:else if truncated === false}
        <div
          class={'trunc-btn'}
          on:click={() => {
            truncated = true;
          }}
        >
          Collapse
        </div>
      {/if}
    </div>
  </div>
</section>

<style>
  h2 {
    display: none;
  }

  section {
    display: grid;
    grid-template-columns: 400px 1fr;
    margin: 20px 0;
  }

  h3 {
    font-family: var(--font-detail);
    color: var(--color-neutral-dark);
    font-size: 22px;
    line-height: 26px;
    font-style: normal;
    font-weight: 700;
    letter-spacing: 0.16px;
    margin: 0 20px 10px 20px;
  }

  .description,
  .trunc-btn {
    font-family: var(--font-detail);
    color: var(--color-neutral-dark);
    font-size: 16px;
    line-height: 1.2;
    font-style: normal;
    font-weight: 400;
    letter-spacing: 0.16px;
    margin: 10px 20px;
    max-width: 590px;
  }

  :global(.featured-video-decription > *) {
    margin-top: 0;
  }

  .description.truncated {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
  }

  .trunc-btn {
    display: inline-block;
    color: rgb(var(--primary));
    box-shadow: 0 1px 0 0 rgb(var(--primary));
    transition: background-color 0.2s, box-shadow 0.1s, color 0.2s;
    text-decoration: none;
    cursor: pointer;
    margin-top: 0;
  }
  .trunc-btn:hover {
    box-shadow: 0 2px 0 0 rgb(var(--primary));
    background-color: rgba(var(--primary), 0.1);
    color: var(--color-neutral-dark);
  }
  .trunc-btn:active {
    background-color: rgba(var(--primary), 0.16);
  }

  .thumbnail {
    width: 100%;
    padding-top: 56.25%;
    height: 0px;
    position: relative;
    margin: 0 16px 0 0;
  }
  :global(.featured-video-thumbnail),
  :global(.featured-video-thumbnail-container) {
    width: 100% !important;
    height: 100% !important;
    position: absolute !important;
    top: 0px !important;
    object-fit: cover;
  }

  a {
    text-decoration: none;
  }
  a:hover * {
    color: var(--color-neutral-light);
  }

  @media (max-width: 980px) {
    section {
      grid-template-columns: 240px 1fr;
    }
  }

  @media (max-width: 600px) {
    section {
      grid-template-columns: 1fr;
      grid-template-rows: auto 1fr;
    }

    .description,
    .trunc-btn,
    h3 {
      margin-left: 0;
      margin-right: 0;
    }

    h3 {
      margin-top: 20px;
    }
  }
</style>
