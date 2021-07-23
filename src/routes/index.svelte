<style>
  .wrapper {
    position: relative;
    top: -52px;
    background-color: white;
  }

  .sections-grid {
    display: grid;
    grid-template-columns: 1fr 1px 316px;
    grid-template-rows: repeat(4, minmax(0, auto)) 1fr; /* end with 1fr so only last row will expand if needed */
    grid-template-areas:
      'news       news    news'
      'sports     divider opinions'
      'diversity  divider opinions'
      'acc        divider opinions'
      'plus       divider opinions';
    gap: 0px 16px;
  }
  @media (max-width: 740px) {
    .sections-grid {
      grid-template-columns: 1fr;
      grid-template-rows: repeat(5, minmax(0, auto)) 1fr;
      grid-template-areas:
        'news     '
        'opinions '
        'sports   '
        'diversity'
        'acc      '
        'plus     ';
    }
  }
  span {
    grid-area: divider;
    border-left: 1px solid var(--border-dark);
    margin: 16px 0;
  }
  @media (max-width: 740px) {
    span {
      display: none;
    }
  }

  /* section groups */
  .section {
    padding: 30px 0;
    border-bottom: 1px solid var(--border-dark);
  }

  /* section headings */
  .section > h2 {
    font-family: var(--font-detail);
    font-size: 18px;
    line-height: 18px;
    text-transform: uppercase;
    margin: 0 0 16px 0;
  }

  /* hide twitter section on smaller screens */
  @media (max-width: 740px) {
    .twitter {
      display: none;
    }
  }
</style>

<script lang="ts">
  import Featured from '../components/home/Featured.svelte';
  import ArticleCardRow from '../components/home/ArticleCardRow.svelte';
  import HomeHeader from '/src/components/header/HomeHeader.svelte';
  import Container from '/src/components/Container.svelte';
  import PaladinPlusList from '/src/components/PaladinPlusList.svelte';
  import { onMount } from 'svelte';
  import { title } from '../stores/title';

  // set the document title
  onMount(() => ($title = undefined));
</script>

<div class={'wrapper'}>
  <Container>
    <HomeHeader />
    <Featured />
    <div class={'sections-grid'}>
      <ArticleCardRow
        label={'News'}
        categories={'news'}
        gridArea={'news'}
        quantity={[5, 4, 2, 3]} />
      <div style={'grid-area: opinions'}>
        <ArticleCardRow
          label={'Opinions'}
          categories={'opinion'}
          quantity={[6, 4, 3, 3]}
          forceVertical={true} />
        <div class={'section twitter'}>
          <h2>Tweets</h2>
          <a
            href="https://twitter.com/thepaladin_news"
            data-theme="light"
            data-border-color="#ffff00"
            data-cards="hidden"
            data-chrome="noheader nofooter noborders noscrollbar transparent"
            data-dnt="true"
            data-width="312"
            data-tweet-limit="2"
            target="_blank">
            Tweets by thepaladin_news
          </a>
          <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
        </div>
      </div>
      <ArticleCardRow
        label={'Sports'}
        categories={'sports'}
        gridArea={'sports'}
        quantity={[3, 2, 2, 3]} />
      <ArticleCardRow
        label={'Diversity Matters'}
        categories={'diversity'}
        gridArea={'diversity'}
        quantity={[3, 2, 2, 3]} />
      <ArticleCardRow
        label={'Arts, Campus, & Culture'}
        categories={'arts,campus-culture'}
        gridArea={'acc'}
        quantity={[3, 2, 2, 3]} />
      <div style={'grid-area: plus;'}>
        <div style={'border-bottom: 1px solid var(--border-dark); padding: 16px 0'}>
          <PaladinPlusList />
        </div>
      </div>
      <span />
    </div>
  </Container>
</div>
