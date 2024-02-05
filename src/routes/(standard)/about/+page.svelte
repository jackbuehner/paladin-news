<script lang="ts">
  import Container from '$lib/components/Container.svelte';
  import PageHeading from '$lib/components/PageHeading.svelte';
</script>

<svelte:head>
  <title>About – The Paladin</title>
</svelte:head>

<PageHeading>Who we are</PageHeading>

<Container>
  <div class={'wrapper'}>
    <div>
      <p>
        <i>The Paladin</i> is more than just a student news network; it's the voice of Furman's students.
        As Furman University's only independent student news network, it is our responsibility to offer
        in-depth coverage of campus news and provide a platform for the content our community needs and
        wants.
      </p>
      <p>
        Established in 1916 as a print newspaper, we continue the tradition of providing the student
        body's perspective on issues affecting the Furman community in a more-frequent, digital
        format.
      </p>
      <p>
        <i>The Paladin</i> is a student-run organization and is editorially independent from Furman University.
        It benefits the campus of Furman University and the Greenville area. Any opinions do not necessarily
        reflect the opinion of Furman University or any representatives of Furman.
      </p>
    </div>
    <aside class={'sidebar'}>
      <h2>Our team</h2>
      <div><a href={'/team'}>Current team</a></div>
      <div><a href={'/team/all'}>All past and present members</a></div>
      <h2>Archives</h2>
      <div>
        <a href={'https://cdm16821.contentdm.oclc.org/cdm/landingpage/collection/p16821coll21'}
          ><i>The Hornet</i>, 1916-1961</a
        >
      </div>
      <div>
        <a href={'https://cdm16821.contentdm.oclc.org/cdm/landingpage/collection/p16821coll21'}
          ><i>The Furman Paladin</i>, 1962-1969</a
        >
      </div>
      <div>
        <a href={'https://cdm16821.contentdm.oclc.org/cdm/landingpage/collection/p16821coll21'}
          ><i>The Paladin</i>, 1970-2019</a
        >
      </div>
      <h2>Video media</h2>
      <div>
        <a href={'https://www.youtube.com/channel/UC3UaWOCIldF5_qWnCYEt0RQ'}
          >Furman University News Channel</a
        >
      </div>
      <h2>Social media</h2>
      <div><a href={'https://twitter.com/thepaladin_news'}>Twitter</a></div>
      <div><a href={'https://www.facebook.com/thepaladin.news'}>Facebook</a></div>
      <div><a href={'https://instagram.com/thepaladin.news'}>Instagram</a></div>
      <div><a href={'https://www.linkedin.com/company/thepaladin/'}>Linkedin</a></div>
    </aside>
  </div>
</Container>

<style>
  div {
    font-size: 17px;
    font-family: var(--font-detail);
    line-height: 1.7;
    font-weight: 400;
    color: var(--color-neutral-dark);
  }
  .wrapper {
    display: flex;
    flex-direction: row;
    gap: 16px;
  }
  .sidebar {
    width: 360px;
    flex-grow: 0;
    flex-shrink: 0;
  }
  @media (max-width: 990px) {
    .wrapper {
      flex-direction: column;
    }
    .sidebar {
      width: 100%;
    }
  }

  a {
    color: rgb(var(--primary-lighter));
    box-shadow: 0 1px 0 0 rgb(var(--primary));
    transition:
      background-color 0.2s,
      box-shadow 0.1s,
      color 0.2s;
    text-decoration: none;
  }
  a:hover {
    box-shadow: 0 2px 0 0 rgb(var(--primary));
    background-color: rgba(var(--primary), 0.1);
    color: var(--color-neutral-dark);
  }
  a:active {
    background-color: rgba(var(--primary), 0.16);
  }
  aside h2 {
    font-size: 22px;
    margin: 20px 0 0 0;
  }
  aside h2:first-of-type {
    margin-top: 0;
  }
</style>
