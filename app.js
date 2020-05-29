const chalk = require('chalk');
const yargs = require('yargs');
const notes = require('./notes');

yargs.command({
  command: 'addNote',
  describe: 'Add new note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: 'Whats up to?',
      type: 'string',
      demandOption: true,
    },
  },
  handler: argv => {
    notes.addNote(argv.title, argv.body);
  },
});

yargs.command({
  command: 'removeNote',
  describe: 'Remove note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
  },
  handler: argv => notes.removeNote(argv.title),
});

yargs.command({
  command: 'loadNotes',
  describe: 'Load notes',
  handler: () => notes.listNotes(),
});

yargs.parse();
