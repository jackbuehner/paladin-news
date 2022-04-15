import { writable } from 'svelte/store';

export const articlePhotoRect = writable<DOMRect>(undefined);
