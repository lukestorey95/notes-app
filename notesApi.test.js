const NotesApi = require("./notesApi");

require("jest-fetch-mock").enableFetchMocks();

describe("Api", () => {
  beforeEach(() => {
    fetch.resetMocks();

    api = new NotesApi();
  });

  describe("loadNotes", () => {
    it("fetches notes from the server", async () => {
      fetch.mockResponseOnce(async (request) => {
        try {
          expect(request.method).toBe("GET");
        } catch (error) {
          console.log(error);
        }

        return JSON.stringify(["This note is coming from the server"]);
      });

      const response = await api.loadNotes();

      expect(response[0]).toBe("This note is coming from the server");

      expect(fetch.mock.calls.length).toBe(1);

      expect(fetch.mock.calls[0][0]).toEqual("http://localhost:3000/notes");
    });
  });

  describe("createNote", () => {
    it("creates a new note on the server", async () => {
      fetch.mockResponseOnce(async (request) => {
        try {
          expect(request.method).toBe("POST");
          const requestBody = await request.json();
          expect(requestBody.content).toEqual("New note");
        } catch (error) {
          console.log(error);
        }

        return JSON.stringify(["New note"]);
      });

      const response = await api.createNote("New note");

      expect(response[0]).toBe("New note");

      expect(fetch.mock.calls.length).toBe(1);

      expect(fetch.mock.calls[0][0]).toEqual("http://localhost:3000/notes");
    });
  });
});
