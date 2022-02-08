<script lang="ts">
  export let htmlFor: string;
</script>

<label for={htmlFor}><slot /></label>

<style>
  label {
    font-family: var(--font-detail);
    color: var(--color-neutral-dark);
    display: block;
    margin-bottom: 5px;
    font-weight: 700;
  }
</style>
