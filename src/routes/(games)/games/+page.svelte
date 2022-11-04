<section>
  <a style={`--color: 0, 0, 255;`} href={'/games/sudoku/latest'}><span>Sudoku</span></a>
  <a style={`--color: 0, 128, 0;`} href={'/games/crossword/all'}><span>Crossword</span></a>
</section>

<style>
  section {
    display: grid;
    height: 100%;
    width: 100%;
    flex-grow: 1;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
  }

  @media (max-width: 800px) {
    section {
      grid-template-columns: 1fr;
      grid-template-rows: 1fr 1fr;
    }
  }

  a {
    background-color: rgba(var(--color), 0.3);
    font-family: var(--font-headline);
    font-size: 32px;
    font-weight: 600;
    letter-spacing: 0.42px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #111111;
    user-select: none;
    -webkit-user-drag: none;
    transition: 240ms;
    text-decoration: none;
    font-style: italic;
    text-transform: uppercase;
  }
  a:hover {
    background-color: rgba(var(--color), 0.5);
  }
  a:active {
    background-color: rgba(var(--color), 0.4);
  }
  span {
    filter: drop-shadow(rgb(210 208 206 / 60%) 0px 0px 8px)
      drop-shadow(rgb(210 208 206 / 60%) 0px 0px 4px);
  }
</style>
