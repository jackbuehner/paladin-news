<style>
  a {
    text-decoration: none;
    font-family: var(--font-detail);
    font-size: 15px;
    font-weight: 500;
    letter-spacing: 0.3px;
    color: var(--color-neutral-dark);
    height: 30px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    gap: 4px;
    border-radius: var(--radius);
    border: 1px solid transparent;
    transition: 200ms;
    padding: 0 6px 0 10px;
    cursor: default;
  }
  a:hover {
    background-color: var(--button-light-bg-hover);
    border: 1px solid var(--button-light-bg-hover);
    box-shadow: var(--button-shadow-hover);
  }
  a:active {
    background-color: var(--button-light-bg-active);
    border: 1px solid var(--button-light-bg-active);
    box-shadow: var(--button-shadow-active);
  }

  /* styles for memberstack panels */
  :global(body .ms-style .ms-signup-container),
  :global(body .ms-style .ms-signup-header),
  :global(body .ms-style .ms-login-or-signup) {
    background-color: var(--background);
  }
  :global(body .ms-style .ms-signup-container),
  :global(body .ms-style .ms-login-or-signup),
  :global(body .ms-style .ms-portal) {
    border-radius: var(--radius);
  }
  :global(body .ms-style .ms-portal-h1),
  :global(body .ms-style .ms-portal-button),
  :global(body .ms-style.ms-style-override) {
    font-family: var(--font-detail);
  }
  :global(body .ms-style .ms-portal-button) {
    top: 13px;
    display: inline-flex;
    height: 30px;
    justify-content: center;
    align-items: center;
    border-radius: var(--radius);
    color: var(--button-color);
    cursor: default;
    background-color: var(--button-light-bg) !important;
    border: 1px solid var(--button-light-border-color);
    transition: 200ms;
    color: var(--button-color);
    min-width: 80px;
    padding: 0 10px;
    font-family: var(--font-detail);
    font-size: 14px;
    font-weight: 500;
    white-space: nowrap;
    box-shadow: none;
    user-select: none;
  }
  :global(body .ms-style .ms-portal-button:hover:not([disabled])) {
    background-color: var(--button-light-bg-hover) !important;
    border: 1px solid var(--button-light-bg-hover);
    box-shadow: var(--button-shadow-hover);
  }
  :global(body .ms-style .ms-portal-button:active:not([disabled])) {
    background-color: var(--button-light-bg-active) !important;
    border: 1px solid var(--button-light-bg-active);
    box-shadow: var(--button-shadow-active);
  }
  :global(body .ms-style .ms-portal-button[disabled]) {
    color: var(--button-color-disabled);
  }
  @media (max-width: 767px) {
    :global(body .ms-style .ms-portal) {
      width: 100%;
      max-width: 100%;
      margin: 0;
      height: 100%;
    }
    :global(body .ms-style .ms-portal-content-wrapper) {
      max-width: 100%;
    }
  }
</style>

<script lang="ts">
  import { Memberstack } from '../../../src/utils/Memberstack';
  import { afterUpdate } from 'svelte';
  import Button from '../Button.svelte';
  import IconButton from '../IconButton.svelte';
  import { goto } from '$app/navigation';

  export let isCompact: boolean = false;

  // store whether memberstack is ready
  $: memberstackReady = false;
  afterUpdate(() => {
    Memberstack.onReady().then(() => {
      memberstackReady = true;
      // also reload memberstack so that it can attach to DOM links
      Memberstack.reload();
    });
  });
</script>

{#if memberstackReady}
  {#if isCompact}
    <IconButton ariaLabel={'Sign in'} href={'#/ms/login'}>
      <path
        fill="currentColor"
        d="M5.8 10C5.4 8.8 4.3 8 3 8C1.3 8 0 9.3 0 11S1.3 14 3 14C4.3 14 5.4 13.2 5.8 12H7V14H9V12H11V10H5.8M3 12C2.4 12 2 11.6 2 11S2.4 10 3 10 4 10.4 4 11 3.6 12 3 12M16 4C13.8 4 12 5.8 12 8S13.8 12 16 12 20 10.2 20 8 18.2 4 16 4M16 10.1C14.8 10.1 13.9 9.2 13.9 8C13.9 6.8 14.8 5.9 16 5.9C17.2 5.9 18.1 6.8 18.1 8S17.2 10.1 16 10.1M16 13C13.3 13 8 14.3 8 17V20H24V17C24 14.3 18.7 13 16 13M22.1 18.1H9.9V17C9.9 16.4 13 14.9 16 14.9C19 14.9 22.1 16.4 22.1 17V18.1Z" />
    </IconButton>
    <IconButton ariaLabel={'View account'} href={'#/ms/profile'}>
      <path
        d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,6A2,2 0 0,0 10,8A2,2 0 0,0 12,10A2,2 0 0,0 14,8A2,2 0 0,0 12,6M12,13C14.67,13 20,14.33 20,17V20H4V17C4,14.33 9.33,13 12,13M12,14.9C9.03,14.9 5.9,16.36 5.9,17V18.1H18.1V17C18.1,16.36 14.97,14.9 12,14.9Z" />
    </IconButton>
  {:else}
    <span data-ms-content={'!members'}>
      <Button on:click={() => goto('/subscribe')}>Subscribe for free</Button>
    </span>
    <Button on:click={(e) => Memberstack.openLogin(e.target)} href={'#/ms/login'}>Sign in</Button>
    <a
      href={'#/ms/profile'}
      onclick={'return false'}
      on:click={(e) => Memberstack.openProfile(e.target)}
      >Account <svg viewBox="0 0 24 24" style="width: 16px; height: 16px;">
        <path fill="currentColor" d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
      </svg></a>
  {/if}
{/if}
