const loginFormHandler = async function(event) {
    event.preventDefault();
    try {
      const username = document.getElementById('username-input-login').value;
      const password = document.getElementById('password-input-login').value;
      await axios.post('/api/user/login', { username, password })
      location.href = '/dashboard';
    }
    catch (err) {
      document.getElementById('password-input-login').value = ''
      document.getElementById('error-message').textContent= err.response?.data.message || err.message
      console.error(err)
    }
  };
  
  document
    .getElementById('login-form')
    .addEventListener('submit', loginFormHandler);