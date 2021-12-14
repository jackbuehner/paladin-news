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

  import { Header, SH, QuickLinks } from '../../../components/sites/myfurman';

  onMount(() => {
    const currentFavicon = document.head.querySelector('link[rel="icon"]');
    currentFavicon.setAttribute('type', 'image/svg+xml');
    currentFavicon.setAttribute('href', '/sites/myfurman/favicon.svg');
  });
</script>

<svelte:head>
  <link rel="stylesheet" href="https://use.typekit.net/uti5owu.css" />
  <title>myFurman</title>
</svelte:head>

<vars>
  <Header />
  <div class={'grid'}>
    <QuickLinks
      links={[
        {
          name: 'Outlook Online',
          description: 'Online email access',
          imgsrc: '/sites/myfurman/icons/outlook.png',
          href: 'http://outlook.com/furman.edu',
        },
        {
          name: 'Office 365 Online',
          description: 'Word, Excel, PowerPoint, OneNote',
          imgsrc: '/sites/myfurman/icons/office365.png',
          href: 'https://portal.office.com',
        },
        {
          name: 'Moodle',
          description: 'Course resources',
          imgsrc: '/sites/myfurman/icons/moodle.png',
          href: 'https://courses.furman.edu',
        },
        {
          name: 'Workday',
          description: 'Academics, tuition, finance, payroll',
          imgsrc: '/sites/myfurman/icons/workday.png',
          href: 'https://wd5.myworkday.com/furman',
        },
        {
          name: 'Housing',
          description: 'Housing lottery and express checkout',
          imgsrc: '/sites/myfurman/icons/housing.png',
          href: 'https://furman.datacenter.adirondacksolutions.com/furman_thdss_prod',
        },
        {
          name: 'Box',
          description: 'Storage and shared folders',
          imgsrc: '/sites/myfurman/icons/box.png',
          href: 'http://furman.app.box.com',
        },
        {
          name: 'OneDrive',
          description: 'Storage and collaborative documents',
          imgsrc: '/sites/myfurman/icons/onedrive.png',
          href: 'https://furman-my.sharepoint.com',
        },
        {
          name: 'Academic Calendar',
          description: 'Important dates',
          imgsrc: '/sites/myfurman/icons/calendar.png',
          href: 'https://www.furman.edu/academics/university-calendar/',
        },
        {
          name: 'CLP Calendar',
          description: 'Cultural Life Program events',
          imgsrc: '/sites/myfurman/icons/clp-calendar.png',
          href: 'https://www.furman.edu/academics/cultural-life-program/upcoming-clp-events/',
        },
        {
          name: 'Furman Wiki',
          description: 'Collaborative wikis and support resources',
          imgsrc: '/sites/myfurman/icons/confluence.png',
          href: 'https://confluence.furman.edu:8443/',
        },
        {
          name: 'Hours of Operations',
          description: 'Libraries, dining, and other campus services',
          imgsrc: '/sites/myfurman/icons/clock.png',
          href: '/hours',
        },
        {
          name: 'Libraries',
          description: 'Resources and services',
          imgsrc: '/sites/myfurman/icons/library.png',
          href: 'https://library.furman.edu/',
        },
        {
          name: 'Room Reservation',
          description: 'Event and room coordination',
          imgsrc: '/sites/myfurman/icons/reserve.png',
          href: 'https://25live.collegenet.com/furman/',
        },
        {
          name: 'Success@Furman',
          description: 'Advising and support services',
          imgsrc: '/sites/myfurman/icons/starfish.png',
          href: 'https://furman.starfishsolutions.com/starfish-ops',
        },
        {
          name: 'syncDIN',
          description: 'Student organizations',
          imgsrc: '/sites/myfurman/icons/student-orgs.png',
          href: 'https://furman.campuslabs.com/engage/account/login?returnUrl=/engage/',
        },
        {
          name: 'Technology Help',
          description: 'IT Service Center assistance',
          imgsrc: '/sites/myfurman/icons/tech-support.png',
          href: 'https://www.furman.edu/offices-services/information-technology-services/',
        },
      ]} />
  </div>
</vars>
