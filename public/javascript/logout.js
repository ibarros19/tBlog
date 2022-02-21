function logout() {
  axios.post("/api/user/logout")
    .then(function() {
      location.replace("/");
    })
    .catch(err => console.log(err));
}

document.querySelector("#logout-link")?.addEventListener("click", logout);