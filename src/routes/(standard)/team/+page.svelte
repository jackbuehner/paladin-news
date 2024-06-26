<script lang="ts">
  import Container from '$lib/components/Container.svelte';
  import PageHeading from '$lib/components/PageHeading.svelte';
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<svelte:head>
  <title>Our team – The Paladin</title>
</svelte:head>

<PageHeading>Team</PageHeading>

<Container>
  <div class={'wrapper'}>
    <div>
      <p>
        <i>The Paladin</i> is the product of countless hours of work by students at Furman University.
        Below are some of the people currently invloved.
      </p>

      {#if data.board && data.board.length > 0}
        <h2>The Board</h2>
        <section>
          {#each data.board as profile}
            <a href={`/profile/${profile.slug}`} class={'card'}>
              <div class="img-wrapper">
                <img src={profile.photo} alt={''} />
              </div>
              <div class={'name'}>{profile.name.replace(' (Provisional)', '')}</div>
              <div class={'title'}>{profile.current_title}</div>
            </a>
          {/each}
        </section>
      {/if}

      {#if data.managers && data.managers.length > 0}
        <h2>Directors, managers, and assistant editors</h2>
        <section>
          {#each data.managers as profile}
            <a href={`/profile/${profile.slug}`} class={'card'}>
              <div class="img-wrapper">
                <img src={profile.photo} alt={''} />
              </div>
              <div class={'name'}>{profile.name.replace(' (Provisional)', '')}</div>
              <div class={'title'}>{profile.current_title}</div>
            </a>
          {/each}
        </section>
      {/if}

      {#if data.copy && data.copy.length > 0}
        <h2>Copy editors</h2>
        <section>
          {#each data.copy as profile}
            <a href={`/profile/${profile.slug}`} class={'card'}>
              <div class="img-wrapper">
                <img src={profile.photo} alt={''} />
              </div>
              <div class={'name'}>{profile.name.replace(' (Provisional)', '')}</div>
              <div class={'title'}>{profile.current_title}</div>
            </a>
          {/each}
        </section>
      {/if}

      {#if data.photoVideo && data.photoVideo.length > 0}
        <h2>Photo and video</h2>
        <section>
          {#each data.photoVideo as profile}
            <a href={`/profile/${profile.slug}`} class={'card'}>
              <div class="img-wrapper">
                <img src={profile.photo} alt={''} />
              </div>
              <div class={'name'}>{profile.name.replace(' (Provisional)', '')}</div>
              <div class={'title'}>{profile.current_title}</div>
            </a>
          {/each}
        </section>
      {/if}
    </div>
    <aside class={'sidebar'}>
      <h2>More team members</h2>
      <div><a href={'/team/writers'}>View all writers and contributors</a></div>
      <div><a href={'/team/all'}>View all past and present members</a></div>
      <h2>About <i>The Paladin</i></h2>
      <div><a href={'/about'}>Who we are</a></div>
      <h2>Social media</h2>
      <div><a href={'https://twitter.com/thepaladin_news'}>Twitter</a></div>
      <div><a href={'https://www.facebook.com/thepaladin.news'}>Facebook</a></div>
      <div><a href={'https://instagram.com/thepaladin.news'}>Instagram</a></div>
      <div><a href={'https://www.linkedin.com/company/thepaladin/'}>Linkedin</a></div>
    </aside>
  </div>
</Container>

<style>
  div {
    font-size: 17px;
    font-family: var(--font-detail);
    line-height: 1.7;
    font-weight: 400;
    color: var(--color-neutral-dark);
  }
  .wrapper {
    display: flex;
    flex-direction: row;
    gap: 32px;
  }
  .sidebar {
    width: 360px;
    flex-grow: 0;
    flex-shrink: 0;
  }
  @media (max-width: 990px) {
    .wrapper {
      flex-direction: column;
    }
    .sidebar {
      width: 100%;
    }
  }

  a {
    color: rgb(var(--primary-lighter));
    box-shadow: 0 1px 0 0 rgb(var(--primary));
    transition:
      background-color 0.2s,
      box-shadow 0.1s,
      color 0.2s;
    text-decoration: none;
  }
  a:hover {
    box-shadow: 0 2px 0 0 rgb(var(--primary));
    background-color: rgba(var(--primary), 0.1);
    color: var(--color-neutral-dark);
  }
  a:active {
    background-color: rgba(var(--primary), 0.16);
  }
  h2 {
    font-size: 26px;
    margin: 28px 0 14px 0;
    line-height: 32px;
  }
  @media (max-width: 560px) {
    h2 {
      font-size: 22px;
      margin: 28px 0 14px 0;
      line-height: 32px;
    }
  }
  aside h2 {
    font-size: 22px;
    margin: 20px 0 0 0;
  }
  aside h2:first-of-type {
    margin-top: 0;
  }

  section {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    grid-template-rows: auto;
    gap: 16px;
  }
  @media (max-width: 560px) {
    section {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
  .card {
    width: 100%;
    box-shadow: none;
  }

  .img-wrapper {
    background-color: #00000024;
    position: relative;
    width: 100%;
    padding-top: 100%;
  }

  .img-wrapper img {
    width: 100%;
    border-radius: var(--radius);
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }

  .card .name {
    font-family: var(--font-detail);
    color: var(--color-neutral-dark);
    font-size: 20px;
    line-height: 28px;
    font-weight: 700;
  }
  .card .title {
    font-family: var(--font-detail);
    color: var(--color-neutral-light);
    font-size: 14px;
    line-height: 20px;
  }
  @media (max-width: 560px) {
    .card .name {
      font-size: 18px;
      line-height: 24px;
    }
    .card .title {
      font-size: 13px;
      line-height: 17px;
    }
  }
</style>
