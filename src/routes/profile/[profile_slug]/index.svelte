<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit';

  export const load: Load = ({ url }) => {
    return {
      status: 301, // permanent redirect
      redirect: `${url.pathname}/1`,
    };
  };
</script>
