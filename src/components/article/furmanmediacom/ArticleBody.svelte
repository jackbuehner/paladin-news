<script lang="ts">
  import { Slicker } from '@rooi/slicker';
  import { onMount } from 'svelte';

  onMount(() => {
    const galleryElems = document.querySelectorAll('.gallery');
    galleryElems.forEach((elem) => {
      new Slicker(elem, {
        arrows: true,
        prevArrow: `<div class="gallery-arrow gallery-arrow__prev"><-</div>`,
        nextArrow: `<div class="gallery-arrow gallery-arrow__next">-></div>`,
        dots: true,
        dotsClass: 'gallery-dots',
        pauseOnHover: true,
        pauseOnDotsHover: true,
        autoplay: true,
        autoplaySpeed: 2000,
      });
    });
  });

  export let doc: string;
</script>

<link rel="stylesheet" href="/gallery/slick.css" />
<link rel="stylesheet" href="/gallery/slick-theme.css" />
<link rel="stylesheet" href="/gallery/custom.css" />

<div class={'article-body-furmanmediacom'}>
  {@html doc}
</div>

<!-- svelte-ignore css-unused-selector -->
<style>
  div.article-body-furmanmediacom {
    margin: 0;
    font-family: var(--legacy2-font);
    color: var(--color-neutral-dark);
    font-size: 17px;
    line-height: 1.7;
    font-weight: 400;
  }
  :global(.article-body-furmanmediacom p) {
    margin-top: 0;
    margin-bottom: 25px;
  }
  :global(.article-body-furmanmediacom p:empty) {
    margin: 0;
  }
  :global(.article-body-furmanmediacom img) {
    max-width: 100%;
    height: auto;
  }
  :global(.article-body-furmanmediacom a) {
    color: rgb(var(--primary-lighter));
    box-shadow: 0 1px 0 0 rgb(var(--primary));
    transition: background-color 0.2s, box-shadow 0.1s, color 0.2s;
    text-decoration: none;
  }
  :global(.article-body-furmanmediacom a:hover) {
    box-shadow: 0 2px 0 0 rgb(var(--primary));
    background-color: rgba(var(--primary), 0.1);
    color: var(--color-neutral-dark);
  }
  :global(.article-body-furmanmediacom a:active) {
    background-color: rgba(var(--primary), 0.16);
  }
  :global(.article-body-furmanmediacom figure) {
    width: 1px;
    min-width: 100%;
    border: none;
    border-top: 1px solid #cccccc;
    border-bottom: 1px solid #cccccc;
    margin: 20px 0;
    padding: 20px 0;
    display: flex;
    flex-direction: column;
  }
  :global(.article-body-furmanmediacom figure img) {
    width: 100%;
    height: auto;
  }
  :global(.article-body-furmanmediacom figure figcaption) {
    margin: 12px 12px 0 12px;
    font-family: var(--legacy-font-body);
    color: var(--color-neutral-dark);
    font-weight: 700;
    line-height: 1.3;
    font-size: 14px;
  }
  :global(.article-body-furmanmediacom .gallery) {
    --height: 600px;
  }
</style>
