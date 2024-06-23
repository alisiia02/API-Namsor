document.getElementById('name-form').addEventListener('submit', async function(event) {
  event.preventDefault();
  const firstName = document.getElementById('first_name').value;
  const lastName = document.getElementById('last_name').value;

  try {
      localStorage.setItem('firstName', firstName);
      localStorage.setItem('lastName', lastName);

      window.location.href = 'about.html';
  } catch (error) {
      console.error('Error:', error);
  }
});
