<script lang="ts">
  import { commentsOpen } from '$lib/stores/comments';
  import CommentsPanel from './CommentsPanel.svelte';

  let isPanelOpen = $commentsOpen;
  $: isPanelWrapperOpen = $commentsOpen;
  $: {
    // if the panel is open, wait 360 seconds before marking is closed
    // to give the wrapper transition enough time to hide the panel and wrapper
    if (isPanelOpen) {
      setTimeout(() => {
        isPanelOpen = $commentsOpen;
      }, 360);
    } else {
      isPanelOpen = $commentsOpen;
    }
  }

  export let pageId: string;
</script>

<div class={'scrim'} class:isOpen={isPanelWrapperOpen} on:click={() => ($commentsOpen = false)} />

<div class={'flyout-wrapper'} class:isOpen={isPanelWrapperOpen}>
  <CommentsPanel {pageId} />
</div>

<style>
  .flyout-wrapper {
    position: fixed;
    left: auto;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
    width: 360px;
    margin-top: 20px;
    margin-right: 20px;
    margin-bottom: 20px;
    transform: translateX(400px);
    display: block;
    transition: transform cubic-bezier(0.165, 0.84, 0.44, 1) 360ms;
    z-index: 999;
  }
  @media (max-width: 490px) {
    .flyout-wrapper {
      width: 100%;
      margin: 0;
      transform: translateX(530px);
    }
  }
  .flyout-wrapper.isOpen {
    transform: translateX(0);
  }
  .scrim {
    position: fixed;
    inset: 0;
    z-index: 998;
    background-color: #000000;
    opacity: 0;
    transition: opacity 360ms;
    animation: close-scrim 360ms forwards;
  }
  .scrim.isOpen {
    animation: open-scrim 360ms forwards;
  }
  @keyframes open-scrim {
    0% {
      display: block;
      opacity: 0;
    }
    100% {
      opacity: 0.12;
    }
  }
  @keyframes close-scrim {
    0% {
      display: block;
      opacity: 0.06;
    }
    100% {
      opacity: 0;
      display: none;
    }
  }
</style>
