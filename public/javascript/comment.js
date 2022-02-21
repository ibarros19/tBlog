const commentFormHandler = async function (event) {
  event.preventDefault();

  const postId = document.querySelector('input[name="post-id"]').value;
  const body = document.querySelector('textarea[name="comment-body"]').value;

  if (body) {
    axios.post('/api/comment', {
      postId,
      body
    })
    .then((res) => {
        location.replace(`/post/${postId}#comment-${res.data.id}`);
        location.reload()
    })
    .catch(err => alert(err.message))
  }
};

document
  .querySelector('#new-comment-form')
  ?.addEventListener('submit', commentFormHandler);