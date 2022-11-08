<script lang="ts">
  import Container from '$lib/components/Container.svelte';
  import { title } from '$lib/stores/title';

  title.set('The Echo');
</script>

<Container>
  <h1>The Echo</h1>
  <img
    class="logo"
    src="https://ik.imagekit.io/paladin/2018/08/19436780_1929537007261182_1345695034309083136_n-e1534793823853.jpg?w=150&zoom=2"
    alt="The Echo. Furman University's Literary Magazine."
  />
  <p>
    Since its birth in 1893, <i>The Echo</i> has developed a rich history, serving the Furman
    community not only as an esteemed publication of student literary and art works but also, and
    perhaps more importantly, as a location of conversation and communion among writers, artists,
    and readers.
    <i>The Echo</i> seeks to publish innovative work by promising writers and artists and to expose members
    of the editorial board to the process of editing and producing a literary magazine.
  </p>
  <p>
    If you’d like to become involved in <i>The Echo</i>, be sure to look out for the Editorial Board
    application this fall on SyncDin or contact us at furman.echo@gmail.com.
  </p>
  <p>
    Want to see <i>The Echo</i> firsthand? Drop by the English lounge to browse the collection of
    past issues, or access them online:
    <a href="https://scholarexchange.furman.edu/echo">https://scholarexchange.furman.edu/echo</a>.
  </p>
  <p>
    Follow us on Instagram for behind the scenes content, upcoming event details, and more <a
      href="https://www.instagram.com/furman.echo/">@furman.echo</a
    >
  </p>
  <figure>
    <img src="https://ik.imagekit.io/paladin/2018/08/echo-2.jpg" alt="" />
    <figcaption>The 2017-2018 Editorial Board</figcaption>
  </figure>
  <img
    src="https://ik.imagekit.io/paladin/2018/08/24327437_921237631378639_7720734452258701312_n.jpg"
    alt="A close side view of a table with on old copy of The Echo, an Underwood typewriter, and a mug with The Echo's logo."
  />
</Container>

<style>
  figure,
  img {
    display: block;
    max-width: 840px;
    margin: 0 auto;
  }
  figure {
    margin-top: 20px;
    margin-bottom: 20px;
  }
  figcaption {
    font-family: var(--legacy2-font);
    font-size: 16px;
    font-weight: 700;
  }
  img.logo {
    width: 150px;
    height: 150px;
    margin-bottom: 1.75em;
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
