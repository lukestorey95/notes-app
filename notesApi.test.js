const NotesApi = require("./notesApi");

require("jest-fetch-mock").enableFetchMocks();

describe("Api", () => {
  it("calls fetch and loads data", () => {
    const api = new NotesApi();

    fetch.mockResponseOnce(
      JSON.stringify(["This note is coming from the server"])
    );

    api.loadNotes((returnedNotesData) => {
      expect(returnedNotesData[0]).toBe("This note is coming from the server");
    });
  });

  it("uses a callback function", () => {
    const api = new NotesApi();

    fetch.mockResponseOnce(
      JSON.stringify(["This note is coming from the server"])
    );

    api.loadNotes((callback) => {
      expect(callback).toBeTruthy();
    });
  });
});
