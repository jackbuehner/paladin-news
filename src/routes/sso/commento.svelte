<script lang="ts">
  import { Memberstack } from '../../utils/Memberstack';
  import { onMount } from 'svelte';

  let button: HTMLButtonElement;

  onMount(() => {
    Memberstack.reload();

    const memberstackLSKey = JSON.parse(localStorage.getItem('memberstack'));

    // if the user is signed in
    // email is present only when signed in
    if (memberstackLSKey.email) {
      const memberId: string = memberstackLSKey.information.id;

      // redirect to the endpoint that generates the login credentials
      // it will fail if member id is not present
      document.location.href = `${window.location.origin}/sso/commento.json${window.location.search}&member=${memberId}`;
    } else {
      // otherwise, open the sign in prompt
      button.click();

      // override the redirect url to match the current url
      setTimeout(() => {
        let ms = JSON.parse(localStorage.getItem('memberstack'));
        ms.redirectOverride = window.location.pathname + window.location.search;
        localStorage.setItem('memberstack', JSON.stringify(ms));
        // delay by 1 second so that Memberstack.reload() does not replace the changes
      }, 1000);
    }
  });
</script>

<div>Signing you in...</div>

<button on:click={(e) => Memberstack.openLogin(e.target)} href={'#/ms/login'} bind:this={button}
  >Sign in</button>
