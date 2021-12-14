<style>
  img {
    width: 48px;
    height: 48px;
  }
  a {
    display: flex;
    flex-direction: row;
    gap: 6px;
    color: inherit;
    text-decoration: none;
    min-width: 360px;
    flex: 1;
    transition: ease 200ms;
    padding: 10px;
    border-radius: var(--radius);
    background-color: transparent;
    border: 1px solid transparent;
    user-select: none;
    -webkit-user-drag: none;
  }
  a:hover {
    background-color: rgba(var(--primary-rgb), 0.12);
    border-color: rgba(var(--primary-rgb), 0.12);
    box-shadow: rgb(0 0 0 / 13%) 0px 1.6px 3.6px 0px, rgb(0 0 0 / 11%) 0px 0.3px 0.9px 0px;
  }
  a:active {
    background-color: rgba(var(--primary-rgb), 0.22);
    border-color: rgba(var(--primary-rgb), 0.22);
    box-shadow: rgb(0 0 0 / 13%) 0px 0.8px 3.6px 0px, rgb(0 0 0 / 11%) 0px 0.15px 0.9px 0px;
  }
  div.label {
    display: flex;
    flex-direction: column;
  }
  div.name {
    font-size: 20px;
    color: var(--on-light);
    font-family: var(--font-ql-name);
    font-style: normal;
    font-weight: 500;
    margin: 0;
  }
  div.description {
    font-size: 16px;
    color: var(--on-light);
    font-family: var(--font-ql-description);
    font-style: normal;
    font-weight: 400;
    margin: -6px 0 0 0;
  }
</style>

<script lang="ts">
  export let name: string;
  export let description: string;
  export let imgsrc: string;
  export let href: string;
</script>

<a {href}>
  <img src={imgsrc} alt={''} />
  <div class={'label'}>
    <div class={'name'}>{name}</div>
    <div class={'description'}>{description}</div>
  </div>
</a>
