(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // notesModel.js
  var require_notesModel = __commonJS({
    "notesModel.js"(exports, module) {
      var NotesModel2 = class {
        constructor() {
          this.notes = [];
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
        constructor(model2) {
          this.model = model2;
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
      };
      module.exports = NotesView2;
    }
  });

  // index.js
  console.log("The notes app is running");
  var NotesModel = require_notesModel();
  var NotesView = require_notesView();
  var model = new NotesModel();
  model.addNote("This is a test");
  model.addNote("This is another test");
  var view = new NotesView(model);
  view.displayNotes();
})();