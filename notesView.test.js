/**
 * @jest-environment jsdom
 */

const fs = require("fs");
const View = require("./notesView");
const Model = require("./notesModel");

describe("A test for my web page", () => {
  beforeEach(() => {
    document.body.innerHTML = fs.readFileSync("./index.html");
  });

  it("displays notes on the page", () => {
    const mockModel = {
      getNotes: () => ["This is a test"],
    };

    const view = new View(mockModel);

    view.displayNotes();

    expect(document.querySelector(".note").innerText).toBe("This is a test");
  });
});
