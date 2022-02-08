<style>
  :global(.article-photo-container--furmanmediacom) {
    position: relative;
    margin: 0 auto 4px auto;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
  }
  :global(.article-photo-image--furmanmediacom) {
    position: relative;
    width: 100%;
    max-height: 550px;
    margin: 0 auto;
    object-fit: contain;
    grid-area: 1 / 1;
  }
</style>

<script lang="ts">
  import Image from '../../Image.svelte';

  export let src: string;
</script>

<Image
  {src}
  className={`article-photo-image--furmanmediacom`}
  containerClassName={`article-photo-container--furmanmediacom`}
  loading={'eager'} />
