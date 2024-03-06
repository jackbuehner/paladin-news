<script lang="ts">
  import { SectionHeading } from '.';

  export let articles: Array<{ name: string; _id: string; slug?: string }>;
</script>

<section>
  <SectionHeading>More from The Paladin</SectionHeading>
  <div>Read them at <a href={`https://thepaladin.news/flusher`}>thepaladin.news/flusher</a></div>
  <ol>
    {#each articles as article}
      <li>
        <h3>
          {#if article.slug}
            <a href={`https://thepaladin.news/permalink/articles/${article._id}`}>{article.name}</a>
          {:else}
            <span style="cursor: not-allowed;">{article.name}</span>
          {/if}
        </h3>
      </li>
    {/each}
  </ol>
</section>

<style>
  section {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    justify-content: flex-start;
    grid-area: more-articles;
  }

  div {
    font-family: Lato;
    font-size: 9pt;
    font-style: italic;
    font-weight: normal;
    margin-top: -0.06in;
  }

  ol {
    margin: 0.1in 0px;
    padding-inline-start: 12pt;
    font-family: 'Adamant BG';
    font-size: 11pt;
    font-weight: normal;
  }

  li {
    font-family: 'Adamant BG';
    font-size: 11pt;
    font-weight: normal;
  }

  h3 {
    margin: 0px 0px 6pt;
    font-size: 11pt;
    font-weight: normal;
  }

  a {
    text-decoration: none;
    color: inherit;
    transition: background-color 0.2s, box-shadow 0.1s, color 0.2s;
  }

  a:hover {
    box-shadow: 0 2px 0 0 rgb(var(--primary));
    background-color: rgba(var(--primary), 0.1);
    color: var(--color-neutral-dark);
  }
</style>
