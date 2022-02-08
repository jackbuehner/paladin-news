<script lang="ts">
  import { afterUpdate } from 'svelte';

  export let src: string;
  export let alt: string = '';
  export let loading: 'eager' | 'lazy' = 'lazy';
  export let className: string = undefined;
  export let containerClassName: string = undefined;
  export let maxSrcWidth: number = 1000;

  const ik = 'https://ik.imagekit.io/paladin/';

  if (src.indexOf('https://paladin-photo-library') === 0 && src.indexOf('%') === -1) {
    src = src
      .replace('https://paladin-photo-library.s3.amazonaws.com/', 'https://ik.imagekit.io/paladin/')
      .replace(
        'https://paladin-photo-library.s3.us-east-1.amazonaws.com/',
        'https://ik.imagekit.io/paladin/'
      );
  }

  $: canTransform = src.indexOf(ik) !== -1;
  $: tinySrc = src.replace(ik, `${ik}tr:w-27,bl-5/`);
  $: realSrc = undefined;

  // control whether the image is shown
  $: showTiny = canTransform ? true : false; // only show if the image was transformed
  let showFinal = false;

  // reference the final image element
  let finalImgElem: HTMLImageElement;

  // keep track of whether the image source has changed
  let lastSrc = '';
  $: srcChanged = src !== lastSrc;

  afterUpdate(() => {
    // when the image src changes, switch back to the tiny image
    if (srcChanged && canTransform) {
      showTiny = true;
      showFinal = false;
    }

    // once the component has loaded, start loading the full-size images
    if (srcChanged && canTransform && finalImgElem) {
      // cache the image src in a separate image element
      const img = new Image();
      img.src = src.replace(ik, `${ik}tr:w-${maxSrcWidth}/`);
      img.onload = () => {
        // once the image is cached, show the final image
        realSrc = img.src;
        showFinal = true;
        // hide the tiny image after the final image finishes fading in
        setTimeout(() => {
          showTiny = false;
        }, 4000);
      };
      // set the oldSrc to be the same as the current src
      lastSrc = src;
    }
  });
</script>

<div class={containerClassName}>
  {#if canTransform}
    <img
      src={tinySrc}
      {alt}
      class={showTiny ? `${className} show` : `${className} hide`}
      {loading}
    />
    <img
      src={realSrc}
      {alt}
      class={showFinal ? `${className} show loaded` : `${className} hide`}
      loading={'lazy'}
      bind:this={finalImgElem}
    />
  {:else}
    <img {src} class={className} {alt} {loading} />
  {/if}
</div>

<style>
  div {
    position: relative;
  }
  img {
    top: 0;
  }
  img.hide {
    display: none;
  }
  img.show {
    display: block;
  }
  img.loaded {
    animation: imageFadeInAnimation ease-in-out 400ms;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
  }
  @keyframes imageFadeInAnimation {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
</style>
