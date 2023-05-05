<script lang="ts">
  import PageHeading from '$lib/components/PageHeading.svelte';
  import ThePaladinLogoAlt from '$lib/components/svgs/ThePaladinLogoAlt.svelte';
</script>

<div class="header">
  <img src="/images/logos/Sustainable Furman Question Background CLEAN.svg" alt="" />
  <div class="text">
    <div class="brand">
      <span style="font-family: 'Adobe Thai', 'Adamant BG', Georgia, serif; font-size: 130%;">
        THE PALADIN
      </span>
      <span>+</span>
      <span style="font-family: Arial, sans-serif;">furman eco reps</span>
    </div>
    <h1>Sustainable Furman?</h1>
    <p>
      Over the course of the 2022-2023 academic year, we investigated the state of sustainability at
      Furman University. The university has accomplished a lot towards advancing sustainability, but
      efforts have lost momentum in recent years. Read the articles in our series to get the full
      picture.
    </p>
    <p class="scroll-note">Scroll down to view the entire series</p>
  </div>
  <style>
    :root {
      --topbar-bg: #333;
      --topbar-border-color: #333;
      --topbar-color: #e0e0e0;
    }
  </style>
</div>

<PageHeading>Sustainable Furman?</PageHeading>

<style>
  .header {
    position: relative;
    width: 100%;
  }

  img {
    width: 100%;
    height: calc(100vh - 52px);
    object-fit: cover;
    background-color: #54585a;
  }

  div.text {
    position: absolute;
    top: 0;
    width: 100%;
    height: calc(100vh - 52px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    text-shadow: 0 0 7px #000, 0 0 10px #000, 0 0 16px #000000bc, 0 0 21px #00000098,
      0 0 42px #00000077, 0 0 82px #0000003e;
    padding: 20px;
    color: white;
  }

  .brand {
    font-size: 20px;
    margin-bottom: -45px;
    z-index: 9;
    font-weight: 600;
  }

  p {
    font-family: var(--font-headline);
    font-weight: 600;
    font-size: 24px;
    max-width: 1200px;
  }

  .scroll-note {
    font-family: var(--font-detail);
    font-size: 20px;
    font-style: italic;
  }

  h1 {
    font-family: var(--font-headline);
    text-transform: uppercase;
    font-style: italic;
    font-size: 80px;
    line-height: 1;
  }

  @media (max-width: 700px) {
    .brand {
      margin-bottom: -30px;
    }
    h1 {
      font-size: 60px;
    }
    p {
      font-size: 22px;
    }
    .scroll-note {
      font-size: 18px;
    }
  }

  @media (max-width: 550px) {
    .brand {
      margin-bottom: 0px;
      position: absolute;
      bottom: 10px;
    }
    h1 {
      font-size: 40px;
    }
    p {
      font-size: 18px;
    }
    .scroll-note {
      font-size: 16px;
    }
  }
</style>
