const editFormHandler = async function(event) {
    event.preventDefault();

    const titleEl = document.getElementById('post-title');
    const bodyEl = document.getElementById('post-body');
    const postId = document.getElementById('post-id')

    axios.put("/api/post/" + postId.value, {
        title: titleEl.value,
        body: bodyEl.value
    })
    .then(function() {
        location.replace("/dashboard");
    })
    .catch(err => console.log(err))
}

document
    .querySelector("#edit-post-form")
    ?.addEventListener("submit", editFormHandler);