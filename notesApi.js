class NotesApi {
  async loadNotes() {
    try {
      const response = await fetch("http://localhost:3000/notes");
      const notes = await response.json();
      return notes;
    } catch (error) {
      console.log(error);
    }
  }

  // loadNotes(callback) {
  //   fetch("http://localhost:3000/notes")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       callback(data);
  //     });
  // }

  async createNote(note) {
    try {
      const response = await fetch("http://localhost:3000/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: note }),
      });
      const notes = await response.json();
      return notes;
    } catch (error) {
      console.log(error);
    }
  }

  // createNote(note, callback) {
  //   fetch("http://localhost:3000/notes", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ content: note }),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       callback(data);
  //     });
  // }
}

module.exports = NotesApi;
