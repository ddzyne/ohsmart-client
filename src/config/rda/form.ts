import administrative from './formsections/administrative';
import citation from './formsections/citation';
import coverage from './formsections/coverage';
import rda from './formsections/rda';
import relations from './formsections/relations';
import rights from './formsections/rights';

// Make sure to import all sections of the form here, and add them to the sections export
// Section data are formatted as js/ts, so we can easily import things like option lists, or set a variable that gets reused
// For now, see types/Metadata.ts to check the types of input fields you can use

// NOTE: This config is OLD!

const sections = [
  administrative,
  citation,
  coverage,
  rda,
  relations,
  rights,
];

export default sections;