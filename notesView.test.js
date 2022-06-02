/**
 * @jest-environment jsdom
 */

const fs = require("fs");
const View = require("./notesView");
const Model = require("./notesModel");
// const Api = require("./notesAPI");

describe("Notes View", () => {
  beforeEach(() => {
    document.body.innerHTML = fs.readFileSync("./index.html");

    model = new Model();
    mockApi = {
      createNote: (callback) => {
        return callback(["New note"]);
      },

      loadNotes: (callback) => {
        callback(["This note is coming from the server"]);
      },
    };
    view = new View(model, mockApi);
  });

  xit("user can input note, it is posted to server and then displayed", async () => {
    const input = document.querySelector("#note-input");
    input.value = "New note";

    const button = document.querySelector("#add-note-button");
    button.click();

    expect(document.querySelectorAll("div.note").length).toEqual(1);
    expect(document.querySelectorAll("div.note")[0].innerText).toEqual(
      "New note"
    );
  });

  it("displays notes on the page", () => {
    view.model.addNote("This is a test");

    view.displayNotes();

    expect(document.querySelectorAll("div.note")[0].innerText).toBe(
      "This is a test"
    );
  });

  it("clears the previous notes when adding a new note", () => {
    model.addNote("one");
    model.addNote("two");

    view.displayNotes();
    view.displayNotes();

    expect(document.querySelectorAll("div.note").length).toEqual(2);
  });

  it("should call notes from server and display them on the page", () => {
    view.displayNotesFromApi();

    expect(document.querySelectorAll("div.note").length).toBe(1);
    expect(document.querySelectorAll("div.note")[0].innerText).toBe(
      "This note is coming from the server"
    );
  });
});
