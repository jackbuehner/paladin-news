import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
  if (params.category === 'paladin-newspaper') throw redirect(307, `/`);
  if (params.category === 'bonhomie') throw redirect(307, `/bonhomie`);
  if (params.category === 'echo') throw redirect(307, `/echo`);
  if (params.category === 'paladin-network') throw redirect(307, `/func`);
  if (params.category === 'wpls') throw redirect(307, `/wpls`);

  throw redirect(307, `/section/${params.category}`);
};
