import type { EndpointOutput } from '@sveltejs/kit';
import type { ServerRequest } from '@sveltejs/kit/types/hooks';

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
async function get(request: ServerRequest): Promise<EndpointOutput> {
  // get the details of the current account
  const currentAccountRes = await fetch(
    (import.meta.env.DEV ? 'http://' : 'https://') + request.host + '/sites/myfurman/me.json',
    {
      headers: { token: request.headers.token },
    }
  );

  if (currentAccountRes.ok) {
    // return the student quick links
    return {
      status: 200,
      body: [
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
      ],
    };
  }

  // return authentication error if there was a failure (me is always available if authenticated)
  return {
    status: 401,
  };
}

export { get };
