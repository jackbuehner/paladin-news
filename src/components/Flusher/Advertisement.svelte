<script lang="ts">
  export let src: string | undefined;
</script>

<section>
  {#if src}
    <img {src} alt={``} />
  {:else}
    <h2>YOUR ADVERTISEMENT HERE</h2>
    <div>3.95” x 2.65”<br /><br /></div>
    <div><i>Contact us: ads.manager@thepaladin.news</i></div>
  {/if}
</section>

<style>
  section {
    box-shadow: inset 0 0 0 0.02in black;
    width: 3.95in;
    height: 2.65in;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: black;
    grid-area: advert;
  }

  img {
    box-shadow: inset 0 0 0 0.02in black;
    width: calc(100% - 0.04in);
    height: calc(100% - 0.04in);
    position: absolute;
    top: 0.02in;
    object-fit: cover;
  }

  h2 {
    font-family: Lato;
    font-style: normal;
    font-weight: normal;
    font-size: 14pt;
    letter-spacing: 0.3pt;
    line-height: 1.58;
  }

  div {
    font-family: Lato;
    font-style: normal;
    font-weight: normal;
    font-size: 10pt;
    line-height: 1.58;
  }
</style>
