const NotesModel = require("./notesModel");

describe("notesModel", () => {
  it("starts with no notes", () => {
    const notes = new NotesModel();

    expect(notes.getNotes()).toEqual([]);
  });

  it("adds a note", () => {
    const notes = new NotesModel();

    notes.addNote("Buy milk");

    expect(notes.getNotes()).toEqual(["Buy milk"]);
  });

  it("resets list of notes", () => {
    const notes = new NotesModel();

    notes.addNote("Buy milk");
    notes.reset();

    expect(notes.getNotes()).toEqual([]);
  });
});
