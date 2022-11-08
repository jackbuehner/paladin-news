<script lang="ts">
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

  const ik = 'https://ik.imagekit.io/paladin/';
  const ikp = 'https://ik.imagekit.io/paladin/proxy/';

  if (src.indexOf('https://paladin-photo-library') === 0 && src.indexOf('%') === -1) {
    src = src
      .replace('https://paladin-photo-library.s3.amazonaws.com/', 'https://ik.imagekit.io/paladin/')
      .replace(
        'https://paladin-photo-library.s3.us-east-1.amazonaws.com/',
        'https://ik.imagekit.io/paladin/'
      );
  }

  let isProxied = false;
  if (src.indexOf(ik) === -1) {
    src = `${ikp}${src}`;
    isProxied = true;
  }

  $: tinySrc = src.replace(isProxied ? ikp : ik, `${isProxied ? ikp : ik}tr:w-27,bl-5/`);
  $: realSrc =
    loading === 'eager'
      ? src.replace(
          isProxied ? ikp : ik,
          `${isProxied ? ikp : ik}${
            !disableTransform
              ? `tr:w-${
                  renderWidth < maxSrcWidth ? renderWidth || defaultSrcWidth : maxSrcWidth
                },h-${renderHeight ? renderHeight : 'auto'}/`
              : ''
          }`
        )
      : undefined;

  let renderWidth = 0;
  let renderHeight = 0;
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
      // set the oldSrc to be the same as the current src
      lastSrc = src;
    }
  });
</script>

{#if loading === 'lazy'}
  <IntersectionObserver
    bind:intersecting
    bind:clientWidth={renderWidth}
    bind:clientHeight={renderHeight}
    className={containerClassName}
  >
    <img
      src={tinySrc}
      {alt}
      class={showTiny ? `${className} show` : `${className} hide`}
      {loading}
    />
    <img
      src={realSrc || tinySrc}
      {alt}
      class={showFinal ? `${className} show loaded` : `${className} hide`}
      {loading}
      bind:this={finalImgElem}
    />
  </IntersectionObserver>
{:else}
  <div class={containerClassName} bind:clientWidth={renderWidth} bind:clientHeight={renderHeight}>
    <img
      src={realSrc || tinySrc}
      {alt}
      class={`${className} show`}
      {loading}
      bind:this={finalImgElem}
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
