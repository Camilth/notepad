import './style.css'
import { fetchnotes } from './fetchnotes.js'
import { postNotes } from './postnotes.js'
import { deleteNote } from './deletenotes.js'

document.querySelector('#app').innerHTML = `
  <div>
    <h1>Welkom bij jouw notepad</h1>
    <div class="card">
    </div>
  </div>
`
const overlay = document.createElement('div');
overlay.className = 'overlay';
document.querySelector('#app').appendChild(overlay);

fetchnotes().then(data => {
  const notesContainer = document.createElement('div');
  notesContainer.className = 'notes-container';
  addItemButton();
  data.forEach(note => {
    const noteElement = document.createElement('button');
    noteElement.className = 'note';
    noteElement.innerHTML = `
      <h2>${note.title}</h2>
    `;
    notesContainer.appendChild(noteElement);
  
noteElement.addEventListener('click', () => {
  document.querySelectorAll('.note-content, .new-note').forEach(element => element.remove());
  removeRemoveButton();
  window.scrollTo(0, 0);


  console.log('Note clicked:', note);
  overlay.classList.add('active');
  const noteContent = document.createElement('div');
  noteContent.className = 'note-content';
  noteContent.innerHTML = `
    <h2>${note.title}</h2>
    <p>${note.content}</p>
    <button class="close-button">Sluiten</button>
  `;
  overlay.appendChild(noteContent);
  addRemoveButton(noteContent, note);
  closeOverlay(noteContent);
});
  });
  document.querySelector('#app').appendChild(notesContainer);
  addItemButton();

}).catch(error => {
  console.error('Error fetching notes:', error);
  const errorElement = document.createElement('div');
  errorElement.className = 'error';
  errorElement.textContent = 'Er is een fout opgetreden bij het laden van de notities.';
  document.querySelector('#app').appendChild(errorElement);
});


function addItemButton() {
  const newItem = document.createElement('button');
  newItem.className = 'newItem';
  newItem.textContent = 'Nieuwe Notitie';
  document.querySelector('#app').appendChild(newItem);
  newItem.addEventListener('click', () => {
    addNewNote();
    window.scrollTo(0, 0);
  });
}

function addRemoveButton(noteContent, note) {
  removeRemoveButton();
  const removeItem = document.createElement('button');
  removeItem.className = 'removeItem';
  removeItem.textContent = 'Verwijder Notitie';
  document.querySelector('.overlay').appendChild(removeItem);
  removeItem.addEventListener('click', () => {
    console.log('Remove item clicked');
    deleteNote(note.id).then(() => {
      overlay.classList.remove('active');
      overlay.removeChild(noteContent);
      removeRemoveButton();
      location.reload();
    }).catch(error => {
      alert('Verwijderen mislukt :(');
      console.error(error);
    });
  });
}

function removeRemoveButton() {
  const removeItem = document.querySelector('.removeItem');
  if (removeItem) {
    document.querySelector('.overlay').removeChild(removeItem);
  }
}

function addNewNote() {
  document.querySelectorAll('.note-content, .new-note').forEach(element => element.remove());
  removeRemoveButton();

  overlay.classList.add('active');
  const newNote = document.createElement('div');
  newNote.className = 'new-note';
  newNote.innerHTML = `
    <h2>Nieuwe Notitie</h2>
    <input type="text" placeholder="Titel">
    <br>
    <br>
    <textarea placeholder="Inhoud"></textarea>
    <br>
    <br>
    <button class="save-button">Opslaan</button>
    <button class="close-button">Sluiten</button>
  `;
  overlay.appendChild(newNote);

  const saveButton = newNote.querySelector('.save-button');
  saveButton.addEventListener('click', () => {
    const title = newNote.querySelector('input[type="text"]').value;
    const content = newNote.querySelector('textarea').value;
    overlay.removeChild(newNote);
    overlay.classList.remove('active');
    console.log(title, content);
    const createdAt = Math.floor(Date.now() / 1000);
    console.log('Unix Timestamp:', createdAt);

    postNotes(title, content, createdAt).then(() => {
    location.reload();
    })
  });
  closeOverlay(newNote);
}

function closeOverlay(noteContent) {
  const closeButton = noteContent.querySelector('.close-button');
  closeButton.addEventListener('click', () => {
    overlay.classList.remove('active');
    overlay.removeChild(noteContent);
    removeRemoveButton();
    
  });
}


