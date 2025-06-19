export function fetchnotes() {
  return fetch('/mockupdata.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => data.mockupData)
    .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
      throw error;
    });
}
