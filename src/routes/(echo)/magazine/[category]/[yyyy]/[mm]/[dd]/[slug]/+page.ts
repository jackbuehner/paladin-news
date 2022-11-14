import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ data, params }) => {
  const { date, slug } = data;

  // ensure that the url month and day have leading zeros
  const isMonthShortForm = params.mm.length !== 2;
  const isDayShortForm = params.dd.length !== 2;
  if (isMonthShortForm || isDayShortForm) {
    throw redirect(
      307,
      `/magazine/${params.category}/${date.year}/${date.month}/${date.day}/${slug}`
    );
  }

  return data;
};
