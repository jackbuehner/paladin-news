<script lang="ts">
  import Container from '$lib/components/Container.svelte';
  import { insertDate } from '$lib/utils';
  import type { PageData } from './$types';
  import About from './About.svelte';
  import Art from './Art.svelte';
  import EditorsChoiceItem from './EditorsChoiceItem.svelte';
  import Latest from './Latest.svelte';
  import Photos from './Photos.svelte';
  import Poetry from './Poetry.svelte';
  import PrintEdition from './PrintEdition.svelte';
  import Prose from './Prose.svelte';

  export let data: PageData;
</script>

<svelte:head>
  <title>The Echo – Furman University's Student Literary and Arts Magazine</title>
</svelte:head>

<Container width="800px">
  <div class="grid">
    <div>
      <section class="latest">
        <h1>latest</h1>
        <Latest latest={data.latest} />
      </section>
      <section class="choice-mobile">
        <h1>editor's choice</h1>
        {#each insertDate(data.choice) as { type, name, authored_by, date, slug }, index}
          <EditorsChoiceItem
            {type}
            {name}
            {authored_by}
            href="/magazine/{type}/{date.year}/{date.month}/{date.day}/{slug}"
          />
        {/each}
      </section>
      <section class="photos">
        <a href="/magazine/category/photography"><h1>photography</h1></a>
        <Photos photos={data.photos} />
      </section>
      <div class="dual">
        <div>
          <section class="prose">
            <a href="/magazine/category/prose"><h1>prose</h1></a>
            <Prose prose={data.prose} />
          </section>
          <section class="poetry noBorderBottom">
            <a href="/magazine/category/poetry"><h1>poetry</h1></a>
            <Poetry poems={data.poems} />
          </section>
        </div>
        <section class="art noBorderBottom">
          <a href="/magazine/category/studio-art"><h1>studio art</h1></a>
          <Art art={data.studioArt} />
        </section>
      </div>
    </div>
    <aside>
      <section class="choice">
        <h1>editor's choice</h1>
        {#each insertDate(data.choice) as { type, name, authored_by, date, slug }, index}
          <EditorsChoiceItem
            {type}
            {name}
            {authored_by}
            href="/magazine/{type}/{date.year}/{date.month}/{date.day}/{slug}"
          />
        {/each}
      </section>
      <section class="issue">
        <a href="/magazine/print-issues/latest"><h1>latest volume</h1></a>
        <PrintEdition />
      </section>
      <section class="about noBorderBottom">
        <h1>about</h1>
        <About />
      </section>
    </aside>
  </div>
</Container>

<style>
  .grid {
    display: grid;
    grid-template-columns: 1fr 250px;
    margin: 20px 0;
  }

  .dual {
    display: grid;
    grid-template-columns: 3fr 5fr;
    margin: 15px 0;
  }

  @media (min-width: 721px) {
    .dual > *:nth-child(2) {
      border-left: 1px solid var(--border-dark);
      margin: 0 0 0 15px;
      padding: 0 0 0 15px;
    }
  }

  @media (max-width: 720px) {
    .dual {
      grid-template-columns: 1fr;
      grid-template-rows: 1fr auto;
    }

    .dual > *:nth-child(2) {
      border-top: 1px solid var(--color-neutral-light);
    }

    .grid {
      grid-template-columns: 1fr 220px;
    }

    .grid aside h1 {
      font-size: 28px;
    }
  }

  @media (max-width: 520px) {
    .grid {
      grid-template-columns: 1fr;
      grid-template-rows: 1fr auto;
    }

    .grid section h1 {
      font-size: 28px;
    }

    .grid aside {
      border-left: none;
      margin-left: 0;
      padding-left: 0;
    }

    .grid aside .choice {
      display: none;
    }

    .grid aside .issue {
      border-top: 1px solid var(--color-neutral-light);
    }
  }

  @media (min-width: 521px) {
    section.choice-mobile {
      display: none;
    }
  }

  section h1 {
    font-family: var(--echo-font-heading);
    font-size: 34px;
    font-weight: 700;
    margin: 0 0 6px 0;
  }

  section {
    border-bottom: 1px solid var(--color-neutral-light);
    padding: 12px 0 6px 0;
  }

  section.noBorderBottom {
    border-bottom: none;
  }

  section:first-child {
    padding-top: 0;
  }

  aside {
    border-left: 1px solid var(--border-dark);
    margin: 0 0 0 15px;
    padding: 0 0 0 15px;
  }

  a {
    color: var(--color-neutral-dark);
    text-decoration: none;
    transition:
      background-color 0.2s,
      box-shadow 0.1s;
    display: inline-block;
    font-family: var(--font-detail);
    font-size: 16px;
  }
  a:hover {
    color: rgb(var(--primary));
    background-color: rgba(var(--primary), 0.1);
    box-shadow: 0 2px 0 0 rgb(var(--primary));
  }
  a:active {
    background-color: rgba(var(--primary), 0.16);
  }
</style>
