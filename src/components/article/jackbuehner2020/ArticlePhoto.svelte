<style>
  :global(.article-photo-container--jackbuehner) {
    width: 100%;
    padding-top: calc(66.6667%);
    height: 0px;
    position: relative;
    margin: 0 0 4px 0;
  }
  @media (max-width: 600px) {
    :global(.article-photo-container--jackbuehner) {
      /* expand into page margins */
      width: calc(100% + 40px);
      left: -20px;
    }
  }
  :global(.article-photo-image--jackbuehner) {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    object-fit: cover;
  }
</style>

<script lang="ts">
  import Image from '../../Image.svelte';

  export let src: string;
</script>

<Image
  {src}
  className={`article-photo-image--jackbuehner`}
  containerClassName={`article-photo-container--jackbuehner`} />
