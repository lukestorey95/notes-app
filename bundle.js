(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // notesApi.js
  var require_notesApi = __commonJS({
    "notesApi.js"(exports, module) {
      var NotesApi2 = class {
        async loadNotes() {
          try {
            const response = await fetch("http://localhost:3000/notes");
            const notes = await response.json();
            return notes;
          } catch (error) {
            console.log(error);
          }
        }
        async createNote(note) {
          try {
            const response = await fetch("http://localhost:3000/notes", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({ content: note })
            });
            const notes = await response.json();
            return notes;
          } catch (error) {
            console.log(error);
          }
        }
      };
      module.exports = NotesApi2;
    }
  });

  // notesModel.js
  var require_notesModel = __commonJS({
    "notesModel.js"(exports, module) {
      var NotesModel2 = class {
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
      };
      module.exports = NotesModel2;
    }
  });

  // notesView.js
  var require_notesView = __commonJS({
    "notesView.js"(exports, module) {
      var NotesView2 = class {
        constructor(model2, api2) {
          this.model = model2;
          this.api = api2;
          this.mainContainer = document.querySelector("#main-container");
          this.inputEl = document.querySelector("#note-input");
          this.addNoteButton = document.querySelector("#add-note-button");
          this.addNoteButton.addEventListener("click", () => {
            this.addNewNote(this.inputEl.value);
          });
        }
        async displayNotesFromApi() {
          const notes = await this.api.loadNotes();
          this.model.setNotes(notes);
          this.displayNotes();
        }
        async addNewNote(note) {
          const notes = await this.api.createNote(note);
          this.model.setNotes(notes);
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
      };
      module.exports = NotesView2;
    }
  });

  // index.js
  var NotesApi = require_notesApi();
  var NotesModel = require_notesModel();
  var NotesView = require_notesView();
  var api = new NotesApi();
  var model = new NotesModel();
  var view = new NotesView(model, api);
  view.displayNotesFromApi();
})();
