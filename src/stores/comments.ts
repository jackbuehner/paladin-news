import { writable } from 'svelte/store';

export const commentsOpen = writable<boolean>(false);
