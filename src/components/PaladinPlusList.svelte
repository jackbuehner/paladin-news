<style>
  .outer {
    position: relative;
    border: 1px solid #ccc;
  }
  .inner {
    position: relative;
    margin: 1px;
    padding: 20px;
    border: 1px solid #ccc;
  }
  h1 {
    margin-top: 10px;
    margin-bottom: 0;
    font-family: var(--font-detail);
    font-size: 30px;
    line-height: 38px;
    color: var(--color-neutral-dark);
    text-align: center;
    letter-spacing: 0.3px;
  }
  .sub {
    margin-bottom: 0;
    color: var(--color-neutral-dark);
    font-family: var(--font-detail);
    font-size: 16px;
    line-height: 22px;
    text-align: center;
  }
  .button-row {
    display: flex;
    justify-content: center;
    margin-top: 10px;
  }
  .grid {
    display: grid;
    margin-top: 20px;
    grid-auto-columns: 1fr;
    grid-column-gap: 12px;
    grid-row-gap: 12px;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto;
  }
  img {
    vertical-align: middle;
    display: inline-block;
    max-width: 100%;
  }
  .description {
    color: var(--color-neutral-dark);
    font-family: var(--font-detail);
    font-size: 14px;
    text-align: center;
  }
</style>

<script lang="ts">
  import { goto } from '$app/navigation';

  import Button from './Button.svelte';

  const items = [
    {
      href: '/newsletters',
      src:
        'https://paladin-photo-library.s3.us-east-1.amazonaws.com/deep-dive_logo_banner_color.svg',
      description: 'A data-driven newsletter uncovering campus’ biggest stories.',
      color: 'rgba(114,46,151,.16)',
    },
    {
      href: '/newsletters',
      src:
        'https://paladin-photo-library.s3.us-east-1.amazonaws.com/paladin-profiles_banner_color.svg',
      description:
        'Video interviews that highlight the important work Paladins past and present are doing to improve diversity and inclusion on campus and beyond.',
      color: 'rgba(114,46,151,.16)',
    },
    {
      href: '/newsletters',
      src: 'https://paladin-photo-library.s3.us-east-1.amazonaws.com/rwbp_logo_banner.svg',
      description:
        'Price St. Clair’s podcast-newsletter that covers politics and policy from a Furman Perspective.',
      color: 'rgba(114,46,151,.86)',
    },
    {
      href: '/newsletters',
      src:
        'https://paladin-photo-library.s3.us-east-1.amazonaws.com/sports-roundup_logo_banner_color.svg',
      description:
        'A newsletter from the Sports Editor with comprehensive updates on the Paladins and special features including video interviews with Furman athletes.',
      color: 'rgba(114,46,151,.16)',
    },
    {
      href: '/newsletters',
      src:
        'https://paladin-photo-library.s3.us-east-1.amazonaws.com/the-works_logo_banner_color.svg',
      description:
        'A casual newsletter tracking the latest trends sweeping the student body, highlighting creative talent, and shining a light on the best (and worst) aspects of campus culture at Furman.',
      color: 'rgba(114,46,151,.16)',
    },
    {
      href: '/newsletters',
      src:
        'https://paladin-photo-library.s3.us-east-1.amazonaws.com/zoomuni_logo_banner_background.svg',
      description:
        'The ZoomUni podcast examines how changes in politics and culture are affecting college communities across the country through long-form interviews with a new special guest each week.',
      color: 'rgba(26,36,145,.36)',
    },
    {
      href: '/newsletters',
      src:
        'https://paladin-photo-library.s3.us-east-1.amazonaws.com/sunday-summary_logo_banner_background.svg',
      description:
        'Editor-in-Chief Emeritus Evan Myers’ examinations of last week’s biggest stories, expositions on the best and worst that Furman has to offer, and expectations for the week ahead.',
      color: 'rgba(114,46,151,.16)',
    },
  ];

  $: width = width;
</script>

<div class={'outer'} bind:offsetWidth={width}>
  <div class={'inner'}>
    <h1>Paladin Plus</h1>
    <div class={'sub'}>
      A campus-focused subscription service written by students for the Furman community.
    </div>
    <div class={'button-row'}>
      <Button on:click={() => goto('/newsletters')}>Subscribe</Button>
    </div>
    <div
      class={'grid'}
      style={`grid-template-columns: ${
        width > 1200
          ? '1fr 1fr 1fr 1fr'
          : width > 990
          ? '1fr 1fr 1fr'
          : width <= 560
          ? '1fr'
          : '1fr 1fr'
      };`}>
      {#each items as item}
        <div>
          <div class={'card'}>
            <a href={item.href}>
              <img src={item.src} alt={''} />
            </a>
          </div>
          <div class={'description'}>{item.description}</div>
        </div>
      {/each}
    </div>
  </div>
</div>
