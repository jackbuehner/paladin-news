<script lang="ts">
  import Container from '$lib/components/Container.svelte';
  import PageHeading from '$lib/components/PageHeading.svelte';
  import type { PageData } from './$types';

  export let data: PageData;
  $: profiles = data.docs;
</script>

<svelte:head>
  <title>All current and former – The Paladin</title>
</svelte:head>

<PageHeading>All current and former</PageHeading>

<Container>
  <div class={'wrapper'}>
    <div>
      {#if profiles && profiles.length > 0}
        <section>
          {#each profiles as profile}
            <a href={`/profile/${profile.slug}`} class={'card'}>
              <img src={profile.photo} alt={''} />
              <div class={'name'}>{profile.name.replace(' (Provisional)', '')}</div>
              <div class={'title'}>{profile.current_title}</div>
            </a>
          {/each}
        </section>
      {/if}
    </div>
    <aside class={'sidebar'}>
      <h2>More team members</h2>
      <div><a href={'/team'}>Current members of The Board</a></div>
      <div><a href={'/team/writers'}>Writers and contributors</a></div>
      <div><a href={'/team'}>Managers, assistant editors, and copy editors</a></div>
      <div><a href={'/team'}>Photo and video team members</a></div>
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
  img {
    width: 100%;
    border-radius: var(--radius);
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
