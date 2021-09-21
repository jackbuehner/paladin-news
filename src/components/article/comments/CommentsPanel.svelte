<style>
  .flyout {
    position: relative;
    left: auto;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
    display: grid;
    overflow: hidden;
    width: 100%;
    height: 100%;
    top: 0;
    justify-content: start;
    align-content: start;
    grid-template-columns: 1fr;
    grid-template-rows: 74px 1fr;
    border-radius: 2px;
    background-color: #f7f7f7;
    box-shadow: 0 0 9px 0 #ccc;
  }
  .heading {
    margin-top: 30px;
    margin-right: 10px;
    margin-left: 10px;
    padding-bottom: 20px;
    font-family: Lato, sans-serif;
    font-size: 20px;
    font-weight: 700;
    text-transform: none;
  }

  /* close button */
  .close-button {
    position: absolute;
    left: auto;
    top: 0;
    right: 0;
    bottom: auto;
  }

  /* commento container */
  #commento {
    padding: 0 10px;
  }

  /* commento fonts */
  :global(#svelte .commento-root) {
    font-family: var(--font-detail);
  }
  :global(#svelte
      .commento-root
      .commento-sort-policy-buttons-container
      .commento-sort-policy-buttons
      .commento-sort-policy-button-selected),
  :global(#svelte .commento-root .commento-mod-tools::before) {
    color: rgb(var(--primary));
  }

  /* absolutely position login info container */
  :global(#svelte .commento-root .commento-logged-container) {
    position: absolute;
    top: 0;
    width: calc(100% - 36px - 10px);
  }

  /* commento avatar*/
  :global(#svelte .commento-root .commento-avatar) {
    display: none;
  }

  /* profile buttons */
  :global(#svelte .commento-root .commento-logged-container .commento-profile-button) {
    font-size: 0;
    display: inline-flex;
    width: 36px;
    height: 36px;
    justify-content: center;
    align-items: center;
    border-radius: var(--radius);
    color: var(--button-color);
    cursor: default;
    background-color: var(--button-bg);
    border: 1px solid transparent;
    transition: 200ms;
    color: var(--button-color);
    margin: 0px;
    cursor: default;
    float: unset;
  }
  :global(#svelte
      .commento-root
      .commento-logged-container
      .commento-profile-button:hover:not([disabled])) {
    background-color: var(--button-bg-hover);
    border: 1px solid var(--button-bg-hover);
    box-shadow: var(--button-shadow-hover);
  }
  :global(#svelte
      .commento-root
      .commento-logged-container
      .commento-profile-button:active:not([disabled])) {
    background-color: var(--button-bg-active);
    border: 1px solid var(--button-bg-active);
    box-shadow: var(--button-shadow-active);
  }
  :global(#svelte .commento-root .commento-logged-container .commento-profile-button::before) {
    width: 20px;
    height: 20px;
    display: block;
    content: '';
    background-repeat: no-repeat;
    margin-top: -1px;
  }
  :global(#svelte .commento-logged-container > .commento-profile-button:nth-of-type(2)::before) {
    /* profile */
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%23333333' d='M16,17V14H9V10H16V7L21,12L16,17M14,2A2,2 0 0,1 16,4V6H14V4H5V20H14V18H16V20A2,2 0 0,1 14,22H5A2,2 0 0,1 3,20V4A2,2 0 0,1 5,2H14Z'%3E%3C/path%3E%3C/svg%3E");
  }
  :global(#svelte .commento-logged-container > .commento-profile-button:nth-of-type(2)) {
    position: relative;
    left: calc(100% - 36px);
  }
  :global(#svelte .commento-logged-container > .commento-profile-button:nth-of-type(3)::before) {
    /* settings */
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%23333333' d='M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8M12,10A2,2 0 0,0 10,12A2,2 0 0,0 12,14A2,2 0 0,0 14,12A2,2 0 0,0 12,10M10,22C9.75,22 9.54,21.82 9.5,21.58L9.13,18.93C8.5,18.68 7.96,18.34 7.44,17.94L4.95,18.95C4.73,19.03 4.46,18.95 4.34,18.73L2.34,15.27C2.21,15.05 2.27,14.78 2.46,14.63L4.57,12.97L4.5,12L4.57,11L2.46,9.37C2.27,9.22 2.21,8.95 2.34,8.73L4.34,5.27C4.46,5.05 4.73,4.96 4.95,5.05L7.44,6.05C7.96,5.66 8.5,5.32 9.13,5.07L9.5,2.42C9.54,2.18 9.75,2 10,2H14C14.25,2 14.46,2.18 14.5,2.42L14.87,5.07C15.5,5.32 16.04,5.66 16.56,6.05L19.05,5.05C19.27,4.96 19.54,5.05 19.66,5.27L21.66,8.73C21.79,8.95 21.73,9.22 21.54,9.37L19.43,11L19.5,12L19.43,13L21.54,14.63C21.73,14.78 21.79,15.05 21.66,15.27L19.66,18.73C19.54,18.95 19.27,19.04 19.05,18.95L16.56,17.95C16.04,18.34 15.5,18.68 14.87,18.93L14.5,21.58C14.46,21.82 14.25,22 14,22H10M11.25,4L10.88,6.61C9.68,6.86 8.62,7.5 7.85,8.39L5.44,7.35L4.69,8.65L6.8,10.2C6.4,11.37 6.4,12.64 6.8,13.8L4.68,15.36L5.43,16.66L7.86,15.62C8.63,16.5 9.68,17.14 10.87,17.38L11.24,20H12.76L13.13,17.39C14.32,17.14 15.37,16.5 16.14,15.62L18.57,16.66L19.32,15.36L17.2,13.81C17.6,12.64 17.6,11.37 17.2,10.2L19.31,8.65L18.56,7.35L16.15,8.39C15.38,7.5 14.32,6.86 13.12,6.62L12.75,4H11.25Z'%3E%3C/path%3E%3C/svg%3E");
  }
  :global(#svelte .commento-logged-container > .commento-profile-button:nth-of-type(3)) {
    position: relative;
    left: calc(100% - 108px);
  }

  /* commento error message */
  :global(#svelte .commento-root .commento-error-box) {
    position: absolute;
    top: 0;
    left: 0;
    width: calc(100% - 108px);
    text-align: left;
    margin: 0 10px;
    height: 36px;
    display: flex;
    align-items: center;
    font-size: 14px;
    line-height: 18px;
    font-weight: 400;
  }

  /* commento name */
  :global(#svelte .commento-root .commento-logged-container .commento-logged-in-as .commento-name) {
    left: 0;
    top: 50px;
    font-weight: 400;
    font-style: italic;
    max-width: 100% !important;
  }
  :global(#svelte
      .commento-root
      .commento-logged-container
      .commento-logged-in-as
      .commento-name::before) {
    content: 'Commenting as ';
  }

  /* commento comment name and meta */
  :global(#svelte .commento-root .commento-card .commento-name),
  :global(#svelte .commento-root .commento-card .commento-subtitle) {
    /* adjust for hidden avatar */
    margin-left: 0;
  }

  /* submit comment button */
  :global(#svelte .commento-root .commento-submit-button) {
    display: inline-flex;
    height: 30px;
    justify-content: center;
    align-items: center;
    border-radius: var(--radius);
    color: var(--button-color);
    cursor: default;
    background-color: var(--button-light-bg);
    border: 1px solid var(--button-light-border-color);
    transition: 200ms;
    color: var(--button-color);
    min-width: 80px;
    padding: 0 10px;
    font-family: var(--font-detail);
    font-size: 14px;
    font-weight: 500;
    white-space: nowrap;
    text-transform: none;
    box-shadow: none;
    margin-right: 0;
  }
  :global(#svelte .commento-root .commento-submit-button:hover:not(.disabled)) {
    background-color: var(--button-light-bg-hover);
    border: 1px solid var(--button-light-bg-hover);
    box-shadow: var(--button-shadow-hover);
  }
  :global(#svelte .commento-root .commento-submit-button:active:not(.disabled)) {
    background-color: var(--button-light-bg-active);
    border: 1px solid var(--button-light-bg-active);
    box-shadow: var(--button-shadow-active);
  }
  :global(#svelte .commento-root .commento-submit-button.disabled) {
    color: var(--button-color-disabled);
  }

  /* commento branding */
  :global(#svelte .commento-root .commento-logo-container) {
    display: none;
  }
</style>

<script lang="ts">
  import { commentsOpen } from '../../../stores/comments';
  import { onMount } from 'svelte';
  import IconButton from '../../IconButton.svelte';

  export let pageId: string;

  onMount(() => {
    // create and add the commento script
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.defer = true;
    script.src = 'https://cdn.commento.io/js/commento.js';
    script.setAttribute('data-auto-init', 'false');
    script.setAttribute('data-no-fonts', 'true');
    script.setAttribute('data-page-id', pageId);
    document.body.appendChild(script);

    // wait for the comment script to become available
    script.onload = () => {
      // @ts-expect-error commento script is loaded on this page
      const commento = window.commento;

      // initialize commento
      commento.main();
    };
  });
</script>

<div class={'flyout'}>
  <div class={'close-button'}>
    <IconButton ariaLabel={'close'} on:click={() => ($commentsOpen = false)}
      ><svg style="width:24px;height:24px" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
      </svg></IconButton>
  </div>
  <div class={'heading'}>Comments</div>
  <!-- comments container -->
  <div id={'commento'} />
</div>
