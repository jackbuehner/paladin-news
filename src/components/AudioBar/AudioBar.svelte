<script lang="ts">
  import { onMount } from 'svelte';
  import IconButton from '../IconButton.svelte';

  export let initialSongs:
    | {
        name: string;
        artist: string;
        album: string;
        url: string;
      }[]
    | undefined;

  let Amplitude: any;

  // init song player
  onMount(async () => {
    Amplitude = await import('amplitudejs');

    if (initialSongs) {
      Amplitude.pause();
      Amplitude.init({
        bindings: {
          37: 'prev',
          39: 'next',
          179: 'playpause',
        },
        songs: initialSongs,
        callbacks: {
          play: () => {
            sessionStorage.setItem(`audio.playStatus`, `playing`);
          },
          pause: () => {
            sessionStorage.setItem(`audio.playStatus`, `paused`);
          },
          stop: () => {
            sessionStorage.setItem(`audio.playStatus`, `stopped`);
          },
        },
        volume: 80,
      });

      // pausing amplitude after initialization fixes the progress bar and seek bar issue on mobile
      Amplitude.pause();
    }
  });

  function forward() {
    if (Amplitude) {
      const currentSongDuration = Amplitude.getSongDuration();
      const currentSeconds = Amplitude.getSongPlayedSeconds();
      const currentSongIndex = Amplitude.getActiveIndex();
      if (currentSongDuration - currentSeconds <= 30) {
        Amplitude.skipTo(0, currentSongIndex + 1, null);
      } else {
        Amplitude.skipTo(currentSeconds + 30, currentSongIndex, null);
      }
    }
  }

  function rewind() {
    if (Amplitude) {
      const currentSeconds = Amplitude.getSongPlayedSeconds();
      const currentSongIndex = Amplitude.getActiveIndex();
      Amplitude.skipTo(currentSeconds - 10, currentSongIndex, null);
    }
  }
</script>

<div class="audio-player-bottom-bar">
  <progress class="amplitude-song-played-progress" value="0" />
  <input type="range" class="amplitude-song-slider" step=".1" value="0" />
  <div class="audio-player-bottom-bar-grid">
    <div class="audio-player-grid-item metadata">
      <img
        class="audio-player-bottom-bar-album-cover"
        src="https://d3e54v103j8qbb.cloudfront.net/plugins/Basic/assets/placeholder.60f9b1840c.svg"
        width="50"
        height="50"
        alt=""
        data-amplitude-song-info="cover_art_url"
        loading="lazy"
      />
      <div class="audio-player-bottom-bar-meta">
        <div data-amplitude-song-info="name" class="audio-player-song-name">Song/Episode Name</div>
        <div class="amplitude-time-remaining">0</div>
        <div class="amplitude-time-remaining-unmatched">mins left</div>
      </div>
    </div>
    <div class="audio-player-grid-item controls">
      <IconButton
        size={`36px`}
        ariaLabel={`rewind`}
        className={`amplitude-rewind-10`}
        color={`var(--color-neutral-light)`}
        on:click={rewind}
      >
        <path
          d={'M12.5,3C17.15,3 21.08,6.03 22.47,10.22L20.1,11C19.05,7.81 16.04,5.5 12.5,5.5C10.54,5.5 8.77,6.22 7.38,7.38L10,10H3V3L5.6,5.6C7.45,4 9.85,3 12.5,3M10,12V22H8V14H6V12H10M18,14V20C18,21.11 17.11,22 16,22H14A2,2 0 0,1 12,20V14A2,2 0 0,1 14,12H16C17.11,12 18,12.9 18,14M14,14V20H16V14H14Z'}
        />
      </IconButton>
      <IconButton
        size={`48px`}
        iconSize={`36px`}
        ariaLabel={`play`}
        className={`amplitude-play-pause`}
        color={`var(--color-neutral-light)`}
      >
        <path d={'M8.5,8.64L13.77,12L8.5,15.36V8.64M6.5,5V19L17.5,12'} class="play" />
        <path
          d={'M15,16H13V8H15V16M11,16H9V8H11V16M15.73,3L21,8.27V15.73L15.73,21H8.27L3,15.73V8.27L8.27,3H15.73M14.9,5H9.1L5,9.1V14.9L9.1,19H14.9L19,14.9V9.1L14.9,5Z'}
          class="pause"
        />
      </IconButton>
      <IconButton
        size={`36px`}
        ariaLabel={`forward`}
        className={`amplitude-forward-30`}
        color={`var(--color-neutral-light)`}
        on:click={forward}
      >
        <path
          d={'M11.5,3C6.85,3 2.92,6.03 1.53,10.22L3.9,11C4.95,7.81 7.96,5.5 11.5,5.5C13.46,5.5 15.23,6.22 16.62,7.38L14,10H21V3L18.4,5.6C16.55,4 14.15,3 11.5,3M19,14V20C19,21.11 18.11,22 17,22H15A2,2 0 0,1 13,20V14A2,2 0 0,1 15,12H17C18.11,12 19,12.9 19,14M15,14V20H17V14H15M11,20C11,21.11 10.1,22 9,22H5V20H9V18H7V16H9V14H5V12H9A2,2 0 0,1 11,14V15.5A1.5,1.5 0 0,1 9.5,17A1.5,1.5 0 0,1 11,18.5V20Z'}
        />
      </IconButton>
    </div>
    <div class="audio-player-grid-item speed-volume">
      <div class="amplitude-playback-speed">x</div>
      <IconButton
        size={`36px`}
        ariaLabel={`forward`}
        className={`amplitude-mute`}
        color={`var(--color-neutral-light)`}
      >
        <path
          d={'M4.34 2.93L2.93 4.34 7.29 8.7 7 9H3v6h4l5 5v-6.59l4.18 4.18c-.65.49-1.38.88-2.18 1.11v2.06c1.34-.3 2.57-.92 3.61-1.75l2.05 2.05 1.41-1.41L4.34 2.93zM10 15.17L7.83 13H5v-2h2.83l.88-.88L10 11.41v3.76zM19 12c0 .82-.15 1.61-.41 2.34l1.53 1.53c.56-1.17.88-2.48.88-3.87 0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zm-7-8l-1.88 1.88L12 7.76zm4.5 8c0-1.77-1.02-3.29-2.5-4.03v1.79l2.48 2.48c.01-.08.02-.16.02-.24z'}
          class={'muted'}
        />
        <path
          d={'M3 9v6h4l5 5V4L7 9H3zm7-.17v6.34L7.83 13H5v-2h2.83L10 8.83zM16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77 0-4.28-2.99-7.86-7-8.77z'}
          class={'unmuted'}
        />
      </IconButton>
      <div class="amplitude-volume-slider-container">
        <input type="range" class="amplitude-volume-slider" value="80" />
      </div>
    </div>
  </div>
  <style>
    .bottom {
      margin-bottom: 90px;
    }
  </style>
</div>

<style>
  .audio-player-bottom-bar {
    position: fixed;
    inset: auto 0% 0%;
    background-color: rgb(247, 247, 247);
    box-shadow: rgb(0 0 0 / 8%) 0px 0px 8px 0px;
  }
  .audio-player-bottom-bar-grid {
    display: grid;
    height: 90px;
    margin-right: 20px;
    margin-left: 20px;
    justify-content: flex-start;
    align-items: center;
    grid-auto-columns: 1fr;
    gap: 16px;
    grid-template-columns: 1fr 120px 1fr;
    grid-template-rows: 90px;
  }
  @media (max-width: 780px) {
    .audio-player-bottom-bar-grid {
      height: 140px;
      grid-template-areas: 'metadata metadata';
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 90px 40px;
      grid-column-gap: 0px;
      grid-row-gap: 0px;
    }
    .audio-player-grid-item.metadata {
      grid-area: metadata;
    }
  }
  .audio-player-bottom-bar-album-cover {
    border: 1px solid var(--border-light);
  }
  .audio-player-bottom-bar-meta {
    overflow: hidden;
    margin-left: 20px;
  }

  .audio-player-grid-item {
    display: flex;
    min-width: 0px;
    align-items: center;
  }
  .audio-player-grid-item.speed-volume {
    justify-self: end;
  }
  .audio-player-grid-item.controls {
    gap: 10px;
  }

  .amplitude-time-remaining,
  .amplitude-time-remaining-unmatched {
    display: inline;
    font-family: var(--font-detail);
    font-size: 12px;
    line-height: 18px;
  }

  .audio-player-song-name {
    overflow: hidden;
    font-family: var(--font-detail);
    color: var(--color-neutral-dark);
    font-size: 14px;
    line-height: 20px;
    font-weight: 700;
    white-space: nowrap;
  }

  .amplitude-playback-speed {
    margin-right: 6px;
    padding: 4px 6px;
    border: 1px solid var(--border-dark);
    border-radius: var(--radius);
    transition-property: background-color;
    transition-duration: 200ms;
    transition-timing-function: ease;
    font-family: var(--font-detail);
    color: var(--color-neutral-dark);
    font-size: 12px;
    line-height: 12px;
    cursor: pointer;
  }

  .amplitude-song-slider {
    -webkit-appearance: none;
    position: absolute;
    top: 1px;
    left: 0;
    width: 100%;
    height: 0px;
    cursor: pointer;
  }
  .amplitude-song-slider:focus {
    outline: none;
  }
  .amplitude-song-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #722e97;
    cursor: pointer;
    margin: -4px 0 0 -4px;
  }
  .amplitude-song-slider::-moz-range-thumb {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #722e97;
    cursor: pointer;
  }
  .amplitude-song-slider::-webkit-slider-thumb:active {
    width: 12px;
    height: 12px;
  }
  .amplitude-song-played-progress {
    -webkit-appearance: none;
    appearance: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
  }
  .amplitude-song-played-progress::-webkit-progress-bar {
    background-color: #e2e2e2;
    border: none;
    border-radius: 0;
  }
  .amplitude-song-played-progress::-webkit-progress-value {
    background-color: #722e97;
    border: none;
    border-radius: 0;
  }
  .amplitude-volume-slider-container {
    height: 28px;
    margin-left: 6px;
  }
  .amplitude-volume-slider {
    -webkit-appearance: none;
    width: 100%;
    height: 2px;
    background: #d3d3d3;
  }
  .amplitude-volume-slider:focus {
    outline: none;
  }
  .amplitude-volume-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #722e97;
    cursor: pointer;
  }
  .amplitude-volume-slider::-moz-range-thumb {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #722e97;
    cursor: pointer;
  }
  .amplitude-volume-slider::-webkit-slider-thumb:active {
    width: 12px;
    height: 12px;
  }
  :global(.amplitude-playback-speed-10::before),
  :global(.amplitude-playback-speed::before) {
    content: '1.0';
  }
  :global(.amplitude-playback-speed-15::before) {
    content: '1.5';
  }
  :global(.amplitude-playback-speed-20::before) {
    content: '2.0';
  }
  :global(.amplitude-playing .play) {
    display: none;
  }
  :global(.amplitude-paused .pause) {
    display: none;
  }
  :global(.amplitude-play-pause:not(.amplitude-playing) .pause) {
    display: none;
  }
  :global(.amplitude-not-muted .muted) {
    display: none;
  }
  :global(.amplitude-muted .unmuted) {
    display: none;
  }
</style>
