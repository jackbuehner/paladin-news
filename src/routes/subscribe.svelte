<style>
  .card {
    border: 1px solid var(--border-light);
    border-radius: var(--radius);
    padding: 20px;
    background-color: white;
    margin-bottom: 20px;
  }
  h2 {
    font-family: var(--font-detail);
    font-size: 22px;
    color: var(--color-neutral);
    margin: 0;
  }
  h3 {
    font-family: var(--font-detail);
    font-size: 18px;
    color: var(--color-neutral);
  }
  p,
  li {
    font-family: var(--font-detail);
    font-size: 16px;
    color: var(--color-neutral);
  }
</style>

<script lang="ts">
  import { Memberstack } from '../utils/Memberstack';
  import { onMount } from 'svelte';
  import PageHeading from '/src/components/PageHeading.svelte';
  import Container from '/src/components/Container.svelte';
  import Button from '/src/components/Button.svelte';

  onMount(() => {
    Memberstack.reload();
  });
</script>

<PageHeading type={'block'} width={1000}>Subscribe to The Paladin</PageHeading>

<div style={'background-color: #f4f4f4; margin: -20px 0; padding: 20px 0; height: 100%;'}>
  <Container width={1000}>
    <div class="card">
      <h2>🌟 Premium Supporter - Temporarily Free!</h2>
      <p>
        Show your support for the hard-working students that make The Paladin possible. Your
        financial support through this subscription helps us invest more in our writers, editors,
        and staff.
      </p>
      <h3>What you get:</h3>
      <ul>
        <li>
          Early access to our premium content. Newsletters and articles will always be available to
          you first.
        </li>
        <li>
          Access to our catalog of old content. We are planning to preserve historical articles,
          satire, and photos in an easy-to-use digital format.
        </li>
      </ul>
      <Button href={'#/ms/signup/615643b6f3956300049a895e'}>Subscribe - Temporarily Free!</Button>
    </div>

    <div class="card">
      <h2>✨ Furman Students, Faculty, and Staff</h2>
      <p>Sign up with your @furman.edu or @thepaladin.news email for a free subscription.</p>
      <h3>What you get:</h3>
      <ul>
        <li>All features available in the Premium Supporter subscribtion.</li>
      </ul>
      <Button href={'#/ms/signup/6132570421d01400044ebb8e'}>Subscribe (Furman)</Button>
    </div>
    <div style={'border-bottom: 1px solid var(--border-dark); margin-top: 20px;'} />
  </Container>
</div>
