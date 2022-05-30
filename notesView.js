class NotesView {
  constructor(model) {
    this.model = model;
    this.mainContainer = document.querySelector("#main-container");
  }

  displayNotes() {
    let notes = this.model.getNotes();

    notes.forEach((note) => {
      this.addNoteDiv(note);
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
