class NotesModel {
  constructor() {
    this.notes = [];
  }

  setNotes(notes) {
    this.notes = notes;
  }

  addNote(note) {
    this.notes.push(note);
  }

  getNotes() {
    return this.notes;
  }

  reset() {
    this.notes = [];
  }
}

module.exports = NotesModel;
