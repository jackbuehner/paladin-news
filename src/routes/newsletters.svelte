<script context="module" lang="ts">
  import { title } from '../stores/title';
  /** @type {import('@sveltejs/kit').Load} */
  export async function load() {
    // set the document title
    title.set('Newsletters & notifications');

    return { status: 200 };
  }
</script>

<script lang="ts">
  import PageHeading from '/src/components/PageHeading.svelte';
  import Container from '/src/components/Container.svelte';
  import NewsletterCard from '/src/components/NewsletterCard.svelte';
  import { onMount } from 'svelte';

  /**
    Pass through a blur event for the email input field.
    If the text input has a valid email, set the `email` value in `localStorage`.
  */
  function handleEmailBlur(
    event: FocusEvent & {
      currentTarget: EventTarget & HTMLInputElement;
    }
  ) {
    if (validateEmail(event.currentTarget.value)) {
      localStorage.setItem('email', event.currentTarget.value);
    }
  }

  /**
    Confirm that the email looks like an email.
  */
  function validateEmail(email: string) {
    const regEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regEx.test(email);
  }

  /**
    Submits the EmailOctopus sign up form.
    There must be an email in `localStorage`.
    The event should be a clickevent that occurs inside the form. 
  */
  function submitForm(event: MouseEvent) {
    const email = localStorage.getItem('email');
    if (email) {
      // find the form element that contains the button
      const clickedElem = event.target;
      let formElem;
      let formElemProcess = event.target;
      while (!formElem) {
        // @ts-expect-error parentElement exists
        if (formElemProcess.parentElement.tagName === 'FORM') {
          // @ts-expect-error parentElement exists
          formElem = formElemProcess.parentElement;
        } else {
          // @ts-expect-error parentElement exists
          formElemProcess = formElemProcess.parentElement;
        }
      }
      // set the email field and submit
      const submitButtonElem = formElem.querySelector('[type=submit]');
      const emailFormElem = formElem.querySelector('[type=email]');
      emailFormElem.value = email;
      //@ts-expect-error emailOctopus is added to window
      window.emailOctopus.ajaxSubmit(formElem);
      //submitButtonElem.click();
      window.alert(
        'Thank you for subscribing! Please check your email to confirm your subscription.'
      );
    } else {
      window.alert('Please enter an email address');
    }
  }

  /**
    Fill the email field with the email stored in `localStorage`.
    This is useful because it restores the user's email address, making it easy for a user to subscribe more.
  */
  function fillEmailField(selector = '#EMAIL') {
    const email = localStorage.getItem('email');
    if (email) (document.querySelector(selector) as HTMLInputElement).value = email;
  }
  onMount(() => {
    fillEmailField();
  });
</script>

<PageHeading
  type={'block'}
  width={1000}
  subtitle={'Stay up to date by subscribing to our newsletters and email notifications.'}
  >Newsletters & notifications</PageHeading
>

<div style={'background-color: #f4f4f4; margin: -20px 0; padding: 20px 0'}>
  <Container width={1000}>
    <div class={'disclaimer'}>
      By subscribing, you consent to receiving emails from <em>The Paladin</em> and you agree to our
      <a href={'https://www.thepaladin.news/privacy-policy'}>Privacy Policy</a>. You can unsubscribe
      at any time via the unsubscribe link at the bottom of each email.<br />
    </div>

    <input
      type={'email'}
      data-name={'EMAIL'}
      placeholder={'Email address'}
      id={'EMAIL'}
      on:blur={handleEmailBlur}
    />

    <script src="https://emailoctopus.com/bundles/emailoctopuslist/js/1.6/form-embed.js"></script>

    <iframe id={'formTarget'} title={'formTarget'} style={'display: none;'} />

    <div class={'list'}>
      <NewsletterCard
        icon={'https://paladin-photo-library.s3.amazonaws.com/sunday-summary_logo_square.svg'}
        listId={'15ae10eb-642c-11eb-a3d0-06b4694bee2a'}
        name={'Sunday Summary'}
        description={`Editor-in-Chief Scotty Bryan's examinations of last week’s biggest stories and expectations for the week ahead.`}
        frequency={`Every Sunday`}
        on:click={submitForm}
      />
      <NewsletterCard
        icon={'https://paladin-photo-library.s3.amazonaws.com/paladin-profiles_logo_square.svg'}
        listId={'f90b09cd-64fe-11eb-a3d0-06b4694bee2a'}
        name={'Paladin Profiles'}
        description={`Interviews that highlight the important work Paladins past and present are doing 
      to improve diversity and inclusion on campus and beyond.`}
        frequency={`1-4 per semester`}
        on:click={submitForm}
      />
      <NewsletterCard
        icon={'https://paladin-photo-library.s3.amazonaws.com/the-works_logo_square.svg'}
        listId={'95848d45-6500-11eb-a3d0-06b4694bee2a'}
        name={'The Works'}
        description={`The Paladin’s casual newsletter tracking the latest trends sweeping the student body, 
      highlighting creative talent, and shining a light on the best (and worst) aspects of campus culture at Furman.`}
        frequency={`Every Friday`}
        on:click={submitForm}
      />
    </div>
    <div style={'border-bottom: 1px solid var(--border-dark); margin-top: 20px;'} />
  </Container>
</div>

<style>
  /* subscription disclaimer */
  .disclaimer {
    margin-bottom: 10px;
    font-family: var(--font-detail);
    font-size: 14px;
    color: var(--color-neutral-light);
  }
  .disclaimer a {
    color: var(--color-neutral-light);
  }
  .disclaimer a:hover {
    color: rgb(var(--primary));
  }

  /* email input */
  #EMAIL {
    display: block;
    width: 100%;
    height: 38px;
    padding: 8px 12px;
    margin-bottom: 10px;
    font-size: 14px;
    line-height: 1.42857143;
    color: #333;
    border: 0 solid #aaa;
    border-radius: 2px;
    background-color: transparent;
    box-shadow: inset 0 0 0 1px #aaa;
    transition: box-shadow 0.2s;
    font-family: Lato, sans-serif;
  }
  #EMAIL:hover {
    box-shadow: inset 0 0 0 1px #333;
  }
  #EMAIL:focus {
    background-color: #fff;
    box-shadow: inset 0 0 0 2px #722e97;
  }

  /* newsletter list */
  .list {
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    grid-auto-columns: minmax(240px, 1fr);
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: auto;
    gap: 10px;
  }
</style>
