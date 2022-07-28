<script lang="ts">
  import Container from '$lib/components/Container.svelte';

  export let type: 'block' | 'line' | 'blockCentered' = 'line';
  export let subtitle: string | undefined = undefined;
  export let width = 1200;
  export let photo: string | undefined = undefined;
</script>

{#if type === 'line'}
  <Container {width}>
    <div class={'line'}><h1><slot /></h1></div>
  </Container>
{/if}

{#if type === 'block'}
  <div class={'block'}>
    <Container {width}>
      <div style={'display: flex; flex-direction: row; align-items: center;'}>
        {#if photo}
          <img src={photo} alt={''} />
        {/if}
        <div>
          <h1><slot /></h1>
          {#if subtitle !== undefined}
            <p>{@html subtitle}</p>
          {/if}
        </div>
      </div>
    </Container>
  </div>
{/if}

{#if type === 'blockCentered'}
  <div class={'block centered'}>
    <Container {width}>
      <h1><slot /></h1>
      {#if subtitle !== undefined}
        <div>{@html subtitle}</div>
      {/if}
    </Container>
  </div>
{/if}

<style>
  /** styles for line type **/
  .line h1 {
    font-family: var(--font-detail);
    color: var(--color-neutral-dark);
    font-size: 48px;
    line-height: 48px;
    margin: 0;
    border-bottom: 2px solid black;
    padding: 0 0 10px 0;
    margin: 48px 0 32px 0;
  }
  @media (max-width: 540px) {
    .line h1 {
      font-size: 32px;
      line-height: 32px;
      margin: 36px 0 24px 0;
    }
  }

  /** styles for block type **/
  .block {
    padding: 40px 0;
    border-bottom: 1px solid var(--border-light);
    margin: 0 0 20px 0;
  }
  .centered {
    text-align: center;
  }
  .block h1 {
    margin-top: 0;
    margin-bottom: 0;
    font-family: var(--font-detail);
    color: var(--color-neutral-dark);
    font-size: 28px;
    line-height: 34px;
    font-style: normal;
    font-weight: 700;
    letter-spacing: 0.16px;
    margin: 0;
  }
  .block p {
    margin-bottom: 0;
    font-family: var(--font-detail);
    color: var(--color-neutral-dark);
    font-size: 18px;
    line-height: 24px;
    font-weight: 400;
    margin: 0;
  }
  :global(.block a) {
    color: rgb(var(--primary-lighter));
    box-shadow: 0 1px 0 0 rgb(var(--primary));
    transition: background-color 0.2s, box-shadow 0.1s, color 0.2s;
    text-decoration: none;
  }
  :global(.block a:hover) {
    box-shadow: 0 2px 0 0 rgb(var(--primary));
    background-color: rgba(var(--primary), 0.1);
    color: var(--color-neutral-dark);
  }
  :global(.block a:active) {
    background-color: rgba(var(--primary), 0.16);
  }
  img {
    margin-right: 20px;
    height: 100px;
    width: 100px;
    object-fit: cover;
    border: 1px solid var(--border-light);
    border-radius: var(--radius);
  }
</style>
