<script lang="ts">
  import { notEmpty } from '$lib/utils';
  import { romanize } from 'romans';
  import {
    Advertisement,
    CoverPage,
    FeaturedArticle,
    Footer,
    InfoLine,
    Masthead,
    MoreArticles,
    UpcomingEvents,
    type Flusher,
  } from '.';
  import type { FlusherEvent } from './types';

  export let flusher: Flusher;

  $: events = flusher.events.filter((event): event is FlusherEvent => !!event);
  $: isTheRoyalFlush = new Date(flusher?.timestamps.week) < new Date('2022-04-20');
</script>

{#if flusher}
  <!-- cover page -->
  <CoverPage
    _id={flusher._id}
    name={isTheRoyalFlush
      ? `The Royal Flush – Vol. ${romanize(flusher.volume)}, Iss. ${flusher.issue}`
      : `The Flusher – Vol. ${romanize(flusher.volume)}, Iss. ${flusher.issue}`}
    week={flusher.timestamps.week}
    authors={Array.from(
      new Set(flusher.people.contributors.map((p) => p?.replace(' (Provisional)', '')))
    )}
    managingEditors={[`Jack Buehner`]}
    volume={flusher.volume}
    issue={flusher.issue}
  />
{/if}

<div class={'background'}>
  <div class={'page'}>
    <article>
      <Masthead week={flusher.timestamps.week} />
      <InfoLine {flusher} />
      <UpcomingEvents {events} />
      <Advertisement src={flusher.leftAdvertPhoto} />
      {#if flusher.articles.featured}
        <FeaturedArticle
          categories={flusher.articles.featured.categories}
          authors={flusher.articles.featured.authors}
          body={flusher.articles.featured.body}
          headline={flusher.articles.featured.name}
          photo={flusher.articles.featured.photo}
        />
      {/if}
      <MoreArticles articles={flusher.articles.more.filter(notEmpty)} />
      <Footer />
    </article>
  </div>
</div>

<style>
  div.background {
    background-color: #fafafa;
    padding: 20px 0;
    margin-bottom: -20px;
  }

  div.page {
    box-shadow: inset 0 0 0 0.01in #e0e0e0;
    width: 8.5in;
    height: 11in;
    box-sizing: border-box;
    margin: 0 auto;
    padding: 0.25in 0.2in 0.2in 0.2in;
    overflow: hidden;
    background-color: white;
  }

  article {
    width: 8.1in;
    height: 10.55in;
    overflow: hidden;

    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 0.2in;
    grid-template-rows: 0.75in 0.34in 6.57in 0.24in 2.11in 0.54in;
    grid-template-areas:
      'masthead masthead'
      'infoline infoline'
      'events   article'
      'events   more-articles'
      'advert   more-articles'
      'advert   footer';
  }

  @media print {
    div.background {
      margin: 0;
      padding: 0;
    }

    div.page {
      margin: 0;
      box-shadow: none;
    }
  }

  @page {
    size: letter portrait;
    margin: 0;
  }
</style>
