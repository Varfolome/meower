console.log("Hello from client");

const form = document.querySelector('form');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FromData(form);
  const name = formData.get('name');
  const content = formData.get('content');
});
