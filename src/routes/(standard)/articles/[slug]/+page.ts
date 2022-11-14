import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent }) => {
  const { date, slug } = await parent();
  throw redirect(
    307,
    `/articles/${parseInt(date.year)}/${parseInt(date.month)}/${parseInt(date.day)}/${slug}`
  );
};
