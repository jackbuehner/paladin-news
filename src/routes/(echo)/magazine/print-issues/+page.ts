import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
  throw redirect(307, `https://scholarexchange.furman.edu/echo/all_issues.html`);
};
