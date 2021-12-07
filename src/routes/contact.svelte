<style>
  form > div {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: repeat(4, auto);
    gap: 0 20px;
  }
  :global(div.kw-alert) {
    font-family: var(--font-detail);
    font-size: 14px;
    border-radius: var(--radius);
  }
  :global(div.kw-alert-warning) {
    color: hsl(37, 98%, 38%);
    background-color: hsl(43, 100%, 96%);
    border: 1px solid hsla(37, 98%, 38%, 0.1);
  }
  :global(div.kw-alert-error) {
    color: hsl(352, 100%, 61%);
    background-color: hsl(351, 100%, 96%);
    border: 1px solid hsla(352, 100%, 61%, 0.1);
  }
</style>

<script context="module" lang="ts">
  import { title } from '../stores/title';
  /** @type {import('@sveltejs/kit').Load} */
  export async function load() {
    // set the document title
    title.set('Contact us');

    return { status: 200 };
  }
</script>

<script lang="ts">
  import PageHeading from '/src/components/PageHeading.svelte';
  import Container from '/src/components/Container.svelte';
  import kwesforms from 'kwesforms';
  import { onMount } from 'svelte';
  import InputGroup from '/src/components/inputs/InputGroup.svelte';
  import InputLabel from '/src/components/inputs/InputLabel.svelte';
  import TextInput from '/src/components/inputs/TextInput.svelte';
  import TextArea from '/src/components/inputs/TextArea.svelte';
  import Select from '/src/components/inputs/Select.svelte';
  import Button from '/src/components/Button.svelte';

  export const prerender = true;

  onMount(() => {
    kwesforms.init();
  });
</script>

<PageHeading>Contact us</PageHeading>

<Container>
  <form class={'kwes-form'} action={'https://kwes.io/api/foreign/forms/Rbxey8Si2EQx3Pui1npq'}>
    <div>
      <InputGroup>
        <InputLabel htmlFor={'first_name'}>First Name</InputLabel>
        <TextInput type={'text'} name={'first_name'} rules={'required|max:255'} />
      </InputGroup>

      <InputGroup>
        <InputLabel htmlFor={'last_name'}>Last Name</InputLabel>
        <TextInput type={'text'} name={'last_name'} rules={'required|max:255'} />
      </InputGroup>

      <InputGroup>
        <InputLabel htmlFor={'email'}>Email</InputLabel>
        <TextInput type={'email'} name={'email'} rules={'required|email'} />
      </InputGroup>

      <InputGroup>
        <InputLabel htmlFor={'phone'}>Phone</InputLabel>
        <TextInput type={'tel'} name={'phone'} rules={'numeric'} />
      </InputGroup>

      <InputGroup style={'grid-area: 3 / 1 / 3 / 3'}>
        <InputLabel htmlFor={'reason'}>Reason for reaching out</InputLabel>
        <Select name={'reason'} rules={'required'}>
          <option value="">Select a reason...</option>
          <option value="tip">News tips</option>
          <option value="advertise">Advertise on <i>The Paladin</i></option>
          <option value="contribute">Contribute an article or photo</option>
          <option value="donate">Support <i>The Paladin</i> with a donation</option>
          <option value="join">Join our team</option>
          <option value="other">Other</option>
        </Select>
      </InputGroup>

      <InputGroup style={'grid-area: 4 / 1 / 4 / 3'}>
        <InputLabel htmlFor={'message'}>Message</InputLabel>
        <TextArea name={'message'} rows={3} rules={'required'} />
      </InputGroup>

      <div><Button htmlType={'submit'}>Submit</Button></div>
    </div>
  </form>
</Container>
