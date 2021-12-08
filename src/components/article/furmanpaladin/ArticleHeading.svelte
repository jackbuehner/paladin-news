<style>
  h1 {
    margin: 0;
    font-family: var(--legacy-font-headline);
    font-size: 2.5em;
    line-height: 1.25em;
    font-style: normal;
    font-weight: 900;
    letter-spacing: -1px;
    color: var(--color-neutral-dark);
    margin-bottom: 10px;
    padding-bottom: 16px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  }
  @media (max-width: 600px) {
    h1 {
      font-size: 1.75em;
      line-height: 1.3;
    }
  }
</style>

<h1><slot /></h1>
