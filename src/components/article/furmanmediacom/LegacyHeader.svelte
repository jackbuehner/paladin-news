<script lang="ts">
  import Container from '$lib/components/Container.svelte';
</script>

<Container>
  <div class="masthead">
    <div class="brand"><a href="/">Furman Student Media</a></div>
    <nav>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/bonhomie">Bonhomie</a></li>
        <li><a href="/echo">Echo</a></li>
        <li class="dropdown-container">
          <a href="/" class="showArrow">Paladin Newspaper</a>
          <ul class="dropdown">
            <li><a href="/category/diversions">Diversions</a></li>
            <li><a href="/category/news">News</a></li>
            <li><a href="/category/opinions">Opinions</a></li>
            <li><a href="/category/sports">Sports</a></li>
          </ul>
        </li>
        <li><a href="/func">FUNC</a></li>
        <li><a href="/wpls">WPLS</a></li>
      </ul>
    </nav>
  </div>
</Container>

<style>
  div.masthead {
    padding: 4em 0 2em 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  @media (max-width: 900px) {
    div.masthead {
      display: none;
    }
  }

  div.brand a {
    font-family: var(--legacy2-font);
    font-size: 28px;
    color: var(--color-neutral-dark);
    text-decoration: none;
    font-size: 19.6px;
    font-weight: 700;
  }

  ul {
    list-style: none;
    margin: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0;
    font-family: var(--legacy2-font);
  }

  a {
    color: #686868;
    text-decoration: none;
    transition: background-color 0.2s, box-shadow 0.1s;
  }
  a:hover {
    color: rgb(var(--legacy-primary));
    background-color: rgba(var(--legacy-primary), 0.1);
  }
  a:active {
    background-color: rgba(var(--legacy-primary), 0.16);
  }

  a {
    outline-offset: -8px;
    padding: 0.65625em 0.875em;
    white-space: nowrap;
  }

  a.showArrow {
    padding-right: 30px;
  }
  a.showArrow::after {
    border: 4px solid transparent;
    border-top-color: #686868;
    content: '';
    display: block;
    margin-top: -2px;
    position: absolute;
    right: 15px;
    top: 50%;
  }
  a.showArrow:hover::after {
    border-top-color: rgb(var(--legacy-primary));
  }

  .dropdown-container {
    position: relative;
  }

  .dropdown {
    position: absolute;
    flex-direction: column;
    align-items: flex-start;
    background-color: white;
    border: 1px solid var(--border-dark);
    padding: 2px 0;
    top: 28px;
    z-index: 10;
    min-width: 200px;
  }
  .dropdown li {
    display: flex;
    width: 100%;
  }
  .dropdown li a {
    width: 100%;
  }

  .dropdown-container > .dropdown {
    display: none;
  }
  .dropdown-container:hover > .dropdown {
    display: flex;
  }
</style>
