// @vitest-environment jsdom
/// <reference types="vitest" />
import { describe, it, expect, beforeEach } from 'vitest'

describe('Overlay behavior', () => {
  let overlay;
  let main;

  beforeEach(async() => {
    document.body.innerHTML = `
      <div id="app"></div>
      <div class="overlay"></div>
    `;
    main = await import('./main.js');
    overlay = document.querySelector('.overlay');
  });

  it('hoort alle oude overlays te verwijderen na het klikken van "sluiten"', () => {
    // Dummy note (Simuleer twee overlays):
    const noteContent = document.createElement('div');
    noteContent.className = 'note-content';
    noteContent.innerHTML = `
      <h2>Titel</h2>
      <button class="close-button">Sluiten</button>
    `;
    overlay.appendChild(noteContent);

    // Zorg dat closeOverlay aangeroepen is zodat we de knop kunnen simuleren
    main.closeOverlay(noteContent);

    // Knop vinden en klikken simuleren
    const closeButton = noteContent.querySelector('.close-button');
    closeButton.dispatchEvent(new MouseEvent('click'));

    // Er zouden nu geen overlays meer moeten zijn
    expect(overlay.querySelectorAll('.note-content').length).toBe(0);
  });

  it('hoort de removeItem knop te verwijderen', () => {
    // Simuleer een bestaande verwijderknop
    const removeItem = document.createElement('button');
    removeItem.className = 'removeItem';
    overlay.appendChild(removeItem);

    // Simuleer het openen van een nieuwe notitie (verwijdert removeItem)
    main.removeRemoveButton();

    // Er zou geen removeItem knop meer moeten zijn
    expect(overlay.querySelector('.removeItem')).toBeNull();
  });

  it('hoort de removeItem knop te verwijderen ook als hij 2x bestaat', () => {
    // Simuleer bestaande verwijderknoppen
     const removeItem1 = document.createElement('button');
    removeItem1.className = 'removeItem';
    const removeItem2 = document.createElement('button');
    removeItem2.className = 'removeItem';
    overlay.appendChild(removeItem1);
    overlay.appendChild(removeItem2);

    // Simuleer het openen van een nieuwe notitie (verwijdert removeItem)
    main.removeRemoveButton();

    // Er zou geen removeItem knop meer moeten zijn
    expect(overlay.querySelector('.removeItem')).toBeNull();
  });


  it('hoort de removeItem knop te creeren wanneer een notitie wordt geopend', () => {
    // 1) Maak een dummy note-content
    const noteContent = document.createElement('div');
    noteContent.className = 'note-content';
    overlay.appendChild(noteContent);

    // Geef een fake object met een .id-property
    const fakeNote = { id: 123 };
    main.addRemoveButton(noteContent, fakeNote);

    // Er zou nu 1 removeItem-knop in de overlay moeten zitten
    const button = overlay.querySelectorAll('.removeItem');
    expect(button.length).toBe(1);

    // De knop heeft de juiste tekst
    expect(button[0].textContent).toBe('Verwijder Notitie');
  });


});