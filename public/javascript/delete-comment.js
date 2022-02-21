const deleteCommentHandler = async function(event) {
    event.preventDefault();
    const commentId = document.getElementById('comment-id')
    const postId = document.getElementById('comment-post-id').value

    axios.delete("/api/comment/" + commentId.value)
        .then(() => location.replace(`/post/${postId}?commentDeleted=true`))
        .catch(err => console.log(err))
}

document
    .querySelector("#delete-comment-btn")
    ?.addEventListener("click", deleteCommentHandler)