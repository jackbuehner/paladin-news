<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import ApplauseButton from '$lib/components/Button/ApplauseButton.svelte';
  import { share } from '$lib/components/article/share';
  import type { GET_ARTICLE_BY_SLUG__DOC_TYPE } from '$lib/queries';
  import { commentsOpen } from '$lib/stores/comments';
  import { notEmpty } from '$lib/utils';
  import type { PublishedDocWithDate } from '$lib/utils/insertDate';
  import { isVowel } from '$lib/utils/isVowel';
  import { variables } from '$lib/variables';
  import SocialButton from './_SocialButton.svelte';
  import Comments from './comments/Comments.svelte';

  export let article: PublishedDocWithDate<GET_ARTICLE_BY_SLUG__DOC_TYPE>;

  // keep track of window width
  $: windowWidth = 0;

  /**
   * Add claps to the article.
   *
   * Use this function to keep the database updated with the correct number of claps.
   */
  async function addClaps(newClaps: number) {
    if (newClaps === 0) return false;

    // create the mutation
    const mutation = `
      mutation ArticleAddApplause($_id: ObjectID!, $newClaps: Int!) {
        articleAddApplausePublic(_id: $_id, incClaps: $newClaps) {
          claps
        }
      }
    `;

    // configure the url and options
    const hostUrl = `${variables.SERVER_PROTOCOL}://${variables.SERVER_URL}`;
    var opts = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: mutation,
        variables: {
          _id: article._id,
          newClaps,
        },
      }),
    };

    // post the mutation
    return await fetch(`${hostUrl}/v3/paladin-news`, opts)
      .then(() => true)
      .catch(() => false);
  }
</script>

<svelte:window bind:innerWidth={windowWidth} />

<div class="article-footer article-footer--buttons">
  <!-- <ApplauseButton
    id={`article.${article._id}`}
    initialClaps={article.claps}
    onDebouncedChange={(claps, newClaps) => addClaps(newClaps)}
  /> -->

  {#if article.show_comments}
    <Button
      on:click={() => ($commentsOpen = true)}
      style={'flex-grow: 1; height: 36px; font-weight: 700; letter-spacing: 0.6px;' +
        (windowWidth <= 500 ? 'width: 100%; margin-top: -14px;' : '')}>READ ALL COMMENTS</Button
    >
  {:else}
    <div
      style={'flex-grow: 1; height: 36px; font-weight: 700; letter-spacing: 0.6px;' +
        (windowWidth <= 500 ? 'display: none' : '')}
    />
  {/if}
  <div class={'social-buttons'}>
    <SocialButton
      ariaLabel={'share on Facebook'}
      on:click={() =>
        share(
          'facebook',
          article.name,
          article.description,
          `https://thepaladin.news/${
            article.date
              ? `articles/${article.date.year}/${article.date.month}/${article.date.day}/${article.slug}`
              : `articles/${article.slug}`
          }`
        )}
    >
      <svg viewBox="0 0 7 15"
        ><path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M4.775 14.163V7.08h1.923l.255-2.441H4.775l.004-1.222c0-.636.06-.977.958-.977H6.94V0H5.016c-2.31 0-3.123 1.184-3.123 3.175V4.64H.453v2.44h1.44v7.083h2.882z"
          fill="currentColor"
        /></svg
      >
    </SocialButton>
    <SocialButton
      ariaLabel={'share on Twitter'}
      on:click={() =>
        share(
          'twitter',
          article.name,
          article.description,
          `https://thepaladin.news/${
            article.date
              ? `articles/${article.date.year}/${article.date.month}/${article.date.day}/${article.slug}`
              : `articles/${article.slug}`
          }`
        )}
    >
      <svg viewBox="0 0 24 24"
        ><path
          fill="currentColor"
          d="M22.46,6C21.69,6.35 20.86,6.58 20,6.69C20.88,6.16 21.56,5.32 21.88,4.31C21.05,4.81 20.13,5.16 19.16,5.36C18.37,4.5 17.26,4 16,4C13.65,4 11.73,5.92 11.73,8.29C11.73,8.63 11.77,8.96 11.84,9.27C8.28,9.09 5.11,7.38 3,4.79C2.63,5.42 2.42,6.16 2.42,6.94C2.42,8.43 3.17,9.75 4.33,10.5C3.62,10.5 2.96,10.3 2.38,10C2.38,10 2.38,10 2.38,10.03C2.38,12.11 3.86,13.85 5.82,14.24C5.46,14.34 5.08,14.39 4.69,14.39C4.42,14.39 4.15,14.36 3.89,14.31C4.43,16 6,17.26 7.89,17.29C6.43,18.45 4.58,19.13 2.56,19.13C2.22,19.13 1.88,19.11 1.54,19.07C3.44,20.29 5.7,21 8.12,21C16,21 20.33,14.46 20.33,8.79C20.33,8.6 20.33,8.42 20.32,8.23C21.16,7.63 21.88,6.87 22.46,6Z"
        /></svg
      >
    </SocialButton>
    <SocialButton
      ariaLabel={'share via Email'}
      on:click={() =>
        share(
          'email',
          article.name,
          article.description,
          `https://thepaladin.news/${
            article.date
              ? `articles/${article.date.year}/${article.date.month}/${article.date.day}/${article.slug}`
              : `articles/${article.slug}`
          }`
        )}
    >
      <svg viewBox="0 0 24 24"
        ><path
          fill="currentColor"
          d="M13 17H17V14L22 18.5L17 23V20H13V17M20 4H4A2 2 0 0 0 2 6V18A2 2 0 0 0 4 20H11.35A5.8 5.8 0 0 1 11 18A6 6 0 0 1 22 14.69V6A2 2 0 0 0 20 4M20 8L12 13L4 8V6L12 11L20 6Z"
        /></svg
      >
    </SocialButton>
    <SocialButton
      ariaLabel={'share on LinkedIn'}
      on:click={() =>
        share(
          'linkedin',
          article.name,
          article.description,
          `https://thepaladin.news/${
            article.date
              ? `articles/${article.date.year}/${article.date.month}/${article.date.day}/${article.slug}`
              : `articles/${article.slug}`
          }`
        )}
    >
      <svg viewBox="0 0 24 24"
        ><path
          fill="currentColor"
          d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M18.5 18.5V13.2A3.26 3.26 0 0 0 15.24 9.94C14.39 9.94 13.4 10.46 12.92 11.24V10.13H10.13V18.5H12.92V13.57C12.92 12.8 13.54 12.17 14.31 12.17A1.4 1.4 0 0 1 15.71 13.57V18.5H18.5M6.88 8.56A1.68 1.68 0 0 0 8.56 6.88C8.56 5.95 7.81 5.19 6.88 5.19A1.69 1.69 0 0 0 5.19 6.88C5.19 7.81 5.95 8.56 6.88 8.56M8.27 18.5V10.13H5.5V18.5H8.27Z"
        /></svg
      >
    </SocialButton>
  </div>
</div>

{#if article.show_comments}
  <Comments pageId={article.timestamps.published_at + '_' + article.slug} />
{/if}

<div class="article-footer article-footer--extra">
  <!-- <div class="note">Jack Buehner contributed reporting.</div> -->

  {#if article.tags}
    <div class="tags-group">
      <div>Tags:</div>
      <div class="tags">
        {#each article.tags as tag}
          <a href="/tags/{tag}">{tag}</a>
        {/each}
      </div>
    </div>
  {/if}

  {#if article?.people?.authors && article.people.authors.length > 0}
    <div class="author-bios">
      {#each article.people.authors.filter(notEmpty) as author}
        <div class="author-bio-wrapper">
          <div class="name">
            {author.name}
            {#if author.twitter}
              <a href="https://twitter.com/{author.twitter}">@{author.twitter}</a>
            {/if}
          </div>
          {#if author.biography}
            <div class="author-bio">{author.biography}</div>
          {:else if author.current_title}
            <div class="author-bio">
              {author.name.split(' ')[0]} is a{isVowel(author.current_title[0]) ? 'n' : ''}
              {author.current_title} for <i>The Paladin</i>.
            </div>
          {/if}
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .article-footer {
    max-width: 590px;
    margin: 32px auto;
    font-family: var(--font-detail);
    font-size: 16px;
    color: var(--color-neutral-dark);
  }

  .article-footer--buttons {
    display: flex;
    align-items: center;
    flex-direction: row;
    gap: 36px;
  }
  @media (max-width: 500px) {
    .article-footer--buttons {
      flex-direction: column;
      gap: 18px;
    }
  }

  .article-footer--extra {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  @media print {
    .article-footer {
      display: none;
    }
  }

  .social-buttons {
    display: flex;
    flex-direction: row;
    gap: 12px;
  }

  .tags-group {
    display: flex;
    flex-direction: row;
    gap: 6px;
  }
  .tags {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 6px;
  }

  a {
    color: rgb(var(--primary));
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

  .author-bio {
    margin-left: 40px;
    margin-bottom: 4px;
  }
</style>
