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
    view = new View(model);
  });

  it("displays notes on the page", () => {
    view.model.addNote("This is a test");

    view.displayNotes();

    expect(document.querySelectorAll("div.note")[0].innerText).toBe(
      "This is a test"
    );
  });

  it("user can input note and see it displayed", () => {
    const input = document.querySelector("#note-input");
    input.value = "Test note";

    const button = document.querySelector("#add-note-button");
    button.click();

    expect(document.querySelectorAll("div.note").length).toEqual(1);
    expect(document.querySelectorAll("div.note")[0].innerText).toEqual(
      "Test note"
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
    const mockApi = {
      loadNotes: (callback) => {
        callback(["This note is coming from the server"]);
      },
    };

    const view = new View(model, mockApi);

    view.displayNotesFromApi();

    expect(document.querySelectorAll("div.note").length).toBe(1);
    expect(document.querySelectorAll("div.note")[0].innerText).toBe(
      "This note is coming from the server"
    );
  });
});
