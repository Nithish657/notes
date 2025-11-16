
const fileBtn = document.getElementById("fileBtn");
const editBtn = document.getElementById("editBtn");
const fileMenu = document.getElementById("fileMenu");
const editMenu = document.getElementById("editMenu");
const quickSave = document.getElementById("quickSave");

const titleInput = document.getElementById("noteTitle");
const bodyInput = document.getElementById("noteBody");
const searchInput = document.getElementById("search");

const fileImport = document.getElementById("fileImport");
const backupUpload = document.getElementById("backupUpload");

function closeMenus() {
  fileMenu.style.display = "none";
  editMenu.style.display = "none";
}

fileBtn.onclick = () => {
  editMenu.style.display = "none";
  fileMenu.style.display = fileMenu.style.display === "flex" ? "none" : "flex";
};

editBtn.onclick = () => {
  fileMenu.style.display = "none";
  editMenu.style.display = editMenu.style.display === "flex" ? "none" : "flex";
};

document.addEventListener("click", (e) => {
  if (!fileBtn.contains(e.target) && !editBtn.contains(e.target)) closeMenus();
});

function runAction(action) {
  switch (action) {
    case "new": newNote(); break;
    case "save": saveNote(); break;
    case "saveas": saveAsFile(); break;
    case "import": fileImport.click(); break;
    case "upload": backupUpload.click(); break;
    case "exit": closeMenus(); break;
  }
}

fileMenu.querySelectorAll("button").forEach(btn => {
  btn.onclick = () => runAction(btn.dataset.action);
});

editMenu.querySelectorAll("button").forEach(btn => {
  btn.onclick = () => runAction(btn.dataset.action);
});

function newNote() {
  titleInput.value = "";
  bodyInput.value = "";
}

function saveNote() {
  const note = {
    title: titleInput.value,
    body: bodyInput.value
  };

  localStorage.setItem("savedNote", JSON.stringify(note));
  alert("Note saved!");
}

window.onload = () => {
  const saved = localStorage.getItem("savedNote");
  if (saved) {
    const note = JSON.parse(saved);
    titleInput.value = note.title;
    bodyInput.value = note.body;
  }
};

quickSave.onclick = saveNote;

function saveAsFile() {
  const text = `${titleInput.value}\n\n${bodyInput.value}`;
  const blob = new Blob([text], { type: "text/plain" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `${titleInput.value || "note"}.txt`;
  a.click();
}

fileImport.onchange = () => {
  const file = fileImport.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    bodyInput.value = reader.result;
  };
  reader.readAsText(file);
};

backupUpload.onchange = () => {
  const file = backupUpload.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    const note = JSON.parse(reader.result);
    titleInput.value = note.title;
    bodyInput.value = note.body;
  };
  reader.readAsText(file);
};

searchInput.addEventListener("input", () => {
  const text = bodyInput.value.toLowerCase();
  const term = searchInput.value.toLowerCase();

  if (term && text.includes(term)) {
    bodyInput.style.background = "#fffdc4";
  } else {
    bodyInput.style.background = "#fff";
  }
});

