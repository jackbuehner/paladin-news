<style>
  div {
    width: 100%;
    padding-top: calc(66.6667%);
    height: 0px;
    position: relative;
    margin: 0 0 4px 0;
  }
  img {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    object-fit: cover;
  }
</style>

<script lang="ts">
  export let src: string;
</script>

<div>
  <img {src} alt={''} />
</div>
