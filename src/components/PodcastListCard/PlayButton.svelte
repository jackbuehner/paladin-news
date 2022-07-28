<script lang="ts">
  import IconButton from '../IconButton.svelte';

  export let index: number;
</script>

<div class={'amplitude-skip-to'} data-amplitude-song-index={index} data-amplitude-location={0}>
  <IconButton
    isOutlined
    ariaLabel={'play'}
    className={'podcast-list-play-button'}
    color={`var(--color-neutral-light)`}
  >
    <path d={'M8.5,8.64L13.77,12L8.5,15.36V8.64M6.5,5V19L17.5,12'} />
  </IconButton>
</div>

<style>
  :global(button.isOutlined.podcast-list-play-button) {
    border-width: 2px !important;
    border-color: #e0e0e0;
  }
</style>
