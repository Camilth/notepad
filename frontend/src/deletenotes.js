export function deleteNote(id) {
  return fetch(`http://localhost:8080/notepad_war_exploded/api/delete/${id}`, {
    method: 'DELETE'
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response not ok');
    }
  })
  .catch(error => {
    console.error('problem fetch operation:', error);
    throw error;
  });
}