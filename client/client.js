console.log("Hello from client");

const form = document.querySelector('form');
const loading = document.querySelector('.loading');
const API_URL = 'http://localhost:5000/mews';

loading.style.display = 'none';

listAllMews();

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const name = formData.get('name');
  const content = formData.get('content');

  const mew = {
    name,
    content
  };

  form.style.display = 'none';
  loading.style.display = '';

  fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify(mew),
    headers: {
      'content-type': 'application/json'
    }
  }).then(response => response.json)
    .then(createdMew => {
      console.log(createdMew);
      form.reset();
      loading.style.display = 'none';
      form.style.display = '';
    });
});

function listAllMews() {
  fetch(API_URL)
    .then(response => response.json)
    .then(mews => {
      console.log(mews);
      mews.forEach(mew => {
        console.log(mew);
      });
    });
}
