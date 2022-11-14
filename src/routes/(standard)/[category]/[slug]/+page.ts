import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, data }) => {
  // these are the only valid section names from
  // the url structure that requires this redirect
  if (
    params.category === 'news' ||
    params.category === 'opinions' ||
    params.category === 'sports' ||
    params.category === 'arts-culture' ||
    params.category === 'videos'
  ) {
    throw redirect(307, `/articles/${params.slug}`);
  }

  return data;
};
