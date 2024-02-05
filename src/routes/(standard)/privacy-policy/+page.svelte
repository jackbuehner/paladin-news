<script>
  import Container from '$lib/components/Container.svelte';
  import PageHeading from '$lib/components/PageHeading.svelte';
</script>

<svelte:head>
  <title>Privacy policy – The Paladin</title>
</svelte:head>

<PageHeading type={'blockCentered'}>Privacy policy</PageHeading>

<Container>
  <div>
    <p>
      At&nbsp;<em>The Paladin Network</em>, we collect and manage user data according to the
      following Privacy Policy.
    </p>
    <h2>Data Collected</h2>
    <p>
      We collect information you provide directly to us. For example, we collect information when
      you create an account, subscribe, participate in any interactive features of our services,
      fill out a form, request customer support or otherwise communicate with us. The types of
      information we may collect include your name, email address, postal address, credit card
      information and other contact or identifying information you choose to provide.
    </p>
    <p>
      We collect anonymous data from every visitor of the Website to monitor traffic and fix bugs.
      For example, we collect information like web requests, the data sent in response to such
      requests, the Internet Protocol address, the browser type, the browser language, and a
      timestamp for the request. Data that could be used to identify your device is deleted within
      24 hours.
    </p>
    <p>
      We also use various technologies to collect information, and this may include sending cookies
      to your computer. Cookies are small data files stored on your hard drive or in your device
      memory that helps us to improve our services and your experience, see which areas and features
      of our services are popular and count visits. We may also collect information using web
      beacons (also known as "tracking pixels"). Web beacons are electronic images that may be used
      in our services or emails and to track count visits or understand usage and campaign
      effectiveness.
    </p>
    <h2>Use of the Data</h2>
    <p>
      We only use your personal information to provide you&nbsp;services directly related to <em
        >The Paladin Network</em
      > or to communicate with you about the Website or the services.
    </p>
    <p>
      We employ industry standard techniques to protect against unauthorized access of data about
      you that we store, including personal information.
    </p>
    <p>
      We do not share personal information you have provided to us without your consent, unless:
    </p>
    <ul>
      <li>Doing so is appropriate to carry out your own request</li>
      <li>We believe it's needed to enforce our legal agreements or that is legally required</li>
      <li>
        We believe it's needed to detect, prevent or address fraud, security or technical issues
      </li>
    </ul>
    <h2>Sharing of Data</h2>
    <p>
      We don't share your personal information with third parties. Aggregated, anonymized data is
      periodically transmitted to external services to help us improve the Website and service.
    </p>
    <p>
      We may allow third parties to provide analytics services. These third parties may use cookies,
      web beacons and other technologies to collect information about your use of the services and
      other websites, including your IP address, web browser, pages viewed, time spent on pages,
      links clicked and conversion information. Our website uses Fathom Analytics, an privacy-first
      analytics provider. You can read more about them at <a href="https://usefathom.com/about"
        >usefathom.com/about</a
      >.
    </p>
    <p>
      We also use social buttons that link to services such as Twitter, Facebook, Instagram, and
      LinkedIn. Your use of these third party services is entirely optional. We are not responsible
      for the privacy policies and/or practices of these third party services, and you are
      responsible for reading and understanding those third party services' privacy policies.
    </p>
    <h2>Cookies</h2>
    <p>We may use cookies on our site to remember your preferences.</p>
    <p>
      For more general information on cookies, please read&nbsp;<a
        href="https://www.cookieconsent.com/what-are-cookies/"
        target="_blank"
        rel="noreferrer">"What Are Cookies"</a
      >.
    </p>
    <h2>Opt-Out, Communication Preferences</h2>
    <p>
      You may modify your communication preferences and/or opt-out from specific communications at
      any time. Every email message has an unsubscribe button.
    </p>
    <h2>Security</h2>
    <p>
      We take reasonable steps to protect personally identifiable information from loss, misuse, and
      unauthorized access, disclosure, alteration, or destruction. But, you should keep in mind that
      no Internet transmission is ever completely secure or error-free.
    </p>
    <h2>About Children</h2>
    <p>
      The Website is not intended for children under the age of 13. We do not knowingly collect
      personally identifiable information via the Website from visitors in this age group.
    </p>
    <h2>Changes to the Privacy Policy</h2>
    <p>
      We may amend this Privacy Policy from time to time. Use of information we collect now is
      subject to the Privacy Policy in effect at the time such information is used.
    </p>
    <p>
      If we make major changes in the way we collect or use information, we will notify you by
      posting an announcement on the Website or sending you an email.
    </p>
  </div>
</Container>

<style>
  div {
    font-size: 17px;
    line-height: 1.7;
    font-weight: 400;
    color: var(--color-neutral-dark);
    max-width: 800px;
    margin: 0 auto;
  }
  p {
    font-family: var(--font-detail);
    margin-top: 0;
    margin-bottom: 10px;
  }
  h2 {
    font-family: var(--font-detail);
    font-size: 24px;
    line-height: 32px;
    margin-top: 20px;
    margin-bottom: 10px;
  }
  a {
    color: rgb(var(--primary-lighter));
    box-shadow: 0 1px 0 0 rgb(var(--primary));
    transition:
      background-color 0.2s,
      box-shadow 0.1s,
      color 0.2s;
    text-decoration: none;
  }
  a:hover {
    box-shadow: 0 2px 0 0 rgb(var(--primary));
    background-color: rgba(var(--primary), 0.1);
    color: var(--color-neutral-dark);
  }
  a:active {
    background-color: rgba(var(--primary), 0.16);
  }
</style>
