import { writable } from 'svelte/store';
import type { PublicClientApplication } from '@azure/msal-browser';

export const msalInstance = writable<PublicClientApplication>(undefined);
