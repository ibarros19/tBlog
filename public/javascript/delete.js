const deletePostHandler = async function(event) {
    event.preventDefault();
    const postId = document.getElementById('post-id')

    axios.delete("/api/post/" + postId.value)
        .then(() => location.replace("/dashboard"))
        .catch(err => console.log(err))
}

document
    .querySelector("#delete-btn")
    ?.addEventListener("click", deletePostHandler)