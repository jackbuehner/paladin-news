<script lang="ts">
  import Container from '$lib/components/Container.svelte';
  import ThePaladinLogo from '$lib/components/svgs/ThePaladinLogo.svelte';

  export let bottomOnly: boolean = false;
</script>

{#if bottomOnly !== true}
  <div class={'top'}>
    <Container>
      <div class={'content'}>
        <ThePaladinLogo width={160} height={54} />
        <div class={'grid'}>
          <div>
            <div class={'header'}>Sections</div>
            <a href={'/section/news'}>News</a>
            <a href={'/section/opinions'}>Opinions</a>
            <a href={'/section/sports'}>Sports</a>
            <a href={'/section/diversity-matters'}>Diversity Matters</a>
            <a href={'/section/arts-culture'}>Arts, Campus, & Culture</a>
            <a href={'/all-articles'}>All articles</a>
          </div>
          <div>
            <div class={'header'}>More</div>
            <a href={'/satire'}>The Horse – Satire</a>
            <a href={'/magazine'}>The Echo – Magazine</a>
            <a href={'/flusher'}>The Flusher</a>
            <a href={'/games'}>Games</a>
            <a href={'/section/video'}>Videos</a>
            <a href={'/newsletters'}>Newsletters</a>
            <a href={'/podcasts'}>Podcasts</a>
            <a href={'/graphs/covid-19'}>Graphs</a>
            <a href={'/'}>Home</a>
          </div>
          <div>
            <div class={'header'}>About us</div>
            <a href={'/about'}>Who we are</a>
            <a href={'/team'}>Our team</a>
            <a href={'/jobs'}>Jobs</a>
            <a href={'/contact'}>Contact us</a>
            <a href={'/privacy-policy'}>Privacy policy</a>
          </div>
          <div>
            <div class={'header'}>Support us</div>
            <a href={'https://app.mobilecause.com/vf/DinsDonate/team/PaladinNewspaper'}>Donate</a>
            <a href={'/contact'}>Tip us</a>
            <a href={'/contact'}>Advertise</a>
          </div>
        </div>
      </div>
    </Container>
  </div>
{/if}

<div class={'bottom'} class:bottomOnly>
  <Container>
    <div class={'content'}>
      <div><b>The Paladin Network</b> ⋅ 3300 Poinsett Highway ⋅ Greenville, SC 29613</div>
      <div style={'font-size: 14px;'}>
        Copyright © {new Date().getFullYear()}. All rights reserved.
      </div>
    </div>
  </Container>
</div>

<style>
  .top {
    background-color: #f4f4f4;
    padding-top: 20px;
    padding-bottom: 20px;
    border-top: 1px #ccc;
    margin-top: 20px;
  }
  .top .content {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .top .grid {
    display: grid;
    gap: 16px;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: auto;
  }
  @media (max-width: 760px) {
    .top .grid {
      grid-template-columns: 1fr 1fr;
      grid-template-rows: auto auto;
    }
  }
  @media (max-width: 560px) {
    .top .grid {
      grid-template-columns: 1fr;
      grid-template-rows: auto auto auto auto;
    }
  }

  .header {
    margin-top: 10px;
    margin-bottom: 10px;
    font-family: var(--font-detail);
    color: #444;
    font-size: 16px;
    line-height: 22px;
    font-weight: 700;
    letter-spacing: 0.4px;
    text-transform: uppercase;
  }
  a {
    margin-top: 4px;
    margin-bottom: 4px;
    font-family: var(--font-detail);
    color: #444;
    font-size: 16px;
    line-height: 21px;
    text-decoration: none;
    display: block;
  }
  a:hover {
    text-decoration: underline;
  }

  .bottom {
    background-color: #efefef;
    font-family: var(--font-detail);
    font-size: 16px;
  }

  .bottom.bottomOnly {
    background-color: #f4f4f4;
  }
  .bottom .content {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin: 10px 0;
    align-items: center;
    color: #444;
    text-align: center;
  }
  /* hide when printing */
  @media print {
    .top,
    .bottom {
      display: none;
    }
  }
</style>
