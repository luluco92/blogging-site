async function newFormHandler(event) {
  event.preventDefault();
  const title = document.querySelector('#blog_title').value;
  const content = document.querySelector('#content').value;
  document.querySelector('#displayerr').textContent = ""
if (title.trim() === "") {document.querySelector('#displayerr').textContent += "Title is required!";
return;}
if (content.trim() === "") {document.querySelector('#displayerr').textContent += "Content cannot be empty!";
return;}
  // Send fetch request to add a new blog
  const response = await fetch(`/api/blogs`, {
    method: 'POST',
    body: JSON.stringify({
      title,
      content,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  //if the blog is added, the homepage will be rerendered
  if (response.ok) {
    document.location.replace('/my');
  } else {
    alert('Failed to add blog');
  }
}

document.querySelector('.new-blog-form').addEventListener('submit', newFormHandler);
  