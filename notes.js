const fs = require('fs');
const chalk = require('chalk');

class Note {
  constructor(title, body) {
    (this.title = title), (this.body = body);
  }
}

const loadNotes = () => {
  try {
    const notesFromJSON = fs.readFileSync('notes.json').toString();
    return JSON.parse(notesFromJSON);
  } catch (err) {
    console.log(err);
    return [];
  }
};

const createNote = note => {
  const noteJSON = JSON.stringify(note);
  fs.writeFileSync('notes.json', noteJSON);
  console.log('JSON Atualizado');
};

const getNotes = params => {
  return 'Your notes...';
};

const addNote = (title, body) => {
  let newNote = new Note(title, body);
  const notes = loadNotes();
  const duplicatedTitles = notes.find(note => note.title === title);

  if (duplicatedTitles) {
    return console.log(chalk.inverse.red('Titulo ja existe'));
  }

  notes.push(newNote);
  createNote(notes);
  console.log(chalk.inverse.green('Nota criada com sucesso'));
};

const removeNote = title => {
  const notes = loadNotes();

  for (let i = 0; i < notes.length; i++) {
    const element = notes[i];

    if (element.title === title) {
      notes.splice(i, 1);
      createNote(notes);
      console.log(chalk.inverse.green('Nota encontrada e removida'));
      return;
    }
  }
  return console.log(chalk.inverse.red('Não existe essa nota'));
};

const listNotes = () => {
  const loadedNotes = loadNotes();
  loadedNotes.forEach(item => {
    console.log(chalk.bold.greenBright('Title: ', item.title));
    console.log(chalk.bold.yellowBright('body: ', item.body));
    console.log('--------------------------------------');
  });
};

module.exports = {
  getNotes: getNotes,
  addNote: addNote,
  loadNotes: loadNotes,
  removeNote: removeNote,
  listNotes: listNotes,
};
