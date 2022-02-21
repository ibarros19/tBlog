const newFormHandler = async function(event) {
    event.preventDefault();
  
    const title = document.querySelector('input[name="post-title"]').value;
    const body = document.querySelector('textarea[name="post-body"]').value;
  
    const token = localStorage.getItem("token");
    await axios.post(`/api/post`, {
      title,
      body
    },
    {
      headers: {
        authorization: `Bearer ${token}`
      }
    });
  
    location.replace("/dashboard");
  };
  
  document
    .querySelector("#new-post-form")
    .addEventListener("submit", newFormHandler);