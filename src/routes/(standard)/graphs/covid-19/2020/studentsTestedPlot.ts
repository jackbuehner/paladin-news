import { formatISODate } from '$lib/utils';
import * as Plot from '@observablehq/plot';
import studentsTested from './studentsTested.json';

export function studentsTestedPlot(document: Document, showTip = false, width = 1200) {
  const config: Plot.PlotOptions = {
    marginLeft: 70,
    marginBottom: 70,
    y: { labelAnchor: 'center', labelArrow: 'none' },
    x: { type: 'band' },
    width,
    marks: [
      Plot.barY(
        studentsTested.map((row) => ({ ...row, Week: new Date(row.Week) })),
        {
          x: 'Week',
          y: 'Students Tested',
          fill: '#75A1C7',
          tip: showTip
            ? { format: { x: (x) => formatISODate(new Date(x).toISOString()), y: (y) => `${y}` } }
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
