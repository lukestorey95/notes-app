console.log("The notes app is running");

const NotesModel = require("./notesModel");
const NotesView = require("./notesView");

const model = new NotesModel();

model.addNote("This is a test");
model.addNote("This is another test");

const view = new NotesView(model);
view.displayNotes();
