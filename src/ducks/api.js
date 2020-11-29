export const fetchData = (url, method = 'GET', body = null) =>
  fetch(url, { method, body })
    .then(response => response.json())
    .catch(e => console.error('Fetch error ', e));