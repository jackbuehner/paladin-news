<script context="module" lang="ts">
  import type { LoadInput, LoadOutput } from '@sveltejs/kit';

  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load({ page }: LoadInput): Promise<LoadOutput> {
    const redirectPages = [
      '/news',
      '/opinions',
      '/sports',
      '/diversity-matters',
      '/arts-culture',
      '/arts',
      '/campus-culture',
    ];

    if (redirectPages.includes(page.path)) {
      return {
        status: 301, // permanent redirect
        redirect: `/section${page.path}`,
      };
    }

    return {
      status: 404,
    };
  }
</script>
