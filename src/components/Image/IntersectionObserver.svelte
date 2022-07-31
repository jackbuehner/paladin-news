<!-- adapted from https://css-tricks.com/lazy-loading-images-in-svelte/ -->
<script lang="ts">
  import { onMount } from 'svelte';

  export let once = false;
  export let top = 0;
  export let bottom = 0;
  export let left = 0;
  export let right = 0;

  export let className: string | undefined = undefined;
  export let clientWidth = 0;
  export let clientHeight = 0;
  export let intersecting = false;

  let container: HTMLDivElement;

  onMount(() => {
    if (typeof IntersectionObserver !== 'undefined') {
      const rootMargin = `${bottom}px ${left}px ${top}px ${right}px`;

      const observer = new IntersectionObserver(
        (entries) => {
          intersecting = entries[0].isIntersecting;
          if (intersecting && once) {
            observer.unobserve(container);
          }
        },
        {
          rootMargin,
        }
      );

      observer.observe(container);
      return () => observer.unobserve(container);
    }

    // The following is a fallback for older browsers
    function handler() {
      const bcr = container.getBoundingClientRect();

      intersecting =
        bcr.bottom + bottom > 0 &&
        bcr.right + right > 0 &&
        bcr.top - top < window.innerHeight &&
        bcr.left - left < window.innerWidth;

      if (intersecting && once) {
        window.removeEventListener('scroll', handler);
      }
    }

    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  });
</script>

<div bind:this={container} bind:clientWidth bind:clientHeight class={className}>
  <slot {intersecting} />
</div>

<style>
  div {
    width: 100%;
    height: 100%;
    position: relative;
  }
</style>
