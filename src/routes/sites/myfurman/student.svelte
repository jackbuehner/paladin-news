<style>
  div.grid {
    display: grid;
    grid-template-columns: 1fr 300px;
    grid-template-rows: 1fr 1fr;
    grid-template-areas:
      'ql  s1'
      'ql  s2';
    padding: 30px;
  }

  @media (max-width: 1100px) {
    div.grid {
      grid-template-columns: 1fr;
      grid-template-areas:
        'ql'
        's1'
        's2';
    }
  }

  @media (max-width: 700px) {
    div.grid {
      padding: 20px;
    }
  }

  p {
    font-family: var(--font-body);
    color: var(--on-light);
  }

  vars {
    /* colors */
    --primary-rgb: 88, 44, 131;
    --primary: rgb(var(--primary-rgb));
    --secondary-rgb: 32, 21, 71;
    --secondary: rgb(var(--secondary-rgb));
    --on-dark: #e0e0e0;
    --on-light: #212121;
    --border-light: #e0e0e0;

    /* app bar */
    --app-bar-background: #ffffff;
    --app-bar-height: 64px;

    /* fonts */
    --font-logo: 'abril-fatface';
    --font-nav: 'brandon-grotesque';
    --font-heading: 'oswald';
    --font-body: 'brandon-grotesque';
    --font-ql-name: var(--font-body);
    --font-ql-description: var(--font-body);

    /* radius */
    --radius: 3px;
    --radius-round: 50%;

    display: block;
    margin-top: var(--app-bar-height);
  }
</style>

<script lang="ts">
  import { onMount } from 'svelte';
  import {
    AccountType,
    Header,
    QuickLinks,
    QuickLinkType,
  } from '../../../components/sites/myfurman';
  import * as msal from '@azure/msal-browser';
  import { msalInstance } from '../../../stores/msalInstance';
  import { page } from '$app/stores';

  let account: AccountType;
  let links: QuickLinkType[];

  onMount(() => {
    const currentFavicon = document.head.querySelector('link[rel="icon"]');
    currentFavicon.setAttribute('type', 'image/svg+xml');
    currentFavicon.setAttribute('href', '/sites/myfurman/favicon.svg');
  });

  // authenticate and get a bearer token
  let token: string;
  onMount(async () => {
    // configure the Microsoft Authentication Library (MSAL)
    const msalConfig = {
      auth: {
        clientId: import.meta.env.VITE_MSAL_CLIENT_ID as string,
        authority: 'https://login.microsoftonline.com/furman.edu/',
        postLogoutRedirectUri: `${import.meta.env.DEV ? 'http://' : 'https://'}${$page.host}${
          $page.path
        }/done`, // redirect back to this page on logout
      },
    };

    // define common options
    const scopes = ['user.read'];
    const domainHint = 'furman.edu';
    const loginHint = localStorage.getItem('myfurman.last_user');

    // create an instance of MSAL

    $msalInstance = new msal.PublicClientApplication(msalConfig);

    // authenticate
    await (async () => {
      try {
        // check if the code is in the url hash (it is there if the Microsoft already redirected back to the page)
        const result = await $msalInstance.handleRedirectPromise(); // undefined if not available
        if (result) {
          // set the active account to the account that was just authenticated
          $msalInstance.setActiveAccount($msalInstance.getAllAccounts()[0]);
          // save the active account username to localStorage
          // to allow it to be autofilled on next login
          localStorage.setItem('myfurman.last_user', $msalInstance.getActiveAccount().username);
        }

        // otherwise, redirect to login IF there are no accounts
        const accounts = $msalInstance.getAllAccounts();
        if (accounts.length === 0) {
          $msalInstance.loginRedirect({
            scopes,
            domainHint,
            loginHint,
          });
        }
      } catch (error) {
        console.error(error);
      }
    })();

    // aquire a bearer access token
    try {
      const { accessToken } = await $msalInstance.acquireTokenSilent({ scopes });
      token = accessToken;
    } catch (error) {
      if (error instanceof msal.InteractionRequiredAuthError) {
        // fallback to interaction when silent call fails
        return $msalInstance.acquireTokenRedirect({ scopes, domainHint, loginHint });
      }
    }

    if (token) {
      // fetch the data
      const me = await fetch('me.json', { headers: { token } });
      const ql = await fetch('ql.json', { headers: { token } });

      // reload if not signed in (to trigger the sign in process)
      if (me.status === 401 || ql.status === 401) location.reload();

      // set the data
      account = (await me.json()) as AccountType;
      links = (await ql.json()) as QuickLinkType[];
    }
  });
</script>

<svelte:head>
  <link rel="stylesheet" href="https://use.typekit.net/uti5owu.css" />
  <title>myFurman</title>
</svelte:head>

<vars>
  <Header />
  {#if links && account}
    <div class={'grid'}>
      <QuickLinks {links} />
      <p>Signed in as {account.displayName} {`<${account.mail}>`}</p>
    </div>
  {/if}
</vars>
