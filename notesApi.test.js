const NotesApi = require("./notesApi");

require("jest-fetch-mock").enableFetchMocks();

describe("Api", () => {
  describe("loadNotes", () => {
    it("fetches notes from the server", (done) => {
      const api = new NotesApi();

      fetch.mockResponseOnce(
        JSON.stringify(["This note is coming from the server"])
      );

      api.loadNotes((returnedNotesData) => {
        expect(returnedNotesData[0]).toBe(
          "This note is coming from the server"
        );
        expect(fetch.mock.calls[0][0]).toEqual("http://localhost:3000/notes");
        done();
      });
    });
  });

  describe("createNote", () => {
    it("creates a new note on the server", (done) => {
      const api = new NotesApi();

      fetch.mockResponse(async (request) => {
        try {
          expect(request.method).toBe("POST");
          const requestBody = await request.json();
          expect(requestBody.content).toEqual("New note");
        } catch (err) {
          done(err);
        }

        return JSON.stringify(["New note"]);
      });

      api.createNote("New note", (response) => {
        expect(response[0]).toBe("New note");

        done();
      });
    });
  });
});
