<script lang="ts">
  import Container from '$lib/components/Container.svelte';
</script>

<Container backgroundColor="var(--topbar-bg)">
  <nav>
    <div><a href="/category/news">News</a></div>
    <div><a href="/category/opinions">Opinions</a></div>
    <div><a href="/category/diversions">Diversions</a></div>
    <div class="dropdown-container">
      <a href="/category/sports" class="showArrow">Sports</a>
      <div class="dropdown">
        <a href="/category/sports/influential-paladin">Influential Paladin</a>
        <a href="/category/sports/sports-photos">Sports Photos</a>
      </div>
    </div>
    <div><a href="/category/photos">Photos</a></div>
  </nav>
</Container>

<Container backgroundColor="#222222">
  <div class="header">
    <h2><a href={`/`}>The Paladin</a></h2>
    <h4>Serving the Furman Community</h4>
  </div>
</Container>

<style>
  nav {
    display: flex;
    flex-wrap: wrap;
  }
  nav > div > a,
  div.dropdown > a {
    display: block;
    padding: 21px 15px;
    color: #999999;
    text-decoration: none;
    font-family: var(--font-detail);
    font-size: 0.9rem;
    position: relative;
  }
  nav > div > a:hover,
  div.dropdown > a:hover {
    color: #e0e0e0;
    background: #1d1d20;
  }
  nav > div > a:active,
  div.dropdown > a:active {
    color: #e0e0e0;
    background: #0c0c0d;
  }

  a.showArrow {
    padding-right: 30px;
  }
  a.showArrow:hover::after {
    border-top-color: #e0e0e0;
  }
  a.showArrow::after {
    border: 4px solid transparent;
    border-top-color: #777777;
    content: '';
    display: block;
    margin-top: -1px;
    position: absolute;
    right: 15px;
    top: 50%;
  }

  div.dropdown-container > div.dropdown {
    display: none;
  }
  div.dropdown-container:hover > div.dropdown {
    display: flex;
  }

  div.dropdown {
    position: absolute;
    z-index: 10;
    background-color: #1d1d20;
    flex-direction: column;
  }
  div.dropdown > a {
    min-width: 190px;
    padding: 15px;
  }
  div.dropdown > a:not(a:last-of-type) {
    border-bottom: 1px solid #666666;
  }

  .header {
    padding: 40px 0;
  }

  h2 {
    font-size: 1.5em;
    font-weight: 900;
    letter-spacing: 2px;
    text-shadow: 0 1px 0 #111111;
    text-transform: uppercase;
    font-family: var(--legacy-font-body);
    margin: 0;
  }
  h2 > a {
    color: #ffffff;
    text-decoration: none;
  }
  h2 > a:hover {
    color: rgb(var(--legacy-primary));
  }
  h4 {
    color: #999;
    font-family: var(--legacy-font-headline);
    font-size: 0.9em;
    font-style: italic;
    line-height: 115%;
    margin: 11px 0 0;
    font-weight: 400;
  }

  @media (max-width: 500px) {
    nav > div > a,
    div.dropdown > a {
      padding: 8px 10px;
    }

    a.showArrow {
      padding-right: 10px;
    }
    a.showArrow::after {
      content: none;
    }

    div.dropdown-container:hover > div.dropdown {
      display: none;
    }
  }
</style>
