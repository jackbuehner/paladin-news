<style>
  h2 {
    font-family: var(--font-detail);
    color: var(--color-neutral);
    font-size: 20px;
    margin: 20px 0 0 0;
    line-height: 32px;
  }
  div.description {
    font-size: 16px;
    font-family: var(--font-detail);
    line-height: 1.3;
    font-weight: 400;
    color: var(--color-neutral);
    margin: 8px 0 10px 0;
  }
  div.note {
    font-size: 14px;
    font-family: var(--font-detail);
    line-height: 1.3;
    font-weight: 400;
    color: var(--color-neutral);
    margin: 0px 0 8px 0;
  }
  div.applyrow {
    display: flex;
    flex-direction: row;
    gap: 16px;
    align-items: center;
    font-size: 13px;
    font-family: var(--font-detail);
    color: var(--color-neutral-light);
  }
</style>

<script lang="ts">
  import PageHeading from '../components/PageHeading.svelte';

  import Container from '../components/Container.svelte';
  import Button from '../components/Button.svelte';

  type JobsType = {
    title: string;
    note: string;
    description: string;
    form?: string;
    formTime?: string;
  };
  const jobs: JobsType[] = [
    {
      title: 'Writer',
      note: '$15 per article',
      description: `
        Passionate about anything on campus and want to write about it? Fill out our short application to let us know you are interested in writing!
      `,
      form: 'https://forms.office.com/Pages/ResponsePage.aspx?id=2fdi-EbxGEWm-58uqC08gEsJCrlx8F1JqSx6fdQssF5UMFMwOFY5VUEySzBCODVORERHS1JUR04zUSQlQCN0PWcu',
      formTime: '1-3 minutes',
    },
    {
      title: 'Sports Editor',
      note: '4 hours per week; $10.00/hr',
      description: `
        <ul style="margin: 0;">
          <li>Manage the sports section of <i>The Paladin</i>.</li>
          <li>Effectively communicate with writers editors to produce articles for the sports section.</i></li>
          <li>Attend weekly board meetings.</i></li>
          <li>Must have a general interest in Furman sports.</i></li>
        </ul>
      `,
      form: 'https://forms.office.com/Pages/ResponsePage.aspx?id=2fdi-EbxGEWm-58uqC08gEsJCrlx8F1JqSx6fdQssF5UM1dIWktMOENBS0cxNkUxN0EwWFdSMEwxVyQlQCN0PWcu',
      formTime: '< 10 minutes',
    },
    {
      title: 'Producer, <i>The Royal Flush</i>',
      note: '1 hour per week; $9.00/hr',
      description: `
        <ul style="margin: 0;">
          <li>Produce <i>The Royal Flush</i>, our weekly restroom newsletter.</li>
          <li>Aggregate upcoming campus events and identify top articles from The Paladin Newspaper.</i></li>
          <li>Coordinate advertisement space with the Ads Manager</i>.</li>
          <li>Submit <i>The Royal Flush</i> to press by Friday morning of each week.</li>
          <li>Provide printed copies of <i>The Royal Flush</i> to the distribution team.</i></li>
        </ul>
      `,
      form: 'https://forms.office.com/Pages/ResponsePage.aspx?id=2fdi-EbxGEWm-58uqC08gEsJCrlx8F1JqSx6fdQssF5UNFZDU0JSWFMySExDNlMyUTNVVEMwNkJMMCQlQCN0PWcu',
      formTime: '1-2 minutes',
    },
    {
      title: 'Distributer, <i>The Royal Flush</i> (Male)',
      note: '25 minutes every Sunday; $8.00',
      description: `
        <ul style="margin: 0;">
          <li>Post copies of <i>The Royal Flush</i> in select restrooms on campus <strong>on Sundays</strong>.</li>
          <li>Must be able to enter men's restrooms on campus.</li>
        </ul>
      `,
      form: 'https://forms.office.com/Pages/ResponsePage.aspx?id=2fdi-EbxGEWm-58uqC08gEsJCrlx8F1JqSx6fdQssF5UNjQwUzFRRDA0MzhST0owWVhRSDM3WThSSSQlQCN0PWcu',
      formTime: '1-2 minutes',
    },
    {
      title: 'Distributer, <i>The Royal Flush</i> (Female)',
      note: '25 minutes every Sunday; $8.00',
      description: `
        <ul style="margin: 0;">
          <li>Post copies of <i>The Royal Flush</i> in select restrooms on campus <strong>on Sundays</strong>.</li>
          <li>Must be able to enter women's restrooms on campus.</li>
        </ul>
      `,
      form: 'https://forms.office.com/Pages/ResponsePage.aspx?id=2fdi-EbxGEWm-58uqC08gEsJCrlx8F1JqSx6fdQssF5UNjQwUzFRRDA0MzhST0owWVhRSDM3WThSSSQlQCN0PWcu',
      formTime: '1-2 minutes',
    },
    {
      title: 'Web Editor',
      note: '4 hours per week; $9.00/hr',
      description: `
      You will be expected to assist the Digital Director with the following responsibilities:
        <ul style="margin: 0 0 6px 0;">
          <li>Manage select website content.</li>
          <li>Add new features and experiences to the website.</li>
          <li>Diagnose any issues that may occur on the website.</li>
          <li>Assist writers and editors with the software we use.</li>
        </ul>
        For this job, you will need to be familiar with <a href="https://developer.mozilla.org/en-US/docs/Web/HTML">HTML</a>, <a href="https://developer.mozilla.org/en-US/docs/Web/CSS">CSS</a>, and <a href="https://developer.mozilla.org/en-US/docs/Web/javascript">JavaScript</a>. We will help you learn these programming languages. We will not expect you to be capable of doing all of the requirements listed above when you first start.
      `,
      form: 'https://forms.office.com/Pages/ResponsePage.aspx?id=2fdi-EbxGEWm-58uqC08gEsJCrlx8F1JqSx6fdQssF5UMlo1RFc2RUg4N0hOUFlFQ0ZTOUZBT1I0VSQlQCN0PWcu',
      formTime: '4-6 minutes',
    },
  ];
</script>

<PageHeading type={'blockCentered'}>Jobs</PageHeading>
<Container>
  {#each jobs as job}
    <div>
      <h2>{@html job.title}</h2>
      <div class={'note'}>{@html job.note}</div>
      <div class={'description'}>{@html job.description}</div>
      {#if job.form}
        <div class={'applyrow'}>
          <Button href={job.form}>Apply</Button>
          <span>{job.formTime}</span>
        </div>
      {/if}
    </div>
  {/each}
</Container>
