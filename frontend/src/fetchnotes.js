export function fetchnotes() {
  return fetch('http://localhost:8080/notepad_war_exploded/api/get')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response not ok');
      }
      return response.json();
    })
    .catch(error => {
      console.error('fetch problem:', error);
      throw error;
    });
}
