const editCommentFormHandler = async function(event) {
    event.preventDefault();

    const bodyEl = document.getElementById('comment-body');
    const commentId = document.getElementById('comment-id').value
    const postId = document.getElementById('comment-post-id').value

    axios.put("/api/comment/" + commentId, {
        body: bodyEl.value
    })
    .then(function() {
        location.replace(`/post/${postId}#comment-${commentId}`);
    })
    .catch(err => console.log(err))
}

document
    .querySelector("#edit-comment-form")
    ?.addEventListener("submit", editCommentFormHandler);