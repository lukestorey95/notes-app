class NotesView {
  constructor(model, api) {
    this.model = model;
    this.api = api;
    this.mainContainer = document.querySelector("#main-container");

    this.inputEl = document.querySelector("#note-input");

    this.addNoteButton = document.querySelector("#add-note-button");

    this.addNoteButton.addEventListener("click", () => {
      this.addNewNote(this.inputEl.value);
    });
  }

  displayNotesFromApi() {
    this.api.loadNotes((notes) => {
      this.model.setNotes(notes);
      this.displayNotes();
    });
  }

  addNewNote(note) {
    this.model.addNote(note);
    this.displayNotes();
    this.inputEl.value = null;
  }

  displayNotes() {
    this.clearNoteDivs();
    let notes = this.model.getNotes();

    notes.forEach((note) => {
      this.addNoteDiv(note);
    });
  }

  clearNoteDivs() {
    const notes = document.querySelectorAll("div.note");
    notes.forEach((note) => {
      note.remove();
    });
  }

  addNoteDiv(note) {
    const newDiv = document.createElement("div");
    newDiv.innerText = note;
    newDiv.classList.add("note");

    this.mainContainer.append(newDiv);
  }
}

module.exports = NotesView;
