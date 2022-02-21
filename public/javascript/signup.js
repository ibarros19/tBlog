const signupFormHandler = async function(event) {
    event.preventDefault();

    const username = document.getElementById("username-input-signup").value;
    const password = document.getElementById("password-input-signup").value;
    axios.post("/api/user", {
      username,
      password
    })
      .then(function() {
        location.replace("/dashboard");
      })
      .catch(err => console.log(err));
  };
  
  document
    .querySelector("#signup-form")
    .addEventListener("submit", signupFormHandler);
