// Oud:
it('hoort alle oude overlays te verwijderen', () => {
    // Simuleer twee overlays
    const testOverlay = document.createElement('div');
    testOverlay.className = 'note-content';
    overlay.appendChild(testOverlay);

    // Simuleer het sluiten van een notitie
    main.closeOverlay(testOverlay);

    // Er zou nu maar een overlay moeten zijn
    expect(overlay.querySelectorAll('.note-content').length).toBe(1);
  });

  // Nieuw:
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