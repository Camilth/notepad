export function postNotes(title, content, createdAt) {
  return fetch('http://localhost:8080/notepad_war_exploded/api/new', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({title, content, createdAt})
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response not ok');
    }
    return response.json();
  })
  .catch(error => {
    console.error('problem fetch operation:', error);
    throw error;
  });
}
