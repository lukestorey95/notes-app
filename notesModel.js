class NotesModel {
  constructor() {
    this.notes = [];
  }

  setNotes(notes) {
    this.reset();
    notes.forEach((note) => this.notes.push(note));
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
