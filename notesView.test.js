/**
 * @jest-environment jsdom
 */

const fs = require("fs");
const View = require("./notesView");
const Model = require("./notesModel");

describe("Notes View", () => {
  beforeEach(() => {
    document.body.innerHTML = fs.readFileSync("./index.html");

    model = new Model();
    mockApi = {
      createNote: (note) => {
        return [note];
      },

      loadNotes: () => {
        return ["This note is coming from the server"];
      },
    };
    view = new View(model, mockApi);
  });

  it("user can input note, it is posted to server and then displayed", async () => {
    const input = document.querySelector("#note-input");
    input.value = "New note";

    const button = document.querySelector("#add-note-button");
    button.click();

    setTimeout(() => {
      expect(document.querySelectorAll("div.note").length).toEqual(1);
      expect(document.querySelectorAll("div.note")[0].innerText).toEqual(
        "New note"
      );
    }, 0);
  });

  it("clears the previous notes when adding a new note", async () => {
    view.model.addNote("one");
    view.model.addNote("two");

    await view.displayNotes();
    await view.displayNotes();

    expect(document.querySelectorAll("div.note").length).toEqual(2);
  });

  it("should call notes from server and display them on the page", async () => {
    await view.displayNotesFromApi();

    setTimeout(() => {
      expect(document.querySelectorAll("div.note").length).toBe(1);
      expect(document.querySelectorAll("div.note")[0].innerText).toBe(
        "This note is coming from the server"
      );
    }, 0);
  });
});
