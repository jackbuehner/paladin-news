<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import Container from '$lib/components/Container.svelte';
  import ArticleCard from '$lib/components/home/ArticleCard.svelte';
  import ArticleHomeRow from '$lib/components/home/ArticleHomeRow.svelte';
  import SatireRow from '$lib/components/home/SatireRow.svelte';
  import VideoCard from '$lib/components/Video/VideoCard.svelte';
  import { formatISODate, insertDate } from '$lib/utils';
  import type { PageData } from './$types';

  // receive the data from the page endpoint
  export let data: PageData;

  let windowWidth: number = 1200;
</script>

<svelte:head>
  <title>The Paladin</title>
</svelte:head>

<svelte:window bind:innerWidth={windowWidth} />

<div class={'wrapper'}>
  <Container>
    <div class={'grid'}>
      <section class={'col-left'} style="grid-area: c0">
        <div class="section-inner">
          <h2><a href="/section/news">News</a></h2>
          {#each insertDate(data.news || []) as { name, slug, date, timestamps, photo_path }, index}
            {@const showPhoto = windowWidth <= 600 ? index === 0 : index < 2}
            <div class="side-col-item" class:padTop={index === 1}>
              <ArticleCard
                {name}
                href={`/articles/${date.year}/${date.month}/${date.day}/${slug}`}
                date={timestamps.published_at}
                photo={showPhoto ? photo_path : undefined}
                isSmallerHeadline
                lazyLoad={false}
                defaultPhotoSrcWidth={220}
              />
            </div>
          {/each}
        </div>
      </section>
      <section style="grid-area: c1">
        <div class="section-inner">
          <h2>Featured</h2>
          <div class="featured">
            {#each insertDate(data?.featured || []) as { name, slug, date, timestamps, photo_path, description, categories }, index}
              {#if index < 3}
                <div style={`grid-area: c${index}`} class={index > 0 ? 'hide-mobile' : undefined}>
                  <ArticleCard
                    {name}
                    {categories}
                    href={`/articles/${date.year}/${date.month}/${date.day}/${slug}`}
                    date={timestamps.published_at}
                    photo={photo_path}
                    description={index === 0 || (index > 0 && windowWidth <= 960)
                      ? description
                      : undefined}
                    isLargerHeadline={index === 0}
                    isSmallerHeadline={index > 0}
                    isCompact={index > 0 && windowWidth <= 960}
                    isOpinion={categories.some(
                      (cat) => cat === 'opinion' || cat === 'campus' || cat === 'campus-culture'
                    )}
                    lazyLoad={false}
                    defaultPhotoSrcWidth={index === 0 ? 570 : 280}
                  />
                </div>
                {#if index > 0}
                  <div style={`grid-area: c${index}`} class="hide-desktop">
                    <ArticleCard
                      {name}
                      {categories}
                      href={`/articles/${date.year}/${date.month}/${date.day}/${slug}`}
                      date={timestamps.published_at}
                      photo={photo_path}
                      {description}
                      isSmallerHeadline
                      isCompact
                      isOpinion={categories.some(
                        (cat) => cat === 'opinion' || cat === 'campus' || cat === 'campus-culture'
                      )}
                      lazyLoad={false}
                      defaultPhotoSrcWidth={100}
                    />
                  </div>
                {/if}
              {/if}
            {/each}
          </div>
        </div>
      </section>
      <section class="col-right" style="grid-area: c2">
        <div class="section-inner">
          <h2><a href="/section/opinions">Opinions</a></h2>
          {#each insertDate(data?.opinion || []) as { name, slug, date, people }}
            <div class="side-col-item">
              <ArticleCard
                {name}
                href={`/articles/${date.year}/${date.month}/${date.day}/${slug}`}
                authors={people.authors}
                isSmallerHeadline
                isOpinion
              />
            </div>
          {/each}
          <h2><a href="/section/video">Video</a></h2>
          {#if data?.videos?.[0]}
            <VideoCard
              name={data.videos[0].name}
              thumbnail={(() => {
                const url = new URL(data.videos[0].video_url);
                const videoId = url.searchParams.get('v');
                if (videoId) return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                return '';
              })()}
              h={3}
              href={`/section/video/${data.videos[0]._id}`}
              lazyLoad={false}
              defaultPhotoSrcWidth={360}
            />
          {/if}
          <p class="line">
            <a href={`/section/video`}>
              View more videos <span style={`font-weight: 700;`}>⇒</span>
            </a>
          </p>
          <h2><a href="/games">Games</a></h2>
          <div style="margin-bottom: 6px;">
            <a href={`/games/sudoku/today`}>Play today's Sudoku</a>
          </div>
          <div>
            <a href={`/games/crossword/all`}>Play the latest crossword</a>
          </div>
        </div>
      </section>
    </div>
    <div class={'grid'}>
      <section class={'col-left'} style="grid-area: c0">
        <div class="section-inner">
          <h2><a href="/section/sports">Sports</a></h2>
          {#each insertDate(data?.sports || []) as { name, slug, date, timestamps, photo_path, categories }, index}
            {@const showPhoto = windowWidth <= 600 ? index === 0 : index < 2}
            <div class="side-col-item" class:padTop={index === 1}>
              <ArticleCard
                {name}
                href={`/articles/${date.year}/${date.month}/${date.day}/${slug}`}
                date={timestamps.published_at}
                photo={showPhoto ? photo_path : undefined}
                isSmallerHeadline
                isOpinion={categories.some(
                  (cat) => cat === 'opinion' || cat === 'campus' || cat === 'campus-culture'
                )}
              />
            </div>
          {/each}
        </div>
      </section>
      <section style="grid-area: c1">
        <div class="section-inner">
          <h2>
            <a href="/section/arts">Arts</a>,
            <a href="/section/campus-culture">Campus, &amp; Culture</a>
          </h2>
          <div class="featured">
            {#each insertDate(data?.acc || []) as { name, slug, date, timestamps, photo_path, description, categories }, index}
              {#if index < 3}
                <ArticleCard
                  {name}
                  {categories}
                  href={`/articles/${date.year}/${date.month}/${date.day}/${slug}`}
                  date={timestamps.published_at}
                  photo={photo_path}
                  description={index === 0 || (index > 0 && windowWidth <= 960)
                    ? description
                    : undefined}
                  style={`grid-area: c${index}`}
                  isLargerHeadline={index === 0}
                  isSmallerHeadline={index > 0}
                  isCompact={index > 0 && windowWidth <= 960}
                  isOpinion={categories.some(
                    (cat) => cat === 'opinion' || cat === 'campus' || cat === 'campus-culture'
                  )}
                />
              {/if}
            {/each}
          </div>
        </div>
      </section>
      <section class="col-right" style="grid-area: c2">
        <div class="section-inner">
          <h2><a href="/section/diversity-matters">Diversity Matters</a></h2>
          {#each insertDate(data?.diversity || []) as { name, slug, date, timestamps, categories }}
            <div class="side-col-item">
              <ArticleCard
                {name}
                href={`/articles/${date.year}/${date.month}/${date.day}/${slug}`}
                date={timestamps.published_at}
                isSmallerHeadline
                isOpinion={categories.some(
                  (cat) => cat === 'opinion' || cat === 'campus' || cat === 'campus-culture'
                )}
              />
            </div>
          {/each}
          <h2>Crime Briefs</h2>
          {#each data?.crimeincidents || [] as brief}
            <div class="side-col-item">
              <h3 class="brief-name">{brief.name}</h3>
              <div class="brief-location">
                {brief.location} | {formatISODate(brief.reported_at)}
              </div>
            </div>
          {/each}
          <h2><a href="/podcasts">Podcasts</a> &amp; <a href="/newsletters">Newsletters</a></h2>
          <div class={'group'}>
            <img
              src="https://ik.imagekit.io/paladin/sunday-summary_logo_banner_background.svg"
              alt="Sunday Summary"
              loading="lazy"
              width="306.72"
              height="103"
              style="width: 100%;"
            />
            <div class="desc">
              A newsletter discussing the top articles of the week. Subscribe to recieve it in your
              inbox every Sunday.
            </div>
            <Button width="100%" href="/newsletters">Subscribe</Button>
          </div>
          <p style="margin-bottom: 6px;">
            <a href="/newsletters">
              View all newsletters <span style={`font-weight: 700;`}>⇒</span>
            </a>
          </p>
          <p style="margin-top: 0;">
            <a href="/podcasts">
              View all podcasts <span style={`font-weight: 700;`}>⇒</span>
            </a>
          </p>
        </div>
      </section>
    </div>
    <SatireRow satires={data.satires}>
      <h2><a href="/the-horse">The Horse (Satire)</a></h2>
    </SatireRow>
    <ArticleHomeRow articles={data.articles} />
    <a href="/all-articles">View all articles</a>
  </Container>
</div>

<style>
  h2 {
    margin: 0;
    --padding-top: 0;
    padding: var(--padding-top) 0 10px 0;
    font-family: var(--font-detail);
    font-size: 18px;
    line-height: 18px;
    letter-spacing: 0.17px;
  }
  @media (max-width: 600px) {
    h2 {
      --padding-top: 12px;
    }
  }

  h2:not(:first-of-type) {
    border-top: 1px solid var(--color-neutral-light);
    padding-top: 12px;
  }

  section {
    position: relative;
    padding-bottom: 12px;
  }
  @media (max-width: 600px) {
    section {
      padding-bottom: 0;
    }
  }

  .section-inner {
    height: 100%;
    border-bottom: 1px solid var(--color-neutral-light);
    padding-bottom: 12px;
  }

  @media (min-width: 601px) {
    .grid:nth-of-type(2) .section-inner {
      border-bottom: none;
    }
  }

  @media (max-width: 600px) {
    .hide-mobile {
      display: none;
    }
  }
  @media (min-width: 601px) {
    .hide-desktop {
      display: none;
    }
  }

  .wrapper {
    position: relative;
    background-color: white;
    padding: 20px 0;
  }

  .grid {
    display: grid;
    grid-template-columns: 7fr 17fr 11fr;
    grid-template-areas: 'c0 c1 c2';
    gap: 15px;
  }
  @media (max-width: 960px) {
    .grid {
      grid-template-columns: 9fr 15fr 11fr;
    }
  }
  @media (max-width: 840px) {
    .grid {
      grid-template-columns: 11fr 13fr 11fr;
    }
  }
  @media (max-width: 760px) {
    .grid {
      grid-template-columns: 1fr 1fr;
      grid-template-rows: auto auto;
      grid-template-areas:
        'c1 c1'
        'c0 c2';
    }
  }
  @media (max-width: 600px) {
    .grid {
      grid-template-columns: 1fr;
      grid-template-rows: auto auto auto;
      grid-template-areas:
        'c1'
        'c0'
        'c2';
      gap: 0;
    }
  }

  .col-left {
    padding-right: 15px;
    border-right: 1px solid var(--border-dark);
  }

  .col-right {
    padding-left: 15px;
    border-left: 1px solid var(--border-dark);
  }
  @media (max-width: 760px) {
    .col-left {
      padding-right: 0;
      border-right: none;
    }
    .col-right {
      padding-left: 0;
      border-left: none;
    }
  }

  .side-col-item {
    border-top: 1px solid var(--border-dark);
  }
  .side-col-item:not(:last-of-type) {
    padding: 0 0 12px 0;
  }
  .side-col-item.padTop {
    padding-top: 12px;
  }

  .featured {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto;
    grid-template-areas:
      'c0 c0'
      'c1 c2';
    gap: 15px;
  }
  @media (max-width: 960px) {
    .featured {
      grid-template-columns: 1fr;
      grid-template-rows: auto auto auto;
      grid-template-areas:
        'c0'
        'c1'
        'c2';
    }
  }
  @media (max-width: 760px) {
    .featured {
      grid-template-columns: 1fr 1fr;
      grid-template-rows: auto auto;
      grid-template-areas:
        'c0 c1'
        'c0 c2';
    }
  }
  @media (max-width: 600px) {
    .featured {
      grid-template-columns: 1fr;
      grid-template-rows: auto auto auto;
      grid-template-areas:
        'c0'
        'c1'
        'c2';
    }
    .featured > :global(:where(div, a):not(:first-of-type)) {
      border-top: 1px solid var(--border-dark);
      padding: 12px 0 0 0;
    }
  }

  a {
    font-family: var(--font-detail);
    color: var(--color-neutral-dark);
    box-shadow: 0 0.5px 0 0 var(--color-neutral-lightest);
    text-decoration: none;
    transition: background-color 0.2s, box-shadow 0.1s;
  }
  a:hover {
    color: rgb(var(--primary));
    background-color: rgba(var(--primary), 0.1);
    box-shadow: 0 2px 0 0 rgb(var(--primary));
  }
  a:active {
    background-color: rgba(var(--primary), 0.16);
  }

  h2 a {
    box-shadow: none;
  }

  p.line {
    margin: 12px 0;
    text-align: right;
  }

  .group {
    border: 1px solid var(--border-dark);
    border-radius: var(--radius);
    padding: 20px;
    flex: 1;
  }

  .desc {
    margin-top: 10px;
    padding-bottom: 10px;
    font-family: var(--font-detail);
    color: var(--color-neutral-dark);
    font-size: 16px;
    line-height: 20px;
    font-style: normal;
    text-align: center;
  }

  .brief-name {
    margin-top: 8px;
    margin-bottom: 0;
    font-family: var(--font-detail);
    font-size: 16px;
    font-weight: 600;
    line-height: 1.3;
  }

  .brief-location {
    margin-top: 2px;
    margin-bottom: -4px;
    font-family: var(--font-detail);
    font-size: 14px;
    font-weight: 400;
    line-height: 1.3;
  }
</style>
