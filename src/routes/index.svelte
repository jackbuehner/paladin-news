<style>
  .wrapper {
    position: relative;
    top: -52px;
  }

  .sections-grid {
    display: grid;
    grid-template-columns: 1fr 1px 316px;
    grid-template-rows: auto auto auto;
    grid-template-areas:
      'news       news    news'
      'sports     divider opinions'
      'diversity  divider opinions'
      'acc        divider opinions';
    gap: 0px 16px;
  }
  @media (max-width: 740px) {
    .sections-grid {
      grid-template-columns: 1fr;
      grid-template-areas:
        'news     '
        'opinions '
        'sports   '
        'diversity'
        'acc      ';
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
</style>

<script lang="ts">
  import Featured from '../components/home/Featured.svelte';
  import ArticleCardRow from '../components/home/ArticleCardRow.svelte';
  import HomeHeader from '/src/components/header/HomeHeader.svelte';
</script>

<div class={'wrapper'}>
  <HomeHeader />
  <Featured />
  <div class={'sections-grid'}>
    <ArticleCardRow label={'News'} categories={'news'} gridArea={'news'} quantity={[5, 4, 2, 3]} />
    <ArticleCardRow
      label={'Opinions'}
      categories={'opinion'}
      gridArea={'opinions'}
      quantity={[6, 4, 3, 3]}
      forceVertical={true} />
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
    <span />
  </div>
</div>
