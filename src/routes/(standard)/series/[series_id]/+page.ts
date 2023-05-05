import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ url, params }) => {
  if (params.series_id === 'susfurman' || params.series_id === 'susfurman?') {
    throw redirect(307, `/series/64545157d626e3eaca3d56b1`);
  }

  throw redirect(307, `${url.pathname}/1`);
};
