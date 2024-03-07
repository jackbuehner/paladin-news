import { formatISODate } from '$lib/utils';
import * as Plot from '@observablehq/plot';
import quarantineUtilization from './quarantineUtilization.json';

export function quarantineUtilizationPlot(document: Document, showTip = false, width = 1200) {
  const config: Plot.PlotOptions = {
    marginLeft: 70,
    marginBottom: 70,
    x: { labelAnchor: 'center', labelArrow: 'none' },
    y: { label: 'Utiliation of Campus Isolation Space', labelAnchor: 'center', labelArrow: 'none' },
    width,
    marks: [
      Plot.ruleY([0]),
      Plot.lineY(
        quarantineUtilization.map((row) => ({ ...row, Week: new Date(row.Week) })),
        {
          x: 'Week',
          y: 'Quarantine Space Utilization',
          strokeWidth: 3,
          stroke: '#57557E',
          tip: showTip
            ? { format: { x: (x) => formatISODate(new Date(x).toISOString()), y: (y) => `${y}` } }
            : false,
        }
      ),
      Plot.dot(
        quarantineUtilization.map((row) => ({ ...row, Week: new Date(row.Week) })),
        { x: 'Week', y: 'Quarantine Space Utilization', fill: '#57557E' }
      ),
    ],
    document,
  };

  const html = Plot.plot(config).outerHTML;

  return { config, html };
}
