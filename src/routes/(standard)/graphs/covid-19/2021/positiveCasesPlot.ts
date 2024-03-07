import { formatISODate } from '$lib/utils';
import * as Plot from '@observablehq/plot';
import positiveCases from './positiveCases.json';

export function positiveCasesPlot(document: Document, showTip = false, width = 1200) {
  const config: Plot.PlotOptions = {
    marginLeft: 60,
    marginRight: 80,
    marginBottom: 65,
    y: { labelAnchor: 'center', labelArrow: 'none' },
    x: { type: 'band' },
    channels: {
      PositivityRate: 'PositivityRate',
    },
    width,
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
            //@ts-expect-error bandwidth does exist
            transform: (v) => x?.(v) + x?.bandwidth() / 2,
            axis: null,
          }, // reuse scale x.
          y: { axis: 'right', domain: [0, 0.1], labelAnchor: 'center', labelArrow: 'none' },
          document,
        }),

      ...(showTip
        ? [
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
          ]
        : []),
    ],
    document,
  };

  const html = Plot.plot(config).outerHTML;

  return { config, html };
}

export function positiveCasesScale(document: Document) {
  return Plot.legend({
    color: {
      type: 'categorical',
      domain: ['Positive Cases', 'Positivity Rate'],
      range: ['#C799BC', '#7C7270'],
    },
    // @ts-expect-error document is accepted
    document,
  }).outerHTML;
}
