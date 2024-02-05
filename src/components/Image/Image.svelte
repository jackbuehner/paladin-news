<script lang="ts">
  import { toIK } from '$lib/utils';
  import { afterUpdate } from 'svelte';
  import IntersectionObserver from './IntersectionObserver.svelte';

  export let src: string;
  export let alt = '';
  export let loading: 'eager' | 'lazy' = 'lazy';
  export let className: string | undefined = undefined;
  export let containerClassName: string | undefined = undefined;
  export let maxSrcWidth = 1000;
  export let defaultSrcWidth = 100;
  export let disableTransform: boolean = false;
  export let hidden: boolean = false;

  const ik = 'https://ik.imagekit.io/paladin/';
  const ikp = 'https://ik.imagekit.io/paladin/proxy/';

  src = toIK(src);

  let isProxied = false;
  if (src.indexOf(ikp) === 0) {
    src = `${ikp}${src}`;
    isProxied = true;
  }

  $: tinySrc = src.replace(isProxied ? ikp : ik, `${isProxied ? ikp : ik}tr:w-27,bl-5/`);
  $: realSrc = src.replace(
                  isProxied ? ikp : ik,
                  `${isProxied ? ikp : ik}${
                    !disableTransform
                      ? `tr:w-${
                          renderWidth < maxSrcWidth ? renderWidth || defaultSrcWidth : maxSrcWidth
                        },h-${renderHeight ? renderHeight : 'auto'}/`
                      : ''
                  }`
                );

  let renderWidth = 600;
  let renderHeight = 400;
  let intersecting = false;

  // control whether the image is shown
  let showTiny = true;
  let showFinal = false;

  // reference the final image element
  let finalImgElem: HTMLImageElement;

  // keep track of whether the image source has changed
  let lastSrc = '';
  $: srcChanged = src !== lastSrc;

  afterUpdate(() => {
    // when the image src changes, switch back to the tiny image
    if (srcChanged) {
      showTiny = true;
      showFinal = false;
    }

    // once the component has loaded and it is visible, start loading the full-size images
    if (srcChanged && finalImgElem && intersecting) {
      // cache the image src in a separate image element
      const img = new Image();
      img.src = src.replace(
        isProxied ? ikp : ik,
        `${isProxied && !disableTransform ? ikp : ik}${
          !disableTransform
            ? `tr:w-${renderWidth < maxSrcWidth ? renderWidth : maxSrcWidth},h-${
                renderHeight ? renderHeight : 'auto'
              }/`
            : ''
        }`
      );

      img.onload = () => {
        // once the image is cached, show the final image
        realSrc = img.src;
        showFinal = true;
        // hide the tiny image after the final image finishes fading in
        setTimeout(() => {
          showTiny = false;
        }, 4000);
      };

      img.onerror = () => {
        hidden = true;
      };

      // set the oldSrc to be the same as the current src
      lastSrc = src;
    }
  });
</script>

{#if hidden === false}
  <div class={containerClassName} bind:clientWidth={renderWidth} bind:clientHeight={renderHeight}>
    <img
      src={realSrc}
      {alt}
      class={`${className} show`}
      {loading}
      bind:this={finalImgElem}
      on:error={() => (hidden = true)}
    />
  </div>
{/if}

<style>
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
