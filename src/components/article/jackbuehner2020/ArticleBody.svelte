<!-- svelte-ignore css-unused-selector -->
<style>
  div.article-body {
    margin: 30px auto 0;
    font-family: var(--font-body);
    color: var(--color-neutral-dark);
    font-size: 17px;
    line-height: 1.7;
    font-weight: 400;
  }
  :global(.article-body p) {
    margin-top: 0;
    margin-bottom: 10px;
  }
  :global(.article-body img) {
    max-width: 100%;
    height: auto;
  }
  :global(.article-body a) {
    color: rgb(var(--primary-lighter));
    box-shadow: 0 1px 0 0 rgb(var(--primary));
    transition: background-color 0.2s, box-shadow 0.1s, color 0.2s;
    text-decoration: none;
  }
  :global(.article-body a:hover) {
    box-shadow: 0 2px 0 0 rgb(var(--primary));
    background-color: rgba(var(--primary), 0.1);
    color: var(--color-neutral-dark);
  }
  :global(.article-body a:active) {
    background-color: rgba(var(--primary), 0.16);
  }
  :global(.article-body .widget) {
    width: 1px;
    min-width: 100%;
    border: none;
    border-top: 1px solid #cccccc;
    border-bottom: 1px solid #cccccc;
    margin: 20px 0;
    display: flex;
    flex-direction: column;
  }
  :global(.article-body iframe) {
    border: none;
  }
  :global(.article-body figure .img-wrapper::after) {
    content: attr(data-photo-credit);
    display: inline;
    margin: 0;
    font-family: var(--font-body);
    color: var(--color-neutral-lightest);
    font-size: 13px;
    line-height: 20px;
    position: absolute;
    right: 0;
    top: 100%;
  }
  :global(.article-body figure figcaption::after) {
    content: attr(data-photo-credit);
    display: inline;
    margin: -4px 0 0 6px;
    font-family: var(--font-body);
    color: var(--color-neutral-lightest);
    font-size: 13px;
    line-height: 20px;
  }
  :global(.article-body figure figcaption::after) {
    content: attr(data-photo-credit);
    display: inline;
    margin: -4px 0 0 6px;
    font-family: var(--font-body);
    color: var(--color-neutral-lightest);
    font-size: 13px;
    line-height: 20px;
  }

  /* headings */
  :global(.article-body h1) {
    font-family: var(--font-headline);
    font-size: 24px;
    font-weight: 400;
    margin: 10px 0;
  }
  :global(.article-body h2) {
    font-family: var(--font-headline);
    font-size: 20px;
    font-weight: 400;
    margin: 10px 0;
  }
  :global(.article-body h3) {
    font-family: var(--font-headline);
    font-size: 17px;
    font-weight: 400;
    margin: 10px 0;
  }

  /* title and subtitle */
  :global(.article-body h1.title) {
    font-size: 48px;
    font-weight: 400;
    margin: 15px 0;
    text-align: center;
    line-height: 1.3;
  }
  :global(.article-body p.subtitle) {
    font-size: 18px;
    text-align: center;
    margin: 15px 0;
  }
  :global(.article-body h1.title + p.subtitle) {
    font-size: 18px;
    text-align: center;
    margin-top: -15px;
  }

  /* hanging indent paragraph */
  :global(.article-body p.hanging) {
    padding-left: 20px;
    text-indent: -20px;
  }
</style>

<script>
  import { onMount } from 'svelte';

  export let doc;

  onMount(() => {
    const scriptElem = document.createElement('script');
    scriptElem.type = 'text/javascript';
    scriptElem.src = '/js/iframeResizer.min.js';
    scriptElem.onload = () => {
      // get the resizable iframes
      const resizableIframeElems = document.querySelectorAll('iframe.resize');

      // for each resizable iFrame, set an ID and apply the resize function
      for (let i = 0; i < resizableIframeElems.length; i++) {
        const iframeElem = resizableIframeElems[i];
        iframeElem.id = `resizeIframe${i}`;
        // @ts-ignore
        window.iFrameResize(
          { log: false, autoResize: true, checkOrigin: false, resizeFrom: 'child' },
          `#resizeIframe${i}`
        );
      }
    };
    document.body.appendChild(scriptElem);
  });
</script>

<div class={'article-body'}>
  {@html doc}
</div>
