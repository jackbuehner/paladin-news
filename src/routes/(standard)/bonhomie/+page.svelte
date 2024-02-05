<script lang="ts">
  import Container from '$lib/components/Container.svelte';
</script>

<svelte:head>
  <title>Bonhomie – The Paladin</title>
</svelte:head>

<Container>
  <h1>Bonhomie</h1>
  <p>
    <i>The Bonhomie</i> has been Furman’s yearbook for over 100 years. Published each spring, it contains
    noteworthy news and events from the past school year, features of different students and student
    organizations, as well as the traditional headshots of Furman’s student body.
  </p>
  <h2>Yearbook Portraits</h2>
  <p>
    <i>The Bonhomie</i> will have a photographer coming to campus on August 27th and 28th from 9-2 as
    well as September 26th and 27th from 11-2. The photographer will be in the bottom lobby of Trone
    Student Center. All students are welcome and encouraged to take their photo during this time.
  </p>
  <h2>Senior Dedications</h2>
  <p>
    <i>The Bonhomie</i> also contains personal dedications for Seniors. You can purchase one for your
    graduating student that includes your personalized message and photo(s).
  </p>
  <p>
    Senior dedications can be completed online at
    <a href="https://yearbookordercenter.com/">YearbookOrderCenter.com</a>. When prompted, enter
    Furman’s school order number: <strong>13919</strong>
  </p>
  <p>
    All photos become property of <i>The Bonhomie</i>. The deadline for submitting a dedication is
    October 1.
  </p>
  <p>Thank you and Go ‘Dins!</p>
</Container>

<style>
  h1 {
    font-family: var(--legacy2-font);
    font-size: 28px;
    line-height: 1.225;
    margin-top: 3em;
    margin-bottom: 1.05em;
  }
  h2 {
    font-family: var(--legacy2-font);
    font-size: 20px;
    line-height: 1.225;
    margin-top: 1.5em;
  }
  p,
  h1,
  h2 {
    max-width: 840px;
    margin-left: auto;
    margin-right: auto;
    color: var(--color-neutral-dark);
  }
  p {
    font-family: var(--legacy2-font);
    font-size: 16px;
    line-height: 1.75;
  }
</style>
