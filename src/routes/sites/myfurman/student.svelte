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
  div.quick-links {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 6px;
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
  vars {
    /* colors */
    --primary-rgb: 88, 44, 131;
    --primary: rgb(var(--primary-rgb));
    --secondary-rgb: 32, 21, 71;
    --secondary: rgb(var(--secondary-rgb));
    --on-dark: #e0e0e0;
    --on-light: #212121;

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
  import { Header, SH, QuickLink } from '../../../components/sites/myfurman';
</script>

<svelte:head>
  <link rel="stylesheet" href="https://use.typekit.net/uti5owu.css" />
</svelte:head>

<vars>
  <Header />
  <div class={'grid'}>
    <div class={'quick-links'}>
      <SH>Quick links</SH>
      <QuickLink
        name="Outlook Online"
        description="Online email access"
        imgsrc={'/sites/myfurman/icons/outlook.png'}
        href={'http://outlook.com/furman.edu'} />
      <QuickLink
        name="Office 365 Online"
        description="Word, Excel, PowerPoint, OneNote"
        imgsrc={'/sites/myfurman/icons/office365.png'}
        href={'https://portal.office.com'} />
      <QuickLink
        name="Moodle"
        description="Course resources"
        imgsrc={'/sites/myfurman/icons/moodle.png'}
        href={'https://courses.furman.edu'} />
      <QuickLink
        name="Workday"
        description="Academics, tuition, finance, payroll"
        imgsrc={'/sites/myfurman/icons/workday.png'}
        href={'https://wd5.myworkday.com/furman'} />
      <QuickLink
        name="Housing"
        description="Housing lottery and express checkout"
        imgsrc={'/sites/myfurman/icons/housing.png'}
        href={'https://furman.datacenter.adirondacksolutions.com/furman_thdss_prod'} />
      <QuickLink
        name="Box"
        description="Storage and shared folders"
        imgsrc={'/sites/myfurman/icons/box.png'}
        href={'http://furman.app.box.com'} />
      <QuickLink
        name="OneDrive"
        description="Storage and collaborative documents"
        imgsrc={'/sites/myfurman/icons/onedrive.png'}
        href={'https://furman-my.sharepoint.com'} />
      <QuickLink
        name="Academic Calendar"
        description="Important dates"
        imgsrc={'/sites/myfurman/icons/calendar.png'}
        href={'https://www.furman.edu/academics/university-calendar/'} />
      <QuickLink
        name="CLP Calendar"
        description="Cultural Life Program events"
        imgsrc={'/sites/myfurman/icons/clp-calendar.png'}
        href={'https://www.furman.edu/academics/cultural-life-program/upcoming-clp-events/'} />
      <QuickLink
        name="Furman Wiki"
        description="Collaborative wikis and support resources"
        imgsrc={'/sites/myfurman/icons/confluence.png'}
        href={'https://confluence.furman.edu:8443/'} />
      <QuickLink
        name="Hours of Operations"
        description="Libraries, dining, and other campus services"
        imgsrc={'/sites/myfurman/icons/clock.png'}
        href={'/hours'} />
      <QuickLink
        name="Libraries"
        description="Resources and services"
        imgsrc={'/sites/myfurman/icons/library.png'}
        href={'https://library.furman.edu/'} />
      <QuickLink
        name="Room Reservation"
        description="Event and room coordination"
        imgsrc={'/sites/myfurman/icons/reserve.png'}
        href={'https://25live.collegenet.com/furman/'} />
      <QuickLink
        name="Success@Furman"
        description="Advising and support services"
        imgsrc={'/sites/myfurman/icons/starfish.png'}
        href={'https://furman.starfishsolutions.com/starfish-ops'} />
      <QuickLink
        name="syncDIN"
        description="Student organizations"
        imgsrc={'/sites/myfurman/icons/student-orgs.png'}
        href={'https://furman.campuslabs.com/engage/account/login?returnUrl=/engage/'} />
      <QuickLink
        name="Technology Help"
        description="IT Service Center assistance"
        imgsrc={'/sites/myfurman/icons/tech-support.png'}
        href={'https://www.furman.edu/offices-services/information-technology-services/'} />
    </div>
  </div>
</vars>
