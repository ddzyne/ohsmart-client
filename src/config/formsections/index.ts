import administrative from './administrative';
import citation from './citation';
import coverage from './coverage';
import oralHistorySpecific from './oralHistorySpecific';
import relations from './relations';
import rights from './rights';
import humanities from './humanities';

// Make sure to import all sections of the form here, and add them to the sections export
// Section data are formatted as js/ts, so we can easily import things like option lists, or set a variable that gets reused

const sections = [
  administrative,
  citation,
  coverage,
  humanities,
  oralHistorySpecific,
  relations,
  rights,
];

export default sections;