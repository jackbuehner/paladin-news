<script lang="ts">
  import { Tabs, TabList, Tab } from '$lib/components/Tabs';
  import { page } from '$app/stores';
  import Container from '$lib/components/Container.svelte';
  import Button from '$lib/components/Button.svelte';
  import { fade, fly } from 'svelte/transition';
</script>

<Tabs>
  <header>
    <Container>
      <div class="contents">
        <h1 in:fly={{ y: 20, duration: 420 }}>Videos</h1>
        <div in:fade={{ duration: 240 }}>
          <Tab href="/section/video" isDefault={$page.url.pathname === '/section/video'}>Home</Tab>
          <Tab
            href="/section/video/playlists"
            isDefault={$page.url.pathname === '/section/video/playlists'}
          >
            Playlists
          </Tab>
          <Tab href="/section/video/all" isDefault={$page.url.pathname === '/section/video/all'}>
            All
          </Tab>
          <Button
            style="--button-light-bg: transparent; position: absolute; right: 0; top: -80px;"
            href="https://www.youtube.com/channel/UC3UaWOCIldF5_qWnCYEt0RQ"
          >
            View on YouTube
          </Button>
        </div>
      </div>
    </Container>
  </header>

  <main>
    <slot />
  </main>
</Tabs>

<style>
  header {
    border-bottom: 1px solid var(--border-light);
    background: rgba(var(--primary), 0.12);
  }

  div.contents {
    position: relative;
  }

  h1 {
    font-family: var(--font-detail);
    color: var(--color-neutral-dark);
    font-size: 36px;
    line-height: 36px;
    font-style: normal;
    font-weight: 700;
    letter-spacing: 0.16px;
    margin: 100px 0 16px 0;
  }
</style>
