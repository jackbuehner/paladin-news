import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent, data, params }) => {
  const { date, slug } = await parent();

  // ensure that the url month and day have leading zeros
  const isMonthShortForm = params.mm.length !== 2;
  const isDayShortForm = params.dd.length !== 2;
  if (isMonthShortForm || isDayShortForm) {
    throw redirect(307, `/articles/${date.year}/${date.month}/${date.day}/${slug}`);
  }

  return data;
};
