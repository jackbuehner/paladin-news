<script>
  import { page } from '$app/stores';
  import Container from '$lib/components/Container.svelte';
  import PageHeading from '$lib/components/PageHeading.svelte';
  import { Tab, TabList, TabPanel, Tabs } from '$lib/components/Tabs';
</script>

<svelte:head>
  <title>COVID-19 on Campus – The Paladin</title>
</svelte:head>

<div style={'height: 0;'}>
  <Container>
    <div class={'phase purple'}>Purple Operational Phase</div>
  </Container>
</div>

<PageHeading
  type={'block'}
  subtitle={'Data visualizations for student testing, positivity rates, and quarantine/isolation space on campus. For updated disease metrics in South Carolina by county, <a href="https://scdhec.gov/covid19/south-carolina-county-level-data-covid-19">visit SC DHEC</a>.'}
>
  COVID-19 on Campus
</PageHeading>

<div style={'margin: -20px 0 0 0;'}>
  <Tabs>
    <TabList>
      <div style="display: flex; flex-direction: row; width: 1200px; margin: 0 auto;">
        <Tab
          href="2020"
          grow
          manualSelected={$page.url.pathname.split('/').slice(-1)[0] === '2020'}
        >
          2020
        </Tab>
        <Tab
          href="2021"
          grow
          manualSelected={$page.url.pathname.split('/').slice(-1)[0] === '2021'}
        >
          2021
        </Tab>
      </div>
    </TabList>

    <div class="page-content">
      <slot />
    </div>
  </Tabs>
</div>

<style>
  .phase {
    float: right;
    position: relative;
    top: 44px;
    padding-right: 6px;
    padding-left: 6px;
    border: 1px solid #eeef00;
    border-radius: 2px;
    background-color: rgba(255, 255, 0, 0.27);
    font-size: 14px;
    font-family: var(--font-detail);
    line-height: 24px;
    font-weight: 700;
  }
  .purple {
    border-color: rgba(146, 75, 184, 0.4);
    background-color: rgba(146, 75, 184, 0.12);
  }
  @media (max-width: 560px) {
    .phase {
      float: unset;
      position: absolute;
      top: 53px;
      left: 0;
      padding: 2px 20px;
      width: 100%;
      border-radius: 0;
      border-width: 0;
      text-align: center;
    }
  }

  .page-content :global(text) {
    font-family: 'Lato';
    font-size: 16px;
    fill: #333;
  }

  .page-content :global(g[aria-label*='-axis label']) {
    font-weight: 600;
  }

  .page-content :global(div[class*='-swatches']) {
    font-family: 'Lato';
    font-size: 16px;
    fill: #333;
  }
</style>
