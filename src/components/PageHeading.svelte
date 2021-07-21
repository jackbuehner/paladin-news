<style>
  h1 {
    font-family: var(--font-detail);
    font-size: 48px;
    line-height: 48px;
    margin: 0;
    border-bottom: 2px solid black;
    padding: 0 0 10px 0;
    margin: 48px 0 32px 0;
  }
  @media (max-width: 540px) {
    h1 {
      font-size: 32px;
      line-height: 32px;
      margin: 36px 0 24px 0;
    }
  }
</style>

<h1><slot /></h1>
