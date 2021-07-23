import { writable } from 'svelte/store';

export const headerLabel = writable<string>(undefined);
export const headerIsSatire = writable<boolean>(false);
export const headerNoLogoUntil = writable<number>(0);
