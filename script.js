let notesContainer = document.getElementById("notesContainer");
let addNoteBtn = document.getElementById("addNoteBtn");
let noteTitle = document.getElementById("noteTitle");
let noteText = document.getElementById("noteText");
let search = document.getElementById("search");

showNotes();

addNoteBtn.onclick = () => {
  let notes = localStorage.getItem("notes");
  let notesObj = notes ? JSON.parse(notes) : [];

  if (noteTitle.value.trim() === "" || noteText.value.trim() === "") {
    return alert("Title and Note cannot be empty");
  }

  let newNote = {
    title: noteTitle.value,
    text: noteText.value
  };

  notesObj.push(newNote);
  localStorage.setItem("notes", JSON.stringify(notesObj));

  noteTitle.value = "";
  noteText.value = "";
  
  showNotes();
};

function showNotes() {
  let notes = localStorage.getItem("notes");
  let notesObj = notes ? JSON.parse(notes) : [];

  notesContainer.innerHTML = "";

  notesObj.forEach((note, index) => {
    notesContainer.innerHTML += `
      <div class="note">
        <span class="delete-btn" onclick="deleteNote(${index})">×</span>
        <div class="note-title">${note.title}</div>
        <p>${note.text}</p>
      </div>
    `;
  });
}


function deleteNote(index) {
  let notes = JSON.parse(localStorage.getItem("notes"));
  notes.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notes));
  showNotes();
}

// Search Notes
search.addEventListener("input", () => {
  let filter = search.value.toLowerCase();
  let notes = document.querySelectorAll(".note");

  notes.forEach(note => {
    let title = note.querySelector(".note-title").innerText.toLowerCase();
    let text = note.querySelector("p").innerText.toLowerCase();

    if (title.includes(filter) || text.includes(filter)) {
      note.style.display = "block";
    } else {
      note.style.display = "none";
    }
  });
});
