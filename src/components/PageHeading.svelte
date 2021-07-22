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
</style>

<script lang="ts">
  import Container from '/src/components/Container.svelte';

  export let type: 'block' | 'line' | 'blockCentered' = 'line';
  export let subtitle: string = undefined;
</script>

{#if type === 'line'}
  <Container>
    <div class={'line'}><h1><slot /></h1></div>
  </Container>
{/if}

{#if type === 'block'}
  <div class={'block'}>
    <Container>
      <h1><slot /></h1>
      {#if subtitle !== undefined}
        <p>{subtitle}</p>
      {/if}
    </Container>
  </div>
{/if}

{#if type === 'blockCentered'}
  <div class={'block centered'}>
    <Container>
      <h1><slot /></h1>
      {#if subtitle !== undefined}
        <div>{@html subtitle}</div>
      {/if}
    </Container>
  </div>
{/if}
