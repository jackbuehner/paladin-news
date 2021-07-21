<script lang="ts">
  import PageHeading from '/src/components/PageHeading.svelte';
</script>

<PageHeading>Contact us</PageHeading>

<form name="contact" data-netlify="true">
  <p>
    <label>Name <input type="text" name="name" /></label>
  </p>
  <p>
    <label>Email <input type="email" name="email" /></label>
  </p>
  <p>
    <label>Phone <input type="phone" name="phone" /></label>
  </p>

  <p>
    <label
      >Reason<select name="reason[]">
        <option value="tip">News tips</option>
        <option value="advertise">Advertise on <i>The Paladin</i></option>
        <option value="contribute">Contribute an article or photo</option>
        <option value="donate">Support <i>The Paladin</i> with a donation</option>
        <option value="join">Join our team</option>
        <option value="join">Other</option>
      </select></label>
  </p>
  <p>
    <label>Message<textarea name="message" /></label>
  </p>
  <p>
    <button type="submit">Send</button>
  </p>
</form>
