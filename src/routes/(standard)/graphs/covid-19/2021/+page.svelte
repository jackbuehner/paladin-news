<script lang="ts">
  import Container from '$lib/components/Container.svelte';
  import PositiveCasesLegend from './PositiveCasesLegend.svelte';
  import QuarantineLegend from './QuarantineLegend.svelte';

  export let data;
</script>

<Container>
  <script>
    /**
     * Formats an ISO date to AP style.
     *
     * AP style shortens month names that are longer than 5 characters.
     *
     * AP style follows the format "Month Day, Year".
     *
     * @param date ISO date
     * @returns AP style formatted date
     */
    function formatISODate(
      date,
      ignoreZone = false,
      showWeekday = false,
      showYear = true,
      showTime = false
    ) {
      const formatted = luxon.DateTime.fromISO(date, {
        zone: ignoreZone ? 'utc' : undefined,
      }).toFormat(
        `${showWeekday ? `cccc, ` : ``}LLLL dd${showYear ? `, yyyy` : ``}${
          showTime ? ` 'at' h:mm a` : ``
        }`
      );
      const APFormatted = formatted
        .replace('January', 'Jan.')
        .replace('February', 'Feb.')
        .replace('August', 'Aug.')
        .replace('September', 'Sept.')
        .replace('October', 'Oct.')
        .replace('November', 'Nov.')
        .replace('December', 'Dec.');
      return APFormatted;
    }
  </script>

  <h2>Total Number of Students Tested</h2>
  <script>
    document.addEventListener('DOMContentLoaded', () => {
      const node = document.querySelector('#studentsTestedFigure');

      const studentsTested = [
        {
          Week: '2021-04-22T00:00:00.000Z',
          'Students Tested': 346,
        },
        {
          Week: '2021-04-15T00:00:00.000Z',
          'Students Tested': 383,
        },
        {
          Week: '2021-04-08T00:00:00.000Z',
          'Students Tested': 405,
        },
        {
          Week: '2021-04-01T00:00:00.000Z',
          'Students Tested': 606,
        },
        {
          Week: '2021-03-25T00:00:00.000Z',
          'Students Tested': 566,
        },
        {
          Week: '2021-03-18T00:00:00.000Z',
          'Students Tested': 563,
        },
        {
          Week: '2021-03-11T00:00:00.000Z',
          'Students Tested': 652,
        },
        {
          Week: '2021-03-04T00:00:00.000Z',
          'Students Tested': 583,
        },
        {
          Week: '2021-02-25T00:00:00.000Z',
          'Students Tested': 819,
        },
        {
          Week: '2021-02-18T00:00:00.000Z',
          'Students Tested': 791,
        },
        {
          Week: '2021-02-11T00:00:00.000Z',
          'Students Tested': 729,
        },
        {
          Week: '2021-02-04T00:00:00.000Z',
          'Students Tested': 1115,
        },
        {
          Week: '2021-01-28T00:00:00.000Z',
          'Students Tested': 951,
        },
        {
          Week: '2021-01-21T00:00:00.000Z',
          'Students Tested': 1900,
        },
        {
          Week: '2021-01-14T00:00:00.000Z',
          'Students Tested': 1760,
        },
        {
          Week: '2021-01-07T00:00:00.000Z',
          'Students Tested': 303,
        },
      ];
      const options = {
        marginLeft: 70,
        marginBottom: 70,
        y: { labelAnchor: 'center', labelArrow: 'none' },
        x: { type: 'band' },
        marks: [
          Plot.barY(
            studentsTested.map((row) => ({ ...row, Week: new Date(row.Week) })),
            {
              x: 'Week',
              y: 'Students Tested',
              fill: '#75A1C7',
              tip: {
                format: {
                  x: (x) => formatISODate(new Date(x).toISOString()),
                  y: (y) => `${y}`,
                },
              },
            }
          ),
          Plot.ruleY([0]),
        ],
      };

      // insert the plot with the initial window width
      const plot = Plot.plot({
        ...options,
        width: Math.min(window.innerWidth, 1200),
      });
      if (node) node.innerHTML = '';
      node?.appendChild(plot);

      window.addEventListener('resize', (event) => {
        // insert the plot with the new width
        const plot = Plot.plot({
          ...options,
          width: event.target.innerWidth,
        });
        if (node) node.innerHTML = '';
        node?.append(plot);
      });
    });
  </script>
  <div id="studentsTestedFigure">
    <div class="plot-1200">{@html data.plots.studentsTested}</div>
    <div class="plot-1000">{@html data.plots1000.studentsTested}</div>
    <div class="plot-800">{@html data.plots800.studentsTested}</div>
    <div class="plot-600">{@html data.plots600.studentsTested}</div>
    <div class="plot-400">{@html data.plots400.studentsTested}</div>
  </div>
  <h2>Positive Cases and Positivity Rate among Students</h2>
  <script>
    document.addEventListener('DOMContentLoaded', () => {
      const node = document.querySelector('#positiveCasesFigure');

      const positiveCases = [
        {
          Week: '2021-04-22T00:00:00.000Z',
          'Positive Cases': 1,
          'Positivity Rate': 0.0029,
        },
        {
          Week: '2021-04-15T00:00:00.000Z',
          'Positive Cases': 1,
          'Positivity Rate': 0.0021,
        },
        {
          Week: '2021-04-08T00:00:00.000Z',
          'Positive Cases': 4,
          'Positivity Rate': 0.0099,
        },
        {
          Week: '2021-04-01T00:00:00.000Z',
          'Positive Cases': 6,
          'Positivity Rate': 0.0099,
        },
        {
          Week: '2021-03-25T00:00:00.000Z',
          'Positive Cases': 9,
          'Positivity Rate': 0.0159,
        },
        {
          Week: '2021-03-18T00:00:00.000Z',
          'Positive Cases': 7,
          'Positivity Rate': 0.0124,
        },
        {
          Week: '2021-03-11T00:00:00.000Z',
          'Positive Cases': 16,
          'Positivity Rate': 0.0245,
        },
        {
          Week: '2021-03-04T00:00:00.000Z',
          'Positive Cases': 19,
          'Positivity Rate': 0.0326,
        },
        {
          Week: '2021-02-25T00:00:00.000Z',
          'Positive Cases': 9,
          'Positivity Rate': 0.011,
        },
        {
          Week: '2021-02-18T00:00:00.000Z',
          'Positive Cases': 7,
          'Positivity Rate': 0.0088,
        },
        {
          Week: '2021-02-11T00:00:00.000Z',
          'Positive Cases': 11,
          'Positivity Rate': 0.0151,
        },
        {
          Week: '2021-02-04T00:00:00.000Z',
          'Positive Cases': 18,
          'Positivity Rate': 0.0161,
        },
        {
          Week: '2021-01-28T00:00:00.000Z',
          'Positive Cases': 23,
          'Positivity Rate': 0.0242,
        },
        {
          Week: '2021-01-21T00:00:00.000Z',
          'Positive Cases': 31,
          'Positivity Rate': 0.0163,
        },
        {
          Week: '2021-01-14T00:00:00.000Z',
          'Positive Cases': 17,
          'Positivity Rate': 0.0097,
        },
        {
          Week: '2021-01-07T00:00:00.000Z',
          'Positive Cases': 0,
          'Positivity Rate': 0,
        },
      ];
      const options = {
        marginLeft: 60,
        marginRight: 80,
        marginBottom: 65,
        y: { labelAnchor: 'center', labelArrow: 'none' },
        x: { type: 'band' },
        channels: {
          PositivityRate: 'PositivityRate',
        },
        marks: [
          Plot.ruleY([0]),
          Plot.barY(
            positiveCases.map((row) => ({ ...row, Week: new Date(row.Week) })),
            {
              x: 'Week',
              y: 'Positive Cases',
              fill: '#C799BC',
            }
          ),
          //@ts-expect-error it works
          (_, { x }, __, dimensions) =>
            Plot.plot({
              ...dimensions,
              marks: [
                Plot.line(
                  positiveCases.map((row) => ({ ...row, Week: new Date(row.Week) })),
                  {
                    x: 'Week',
                    y: 'Positivity Rate',
                    stroke: '#7C7270',
                    strokeWidth: 4,
                  }
                ),
              ],
              x: {
                type: 'identity',
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore bandwidth does exist
                transform: (v) => x?.(v) + x?.bandwidth() / 2,
                axis: null,
              }, // reuse scale x.
              y: { axis: 'right', domain: [0, 0.1], labelAnchor: 'center', labelArrow: 'none' },
            }),

          Plot.tip(
            positiveCases.map((row) => ({ ...row, Week: new Date(row.Week) })),
            Plot.pointerX({
              x: 'Week',
              y: (d) => d['Positive Cases'] / 2,
              channels: { 'Positivity Rate': 'Positivity Rate' },
              format: {
                x: (x) => formatISODate(new Date(x).toISOString()),
                y: (y) => `${y}`,
                PositivityRate: true,
              },
            })
          ),
          ,
        ],
      };

      // insert the plot with the initial window width
      const plot = Plot.plot({
        ...options,
        width: Math.min(window.innerWidth, 1200),
      });
      if (node) node.innerHTML = '';
      node?.appendChild(plot);

      window.addEventListener('resize', (event) => {
        // insert the plot with the new width
        const plot = Plot.plot({
          ...options,
          width: event.target.innerWidth,
        });
        if (node) node.innerHTML = '';
        node?.append(plot);
      });
    });
  </script>
  <div id="positiveCasesFigure">
    <div class="plot-1200">{@html data.plots.positiveCases}</div>
    <div class="plot-1000">{@html data.plots1000.positiveCases}</div>
    <div class="plot-800">{@html data.plots800.positiveCases}</div>
    <div class="plot-600">{@html data.plots600.positiveCases}</div>
    <div class="plot-400">{@html data.plots400.positiveCases}</div>
  </div>
  <PositiveCasesLegend />
  <h2>Quarantine/Isolation Space on Campus</h2>
  <script>
    document.addEventListener('DOMContentLoaded', () => {
      const node = document.querySelector('#qFigure');

      const quarantine = [
        {
          Week: '2021-01-07T00:00:00.000Z',
          count: 0,
          type: 'On- and Off-Campus',
        },
        {
          Week: '2021-01-07T00:00:00.000Z',
          count: 0,
          type: 'On-Campus',
        },
        {
          Week: '2021-01-14T00:00:00.000Z',
          count: 57,
          type: 'On- and Off-Campus',
        },
        {
          Week: '2021-01-14T00:00:00.000Z',
          count: 23,
          type: 'On-Campus',
        },
        {
          Week: '2021-01-21T00:00:00.000Z',
          count: 33,
          type: 'On- and Off-Campus',
        },
        {
          Week: '2021-01-21T00:00:00.000Z',
          count: 17,
          type: 'On-Campus',
        },
        {
          Week: '2021-01-28T00:00:00.000Z',
          count: 66,
          type: 'On- and Off-Campus',
        },
        {
          Week: '2021-01-28T00:00:00.000Z',
          count: 31,
          type: 'On-Campus',
        },
        {
          Week: '2021-02-04T00:00:00.000Z',
          count: 71,
          type: 'On- and Off-Campus',
        },
        {
          Week: '2021-02-04T00:00:00.000Z',
          count: 19,
          type: 'On-Campus',
        },
        {
          Week: '2021-02-11T00:00:00.000Z',
          count: 56,
          type: 'On- and Off-Campus',
        },
        {
          Week: '2021-02-11T00:00:00.000Z',
          count: 19,
          type: 'On-Campus',
        },
        {
          Week: '2021-02-18T00:00:00.000Z',
          count: 40,
          type: 'On- and Off-Campus',
        },
        {
          Week: '2021-02-18T00:00:00.000Z',
          count: 17,
          type: 'On-Campus',
        },
        {
          Week: '2021-02-25T00:00:00.000Z',
          count: 57,
          type: 'On- and Off-Campus',
        },
        {
          Week: '2021-02-25T00:00:00.000Z',
          count: 23,
          type: 'On-Campus',
        },
        {
          Week: '2021-03-04T00:00:00.000Z',
          count: 55,
          type: 'On- and Off-Campus',
        },
        {
          Week: '2021-03-04T00:00:00.000Z',
          count: 24,
          type: 'On-Campus',
        },
        {
          Week: '2021-03-11T00:00:00.000Z',
          count: 35,
          type: 'On- and Off-Campus',
        },
        {
          Week: '2021-03-11T00:00:00.000Z',
          count: 10,
          type: 'On-Campus',
        },
        {
          Week: '2021-03-18T00:00:00.000Z',
          count: 23,
          type: 'On- and Off-Campus',
        },
        {
          Week: '2021-03-18T00:00:00.000Z',
          count: 12,
          type: 'On-Campus',
        },
        {
          Week: '2021-03-25T00:00:00.000Z',
          count: 41,
          type: 'On- and Off-Campus',
        },
        {
          Week: '2021-03-25T00:00:00.000Z',
          count: 20,
          type: 'On-Campus',
        },
        {
          Week: '2021-04-01T00:00:00.000Z',
          count: 4,
          type: 'On- and Off-Campus',
        },
        {
          Week: '2021-04-01T00:00:00.000Z',
          count: 2,
          type: 'On-Campus',
        },
        {
          Week: '2021-04-08T00:00:00.000Z',
          count: 5,
          type: 'On- and Off-Campus',
        },
        {
          Week: '2021-04-08T00:00:00.000Z',
          count: 0,
          type: 'On-Campus',
        },
        {
          Week: '2021-04-15T00:00:00.000Z',
          count: 4,
          type: 'On- and Off-Campus',
        },
        {
          Week: '2021-04-15T00:00:00.000Z',
          count: 1,
          type: 'On-Campus',
        },
        {
          Week: '2021-04-22T00:00:00.000Z',
          count: 3,
          type: 'On- and Off-Campus',
        },
        {
          Week: '2021-04-22T00:00:00.000Z',
          count: 2,
          type: 'On-Campus',
        },
      ];
      const options = {
        marginLeft: 60,
        marginBottom: 70,
        x: { label: 'Location', axis: null },
        fx: { label: 'Week' },
        y: { label: 'Number of Students', labelAnchor: 'center', labelArrow: 'none' },
        marks: [
          Plot.barY(
            quarantine.map((row) => ({ ...row, Week: new Date(row.Week) })),
            {
              x: 'type',
              y: 'count',
              fx: 'Week',
              fill: (d) => (d.type.startsWith('On- ') ? '#AD74A0' : '#C7C1EF'),
              tip: {
                format: {
                  fx: (fx) => formatISODate(new Date(fx).toISOString()),
                  x: (x) => `${x}`,
                  y: (fy) => `${fy}`,
                  fill: false,
                },
              },
            }
          ),
          Plot.ruleY([0]),
        ],
      };

      // insert the plot with the initial window width
      const plot = Plot.plot({
        ...options,
        width: Math.min(window.innerWidth, 1200),
      });
      if (node) node.innerHTML = '';
      node?.appendChild(plot);

      window.addEventListener('resize', (event) => {
        // insert the plot with the new width
        const plot = Plot.plot({
          ...options,
          width: event.target.innerWidth,
        });
        if (node) node.innerHTML = '';
        node?.append(plot);
      });
    });
  </script>
  <div id="qFigure">
    <div class="plot-1200">{@html data.plots.quarantine}</div>
    <div class="plot-1000">{@html data.plots1000.quarantine}</div>
    <div class="plot-800">{@html data.plots800.quarantine}</div>
    <div class="plot-600">{@html data.plots600.quarantine}</div>
    <div class="plot-400">{@html data.plots400.quarantine}</div>
  </div>
  <QuarantineLegend />
  <h2>Percent Utilization of On-Campus Isolation and Quarantine Space</h2>
  <script>
    document.addEventListener('DOMContentLoaded', () => {
      const node = document.querySelector('#quFigure');

      const quarantineUtilization = [
        {
          Week: '2021-01-07T00:00:00.000Z',
          'Quarantine Space Utilization': 0,
        },
        {
          Week: '2021-01-14T00:00:00.000Z',
          'Quarantine Space Utilization': 0.118,
        },
        {
          Week: '2021-01-21T00:00:00.000Z',
          'Quarantine Space Utilization': 0.07,
        },
        {
          Week: '2021-01-28T00:00:00.000Z',
          'Quarantine Space Utilization': 0.174,
        },
        {
          Week: '2021-02-04T00:00:00.000Z',
          'Quarantine Space Utilization': 0.128,
        },
        {
          Week: '2021-02-11T00:00:00.000Z',
          'Quarantine Space Utilization': 0.081,
        },
        {
          Week: '2021-02-18T00:00:00.000Z',
          'Quarantine Space Utilization': 0.151,
        },
        {
          Week: '2021-02-25T00:00:00.000Z',
          'Quarantine Space Utilization': 0.129,
        },
        {
          Week: '2021-03-04T00:00:00.000Z',
          'Quarantine Space Utilization': 0.2,
        },
        {
          Week: '2021-03-11T00:00:00.000Z',
          'Quarantine Space Utilization': 0.133,
        },
        {
          Week: '2021-03-18T00:00:00.000Z',
          'Quarantine Space Utilization': 0.071,
        },
        {
          Week: '2021-03-25T00:00:00.000Z',
          'Quarantine Space Utilization': 0.059,
        },
        {
          Week: '2021-04-01T00:00:00.000Z',
          'Quarantine Space Utilization': 0,
        },
        {
          Week: '2021-04-08T00:00:00.000Z',
          'Quarantine Space Utilization': 0,
        },
        {
          Week: '2021-04-15T00:00:00.000Z',
          'Quarantine Space Utilization': 0,
        },
        {
          Week: '2021-04-22T00:00:00.000Z',
          'Quarantine Space Utilization': 0,
        },
      ];
      const options = {
        marginLeft: 70,
        marginBottom: 70,
        x: { labelAnchor: 'center', labelArrow: 'none' },
        y: {
          label: 'Utiliation of Campus Isolation Space',
          labelAnchor: 'center',
          labelArrow: 'none',
        },
        marks: [
          Plot.ruleY([0]),
          Plot.lineY(
            quarantineUtilization.map((row) => ({ ...row, Week: new Date(row.Week) })),
            {
              x: 'Week',
              y: 'Quarantine Space Utilization',
              strokeWidth: 3,
              stroke: '#57557E',
              tip: {
                format: {
                  x: (x) => formatISODate(new Date(x).toISOString()),
                  y: (y) => `${y}`,
                },
              },
            }
          ),
          Plot.dot(
            quarantineUtilization.map((row) => ({ ...row, Week: new Date(row.Week) })),
            { x: 'Week', y: 'Quarantine Space Utilization', fill: '#57557E' }
          ),
        ],
      };

      // insert the plot with the initial window width
      const plot = Plot.plot({
        ...options,
        width: Math.min(window.innerWidth, 1200),
      });
      if (node) node.innerHTML = '';
      node?.appendChild(plot);

      window.addEventListener('resize', (event) => {
        // insert the plot with the new width
        const plot = Plot.plot({
          ...options,
          width: event.target.innerWidth,
        });
        if (node) node.innerHTML = '';
        node?.append(plot);
      });
    });
  </script>
  <div id="quFigure">
    <div class="plot-1200">{@html data.plots.quarantineUtilization}</div>
    <div class="plot-1000">{@html data.plots1000.quarantineUtilization}</div>
    <div class="plot-800">{@html data.plots800.quarantineUtilization}</div>
    <div class="plot-600">{@html data.plots600.quarantineUtilization}</div>
    <div class="plot-400">{@html data.plots400.quarantineUtilization}</div>
  </div>
</Container>

<style>
  h2 {
    font-family: var(--font-detail);
    color: var(--color-neutral-dark);
    font-size: 22px;
    line-height: 28px;
    font-style: normal;
    font-weight: 700;
    letter-spacing: 0.16px;
  }

  .plot-1200,
  .plot-1000,
  .plot-800,
  .plot-600,
  .plot-400 {
    display: none;
  }

  @media (min-width: 1200px) {
    .plot-1200 {
      display: block;
    }
  }

  @media (min-width: 1000px) and (max-width: 1199px) {
    .plot-1000 {
      display: block;
    }
  }

  @media (min-width: 800px) and (max-width: 999px) {
    .plot-800 {
      display: block;
    }
  }

  @media (min-width: 600px) and (max-width: 799px) {
    .plot-600 {
      display: block;
    }
  }

  @media (max-width: 599px) {
    .plot-400 {
      display: block;
    }
  }
</style>
