let createNote = (content) => {
  let element = document.createElement("textarea");
  element.classList.add("s_note");
  element.placeholder = "Your New Note";
  element.value = content;
  return element;
};

let getNotes = () => {
  return localStorage.getItem("sticky-notes") || [];
};

let setNotes = (array) => {
  let update = JSON.stringify(array);
  localStorage.setItem("sticky-notes", update);
};
let defaultNotes = () => {
  let defaultNotes = [
    { id: 1, content: "" },
    { id: 2, content: "" },
    { id: 3, content: "" },
    { id: 4, content: "" },
    { id: 5, content: "" },
    { id: 6, content: "" },
    { id: 7, content: "" },
  ];
  return defaultNotes;
};

let count = () => {
  let prev = document.querySelectorAll(".s_note");
  return prev.length;
};

let addNotes = (note) => {
  if (getNotes().length == 0) {
    let newNote = defaultNotes();
    newNote.push(note);
    setNotes(newNote);
  } else {
    let existing = JSON.parse(getNotes());
    existing.push(note);

    setNotes(existing);
  }
};

let updateContent = () => {
  if (getNotes().length == 0) {
    setNotes(defaultNotes());
    let note = document.querySelectorAll(".s_note");
    note.forEach((element, i) => {
      element.addEventListener("change", () => {
        let manipulate = JSON.parse(getNotes());
        manipulate[i].content = element.value;
        setNotes(manipulate);
      });
    });
  } else {
    let note = document.querySelectorAll(".s_note");
    note.forEach((element, i) => {
      element.addEventListener("input", () => {
        let manipulate = JSON.parse(getNotes());
        manipulate[i].content = element.value;
        setNotes(manipulate);
      });
    });
  }
};

let deleteNote = (i) => {
  if (i < 7) {
    alert("you cannot delete pre-existing notes");
  } else {
    let assure = confirm(
      "Are you sure you want to delete this note permanently"
    );
    if (assure) {
      let manipulate = JSON.parse(getNotes());
      const newNote = manipulate.filter((element, index) => {
        return index != i;
      });
      setNotes(newNote);
    }
  }
};

let displayNotes = () => {
  //display Notes on Refresh
  if (getNotes().length == 0) {
    setNotes(defaultNotes());
  } else {
    let notes = JSON.parse(getNotes());
    let filtered = notes.filter((element, index) => {
      return index > 6;
    });
    if (filtered.length != 0) {
      filtered.forEach((element) => {
        let area = createNote(element.content);
        let plus = document.querySelector(".addnote");
        let getContainer = document.querySelector("#container");
        getContainer.insertBefore(area, plus);
      });
    }
    let note = document.querySelectorAll(".s_note");
    note.forEach((element, i) => {
      if (i < 7) {
        element.value = notes[i].content;
      }
    });
  }
  //Adding Notes
  let addNote = document.querySelector(".addnote");
  addNote.addEventListener("click", () => {
    let noteid = count() + 1;
    let newNotes = {
      id: noteid,
      content: "",
    };
    addNotes(newNotes);
    let area = createNote("");
    let plus = document.querySelector(".addnote");
    let getContainer = document.querySelector("#container");
    getContainer.insertBefore(area, plus);
  });

  //Deleting
  let notes = document.querySelectorAll(".s_note");
  notes.forEach((element, index) => {
    element.addEventListener("dblclick", () => {
      deleteNote(index);
      if (index > 6) {
        element.remove();
      }
    });
  });

  //Update
  updateContent();

  //Remove All
  let remove = document.querySelector(".rmv");
  remove.addEventListener("click", () => {
    let assure = confirm("Are you sure you want to restore to default");
    if (assure) {
      localStorage.clear();
      let notes = document.querySelectorAll(".s_note");
      notes.forEach((element, index) => {
        if (index > 6) {
          element.remove();
        }
      });
    }
  });
  //REMOVING LAST NOTE
  let last = document.querySelector(".single");
  last.addEventListener("click", () => {
    let assure = confirm("Are you sure you want to delete last note");
    if (assure) {
      let notesNo = count();
      if (notesNo > 7) {
        let notes = document.querySelectorAll(".s_note");
        lastItem = notesNo - 1;
        notes[lastItem].remove();
        deleteNote(lastItem);
      } else {
        alert("You can't delete default notes");
      }
    }
  });
};

displayNotes();
