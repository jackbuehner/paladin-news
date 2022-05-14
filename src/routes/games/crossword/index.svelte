<script context="module" lang="ts">
  import type { LoadInput, LoadOutput } from '@sveltejs/kit';
  export async function load({ url }: LoadInput): Promise<LoadOutput> {
    const res = await fetch(`${url.protocol}//${url.hostname}${url.pathname}/all/1/__data.json`);
    const { data } = await res.json();
    if (data) {
      const _id = JSON.parse(data)?.docs?.[0]._id;
      return {
        status: 307, // temporary redirect
        redirect: `${url.pathname}/${_id}`,
      };
    }

    return {
      status: 307, // temporary redirect
      redirect: `${url.pathname}/all/1`,
    };
  }
</script>
