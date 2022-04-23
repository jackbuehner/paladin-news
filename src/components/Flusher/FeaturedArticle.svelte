<script lang="ts">
  import Renderer from '@cristata/prosemirror-to-html-js';
  const renderer = new Renderer.Renderer();

  export let categories: string[];
  export let headline: string;
  export let photo: string | undefined;
  export let authors: string[];
  export let body: string;

  $: displayCategories = categories.map((cat) => {
    if (cat === 'opinions') return 'opinion';
    if (cat === 'diversity') return 'diversity matters';
    if (cat === 'campus-culture') return 'campus & culture';
    if (cat === 'arts-culture') return 'arts & culture';
    return cat;
  });

  // if the body is not html, convert json to html (check with closing p tag)
  $: {
    if (!body.includes('</p>')) {
      body = renderer.render({
        type: 'doc',
        content: JSON.parse(body),
      });
    }
  }

  function createByline(arr: string[]) {
    if (arr.length < 3) {
      return 'By ' + arr.join(' and ');
    }
    return `By ${arr.slice(0, -1).join(', ')}, and ${arr[arr.length - 1]}`;
  }

  $: byline = createByline(authors);
</script>

<section>
  <div class={'categories'}>
    <span
      ><a href={`https://thepaladin.news/section/${categories[0]}`}>{displayCategories[0]}</a></span
    >
  </div>
  <h3>{headline}</h3>
  <div class={'byline'}>
    <span>{byline}</span>
  </div>
  <article class={'flusher-article'}>
    <div class={'float'}>
      <div class={'photo-wrapper'}>
        <img src={photo || ''} alt={''} />
      </div>
      <div class={'continued'}>
        Full article at <i
          ><a href={'https://thepaladin.news/flusher'}>thepaladin.news/flusher</a></i
        >
      </div>
    </div>
    {@html body}
  </article>
</section>

<style>
  section {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    justify-content: flex-start;
    grid-area: article;
  }

  div.categories {
    display: flex;
    gap: 0.021in 0.104in;
    margin-bottom: 0.052in;
    margin-top: 0.292in;
    flex-wrap: wrap;
    flex-grow: 0;
    flex-shrink: 0;
  }

  div.categories > span {
    font-family: Lato, sans-serif;
    color: rgb(51, 51, 51);
    font-size: 7.5pt;
    line-height: 7.5pt;
    text-align: justify;
    letter-spacing: 2.25pt;
    text-transform: uppercase;
    cursor: default;
  }

  div.categories > span:not(:last-of-type) {
    padding-right: 0.052in;
    border-right: 1pt solid rgb(204, 204, 204);
  }

  h3 {
    margin-top: 0px;
    margin-bottom: 0px;
    align-self: flex-start;
    font-family: 'Adamant BG', Georgia, sans-serif;
    font-size: 16.5pt;
    line-height: 20pt;
    font-style: normal;
    font-weight: 700;
    letter-spacing: -0.5pt;
    cursor: default;
    -webkit-box-flex: 0;
    flex-grow: 0;
    flex-shrink: 0;
  }

  div.byline {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    align-items: flex-start;
    align-self: center;
    flex: 0 1 auto;
    cursor: default;
    position: relative;
    width: 100%;
  }

  div.byline > span {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    align-self: flex-start;
    font-family: Lato;
    color: rgb(51, 51, 51);
    font-size: 10pt;
    line-height: 14pt;
    font-weight: bold;
    text-transform: none;
    white-space: pre-wrap;
  }

  div.byline > span:first-of-type {
    margin-right: 3px;
  }

  div.float {
    width: 2.26in;
    float: left;
    margin: 0.04in 0.08in 0px 0px;
  }

  div.photo-wrapper {
    width: 2.26in;
    padding-top: calc(1.50667in);
    height: 0px;
    position: relative;
    float: left;
  }

  div.photo-wrapper > img {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    object-fit: cover;
  }

  article {
    height: 100%;
    font-family: Georgia;
    font-size: 10pt;
    line-height: 1.5;
    text-align: justify;
    overflow: hidden;
    column-width: 500px;
    orphans: 1;
    widows: 1;
    hyphens: auto;
  }

  :global(article.flusher-article p) {
    margin: 0 0 10px 0;
  }

  :global(article.flusher-article a) {
    text-decoration: none;
    color: inherit;
  }

  div.continued {
    font-family: Lato;
    font-size: 9pt;
    line-height: 12pt;
    text-align: left;
    flex-grow: 0;
    flex-shrink: 0;
    margin: 1.54in 0 0 0;
    color: rgba(0, 0, 0, 0.65);
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
