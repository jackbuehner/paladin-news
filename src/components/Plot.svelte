<script lang="ts">
  import * as Plot from '@observablehq/plot';

  export let options: Plot.PlotOptions;

  function myplot(node: HTMLElement) {
    node.appendChild(Plot.plot(options));
  }

  const rand = Math.random();
</script>

{#key options}
  <div use:myplot {...$$restProps} />
  <div>
    <pre>{options}</pre>
    <script id={`${rand}`}>
      // // const plotId = document.currentScript.getAttribute('id');
      // div = document.currentScript.parentNode;
      // div?.append(
      //   Plot.rectY({ length: 10000 }, Plot.binX({ y: 'count' }, { x: Math.random })).plot()
      // );
    </script>
  </div>
{/key}
