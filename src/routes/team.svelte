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
    transition: background-color 0.2s, box-shadow 0.1s, color 0.2s;
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

<script context="module" lang="ts">
  import type { LoadInput, LoadOutput } from '@sveltejs/kit';
  import type { IProfile } from '../interfaces/profiles';

  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load({ page, fetch }: LoadInput): Promise<LoadOutput> {
    const pageNumber = page.query.get('page') || '1';
    const url = `/team-${pageNumber}.json`;
    const res = await fetch(url);

    // set the document title
    title.set('Our team');

    if (res.ok) {
      return {
        props: {
          profiles: await res.json(),
        },
      };
    }

    return {
      status: res.status,
      error: new Error(`Could not load ${url}`),
    };
  }
</script>

<script lang="ts">
  import PageHeading from '/src/components/PageHeading.svelte';
  import Container from '/src/components/Container.svelte';
  import { title } from '../stores/title';

  export let profiles: IProfile[];

  const boardProfiles = profiles.filter((profile) => profile.group >= 1 && profile.group < 2);
  const managerProfiles = profiles.filter((profile) => profile.group >= 2 && profile.group < 3);
  const photoVideoSocialProfiles = profiles.filter(
    (profile) => profile.group >= 3 && profile.group < 4
  );
</script>

<PageHeading>Team</PageHeading>

<Container>
  <div class={'wrapper'}>
    <div>
      <p>
        <i>The Paladin</i> is the product of countless hours of work by students at Furman University.
        Below are some of the people currently invloved.
      </p>

      {#if boardProfiles && boardProfiles.length > 0}
        <h2>The Board</h2>
        <section>
          {#each boardProfiles as profile}
            <a href={`/profile/${profile.slug}`} class={'card'}>
              <img src={profile.photo} alt={''} />
              <div class={'name'}>{profile.name.replace(' (Provisional)', '')}</div>
              <div class={'title'}>{profile.current_title}</div>
            </a>
          {/each}
        </section>
      {/if}

      {#if managerProfiles && managerProfiles.length > 0}
        <h2>Managers, assistant editors, and copy editors</h2>
        <section>
          {#each managerProfiles as profile}
            <a href={`/profile/${profile.slug}`} class={'card'}>
              <img src={profile.photo} alt={''} />
              <div class={'name'}>{profile.name.replace(' (Provisional)', '')}</div>
              <div class={'title'}>{profile.current_title}</div>
            </a>
          {/each}
        </section>
      {/if}

      {#if photoVideoSocialProfiles && photoVideoSocialProfiles.length > 0}
        <h2>Photo and video</h2>
        <section>
          {#each photoVideoSocialProfiles as profile}
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
