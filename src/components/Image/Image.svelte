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

  // photos with this name MUST be proxied because their URL encoding
  // does not work with imagekit (many other images have URL encoding
  // that does work, which is why we manually override the behavior
  // with this list)
  const forceProxyList = [
    'Screen%2520Shot%25202021-04-02%2520at%25208.32.30%2520AM.png.jpg',
    'Screen%2520Shot%25202021-03-19%2520at%25201.09.53%2520PM.png.jpg',
    'Screen%2520Shot%25202021-04-21%2520at%252012.45.14%2520PM.png.jpg',
    'Screen%2520Shot%25202021-03-24%2520at%252011.28.59%2520AM.png.jpg',
    'Screen%2520Shot%25202021-02-28%2520at%25205.37.15%2520PM.png.jpg',
    'Screen%2520Shot%25202021-02-26%2520at%252011.24.59%2520AM.png.jpg',
    'Screen%2520Shot%25202021-03-18%2520at%252011.08.09%2520AM.png.jpg',
    'Screen%2520Shot%25202021-03-04%2520at%252011.30.49%2520AM.png.jpg',
    'Screen%2520Shot%25202021-03-26%2520at%252012.48.37%2520PM.png.jpg',
    'Screen%2520Shot%25202021-03-02%2520at%252011.40.11%2520AM.png.jpg',
    'socon%2520.jpg.jpg',
    'content%2520(1).jpeg.jpg',
    'hornet%25201.jpg.jpg',
    'Screen%2520Shot%25202021-05-10%2520at%252010.19.50%2520AM.png.jpg',
    'content%2520(1).jpg.jpg',
    'Screen%2520Shot%25202021-04-11%2520at%25206.24.48%2520PM.png.jpg',
    'Screen%2520Shot%25202021-04-20%2520at%252010.48.55%2520PM.png.jpg',
    'Screen%2520Shot%25202021-03-17%2520at%25207.46.08%2520PM.png.jpg',
    'Screen%2520Shot%25202021-03-16%2520at%252010.02.19%2520AM.png.jpg',
    'Screen%2520Shot%25202021-03-01%2520at%25203.15.41%2520PM.png.jpg',
    '601984cd585c32c9a43adb53_content%252520(1).jpeg.jpg',
    '5fc14d7c5300de2170b28b76_content%252520(1).jpeg.jpg',
    '5faec018da22f902be31d8b6_content%252520(1).jpeg.jpg',
    'JosephVaughn%2520(1).JPG.jpg',
  ];

  src = toIK(
    src,
    undefined,
    forceProxyList.some((name) => src.endsWith(name))
  );

  let isProxied = false;
  if (src.indexOf(ikp) === 0) {
    // src = `${ikp}${src}`;
    isProxied = true;
  }

  $: tinySrc = src.replace(isProxied ? ikp : ik, `${isProxied ? ikp : ik}tr:w-27,bl-5/`);
  $: realSrc = src.replace(
    isProxied ? ikp : ik,
    `${isProxied ? ikp : ik}${
      !disableTransform
        ? `tr:w-${renderWidth < maxSrcWidth ? renderWidth || defaultSrcWidth : maxSrcWidth},h-${
            renderHeight ? renderHeight : 'auto'
          }/`
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
      onerror="this.parentElement.style.display = 'none'"
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
