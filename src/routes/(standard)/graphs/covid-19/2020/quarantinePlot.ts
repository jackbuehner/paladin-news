import { formatISODate } from '$lib/utils';
import * as Plot from '@observablehq/plot';
import quarantine from './quarantine.json';

export function quarantinePlot(document: Document, showTip = false, width = 1200) {
  const config: Plot.PlotOptions = {
    marginLeft: 60,
    marginBottom: 70,
    x: { label: 'Location', axis: null },
    fx: { label: 'Week' },
    y: { label: 'Number of Students', labelAnchor: 'center', labelArrow: 'none' },
    width,
    marks: [
      Plot.barY(
        quarantine.map((row) => ({ ...row, Week: new Date(row.Week) })),
        {
          x: 'type',
          y: 'count',
          fx: 'Week',
          fill: (d) => (d.type.startsWith('On- ') ? '#AD74A0' : '#C7C1EF'),
          tip: showTip
            ? {
                format: {
                  fx: (fx) => formatISODate(new Date(fx).toISOString()),
                  x: (x) => `${x}`,
                  y: (fy) => `${fy}`,
                  fill: false,
                },
              }
            : false,
        }
      ),
      Plot.ruleY([0]),
    ],
    document,
  };

  const html = Plot.plot(config).outerHTML;

  return { config, html };
}

export function quarantineScale(document: Document) {
  return Plot.legend({
    color: {
      type: 'categorical',
      domain: ['On- and Off-Campus', 'Off-Campus'],
      range: ['#AD74A0', '#C7C1EF'],
    },
    // @ts-expect-error document is accepted
    document,
  }).outerHTML;
}
