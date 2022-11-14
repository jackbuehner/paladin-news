import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
  throw redirect(307, 'https://app.mobilecause.com/vf/DinsDonate/team/PaladinNewspaper');
};
