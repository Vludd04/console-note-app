const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");

const notesPath = path.join(__dirname, "db.json");

async function addNote(title) {
  const notes = await getNotes();
  const note = {
    title,
    id: Date.now().toString(),
  };

  notes.push(note);

  await saveNotes(notes);
  console.log(chalk.bgGreen("Note was added!"));
}

async function removeNote(id) {
  const notes = await getNotes();
  const filteredNotes = notes.filter((note) => note.id !== id);

  if (notes.find((note) => note.id === id)) {
    await saveNotes(filteredNotes);
    return console.log(chalk.green("Note was removed"));
  } else {
    return console.log(chalk.red("Note not found"));
  }
}

async function EditNote(id, data) {
  const notes = await getNotes();

  const editNoteTitle = notes.map((note) => {
    if (note.id === id) {
      note.title = data.title;
    }
    return note;
  });

  await fs.writeFile("./db.json", JSON.stringify(editNoteTitle));
}

async function getNotes() {
  const notes = await fs.readFile(notesPath, { encoding: "utf-8" });
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function saveNotes(notes) {
  await fs.writeFile(notesPath, JSON.stringify(notes));
}

async function printNotes() {
  const notes = await getNotes();

  console.log(chalk.bgBlue("Here is the list of notes:"));
  notes.forEach((note) => {
    console.log(chalk.bgWhite(note.id), chalk.blue(note.title));
  });
}

module.exports = {
  addNote,
  getNotes,
  removeNote,
  EditNote,
};
