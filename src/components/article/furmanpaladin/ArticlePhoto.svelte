<script lang="ts">
  import { Image } from '$lib/components/Image';

  export let src: string;
</script>

<Image
  {src}
  className={`article-photo-image--furmanpaladin`}
  containerClassName={`article-photo-container--furmanpaladin`}
  loading={'eager'}
/>

<style>
  :global(.article-photo-container--furmanpaladin) {
    width: 100%;
    padding-top: calc(66.6667%);
    height: 0px;
    position: relative;
    margin: 0 0 4px 0;
  }
  :global(.article-photo-image--furmanpaladin) {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    object-fit: cover;
  }
</style>
