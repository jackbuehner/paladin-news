<script lang="ts">
  import Container from '$lib/components/Container.svelte';
</script>

<svelte:head>
  <title>WPLS – The Paladin</title>
</svelte:head>

<Container>
  <h1>WPLS</h1>
  <img
    src="https://ik.imagekit.io/paladin/2018/09/img_4859.jpg?w=2400"
    alt="Computers, speakers, headphones, and microphones on the table in the old WPLS office"
  />
  <p>
    WPLS provides students with the opportunity to understand and take part in radio. Show hosts
    have access to studio equipment in which they will be trained and can experiment with on their
    own time. Show topics can be whatever the host would like to discuss on air, a wide range of
    topics is encouraged! WPLS is currently ran by the two co-managers, Garon Joannou and Allie
    Bolton, who seek to provide a platform in which students can feel free to express themselves in
    anyway they chose to over the airways. If you are interested in joining, or would just like some
    more information on the club, feel free to email either manager through their Furman emails.
  </p>
</Container>

<style>
  img {
    width: 100%;
    margin-bottom: 2.625em;
  }
  h1 {
    font-family: var(--legacy2-font);
    font-size: 28px;
    line-height: 1.225;
    margin-top: 3em;
    margin-bottom: 1.05em;
  }
  p,
  h1 {
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
