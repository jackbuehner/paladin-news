import { JSDOM } from 'jsdom';
import type { PageServerLoad } from './$types';
import { positiveCasesPlot } from './positiveCasesPlot';
import { quarantinePlot } from './quarantinePlot';
import { quarantineUtilizationPlot } from './quarantineUtilizationPlot';
import { studentsTestedPlot } from './studentsTestedPlot';

// Plot will need a reference to a DOM window document later in the code
const { document } = new JSDOM().window;

export const load: PageServerLoad = async () => {
  return {
    plots: {
      studentsTested: studentsTestedPlot(document).html,
      positiveCases: positiveCasesPlot(document).html,
      quarantine: quarantinePlot(document).html,
      quarantineUtilization: quarantineUtilizationPlot(document).html,
    },
    plots1000: {
      studentsTested: studentsTestedPlot(document, undefined, 1000).html,
      positiveCases: positiveCasesPlot(document, undefined, 1000).html,
      quarantine: quarantinePlot(document, undefined, 1000).html,
      quarantineUtilization: quarantineUtilizationPlot(document, undefined, 1000).html,
    },
    plots800: {
      studentsTested: studentsTestedPlot(document, undefined, 800).html,
      positiveCases: positiveCasesPlot(document, undefined, 800).html,
      quarantine: quarantinePlot(document, undefined, 800).html,
      quarantineUtilization: quarantineUtilizationPlot(document, undefined, 800).html,
    },
    plots600: {
      studentsTested: studentsTestedPlot(document, undefined, 600).html,
      positiveCases: positiveCasesPlot(document, undefined, 600).html,
      quarantine: quarantinePlot(document, undefined, 600).html,
      quarantineUtilization: quarantineUtilizationPlot(document, undefined, 600).html,
    },
    plots400: {
      studentsTested: studentsTestedPlot(document, undefined, 400).html,
      positiveCases: positiveCasesPlot(document, undefined, 400).html,
      quarantine: quarantinePlot(document, undefined, 400).html,
      quarantineUtilization: quarantineUtilizationPlot(document, undefined, 400).html,
    },
  };
};
