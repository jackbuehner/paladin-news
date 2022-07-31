<script lang="ts">
  import { Image } from '../Image';

  export let thumbnail: string;
  export let name: string;
  export let href: string | undefined = undefined;
  export let h: 2 | 3 | 4 = 2;
</script>

<article>
  <a {href}>
    <div class="thumbnail">
      <Image
        src={thumbnail}
        className="video-card-thumbnail"
        containerClassName="video-card-thumbnail-container"
        alt={`Thumbnail for video titled: ${name}`}
      />
    </div>
  </a>
  <a {href}>
    {#if h === 3}
      <h3>{name}</h3>
    {:else if h === 4}
      <h4>{name}</h4>
    {:else}
      <h2>{name}</h2>
    {/if}
  </a>
</article>

<style>
  h2,
  h3,
  h4 {
    font-family: var(--font-detail);
    color: var(--color-neutral-dark);
    font-size: 18px;
    line-height: 20px;
    font-style: normal;
    font-weight: 700;
    letter-spacing: 0.16px;
    margin: 14px 0 0 0;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }

  a {
    text-decoration: none;
  }
  article:hover * {
    color: var(--color-neutral-light);
  }

  .thumbnail {
    width: 100%;
    padding-top: 56.25%;
    height: 0px;
    position: relative;
    margin: 0 16px 0 0;
  }
  :global(.video-card-thumbnail),
  :global(.video-card-thumbnail-container) {
    width: 100% !important;
    height: 100% !important;
    position: absolute !important;
    top: 0px !important;
    object-fit: cover;
  }
</style>
