import './style.css'
import { fetchnotes } from './fetchnotes.js'

document.querySelector('#app').innerHTML = `
  <div>
    <h1>Welkom bij jouw notepad</h1>
    <div class="card">
    <p>Hier komen jouw notities te staan</p>
    </div>
  </div>
`
const overlay = document.createElement('div');
overlay.className = 'overlay';
document.querySelector('#app').appendChild(overlay);

fetchnotes().then(data => {
  const notesContainer = document.createElement('div');
  notesContainer.className = 'notes-container';
  data.forEach(note => {
    const noteElement = document.createElement('button');
    noteElement.className = 'note';
    noteElement.innerHTML = `
      <h2>${note.title}</h2>
    `;
    notesContainer.appendChild(noteElement);
  
noteElement.addEventListener('click', () => {
  console.log('Note clicked:', note);
  overlay.style.display = 'block';
  const noteContent = document.createElement('div');
  noteContent.className = 'note-content';
  noteContent.innerHTML = `
    <h2>${note.title}</h2>
    <p>${note.content}</p>
    <button class="close-button">Sluiten</button>
  `;
  overlay.appendChild(noteContent);

  const closeButton = noteContent.querySelector('.close-button');
  closeButton.addEventListener('click', () => {
    overlay.style.display = 'none';
    overlay.removeChild(noteContent);
  });
});
  });
  document.querySelector('#app').appendChild(notesContainer);
  addItem();

}).catch(error => {
  console.error('Error fetching notes:', error);
  const errorElement = document.createElement('div');
  errorElement.className = 'error';
  errorElement.textContent = 'Er is een fout opgetreden bij het laden van de notities.';
  document.querySelector('#app').appendChild(errorElement);
});

function addItem() {
  const newItem = document.createElement('button');
  newItem.className = 'newItem';
  newItem.textContent = 'Nieuwe Notitie';
  document.querySelector('#app').appendChild(newItem);
}

