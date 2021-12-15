export { default as Header } from './Header.svelte';
export { default as SH } from './SH.svelte';
export { default as QuickLink } from './QuickLink.svelte';
export { default as QuickLinks } from './sections/QuickLinks.svelte';

export interface QuickLinkType {
  name: string;
  description: string;
  imgsrc: string;
  href: string;
}

export interface AccountType {
  displayName: string;
  mail: string;
  username: string;
}
